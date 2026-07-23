/*
 * field-gpu.js — the WebGPU tier of the living-ink chrome (see field-chrome.js, which
 * loads this when navigator.gpu exist, and falls back to basic colors when init returns false for any reason).
 *
 * Architecture:
 *   - One fixed, full-viewport, pointer-transparent <canvas> overlay. The real DOM text
 *     stays in place (made transparent, still selectable/SEO/a11y); box-type helpers
 *     (slabs, rules, rings, bullets) are made invisible. The shader paints their ink.
 *   - ALPHA ATLAS: a viewport-sized 2D canvas holding the union of every target's alpha —
 *     glyphs drawn per text-fragment rect (Range.getClientRects, the wave's technique, so
 *     kerning/wrapping are the browser's own), boxes drawn as geometry. Redrawn on
 *     scroll/resize/theme; uploaded as a texture.
 *   - FRAGMENT SHADER: per pixel — sample atlas alpha; if inked, evaluate domain-warped
 *     fBm at DOCUMENT coordinates (pixel + scroll uniform) with a TRUE TIME AXIS (3D
 *     noise sliced over t): the continuous a→b→c evolution SVG's feTurbulence can never
 *     do, replacing the crossfade-reseed contraption entirely. Palette = the exact
 *     zigzag tables from the SVG engine, as a WGSL function.
 *   - Document-anchored coords make the unified field a triviality: no clusters, no
 *     feOffset — continuity is just arithmetic.
 */
