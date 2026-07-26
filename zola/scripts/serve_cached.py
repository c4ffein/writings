#!/usr/bin/env python3
"""Serve zola/public/ locally with the same cache headers production should send, so the
caching behaviour can be verified before deploying. Zero dependencies (Python 3.11+).

`make serve` (zola serve) sends NO cache headers, so fonts re-download on every navigation.
This mimics the intended nginx setup instead:
  - /fonts/ are content-hashed in their URLs (?h=…), so they're immutable — cache a year,
    never revalidate. (All JS is inlined into the pages; fonts are the only external assets.)
  - HTML is not hashed, so it's no-cache (always revalidated) to reflect the latest build.

Run `make serve-cached` (builds first). Point your nginx/browser at it exactly as with `serve`.
"""

import functools
import http.server
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent / "public"
# Fonts are the ONLY external assets left (all JS is inlined into the pages by
# base.html); their URLs are content-hashed, so immutable is always safe.
IMMUTABLE_PREFIXES = ("/fonts/",)


class Handler(http.server.SimpleHTTPRequestHandler):
    no_store = False  # --no-store: forbid ALL caching, so every load is a cold first load

    def end_headers(self):
        path = self.path.split("?", 1)[0]
        if self.no_store:
            self.send_header("Cache-Control", "no-store")
        elif path.startswith(IMMUTABLE_PREFIXES):
            self.send_header("Cache-Control", "public, max-age=31536000, immutable")
        elif path.endswith((".html", "/")):
            self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def log_message(self, *args):
        pass  # quiet


def main():
    args = [a for a in sys.argv[1:] if a != "--no-store"]
    Handler.no_store = "--no-store" in sys.argv
    host = args[0] if len(args) > 0 else "0.0.0.0"
    port = int(args[1]) if len(args) > 1 else 8080
    if not ROOT.exists():
        sys.exit(f"{ROOT} not found — run `zola build` first (make serve-cached does this).")
    handler = functools.partial(Handler, directory=str(ROOT))
    mode = "EVERYTHING no-store (cold first load, always)" if Handler.no_store \
        else "/fonts/ immutable, HTML no-cache"
    print(f"Serving {ROOT} on http://{host}:{port}  ({mode})")
    http.server.ThreadingHTTPServer((host, port), handler).serve_forever()


if __name__ == "__main__":
    main()
