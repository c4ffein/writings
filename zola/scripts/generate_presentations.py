#!/usr/bin/env python3
"""
Convert presentations.toml into zola/content/presentations-index.md.

The page itself is a normal Zola page (templates/presentations.html, which extends
base.html), so the shared theme is obtained by RENDERING the template like every other
page — not by slicing its source text, as this script used to do. All this script does
now is ferry data: presentations.toml -> the page's [extra] frontmatter.

Naive strings only (matching the site's hardening stance): a quote, backslash, or
newline in a title/href fails loudly instead of being escaped.

Runs BEFORE `zola build` (make build orders the dependency). After the build, the
Makefile copies public/presentations-index/index.html to public/presentations-index.html
— the stable flat URL other repos curl:
https://c4ffein.github.io/writings/presentations-index.html
"""

import tomllib
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent.parent
PRESENTATIONS_TOML = REPO_ROOT / "presentations.toml"
OUTPUT = REPO_ROOT / "zola" / "content" / "presentations-index.md"


def naive(s: str, what: str) -> str:
    if any(c in s for c in '"\\\n'):
        raise SystemExit(
            f"presentations.toml: {what} {s!r} contains a quote/backslash/newline — "
            "not supported (naive strings only)"
        )
    return s


def main():
    with open(PRESENTATIONS_TOML, "rb") as f:
        config = tomllib.load(f)
    presentations = config.get("presentations", [])
    if not presentations:
        raise SystemExit("presentations.toml: no [[presentations]] entries")
    items = ",\n".join(
        f'    {{ href = "{naive(p["href"], "href")}", title = "{naive(p["title"], "title")}" }}'
        for p in presentations
    )
    OUTPUT.write_text(f"""+++
title = "Presentations"
path = "presentations-index"
template = "presentations.html"
in_search_index = false

[extra]
presentations = [
{items}
]
+++
""")
    print(f"Generated {OUTPUT}")


if __name__ == "__main__":
    main()
