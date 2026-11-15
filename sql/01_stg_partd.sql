-- Staging: Medicare Part D Spending by Drug
-- Raw grain:    one row per (brand, generic, manufacturer), five years side by side
-- Staged grain: one row per (brand, generic, manufacturer, year)
--
-- Notes
--   * Mftr_Name = 'Overall' rows are CMS's drug-level totals across manufacturers.
--     Never add Overall rows to manufacturer rows, or spend is double counted.
--   * Outlier_Flag = 1 means CMS judged the per-unit average distorted by outlier
--     claims that year. Kept as a column so analyses can exclude or caveat them.
--   * Wide-to-long is done with one SELECT per year and UNION ALL, not UNPIVOT.
--     CMS suppresses small beneficiary counts (NULL), and DuckDB's multi-column
--     UNPIVOT dropped every drug-year with a suppressed count, taking its spend
--     with it (about $160M in 2024). The reconciliation check in src/checks.py
--     caught it. UNION ALL keeps every row.
--   * Years are hardcoded to the current release (2020-2024). src/build.py
--     fails loudly if the raw table holds a year this file does not cover.

CREATE OR REPLACE TABLE stg_partd_spending AS
WITH long AS (
    SELECT Brnd_Name, Gnrc_Name, Mftr_Name, Tot_Mftr, 2020 AS year,
           Tot_Spndng_2020 AS spend, Tot_Dsg_Unts_2020 AS units, Tot_Clms_2020 AS claims,
           Tot_Benes_2020 AS benes, Avg_Spnd_Per_Dsg_Unt_Wghtd_2020 AS spend_per_unit, Outlier_Flag_2020 AS outlier_flag
    FROM raw_partd_spending
    UNION ALL
    SELECT Brnd_Name, Gnrc_Name, Mftr_Name, Tot_Mftr, 2021,
           Tot_Spndng_2021, Tot_Dsg_Unts_2021, Tot_Clms_2021,
           Tot_Benes_2021, Avg_Spnd_Per_Dsg_Unt_Wghtd_2021, Outlier_Flag_2021
    FROM raw_partd_spending
    UNION ALL
    SELECT Brnd_Name, Gnrc_Name, Mftr_Name, Tot_Mftr, 2022,
           Tot_Spndng_2022, Tot_Dsg_Unts_2022, Tot_Clms_2022,
           Tot_Benes_2022, Avg_Spnd_Per_Dsg_Unt_Wghtd_2022, Outlier_Flag_2022
    FROM raw_partd_spending
    UNION ALL
    SELECT Brnd_Name, Gnrc_Name, Mftr_Name, Tot_Mftr, 2023,
           Tot_Spndng_2023, Tot_Dsg_Unts_2023, Tot_Clms_2023,
           Tot_Benes_2023, Avg_Spnd_Per_Dsg_Unt_Wghtd_2023, Outlier_Flag_2023
    FROM raw_partd_spending
    UNION ALL
    SELECT Brnd_Name, Gnrc_Name, Mftr_Name, Tot_Mftr, 2024,
           Tot_Spndng_2024, Tot_Dsg_Unts_2024, Tot_Clms_2024,
           Tot_Benes_2024, Avg_Spnd_Per_Dsg_Unt_Wghtd_2024, Outlier_Flag_2024
    FROM raw_partd_spending
)
SELECT
    trim(Brnd_Name)                                   AS brand_name,
    trim(Gnrc_Name)                                   AS generic_name,
    trim(Mftr_Name)                                   AS manufacturer,
    trim(Mftr_Name) = 'Overall'                       AS is_overall,
    try_cast(Tot_Mftr AS INTEGER)                     AS n_manufacturers,
    year,
    try_cast(nullif(spend, '') AS DOUBLE)             AS total_spend,
    try_cast(nullif(units, '') AS DOUBLE)             AS dosage_units,
    try_cast(nullif(claims, '') AS DOUBLE)            AS claims,
    -- NULL means CMS suppressed a small count, not zero
    try_cast(nullif(benes, '') AS DOUBLE)             AS beneficiaries,
    try_cast(nullif(spend_per_unit, '') AS DOUBLE)    AS spend_per_unit,
    coalesce(outlier_flag = '1', false)               AS is_outlier
FROM long
-- a drug with no spend in a year (e.g. launched later) gets no row that year
WHERE try_cast(nullif(spend, '') AS DOUBLE) IS NOT NULL;
