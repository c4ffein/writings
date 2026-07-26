# writings

I wanted to write for many years, but creating my own blog wasn't my top priority,
as I knew I would spend so many hours on it, already having so many ideas on how to design it.
Perfectionism really is a flaw, I should have found somewhere to write in the meantime.

After reading [this](https://github.com/unclebob/cmuratori-discussion/blob/main/cleancodeqa.md),
I came to the conclusion that GitHub might just be the perfect platform. I should focus on what matters first.

So, I'll just see how this repo ends-up in the long term.  
Actually, the more I think about it, the more I consider the history provided by git to be a really nice feature for whoever actually cares to read this.

Feel free to drop an issue if you want to start a discussion (even just to correct my english, I'm a non-native speaker, and even that would be appreciated).

A cleaner version is live at [writings.cafeine.dev](https://writings.cafeine.dev). See the [Makefile](Makefile) for how it's built.

## Index
- [The last stuff I enjoyed reading](s/what-i-enjoyed-reading/what-i-enjoyed-reading.md)
- [Some puzzles](s/puzzles/puzzles.md)
- [Tough Love and Dale Carnegie](s/tough-love-and-dale-carnegie/tough-love-and-dale-carnegie.md)
- [You should compare yourself to others](s/you-should-compare-yourself/you-should-compare-yourself.md)
- [How to start contributing to Open Source](s/contributing-to-open-source/contributing-to-open-source.md)
- [Prophecies](s/prophecies/prophecies.md)
- [Competency Cycle](s/competency-cycle/competency-cycle.md)
- [Python for Programmers](s/learning-python-as-a-programmer/learning-python-as-a-programmer.md)
- [From MNIST to Transformers](s/from-mnist-to-transformers/from-mnist-to-transformers.md) - The minimal background on how neural networks and LLMs actually work
- [There Is No Stop Sign](s/there-is-no-stop-sign/there-is-no-stop-sign.md) - Reflections on the Evolution of AI at the End of 2025
- [Claude Code through 2025](s/claude-code-through-2025)

## Deployment

The site is `zola build`'d to `zola/public/` and served by nginx. All JS is inlined into the
pages (from `zola/src/js/`, via `load_data` in base.html) — fonts are the only external
assets, and the only thing that needs cache configuration.

**Fonts are safe to cache forever.** The article template requests each webfont with a
content hash in the URL (`…/source-serif-4.woff2?h=c1df…`, via Zola's `cachebust=true`), so
the URL changes only when the file's bytes change. That means they can be served `immutable`
with no risk of ever serving a stale file — update a font, the hash changes, browsers fetch
the new one.

nginx, in the `server` block (or an `include`d `.conf`):

```nginx
location /fonts/ { expires 1y; add_header Cache-Control "public, immutable"; access_log off; }
# HTML is not hashed — no-cache EVERYTHING else so a rebuild is picked up; this must also
# return real 404s (no index.html fallback), or broken links become invisible soft-404s
# (and the SPA layer would happily swap a broken link into the homepage):
location / { add_header Cache-Control "no-cache"; }
```

`immutable` is the important part: browsers won't even revalidate (no 304 round-trip) on repeat
visits — the font is reused straight from disk cache across every page.

**Verify locally before deploying:** `make serve-cached` builds the static site and serves it
with these exact headers (unlike `make serve`, which sends none). Load a post, click another,
and the font should show as served from cache (`0 B` transferred) instead of re-downloading.

## Architecture note: the field and spa-nav are a couple

`spa-nav.js` exists so the GPU field (`field-gpu.js` + `field-chrome.js`) never reboots
across navigations — the persistent canvas, device, and clock are the whole reason the SPA
layer (manual scroll restoration included) is worth its complexity. If the field ever
retires, retire spa-nav and the first-load curtain with it: scaffolding must not outlive
its reason (see the mock-font pipeline, removed below).

## Previous versions

Removed code stays reachable in git history. Named restore points:

- [`914c671`](https://github.com/c4ffein/writings/tree/914c671) — last version before the
  wave / black design / webfont work (2026-03-24)
- [`b074ba5`](https://github.com/c4ffein/writings/tree/b074ba5) — last version before the
  big clean, which removed:
  - the dead mock-font pipeline: `zola/scripts/make_mock_fonts.py`, the 12 committed
    `mock-*.woff2`/`.b64` files, and the `mock_family` frontmatter emitted by `generate.py`
    (superseded by external content-hashed fonts + `stageFonts()` in spa-nav.js)
  - the scraper-era markers and comments in `base.html` (`theme:* start/end`,
    `presentations-omit`) left over from when `generate_presentations.py` sliced the
    template by regex, plus the unused `fc-hold` keyframe
  - `compile_sass` in `config.toml` (no sass in the repo) and the redundant
    "Generate presentations index" step in `deploy.yml` (`make build` already runs it)
