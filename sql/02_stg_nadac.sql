-- Staging: NADAC weekly acquisition prices
-- Raw grain:    one row per (NDC, weekly "As of Date") snapshot
-- Staged grain: same, with clean names and types
--
-- Notes
--   * CMS renamed the columns between years: the 2023 file uses underscores
--     (NADAC_Per_Unit) and later files use spaces (NADAC Per Unit). Loading the
--     files by column name splits each field in two, so coalesce them back here.
--   * Date each price by its "As of Date" (the weekly publication), not by its
--     Effective Date, which can be months or years earlier.
--   * Classification_for_Rate_Setting: B = brand, G = generic,
--     B-ANDA = brand drug approved under a generic application (treated as brand).

CREATE OR REPLACE TABLE stg_nadac AS
SELECT
    lpad(trim(NDC), 11, '0')                                                         AS ndc,
    upper(trim("NDC Description"))                                                   AS ndc_description,
    try_cast(coalesce(NADAC_Per_Unit, "NADAC Per Unit") AS DOUBLE)                   AS nadac_per_unit,
    upper(trim(coalesce(Pricing_Unit, "Pricing Unit")))                              AS pricing_unit,
    coalesce(Pharmacy_Type_Indicator, "Pharmacy Type Indicator")                     AS pharmacy_type,
    coalesce(OTC, '') = 'Y'                                                          AS is_otc,
    coalesce(Classification_for_Rate_Setting, "Classification for Rate Setting")     AS rate_class,
    coalesce(Classification_for_Rate_Setting, "Classification for Rate Setting") LIKE 'B%' AS is_brand,
    try_cast(coalesce(Corresponding_Generic_Drug_NADAC_Per_Unit,
                      "Corresponding Generic Drug NADAC Per Unit") AS DOUBLE)        AS generic_equiv_per_unit,
    CAST(try_strptime(coalesce(Effective_Date, "Effective Date"), '%m/%d/%Y') AS DATE) AS effective_date,
    CAST(try_strptime("As of Date", '%m/%d/%Y') AS DATE)                             AS as_of_date,
    year(try_strptime("As of Date", '%m/%d/%Y'))                                     AS as_of_year
FROM raw_nadac;

-- Annual price per NDC: mean of the weekly snapshots in each calendar year,
-- plus the last observed price that year (useful for "current price" views).
CREATE OR REPLACE TABLE int_nadac_annual AS
SELECT
    ndc,
    as_of_year                                      AS year,
    any_value(ndc_description)                      AS ndc_description,
    any_value(pricing_unit)                         AS pricing_unit,
    bool_or(is_brand)                               AS is_brand,
    bool_or(is_otc)                                 AS is_otc,
    avg(nadac_per_unit)                             AS avg_nadac_per_unit,
    arg_max(nadac_per_unit, as_of_date)             AS last_nadac_per_unit,
    avg(generic_equiv_per_unit)                     AS avg_generic_equiv_per_unit,
    count(*)                                        AS n_weeks
FROM stg_nadac
WHERE nadac_per_unit IS NOT NULL
GROUP BY ndc, as_of_year;
