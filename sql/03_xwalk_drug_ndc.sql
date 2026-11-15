-- Crosswalk: Part D drugs (names) -> NADAC NDCs (codes)
--
-- Scope: the drugs that make up the first 80% of 2024 Part D spend, plus every
-- adalimumab product (needed for the biosimilar analysis). About 250 of 3,600
-- drugs. Matching the long tail would cost a lot of effort for little spend.
--
-- Match tiers (a drug uses the first tier that finds anything):
--   1  exact   NDC description starts with the full Part D name
--              ("HUMIRA(CF) PEN" -> "HUMIRA(CF) PEN 40 MG/0.4 ML")
--   2  salt    same, after dropping salt words from the name
--              ("ATORVASTATIN CALCIUM" -> "ATORVASTATIN 10 MG TABLET")
--   3  brand   first word of a brand name, brand NDCs only; approximate, because
--              device variants share NDCs ("TRESIBA FLEXTOUCH U-200" -> "TRESIBA ...")
--
-- Some drugs cannot match by design: NADAC surveys retail community pharmacies,
-- so specialty and limited-distribution drugs (many oncology drugs) and most
-- vaccines are not in it. Those are reported as "not in NADAC", separate from
-- real match failures.

CREATE OR REPLACE TABLE dim_drug_scope AS
WITH d AS (
    SELECT brand_name, generic_name, total_spend AS spend_2024
    FROM stg_partd_spending
    WHERE is_overall AND year = 2024
),
ranked AS (
    SELECT *,
           sum(spend_2024) OVER (ORDER BY spend_2024 DESC ROWS UNBOUNDED PRECEDING)
             / sum(spend_2024) OVER () AS cum_share,
           spend_2024 / sum(spend_2024) OVER () AS share,
           row_number() OVER (ORDER BY spend_2024 DESC) AS spend_rank
    FROM d
)
SELECT
    brand_name,
    generic_name,
    spend_2024,
    spend_rank,
    upper(brand_name) = upper(generic_name) AS is_generic_name,
    -- normalized name: no CMS asterisk, no " (2 PENS)"-style pack notes, single spaces
    trim(regexp_replace(regexp_replace(upper(replace(brand_name, '*', '')),
         ' \([^)]*\)', '', 'g'), '\s+', ' ', 'g'))                     AS name_key
FROM ranked
WHERE cum_share - share < 0.80             -- drug starts inside the first 80%
   OR generic_name ILIKE 'adalimumab%';

CREATE OR REPLACE TABLE xwalk_drug_ndc AS
WITH ndcs AS (
    SELECT ndc, any_value(ndc_description) AS descr, bool_or(is_brand) AS is_brand
    FROM int_nadac_annual GROUP BY ndc
),
keys AS (
    SELECT brand_name, generic_name, is_generic_name, name_key,
           trim(regexp_replace(name_key,
             ' (HCL|HYDROCHLORIDE|CALCIUM|SODIUM|POTASSIUM|MAGNESIUM|MESYLATE|ESYLATE|'
             'MALEATE|FUMARATE|SUCCINATE|TARTRATE|CITRATE|PHOSPHATE|SULFATE|BESYLATE|'
             'ACETATE|HYCLATE|MONOHYDRATE|DIHYDRATE|PROPANEDIOL|BROMIDE)\b', '', 'g')) AS salt_key,
           split_part(name_key, ' ', 1) AS first_word
    FROM dim_drug_scope
),
cand AS (
    SELECT k.brand_name, k.generic_name, n.ndc, n.descr, 1 AS tier, length(k.name_key) AS klen
    FROM keys k JOIN ndcs n ON n.descr = k.name_key OR starts_with(n.descr, k.name_key || ' ')
    UNION ALL
    SELECT k.brand_name, k.generic_name, n.ndc, n.descr, 2, length(k.salt_key)
    FROM keys k JOIN ndcs n ON k.salt_key <> k.name_key
                           AND (n.descr = k.salt_key OR starts_with(n.descr, k.salt_key || ' '))
    UNION ALL
    SELECT k.brand_name, k.generic_name, n.ndc, n.descr, 3, length(k.first_word)
    FROM keys k JOIN ndcs n ON NOT k.is_generic_name AND n.is_brand
                           AND length(k.first_word) >= 4 AND k.first_word <> k.name_key
                           AND starts_with(n.descr, k.first_word || ' ')
),
best_tier AS (                        -- each drug keeps only its best tier
    SELECT * FROM cand
    QUALIFY tier = min(tier) OVER (PARTITION BY brand_name, generic_name)
)
-- within tiers 1-2, an NDC belongs to the longest (most specific) name that
-- claims it, so "HUMIRA PEN 40 MG" goes to "HUMIRA PEN", not "HUMIRA"
SELECT brand_name, generic_name, ndc, descr AS ndc_description, tier,
       CASE tier WHEN 1 THEN 'exact' WHEN 2 THEN 'salt' ELSE 'brand (approx)' END AS match_type
FROM best_tier
QUALIFY tier = 3
     OR row_number() OVER (PARTITION BY ndc, tier ORDER BY klen DESC) = 1;

-- One row per in-scope drug with its match outcome: the reconciliation report.
-- status
--   matched       at least one NDC found
--   not_in_nadac  neither the brand's first word nor the ingredient's first word
--                 starts any NADAC description, so NADAC does not carry the drug
--                 (specialty, limited distribution, vaccines). Not a match failure.
--   unmatched     NADAC seems to carry the drug but no rule matched it
CREATE OR REPLACE TABLE rpt_xwalk_coverage AS
WITH nadac_names AS (SELECT DISTINCT ndc_description AS d FROM int_nadac_annual),
s AS (
    SELECT s.*,
           split_part(regexp_replace(s.name_key, '\(.*', ''), ' ', 1) AS brand_word,
           split_part(upper(s.generic_name), ' ', 1)                  AS generic_word
    FROM dim_drug_scope s
),
m AS (
    SELECT s.brand_name, s.generic_name, s.spend_2024, s.spend_rank, s.brand_word, s.generic_word,
           coalesce(min(x.tier), 0) AS best_tier, count(x.ndc) AS n_ndcs
    FROM s LEFT JOIN xwalk_drug_ndc x USING (brand_name, generic_name)
    GROUP BY ALL
)
SELECT brand_name, generic_name, spend_2024, spend_rank, best_tier, n_ndcs,
       CASE
         WHEN n_ndcs > 0 THEN 'matched'
         WHEN NOT EXISTS (SELECT 1 FROM nadac_names WHERE starts_with(d, brand_word))
          AND NOT EXISTS (SELECT 1 FROM nadac_names WHERE starts_with(d, generic_word))
              THEN 'not_in_nadac'
         ELSE 'unmatched'
       END AS status
FROM m;
