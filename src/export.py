"""
Export the analysis marts for the dashboard and BI tools.

  outputs/marts/*.csv       one CSV per mart (load these into Tableau or Power BI)
  dashboard/data.js         the same numbers as JSON for dashboard/index.html
"""

from __future__ import annotations

import json
from pathlib import Path

import duckdb

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "pharmacy.duckdb"
CSV_DIR = ROOT / "outputs" / "marts"

MARTS = [
    "mart_spend_by_year_class", "mart_concentration_2024", "mart_growth_decomposition",
    "mart_growth_by_class", "mart_adalimumab", "mart_adalimumab_scenarios",
    "mart_negotiation_2026", "mart_forecast", "mart_forecast_backtest", "rpt_xwalk_coverage",
]

QUERIES = {
    "totals": """SELECT year, sum(spend) AS spend, sum(claims) AS claims
                 FROM mart_spend_by_year_class GROUP BY year ORDER BY year""",
    "forecast": """SELECT year, kind, sum(spend) AS spend, sum(low) AS low, sum(high) AS high
                   FROM mart_forecast GROUP BY ALL ORDER BY year, kind""",
    "backtest": "SELECT * FROM mart_forecast_backtest ORDER BY method, holdout_year",
    "growth_total": """SELECT price_effect, volume_effect, new_drug_effect, exit_effect, spend_change,
                              spend_2020, spend_2024
                       FROM mart_growth_by_class WHERE drug_class IS NULL""",
    "growth_by_class": """SELECT drug_class, spend_2020, spend_2024, spend_change, price_effect,
                                 volume_effect, new_drug_effect
                          FROM mart_growth_by_class WHERE drug_class IS NOT NULL
                          ORDER BY spend_change DESC""",
    "top_drugs": """SELECT spend_rank, brand_name, generic_name, drug_class, total_spend, share, cum_share
                    FROM mart_concentration_2024 WHERE spend_rank <= 25 ORDER BY spend_rank""",
    "pareto": """SELECT spend_rank, cum_share FROM mart_concentration_2024
                 WHERE spend_rank <= 400 ORDER BY spend_rank""",
    "concentration": """SELECT count(*) AS n_drugs,
                               min(spend_rank) FILTER (WHERE cum_share >= 0.5) AS n_for_50,
                               min(spend_rank) FILTER (WHERE cum_share >= 0.8) AS n_for_80,
                               max(cum_share) FILTER (WHERE spend_rank = 10) AS top10_share
                        FROM mart_concentration_2024""",
    # price effect split: brand (non-insulin), generic-named, insulin. "Generic-named"
    # = CMS lists the brand name as the ingredient name, a proxy for generic products.
    "price_split": """SELECT CASE WHEN d.drug_class = 'Insulin' THEN 'insulin'
                                  WHEN d.is_generic_name THEN 'generic'
                                  ELSE 'brand' END AS grp,
                             sum(g.price_effect) AS price_effect
                      FROM mart_growth_decomposition g JOIN dim_drug d USING (brand_name, generic_name)
                      WHERE g.segment = 'continuing' GROUP BY 1""",
    "top_growth_drugs": """SELECT brand_name, drug_class, spend_change, price_effect, volume_effect, segment
                           FROM mart_growth_decomposition ORDER BY spend_change DESC LIMIT 10""",
    "adalimumab": "SELECT * FROM mart_adalimumab ORDER BY year, product_group",
    "adalimumab_scenarios": "SELECT * FROM mart_adalimumab_scenarios ORDER BY price_basis, conversion",
    "negotiation": "SELECT * FROM mart_negotiation_2026 ORDER BY spend_2024 DESC",
    "xwalk": """SELECT status, count(*) AS n_drugs, sum(spend_2024) AS spend
                FROM rpt_xwalk_coverage GROUP BY status ORDER BY spend DESC""",
}


def main() -> None:
    con = duckdb.connect(str(DB_PATH), read_only=True)
    CSV_DIR.mkdir(parents=True, exist_ok=True)
    for m in MARTS:
        con.execute(f"COPY {m} TO '{CSV_DIR / (m + '.csv')}' (HEADER)")
    data = {}
    for key, sql in QUERIES.items():
        df = con.execute(sql).df()
        data[key] = json.loads(df.to_json(orient="records"))
    out = ROOT / "dashboard" / "data.js"
    out.write_text("window.DASHBOARD_DATA = " + json.dumps(data, indent=1) + ";\n")
    print(f"wrote {len(MARTS)} CSVs to {CSV_DIR} and {out}")
    con.close()


if __name__ == "__main__":
    main()
