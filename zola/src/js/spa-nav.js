/*
 * spa-nav.js — persistent-chrome navigation. Progressive enhancement only.
 *
 * Same-origin link clicks are intercepted: the target page (plain static HTML — the
 * build output IS the wire format, no JSON twin to drift) is fetched, parsed with
 * DOMParser, and only #content is swapped, plus the head nodes tagged data-page-css
 * (per-article fonts). Everything else — nav, theme scripts, and above all the GPU
 * field (canvas, device, clock) — persists, so navigation never reboots the field.
 *
 * Swaps are deliberately INSTANT: no transition animation — the living field is the
 * site's only motion. What makes the instant swap safe to look at is staging: the
 * target page's fonts are imported and awaited BEFORE the swap (stageFonts), and the
 * field atlas is redrawn synchronously inside it (field-gpu refresh), so the switch
 * is one complete frame — the click-time equivalent of the first-load curtain.
 *
 * Reading positions are recorded per pathname in sessionStorage (see the recorder
 * below) and restored on back/forward.
 *
 * Every unexpected shape falls back to a real navigation: modified clicks, other
 * origins, downloads, fetch errors, a page without #content. Without JS none of this
 * exists and links are just links. (All three runtime scripts, this one included, are
 * INLINED by base.html — no external JS, so engine/page version skew cannot exist.)
 */
