"""
Phase 2: build the modeled tables from the raw layer, then run data checks.

Runs every sql/NN_*.sql file in order against data/pharmacy.duckdb, then the
checks in src/checks.py. Exits non-zero if any check fails.

Usage
  python src/build.py
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

import duckdb

ROOT = Path(__file__).resolve().parents[1]
DB_PATH = ROOT / "data" / "pharmacy.duckdb"
SQL_DIR = ROOT / "sql"
STAGED_PARTD_YEARS = {2020, 2021, 2022, 2023, 2024}  # years sql/01 covers

sys.path.insert(0, str(Path(__file__).resolve().parent))
from checks import run_checks  # noqa: E402


def guard_partd_years(con: duckdb.DuckDBPyConnection) -> None:
    cols = [r[0] for r in con.execute("DESCRIBE raw_partd_spending").fetchall()]
    raw_years = {int(m.group(1)) for c in cols if (m := re.fullmatch(r"Tot_Spndng_(\d{4})", c))}
    if raw_years != STAGED_PARTD_YEARS:
        raise SystemExit(
            f"Part D release covers {sorted(raw_years)} but sql/01_stg_partd.sql "
            f"covers {sorted(STAGED_PARTD_YEARS)}. Update the UNPIVOT list."
        )


def main() -> None:
    con = duckdb.connect(str(DB_PATH))
    guard_partd_years(con)
    for sql_file in sorted(SQL_DIR.glob("[0-9][0-9]_*.sql")):
        print(f"running {sql_file.name}")
        con.execute(sql_file.read_text())
    ok = run_checks(con)
    con.close()
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
