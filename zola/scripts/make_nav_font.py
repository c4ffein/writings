#!/usr/bin/env python3
"""Subset Poppins to exactly the letters a page needs, for inlining as a data URI so the
font never causes a request or a first-load flash. Requires fonttools + brotli.

Usage: make_nav_font.py [weight] [subset...]   (default: weight 500, all subsets — keep
base.html's two font-weight declarations, the inline @font-face and the `nav a` rule, in
sync with this)

Outputs (<name>.woff2 + <name>.b64) are committed; the templates inline the .b64 (base.html
for the nav, 404.html for its own). Re-run only if a subset's text gains a letter not
already covered, or to change the weight.
"""

import base64
import io
import re
import sys
import urllib.request
from pathlib import Path

from fontTools.subset import Options, Subsetter
from fontTools.ttLib import TTFont

FONTS = Path(__file__).parent.parent / "static" / "fonts"
SUBSETS = {
    # every letter the nav needs
    "poppins-nav": "HomePostsPresentations",
    # the 404 page's entire message (templates/404.html), digits and punctuation included
    "poppins-404": "404 (Not Found, but you know that, right?)"
                   "Are you lost?"
                   "Maybe try the homepage, the writings, the presentations…"
                   "Or if you think there should be something here, tell me something is wrong.",
}
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"


def get(url: str) -> bytes:
    return urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA})).read()


def main():
    args = sys.argv[1:]
    weight = int(args[0]) if args and args[0].isdigit() else 500
    names = [a for a in args if not a.isdigit()] or list(SUBSETS)
    unknown = [n for n in names if n not in SUBSETS]
    if unknown:
        raise SystemExit(f"unknown subset(s) {unknown}; expected one of {', '.join(SUBSETS)}")

    css = get(f"https://fonts.googleapis.com/css2?family=Poppins:wght@{weight}&display=swap").decode()
    # Google splits Poppins by unicode-range; grab the `latin` block's woff2 specifically.
    m = re.search(r"/\* latin \*/\s*@font-face\s*\{[^}]*?url\((\S+?)\)", css, re.DOTALL)
    if not m:
        raise SystemExit("could not find the latin woff2 in the Poppins CSS")
    src = get(m.group(1))

    for name in names:
        font = TTFont(io.BytesIO(src))
        ss = Subsetter(options=Options(desubroutinize=True))
        ss.populate(text=SUBSETS[name])
        ss.subset(font)

        buf = io.BytesIO()
        font.flavor = "woff2"
        font.save(buf)
        data = buf.getvalue()

        (FONTS / f"{name}.woff2").write_bytes(data)
        (FONTS / f"{name}.b64").write_text(base64.b64encode(data).decode())
        print(f"  {name} {weight}: {len(data)} bytes ({len(data) * 4 // 3} inlined) "
              f"for {''.join(sorted(set(SUBSETS[name])))}")


if __name__ == "__main__":
    main()
