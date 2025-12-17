#!/usr/bin/env python3
"""
Generate presentations-index.html from:
- Theme extracted from zola/templates/base.html (single source of truth)
- Presentations list from presentations.toml

Output: zola/public/presentations-index.html (served on GitHub Pages)
Presentations repo can curl it: https://c4ffein.github.io/writings/presentations-index.html
"""

import re
import tomllib
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent.parent
BASE_HTML = REPO_ROOT / "zola" / "templates" / "base.html"
PRESENTATIONS_TOML = REPO_ROOT / "presentations.toml"
DEFAULT_OUTPUT = REPO_ROOT / "zola" / "public" / "presentations-index.html"


def extract_theme(base_html: str) -> dict:
    """Extract theme components from base.html."""
    # Early script (flash prevention)
    early_script = re.search(
        r'(<script>\s*// Apply theme immediately.*?</script>)',
        base_html,
        re.DOTALL
    )

    # Style block
    style = re.search(r'(<style>.*?</style>)', base_html, re.DOTALL)

    # Main theme script
    main_script = re.search(
        r'(<script>\s*\(function\(\) \{\s*const COOKIE_NAME.*?</script>)',
        base_html,
        re.DOTALL
    )

    # Theme toggle button
    toggle_button = re.search(
        r'(<button id="theme-toggle".*?</button>)',
        base_html,
        re.DOTALL
    )

    return {
        "early_script": early_script.group(1) if early_script else "",
        "style": style.group(1) if style else "",
        "main_script": main_script.group(1) if main_script else "",
        "toggle_button": toggle_button.group(1) if toggle_button else "",
    }


def generate_html(theme: dict, presentations: list) -> str:
    """Generate the full presentations/index.html."""
    # Filter out blog-specific CSS (article, post-meta, tags, details, summary)
    style = theme["style"]
    style = re.sub(r'\s*article \{[^}]*\}', '', style)
    style = re.sub(r'\s*\.post-meta \{[^}]*\}', '', style)
    style = re.sub(r'\s*\.tags \{[^}]*\}', '', style)
    style = re.sub(r'\s*\.tag \{[^}]*\}', '', style)
    style = re.sub(r'\s*details \{[^}]*\}', '', style)
    style = re.sub(r'\s*summary \{[^}]*\}', '', style)

    # Build presentations list
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
    {theme["early_script"]}
    {style}
    {theme["main_script"]}
</head>
<body>
    <nav>
        <a href="https://writings.cafeine.dev">Home</a>
        <a href="https://writings.cafeine.dev/posts">Posts</a>
        <a href="https://presentations.cafeine.dev">Presentations</a>
        {theme["toggle_button"]}
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
