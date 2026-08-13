/* =========================================================
   Ciseaux d'Or — interactions (vanilla JS, léger)
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var body = document.body;

  document.addEventListener("DOMContentLoaded", function () {
    /* ---------- Header au défilement ---------- */
    var header = document.getElementById("header");
    function onScroll() {
      if (window.scrollY > 30) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* ---------- Menu mobile ---------- */
    var burger = document.getElementById("burger");
    var nav = document.getElementById("nav");
    function closeMenu() {
      body.classList.remove("menu-open");
      burger.setAttribute("aria-expanded", "false");
      body.style.overflow = "";
    }
    if (burger && nav) {
      burger.addEventListener("click", function () {
        var open = body.classList.toggle("menu-open");
        burger.setAttribute("aria-expanded", open ? "true" : "false");
        body.style.overflow = open ? "hidden" : "";
      });
      nav.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", closeMenu);
      });
      window.addEventListener("resize", function () {
        if (window.innerWidth > 760) closeMenu();
      });
    }

    /* ---------- Reveal au scroll ---------- */
    var revs = document.querySelectorAll(".rev");
    if ("IntersectionObserver" in window && !reduce) {
      var ro = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              ro.unobserve(e.target);
            }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
      );
      revs.forEach(function (el) { ro.observe(el); });
    } else {
      revs.forEach(function (el) { el.classList.add("in"); });
    }

    /* ---------- Scrollspy (navigation active) ---------- */
    var sections = ["philosophie", "prestations", "realisations", "experience", "contact"]
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);
    var navLinks = {};
    (nav ? nav.querySelectorAll("a[href^='#']") : []).forEach &&
      nav.querySelectorAll("a[href^='#']").forEach(function (a) {
        navLinks[a.getAttribute("href").slice(1)] = a;
      });
    if ("IntersectionObserver" in window && sections.length) {
      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              Object.keys(navLinks).forEach(function (k) {
                navLinks[k].classList.toggle("active", k === e.target.id);
              });
            }
          });
        },
        { threshold: 0.5, rootMargin: "-20% 0px -35% 0px" }
      );
      sections.forEach(function (s) { spy.observe(s); });
    }

    /* ---------- Prestations : aperçu image au survol (desktop) ---------- */
    var peek = document.getElementById("srvPeek");
    var srvList = document.getElementById("srvList");
    if (peek && srvList && finePointer && !reduce) {
      var imgs = {};
      peek.querySelectorAll("img").forEach(function (im) { imgs[im.dataset.key] = im; });
      var tx = 0, ty = 0, cx = 0, cy = 0, raf = null, active = false;
      function loop() {
        cx += (tx - cx) * 0.16;
        cy += (ty - cy) * 0.16;
        peek.style.transform =
          "translate(" + cx + "px," + cy + "px) translate(-50%,-50%) scale(" +
          (active ? 1 : 0.94) + ")";
        raf = requestAnimationFrame(loop);
      }
      srvList.querySelectorAll(".srv").forEach(function (row) {
        row.addEventListener("mouseenter", function () {
          var key = row.dataset.peek;
          Object.keys(imgs).forEach(function (k) { imgs[k].classList.toggle("on", k === key); });
          active = true;
          peek.classList.add("show");
          if (!raf) loop();
        });
        row.addEventListener("mouseleave", function () {
          active = false;
          peek.classList.remove("show");
        });
      });
      window.addEventListener("mousemove", function (e) { tx = e.clientX; ty = e.clientY; }, { passive: true });
    }

    /* ---------- Parallaxe très légère ---------- */
    var plates = document.querySelectorAll("[data-parallax]");
    if (plates.length && !reduce) {
      var ticking = false;
      function para() {
        plates.forEach(function (el) {
          var r = el.parentElement.getBoundingClientRect();
          var vh = window.innerHeight;
          if (r.bottom < 0 || r.top > vh) return;
          var prog = (r.top + r.height / 2 - vh / 2) / vh; // -0.5..0.5
          el.style.transform = "translate3d(0," + (prog * -7).toFixed(2) + "%,0)";
        });
        ticking = false;
      }
      window.addEventListener("scroll", function () {
        if (!ticking) { requestAnimationFrame(para); ticking = true; }
      }, { passive: true });
      para();
    }

    /* ---------- Boutons magnétiques (très léger) ---------- */
    if (finePointer && !reduce) {
      document.querySelectorAll("[data-magnetic]").forEach(function (b) {
        b.addEventListener("mousemove", function (e) {
          var r = b.getBoundingClientRect();
          var mx = e.clientX - (r.left + r.width / 2);
          var my = e.clientY - (r.top + r.height / 2);
          b.style.transform = "translate(" + mx * 0.18 + "px," + my * 0.28 + "px)";
        });
        b.addEventListener("mouseleave", function () { b.style.transform = ""; });
      });
    }

    /* ---------- Hero : profondeur très légère (desktop) ---------- */
    var heroImg = document.querySelector(".hero__media img");
    if (heroImg && finePointer && !reduce) {
      var hx = 0, hy = 0, hcx = 0, hcy = 0, hRaf = null, sY = 0;
      var SCALE = 1.08, MAXX = 6, MAXY = 5, MAXS = 8; // pixels max
      function heroLoop() {
        hcx += (hx - hcx) * 0.08;
        hcy += (hy - hcy) * 0.08;
        heroImg.style.transform =
          "scale(" + SCALE + ") translate3d(" + hcx.toFixed(2) + "px," +
          (hcy + sY).toFixed(2) + "px,0)";
        hRaf = requestAnimationFrame(heroLoop);
      }
      var hero = document.querySelector(".hero");
      hero.addEventListener("mousemove", function (e) {
        if (window.innerWidth <= 1024) return;
        var r = hero.getBoundingClientRect();
        hx = ((e.clientX - r.left) / r.width - 0.5) * 2 * MAXX;
        hy = ((e.clientY - r.top) / r.height - 0.5) * 2 * MAXY;
      }, { passive: true });
      hero.addEventListener("mouseleave", function () { hx = 0; hy = 0; });
      window.addEventListener("scroll", function () {
        if (window.innerWidth <= 1024) { sY = 0; return; }
        var r = hero.getBoundingClientRect();
        if (r.bottom < 0) return;
        sY = Math.max(0, Math.min(1, -r.top / (window.innerHeight || 1))) * MAXS;
      }, { passive: true });
      // Démarre après l'animation d'entrée pour ne pas la perturber
      setTimeout(function () { if (window.innerWidth > 1024) heroLoop(); }, 2000);
    }

    /* ---------- Jour d'ouverture ---------- */
    var day = new Date().getDay(); // 0 dim .. 6 sam
    if (day >= 2 && day <= 6) {
      var dd = document.getElementById("hoursDd");
      if (dd) dd.classList.add("today");
    }

    /* ---------- Lightbox galerie ---------- */
    var lb = document.getElementById("lb");
    var lbImg = document.getElementById("lbImg");
    var lbX = document.getElementById("lbX");
    function openLb(src, alt) {
      lbImg.src = src; lbImg.alt = alt || "";
      lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
      body.style.overflow = "hidden";
    }
    function closeLb() {
      lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true");
      body.style.overflow = "";
    }
    document.querySelectorAll(".shot img").forEach(function (im) {
      im.addEventListener("click", function () {
        openLb(im.currentSrc || im.src, im.alt);
      });
    });
    if (lbX) lbX.addEventListener("click", closeLb);
    if (lb) lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLb(); });

    /* ---------- Année ---------- */
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
