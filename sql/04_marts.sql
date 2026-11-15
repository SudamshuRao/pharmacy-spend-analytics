-- Analysis marts. Every table here is built only from staged tables, and every
-- number in the memo and dashboard comes from one of these tables.

---------------------------------------------------------------------------
-- dim_drug: one row per drug (brand x generic) with a therapeutic class.
-- Part D has no class field, so classes come from ingredient-name rules for
-- the classes that dominate spend. Anything not covered is 'Other'; the share
-- of spend left in 'Other' is reported, not hidden.
---------------------------------------------------------------------------
CREATE OR REPLACE TABLE dim_drug AS
WITH d AS (
    SELECT DISTINCT brand_name, generic_name, upper(generic_name) AS g
    FROM stg_partd_spending WHERE is_overall
)
SELECT brand_name, generic_name,
       upper(brand_name) = upper(generic_name) AS is_generic_name,
       CASE
         WHEN regexp_matches(g, 'SEMAGLUTIDE|TIRZEPATIDE|DULAGLUTIDE|LIRAGLUTIDE|EXENATIDE|LIXISENATIDE')
              THEN 'GLP-1 / incretin'
         WHEN regexp_matches(g, 'GLIFLOZIN') THEN 'SGLT2 inhibitor'
         WHEN regexp_matches(g, 'GLIPTIN') THEN 'DPP-4 inhibitor'
         WHEN regexp_matches(g, '^INSULIN') THEN 'Insulin'
         WHEN regexp_matches(g, 'APIXABAN|RIVAROXABAN|DABIGATRAN|EDOXABAN') THEN 'Anticoagulant (DOAC)'
         WHEN regexp_matches(g, 'ADALIMUMAB|ETANERCEPT|USTEKINUMAB|SECUKINUMAB|RISANKIZUMAB|GUSELKUMAB|IXEKIZUMAB|'
                                'DUPILUMAB|UPADACITINIB|TOFACITINIB|APREMILAST|CERTOLIZUMAB|TILDRAKIZUMAB|'
                                'DEUCRAVACITINIB|ABATACEPT|BARICITINIB|OMALIZUMAB|MEPOLIZUMAB|BENRALIZUMAB|TEZEPELUMAB')
              THEN 'Immunology biologic / targeted'
         WHEN regexp_matches(g, 'TINIB|LIDOMIDE|LUTAMIDE|CICLIB|PARIB|RAFENIB|VENETOCLAX|ABIRATERONE|RELUGOLIX|'
                                'TRIFLURIDINE|LISIB|ELACESTRANT|BELZUTIFAN|IVOSIDENIB|IXAZOMIB|CAPECITABINE|TEMOZOLOMIDE|'
                                'ANASTROZOLE|LETROZOLE|TAMOXIFEN')
              THEN 'Oncology (oral)'
         WHEN regexp_matches(g, 'FLUTICASONE|UMECLIDIN|TIOTROPIUM|ALBUTEROL|BUDESONIDE|FORMOTEROL|SALMETEROL|'
                                'GLYCOPYRR|IPRATROPIUM|MOMETASONE|ACLIDINIUM|REVEFENACIN|ENSIFENTRINE')
              THEN 'Respiratory inhaler'
         WHEN regexp_matches(g, 'BICTEGRAV|EMTRICIT|DOLUTEGRAVIR|CABOTEGRAVIR|DARUNAVIR|RILPIVIRINE|TENOFOV|RALTEGRAVIR|LENACAPAVIR')
              THEN 'HIV'
         WHEN regexp_matches(g, 'SACUBITRIL|TAFAMIDIS|MAVACAMTEN|IVABRADINE|VERICIGUAT')
              THEN 'Heart failure / cardiomyopathy'
         WHEN regexp_matches(g, 'VACC|ANTIGEN|TOXOID|ZOSTER') THEN 'Vaccine'
         ELSE 'Other'
       END AS drug_class,
       -- the ten Part D drugs with Medicare negotiated prices from 2026-01-01
       CASE
         WHEN upper(brand_name) LIKE 'ELIQUIS%'   THEN 'Eliquis'
         WHEN upper(brand_name) LIKE 'JARDIANCE%' THEN 'Jardiance'
         WHEN upper(brand_name) LIKE 'XARELTO%'   THEN 'Xarelto'
         WHEN upper(brand_name) LIKE 'JANUVIA%'   THEN 'Januvia'
         WHEN upper(brand_name) LIKE 'FARXIGA%'   THEN 'Farxiga'
         WHEN upper(brand_name) LIKE 'ENTRESTO%'  THEN 'Entresto'
         WHEN upper(brand_name) LIKE 'ENBREL%'    THEN 'Enbrel'
         WHEN upper(brand_name) LIKE 'IMBRUVICA%' THEN 'Imbruvica'
         WHEN upper(brand_name) LIKE 'STELARA%'   THEN 'Stelara'
         WHEN upper(brand_name) LIKE 'NOVOLOG%' OR upper(brand_name) LIKE 'FIASP%' THEN 'Fiasp / NovoLog'
       END AS negotiated_2026_group
