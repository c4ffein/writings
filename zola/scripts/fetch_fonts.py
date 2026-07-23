#!/usr/bin/env python3
"""Download the self-hosted webfonts into zola/static/fonts/. Zero dependencies (Python 3.11+).

The .woff2 files are committed to the repo; this script exists so their provenance is
reproducible rather than mystery binaries. Re-run only to update a family.

One file per family covers the roman weights (Google's is variable across the axis) plus
one static italic. Only the `latin` subset is fetched. It covers U+0000-00FF, which is all of English and
French. A word containing a glyph outside it (Polish, Czech, Turkish...) falls back to
the system font for that word, which is graceful but will sit out the wave.
"""

import hashlib
import re
import urllib.request
from pathlib import Path

ROOT = Path(__file__).parent.parent
OUTPUT_DIR = ROOT / "static" / "fonts"

# A browser UA is required, or the CSS API serves .ttf instead of .woff2.
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"

FAMILIES = {
    "source-serif-4": {
        "css": "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,700;1,400&display=swap",
        "license": "https://raw.githubusercontent.com/adobe-fonts/source-serif/release/LICENSE.md",
    },
    "ibm-plex-sans": {
        "css": "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400&display=swap",
        "license": "https://raw.githubusercontent.com/IBM/plex/master/LICENSE.txt",
    },
}

SUBSET = "latin"


def get(url: str) -> bytes:
    return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA})).read()


def faces(css: str):
    """Yield (style, weight, url) for the wanted subset."""
    for subset, body in re.findall(r"/\* (\S+) \*/\s*@font-face \{(.*?)\}", css, re.DOTALL):
        if subset != SUBSET:
            continue
        style = re.search(r"font-style:\s*(\S+);", body).group(1)
        weight = re.search(r"font-weight:\s*(\S+);", body).group(1)
        url = re.search(r"url\((\S+?)\)", body).group(1)
        yield style, weight, url


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    total = 0

    for name, meta in FAMILIES.items():
        css = get(meta["css"]).decode()

        # Google serves one *variable* roman covering the whole weight axis, and hands back
        # the identical bytes whatever weight you ask for — so 400 and 700 are the same
        # file. Fetching per weight downloads it twice and makes the browser do the same.
        # Group by content instead, and let one @font-face declare the weight range.
        by_hash = {}
        for style, weight, url in faces(css):
            data = get(url)
            digest = hashlib.md5(data).hexdigest()
            by_hash.setdefault(digest, {"data": data, "styles": set(), "weights": set()})
            by_hash[digest]["styles"].add(style)
            by_hash[digest]["weights"].add(weight)

        for entry in by_hash.values():
            italic = "italic" in entry["styles"]
            out = OUTPUT_DIR / (f"{name}-italic.woff2" if italic else f"{name}.woff2")
            out.write_bytes(entry["data"])
            total += len(entry["data"])
            covers = "+".join(sorted(entry["weights"]))
            print(f"  {out.name:30} {len(entry['data']) / 1024:6.1f} KB  (weights {covers})")

        # Both families are OFL; the license must ship with the fonts.
        license_out = OUTPUT_DIR / f"{name}-LICENSE.txt"
        license_out.write_bytes(get(meta["license"]))
        print(f"  {license_out.name:30} (license)")

    print(f"\nTotal: {total / 1024:.1f} KB across {len(FAMILIES)} families (one loads per article).")


if __name__ == "__main__":
    main()
