# Roadmap

**Business question:** Drug spend keeps rising. What is driving it, and where are the savings?
**Stakeholder (assumed):** VP of Pharmacy at a health system, or a GPO pharmacy program team.
**Data:** CMS Medicare Part D Spending by Drug + CMS NADAC (all public).

| Phase | Deliverable | Status |
|---|---|---|
| 0. Scope the problem | `docs/01_scoping_memo.md` | Done |
| 1. Acquire the data | `src/ingest.py`, raw DuckDB tables, data manifest | Done: 14,536 Part D rows, 4,482,736 NADAC rows |
| 2. Clean, reconcile, model | `sql/01`-`03`, `src/checks.py` | Done: 11 data checks passing; 99.8% of matchable spend crosswalked |
| 3. Analyze | `sql/04_marts.sql` | Done: three findings |
| 4. Forecast | `src/forecast.py` | Done: linear trend, back-test mean error 4.3% |
| 5. Dashboard | `dashboard/index.html`, `outputs/marts/*.csv` | Done |
| 6. Stakeholder package | `docs/02_executive_memo.md`, README | Done |
| 7. Share and reach out | LinkedIn post, Vizient outreach | Next |

## Phase 2. Clean, reconcile, model
- Part D reshaped to drug x manufacturer x year; NADAC column-name drift fixed.
- Crosswalk scoped by spend: the drugs in the first 80% of 2024 spend plus the full adalimumab family (257 drugs), matched in three tiers.
- Coverage reported by spend, not drug count: 99.8% of in-scope spend that NADAC carries is matched; specialty drugs and vaccines NADAC does not survey are reported separately.

## Phase 3. Analyze
1. **Concentration and drivers.** 38 drugs make up half of 2024 spend. Growth from 2020 to 2024 split into price, volume and new-drug effects, in total and by class.
2. **Biosimilar opportunity (adalimumab).** Savings at 25%, 50% and 75% conversion, at blended and low-list biosimilar prices.
3. **2026 negotiated prices.** Gross impact from 2024 spend, compared with CMS's net estimate.

## Phase 4. Forecast
- Three methods (linear, log-linear, last-year growth) scored on a rolling back-test; linear chosen.
- 2025 and 2026 forecasts with the back-test error as the range, plus a 2026 line with negotiated prices applied.

## Phase 5. Dashboard
- Self-contained HTML dashboard with hover tooltips, light and dark mode.
- CSV marts in `outputs/marts/` for Tableau Public or Power BI.

## Phase 7. Share and reach out
- LinkedIn post with the dashboard and the three findings.
- Reach out to Vizient analysts and recruiters with the project link; apply to the next entry-level analyst opening.

## Next steps (not in scope for v1)
- Part B (clinic-administered) drugs.
- Second round of negotiated prices (effective 2027), including semaglutide.
- Standard drug classification via an RxNorm crosswalk.
