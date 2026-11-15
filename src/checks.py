"""
Data quality checks. Each check is a SQL query that returns zero rows when the
data is healthy; any rows returned are the failing records.
"""

from __future__ import annotations

import duckdb

CHECKS = {
    # --- Part D -----------------------------------------------------------
    "partd: one row per drug x manufacturer x year": """
        SELECT brand_name, generic_name, manufacturer, year, count(*) AS n
        FROM stg_partd_spending
        GROUP BY ALL HAVING count(*) > 1
    """,
    "partd: staged spend reconciles to raw, per year (Overall rows)": """
        WITH raw AS (
            SELECT 2020 AS year, sum(try_cast(Tot_Spndng_2020 AS DOUBLE)) AS s FROM raw_partd_spending WHERE Mftr_Name = 'Overall'
            UNION ALL SELECT 2021, sum(try_cast(Tot_Spndng_2021 AS DOUBLE)) FROM raw_partd_spending WHERE Mftr_Name = 'Overall'
            UNION ALL SELECT 2022, sum(try_cast(Tot_Spndng_2022 AS DOUBLE)) FROM raw_partd_spending WHERE Mftr_Name = 'Overall'
            UNION ALL SELECT 2023, sum(try_cast(Tot_Spndng_2023 AS DOUBLE)) FROM raw_partd_spending WHERE Mftr_Name = 'Overall'
            UNION ALL SELECT 2024, sum(try_cast(Tot_Spndng_2024 AS DOUBLE)) FROM raw_partd_spending WHERE Mftr_Name = 'Overall'
        ),
        stg AS (
            SELECT year, sum(total_spend) AS s FROM stg_partd_spending WHERE is_overall GROUP BY year
        )
        SELECT raw.year, raw.s AS raw_spend, stg.s AS staged_spend
        FROM raw LEFT JOIN stg USING (year)
        WHERE abs(raw.s - coalesce(stg.s, 0)) > 0.01
    """,
    "partd: manufacturer rows sum to the Overall row (within $1)": """
        WITH m AS (
            SELECT brand_name, generic_name, year,
                   sum(total_spend) FILTER (WHERE NOT is_overall) AS mftr_sum,
                   max(total_spend) FILTER (WHERE is_overall)     AS overall
            FROM stg_partd_spending GROUP BY ALL
        )
        SELECT * FROM m WHERE abs(coalesce(mftr_sum, 0) - coalesce(overall, 0)) > 1
    """,
    "partd: no negative spend, units or claims": """
        SELECT * FROM stg_partd_spending
        WHERE total_spend < 0 OR dosage_units < 0 OR claims < 0
    """,
    # --- NADAC ------------------------------------------------------------
    "nadac: every row has a price and an as-of date": """
        SELECT * FROM stg_nadac WHERE nadac_per_unit IS NULL OR as_of_date IS NULL
    """,
    "nadac: one row per NDC x as-of date": """
        SELECT ndc, as_of_date, count(*) AS n FROM stg_nadac GROUP BY ALL HAVING count(*) > 1
    """,
    "nadac: no rows lost in staging": """
        SELECT (SELECT count(*) FROM raw_nadac) AS raw_rows,
               (SELECT count(*) FROM stg_nadac) AS staged_rows
        WHERE raw_rows <> staged_rows
    """,
    "nadac: NDCs are 11 digits": """
        SELECT DISTINCT ndc FROM stg_nadac WHERE NOT regexp_full_match(ndc, '\\d{11}')
    """,
    "nadac: prices are positive": """
        SELECT * FROM stg_nadac WHERE nadac_per_unit <= 0
    """,
    # --- Crosswalk ---------------------------------------------------------
    "xwalk: every in-scope drug has a coverage status": """
        SELECT * FROM dim_drug_scope s
        WHERE NOT EXISTS (SELECT 1 FROM rpt_xwalk_coverage r
                          WHERE r.brand_name = s.brand_name AND r.generic_name = s.generic_name)
    """,
    "xwalk: >= 90% of the in-scope spend that NADAC carries is matched": """
        SELECT sum(spend_2024) FILTER (WHERE status = 'matched')
                 / sum(spend_2024) FILTER (WHERE status <> 'not_in_nadac') AS matched_share
        FROM rpt_xwalk_coverage
        HAVING matched_share < 0.90
    """,
}


def run_checks(con: duckdb.DuckDBPyConnection) -> bool:
    all_ok = True
    print("\ndata checks")
    for name, sql in CHECKS.items():
        failing = con.execute(f"SELECT count(*) FROM ({sql})").fetchone()[0]
        status = "PASS" if failing == 0 else f"FAIL ({failing:,} rows)"
        all_ok &= failing == 0
        print(f"  [{status}] {name}")
        if failing:
            print(con.sql(f"{sql} LIMIT 5"))
    return all_ok
