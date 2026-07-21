#!/usr/bin/env python3
"""
Generate presentations-index.html from:
- Theme extracted from zola/templates/base.html (single source of truth)
- Presentations list from presentations.toml

The theme is sliced out of base.html between explicit markers rather than
matched with regexes:

    <!-- theme:NAME start -->  …  <!-- theme:NAME end -->   (the four HTML parts)
    /* presentations-omit start */ … /* presentations-omit end */  (blog-only CSS)

If base.html is edited so a marker is dropped, reordered, or duplicated, this
fails LOUDLY naming the marker — instead of the old regex behaviour of silently
emitting an empty theme. The markers also flag, in base.html itself, which
regions the presentations page depends on, so an editor (human or agent) knows
to keep them intact or update the names here.

Output: zola/public/presentations-index.html (served on GitHub Pages)
Presentations repo can curl it: https://c4ffein.github.io/writings/presentations-index.html
"""

import tomllib
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent.parent
BASE_HTML = REPO_ROOT / "zola" / "templates" / "base.html"
PRESENTATIONS_TOML = REPO_ROOT / "presentations.toml"
DEFAULT_OUTPUT = REPO_ROOT / "zola" / "public" / "presentations-index.html"

# HTML regions lifted verbatim (tags included) from base.html, by marker name.
THEME_PARTS = ("flash", "style", "cookie", "toggle")


def slice_between(text: str, start: str, end: str, what: str) -> str:
    """Return the text strictly between `start` and `end`. Fail loud on any anomaly."""
    i = text.find(start)
    if i == -1:
        raise SystemExit(f"base.html: missing start marker {start!r} (for {what!r})")
    body_start = i + len(start)
    if text.find(start, body_start) != -1:
        raise SystemExit(f"base.html: duplicate start marker {start!r} (for {what!r})")
    j = text.find(end, body_start)
    if j == -1:
        raise SystemExit(f"base.html: missing end marker {end!r} after its start (for {what!r})")
    return text[body_start:j].strip()


def extract_theme(base_html: str) -> dict:
    return {
        name: slice_between(
            base_html, f"<!-- theme:{name} start -->", f"<!-- theme:{name} end -->", name
        )
        for name in THEME_PARTS
    }


def drop_region(text: str, start: str, end: str, what: str) -> str:
    """Remove one `start … end` region (markers included). Fail loud if absent."""
    i = text.find(start)
    if i == -1:
        raise SystemExit(
            f"base.html: missing {start!r} — expected to strip {what!r} from the presentations style"
        )
    j = text.find(end, i)
    if j == -1:
        raise SystemExit(f"base.html: missing {end!r} (for {what!r})")
    return text[:i].rstrip() + "\n" + text[j + len(end):].lstrip()


def generate_html(theme: dict, presentations: list) -> str:
    # Blog-only CSS (article / post-meta / tags / details / summary) is fenced in base.html;
    # the presentations page has no <article>, so drop that whole region by exact slicing.
    style = drop_region(
        theme["style"],
        "/* presentations-omit start */",
        "/* presentations-omit end */",
        "blog-only CSS",
    )

    items = "\n".join(
        f'        <li><a href="{p["href"]}">{p["title"]}</a></li>'
        for p in presentations
    )

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Presentations</title>
    {theme["flash"]}
    {style}
    {theme["cookie"]}
</head>
<body>
    <nav>
        <a href="https://writings.cafeine.dev">Home</a>
        <a href="https://writings.cafeine.dev/posts">Posts</a>
        <a href="https://presentations.cafeine.dev">Presentations</a>
        {theme["toggle"]}
    </nav>
    <h1>Presentations</h1>
    <ul>
{items}
    </ul>
</body>
</html>
'''


def main():
    output_path = DEFAULT_OUTPUT

    # Read base.html
    base_html = BASE_HTML.read_text()
    theme = extract_theme(base_html)

    # Read presentations list
    with open(PRESENTATIONS_TOML, "rb") as f:
        config = tomllib.load(f)
    presentations = config.get("presentations", [])

    # Generate HTML
    html = generate_html(theme, presentations)

    # Write output
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(html)
    print(f"Generated {output_path}")


if __name__ == "__main__":
    main()
