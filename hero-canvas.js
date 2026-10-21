/* ============================================================
   Ziya Digital Solution — Shared Animated Background
   Universal particle & network canvas for all pages.
   Features:
     - Deep navy #06152F atmosphere with glowing cyan & gold nodes
     - Dynamic interconnecting data lines & travelling pulses
     - Ambient floating sparkles
     - Responsive particle counts (lightweight on mobile)
     - prefers-reduced-motion accessibility support
     - Auto-pauses on background tabs to conserve CPU/battery
     - Non-blocking pointer-events: none
   ============================================================ */
(function () {
  "use strict";

  function initBackgroundCanvas() {
    var canvas = document.getElementById("bg-canvas") || document.getElementById("heroCanvas");

    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "bg-canvas";
      canvas.className = "site-bg-canvas";
      canvas.setAttribute("aria-hidden", "true");
      if (document.body.firstChild) {
        document.body.insertBefore(canvas, document.body.firstChild);
      } else {
        document.body.appendChild(canvas);
      }
    }

    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    var W = 0, H = 0, rafId = null;
    var prefersReducedMotion = false;

    try {
      prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {
      prefersReducedMotion = false;
    }

    /* ---- Palette ---- */
    var GOLD  = "rgba(217, 162, 27, ";
    var CYAN  = "rgba(56, 189, 248, ";
    var WHITE = "rgba(255, 255, 255, ";

    /* ---- Responsive sizing & density ---- */
    var nodes = [];
    var sparks = [];
    var packets = [];

    function getDensity() {
      var width = window.innerWidth;
      if (width < 600) {
        return { nodeCount: 24, maxDist: 85, sparkCount: 16, packetCount: 5 };
      } else if (width < 992) {
        return { nodeCount: 38, maxDist: 105, sparkCount: 22, packetCount: 8 };
      }
      return { nodeCount: 58, maxDist: 130, sparkCount: 32, packetCount: 12 };
    }

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;

      canvas.width  = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initParticles();
    }

    function initParticles() {
      var cfg = getDensity();
      nodes = [];
      sparks = [];
      packets = [];

      for (var i = 0; i < cfg.nodeCount; i++) {
        nodes.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 1.4 + Math.random() * 2.2,
          vx: (Math.random() - 0.5) * 0.40,
          vy: (Math.random() - 0.5) * 0.40,
          color: Math.random() > 0.45 ? GOLD : CYAN
        });
      }

      for (var s = 0; s < cfg.sparkCount; s++) {
        sparks.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: 0.7 + Math.random() * 1.3,
          vy: -(0.2 + Math.random() * 0.5),
          alpha: Math.random() * 0.7,
          dAlpha: 0.006 + Math.random() * 0.008
        });
      }

      for (var p = 0; p < cfg.packetCount; p++) {
        spawnPacket();
      }
    }

    function spawnPacket() {
      if (nodes.length < 2) return;
      var a = Math.floor(Math.random() * nodes.length);
      var b = Math.floor(Math.random() * nodes.length);
      if (a !== b) {
        packets.push({ a: a, b: b, t: 0, speed: 0.007 + Math.random() * 0.010 });
      }
    }

    /* ---- Draw routines ---- */
    function drawNode(n) {
      var g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 3.2);
      g.addColorStop(0, n.color + "0.85)");
      g.addColorStop(1, n.color + "0)");

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * 3.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = n.color + "0.95)";
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawLine(x1, y1, x2, y2, alpha, color) {
      ctx.strokeStyle = color + alpha + ")";
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    function renderStatic() {
      ctx.clearRect(0, 0, W, H);
      var cfg = getDensity();

      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var dx = nodes[i].x - nodes[j].x;
          var dy = nodes[i].y - nodes[j].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < cfg.maxDist) {
            var alpha = ((1 - d / cfg.maxDist) * 0.22).toFixed(3);
            drawLine(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y, alpha, nodes[i].color);
          }
        }
      }
      for (var k = 0; k < nodes.length; k++) {
        drawNode(nodes[k]);
      }
    }

    function loop() {
      ctx.clearRect(0, 0, W, H);
      var cfg = getDensity();

      /* Move & bounce nodes */
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        else if (n.x > W) { n.x = W; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        else if (n.y > H) { n.y = H; n.vy *= -1; }
      }

      /* Connecting lines */
      for (var a = 0; a < nodes.length; a++) {
        for (var b = a + 1; b < nodes.length; b++) {
          var dx = nodes[a].x - nodes[b].x;
          var dy = nodes[a].y - nodes[b].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < cfg.maxDist) {
            var alpha = ((1 - d / cfg.maxDist) * 0.24).toFixed(3);
            drawLine(nodes[a].x, nodes[a].y, nodes[b].x, nodes[b].y, alpha, nodes[a].color);
          }
        }
      }

      /* Traveling data packets */
      for (var p = 0; p < packets.length; p++) {
        var pk = packets[p];
        pk.t += pk.speed;
        if (pk.t >= 1) {
          packets[p] = {
            a: pk.b,
            b: Math.floor(Math.random() * nodes.length),
            t: 0,
            speed: 0.007 + Math.random() * 0.010
          };
          continue;
        }
        var na = nodes[pk.a];
        var nb = nodes[pk.b];
        if (!na || !nb) continue;

        var px = na.x + (nb.x - na.x) * pk.t;
        var py = na.y + (nb.y - na.y) * pk.t;

        ctx.fillStyle = CYAN + "0.95)";
        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      /* Draw nodes */
      for (var j = 0; j < nodes.length; j++) {
        drawNode(nodes[j]);
      }

      /* Ambient floating sparkles */
      for (var s = 0; s < sparks.length; s++) {
        var sp = sparks[s];
        sp.y += sp.vy;
        sp.alpha += sp.dAlpha;
        if (sp.alpha > 0.75) sp.dAlpha *= -1;
        if (sp.alpha < 0.05 || sp.y < 0) {
          sp.x = Math.random() * W;
          sp.y = H;
          sp.alpha = 0.05;
          sp.dAlpha = Math.abs(sp.dAlpha);
        }
        ctx.fillStyle = WHITE + sp.alpha.toFixed(2) + ")";
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(loop);
    }

    /* Resize listener with debounce */
    var resizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        resize();
        if (prefersReducedMotion) {
          renderStatic();
        }
      }, 150);
    }, { passive: true });

    /* Reduced motion check */
    if (prefersReducedMotion) {
      resize();
      renderStatic();
      return;
    }

    /* Start animation */
    resize();
    loop();

    /* Battery saving on tab switch */
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        if (rafId) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      } else {
        if (!rafId && !prefersReducedMotion) {
          loop();
        }
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBackgroundCanvas);
  } else {
    initBackgroundCanvas();
  }
})();
