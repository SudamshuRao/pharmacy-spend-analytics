# Methodology: how this analysis was built

This document explains every step of the project in enough detail to review or rebuild it: the data, each transformation, the checks, the analysis methods and their formulas, the forecast, and the known limitations. The short version of the results is in the [executive memo](02_executive_memo.md); the original problem framing is in the [scoping memo](01_scoping_memo.md).

## Contents

1. [The question and the audience](#1-the-question-and-the-audience)
2. [Data sources](#2-data-sources)
3. [Pipeline overview](#3-pipeline-overview)
4. [Ingestion](#4-ingestion)
5. [Staging and the bug the checks caught](#5-staging-and-the-bug-the-checks-caught)
6. [Crosswalk: matching drug names to NDC codes](#6-crosswalk-matching-drug-names-to-ndc-codes)
7. [Data quality checks](#7-data-quality-checks)
8. [Analysis methods](#8-analysis-methods)
9. [Forecast](#9-forecast)
10. [Dashboard and exports](#10-dashboard-and-exports)
11. [Validation against published figures](#11-validation-against-published-figures)
12. [Limitations](#12-limitations)
13. [Reproducing the results](#13-reproducing-the-results)
14. [Glossary](#14-glossary)

---

## 1. The question and the audience

**Audience.** A VP of Pharmacy at a health system, or a GPO (group purchasing organization) pharmacy team that advises member hospitals on drug contracting.

**Question.** Drug spend keeps rising. How much of the increase is price and how much is volume, which drugs drive it, where are the savings, and what does the next two years look like?

**Why these choices.** A pharmacy leader acts on a short list of drugs and needs a dollar figure with a stated confidence. So every result is expressed in dollars, ranked, and paired with what the number does and does not include.

## 2. Data sources

| Source | Publisher | Grain | Years used | Rows loaded |
|---|---|---|---|---|
| Medicare Part D Spending by Drug | CMS | Drug (brand + generic name) x manufacturer, five years side by side | 2020 to 2024 | 14,536 |
| NADAC (National Average Drug Acquisition Cost) | CMS / Medicaid | NDC code x weekly publication date | 2023, 2024, 2025 files | 4,482,736 |
| Medicare negotiated prices, first cycle | CMS fact sheet, Aug 2024 | 10 drugs | effective 2026 | 10 (typed in `sql/04_marts.sql`) |

**What Part D spend means.** "Total spending" is the gross drug cost on Part D claims: what Medicare, the plan and the beneficiary paid together at the pharmacy. It does **not** subtract manufacturer rebates, which CMS cannot publish. Every dollar figure in this project is therefore gross.

**What NADAC means.** NADAC is the average price retail community pharmacies pay to acquire a drug, from a monthly invoice survey, published weekly per NDC. It covers drugs that retail pharmacies stock; most specialty drugs and vaccines are not in it.

**What an NDC is.** The National Drug Code identifies a specific product and package (for example, Eliquis 5 mg tablets in a 60-count bottle). Part D reports drugs by name; NADAC reports them by NDC. Linking the two is the crosswalk in section 6.

## 3. Pipeline overview

```
src/ingest.py      download -> data/raw/*.csv -> DuckDB raw_* tables (unchanged, all text)
src/build.py       runs sql/01..04 in order, then src/checks.py
  sql/01_stg_partd.sql      Part D wide -> long, typed
  sql/02_stg_nadac.sql      NADAC typed, column drift fixed, annual price per NDC
  sql/03_xwalk_drug_ndc.sql drug-name -> NDC crosswalk + coverage report
  sql/04_marts.sql          classes, facts, analysis marts
src/forecast.py    forecast with back-test -> mart_forecast
src/export.py      outputs/marts/*.csv and dashboard/data.js
```

**Why DuckDB.** It is a single-file analytical database that runs SQL directly on CSVs, needs no server, and handles the 4.5M NADAC rows in seconds on a laptop. All modeling is plain SQL so it ports to any warehouse.

**Why layers (raw, staging, marts).** The raw layer is never edited, so any staged number can be traced back to the source file. Staging cleans and types. Marts answer specific questions. This is the same layering used in dbt projects.

## 4. Ingestion

`src/ingest.py`:

- Pages through the CMS data API for Part D (5,000 rows per request, with retries) and writes one CSV.
- Downloads the three NADAC yearly CSVs.
- Loads every file into DuckDB **as text** (`all_varchar=true`), so nothing is silently converted on load. Type conversion happens in staging, where it is visible.
- Writes `data/raw/manifest.json` with each file's size, SHA-256 hash and the loaded row counts. Anyone rerunning the pipeline can confirm they have the same inputs.

The raw data (about 400 MB) is not committed to Git; the manifest is.

## 5. Staging and the bug the checks caught

### Part D (`sql/01_stg_partd.sql`)

The raw file has one row per drug and manufacturer, with five sets of columns, one per year (`Tot_Spndng_2020` ... `Tot_Spndng_2024`). Staging turns this into one row per drug, manufacturer and year, and converts text to numbers.

Two kinds of rows exist:

- `Mftr_Name = 'Overall'`: CMS's total for the drug across all manufacturers.
- One row per manufacturer.

Adding both would double-count spend, so every analysis uses either Overall rows (drug level) or manufacturer rows, never both.

**The bug.** The first version reshaped the data with DuckDB's `UNPIVOT`. The reconciliation check (staged spend must equal raw spend, per year) failed by about $40M to $160M a year. Investigation showed the cause: CMS suppresses small beneficiary counts (they appear as empty), and a multi-column `UNPIVOT` dropped every drug-year where any of the unpivoted values was empty, taking that drug-year's spend with it. Adding `INCLUDE NULLS` did not fix it, so the step was rewritten as five `SELECT` statements joined with `UNION ALL`, one per year. After that, staged spend matched raw spend to the cent and manufacturer rows summed to their Overall rows.

This is why the checks exist: the query ran without errors and produced plausible totals that were wrong.

### NADAC (`sql/02_stg_nadac.sql`)

Two problems were found while profiling:

1. **Column names changed between years.** The 2023 file uses `NADAC_Per_Unit`; the 2024 and 2025 files use `NADAC Per Unit`. Loading the files together by column name produced two half-empty columns for each field. Staging merges them with `coalesce`.
2. **Which date to use.** Each row has an Effective Date (when the price took effect, sometimes years earlier) and an As of Date (the weekly publication). Prices are dated by As of Date, so each yearly file holds 52 or 53 weekly snapshots of that year. A first check using text dates showed misleading ranges, because `MM/DD/YYYY` strings do not sort chronologically; dates are parsed before any comparison.

`int_nadac_annual` then reduces the weekly data to one row per NDC per year: the average weekly price, the last price of the year, and brand or generic classification.

## 6. Crosswalk: matching drug names to NDC codes

**Problem.** Part D names a drug "Humira(Cf) Pen"; NADAC describes the product as "HUMIRA(CF) PEN 40 MG/0.4 ML" under an 11-digit NDC. There is no shared key.

**Scope decision.** Matching all 3,625 drugs would mean weeks of edge cases for little additional spend, because spend is highly concentrated. The crosswalk covers the drugs that make up the first 80% of 2024 spend, plus every adalimumab product (needed for the biosimilar analysis): **257 drugs, $231.2B**.

**Name normalization.** Upper-case, remove the CMS asterisk (which marks drugs with several administration routes), remove pack notes such as "(2 Pens)", collapse spaces.

**Three match tiers.** Each drug uses the first tier that finds at least one NDC:

| Tier | Rule | Example |
|---|---|---|
| 1. Exact | NDC description starts with the full normalized name, followed by a space | "JARDIANCE" -> "JARDIANCE 10 MG TABLET" |
| 2. Salt | Same, after removing salt words (calcium, sodium, HCl, mesylate, ...) | "ATORVASTATIN CALCIUM" -> "ATORVASTATIN 10 MG TABLET" |
| 3. Brand word | First word of a brand name, brand NDCs only, labeled approximate | "TRESIBA FLEXTOUCH U-200" -> "TRESIBA FLEXTOUCH 100 UNIT/ML" |

Within tiers 1 and 2, an NDC is assigned to the longest name that claims it, so "HUMIRA PEN 40 MG" goes to "Humira Pen", not to "Humira".

**Separating true misses from coverage gaps.** A drug with no match is labeled `not_in_nadac` when neither its brand name's first word nor its ingredient's first word starts any NADAC description. Those drugs are absent from NADAC by design. The rest are `unmatched`.

**Result** (`rpt_xwalk_coverage`):

| Status | Drugs | 2024 spend | Share of scope |
|---|---|---|---|
| Matched | 167 | $177.0B | 76.6% |
| Not in NADAC | 77 | $53.9B | 23.3% |
| Unmatched | 13 | $0.3B | 0.1% |

**99.8% of the in-scope spend that NADAC carries is matched.** The 13 misses are one insulin pump device and small adalimumab biosimilar products. The $53.9B not in NADAC (Revlimid, Xtandi, Imbruvica, Ibrance, vaccines and others) is a finding in itself: nearly a quarter of top-drug spend has no public acquisition-cost benchmark.

## 7. Data quality checks

`src/checks.py` holds 11 checks. Each is a SQL query that returns the failing rows, so a healthy dataset returns zero rows everywhere. `src/build.py` runs them after every build and exits with an error if any fails.

| # | Check | Why it matters |
|---|---|---|
| 1 | One row per drug x manufacturer x year | Duplicates would inflate spend |
| 2 | Staged spend equals raw spend, per year | Catches rows lost in reshaping (caught the UNPIVOT bug) |
| 3 | Manufacturer rows sum to the Overall row, within $1 | Confirms the two row types are consistent |
| 4 | No negative spend, units or claims | Catches parsing errors |
| 5 | Every NADAC row has a price and a date | Catches failed type conversion |
| 6 | One NADAC row per NDC x week | Duplicates would skew averages |
| 7 | No NADAC rows lost in staging | Same as check 2, for NADAC |
| 8 | NDCs are 11 digits | Catches lost leading zeros |
| 9 | Prices are positive | Catches bad values |
| 10 | Every in-scope drug has a crosswalk status | No drug silently dropped from the coverage report |
| 11 | At least 90% of matchable in-scope spend is matched | Guards the crosswalk against regressions |

## 8. Analysis methods

All analysis tables are in `sql/04_marts.sql`.

### 8.1 Drug classes

Part D has no therapeutic class field. Classes are assigned from ingredient-name rules for the classes that drive spend: GLP-1 / incretin, SGLT2 inhibitor, DPP-4 inhibitor, insulin, anticoagulant (DOAC), immunology biologic / targeted, oral oncology, respiratory inhaler, HIV, heart failure / cardiomyopathy, vaccine. Everything else is "Other", which holds 36% of 2024 spend. The rules are readable in one `CASE` statement, so anyone can audit a classification.

### 8.2 Concentration

Drugs are ranked by 2024 spend and the running share is computed. Result: 38 drugs make up 50% of spend, 220 make up 80%, and the top 10 make up 29%.

### 8.3 Price, volume and new-drug decomposition

For each drug, spend is price per unit times units: `S = p x q`, where `p` is gross spend divided by CMS dosage units. The change from 2020 to 2024 is split into a price part and a volume part using the **midpoint method**:

```
price effect  = (p_2024 - p_2020) x (q_2020 + q_2024) / 2
volume effect = (q_2024 - q_2020) x (p_2020 + p_2024) / 2
```

The two parts add up to the full change exactly, with no leftover term, and neither year is treated as the "base". Drugs with no 2020 spend form a separate **new drug** segment (their whole 2024 spend). Drugs with 2020 spend but none in 2024 would be **exits**; this release contains none (see limitations).

| Driver | Change |
|---|---|
| Volume | +$65.1B |
| New drugs | +$31.3B |
| Price | −$1.9B |
| Total | +$94.6B |

The price line is the sum of +$15.0B from brand-name drugs, −$9.0B from generic-named drugs (where CMS lists the brand name as the ingredient name, a proxy for generics) and −$7.8B from insulin.

### 8.4 Adalimumab biosimilar scenarios

Adalimumab products are grouped into Humira and biosimilars. For 2024, price per unit is total gross spend divided by total units per group. Biosimilars launched at two list-price levels, so two biosimilar prices are used:

- **Blended:** all biosimilar spend divided by all biosimilar units ($2,045).
- **Low list:** only biosimilar products under $1,000 per unit ($638).

Savings for a conversion share `c` of 2024 Humira units:

```
gross savings = Humira units x c x (Humira price per unit - biosimilar price per unit)
```

Scenarios: 25%, 50% and 75% conversion, at both prices.

### 8.5 2026 negotiated prices

For each of the ten drugs, the discount is `1 - negotiated price / 2023 list price` (30-day supply, from the CMS fact sheet). The estimated gross reduction is 2024 gross spend times that discount. Total: $61.3B of 2024 spend, $37.5B estimated gross reduction (61%).

This is compared with CMS's own estimate of about $6B (22%) in savings had the prices applied in 2023, which is **net of rebates**. The difference shows how much of the list-to-negotiated gap was already being returned as rebates.

## 9. Forecast

`src/forecast.py` forecasts 2025 and 2026 gross spend per drug class and in total.

**Candidate methods** (fitted per class, summed for the total):

| Method | Assumption |
|---|---|
| Linear | Spend grows by the same number of dollars each year |
| Log-linear | Spend grows by the same percentage each year |
| Recent | Last year's growth rate continues |

**Rolling-origin back-test.** Each method is fitted on 2020 to 2022 and asked to predict 2023, then fitted on 2020 to 2023 and asked to predict 2024. Errors on total spend:

| Method | 2023 error | 2024 error | Mean |
|---|---|---|---|
| Linear | 5.2% | 3.5% | **4.3%** |
| Log-linear | 1.9% | 9.5% | 5.7% |
| Recent | 1.2% | 14.5% | 7.9% |

Linear has the lowest mean error and is used. A useful property: linear class forecasts add up exactly to a linear forecast of the total, so the class view and the total view never disagree.

**Range.** The forecast range is plus or minus the largest back-test error of the chosen method (5.2%, with a 3% floor). With five annual data points, a narrower range would imply precision the data cannot support.

**Negotiated prices.** For 2026, each class's forecast is reduced by its 2024 share of negotiated-drug gross reduction. This stays on a gross basis, consistent with the data.

| | Forecast | Range |
|---|---|---|
| 2025 | $317.8B | $301.3B to $334.3B |
| 2026 | $343.0B | $325.1B to $360.8B |
| 2026 with negotiated prices | $295.5B | $280.2B to $310.9B |

**Structural break.** Insulin spend fell 52% in 2024 after manufacturers cut list prices. The linear fit holds insulin near its new level, which is reasonable, but the class illustrates why trend forecasts need human review.

## 10. Dashboard and exports

- **`dashboard/index.html`** is a single HTML page with inline SVG charts, hover tooltips on every mark, and light and dark mode. It reads its numbers from `dashboard/data.js`, which `src/export.py` writes from the marts, so the dashboard always matches the database. Chart colors were checked with a color-vision-deficiency validator.
- **`outputs/marts/*.csv`** holds every mart as a CSV, ready to load into Tableau Public or Power BI.

## 11. Validation against published figures

| Figure | This project | Published | Note |
|---|---|---|---|
| 2023 Part D gross spend | $275.8B | about $275.9B from the previous CMS release | Within 0.1% |
| 2021 Part D gross spend | $213.5B | $216B (KFF, from an earlier release) | About 1% lower; see limitations |
| Negotiated-price discounts | 38% to 79% | 38% to 79% (CMS) | Same source table |

Every number in the executive memo was recomputed from the database after it was written.

## 12. Limitations

- **Gross, not net.** Rebates are not public. Net spend and net savings are lower than the figures shown, sometimes much lower.
- **Part D only.** Clinic-administered drugs (Part B) are out of scope.
- **Earlier years slightly understated.** This release contains no drugs that stopped being dispensed before 2024, so earlier years are about 1% below figures from older releases, and 2020 to 2024 growth is slightly overstated.
- **Price per unit includes mix.** A shift between strengths or package sizes of the same drug shows up as a price change.
- **Rule-based classes.** 36% of spend is in "Other".
- **Generic proxy.** "Generic-named" means CMS lists the brand name as the ingredient name. Most such products are generics, but the proxy is imperfect.
- **Forecast is a trend, not a model of causes.** It does not model patent expiries, new launches or policy changes beyond the 2026 negotiated prices.

## 13. Reproducing the results

```bash
git clone https://github.com/SudamshuRao/pharmacy-spend-analytics.git
cd pharmacy-spend-analytics
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python src/ingest.py      # about 400 MB of downloads
python src/build.py       # all 11 checks should print PASS
python src/forecast.py
python src/export.py
open dashboard/index.html
```

`data/raw/manifest.json` lists the hashes of the input files used for the published results. If CMS publishes a new Part D release with different years, `src/build.py` stops with a message saying which year list in `sql/01_stg_partd.sql` to update.

## 14. Glossary

| Term | Meaning |
|---|---|
| Part D | Medicare's outpatient prescription drug benefit (drugs patients take themselves) |
| Part B | Medicare coverage for drugs given in a clinic or hospital outpatient setting |
| Gross spend | Total paid at the pharmacy before manufacturer rebates |
| Rebate | Money a manufacturer pays back to a plan or PBM after the sale; not public |
| NADAC | National Average Drug Acquisition Cost: what retail pharmacies pay for a drug |
| NDC | National Drug Code: an 11-digit product and package identifier |
| GPO | Group purchasing organization: negotiates contracts on behalf of member hospitals |
| Biosimilar | A biologic highly similar to an existing biologic (for example, adalimumab biosimilars to Humira) |
| Negotiated price / MFP | Medicare's "Maximum Fair Price" for a drug selected for negotiation |
| Crosswalk | A mapping table linking identifiers from two systems |
| Midpoint method | A split of a change into price and volume parts using averages of both years, with no leftover term |
| Back-test | Testing a forecast method by predicting years whose actual values are already known |
