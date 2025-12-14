#!/usr/bin/env python3
"""Generate Zola content from source markdown files. Zero dependencies (Python 3.11+)."""

import tomllib
from pathlib import Path

ROOT = Path(__file__).parent.parent.parent
ARTICLES_FILE = ROOT / "articles.toml"
OUTPUT_DIR = ROOT / "zola" / "content" / "posts"


def make_frontmatter(article):
    lines = ["+++"]
    lines.append(f'title = "{article["title"]}"')
    lines.append(f'date = {article["date"]}')
    if article.get("description"):
        lines.append(f'description = "{article["description"]}"')
    if article.get("draft"):
        lines.append("draft = true")
    # [taxonomies] must come last (TOML section)
    if article.get("tags"):
        tags_str = ", ".join(f'"{t}"' for t in article["tags"])
        lines.append("[taxonomies]")
        lines.append(f"tags = [{tags_str}]")
    lines.append("+++\n")
    return "\n".join(lines)


def strip_title(content, title):
    """Remove # Title line if it matches."""
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
