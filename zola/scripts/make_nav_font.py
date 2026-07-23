#!/usr/bin/env python3
"""Subset Poppins (700) to the nav labels' letters, for inlining as a data URI so the nav font
never causes a request or a first-load flash. Requires fonttools + brotli.

Output (poppins-nav.woff2 + poppins-nav.b64) is committed; base.html inlines the .b64. Re-run
only if the nav labels gain a letter not already covered.
"""

import base64
import io
import re
import urllib.request
from pathlib import Path

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont

FONTS = Path(__file__).parent.parent / "static" / "fonts"
NAV_TEXT = "HomePostsPresentations"  # every letter the nav needs
WEIGHT = 700
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"


def get(url: str) -> bytes:
    return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA})).read()


def main():
    css = get(f"https://fonts.googleapis.com/css2?family=Poppins:wght@{WEIGHT}&display=swap").decode()
    # Google splits Poppins by unicode-range; grab the `latin` block's woff2 specifically.
    m = re.search(r"/\* latin \*/\s*@font-face\s*\{[^}]*?url\((\S+?)\)", css, re.DOTALL)
    if not m:
        raise SystemExit("could not find the latin woff2 in the Poppins CSS")

    font = TTFont(io.BytesIO(get(m.group(1))))
    ss = Subsetter(options=Options(desubroutinize=True))
    ss.populate(text=NAV_TEXT)
    ss.subset(font)

    buf = io.BytesIO()
    font.flavor = "woff2"
    font.save(buf)
    data = buf.getvalue()

    (FONTS / "poppins-nav.woff2").write_bytes(data)
    (FONTS / "poppins-nav.b64").write_text(base64.b64encode(data).decode())
    print(f"  poppins-nav {WEIGHT}: {len(data)} bytes ({len(data) * 4 // 3} inlined) "
          f"for {''.join(sorted(set(NAV_TEXT)))}")


if __name__ == "__main__":
    main()
