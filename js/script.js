/* ============================================================
   Ziya Digital Solution — Site JavaScript
   Handles: mobile menu, FAQ accordion, portfolio filters,
   contact form validation, dynamic footer year, scroll-triggered
   reveal animations, sticky header effects, 3D card tilt,
   animated number counters, and back-to-top navigation.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Sticky Header Scroll Effect ---------- */
  var header = document.querySelector(".site-header");
  if (header) {
    var checkHeaderScroll = function () {
      if (window.scrollY > 25) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", checkHeaderScroll, { passive: true });
    checkHeaderScroll();
  }

  /* ---------- Mobile navigation toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when clicking outside, clicking a nav link, or pressing Escape
    document.addEventListener("click", function (e) {
      if (header && !header.contains(e.target) && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (mainNav.classList.contains("open")) {
          mainNav.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      });
    });
  }

  /* ---------- Scroll-Triggered Reveal Animations ---------- */
  // Automatically add reveal classes with stagger to grids across all pages
  var autoRevealGrids = document.querySelectorAll(".grid-3, .grid-2, .process, .faq, .footer-grid, .service-block");
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

  // Also auto-reveal section titles, leads, and CTA cards
  var singleRevealElements = document.querySelectorAll(".section-title, .section-lead, .cta-band, .contact-info-card, .form-card");
  singleRevealElements.forEach(function (el) {
    if (!el.classList.contains("reveal") && !el.classList.contains("reveal-left") && !el.classList.contains("reveal-right")) {
      el.classList.add("reveal");
    }
  });

  // Observe all elements with reveal classes
  var revealElements = document.querySelectorAll(".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");

            // If entry contains counter numbers, trigger count animation
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
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback for older browsers
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

    var duration = 1800; // ms
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
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
      var rotateX = ((y - centerY) / centerY) * -9;
      var rotateY = ((x - centerX) / centerX) * 9;

      heroCard.style.transform =
        "perspective(1000px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg) scale3d(1.02, 1.02, 1.02)";
    });

    heroWrap.addEventListener("mouseleave", function () {
      heroCard.style.transform = "";
    });
  }

  /* ---------- FAQ accordion ---------- */
  var faqQuestions = document.querySelectorAll(".faq-question");

  faqQuestions.forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.closest(".faq-item");
      var answer = item.querySelector(".faq-answer");
      var isOpen = item.classList.contains("open");

      // Close all items first (only one open at a time)
      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        openItem.classList.remove("open");
        openItem.querySelector(".faq-answer").style.maxHeight = null;
        openItem.querySelector(".faq-question").setAttribute("aria-expanded", "false");
      });

      // Open the clicked one if it was closed
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        button.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Portfolio category filters ---------- */
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
          // Re-trigger appearance animation
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

  /* ---------- Contact form — Formspree submission ---------- */
  var form = document.getElementById("enquiry-form");

  if (form) {
    var submitBtn  = document.getElementById("enquiry-submit");
    var statusEl   = document.getElementById("form-status");
    var submitting = false; // duplicate-submission lock

    /* Helper: show/clear inline field error */
    function setFieldError(fieldId, message) {
      var errorEl = document.getElementById(fieldId + "-error");
      var inputEl = document.getElementById(fieldId);
      if (!errorEl || !inputEl) return;
      errorEl.textContent = message;
      if (message) {
        inputEl.classList.add("input-invalid");
        inputEl.setAttribute("aria-invalid", "true");
      } else {
        inputEl.classList.remove("input-invalid");
        inputEl.removeAttribute("aria-invalid");
      }
    }

    /* Clear all inline errors */
    function clearFieldErrors() {
      ["name", "phone", "email", "message"].forEach(function (id) {
        setFieldError(id, "");
      });
    }

    /* Basic client-side validation; returns true if valid */
    function validateForm() {
      var valid = true;
      var name    = form.elements["name"].value.trim();
      var phone   = form.elements["phone"].value.trim();
      var email   = form.elements["email"].value.trim();
      var message = form.elements["message"].value.trim();

      clearFieldErrors();

      if (!name) {
        setFieldError("name", "Please enter your full name.");
        valid = false;
      }

      if (!phone) {
        setFieldError("phone", "Please enter your phone number.");
        valid = false;
      } else if (!/^[+\d\s\-()\.\[\]]{7,20}$/.test(phone)) {
        setFieldError("phone", "Please enter a valid phone number.");
        valid = false;
      }

      var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        setFieldError("email", "Please enter your email address.");
        valid = false;
      } else if (!emailPattern.test(email)) {
        setFieldError("email", "Please enter a valid email address.");
        valid = false;
      }

      if (!message) {
        setFieldError("message", "Please describe your project or requirement.");
        valid = false;
      }

      return valid;
    }

    /* Mirror email value into _replyto hidden field */
    var emailInput   = document.getElementById("email");
    var replytoField = document.getElementById("replyto-mirror");
    if (emailInput && replytoField) {
      emailInput.addEventListener("input", function () {
        replytoField.value = emailInput.value.trim();
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      // Prevent duplicate submissions
      if (submitting) return;

      // Run validation
      if (!validateForm()) {
        statusEl.textContent = "";
        statusEl.className   = "form-status";
        // Scroll to first error
        var firstError = form.querySelector(".input-invalid");
        if (firstError) firstError.focus();
        return;
      }

      // Lock form & show loading state
      submitting = true;
      submitBtn.disabled   = true;
      submitBtn.textContent = "Sending…";
      statusEl.textContent  = "";
      statusEl.className    = "form-status";

      // Submit to Formspree via fetch (JSON response)
      fetch(form.action, {
        method: "POST",
        body:    new FormData(form),
        headers: { Accept: "application/json" }
      })
        .then(function (response) {
          if (response.ok) {
            // ✅ Success
            statusEl.textContent = "✅ Thank you! Your enquiry has been sent. We'll get back to you within 24 hours.";
            statusEl.className   = "form-status success";
            form.reset();
            if (replytoField) replytoField.value = "";
            clearFieldErrors();
          } else {
            // Formspree returned an error response
            return response.json().then(function (data) {
              var msg = (data && data.errors && data.errors.length)
                ? data.errors.map(function (e) { return e.message; }).join(", ")
                : "Submission failed. Please try again or contact us directly.";
              statusEl.textContent = "❌ " + msg;
              statusEl.className   = "form-status error";
            });
          }
        })
        .catch(function () {
          // Network / fetch error
          statusEl.textContent = "❌ Network error. Please check your connection and try again, or call us at +91 9751205260.";
          statusEl.className   = "form-status error";
        })
        .finally(function () {
          // Restore button & release lock
          submitting            = false;
          submitBtn.disabled    = false;
          submitBtn.textContent = submitBtn.getAttribute("data-default-text") || "Send Enquiry";
          // Scroll status into view
          statusEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
    });
  }

  /* ---------- Floating Back to Top Button ---------- */
  var backToTopBtn = document.createElement("button");
  backToTopBtn.className = "back-to-top";
  backToTopBtn.setAttribute("aria-label", "Scroll back to top");
  backToTopBtn.innerHTML = "↑";
  document.body.appendChild(backToTopBtn);

  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 400) {
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

  /* ---------- Dynamic copyright year ---------- */
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
