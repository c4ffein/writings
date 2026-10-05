#!/usr/bin/env python3
"""
Convert presentations.toml into zola/content/presentations-index.md.

The page itself is a normal Zola page (templates/presentations.html, which extends
base.html), so the shared theme is obtained by RENDERING the template like every other
page — not by slicing its source text, as this script used to do. All this script does
now is ferry data: presentations.toml -> the page's [extra] frontmatter.

Naive strings only (matching the site's hardening stance): a quote, backslash, or
newline in a title/href fails loudly instead of being escaped.

The decks' own metadata (languages, narration, which deck is a sub-presentation
of which) is NOT in presentations.toml: it comes from presentations.json, built
by the presentations repo from its sources. PRESENTATIONS_META is a local path
to that file, else it is fetched from https://c4ffein.github.io/presentations/.
Entries match decks by href (slides/<name>.html). Which recordings exist is
checked on the audio host with HEAD requests (PRESENTATIONS_AUDIO_CHECK=0 skips
that and reports audio as "unknown"); no network failure fails the build —
a warning, and the page falls back to the toml fields.

Runs BEFORE `zola build` (make build orders the dependency). After the build, the
Makefile copies public/presentations-index/index.html to public/presentations-index.html
— the stable flat URL other repos curl:
https://c4ffein.github.io/writings/presentations-index.html
"""

import json
import os
import sys
import tomllib
import urllib.error
import urllib.request
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent.parent
PRESENTATIONS_TOML = REPO_ROOT / "presentations.toml"
OUTPUT = REPO_ROOT / "zola" / "content" / "presentations-index.md"
META_URL = "https://c4ffein.github.io/presentations/presentations.json"


def warn(msg: str) -> None:
    print(f"generate_presentations.py: warning: {msg}", file=sys.stderr)


def load_meta() -> dict:
    """The decks of presentations.json ({} when it cannot be read)."""
    where = os.environ.get("PRESENTATIONS_META") or META_URL
    try:
        if where.startswith(("http://", "https://")):
            with urllib.request.urlopen(where, timeout=10) as r:
                data = json.load(r)
        else:
            data = json.loads(Path(where).read_text())
        return data.get("decks", {})
    except (OSError, ValueError, urllib.error.URLError) as e:
        warn(f"could not read deck metadata from {where} ({e}): languages, audio and includes are left out")
        return {}


_head_cache: dict[str, bool] = {}


def exists(url: str) -> bool:
    if url not in _head_cache:
        try:
            req = urllib.request.Request(url, method="HEAD")
            with urllib.request.urlopen(req, timeout=5) as r:
                _head_cache[url] = 200 <= r.status < 300
        except (OSError, urllib.error.URLError):
            _head_cache[url] = False
    return _head_cache[url]


def audio_state(narration: dict, code: str) -> str | None:
    """"full" | "partial" | "unknown" | None for one language of a deck's narration."""
    if not narration or code not in narration.get("langs", []):
        return None
    names = narration.get("names", [])
    if not names:
        return None
    if os.environ.get("PRESENTATIONS_AUDIO_CHECK") == "0":
        return "unknown"
    found = sum(exists(f"{narration['base']}/{name}.{code}.mp3") for name in names)
    return "full" if found == len(names) else "partial" if found else None


def languages(deck: dict) -> list[dict]:
    nar = deck.get("narration") or {}
    codes = list(deck.get("slideLangs", []))
    for c in nar.get("langs", []):
        if c not in codes:
            codes.append(c)
    out = []
    for c in codes:
        entry = {"code": c, "slides": c in deck.get("slideLangs", [])}
        audio = audio_state(nar, c)
        if audio:
            entry["audio"] = audio
        if entry["slides"] or audio:   # a language the deck only promises recordings in, with none yet, is not offered
            out.append(entry)
    return out


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
    meta = load_meta()
    by_href = {p["href"]: p for p in presentations}

    def link(name: str) -> str:
        """{ href, title } of another deck: its toml entry's title when listed, else the deck's own."""
        d = meta[name]
        href = d["file"]
        title = by_href[href]["title"] if href in by_href else d["title"]
        return f'{{ href = "{naive(href, "href")}", title = "{naive(title, "title")}" }}'

    def item(p):
        fields = [f'href = "{naive(p["href"], "href")}"', f'title = "{naive(p["title"], "title")}"']
        if p.get("description"):
            fields.append(f'description = "{naive(p["description"], "description")}"')
        if p.get("audience"):
            fields.append(f'audience = "{naive(p["audience"], "audience")}"')
        deck = meta.get(p["href"].removeprefix("slides/").removesuffix(".html"))
        if deck:
            langs = []
            for l in languages(deck):
                parts = [f'code = "{naive(l["code"], "language")}"', f'slides = {str(l["slides"]).lower()}']
                if "audio" in l:
                    parts.append(f'audio = "{l["audio"]}"')
                langs.append("{ " + ", ".join(parts) + " }")
            if langs:
                fields.append("langs = [" + ", ".join(langs) + "]")
            for key, toml_key in (("partOf", "part_of"), ("includes", "includes")):
                if deck.get(key):
                    fields.append(f"{toml_key} = [" + ", ".join(link(n) for n in deck[key]) + "]")
        return "    { " + ", ".join(fields) + " }"

    items = ",\n".join(item(p) for p in presentations)
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
