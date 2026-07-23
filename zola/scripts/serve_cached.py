#!/usr/bin/env python3
"""Serve zola/public/ locally with the same cache headers production should send, so the
caching behaviour can be verified before deploying. Zero dependencies (Python 3.11+).

`make serve` (zola serve) sends NO cache headers, so fonts/js re-download on every navigation.
This mimics the intended nginx setup instead:
  - /fonts/ and /js/ are content-hashed in their URLs (?h=…), so they're immutable — cache a
    year, never revalidate.
  - HTML is not hashed, so it's no-cache (always revalidated) to reflect the latest build.

Run `make serve-cached` (builds first). Point your nginx/browser at it exactly as with `serve`.
"""

import functools
import http.server
import sys
from pathlib import Path

ROOT = Path(__file__).parent.parent / "public"
IMMUTABLE_PREFIXES = ("/fonts/", "/js/")


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        path = self.path.split("?", 1)[0]
        if path.startswith(IMMUTABLE_PREFIXES):
            self.send_header("Cache-Control", "public, max-age=31536000, immutable")
        elif path.endswith((".html", "/")):
            self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def log_message(self, *args):
        pass  # quiet


def main():
    host = sys.argv[1] if len(sys.argv) > 1 else "0.0.0.0"
    port = int(sys.argv[2]) if len(sys.argv) > 2 else 8080
    if not ROOT.exists():
        sys.exit(f"{ROOT} not found — run `zola build` first (make serve-cached does this).")
    handler = functools.partial(Handler, directory=str(ROOT))
    print(f"Serving {ROOT} on http://{host}:{port}  (/fonts/ /js/ immutable, HTML no-cache)")
    http.server.ThreadingHTTPServer((host, port), handler).serve_forever()


if __name__ == "__main__":
    main()
