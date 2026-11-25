const STORAGE_KEYS = {
  theme: "portfolio_theme",
  category: "portfolio_category"
};

const VALID_THEMES = new Set(["light", "dark"]);
const VALID_CATEGORIES = new Set(["all", "web", "ui", "tools"]);

function safeGetStorage(key) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`Could not read "${key}" from localStorage:`, err);
    return null;
  }
}

function safeSetStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Could not save "${key}" to localStorage:`, err);
  }
}

function applyTheme(theme) {
  const safeTheme = VALID_THEMES.has(theme) ? theme : "light";
  const rootEl = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");

  if (rootEl) {
    rootEl.setAttribute("data-theme", safeTheme);
  }

  if (toggleBtn) {
    const isDark = safeTheme === "dark";
    toggleBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
    toggleBtn.setAttribute("aria-pressed", String(isDark));
  }
}

function applyCategoryFilter(category) {
  const safeCategory = VALID_CATEGORIES.has(category) ? category : "all";
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    const btnCategory = btn.dataset.category;
    btn.classList.toggle("is-active", btnCategory === safeCategory);
  });

  projectCards.forEach((card) => {
    const cardCategory = card.dataset.category;
    const shouldShow = safeCategory === "all" || cardCategory === safeCategory;
    card.classList.toggle("is-hidden", !shouldShow);
  });
}

function initThemeToggle() {
  const toggleBtn = document.getElementById("theme-toggle");
  const savedTheme = safeGetStorage(STORAGE_KEYS.theme);
  applyTheme(savedTheme);

  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    safeSetStorage(STORAGE_KEYS.theme, nextTheme);
  });
}

function initCategoryFilter() {
  const filterGroup = document.querySelector(".filter-group");
  const savedCategory = safeGetStorage(STORAGE_KEYS.category);
  applyCategoryFilter(savedCategory);

  if (!filterGroup) return;

  filterGroup.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const button = target.closest(".filter-btn");
    if (!button) return;

    const selectedCategory = button.dataset.category;
    applyCategoryFilter(selectedCategory);
    safeSetStorage(STORAGE_KEYS.category, selectedCategory);
  });
}

function setFieldFeedback(inputEl, errorEl, message) {
  if (inputEl) {
    inputEl.classList.toggle("is-invalid", Boolean(message));
  }
  if (errorEl) {
    errorEl.textContent = message || "";
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const statusEl = document.getElementById("form-status");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameVal = nameInput ? nameInput.value.trim() : "";
    const emailVal = emailInput ? emailInput.value.trim() : "";
    const messageVal = messageInput ? messageInput.value.trim() : "";

    let hasErrors = false;

    if (!nameVal) {
      setFieldFeedback(nameInput, nameError, "Please enter your name.");
      hasErrors = true;
    } else {
      setFieldFeedback(nameInput, nameError, "");
    }

    if (!emailVal) {
      setFieldFeedback(emailInput, emailError, "Please enter your email address.");
      hasErrors = true;
    } else if (!isValidEmail(emailVal)) {
      setFieldFeedback(emailInput, emailError, "Please enter a valid email address.");
      hasErrors = true;
    } else {
      setFieldFeedback(emailInput, emailError, "");
    }

    if (!messageVal) {
      setFieldFeedback(messageInput, messageError, "Please enter a message.");
      hasErrors = true;
    } else if (messageVal.length < 10) {
      setFieldFeedback(messageInput, messageError, "Message should be at least 10 characters.");
      hasErrors = true;
    } else {
      setFieldFeedback(messageInput, messageError, "");
    }

    if (hasErrors) {
      if (statusEl) statusEl.textContent = "";
      return;
    }

    if (statusEl) {
      statusEl.textContent = `Thanks, ${nameVal}! Your message has been validated and prepared.`;
    }
    form.reset();
  });
}

function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initCategoryFilter();
  initContactForm();
  initFooterYear();
});