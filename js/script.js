/* ============================================================
   Ziya Digital Solution — Site JavaScript
   Handles: mobile menu, FAQ accordion, portfolio filters,
   contact form validation, dynamic footer year.
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  /* ---------- Mobile navigation toggle ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
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
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  /* ---------- Contact form validation ----------
     NOTE: A static HTML form cannot send email by itself.
     Connect a form service (e.g. Formspree) as explained in README.md.
     Until then, the form validates input and shows a clear message. */
  var form = document.getElementById("enquiry-form");

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var status = document.getElementById("form-status");
      var name = form.elements["name"].value.trim();
      var phone = form.elements["phone"].value.trim();
      var email = form.elements["email"].value.trim();
      var message = form.elements["message"].value.trim();

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

      // No backend connected yet — be honest with the visitor.
      status.textContent =
        "The online form is not connected yet. Please call +91 9751205260 or use the WhatsApp button to send your enquiry.";
      status.className = "form-status error";
    });
  }

  /* ---------- Dynamic copyright year ---------- */
  var yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
