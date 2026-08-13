/* =========================================================
   Ciseaux d'Or — « Coupe franche » — interactions (vanilla)
   ========================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var doc = document.documentElement;
  var body = document.body;

  function onReady(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  onReady(function () {
    /* ---------- Intro ---------- */
    var intro = document.getElementById("intro");
    var hero = document.getElementById("hero");
    function enableScrollSmooth() { doc.classList.add("ready"); }
    if (reduce) {
      body.classList.add("no-intro");
      if (hero) hero.classList.add("is-in");
      enableScrollSmooth();
    } else {
      // Le hero se met en mouvement quand l'intro s'efface
      setTimeout(function () { if (hero) hero.classList.add("is-in"); }, 1050);
      setTimeout(function () { if (intro) intro.style.display = "none"; enableScrollSmooth(); }, 1950);
    }

    /* ---------- Header au scroll ---------- */
    var header = document.getElementById("header");
    function headerState() {
      if (window.scrollY > 24) header.classList.add("scrolled");
      else header.classList.remove("scrolled");
    }
    window.addEventListener("scroll", headerState, { passive: true });
    headerState();

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
      nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
      window.addEventListener("resize", function () { if (window.innerWidth > 760) closeMenu(); });
    }

    /* ---------- Reveal ---------- */
    var revs = document.querySelectorAll(".rev");
    if ("IntersectionObserver" in window && !reduce) {
      var ro = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } });
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
      revs.forEach(function (el) { ro.observe(el); });
    } else {
      revs.forEach(function (el) { el.classList.add("in"); });
    }

    /* ---------- Scrollspy ---------- */
    var ids = ["manifeste", "prestations", "realisations", "adresse"];
    var links = {};
    if (nav) nav.querySelectorAll("a[href^='#']").forEach(function (a) {
      links[a.getAttribute("href").slice(1)] = a;
    });
    var secs = ids.map(function (id) { return document.getElementById(id); }).filter(Boolean);
    if ("IntersectionObserver" in window && secs.length) {
      var spy = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            Object.keys(links).forEach(function (k) { links[k].classList.toggle("active", k === e.target.id); });
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      secs.forEach(function (s) { spy.observe(s); });
    }

    /* ---------- Services : fond photo au survol (desktop) ---------- */
    var menu = document.getElementById("menu");
    var bgs = {};
    document.querySelectorAll(".services__bg img").forEach(function (im) { bgs[im.dataset.key] = im; });
    if (menu && fine) {
      menu.querySelectorAll(".menu__row").forEach(function (row) {
        row.addEventListener("mouseenter", function () {
          var k = row.dataset.bg;
          Object.keys(bgs).forEach(function (kk) { bgs[kk].classList.toggle("on", kk === k); });
        });
      });
      menu.addEventListener("mouseleave", function () {
        Object.keys(bgs).forEach(function (kk) { bgs[kk].classList.remove("on"); });
      });
    }

    /* ---------- Galerie horizontale épinglée (desktop) ---------- */
    var hs = document.getElementById("hscroll");
    var track = document.getElementById("track");
    if (hs && track) {
      var mq = window.matchMedia("(min-width: 761px)");
      var extra = 0;
      // Facteur < 1 : on traverse la galerie en scrollant moins (descente plus facile)
      var FACTOR = 0.62;
      function measure() {
        if (reduce || !mq.matches) { hs.style.height = ""; track.style.transform = ""; extra = 0; return; }
        extra = Math.max(0, track.scrollWidth - window.innerWidth + 40);
        hs.style.height = (window.innerHeight + extra * FACTOR) + "px";
      }
      function hMove() {
        if (reduce || !mq.matches || extra <= 0) return;
        var top = hs.getBoundingClientRect().top;
        var span = extra * FACTOR;
        var scrolled = Math.min(Math.max(-top, 0), span);
        track.style.transform = "translate3d(" + (-(scrolled / FACTOR)).toFixed(1) + "px,0,0)";
      }
      var tks = false;
      window.addEventListener("scroll", function () { if (!tks) { requestAnimationFrame(function () { hMove(); tks = false; }); tks = true; } }, { passive: true });
      window.addEventListener("resize", function () { measure(); hMove(); });
      // (re)mesure après chargement des polices/images
      setTimeout(function () { measure(); hMove(); }, 300);
      window.addEventListener("load", function () { measure(); hMove(); });
      measure(); hMove();
    }

    /* ---------- Parallaxe légère ---------- */
    var paras = document.querySelectorAll("[data-parallax]");
    if (paras.length && !reduce) {
      var pt = false;
      function para() {
        var vh = window.innerHeight;
        paras.forEach(function (el) {
          var r = el.parentElement.getBoundingClientRect();
          if (r.bottom < -100 || r.top > vh + 100) return;
          var prog = (r.top + r.height / 2 - vh / 2) / vh;
          el.style.transform = "translate3d(0," + (prog * -6).toFixed(2) + "%,0)";
        });
        pt = false;
      }
      window.addEventListener("scroll", function () { if (!pt) { requestAnimationFrame(para); pt = true; } }, { passive: true });
      para();
    }

    /* ---------- Boutons magnétiques ---------- */
    if (fine && !reduce) {
      document.querySelectorAll("[data-magnetic]").forEach(function (b) {
        b.addEventListener("mousemove", function (e) {
          var r = b.getBoundingClientRect();
          b.style.transform = "translate(" + (e.clientX - (r.left + r.width / 2)) * 0.16 + "px," + (e.clientY - (r.top + r.height / 2)) * 0.24 + "px)";
        });
        b.addEventListener("mouseleave", function () { b.style.transform = ""; });
      });
    }

    /* ---------- Jour d'ouverture ---------- */
    var d = new Date().getDay();
    if (d >= 2 && d <= 6) {
      var dd = document.getElementById("hoursDd");
      if (dd) dd.classList.add("today");
    }

    /* ---------- Barre réservation mobile ---------- */
    var bar = document.getElementById("bookbar");
    if (bar) {
      function barState() {
        var y = window.scrollY;
        var nearBottom = window.innerHeight + y > (document.body.scrollHeight - 240);
        if (y > window.innerHeight * 0.85 && !nearBottom) bar.classList.add("show");
        else bar.classList.remove("show");
      }
      window.addEventListener("scroll", barState, { passive: true });
      barState();
    }

    /* ---------- Année ---------- */
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
