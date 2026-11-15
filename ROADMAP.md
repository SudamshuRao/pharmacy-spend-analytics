# Roadmap

**Business question:** Drug spend keeps rising. What is driving it, and where are the savings?
**Stakeholder (assumed):** VP of Pharmacy at a health system, or a GPO pharmacy program team.
**Data:** CMS Medicare Part D Spending by Drug + CMS NADAC (all public).

Work days follow the DA block (Sat to Tue), with the LinkedIn DA post on Thursday.

| Phase | Dates (2026) | Deliverable | Status |
|---|---|---|---|
| 0. Scope the problem | Nov 14 to 15 | `docs/01_scoping_memo.md` | In progress |
| 1. Acquire the data | Nov 15 to 17 | `src/ingest.py`, raw DuckDB tables, data manifest | Code written, needs first run |
| 2. Clean, reconcile, model | Nov 21 to 24 | `sql/` staging + star schema, reconciliation report | In progress: staging and crosswalk done (99.8% of matchable spend), 11 checks passing; analysis marts next |
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
- Done: Part D reshaped to drug x manufacturer x year; NADAC column-name drift fixed; 9 data checks passing.
- Crosswalk, scoped by spend: 220 of 3,625 drugs make up 80% of 2024 spend, so match those (plus the full adalimumab family) instead of all drugs. Match Part D brand names to NADAC NDC descriptions.
- Report coverage by spend, not by drug count. Target: at least 90% of in-scope spend matched; list the unmatched drugs and why.
- Star schema: `dim_drug`, `fct_partd_spend`, `fct_nadac_price`, `xwalk_drug_ndc`.

## Phase 3. Analyze (three findings for the memo)
1. **Concentration and drivers.** 38 drugs make up half of 2024 spend. Split 2020 to 2024 growth into price effect and volume effect, overall and for the top drugs and classes.
2. **Biosimilar opportunity (adalimumab).** Humira still carries most adalimumab spend while biosimilars cost far less per unit. Model savings at 25%, 50% and 75% conversion.
3. **2026 negotiated prices.** Ten Part D drugs, several of them in the top 15 by spend, have Medicare negotiated prices effective January 1, 2026. Estimate the effect on their spend from 2024 volumes and compare with CMS's own estimate.
- NADAC is used as the pharmacy acquisition-cost benchmark and to show 2025 price movement, a year past the end of the Part D data.

## Phase 4. Forecast
- Forecast 2025 and 2026 spend for the top drug classes, with and without the negotiated-price effect, as a range.
- Back-test on 2024 and report the error.

## Phase 5. Dashboard
- Page 1: executive summary (total spend, growth, top drivers).
- Page 2: spend drivers (price vs volume).
- Page 3: savings opportunities.
- Tool: Tableau Public. Power BI Desktop is Windows-only and this is built on a Mac; Tableau Public also gives a public link to share. The SQL models feed either tool.

## Phase 6. Stakeholder package
- One-page executive memo: three findings, three recommendations, limitations.
- Five-slide deck for a 10-minute walkthrough.
- README written for a hiring manager.

## Phase 7. Share and reach out
- LinkedIn posts on DA Thursdays: problem framing (Nov 19), early findings (Dec 3), full project (Dec 17).
- Reach out to Vizient analysts and recruiters with the project link; apply to the next entry-level analyst opening.
