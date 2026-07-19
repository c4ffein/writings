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

The site is `zola build`'d to `zola/public/` and served by nginx. Two things need caching set
up, or fonts and JS re-download on every navigation.

**They're safe to cache forever.** The article template requests the webfont and the wave
script with a content hash in the URL (`…/source-serif-4.woff2?h=c1df…`, via Zola's
`cachebust=true`), so the URL changes only when the file's bytes change. That means they can be
served `immutable` with no risk of ever serving a stale file — update a font, the hash changes,
browsers fetch the new one. (The *mock* font is inlined as a data URI in each page, so it needs
no request or caching of its own.)

nginx, in the `server` block (or an `include`d `.conf`):

```nginx
location /fonts/ { expires 1y; add_header Cache-Control "public, immutable"; access_log off; }
location /js/    { expires 1y; add_header Cache-Control "public, immutable"; }
# HTML is not hashed — keep it revalidated so a rebuild is picked up:
location = /     { add_header Cache-Control "no-cache"; }
```

`immutable` is the important part: browsers won't even revalidate (no 304 round-trip) on repeat
visits — the font is reused straight from disk cache across every page.

**Verify locally before deploying:** `make serve-cached` builds the static site and serves it
with these exact headers (unlike `make serve`, which sends none). Load a post, click another,
and the font should show as served from cache (`0 B` transferred) instead of re-downloading.
