/* ============================================================
   Ziya Digital Solution — Site JavaScript
   Handles: mobile menu, FAQ accordion, portfolio filters,
   contact form validation, dynamic footer year, scroll-triggered
   reveal animations, sticky header effects, 3D card tilt,
   animated number counters, and back-to-top navigation.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* ---------- Sticky Header Scroll Effect ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var checkHeaderScroll = function () {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", checkHeaderScroll, { passive: true });
    checkHeaderScroll();
  }

  /* ---------- Mobile Navigation Toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var isOpen = mainNav.classList.toggle("open");
      navToggle.classList.toggle("active", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (header && !header.contains(e.target) && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        navToggle.classList.remove("active");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close menu when clicking a nav link
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (mainNav.classList.contains("open")) {
          mainNav.classList.remove("open");
          navToggle.classList.remove("active");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* ---------- Scroll-Triggered Reveal Animations ---------- */
  var autoRevealGrids = document.querySelectorAll(".grid-3, .grid-2, .process, .faq, .footer-grid, .service-block, .feature-check-list");
  autoRevealGrids.forEach(function (grid) {
    var children = grid.children;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      if (!child.classList.contains("reveal") && !child.classList.contains("reveal-left") && !child.classList.contains("reveal-right")) {
        child.classList.add("reveal");
        var delayClass = "delay-" + ((i % 5) + 1);
        child.classList.add(delayClass);
      }
    }
  });

  var singleRevealElements = document.querySelectorAll(".section-title, .section-lead, .cta-band, .contact-info-card, .form-card");
  singleRevealElements.forEach(function (el) {
    if (!el.classList.contains("reveal") && !el.classList.contains("reveal-left") && !el.classList.contains("reveal-right")) {
      el.classList.add("reveal");
    }
  });

  var revealElements = document.querySelectorAll(".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");

            var counters = entry.target.querySelectorAll("[data-counter]");
            counters.forEach(function (counter) {
              animateCounter(counter);
            });
            if (entry.target.hasAttribute("data-counter")) {
              animateCounter(entry.target);
            }

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.10,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach(function (el) {
      el.classList.add("revealed");
    });
  }

  /* ---------- Animated Number Counters ---------- */
  function animateCounter(element) {
    if (element.getAttribute("data-counted") === "true") return;
    element.setAttribute("data-counted", "true");

    var target = parseInt(element.getAttribute("data-counter"), 10);
    if (isNaN(target)) return;

    var duration = 1600;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var easeProgress = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(easeProgress * target);
      element.textContent = current;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        element.textContent = target;
      }
    }

    window.requestAnimationFrame(step);
  }

  /* ---------- 3D Parallax Tilt Effect on Hero Card (Desktop) ---------- */
  var heroCard = document.querySelector(".hero-image-card");
  var heroWrap = document.querySelector(".hero-image-wrap");

  if (heroCard && heroWrap && window.matchMedia("(min-width: 901px)").matches) {
    heroWrap.addEventListener("mousemove", function (e) {
      var rect = heroWrap.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotateX = ((y - centerY) / centerY) * -8;
      var rotateY = ((x - centerX) / centerX) * 8;

      heroCard.style.transform =
        "perspective(1000px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg) scale3d(1.02, 1.02, 1.02)";
    });

    heroWrap.addEventListener("mouseleave", function () {
      heroCard.style.transform = "";
    });
  }

  /* ---------- FAQ Accordion ---------- */
  var faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.closest(".faq-item");
      var answer = item.querySelector(".faq-answer");
      var isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        openItem.classList.remove("open");
        var openAns = openItem.querySelector(".faq-answer");
        if (openAns) openAns.style.maxHeight = null;
        var openBtn = openItem.querySelector(".faq-question");
        if (openBtn) openBtn.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Portfolio Category Filters ---------- */
  var filterButtons = document.querySelectorAll(".filter-btn");
  var portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var category = button.getAttribute("data-filter");

      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });
      button.classList.add("active");

      portfolioItems.forEach(function (item) {
        var itemCategory = item.getAttribute("data-category");
        if (category === "all" || itemCategory === category) {
          item.style.display = "";
          item.classList.remove("revealed");
          setTimeout(function () {
            item.classList.add("revealed");
          }, 30);
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  /* ---------- Contact Form Validation ---------- */
  var form = document.getElementById("enquiry-form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = document.getElementById("form-status");
      var name = form.elements["name"] ? form.elements["name"].value.trim() : "";
      var phone = form.elements["phone"] ? form.elements["phone"].value.trim() : "";
      var email = form.elements["email"] ? form.elements["email"].value.trim() : "";
      var message = form.elements["message"] ? form.elements["message"].value.trim() : "";

      if (!name || !phone || !email || !message) {
        status.textContent = "Please fill in all required fields.";
        status.className = "form-status error";
        return;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        status.textContent = "Please enter a valid email address.";
        status.className = "form-status error";
        return;
      }

      status.textContent =
        "Thank you! Your enquiry has been received. You can also connect instantly via WhatsApp or call +91 9751205260.";
      status.className = "form-status success";
      form.reset();
    });
  }

  /* ---------- Floating Back to Top Button ---------- */
  var backToTopBtn = document.querySelector(".back-to-top");
  if (!backToTopBtn) {
    backToTopBtn = document.createElement("button");
    backToTopBtn.className = "back-to-top";
    backToTopBtn.setAttribute("aria-label", "Scroll back to top");
    backToTopBtn.innerHTML = "↑";
    document.body.appendChild(backToTopBtn);
  }

  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    },
    { passive: true }
  );

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  /* ---------- Dynamic Copyright Year ---------- */
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
