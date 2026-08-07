# The site engine

Technical notes for [writings.cafeine.dev](https://writings.cafeine.dev), the Zola-built
version of this repo's articles. For what this repo *is*, see the [root README](../README.md);
for how the build works, see the [Makefile](../Makefile) (its header documents the
architecture: clean markdown in `s/`, metadata in `articles.toml`, generated frontmatter).

## Deployment

The site is `zola build`'d to `public/` and served by nginx. All JS is inlined into the
pages (from `src/js/`, via `load_data` in base.html) — fonts are the only external
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

## Architecture note: navigation seams and the browser landscape (as of 2026-08)

Three kinds of navigation, three very different smoothness stories:

1. **In-site link clicks** — spa-nav swaps `#content`; the field never reboots. Seamless in
   every browser, by construction.
2. **Back/forward** — the browser's bfcache restores a frozen snapshot of the whole page
   (DOM, JS heap, canvases). Seamless in every browser; no code of ours involved.
3. **Cross-site full loads** (writings ↔ presentations, different origins, spa-nav can't
   apply) — this is the seam, and it is entirely browser-dependent:
   - **Chrome and Safari hold the old page's pixels** until the new page produces a
     contentful frame ("paint holding" — Safari always did it, Chrome shipped it in 2019
     and later extended it cross-origin). The first-load curtain rides on this: a hidden
     `<body>` is not contentful, so the old page covers the whole boot and the reveal is
     old-page → fully-inked page.
   - **Firefox has no paint holding** ([wontfix](https://bugzilla.mozilla.org/show_bug.cgi?id=1714769))
     and paints the new page's background as soon as the document renders — with the
     curtain up, that IS the black flash. Worse, Firefox resolves `document.fonts.ready`
     around `load`, so an unbounded font wait stretches the curtain window. Mitigations
     live in field-chrome.js (font wait bounded to 400ms) and field-gpu.js (init resolves
     only after the first presented frame); the real fix would be revealing the flat tier
     as genuine first-paint content and flipping to GPU ink after first present.

The standards path out: paint holding is now **spec-mandated inside cross-document View
Transitions** (Level 2 — the old document's last frame must be held until the new document
draws; [csswg#8888](https://github.com/w3c/csswg-drafts/issues/8888), merged). Support for
`@view-transition { navigation: auto }`: Chrome/Edge 126+, Safari 18.2+; Firefox has only
same-document transitions (FF 144) — cross-document is unimplemented there, a likely
Interop target. It is also **same-origin only**, so it does not cover the subdomain hop;
[csswg#10364](https://github.com/w3c/csswg-drafts/issues/10364) proposes same-site
cross-origin transitions with mutual `from`/`to` opt-in — literally the
`writings.cafeine.dev ↔ presentations.cafeine.dev` case. When Firefox ships cross-document
transitions AND #10364 lands, the cross-site seam becomes native in every browser.

Caution for that future adoption: a view transition captures the new page at its first
render — with the curtain up that frame is blank, so `@view-transition` must be paired with
a `pagereveal` handler that holds the old snapshot while the field boots, then
`skipTransition()` for the atomic cut (and the clock's freeze-and-resume in field-gpu.js
means the resumed field is pixel-identical to the held snapshot). Do not add the at-rule
without that machinery.

## Previous versions

Removed code stays reachable in git history. Named restore points:

- [`914c671`](https://github.com/c4ffein/writings/tree/914c671) — last version before the
  wave / black design / webfont work (2026-03-24)
- [`b074ba5`](https://github.com/c4ffein/writings/tree/b074ba5) — last version before the
  big clean, which removed:
  - the dead mock-font pipeline: `scripts/make_mock_fonts.py`, the 12 committed
    `mock-*.woff2`/`.b64` files, and the `mock_family` frontmatter emitted by `generate.py`
    (superseded by external content-hashed fonts + `stageFonts()` in spa-nav.js)
  - the scraper-era markers and comments in `base.html` (`theme:* start/end`,
    `presentations-omit`) left over from when `generate_presentations.py` sliced the
    template by regex, plus the unused `fc-hold` keyframe
  - `compile_sass` in `config.toml` (no sass in the repo) and the redundant
    "Generate presentations index" step in `deploy.yml` (`make build` already runs it)
