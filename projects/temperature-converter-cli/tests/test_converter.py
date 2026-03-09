#!/usr/bin/env python3
"""
Simple demo/test runner for the temperature converter.

Run from the project folder:
  python tests/test_converter.py
"""

from __future__ import annotations

import sys
from pathlib import Path

# Allow importing from src/ without packaging.
PROJECT_ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = PROJECT_ROOT / "src"
sys.path.insert(0, str(SRC_DIR))

from celsius_to_fahrenheit import celsius_to_fahrenheit, fahrenheit_to_celsius  # noqa: E402


def main() -> int:
    print("=" * 60)
    print("TEMPERATURE CONVERTER - DEMO")
    print("=" * 60)
    print()

    print("CELSIUS TO FAHRENHEIT:")
    print("-" * 60)
    for c in [0, 25, 37, 100, -40]:
        f = celsius_to_fahrenheit(c)
        print(f"{c:>6.1f}°C  =  {f:>6.2f}°F")
    print()

    print("FAHRENHEIT TO CELSIUS:")
    print("-" * 60)
    for f in [32, 77, 98.6, 212, -40]:
        c = fahrenheit_to_celsius(f)
        print(f"{f:>6.1f}°F  =  {c:>6.2f}°C")
    print()

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
