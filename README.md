# Pharmacy Spend Analytics

An end-to-end analysis of Medicare Part D drug spend: what is driving the growth, and where the savings are.

> Work in progress. See [ROADMAP.md](ROADMAP.md) for phases and status.

## The question
Drug spend keeps rising. How much of the increase comes from price versus volume, which drugs drive it, and how much could generic and biosimilar switching save?

The full problem framing is in the [scoping memo](docs/01_scoping_memo.md).

## Data
- [CMS Medicare Part D Spending by Drug](https://data.cms.gov/summary-statistics-on-use-and-payments/medicare-medicaid-spending-by-drug/medicare-part-d-spending-by-drug)
- [CMS NADAC (National Average Drug Acquisition Cost)](https://data.medicaid.gov/dataset/nadac-national-average-drug-acquisition-cost)

Spend figures are gross of manufacturer rebates, which CMS does not publish.

## Run it
```bash
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python src/ingest.py        # downloads raw data and builds data/pharmacy.duckdb
```

## Repo layout
```
src/          Python: data download and loading
sql/          SQL models: staging, crosswalk, star schema
notebooks/    Analysis and forecasting
dashboard/    Dashboard file and screenshots
docs/         Scoping memo, executive memo, deck
data/raw/     Downloaded data (not committed) + manifest.json
```

## Stack
Python, DuckDB, SQL, pandas, statsmodels, and a BI dashboard.