FROM d;

---------------------------------------------------------------------------
-- Negotiated prices (Maximum Fair Prices) effective 2026-01-01, 30-day supply,
-- versus 2023 list price. Source: CMS fact sheet, August 2024.
---------------------------------------------------------------------------
CREATE OR REPLACE TABLE ref_negotiated_prices_2026 AS
SELECT * FROM (VALUES
    ('Eliquis',          521.00,   231.00),
    ('Jardiance',        573.00,   197.00),
    ('Xarelto',          517.00,   197.00),
    ('Januvia',          527.00,   113.00),
    ('Farxiga',          556.00,   178.50),
    ('Entresto',         628.00,   295.00),
    ('Enbrel',          7106.00,  2355.00),
    ('Imbruvica',      14934.00,  9319.00),
    ('Stelara',        13836.00,  4695.00),
    ('Fiasp / NovoLog',  495.00,   119.00)
) AS t(negotiated_2026_group, list_price_2023_30d, negotiated_price_2026_30d);

---------------------------------------------------------------------------
-- fct_drug_year: drug-level (Overall rows) spend facts with price per unit.
---------------------------------------------------------------------------
CREATE OR REPLACE TABLE fct_drug_year AS
SELECT s.brand_name, s.generic_name, d.drug_class, d.is_generic_name, d.negotiated_2026_group,
       s.year, s.total_spend, s.dosage_units, s.claims, s.beneficiaries,
       s.total_spend / nullif(s.dosage_units, 0) AS price_per_unit,
       s.is_outlier
FROM stg_partd_spending s
JOIN dim_drug d USING (brand_name, generic_name)
WHERE s.is_overall;

---------------------------------------------------------------------------
-- Finding 1a: concentration. Rank drugs by 2024 spend.
---------------------------------------------------------------------------
CREATE OR REPLACE TABLE mart_concentration_2024 AS
SELECT brand_name, generic_name, drug_class, total_spend,
       row_number() OVER (ORDER BY total_spend DESC)                              AS spend_rank,
       total_spend / sum(total_spend) OVER ()                                     AS share,
       sum(total_spend) OVER (ORDER BY total_spend DESC ROWS UNBOUNDED PRECEDING)
         / sum(total_spend) OVER ()                                               AS cum_share
FROM fct_drug_year WHERE year = 2024;

---------------------------------------------------------------------------
-- Finding 1b: what drove spend growth from 2020 to 2024.
-- For drugs sold in both years, the change splits exactly into
--   price effect  = (p24 - p20) * average units
--   volume effect = (q24 - q20) * average price
-- (midpoint method; the two parts add up to the full change with no residual).
-- Drugs with no 2020 spend count as "new drugs"; drugs gone by 2024 as "exits".
---------------------------------------------------------------------------
CREATE OR REPLACE TABLE mart_growth_decomposition AS
WITH a AS (SELECT * FROM fct_drug_year WHERE year = 2020),
     b AS (SELECT * FROM fct_drug_year WHERE year = 2024),
j AS (
    SELECT coalesce(b.brand_name, a.brand_name)   AS brand_name,
           coalesce(b.generic_name, a.generic_name) AS generic_name,
           coalesce(b.drug_class, a.drug_class)   AS drug_class,
           a.total_spend AS s0, b.total_spend AS s1,
           a.dosage_units AS q0, b.dosage_units AS q1,
           a.price_per_unit AS p0, b.price_per_unit AS p1
    FROM a FULL OUTER JOIN b USING (brand_name, generic_name)
)
SELECT brand_name, generic_name, drug_class,
       coalesce(s0, 0) AS spend_2020, coalesce(s1, 0) AS spend_2024,
       coalesce(s1, 0) - coalesce(s0, 0) AS spend_change,
       CASE WHEN s0 IS NULL THEN 'new drug'
            WHEN s1 IS NULL THEN 'exit'
            WHEN q0 > 0 AND q1 > 0 THEN 'continuing'
            ELSE 'continuing (no units)' END AS segment,
       CASE WHEN s0 IS NOT NULL AND s1 IS NOT NULL AND q0 > 0 AND q1 > 0
            THEN (p1 - p0) * (q0 + q1) / 2 END AS price_effect,
       CASE WHEN s0 IS NOT NULL AND s1 IS NOT NULL AND q0 > 0 AND q1 > 0
            THEN (q1 - q0) * (p0 + p1) / 2 END AS volume_effect
