#!/usr/bin/env python3
"""Generate Zola content from source markdown files. Zero dependencies (Python 3.11+)."""

import tomllib
from pathlib import Path

ROOT = Path(__file__).parent.parent.parent
ARTICLES_FILE = ROOT / "articles.toml"
OUTPUT_DIR = ROOT / "zola" / "content" / "posts"


def toml_str(value: str) -> str:
    """Return `value` as a quoted TOML *basic* string, safely escaped.

    Escapes the two characters that would otherwise break a basic string —
    backslash and double quote — so any title/description/tag survives intact
    (this is emitted into frontmatter, so escaping is the right layer; HTML
    escaping here would render literally, e.g. `&quot;` in the title).

    Control characters (newlines, tabs, …) have no business in a frontmatter
    scalar and almost always signal a mistake in articles.toml or a stray H1,
    so they're rejected with a clear error rather than silently escaped.
    """
    bad = next((c for c in value if ord(c) < 0x20 or ord(c) == 0x7F), None)
    if bad is not None:
        raise ValueError(
            f"control character {bad!r} (U+{ord(bad):04X}) in TOML value {value!r}; "
            "remove it from articles.toml (or the source H1)"
        )
    escaped = value.replace("\\", "\\\\").replace('"', '\\"')
    return f'"{escaped}"'

# Per-article body font, set with `font = "..."` in articles.toml. Values are roles, not
# typefaces, so swapping which serif we ship is a change here and nowhere else.
# "system" opts an article out of webfonts entirely (and so out of the wave).
FONTS = {
    "sans": {
        "family": "IBM Plex Sans",
        "file": "ibm-plex-sans",
        "stack": '"IBM Plex Sans", system-ui, sans-serif',
        "mock": "MockSans",
    },
    "serif": {
        "family": "Source Serif 4",
        "file": "source-serif-4",
        "stack": '"Source Serif 4", Georgia, serif',
        "mock": "MockSerif",
    },
    "system": None,
}
DEFAULT_FONT = "sans"



def make_frontmatter(article, template=None, extra=None):
    font = article.get("font", DEFAULT_FONT)
    if font not in FONTS:
        raise ValueError(
            f"{article['slug']}: unknown font {font!r} (expected one of {', '.join(sorted(FONTS))})"
        )

    lines = ["+++"]
    lines.append(f"title = {toml_str(article['title'])}")
    lines.append(f'date = {article["date"]}')
    if article.get("description"):
        lines.append(f"description = {toml_str(article['description'])}")
    if article.get("draft"):
        lines.append("draft = true")
    if template:
        lines.append(f"template = {toml_str(template)}")
    # [extra] and [taxonomies] are TOML sections, so both must come after the scalars
    if FONTS[font]:
        lines.append("[extra]")
        lines.append(f"font_family = {toml_str(FONTS[font]['family'])}")
        lines.append(f"font_file = {toml_str(FONTS[font]['file'])}")
        lines.append(f"mock_family = {toml_str(FONTS[font]['mock'])}")
        # literal string: the stack contains double quotes (controlled constant, no escaping)
        lines.append(f"font_stack = '{FONTS[font]['stack']}'")
        for k, v in (extra or {}).items():
            lines.append(f"{k} = {toml_str(v)}")
    if article.get("tags"):
        tags_str = ", ".join(toml_str(t) for t in article["tags"])
        lines.append("[taxonomies]")
        lines.append(f"tags = [{tags_str}]")
    lines.append("+++\n")
    return "\n".join(lines)


def check_titles(articles):
    """Fail the build if a source's leading `# H1` doesn't equal its articles.toml title.

    The template renders the title itself and strip_title removes the source H1, so a
    mismatch (even just case) silently renders two different titles. Better to stop the
    build and make the author reconcile them. A source with no leading H1 is fine — there
    is simply nothing to strip.
    """
    problems = []
    for article in articles:
        source = ROOT / article["source"]
        if not source.exists():
            continue
        first = source.read_text().split("\n", 1)[0].strip()
        if first.startswith("# ") and first != f'# {article["title"]}':
            problems.append(
                f"  {article['source']}\n"
                f"    source H1 : {first}\n"
                f"    toml title: # {article['title']}"
            )
    if problems:
        raise SystemExit(
            "Title mismatch — a source's leading # heading must equal its articles.toml "
            "title exactly (case included):\n" + "\n".join(problems)
        )


def strip_title(content, title):
    """Remove the leading `# Title` line so the template's own <h1> isn't doubled.

    check_titles() has already guaranteed any leading H1 matches the title exactly, so an
    exact compare here is safe.
    """
    lines = content.split("\n")
    if lines and lines[0].strip() == f"# {title}":
        return "\n".join(lines[1:]).lstrip("\n")
    return content


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Clean old generated files
    for f in OUTPUT_DIR.glob("*.md"):
        f.unlink()

    # Generate section index
    section_index = OUTPUT_DIR / "_index.md"
    section_index.write_text('+++\ntitle = "Posts"\nsort_by = "date"\ntemplate = "posts.html"\n+++\n')

    articles = tomllib.loads(ARTICLES_FILE.read_text())["articles"]
    check_titles(articles)  # fail early, before writing anything, on a title mismatch

    for article in articles:
        source_path = ROOT / article["source"]
        if not source_path.exists():
            print(f"Warning: {source_path} not found, skipping")
            continue

        content = source_path.read_text()
        content = strip_title(content, article["title"])

        output = make_frontmatter(article) + content
        output_path = OUTPUT_DIR / f"{article['slug']}.md"
        output_path.write_text(output)
        print(f"Generated: {output_path.name}")


if __name__ == "__main__":
    main()
