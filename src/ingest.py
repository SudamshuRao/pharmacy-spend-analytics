"""
Phase 1: Data acquisition.

Downloads the raw public datasets into data/raw/ and loads them into a local
DuckDB file (data/pharmacy.duckdb) as untouched "raw_" tables. Cleaning and
modeling happen later in sql/, so the raw layer always matches the source.

Sources
  1. CMS Medicare Part D Spending by Drug (annual, 5 rolling years, wide format)
     https://data.cms.gov/summary-statistics-on-use-and-payments/medicare-medicaid-spending-by-drug/medicare-part-d-spending-by-drug
  2. CMS NADAC (National Average Drug Acquisition Cost), weekly, one file per year
     https://data.medicaid.gov/dataset/nadac-national-average-drug-acquisition-cost

Usage
  python src/ingest.py              # download everything + load DuckDB
  python src/ingest.py --skip-download   # just (re)load DuckDB from data/raw
"""

from __future__ import annotations

import argparse
import csv
import hashlib
import json
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import duckdb
import requests

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
DB_PATH = ROOT / "data" / "pharmacy.duckdb"
MANIFEST = RAW / "manifest.json"

# Latest Part D Spending by Drug release (data.cms.gov dataset id).
# If CMS publishes a new release, update this id (or pass --partd-dataset-id).
PARTD_DATASET_ID = "7e0b4365-fd63-4a29-8f5e-e0ac9f66a81b"
PARTD_API = "https://data.cms.gov/data-api/v1/dataset/{id}/data"
PAGE_SIZE = 5000

# NADAC yearly files (each holds every weekly price published that year).
NADAC_FILES = {
    2023: "https://download.medicaid.gov/data/nadac-national-average-drug-acquisition-cost-12-27-2023.csv",
    2024: "https://download.medicaid.gov/data/nadac-national-average-drug-acquisition-cost-12-25-2024.csv",
    2025: "https://download.medicaid.gov/data/nadac-national-average-drug-acquisition-cost-12-31-2025.csv",
}

SESSION = requests.Session()
SESSION.headers["User-Agent"] = "pharmacy-spend-analytics (portfolio project)"


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def get_with_retry(url: str, **kwargs) -> requests.Response:
    for attempt in range(4):
        try:
            r = SESSION.get(url, timeout=120, **kwargs)
            r.raise_for_status()
            return r
        except requests.RequestException as e:
            wait = 2 ** attempt
            print(f"  request failed ({e}); retrying in {wait}s", file=sys.stderr)
            time.sleep(wait)
    raise RuntimeError(f"giving up on {url}")


def download_partd(dataset_id: str) -> Path:
    """Page through the CMS data API and write one CSV."""
    out = RAW / "partd_spending_by_drug.csv"
    url = PARTD_API.format(id=dataset_id)
    rows, offset, writer, f = 0, 0, None, None
    print(f"Part D: paging {url}")
    try:
        while True:
            page = get_with_retry(url, params={"size": PAGE_SIZE, "offset": offset}).json()
            if not page:
                break
            if writer is None:
                f = out.open("w", newline="", encoding="utf-8")
                writer = csv.DictWriter(f, fieldnames=list(page[0].keys()))
                writer.writeheader()
            writer.writerows(page)
            rows += len(page)
            offset += PAGE_SIZE
            print(f"  {rows:,} rows")
    finally:
        if f:
            f.close()
    if rows == 0:
        raise RuntimeError("Part D API returned no rows; check the dataset id.")
    return out


def download_file(url: str, out: Path) -> Path:
    print(f"Downloading {url}")
    with SESSION.get(url, stream=True, timeout=300) as r:
        r.raise_for_status()
        with out.open("wb") as f:
            for chunk in r.iter_content(1 << 20):
                f.write(chunk)
    print(f"  {out.stat().st_size / 1e6:.1f} MB")
    return out


def load_duckdb() -> dict:
    """Load raw CSVs as-is (all VARCHAR) so nothing is silently coerced."""
    con = duckdb.connect(str(DB_PATH))
    stats = {}

    partd = RAW / "partd_spending_by_drug.csv"
    con.execute(
        "CREATE OR REPLACE TABLE raw_partd_spending AS "
        "SELECT * FROM read_csv(?, header=true, all_varchar=true)",
        [str(partd)],
    )
    stats["raw_partd_spending"] = con.execute("SELECT count(*) FROM raw_partd_spending").fetchone()[0]

    nadac_files = sorted(RAW.glob("nadac_*.csv"))
    con.execute(
        "CREATE OR REPLACE TABLE raw_nadac AS "
        "SELECT * EXCLUDE (filename), regexp_extract(filename, 'nadac_(\\d{4})', 1) AS source_year "
        "FROM read_csv(?, header=true, all_varchar=true, union_by_name=true, filename=true)",
        [[str(p) for p in nadac_files]],
    )
    stats["raw_nadac"] = con.execute("SELECT count(*) FROM raw_nadac").fetchone()[0]
    con.close()
    return stats


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--skip-download", action="store_true")
    ap.add_argument("--partd-dataset-id", default=PARTD_DATASET_ID)
    args = ap.parse_args()

    RAW.mkdir(parents=True, exist_ok=True)
    files = []
    if not args.skip_download:
        files.append(download_partd(args.partd_dataset_id))
        for year, url in NADAC_FILES.items():
            files.append(download_file(url, RAW / f"nadac_{year}.csv"))
    else:
        files = sorted(RAW.glob("*.csv"))

    stats = load_duckdb()

    manifest = {
        "loaded_at_utc": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "partd_dataset_id": args.partd_dataset_id,
        "files": {p.name: {"bytes": p.stat().st_size, "sha256": sha256(p)} for p in files},
        "row_counts": stats,
    }
    MANIFEST.write_text(json.dumps(manifest, indent=2))
    print(json.dumps(manifest["row_counts"], indent=2))
    print(f"DuckDB ready at {DB_PATH}")


if __name__ == "__main__":
    main()
