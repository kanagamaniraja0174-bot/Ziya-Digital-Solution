/* ============================================================
   Ziya Digital Solution — Live AI Chatbot Widget Engine
   Author: Ziya Digital Solution
   Features:
   - Instant NLP response engine trained on agency knowledge
   - Dynamic quick suggestion chips
   - Simulated realistic typing indicator
   - 1-Click WhatsApp direct handover with pre-filled message
   - Persistent session storage across page navigation
   - Accessible keyboard controls & mobile responsive
   ============================================================ */

(function () {
  "use strict";

  // Prevent multiple initializations
  if (window.ZiyaChatbotInitialized) return;
  window.ZiyaChatbotInitialized = true;

  /* ---------- Agency Knowledge Base & Responses ---------- */
  var KNOWLEDGE_BASE = [
    {
      keywords: ["hi", "hello", "hey", "vanakkam", "namaste", "good morning", "good evening", "good afternoon", "start", "yo"],
      response: "Hello! 👋 Welcome to **Ziya Digital Solution**! I'm your AI Digital Growth Advisor. How can I help boost your business online today?",
      quickLinks: [
        { text: "🌐 Website Pricing", query: "What are your website packages and pricing?" },
        { text: "📈 Digital Marketing", query: "Tell me about your digital marketing services" },
        { text: "💬 WhatsApp Us", url: "https://wa.me/919751205260?text=Hello%20Ziya%20Digital%20Solution%2C%20I%20would%20like%20to%20enquire%20about%20your%20services." }
      ]
    },
    {
      keywords: ["about", "who are you", "what is ziya", "company", "agency", "what do you do", "introduce"],
      response: "✨ **Ziya Digital Solution** is a premier digital marketing and web design agency based in **Karur, Tamil Nadu**.\n\nWe specialize in:\n• Custom, high-speed website design & development\n• ROI-focused Digital Marketing & Lead Generation\n• Google SEO & Local Map Ranking\n• Social Media Marketing (Instagram, Facebook, LinkedIn)\n• High-converting Google Ads & PPC campaigns\n• Creative Logo & Brand Identity Design",
      quickLinks: [
        { text: "📖 Learn More (About Us)", url: "about.html" },
        { text: "💼 View Portfolio", url: "portfolio.html" },
        { text: "📞 Free Consultation", url: "contact.html" }
      ]
    },
    {
      keywords: ["website", "web design", "web development", "landing page", "ecommerce", "online store", "wordpress", "custom site", "redesign", "responsive"],
      response: "💻 **Website Design & Development by Ziya:**\n\nWe craft 100% custom, mobile-first, and ultra-fast websites designed to turn visitors into paying customers.\n\n• **Corporate & Business Websites**\n• **E-commerce Stores** with payment gateways\n• **Lead Generation Landing Pages**\n• **Mobile & Tablet Optimized**\n• **SEO-Ready & Lightning Fast**\n\nWould you like a custom quotation for your website?",
      quickLinks: [
        { text: "💰 Get Website Quote", url: "contact.html" },
        { text: "🛠️ Services Detail", url: "services.html" },
        { text: "💬 WhatsApp for Quote", url: "https://wa.me/919751205260?text=Hi%2C%20I%20need%20a%20quotation%20for%20website%20design." }
      ]
    },
    {
      keywords: ["marketing", "digital marketing", "grow business", "sales", "leads", "lead gen", "growth"],
      response: "📈 **Strategic Digital Marketing:**\n\nWe don't just generate clicks — we bring real enquiries and revenue to your business through:\n\n1. High-intent **Google Search Ads**\n2. Targeted **Meta / Instagram Ads**\n3. **Local SEO** to dominate search in your city\n4. Engaging **Content Strategy & Conversion Funnels**\n\nLet's build a customized marketing plan for your business!",
      quickLinks: [
        { text: "🎯 Explore Services", url: "services.html" },
        { text: "📞 Talk to Strategist", url: "contact.html" }
      ]
    },
    {
      keywords: ["seo", "google rank", "ranking", "search engine", "first page", "traffic", "keywords", "google map"],
      response: "🔍 **Search Engine Optimisation (SEO):**\n\nHelp your customers find your business right when they search on Google!\n\n• **On-Page SEO:** Keyword research, meta tags, speed optimization\n• **Technical SEO:** Mobile usability, indexing, structure\n• **Local SEO:** Google Business Profile setup & local Karur / Tamil Nadu rankings\n• **Organic Growth:** Sustainable leads without continuous ad spend.",
      quickLinks: [
        { text: "📈 SEO Service Details", url: "services.html" },
        { text: "💬 Request SEO Audit", url: "https://wa.me/919751205260?text=Hi%2C%20I%20want%20to%20improve%20my%20website%20Google%20ranking." }
      ]
    },
    {
      keywords: ["social media", "instagram", "facebook", "smm", "reels", "posts", "followers", "meta"],
      response: "📱 **Social Media Marketing (SMM):**\n\nBuild a commanding presence and engage your followers across Instagram, Facebook, and LinkedIn!\n\n• Creative daily/weekly poster & carousel designs\n• Trending video reels & story scripts\n• Community management & engagement\n• Targeted paid social ad campaigns",
      quickLinks: [
        { text: "🎨 Branding & SMM", url: "services.html" },
        { text: "💬 View SMM Packages", url: "https://wa.me/919751205260?text=Hi%2C%20tell%20me%20about%20your%20social%20media%20marketing%20plans." }
      ]
    },
    {
      keywords: ["google ads", "ppc", "adwords", "paid ads", "cpc", "advertising", "roi"],
      response: "🎯 **Google Ads & PPC Management:**\n\nGet instant, high-quality customer enquiries with cost-efficient Google Ads management.\n\n• Search Ads targeting ready-to-buy customers\n• Negative keyword filtering to stop wasted budget\n• Continuous A/B testing and transparent ROI reporting\n• High conversion landing page optimization",
      quickLinks: [
        { text: "🚀 Launch Google Ads", url: "contact.html" },
        { text: "💬 Chat on WhatsApp", url: "https://wa.me/919751205260?text=Hi%2C%20I%20want%20to%20run%20Google%20Ads%20for%20my%20business." }
      ]
    },
    {
      keywords: ["logo", "branding", "graphic design", "identity", "brochure", "visiting card", "brand"],
      response: "✏️ **Logo & Brand Identity Design:**\n\nYour logo is the first impression of your company. We craft memorable, distinctive identities that stand out:\n\n• Modern vector logo marks and typography\n• Complete brand style guides & color palettes\n• Business cards, letterheads & marketing collateral\n• 100% original designs — never generic templates!",
      quickLinks: [
        { text: "🎨 Portfolio Concepts", url: "portfolio.html" },
        { text: "💬 Order Logo Design", url: "https://wa.me/919751205260?text=Hi%2C%20I%20need%20a%20new%20logo%20and%20branding%20design." }
      ]
    },
    {
      keywords: ["price", "pricing", "cost", "how much", "rate", "charges", "package", "quote", "fee", "budget", "evlo"],
      response: "💰 **Transparent & Flexible Pricing:**\n\nBecause every business has unique needs, we don't force rigid one-size-fits-all packages. We offer customized quotations tailored to your exact scope and budget!\n\n• **Websites:** Scalable packages from starter business pages to full e-commerce platforms.\n• **Digital Marketing:** Tailored monthly retainers focused on measurable returns.\n\nContact us for a **100% Free Consultation and transparent quotation** with no hidden fees!",
      quickLinks: [
        { text: "📝 Request Free Quote", url: "contact.html" },
        { text: "💬 Instant WhatsApp Quote", url: "https://wa.me/919751205260?text=Hi%2C%20can%20you%20share%20your%20pricing%20and%20packages%3F" }
      ]
    },
    {
      keywords: ["contact", "phone", "number", "call", "email", "whatsapp", "reach", "talk to human", "support"],
      response: "📞 **Get in Touch with Ziya Digital Solution:**\n\n• **Phone:** [+91 9751205260](tel:+919751205260)\n• **WhatsApp:** [+91 9751205260](https://wa.me/919751205260)\n• **Email:** [info@ziyadigitalsolution.com](mailto:info@ziyadigitalsolution.com)\n• **Working Hours:** Mon – Sat, 9:30 AM – 7:30 PM",
      quickLinks: [
        { text: "💬 Open WhatsApp Chat", url: "https://wa.me/919751205260?text=Hello%20Ziya%20Team%2C%20I%20would%20like%20to%20discuss%20a%20project." },
        { text: "📝 Contact Form", url: "contact.html" }
      ]
    },
    {
      keywords: ["address", "location", "office", "where", "karur", "senguthapuram", "kongu mandapam", "tamil nadu", "map", "enga"],
      response: "📍 **Our Office Location:**\n\n**Ziya Digital Solution**\nNear Chinna Kongu Mandapam, Senguthapuram,\nKarur, Tamil Nadu 639002, India.\n\nWe gladly welcome local clients for in-person project meetings, as well as serve clients worldwide remotely!",
      quickLinks: [
        { text: "🗺️ View Contact Details", url: "contact.html" },
        { text: "📞 Call For Directions", url: "tel:+919751205260" }
      ]
    },
    {
      keywords: ["portfolio", "projects", "work", "clients", "case studies", "examples", "sample"],
      response: "🌟 **Our Portfolio & Track Record:**\n\nWe have proudly delivered:\n• **50+** High-Converting Websites Built\n• **99%** Client Satisfaction Rate\n• **10x** Measurable Growth Potential for Partner Businesses\n\nExplore our featured concepts across Web Design, Marketing Campaigns, and Brand Identity!",
      quickLinks: [
        { text: "🖼️ View Full Portfolio", url: "portfolio.html" },
        { text: "💬 Ask for Sample Works", url: "https://wa.me/919751205260?text=Hi%2C%20can%20you%20share%20some%20samples%20of%20your%20recent%20work%3F" }
      ]
    },
    {
      keywords: ["process", "timeline", "how long", "how it works", "duration", "steps", "workflow"],
      response: "⚙️ **Our 4-Step Working Process:**\n\n1. **Understand:** We listen to your goals, audience, and challenges.\n2. **Plan:** We outline a clear roadmap with deliverables and honest timelines.\n3. **Create:** We design, code, and test, sharing live milestone previews with you.\n4. **Optimise:** We launch and continuously refine based on real data.\n\nMost business website projects take **7 to 14 days** depending on requirements!",
      quickLinks: [
        { text: "🚀 Start Your Project", url: "contact.html" },
        { text: "💬 Discuss Timeline on WhatsApp", url: "https://wa.me/919751205260?text=Hi%2C%20how%20fast%20can%20you%20build%20my%20website%3F" }
      ]
    },
    {
      keywords: ["thanks", "thank you", "nandri", "great", "awesome", "perfect", "good", "bye", "ok"],
      response: "You're very welcome! 😊 We are excited to help your business achieve digital growth. Feel free to ask anything else, or connect directly with our team anytime!",
      quickLinks: [
        { text: "💬 Chat on WhatsApp", url: "https://wa.me/919751205260?text=Hi%20Ziya%20Team!" },
        { text: "📞 Call Us", url: "tel:+919751205260" }
      ]
    }
  ];

  /* ---------- Fallback Response Generator ---------- */
  function getFallbackResponse(query) {
    var encodedQuery = encodeURIComponent("Hi Ziya Digital Solution, I have a question about: " + query);
    return {
      response: "That's a great question! For detailed requirements or specific custom inquiries, our senior digital specialist can give you direct recommendations:\n\nWould you like to speak directly with our team or receive a free callback?",
      quickLinks: [
        { text: "💬 Ask on WhatsApp", url: "https://wa.me/919751205260?text=" + encodedQuery },
        { text: "📞 Call +91 9751205260", url: "tel:+919751205260" },
        { text: "📝 Send Enquiry Form", url: "contact.html" }
      ]
    };
  }

  /* ---------- Smart NLP Matcher ---------- */
  function findAnswer(userText) {
    var clean = userText.toLowerCase().trim();

    // Check direct keyword match
    var bestMatch = null;
    var highestScore = 0;

    for (var i = 0; i < KNOWLEDGE_BASE.length; i++) {
      var item = KNOWLEDGE_BASE[i];
      var score = 0;

      for (var k = 0; k < item.keywords.length; k++) {
        var kw = item.keywords[k].toLowerCase();
        if (clean === kw) {
          score += 10;
        } else if (clean.indexOf(kw) !== -1) {
          score += kw.length;
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (highestScore > 0 && bestMatch) {
      return bestMatch;
    }

    return getFallbackResponse(userText);
  }

  /* ---------- DOM Widget Builder ---------- */
  function createWidgetDOM() {
    var widget = document.createElement("div");
    widget.className = "ziya-chat-widget";
    widget.id = "ziyaChatWidget";

    widget.innerHTML =
      '<!-- Callout Bubble -->' +
      '<div class="ziya-chat-callout" id="ziyaChatCallout" role="alert">' +
      '  <button class="ziya-chat-callout-close" id="ziyaCalloutClose" aria-label="Close message">×</button>' +
      '  <strong>👋 Chat with Ziya AI!</strong>' +
      '  <span>Ask questions about websites, SEO, ads, or pricing anytime.</span>' +
      '</div>' +
      '<!-- Launcher Button -->' +
      '<button class="ziya-chat-launcher" id="ziyaChatLauncher" aria-label="Open AI live chat" aria-expanded="false">' +
      '  <div class="launcher-icon-chat">' +
      '    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>' +
      '    </svg>' +
      '  </div>' +
      '  <div class="launcher-icon-close">✕</div>' +
      '  <span class="ziya-launcher-badge" aria-hidden="true"></span>' +
      '</button>' +
      '<!-- Chat Window Box -->' +
      '<div class="ziya-chat-box" id="ziyaChatBox" role="dialog" aria-label="Ziya AI Assistant" aria-modal="false">' +
      '  <!-- Header -->' +
      '  <div class="ziya-chat-header">' +
      '    <div class="ziya-chat-header-info">' +
      '      <div class="ziya-chat-avatar">' +
      '        <img src="assets/images/logo.png" alt="Ziya AI Avatar" onerror="this.src=\'assets/images/logo.jpeg\'" />' +
      '        <span class="ziya-chat-avatar-dot" aria-hidden="true"></span>' +
      '      </div>' +
      '      <div class="ziya-chat-title-group">' +
      '        <h3>Ziya <span>AI</span></h3>' +
      '        <div class="ziya-chat-subtitle">' +
      '          <span class="ziya-chat-subtitle-dot" aria-hidden="true"></span> Online • Instant Answers' +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '    <div class="ziya-chat-header-actions">' +
      '      <button class="ziya-chat-action-btn" id="ziyaChatReset" title="Restart conversation" aria-label="Restart chat">🔄</button>' +
      '      <button class="ziya-chat-action-btn" id="ziyaChatClose" title="Close chat" aria-label="Close chat">✕</button>' +
      '    </div>' +
      '  </div>' +
      '  <!-- Quick Suggestions Bar -->' +
      '  <div class="ziya-chat-quick-prompts" id="ziyaQuickPrompts">' +
      '    <button class="ziya-quick-chip" data-query="What services do you provide?">🛠️ Services</button>' +
      '    <button class="ziya-quick-chip" data-query="How much for a new website?">💰 Website Pricing</button>' +
      '    <button class="ziya-quick-chip" data-query="How can you help my business with SEO?">🔍 Google SEO</button>' +
      '    <button class="ziya-quick-chip" data-query="Show me your portfolio and previous works">💼 Portfolio</button>' +
      '    <button class="ziya-quick-chip" data-query="Where is your Karur office located?">📍 Location</button>' +
      '    <button class="ziya-quick-chip" data-query="I want to contact your team directly">📞 Contact Team</button>' +
      '  </div>' +
      '  <!-- Messages Area -->' +
      '  <div class="ziya-chat-messages" id="ziyaChatMessages" role="log" aria-live="polite"></div>' +
      '  <!-- Input Area -->' +
      '  <form class="ziya-chat-input-area" id="ziyaChatForm">' +
      '    <input type="text" class="ziya-chat-input" id="ziyaChatInput" placeholder="Ask about websites, SEO, pricing..." autocomplete="off" aria-label="Chat input" />' +
      '    <button type="submit" class="ziya-chat-send-btn" id="ziyaChatSend" aria-label="Send message">' +
      '      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
      '        <line x1="22" y1="2" x2="11" y2="13"></line>' +
      '        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>' +
      '      </svg>' +
      '    </button>' +
      '  </form>' +
      '</div>';

    document.body.appendChild(widget);
  }

  /* ---------- Chat UI Manager ---------- */
  function initChatbot() {
    createWidgetDOM();

    var widget       = document.getElementById("ziyaChatWidget");
    var launcher     = document.getElementById("ziyaChatLauncher");
    var callout      = document.getElementById("ziyaChatCallout");
    var calloutClose = document.getElementById("ziyaCalloutClose");
    var closeBtn     = document.getElementById("ziyaChatClose");
    var resetBtn     = document.getElementById("ziyaChatReset");
    var messagesEl   = document.getElementById("ziyaChatMessages");
    var formEl       = document.getElementById("ziyaChatForm");
    var inputEl      = document.getElementById("ziyaChatInput");
    var quickPrompts = document.getElementById("ziyaQuickPrompts");

    // Show initial callout after 3.5 seconds if user hasn't opened chat yet
    var calloutDismissed = sessionStorage.getItem("ziya_callout_dismissed") === "true";
    if (!calloutDismissed) {
      setTimeout(function () {
        if (!widget.classList.contains("open")) {
          callout.classList.add("show");
        }
      }, 3500);
    }

    calloutClose.addEventListener("click", function (e) {
      e.stopPropagation();
      callout.classList.remove("show");
      sessionStorage.setItem("ziya_callout_dismissed", "true");
    });

    // Toggle Chat
    function toggleChat(forceOpen) {
      var isOpen = widget.classList.contains("open");
      var willOpen = forceOpen !== undefined ? forceOpen : !isOpen;

      if (willOpen) {
        widget.classList.add("open");
        launcher.setAttribute("aria-expanded", "true");
        callout.classList.remove("show");
        sessionStorage.setItem("ziya_callout_dismissed", "true");
        setTimeout(function () { inputEl.focus(); }, 200);
      } else {
        widget.classList.remove("open");
        launcher.setAttribute("aria-expanded", "false");
      }
    }

    launcher.addEventListener("click", function () {
      toggleChat();
    });

    closeBtn.addEventListener("click", function () {
      toggleChat(false);
    });

    // Escape key closes chat
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && widget.classList.contains("open")) {
        toggleChat(false);
      }
    });

    // Format Markdown Helper (bold, bullet points, links)
    function formatMessageText(text) {
      var html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Links: [Text](url)
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#D9A21B; text-decoration:underline; font-weight:600;">$1</a>');

      // Bold: **text**
      html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

      // Bullets: \n• or \n-
      html = html.replace(/\n• /g, '<br>• ');
      html = html.replace(/\n- /g, '<br>• ');

      // Newlines
      html = html.replace(/\n/g, '<br>');

      return html;
    }

    function getCurrentTime() {
      var now = new Date();
      var hours = now.getHours();
      var minutes = now.getMinutes();
      var ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return hours + ":" + (minutes < 10 ? "0" : "") + minutes + " " + ampm;
    }

    // Append Message to UI
    function appendMessage(sender, text, quickLinks) {
      var msgDiv = document.createElement("div");
      msgDiv.className = "ziya-chat-msg " + sender;

      var avatar = document.createElement("div");
      avatar.className = "ziya-chat-msg-avatar";
      avatar.innerHTML = sender === "bot" ? "✨" : "👤";

      var bubble = document.createElement("div");
      bubble.className = "ziya-chat-msg-bubble";

      var content = document.createElement("div");
      content.innerHTML = formatMessageText(text);
      bubble.appendChild(content);

      // Action links if provided
      if (quickLinks && quickLinks.length > 0) {
        var linksContainer = document.createElement("div");
        linksContainer.className = "ziya-chat-action-links";

        quickLinks.forEach(function (link) {
          var btn = document.createElement("a");
          btn.className = "ziya-chat-link-btn" + (link.url && link.url.indexOf("wa.me") !== -1 ? " btn-wa" : "");
          btn.textContent = link.text;

          if (link.url) {
            btn.href = link.url;
            if (link.url.indexOf("http") === 0) {
              btn.target = "_blank";
              btn.rel = "noopener";
            }
          } else if (link.query) {
            btn.href = "#";
            btn.addEventListener("click", function (e) {
              e.preventDefault();
              handleUserInput(link.query);
            });
          }

          linksContainer.appendChild(btn);
        });

        bubble.appendChild(linksContainer);
      }

      var timeSpan = document.createElement("span");
      timeSpan.className = "ziya-chat-msg-time";
      timeSpan.textContent = getCurrentTime();
      bubble.appendChild(timeSpan);

      msgDiv.appendChild(avatar);
      msgDiv.appendChild(bubble);
      messagesEl.appendChild(msgDiv);

      // Scroll to bottom
      messagesEl.scrollTop = messagesEl.scrollHeight;

      saveHistory();
    }

    // Typing Indicator
    var typingIndicatorEl = null;

    function showTypingIndicator() {
      if (typingIndicatorEl) return;
      typingIndicatorEl = document.createElement("div");
      typingIndicatorEl.className = "ziya-chat-msg bot";
      typingIndicatorEl.id = "ziyaTypingIndicator";

      typingIndicatorEl.innerHTML =
        '<div class="ziya-chat-msg-avatar">✨</div>' +
        '<div class="ziya-chat-typing">' +
        '  <span class="ziya-typing-dot"></span>' +
        '  <span class="ziya-typing-dot"></span>' +
        '  <span class="ziya-typing-dot"></span>' +
        '</div>';

      messagesEl.appendChild(typingIndicatorEl);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function removeTypingIndicator() {
      if (typingIndicatorEl && typingIndicatorEl.parentNode) {
        typingIndicatorEl.parentNode.removeChild(typingIndicatorEl);
      }
      typingIndicatorEl = null;
    }

    // Process user input
    function handleUserInput(text) {
      if (!text || !text.trim()) return;
      var query = text.trim();

      // Show user message
      appendMessage("user", query);

      // Show typing indicator
      showTypingIndicator();

      // Realistic response delay (500 - 900ms)
      var delay = Math.floor(Math.random() * 400) + 500;

      setTimeout(function () {
        removeTypingIndicator();
        var match = findAnswer(query);
        appendMessage("bot", match.response, match.quickLinks);
      }, delay);
    }

    // Form submit
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      var text = inputEl.value;
      inputEl.value = "";
      handleUserInput(text);
    });

    // Quick Prompt Chips
    quickPrompts.addEventListener("click", function (e) {
      var chip = e.target.closest(".ziya-quick-chip");
      if (!chip) return;
      var query = chip.getAttribute("data-query");
      if (query) {
        toggleChat(true);
        handleUserInput(query);
      }
    });

    // Reset Chat
    resetBtn.addEventListener("click", function () {
      if (confirm("Restart this conversation?")) {
        sessionStorage.removeItem("ziya_chat_history");
        messagesEl.innerHTML = "";
        loadInitialGreeting();
      }
    });

    // History Storage
    function saveHistory() {
      try {
        sessionStorage.setItem("ziya_chat_history", messagesEl.innerHTML);
      } catch (err) {
        // quota or private mode
      }
    }

    function loadInitialGreeting() {
      var saved = sessionStorage.getItem("ziya_chat_history");
      if (saved && saved.trim()) {
        messagesEl.innerHTML = saved;
        messagesEl.scrollTop = messagesEl.scrollHeight;
      } else {
        appendMessage(
          "bot",
          "Hello! 👋 I'm **Ziya AI**, your digital marketing & website advisor at **Ziya Digital Solution**.\n\nHow can I help you grow your business online today? Feel free to ask about our web design services, Google SEO, ads, or pricing!",
          [
            { text: "🌐 Website Pricing", query: "What are your website packages and pricing?" },
            { text: "📈 Digital Marketing", query: "Tell me about your digital marketing services" },
            { text: "💬 WhatsApp Team", url: "https://wa.me/919751205260?text=Hello%20Ziya%20Digital%20Solution%2C%20I%20would%20like%20to%20enquire%20about%20your%20services." }
          ]
        );
      }
    }

    loadInitialGreeting();
  }

  // Initialize once DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initChatbot);
  } else {
    initChatbot();
  }
})();
