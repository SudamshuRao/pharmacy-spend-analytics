"""
Phase 4: forecast 2025-2026 Part D gross spend, by drug class and in total.

With five annual data points, simple and explainable beats clever. Three
candidate methods are fitted per drug class and scored on the class total:
  linear   straight-line trend (constant dollar growth per year)
  loglin   log-linear trend (constant percentage growth per year)
  recent   last year's growth rate carried forward

Rolling-origin back-test: fit on 2020-2022 and predict 2023, then fit on
2020-2023 and predict 2024. The method with the lowest average error on total
spend wins; the largest of its back-test errors (at least 3%) sets the +/- range.

Note: linear class forecasts add up exactly to a linear forecast of the total,
so the class view and the total view never disagree.

The 2026 "with negotiation" line applies each negotiated drug's discount
(negotiated price vs 2023 list price) to its class's projected spend, in
proportion to that drug's 2024 share of the class. Gross basis, like the data.

Writes mart_forecast and mart_forecast_backtest to data/pharmacy.duckdb.
"""

from __future__ import annotations

from pathlib import Path

import duckdb
import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "pharmacy.duckdb"
MIN_BAND = 0.03
METHODS = ("linear", "loglin", "recent")


def predict(years: np.ndarray, spend: np.ndarray, targets: list[int], method: str) -> np.ndarray:
    t = np.array(targets, dtype=float)
    if method == "linear":
        out = np.polyval(np.polyfit(years, spend, 1), t)
    elif method == "loglin":
        out = np.exp(np.polyval(np.polyfit(years, np.log(spend), 1), t))
    elif method == "recent":
        g = spend[-1] / spend[-2]
        out = spend[-1] * g ** (t - years[-1])
    else:
        raise ValueError(method)
    return np.clip(out, 0, None)  # spend cannot go below zero


def main() -> None:
    con = duckdb.connect(str(DB_PATH))
    df = con.execute("SELECT year, drug_class, spend FROM mart_spend_by_year_class").df()
    wide = df.pivot(index="year", columns="drug_class", values="spend").sort_index()
    years = wide.index.to_numpy()

    # rolling-origin back-test on the sum of class forecasts
    bt_rows = []
    for method in METHODS:
        for holdout in (2023, 2024):
            train = wide.loc[: holdout - 1]
            pred = sum(predict(train.index.to_numpy(), train[c].to_numpy(), [holdout], method)[0]
                       for c in wide.columns)
            actual = wide.loc[holdout].sum()
            bt_rows.append({"method": method, "holdout_year": holdout, "actual": actual,
                            "predicted": pred, "abs_pct_error": abs(pred - actual) / actual})
    bt = pd.DataFrame(bt_rows)
    summary = bt.groupby("method").abs_pct_error.agg(["mean", "max"])
    best = summary["mean"].idxmin()
    band = max(summary.loc[best, "max"], MIN_BAND)
    print(bt.assign(actual=bt.actual / 1e9, predicted=bt.predicted / 1e9).round(3).to_string(index=False))
    print(f"\nchosen method: {best} (mean error {summary.loc[best, 'mean']:.1%}), range +/-{band:.1%}")

    # each class's 2024 gross reduction share from negotiated drugs
    neg = con.execute("""
        SELECT f.drug_class,
               sum(f.total_spend * (1 - r.negotiated_price_2026_30d / r.list_price_2023_30d)) AS reduction
        FROM fct_drug_year f JOIN ref_negotiated_prices_2026 r USING (negotiated_2026_group)
        WHERE f.year = 2024 GROUP BY 1
    """).df().set_index("drug_class")["reduction"]
    neg_share = (neg / wide.loc[2024]).reindex(wide.columns).fillna(0.0)

    rows = []
    for c in wide.columns:
        for y in years:
            rows.append({"drug_class": c, "year": int(y), "kind": "actual", "spend": wide.loc[y, c]})
        for y, v in zip((2025, 2026), predict(years, wide[c].to_numpy(), [2025, 2026], best)):
            rows.append({"drug_class": c, "year": y, "kind": "forecast", "spend": v})
            if y == 2026:
                rows.append({"drug_class": c, "year": y, "kind": "forecast_with_negotiation",
                             "spend": v * (1 - neg_share[c])})
    out = pd.DataFrame(rows)
    is_fc = out.kind != "actual"
    out["low"] = np.where(is_fc, out.spend * (1 - band), out.spend)
    out["high"] = np.where(is_fc, out.spend * (1 + band), out.spend)
    out["method"] = np.where(is_fc, best, None)

    con.register("fc", out)
    con.register("bt", bt)
    con.execute("CREATE OR REPLACE TABLE mart_forecast AS SELECT * FROM fc")
    con.execute("CREATE OR REPLACE TABLE mart_forecast_backtest AS SELECT * FROM bt")
    print(con.sql("""
        SELECT year, kind, round(sum(spend)/1e9, 1) AS spend_bn,
               round(sum(low)/1e9, 1) AS low_bn, round(sum(high)/1e9, 1) AS high_bn
        FROM mart_forecast GROUP BY ALL ORDER BY year, kind
    """))
    con.close()


if __name__ == "__main__":
    main()
