/*
 * font-wave.js — the reveal engine: real text under a layer of background-coloured
 * tiles that lift, in a seeded diagonal + dither, letter by letter.
 *
 * Instead of rebuilding the text out of positioned overlays (font-wave-mock.js), this leaves
 * the REAL text completely untouched and hides it under a layer of little rectangles the
 * colour of the background. The article reads as blank; the wave then removes those tiles in
 * order — diagonal, dithered, letter by letter — and the real text surfaces underneath.
 *
 * Because nothing is ever wrapped or moved:
 *   - the link underline is the real, continuous one — it reveals in one piece, no seams;
 *   - copy-paste is the untouched source text, with zero cleanup at the end;
 *   - there is no reflow to fight — the tiles are pure paint over a fixed layout.
 *
 * The one assumption: a flat background, since the tiles must match it. True for this site.
 * The mock font is still used, but only to lay the page out (and measure tile positions)
 * before the real font arrives; the real font renders under the tiles and shows as they lift.
 */
(function () {
  "use strict";

  var P = new URLSearchParams(location.search);
  var WAVE_MS = parseInt(P.get("wave"), 10) || 800;
  var JITTER_MS = P.has("jitter") ? parseInt(P.get("jitter"), 10) || 0 : 150;
  var DITHER = 150; // rule-tile scatter
  var RULE_LAG = 60; // rules trail the text
  var DEBUG = P.has("debug");
  function log(m) { if (DEBUG) console.log("[mask " + Math.round(performance.now()) + "ms] " + m); }

  var article = document.querySelector("article[data-mock]");
  if (!article) return;
  // The inline head script adds .waving only when the reveal should play this load (first of
  // the day, or forced with ?wave/?debug). No .waving → skip entirely: the article is already
  // rendering normally (real font via font-display), so there's nothing to do and no blank.
  if (!document.documentElement.classList.contains("waving")) return;
  var mock = article.getAttribute("data-mock");
  var real = article.getAttribute("data-font");
  var seed = article.getAttribute("data-seed") || "";

  var painted = false;
  var layer = null;
  var units = [];

  // Reveal the real article and drop the tiles. Used as the end state and every bail-out.
  function reveal() {
    article.classList.add("font-ready"); // real font
    if (layer) { layer.remove(); layer = null; } // drop whatever tiles remain
    if (painted) {
      // The tiles are what hid the ink, so keep the article itself visible now they're gone.
      article.style.visibility = "visible";
      document.documentElement.dataset.waveOk = "1";
    } else {
      // Bailed before any tiles: only .waving was hiding the article — drop it so the native,
      // real-font article shows.
      document.documentElement.classList.remove("waving");
      article.style.visibility = "";
    }
  }

  if (!document.fonts || !document.fonts.load) return reveal();

  var realFaces = ['400 1em "' + real + '"', '700 1em "' + real + '"', 'italic 400 1em "' + real + '"'];
  var mockFaces = ['400 1em "' + mock + '"', '700 1em "' + mock + '"', 'italic 400 1em "' + mock + '"'];
  var realReady = Promise.all(realFaces.map(function (f) { return document.fonts.load(f); }));
  var mockReady = Promise.all(mockFaces.map(function (f) { return document.fonts.load(f); }));

  var animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Record today so the rest of the day's pages skip (the head script reads this next load).
  function recordPlay() {
    try { localStorage.setItem("wave-day", new Date().toDateString()); } catch (e) {}
  }

  mockReady.then(
    function () {
      if (!document.fonts.check(mockFaces[0])) return realReady.then(reveal, reveal);
      try {
        log("paint start");
        paint(); // tiles are up; article is hidden beneath them
        log("paint end: " + units.length + " tiles");
      } catch (e) {
        log("paint threw: " + e);
        return realReady.then(reveal, reveal);
      }
      painted = true;
      document.documentElement.dataset.waveOk = "1";
      document.documentElement.classList.add("waving");
      article.style.visibility = "visible"; // reveal the article; tiles still hide the ink
      realReady.then(function () {
        article.classList.add("font-ready"); // real font renders under the tiles
        if (!animate || !document.fonts.check(realFaces[0])) return reveal();
        try { sweep(); recordPlay(); } catch (e) { reveal(); }
      }, function () { reveal(); });
    },
    function () { realReady.then(reveal, reveal); }
  );

  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 1831565813) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  var SKIP = { PRE: 1, CODE: 1, SCRIPT: 1, STYLE: 1 };
  function isSkipped(n) {
    for (var p = n.parentElement; p && p !== article; p = p.parentElement) {
      // Skip a tag pill's text: it's occluded as one full box below (so the padding around the
      // text isn't left showing), not per character.
      if (SKIP[p.tagName] || (p.classList && p.classList.contains("tag"))) return true;
    }
    return false;
  }

  function paint() {
    var bg = getComputedStyle(document.body).backgroundColor;
    var pageX = window.scrollX, pageY = window.scrollY;

    layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = "position:absolute;top:0;left:0;pointer-events:none;z-index:5";
    document.body.appendChild(layer);

    var frag = document.createDocumentFragment();
    function tile(left, top, w, h, jitter, offset) {
      var o = document.createElement("div");
      o.style.cssText = "position:absolute;left:" + left + "px;top:" + top + "px;width:" +
        w + "px;height:" + h + "px;background:" + bg;
      frag.appendChild(o);
      units.push({ x: left + w / 2, y: top + h / 2, o: o, jitter: jitter, offset: offset });
    }

    // -- TEXT: one tile per character (incl. spaces), so the real underline reveals unbroken.
    var walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        return !n.nodeValue.length || isSkipped(n) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      },
    });
    var nodes = [];
    for (var n; (n = walker.nextNode()); ) nodes.push(n);
    var range = document.createRange();
    nodes.forEach(function (node) {
      var text = node.nodeValue;
      for (var i = 0; i < text.length; i++) {
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        var rects = range.getClientRects();
        for (var r = 0; r < rects.length; r++) {
          var rc = rects[r];
          if (rc.width <= 0 || rc.height <= 0) continue;
          // Bleed generously to the right (and a little all round): a glyph's ink can overhang
          // its advance box — Source Serif's "f" has a ball terminal that juts right — and the
          // Range rect only covers the advance, so an uncovered overhang peeks out as a stray
          // speck when a neighbour reveals first. The dither already scatters the front, so this
          // overlap blends in rather than reading as a notch.
          tile(rc.left + pageX - 1, rc.top + pageY - 1, rc.width + 4, rc.height + 2);
        }
      }
    });

    // -- RULES: hr + heading underlines, occluded in ~1:1 tiles that lift dithered, just after
    //    the text beside them. These sit below the text line, so char tiles don't cover them.
    var THICK = 2;
    function ruleTiles(left, top, width) {
      var nseg = Math.max(1, Math.round(width / THICK));
      var seg = width / nseg;
      for (var i = 0; i < nseg; i++) tile(left + i * seg, top, seg + 0.5, THICK + 1, DITHER, RULE_LAG);
    }
    article.querySelectorAll("hr").forEach(function (hr) {
      var r = hr.getBoundingClientRect();
      ruleTiles(r.left + pageX, r.top + pageY + r.height / 2 - THICK / 2, r.width);
    });
    article.querySelectorAll("h1,h2,h3").forEach(function (h) {
      var bw = parseFloat(getComputedStyle(h).borderBottomWidth);
      if (!(bw > 0)) return;
      var r = h.getBoundingClientRect();
      ruleTiles(r.left + pageX, r.bottom + pageY - bw, r.width);
    });

    // -- BULLETS: cover each list marker's slot so the native disc lifts with the wave too.
    article.querySelectorAll("li").forEach(function (li) {
      var lr = range;
      lr.selectNodeContents(li);
      var fl = lr.getClientRects()[0];
      if (!fl) return;
      var mid = fl.top + fl.height / 2 + pageY;
      var left = li.getBoundingClientRect().left + pageX;
      tile(left - 22, mid - 7, 18, 14); // marker box, left of the content
    });

    // -- TAGS: pills have a background + padding, so per-char tiles leave the box showing around
    //    the text. Occlude the whole pill as one unit (its text is skipped from the char pass).
    article.querySelectorAll(".tag").forEach(function (t) {
      var r = t.getBoundingClientRect();
      tile(r.left + pageX - 1, r.top + pageY - 1, r.width + 2, r.height + 2);
    });

    layer.appendChild(frag);

    // -- delays: same anchored, constant-speed diagonal wave as the other engines.
    var rand = mulberry32(hash(seed));
    var angle = P.has("angle") ? (parseFloat(P.get("angle")) || 0) * Math.PI / 180 : 12 * Math.PI / 180;
    var ca = Math.cos(angle), sa = Math.sin(angle);
    var sx = window.scrollX, sy = window.scrollY, W = window.innerWidth, H = window.innerHeight;
    var corners = [[sx, sy], [sx + W, sy], [sx, sy + H], [sx + W, sy + H]].map(function (c) { return c[0] * ca + c[1] * sa; });
    var proj0 = Math.min.apply(null, corners);
    var speed = (Math.max.apply(null, corners) - proj0) / WAVE_MS || 1;
    units.forEach(function (u) {
      var proj = u.x * ca + u.y * sa;
      u.delay = Math.max(0, (proj - proj0) / speed) + (u.offset || 0) +
        rand() * (u.jitter == null ? JITTER_MS : u.jitter);
    });
  }

  // sweep: remove tiles in delay order. Removing a tile can't reflow anything (it's absolute),
  // so this is pure paint — the real text and its real underline surface underneath.
  function sweep() {
    log("sweep start");
    var order = units.slice().sort(function (a, b) { return a.delay - b.delay; });
    var start = null, i = 0;
    function tick(now) {
      if (start === null) start = now;
      var t = now - start;
      // Hide, don't remove: a visibility change is paint-only, whereas .remove() mutates the
      // DOM and forces style/layout recalc on the whole tile layer every frame. The layer is
      // dropped whole at the end.
      while (i < order.length && order[i].delay <= t) { order[i].o.style.visibility = "hidden"; i++; }
      if (i < order.length) return requestAnimationFrame(tick);
      reveal();
    }
    requestAnimationFrame(tick);
  }
})();
