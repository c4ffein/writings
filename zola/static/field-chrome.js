/*
 * field-chrome.js — "living ink" chrome, on by default on every page.
 *
 * Two tiers, one decision:
 *   - WebGPU available  -> the shader field (field-gpu.js): domain-warped fBm with a true
 *     time axis, painted over the real DOM text (which stays selectable underneath);
 *   - otherwise         -> the restructured chrome (em-dash meta line, tight tag pills,
 *     code-block rings, list dots) in the stylesheet's var(--chrome) ink. The COLOURS
 *     live in base.html's CSS, not here — so no-JS and killed pages render the designed
 *     look with zero script involvement. No SVG filters anywhere: old WebKit
 *     re-rasterizes them on scroll, which is exactly the device class this tier is for.
 *
 * ?field=gpu   force the GPU tier; on failure show the diagnostic panel (fail visible)
 * ?field=flat  fallback tier in an unmistakable debug skin (--chrome -> #ffdddd/#441111)
 * ?field=off   kill switch — the loader in base.html runs nothing at all
 * ?field=diag  GPU tier + always show the diagnostic panel
 * (?reveal=now|off forces/suppresses the font-wave — handled in page.html)
 *
 * The pre-paint curtain (html.fielding) is added by base.html's loader and dropped here
 * once the chosen tier is in place; a pure-CSS 0.3s reveal is the fail-safe.
 */