(function () {
  "use strict";
  if (!window.fetch || !window.DOMParser || !history.pushState) return;
  if (window.__spaNav) return;
  window.__spaNav = true;

  var parser = new DOMParser();
  var cache = new Map(); // href -> Promise<html text>; session-lived, tiny pages
  var MAX_CACHE = 40;
  var renderedPath = location.pathname;

  function sameOriginUrl(a) {
    var url;
    try { url = new URL(a.getAttribute("href"), location.href); } catch (e) { return null; }
    if (url.origin !== location.origin) return null;
    return url;
  }

  function eligible(a, e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
    if ((a.target && a.target !== "_self") || a.hasAttribute("download")) return null;
    var url = sameOriginUrl(a);
    if (!url) return null;
    // In-page anchor: let the browser scroll natively.
    if (url.pathname === location.pathname && url.hash) return null;
    return url;
  }

  function fetchPage(url) {
    var key = url.pathname;
    if (cache.has(key)) return cache.get(key);
    var p = fetch(url.href, { headers: { Accept: "text/html" } }).then(function (r) {
      if (!r.ok || (r.headers.get("content-type") || "").indexOf("text/html") === -1) {
        throw new Error("not swappable: " + r.status);
      }
      return r.text();
    });
    p.catch(function () { cache.delete(key); }); // don't cache failures
    if (cache.size >= MAX_CACHE) cache.delete(cache.keys().next().value);
    cache.set(key, p);
    return p;
  }

  // DOM mutation only — returns false when the fetched page has no #content (then the
  // caller does a real navigation instead).
  function swap(doc) {
    var next = doc.querySelector("#content");
    var cur = document.querySelector("#content");
    if (!next || !cur) return false;
    document.querySelectorAll("head [data-page-css]").forEach(function (n) { n.remove(); });
    doc.querySelectorAll("head [data-page-css]").forEach(function (n) {
      document.head.appendChild(document.importNode(n, true));
    });
    cur.replaceWith(document.importNode(next, true));
    document.title = doc.title;
    if (window.__fieldChromeRefresh) window.__fieldChromeRefresh();
    return true;
  }

  // Stage the target page's fonts BEFORE the swap: append its font CSS now (the preload
  // link kicks the fetch, the @font-face makes the family loadable) and give the faces up
  // to 400ms to arrive — an instant swap must never reveal fallback glyphs that reflow.
  // swap() later clears every [data-page-css] and re-imports — same URLs, fonts stay
  // cached, so the pre-staged clones are simply superseded, never fetched twice.
  function stageFonts(doc) {
    var art = doc.querySelector("article[data-font]");
    if (!art || !document.fonts || !document.fonts.load) return Promise.resolve();
    doc.querySelectorAll("head [data-page-css]").forEach(function (n) {
      document.head.appendChild(document.importNode(n, true));
    });
    var f = art.getAttribute("data-font");
    var loads = Promise.all(['1em "' + f + '"', '700 1em "' + f + '"', 'italic 1em "' + f + '"']
      .map(function (s) { return document.fonts.load(s); }));
    return Promise.race([
      loads,
      new Promise(function (r) { setTimeout(r, 400); }), // slow network: swap anyway
    ]).catch(function () {});
  }

  // Staged instant swap — the only swap. `after` runs right after the DOM mutation.
  function stagedSwap(doc, after) {
    return stageFonts(doc).then(function () {
      var ok = swap(doc);
      if (ok && after) after();
      return ok;
    });
  }

  function focusContent() {
    var c = document.querySelector("#content");
    if (!c) return;
    c.setAttribute("tabindex", "-1");
    c.focus({ preventScroll: true }); // title change + focus move announce the new page
  }

  // swapLock: the recorder must be deaf while a swap is in flight — replacing tall
  // content with short content makes the browser CLAMP the scroll position, and that
  // implicit scroll event fires before pushState, i.e. it would be recorded against the
  // OLD page and destroy the reading position back/forward exists to restore. Arrival
  // positions are written explicitly (recordScroll) instead.
  var swapLock = false;
  function recordScroll() {
    try { sessionStorage.setItem("fc-scroll:" + location.pathname, String(scrollY)); } catch (e) {}
  }
  var scrollSaveQueued = false;
  addEventListener("scroll", function () {
    if (scrollSaveQueued || swapLock) return;
    scrollSaveQueued = true;
    requestAnimationFrame(function () {
      scrollSaveQueued = false;
      if (!swapLock) recordScroll();
    });
  }, { passive: true });

  function navigate(url) {
    return fetchPage(url).then(function (text) {
      var doc = parser.parseFromString(text, "text/html");
      swapLock = true;
      return stagedSwap(doc, function () {
        // History moves BEFORE the arrival scroll, so the position is recorded under the
        // NEW page — the old page's reading position must survive for back.
        history.pushState(null, "", url.href);
        renderedPath = url.pathname;
        var target = url.hash && document.querySelector(url.hash);
        if (target) target.scrollIntoView(); else scrollTo(0, 0);
        recordScroll();
        focusContent();
      }).then(function (ok) {
        swapLock = false;
        if (!ok) { location.href = url.href; return; }
      });
    });
  }

  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest && e.target.closest("a[href]");
    if (!a) return;
    var url = eligible(a, e);
    if (!url) return;
    e.preventDefault();
    navigate(url).catch(function () { location.href = url.href; });
  });

  // Warm the cache on intent: pages are no-cache HTML, so hover is the free head start.
  document.addEventListener("mouseover", function (e) {
    var a = e.target && e.target.closest && e.target.closest("a[href]");
    if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
    var url = sameOriginUrl(a);
    if (url && url.pathname !== location.pathname) fetchPage(url).catch(function () {});
  });

  history.scrollRestoration = "manual"; // we restore from the recorder
  addEventListener("popstate", function () {
    if (location.pathname === renderedPath) return; // hash-only traversal: browser scrolls
    var url = new URL(location.href);
    var y = 0;
    try { y = parseInt(sessionStorage.getItem("fc-scroll:" + url.pathname), 10) || 0; } catch (e) {}
    swapLock = true;
    fetchPage(url).then(function (text) {
      return stagedSwap(parser.parseFromString(text, "text/html"), function () {
        renderedPath = url.pathname;
        scrollTo(0, y);
        recordScroll();
        focusContent();
      });
    }).then(function (ok) {
      swapLock = false;
      if (!ok) { location.reload(); return; }
    }).catch(function () { location.reload(); });
  });
})();
