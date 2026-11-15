# Roadmap

**Business question:** Drug spend keeps rising. What is driving it, and where are the savings?
**Stakeholder (assumed):** VP of Pharmacy at a health system, or a GPO pharmacy program team.
**Data:** CMS Medicare Part D Spending by Drug + CMS NADAC (all public).

Work days follow the DA block (Sat to Tue), with the LinkedIn DA post on Thursday.

| Phase | Dates (2026) | Deliverable | Status |
|---|---|---|---|
| 0. Scope the problem | Nov 14 to 15 | `docs/01_scoping_memo.md` | In progress |
| 1. Acquire the data | Nov 15 to 17 | `src/ingest.py`, raw DuckDB tables, data manifest | Code written, needs first run |
| 2. Clean, reconcile, model | Nov 21 to 24 | `sql/` staging + star schema, reconciliation report | In progress: staging done, 9 data checks passing; crosswalk next |
| 3. Analyze | Nov 28 to Dec 1 | Spend drivers, concentration, savings notebook | Not started |
| 4. Forecast | Dec 1 to 2 | Next-year spend range for top drug classes | Not started |
| 5. Dashboard | Dec 5 to 8 | 3-page dashboard | Not started |
| 6. Stakeholder package | Dec 12 to 15 | Executive memo, 5-slide deck, README | Not started |
| 7. Share and reach out | Dec 17 onward | LinkedIn post, Vizient outreach | Not started |

## Phase 0. Scope the problem
- Write the stakeholder, the three business questions and the KPIs.
- List what the data can and cannot answer (gross spend only, no rebates; Part D only, not hospital-administered drugs).
- Exit check: someone outside the project can read the memo and know what will be delivered.

## Phase 1. Acquire the data
- Pull Part D Spending by Drug through the CMS data API (5 years, one row per drug and manufacturer).
- Pull the NADAC yearly files (2023 to 2025).
- Load everything into DuckDB as untouched `raw_` tables; record row counts and file hashes in `data/raw/manifest.json`.
- Exit check: `python src/ingest.py` rebuilds the database from scratch on a clean machine.

## Phase 2. Clean, reconcile, model
- Reshape Part D from wide (one column per year) to long (drug, year, spend, units, claims).
- Keep the "Overall" manufacturer rows for drug-level totals and the per-manufacturer rows for brand vs generic analysis.
- Collapse NADAC to one price per NDC per year; classify brand vs generic.
- Build the crosswalk between Part D drug names and NADAC NDC descriptions. Report the match rate, the spend covered by matched drugs, and the unmatched cases.
- Star schema: `dim_drug`, `dim_year`, `fct_partd_spend`, `fct_nadac_price`.
- Data quality checks: totals reconcile to the source, no duplicate keys, outlier flags handled.

## Phase 3. Analyze
- Spend growth split into price effect and volume effect, per drug and in total.
- Concentration: share of spend in the top 1% and top 10% of drugs.
- Fastest unit-price growth among high-spend drugs.
- Savings scenarios: brand-to-generic and biosimilar switches (adalimumab and insulin as case studies), priced with NADAC.

## Phase 4. Forecast
- Forecast next-year spend for the top drug classes as a range, with a simple, explainable method.
- Back-test on the last known year and report the error.

## Phase 5. Dashboard
- Page 1: executive summary (total spend, growth, top drivers).
- Page 2: spend drivers (price vs volume).
- Page 3: savings opportunities.
- Open decision: Power BI Desktop is Windows-only, so either a Windows VM or Tableau Public on the Mac.

## Phase 6. Stakeholder package
- One-page executive memo: three findings, three recommendations, limitations.
- Five-slide deck for a 10-minute walkthrough.
- README written for a hiring manager.

## Phase 7. Share and reach out
- LinkedIn posts on DA Thursdays: problem framing (Nov 19), early findings (Dec 3), full project (Dec 17).
- Reach out to Vizient analysts and recruiters with the project link; apply to the next entry-level analyst opening.
