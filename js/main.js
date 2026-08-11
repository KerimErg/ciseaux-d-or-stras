/* =========================================================
   Ciseaux d'Or — Script principal
   - Menu mobile (burger)
   - Header au défilement
   - Animations de révélation au scroll
   - Mise en avant du jour d'ouverture
   - Lightbox de la galerie
   - Année automatique dans le footer
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  /* ----- Menu mobile ----- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  var isDesktop = function () {
    return window.matchMedia("(min-width: 901px)").matches;
  };

  function closeMenu() {
    navMenu.classList.remove("is-open");
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
    if (!isDesktop()) document.body.style.overflow = "";
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      navToggle.classList.toggle("is-active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      // Verrouille le défilement de la page quand le menu mobile est ouvert
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    // Ferme le menu quand on clique sur un lien
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Réinitialise si on repasse en desktop
    window.addEventListener("resize", function () {
      if (isDesktop()) {
        navMenu.classList.remove("is-open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ----- Header au défilement ----- */
  var header = document.getElementById("header");
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  }
  window.addEventListener("scroll", onScroll);
  onScroll();

  /* ----- Révélation au scroll ----- */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    // Repli : tout afficher si IntersectionObserver n'est pas supporté
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  /* ----- Mise en avant du jour courant dans les horaires ----- */
  var todayIndex = new Date().getDay(); // 0 = dimanche ... 6 = samedi
  var todayRow = document.querySelector(
    '.hours__row[data-day="' + todayIndex + '"]'
  );
  if (todayRow) {
    todayRow.classList.add("is-today");
  }

  /* ----- Lightbox de la galerie ----- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");
  var galleryImages = document.querySelectorAll(".gallery__item img");

  function openLightbox(src, alt) {
    lightboxImg.setAttribute("src", src);
    lightboxImg.setAttribute("alt", alt || "Image agrandie");
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  galleryImages.forEach(function (img) {
    img.addEventListener("click", function () {
      openLightbox(img.getAttribute("src"), img.getAttribute("alt"));
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }
  if (lightbox) {
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });

  /* ----- Année automatique dans le footer ----- */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
