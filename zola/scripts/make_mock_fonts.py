#!/usr/bin/env python3
"""Build 'mock' fonts: the real font's layout, none of its shapes.

Requires fonttools + brotli (`uv pip install fonttools brotli`). The .woff2 and .b64
outputs are committed, so the site build itself stays dependency-free — this only runs
when a family changes.

A mock keeps everything that decides layout — advance widths, kerning (GPOS), ligatures
(GSUB), vertical metrics — and blanks the outlines. Text set in a mock is invisible but
occupies *exactly* the space the real font would, to the pixel, so a page laid out in the
mock is already in its final layout before the real font has arrived.

Two hard-won details, both of which produce fonts that fontTools writes happily and
browsers reject or mismeasure:

  * WOFF2 re-encodes glyf/loca into a compact form by default. Run that over a glyf table
    where every glyph is empty and the result is "Invalid font data" in the browser. The
    transform is disabled below; there are no outlines left to compact anyway.

  * A *variable* mock silently loses bold. Advance variation lives in gvar's phantom
    points, and blanking the glyphs destroys them — HVAR alone does not carry it, so every
    bold word comes out ~4% narrow. Pinning each weight to its own static instance bakes
    the advances into hmtx, where nothing can vary them away.

OFL: both families carry a Reserved Font Name, so derivatives must be renamed.
"""

import base64
from pathlib import Path

from fontTools.ttLib import TTFont
from fontTools.ttLib.woff2 import WOFF2FlavorData
from fontTools.varLib import instancer
from fontTools.pens.ttGlyphPen import TTGlyphPen

ROOT = Path(__file__).parent.parent
FONTS = ROOT / "static" / "fonts"

# Rendering and hinting only — none of this decides where a glyph sits.
JUNK = ["prep", "gasp", "fpgm", "cvt ", "DSIG", "BASE"]

WEIGHTS = (400, 700)
SOURCES = {"source-serif-4": "MockSerif", "ibm-plex-sans": "MockSans"}


def mock(src: Path, family: str, wght: int) -> bytes:
    f = TTFont(src)
    # The italics ship as static instances already, so there is no axis to pin.
    if "fvar" in f:
        instancer.instantiateVariableFont(f, {"wght": wght}, inplace=True)

    hmtx, glyf = f["hmtx"], f["glyf"]
    for name in f.getGlyphOrder():
        adv, lsb = hmtx[name]
        glyf[name] = TTGlyphPen(None).glyph()
        hmtx[name] = (adv, lsb)  # advance preserved exactly

    for t in JUNK:
        if t in f:
            del f[t]
    f["post"].formatType = 3.0  # glyph names are dead weight

    for rec in f["name"].names:
        try:
            v = rec.toUnicode()
        except Exception:
            continue
        if "Source" in v or "Plex" in v:
            rec.string = family

    import io
    f.flavor = "woff2"
    f.flavorData = WOFF2FlavorData(transformedTables=[])
    buf = io.BytesIO()
    f.save(buf)
    return buf.getvalue()


def main():
    for stem, family in SOURCES.items():
        total = 0
        # roman: one static mock per weight; italic: one, it has no axis
        jobs = [(FONTS / f"{stem}.woff2", w, f"mock-{stem}-{w}") for w in WEIGHTS]
        jobs += [(FONTS / f"{stem}-italic.woff2", 400, f"mock-{stem}-italic")]
        for src, wght, name in jobs:
            data = mock(src, family, wght)
            (FONTS / f"{name}.woff2").write_bytes(data)
            (FONTS / f"{name}.b64").write_text(base64.b64encode(data).decode())
            total += len(data)
            print(f"  {name:34} {len(data) / 1024:5.1f} KB")
        src = FONTS / f"{stem}.woff2"
        b64 = total * 4 / 3
        print(f"  {'':10} ->   {total / 1024:5.1f} KB, {b64 / 1024:5.1f} KB inlined"
              f"   (real: {src.stat().st_size / 1024:.1f} KB)\n")


if __name__ == "__main__":
    main()