(function () {
  "use strict";

  var WGSL = `
struct U {
  scroll : vec2f,
  size   : vec2f,
  time   : f32,
  dark   : f32,
  dpr    : f32,
  pad1   : f32,
};
@group(0) @binding(0) var<uniform> u : U;
@group(0) @binding(1) var atlasTex : texture_2d<f32>;
@group(0) @binding(2) var smp : sampler;

fn hash3(p : vec3f) -> f32 {
  var q = fract(p * 0.3183099 + vec3f(0.1, 0.2, 0.3));
  q = q * 17.0;
  return fract(q.x * q.y * q.z * (q.x + q.y + q.z));
}
fn vnoise(p : vec3f) -> f32 {
  let i = floor(p);
  let f = fract(p);
  let w = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash3(i + vec3f(0,0,0)), hash3(i + vec3f(1,0,0)), w.x),
        mix(hash3(i + vec3f(0,1,0)), hash3(i + vec3f(1,1,0)), w.x), w.y),
    mix(mix(hash3(i + vec3f(0,0,1)), hash3(i + vec3f(1,0,1)), w.x),
        mix(hash3(i + vec3f(0,1,1)), hash3(i + vec3f(1,1,1)), w.x), w.y),
    w.z);
}
fn fbm4(p : vec3f) -> f32 {
  var f = 0.0; var a = 0.5; var q = p;
  for (var k = 0; k < 4; k++) {
    f += a * vnoise(q);
    q = q * 2.02; a *= 0.5;
  }
  return f / 0.9375;
}
fn fbm2(p : vec3f) -> f32 {
  return (0.5 * vnoise(p) + 0.25 * vnoise(p * 2.03)) / 0.75;
}
// the SVG engine's six-stop zigzag table, input folded over stops at 0,.2,.4,.6,.8,1
fn zigzag(v : f32, s0 : f32, s1 : f32, s2 : f32, s3 : f32, s4 : f32, s5 : f32) -> f32 {
  let x = clamp(v, 0.0, 1.0) * 5.0;
  let i = floor(x);
  let f = x - i;
  if (i < 1.0) { return mix(s0, s1, f); }
  if (i < 2.0) { return mix(s1, s2, f); }
  if (i < 3.0) { return mix(s2, s3, f); }
  if (i < 4.0) { return mix(s3, s4, f); }
  return mix(s4, s5, f);
}

@vertex
fn vmain(@builtin(vertex_index) vi : u32) -> @builtin(position) vec4f {
  var pos = array<vec2f, 3>(vec2f(-1.0, -3.0), vec2f(-1.0, 1.0), vec2f(3.0, 1.0));
  return vec4f(pos[vi], 0.0, 1.0);
}

@fragment
fn fmain(@builtin(position) fc : vec4f) -> @location(0) vec4f {
  let a = textureSample(atlasTex, smp, fc.xy / u.size).a;
  if (a < 0.004) { return vec4f(0.0); }
  // document-space coords in CSS px (dpr-normalized): the unified field, by construction,
  // with the same feature scale on every display
  let p = (fc.xy + u.scroll) / max(u.dpr, 1.0);
  let t = u.time;
  // gentle scale wander baked into the shader (two incommensurate sines, as ever)
  let wander = 1.0 + 0.18 * sin(t * 0.61) + 0.10 * sin(t * 1.41);
  // warp field with its own slow time
  let w = vec2f(
    fbm2(vec3f(p * 0.03, 11.3 + t * 0.16)),
    fbm2(vec3f(p * 0.03, 27.7 + t * 0.16)));
  let q = p + (w - vec2f(0.5)) * 60.0 * wander;
  // base marble, evolving on the time axis — the thing feTurbulence never had
  let f = fbm4(vec3f(q * 0.012, t * 0.09));
  var g : f32;
  if (u.dark > 0.5) {
    g = zigzag(f, 0.467, 1.0, 0.667, 0.867, 0.533, 1.0); // #777777 – #ffffff on black
  } else {
    g = zigzag(f, 0.533, 0.0, 0.333, 0.133, 0.467, 0.0); // #000000 – #888888 on white
  }
  return vec4f(vec3f(g) * a, a); // premultiplied
}
`;

  // Per-font metrics cache: anchoring glyphs to the true BASELINE (rect bottom minus the
  // font's descent) instead of textBaseline:"top" — canvas's "top" and the DOM line box
  // disagree by a few px of ascent bookkeeping, which read as "everything slightly low".
  var fontMetrics = {};
  function metricsFor(ctx) {
    var key = ctx.font;
    var m = fontMetrics[key];
    if (!m) {
      var t = ctx.measureText("Hgjp");
      m = fontMetrics[key] = {
        desc: (t.fontBoundingBoxDescent !== undefined) ? t.fontBoundingBoxDescent : null,
      };
    }
    return m;
  }

  // Glyphs of one element, per text-fragment rect (kerning/wrap are the DOM's own),
  // anchored to the true baseline via measured font descent.
  function drawTextGlyphs(ctx, el) {
    var walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
    var range = document.createRange();
    for (var n; (n = walker.nextNode()); ) {
      if (!n.nodeValue.trim()) continue;
      var pcs = getComputedStyle(n.parentElement);
      ctx.font = pcs.fontStyle + " " + pcs.fontWeight + " " + pcs.fontSize + " " + pcs.fontFamily;
      var text = n.nodeValue;
      // iterate by GRAPHEME CLUSTER, not char: splitting a Range inside a cluster
      // (variation selectors — the ☀︎ toggle! — surrogate pairs, combining marks) yields
      // zero rects on platforms that shape atomically, and the glyph silently vanishes.
      // Extend the range until the browser hands us a box, then draw the whole cluster.
      var i = 0;
      while (i < text.length) {
        var j = i + 1;
        if (text[i] === " " || text[i] === "\n" || text[i] === "\t") { i = j; continue; }
        range.setStart(n, i); range.setEnd(n, j);
        var cr = range.getClientRects()[0];
        while ((!cr || cr.width <= 0) && j < text.length) {
          j++;
          range.setEnd(n, j);
          cr = range.getClientRects()[0];
        }
        if (cr && cr.width > 0) {
          ctx.fillStyle = "#000";
          var fm = metricsFor(ctx);
          if (fm.desc !== null) {
            ctx.textBaseline = "alphabetic";
            ctx.fillText(text.slice(i, j), cr.left, cr.bottom - fm.desc);
          } else { // ancient browser: the old approximation
            ctx.textBaseline = "top";
            ctx.fillText(text.slice(i, j), cr.left, cr.top);
          }
        }
        i = j;
      }
    }
  }

  // Draw one element's alpha into the atlas. Coordinates are viewport-space; the caller's
  // transform maps them into the document-anchored window. cullTop/cullBottom bound the
  // window in viewport space.
  function drawElementAlpha(ctx, el, cullTop, cullBottom) {
    var isBox = el.classList && (el.classList.contains("fc-slab") || el.classList.contains("fc-ring") ||
                el.classList.contains("fc-bullet") || el.tagName === "HR");
    var r = el.getBoundingClientRect();
    if (r.bottom < cullTop || r.top > cullBottom || r.width <= 0) return;
    var cs = getComputedStyle(el);
    if (isBox) {
      // border-radius 50% (the bullet discs) parses as NaN px — draw a true circle
      if (el.classList.contains("fc-bullet")) {
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.arc(r.left + r.width / 2, r.top + r.height / 2, r.width / 2, 0, 7);
        ctx.fill();
        return;
      }
      var rad = parseFloat(cs.borderRadius) || 0;
      if (el.classList.contains("fc-ring")) { // frame only: stroke, transparent interior
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.roundRect(r.left + 1, r.top + 1, r.width - 2, r.height - 2, Math.max(0, rad - 1));
        ctx.stroke();
      } else {
        ctx.fillStyle = "#000";
        ctx.beginPath();
        ctx.roundRect(r.left, r.top, r.width, r.height, rad);
        ctx.fill();
      }
      // tag slabs: punch the label's glyphs OUT of the marble — the true knockout (the
      // DOM label underneath is page-coloured, so the holes read as the page itself)
      if (el.classList.contains("fc-slab")) {
        var label = el.nextElementSibling;
        if (label && !label.classList.contains("fc-slab")) {
          ctx.globalCompositeOperation = "destination-out";
          drawTextGlyphs(ctx, label);
          ctx.globalCompositeOperation = "source-over";
        }
      }
      return;
    }
    // heading underline (h1 keeps its rule): draw the border band
    var bw = parseFloat(cs.borderBottomWidth);
    if (bw > 0) ctx.fillRect(r.left, r.bottom - bw, r.width, bw);
    // blockquote's left border
    var blw = parseFloat(cs.borderLeftWidth);
    if (blw > 0) ctx.fillRect(r.left, r.top, blw, r.height);
    drawTextGlyphs(ctx, el);
  }

  var DIAG = window.__fieldGPUDiag = [];
  function diag(m) { DIAG.push(m); }

  window.__fieldGPUInit = async function (cfg) {
    var cleanup = [];
    try {
      diag("init start, els=" + cfg.els.length);
      if (!navigator.gpu) { diag("no navigator.gpu"); return false; }
      var adapter = await navigator.gpu.requestAdapter();
      if (!adapter) { diag("adapter: null"); return false; }
      diag("adapter ok" + (adapter.info ? " (" + (adapter.info.description || adapter.info.vendor || "?") + ")" : ""));
      var device = await adapter.requestDevice();
      diag("device ok");
      device.addEventListener && device.addEventListener("uncapturederror", function (e) {
        diag("UNCAPTURED: " + (e.error && e.error.message ? e.error.message.slice(0, 300) : e.error));
      });

      // DOCUMENT-ANCHORED WINDOW, not position:fixed: a fixed canvas painting viewport-
      // space content always trails the compositor's async scroll by a frame (visible lag).
      // Anchored absolute in the document, the compositor moves canvas and page TOGETHER —
      // scroll costs nothing and sync is exact. The window spans WIN viewports and jumps
      // (+ atlas redraw) only when scrolling nears its edge.
      // NB: a canvas is a REPLACED element — explicit CSS size in sizeAll() is load-bearing
      // (otherwise it displays at its intrinsic device-pixel size: 2x on Retina).
      var WIN = 3, originY = 0, winH = 0;
      var canvas = document.createElement("canvas");
      canvas.style.cssText = "position:absolute;left:0;top:0;pointer-events:none;z-index:4";
      canvas.setAttribute("aria-hidden", "true");
      document.body.appendChild(canvas);
      cleanup.push(function () { canvas.remove(); });

      var gctx = canvas.getContext("webgpu");
      if (!gctx) return false;
      var format = navigator.gpu.getPreferredCanvasFormat();

      var atlas = document.createElement("canvas");
      var actx = atlas.getContext("2d");

      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var texture = null, bindGroup = null;
      var module = device.createShaderModule({ code: WGSL });
      module.getCompilationInfo && module.getCompilationInfo().then(function (info) {
        info.messages.forEach(function (m) {
          diag("WGSL " + m.type + " L" + m.lineNum + ": " + m.message.slice(0, 200));
        });
      });
      var pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: { module: module, entryPoint: "vmain" },
        fragment: { module: module, entryPoint: "fmain",
          targets: [{ format: format,
            blend: { color: { srcFactor: "one", dstFactor: "one-minus-src-alpha" },
                     alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha" } } }] },
        primitive: { topology: "triangle-list" },
      });
      var ubuf = device.createBuffer({ size: 32, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
      var sampler = device.createSampler({ magFilter: "linear", minFilter: "linear" });

      function sizeAll() {
        canvas.width = Math.floor(innerWidth * dpr);
        canvas.height = Math.max(1, Math.floor(winH * dpr));
        canvas.style.width = innerWidth + "px";   // CSS size ≠ backing size on Retina
        canvas.style.height = winH + "px";
        atlas.width = canvas.width;
        atlas.height = canvas.height;
        gctx.configure({ device: device, format: format, alphaMode: "premultiplied" });
        texture = device.createTexture({
          size: [canvas.width, canvas.height],
          format: "rgba8unorm",
          usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
        });
        bindGroup = device.createBindGroup({
          layout: pipeline.getBindGroupLayout(0),
          entries: [
            { binding: 0, resource: { buffer: ubuf } },
            { binding: 1, resource: texture.createView() },
            { binding: 2, resource: sampler },
          ],
        });
      }

      // Window management: jump the canvas (and redraw) only when scroll nears an edge.
      // CLAMPED to the document's natural height — an absolutely-positioned box that
      // overhangs the page EXTENDS the scrollable area (accidental infinite scroll).
      // The measurement zeroes our own height first so we never measure our own overhang.
      function layoutWindow(force) {
        var vh = innerHeight, sy = window.scrollY;
        if (!force && !(sy < originY || sy + vh > originY + winH - vh * 0.25)) return;
        canvas.style.height = "0px";
        var docH = document.documentElement.scrollHeight;
        originY = Math.max(0, Math.min(sy - vh, Math.max(0, docH - WIN * vh)));
        var h = Math.min(WIN * vh, docH - originY);
        canvas.style.top = originY + "px";
        if (force || Math.abs(h - winH) > 1) {
          winH = h;
          sizeAll(); // reallocates backing + texture at the new window height
        } else {
          canvas.style.height = winH + "px"; // restore after the measurement zeroing
        }
        atlasDirty = true;
      }

      var atlasDirty = true;
      function redrawAtlas() {
        actx.setTransform(1, 0, 0, 1, 0, 0);
        actx.clearRect(0, 0, atlas.width, atlas.height);
        // map viewport-space drawing into the document-anchored window
        var sy = window.scrollY, sx = window.scrollX;
        actx.setTransform(dpr, 0, 0, dpr, sx * dpr, (sy - originY) * dpr);
        var cullTop = originY - sy, cullBottom = cullTop + winH;
        cfg.els.forEach(function (el) { drawElementAlpha(actx, el, cullTop, cullBottom); });

        // raw-bytes upload (writeTexture), not copyExternalImageToTexture: the blit path
        // kills software WebGPU implementations, and the data path is universal
        var img = actx.getImageData(0, 0, atlas.width, atlas.height);
        device.queue.writeTexture({ texture: texture }, img.data,
          { bytesPerRow: atlas.width * 4, rowsPerImage: atlas.height },
          [atlas.width, atlas.height]);
        atlasDirty = false;
      }

      // originals go invisible-but-real: text keeps layout/selection, boxes keep geometry
      cfg.els.forEach(function (el) {
        var prev = el.getAttribute("style") || "";
        cleanup.push(function () { el.setAttribute("style", prev); });
        if (el.classList.contains("fc-slab") || el.classList.contains("fc-ring") ||
            el.classList.contains("fc-bullet") || el.tagName === "HR") {
          el.style.opacity = "0";
        } else {
          el.style.color = "transparent";
          el.style.borderColor = "transparent";
        }
      });

      layoutWindow(true); redrawAtlas();
      diag("sized " + canvas.width + "x" + canvas.height + " dpr" + dpr + ", atlas drawn");
      window.addEventListener("resize", function () { layoutWindow(true); });
      window.addEventListener("scroll", function () { layoutWindow(false); }, { passive: true });
      new MutationObserver(function () { atlasDirty = true; }).observe(
        document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

      var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      var uf = new Float32Array(8);
      var frames = 0, dead = false;
      function frame(now) {
        if (dead) return; // device lost: stop submitting to a corpse
        frames++;
        if (frames === 1 || frames === 60) diag("frame " + frames + " @" + Math.round(now) + "ms");
        if (atlasDirty) redrawAtlas();
        var dark = document.documentElement.getAttribute("data-theme") === "dark" ? 1 : 0;
        // document offset = the window's origin, constant between jumps (scroll is free)
        uf[0] = 0; uf[1] = originY * dpr;
        uf[2] = canvas.width; uf[3] = canvas.height;
        uf[4] = (now / 1000) * 4; uf[5] = dark; uf[6] = dpr;
        device.queue.writeBuffer(ubuf, 0, uf);
        var enc = device.createCommandEncoder();
        var pass = enc.beginRenderPass({ colorAttachments: [{
          view: gctx.getCurrentTexture().createView(),
          clearValue: { r: 0, g: 0, b: 0, a: 0 }, loadOp: "clear", storeOp: "store" }] });
        pass.setPipeline(pipeline);
        pass.setBindGroup(0, bindGroup);
        pass.draw(3);
        pass.end();
        device.queue.submit([enc.finish()]);
        if (!reduced) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);

      device.lost.then(function (info) {
        // GPU went away mid-flight (driver reset, tab eviction, software-renderer giving
        // up): restore the DOM ink and hand control back — never leave a bare page.
        dead = true;
        diag("DEVICE LOST after " + frames + " frames: " + info.reason + " " + (info.message || "").slice(0, 200));
        cleanup.forEach(function (f) { try { f(); } catch (_) {} });
        if (cfg.onLost) cfg.onLost();
      });
      diag("init complete");
      return true;
    } catch (e) {
      diag("THREW: " + (e && e.message ? e.message.slice(0, 300) : e));
      cleanup.forEach(function (f) { try { f(); } catch (_) {} });
      return false;
    }
  };
})();