FROM j;

CREATE OR REPLACE TABLE mart_growth_by_class AS
SELECT drug_class,
       sum(spend_2020) AS spend_2020,
       sum(spend_2024) AS spend_2024,
       sum(spend_change) AS spend_change,
       sum(price_effect) AS price_effect,
       sum(volume_effect) AS volume_effect,
       coalesce(sum(spend_change) FILTER (WHERE segment = 'new drug'), 0) AS new_drug_effect,
       coalesce(sum(spend_change) FILTER (WHERE segment = 'exit'), 0) AS exit_effect,
       coalesce(sum(spend_change) FILTER (WHERE segment = 'continuing (no units)'), 0) AS unexplained
FROM mart_growth_decomposition
GROUP BY ROLLUP (drug_class);

---------------------------------------------------------------------------
-- Finding 2: adalimumab, Humira vs biosimilars, 2023-2024.
---------------------------------------------------------------------------
CREATE OR REPLACE TABLE mart_adalimumab AS
SELECT year,
       CASE WHEN upper(brand_name) LIKE 'HUMIRA%' THEN 'Humira' ELSE 'Biosimilar' END AS product_group,
       sum(total_spend)   AS spend,
       sum(dosage_units)  AS units,
       sum(total_spend) / sum(dosage_units) AS price_per_unit
FROM fct_drug_year
WHERE upper(generic_name) LIKE 'ADALIMUMAB%'
GROUP BY ALL;

-- Savings if a share of 2024 Humira units moved to biosimilars (gross, before
-- rebates). Two price assumptions, because biosimilars launched at two list-price
-- levels: a high list price close to Humira's, and a low list price far below it.
--   blended  = average 2024 price per unit across all biosimilar units
--   low_list = average 2024 price per unit of biosimilar products under $1,000/unit
CREATE OR REPLACE TABLE mart_adalimumab_scenarios AS
WITH h AS (SELECT * FROM mart_adalimumab WHERE year = 2024 AND product_group = 'Humira'),
prices AS (
    SELECT 'blended' AS price_basis, sum(total_spend) / sum(dosage_units) AS biosimilar_price_per_unit
    FROM fct_drug_year
    WHERE year = 2024 AND upper(generic_name) LIKE 'ADALIMUMAB%' AND upper(brand_name) NOT LIKE 'HUMIRA%'
    UNION ALL
    SELECT 'low_list', sum(total_spend) / sum(dosage_units)
    FROM fct_drug_year
    WHERE year = 2024 AND upper(generic_name) LIKE 'ADALIMUMAB%' AND upper(brand_name) NOT LIKE 'HUMIRA%'
      AND price_per_unit < 1000
)
SELECT p.price_basis, s.conversion,
       h.units * s.conversion                                         AS units_switched,
       h.price_per_unit                                               AS humira_price_per_unit,
       p.biosimilar_price_per_unit,
       h.units * s.conversion * (h.price_per_unit - p.biosimilar_price_per_unit) AS gross_savings
FROM h, prices p, (VALUES (0.25), (0.50), (0.75)) AS s(conversion);

---------------------------------------------------------------------------
-- Finding 3: 2026 negotiated prices applied to 2024 volume.
-- Estimate = 2024 gross spend x (1 - negotiated price / 2023 list price).
-- This is a gross estimate. Part D gross spend is close to list price, while
-- what plans actually pay is net of manufacturer rebates, so true savings are
-- smaller. CMS's own estimate is on a net basis; both are shown in the memo.
---------------------------------------------------------------------------
CREATE OR REPLACE TABLE mart_negotiation_2026 AS
SELECT f.negotiated_2026_group,
       sum(f.total_spend)                                         AS spend_2024,
       any_value(r.list_price_2023_30d)                           AS list_price_2023_30d,
       any_value(r.negotiated_price_2026_30d)                     AS negotiated_price_2026_30d,
       1 - any_value(r.negotiated_price_2026_30d) / any_value(r.list_price_2023_30d) AS discount,
       sum(f.total_spend) * (1 - any_value(r.negotiated_price_2026_30d) / any_value(r.list_price_2023_30d))
                                                                  AS est_gross_reduction
FROM fct_drug_year f
JOIN ref_negotiated_prices_2026 r USING (negotiated_2026_group)
WHERE f.year = 2024
GROUP BY ALL;

---------------------------------------------------------------------------
-- Totals by year and by class, for the trend charts and the forecast.
---------------------------------------------------------------------------
CREATE OR REPLACE TABLE mart_spend_by_year_class AS
SELECT year, drug_class, sum(total_spend) AS spend, sum(dosage_units) AS units, sum(claims) AS claims
FROM fct_drug_year GROUP BY ALL;
