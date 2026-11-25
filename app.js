// app.js
(() => {
  const STORAGE_KEY = "scratch2build_portfolio_prefs_v1";

  const DEFAULT_PREFS = {
    theme: "light",
    activeCategory: "all"
  };

  const PROJECT_DETAILS = {
    matakolnesh: {
      badge: "Game Dev • Unity & C#",
      title: "Matakolnesh (20-Level 2D Physics Platformer)",
      description:
        "A 2D ricochet physics platformer starring a Koshary plate hero armed with bouncing spoon projectiles.",
      highlights: [
        "Implemented mouse-aimed trajectory preview and multi-bounce collision physics.",
        "Built 20 handcrafted stages with star-based unlocking and custom 2D chibi UI sprites.",
        "Collaborated across GitHub feature branches for level design, SFX/BGM, and playtesting."
      ]
    },
    dashboard: {
      badge: "Web Dev • HTML & CSS",
      title: "Scratch2Build Personal Dashboard",
      description:
        "A responsive workspace dashboard designed with warm beige, brown, and purple tokens to organize daily engineering workflows.",
      highlights: [
        "Engineered with semantic HTML5 landmarks and CSS custom properties.",
        "Responsive Flexbox and Grid layouts tested across desktop and mobile viewports.",
        "Zero horizontal overflow and accessible keyboard navigation."
      ]
    },
    enemyai: {
      badge: "Game Dev • AI & Architecture",
      title: "2D Enemy AI & Crafting Prototype",
      description:
        "An interactive Unity prototype pairing dynamic pathfinding with modular state transitions and item crafting.",
      highlights: [
        "Integrated A* Pathfinding Project for real-time obstacle avoidance.",
        "Designed a 5-state Finite State Machine (Waiting, Angry, Chasing, Calming, Exiting).",
        "Used ScriptableObjects to define extensible cure recipes across three enemy archetypes."
      ]
    },
    vole: {
      badge: "Systems • Computer Architecture",
      title: "Vole Machine Simulator",
      description:
        "A low-level machine simulator executing Vole assembly instructions across simulated CPU registers and main memory.",
      highlights: [
        "Modeled 16 general-purpose registers, program counter, and 256-byte memory space.",
        "Implemented clean fetch-decode-execute instruction parsing and hex state inspection.",
        "Built collaboratively using GitHub pull requests and modular code reviews."
      ]
    }
  };

  // Defensive localStorage loader with null-checking and JSON parse protection
  function loadPreferences() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return { ...DEFAULT_PREFS };
      }
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") {
        return { ...DEFAULT_PREFS };
      }
      return {
        theme: parsed.theme === "dark" ? "dark" : "light",
        activeCategory: typeof parsed.activeCategory === "string" ? parsed.activeCategory : "all"
      };
    } catch {
      return { ...DEFAULT_PREFS };
    }
  }

  function savePreferences(prefs) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Fail gracefully if storage quota or privacy settings block writes
    }
  }

  const state = loadPreferences();

  // DOM References
  const themeToggleBtn = document.getElementById("theme-toggle");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const modal = document.getElementById("project-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const modalBadge = document.getElementById("modal-badge");
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");
  const modalHighlights = document.getElementById("modal-highlights");
  const contactForm = document.getElementById("contact-form");
  const yearSpan = document.getElementById("year");

  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  // 1. Theme Persistence
  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    if (themeToggleBtn) {
      themeToggleBtn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
      themeToggleBtn.setAttribute("aria-pressed", String(isDark));
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
      applyTheme(state.theme);
      savePreferences(state);
    });
  }

  // 2. Interactive Project Category Filter + Persistence
  function applyCategoryFilter(category) {
    const validCategories = ["all", "web", "gamedev", "systems"];
    const selected = validCategories.includes(category) ? category : "all";
    state.activeCategory = selected;

    filterButtons.forEach((btn) => {
      const isMatch = btn.dataset.filter === selected;
      btn.classList.toggle("active", isMatch);
      btn.setAttribute("aria-pressed", String(isMatch));
    });

    projectCards.forEach((card) => {
      const cardCat = card.dataset.category;
      const shouldShow = selected === "all" || cardCat === selected;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const chosen = btn.dataset.filter || "all";
      applyCategoryFilter(chosen);
      savePreferences(state);
    });
  });

  // 3. Project Details Modal Viewer
  function openProjectModal(projectKey) {
    const item = PROJECT_DETAILS[projectKey];
    if (!item || !modal) return;

    modalBadge.textContent = item.badge;
    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;

    modalHighlights.innerHTML = "";
    item.highlights.forEach((point) => {
      const li = document.createElement("li");
      li.textContent = point;
      modalHighlights.appendChild(li);
    });

    modal.hidden = false;
    closeModalBtn.focus();
  }

  function closeProjectModal() {
    if (modal) {
      modal.hidden = true;
    }
  }

  document.querySelectorAll(".open-modal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      openProjectModal(btn.dataset.project);
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeProjectModal);
  }

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal && !modal.hidden) {
      closeProjectModal();
    }
  });

  // 4. Validated Contact Form (e.preventDefault)
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = document.getElementById("sender-name");
      const emailInput = document.getElementById("sender-email");
      const messageInput = document.getElementById("sender-message");

      const nameError = document.getElementById("name-error");
      const emailError = document.getElementById("email-error");
      const messageError = document.getElementById("message-error");
      const formStatus = document.getElementById("form-status");

      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";
      formStatus.textContent = "";

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const messageVal = messageInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let isValid = true;

      if (nameVal.length < 2) {
        nameError.textContent = "Please enter at least 2 characters for your name.";
        isValid = false;
      }

      if (!emailRegex.test(emailVal)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
      }

      if (messageVal.length < 10) {
        messageError.textContent = "Message must be at least 10 characters long.";
        isValid = false;
      }

      if (!isValid) return;

      formStatus.textContent = `Thanks, ${nameVal}! Your message has been validated and logged.`;
      contactForm.reset();
    });
  }

  // Initialize saved UI state on load
  applyTheme(state.theme);
  applyCategoryFilter(state.activeCategory);
})();