(function () {
  "use strict";
  // Idempotence: the engine can arrive twice (external loader + the copy inlined into the
  // presentations page); a second run would restructure the DOM twice.
  if (window.__fieldChrome) return;
  window.__fieldChrome = true;

  var MODE = new URLSearchParams(location.search).get("field"); // null=auto | gpu|flat|off|diag
  function uncurtain() { document.documentElement.classList.remove("fielding"); }
  if (MODE === "off") { uncurtain(); return; } // belt-and-suspenders: loader already skips

  var SEL = "nav a, #theme-toggle, h1, h2, h3, article hr, article blockquote, .fc-date, .fc-slab, .fc-ring, li .post-meta, .fc-bullet";

  function prep() {
    // Code chips inside headings lose their opaque background: the GPU stencil cuts by
    // alpha, and a chip's background would turn the whole heading into a marble slab.
    document.querySelectorAll("article h1 code, article h2 code, article h3 code").forEach(function (c) {
      c.style.background = "transparent";
      c.style.padding = "0";
    });
    // List bullets: swap the CSS ::before disc for a REAL span carrying the same class —
    // the SAME stylesheet rule renders both, so the swap is pixel-identical, and the GPU
    // tier can measure the span's true rect like every other component (no recomputed
    // geometry, no exceptions). html.fc-js retires the pseudo.
    document.documentElement.classList.add("fc-js");
    document.querySelectorAll("ul li").forEach(function (li) {
      if (li.closest("nav") || li.querySelector(".fc-bullet")) return;
      var b = document.createElement("span");
      b.className = "fc-bullet";
      b.setAttribute("aria-hidden", "true");
      li.insertBefore(b, li.firstChild);
    });
    // Code blocks: page-coloured background, framed by a 2px ring (same weight as the
    // rules). The ring overlay has a transparent interior — its alpha is just the frame,
    // so the field paints an outline only.
    document.querySelectorAll("article pre").forEach(function (pre) {
      if (pre.parentElement && pre.parentElement.classList.contains("fc-prewrap")) return;
      pre.style.background = "var(--bg)";
      var wrap = document.createElement("div");
      wrap.className = "fc-prewrap";
      wrap.style.cssText = "position:relative;margin:1rem 0";
      pre.parentNode.insertBefore(wrap, pre);
      wrap.appendChild(pre);
      pre.style.margin = "0"; // margin moves to the wrapper so the ring hugs the box
      var ring = document.createElement("span");
      ring.className = "fc-ring";
      ring.style.cssText = "position:absolute;inset:0;border:2px solid var(--chrome);border-radius:5px;pointer-events:none";
      wrap.appendChild(ring);
    });
    // Date: wrap .post-meta's leading text node in a span → a filterable target.
    document.querySelectorAll("article .post-meta").forEach(function (meta) {
      if (meta.querySelector(".fc-date")) return;
      for (var n = meta.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === 3 && n.nodeValue.trim()) {
          var s = document.createElement("span");
          s.className = "fc-date";
          n.parentNode.insertBefore(s, n);
          s.appendChild(n);
          // em dash joining date and tags — inside the span, so it takes the field
          if (meta.querySelector(".tags")) s.appendChild(document.createTextNode(" —"));
          break;
        }
      }
    });
    // Tags: pill bg → field slab; label lifted out, knocked out of it by the GPU atlas.
    document.querySelectorAll("article .tag").forEach(function (tag) {
      if (tag.querySelector(".fc-slab")) return;
      var radius = getComputedStyle(tag).borderRadius;
      var label = document.createElement("span");
      label.textContent = tag.textContent;
      label.style.cssText = "position:relative;color:var(--bg)";
      var slab = document.createElement("span");
      slab.className = "fc-slab";
      slab.style.cssText = "position:absolute;inset:0.2rem -0.1rem;background:var(--chrome);border-radius:" + radius;
      tag.textContent = "";
      tag.style.display = "inline-block";
      tag.style.position = "relative";
      tag.style.background = "none";
      tag.style.padding = "0";
      tag.style.marginLeft = "0.2rem";
      tag.appendChild(slab);
      tag.appendChild(label);
    });
  }

  // FALLBACK tier — no filters, no animation, no canvas, and no colours of its own:
  // everything renders in the stylesheet's var(--chrome) (#111111 light / #eeeeee dark),
  // so no-JS and ?field=off pages look the same minus the restructuring. This function
  // only restructures. As ?field=flat it wears an unmistakable debug skin instead, so a
  // forced fallback can never be confused with the real one.
  function flat() {
    prep();
    if (MODE === "flat") {
      var st = document.createElement("style");
      // :root[…] matches the base rules' specificity, so document order (this comes later) wins
      st.textContent = ':root[data-theme="light"]{--chrome:#441111}:root[data-theme="dark"]{--chrome:#ffdddd}';
      document.head.appendChild(st);
    }
    uncurtain();
  }

  // Diagnostic panel: the GPU engine's step log, on-page — the user's browser is the
  // instrument when the developer has no GPU to reproduce on.
  function showDiag() {
    var pre = document.getElementById("fc-diag");
    if (!pre) {
      pre = document.createElement("pre");
      pre.id = "fc-diag";
      pre.style.cssText = "position:fixed;top:8px;right:8px;z-index:99;max-width:46ch;max-height:60vh;" +
        "overflow:auto;background:#000;color:#0f0;font:11px monospace;padding:8px;border-radius:6px;opacity:.92;visibility:visible";
      document.documentElement.appendChild(pre); // outside body: survives the curtain
    }
    var d = window.__fieldGPUDiag || ["(no gpu diag)"];
    pre.textContent = "field-gpu diag\n" + d.join("\n");
    setTimeout(showDiag, 1000); // keep streaming late entries (lost, uncaptured, frame 60)
  }

  function tryGPU() {
    return new Promise(function (resolve) {
      if (!navigator.gpu || MODE === "flat") return resolve(false);
      var s = document.createElement("script");
      s.src = "/field-gpu.js";
      s.onload = function () {
        prep();
        var els = Array.prototype.slice.call(document.querySelectorAll(SEL));
        window.__fieldGPUInit({ els: els, onLost: function () { flat(); } })
          .then(resolve, function () { resolve(false); });
      };
      s.onerror = function () {
        window.__fieldGPUDiag = ["script load FAILED (404/network?)"];
        resolve(false);
      };
      document.head.appendChild(s);
    });
  }

  function boot() {
    var ready = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    ready.then(function () {
      requestAnimationFrame(function () {
        tryGPU().then(function (ok) {
          if (MODE === "diag" || (!ok && MODE === "gpu")) showDiag();
          if (ok) { uncurtain(); return; }
          flat();
        });
      });
    }, function () { flat(); });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
