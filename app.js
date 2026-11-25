const STORAGE_KEYS = {
  theme: "portfolio_theme_state_v1",
  category: "portfolio_active_category_v1"
};

const VALID_THEMES = ["light", "dark"];
const VALID_CATEGORIES = ["all", "web", "cpp", "tools"];

const htmlElement = document.documentElement;
const themeToggleBtn = document.getElementById("themeToggleBtn");
const categoryFiltersContainer = document.getElementById("categoryFilters");
const projectCards = Array.from(document.querySelectorAll(".project-card"));
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("senderName");
const emailInput = document.getElementById("senderEmail");
const messageInput = document.getElementById("senderMessage");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const formStatus = document.getElementById("formStatus");

function readStoredJson(key, fallbackValue) {
  try {
    const rawValue = window.localStorage.getItem(key);
    if (rawValue === null) {
      return fallbackValue;
    }
    return JSON.parse(rawValue);
  } catch (error) {
    return fallbackValue;
  }
}

function writeStoredJson(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // Ignore storage quota or private mode errors safely
  }
}

function applyTheme(theme) {
  const safeTheme = VALID_THEMES.includes(theme) ? theme : "light";
  htmlElement.setAttribute("data-theme", safeTheme);

  if (themeToggleBtn) {
    const isDark = safeTheme === "dark";
    themeToggleBtn.textContent = isDark ? "Light Mode" : "Dark Mode";
    themeToggleBtn.setAttribute("aria-pressed", String(isDark));
  }
}

function handleThemeToggle() {
  const currentTheme = htmlElement.getAttribute("data-theme");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  writeStoredJson(STORAGE_KEYS.theme, { theme: nextTheme });
}

function applyCategoryFilter(selectedCategory) {
  const safeCategory = VALID_CATEGORIES.includes(selectedCategory)
    ? selectedCategory
    : "all";

  if (categoryFiltersContainer) {
    const buttons = categoryFiltersContainer.querySelectorAll(".filter-btn");
    buttons.forEach((button) => {
      const buttonCategory = button.getAttribute("data-category");
      const isMatch = buttonCategory === safeCategory;
      button.classList.toggle("is-active", isMatch);
      button.setAttribute("aria-pressed", String(isMatch));
    });
  }

  projectCards.forEach((card) => {
    const cardCategory = card.getAttribute("data-category");
    const shouldShow = safeCategory === "all" || cardCategory === safeCategory;
    card.classList.toggle("is-hidden", !shouldShow);
  });
}

function handleCategoryClick(event) {
  const clickedButton = event.target.closest(".filter-btn");
  if (!clickedButton) {
    return;
  }
  const chosenCategory = clickedButton.getAttribute("data-category");
  applyCategoryFilter(chosenCategory);
  writeStoredJson(STORAGE_KEYS.category, { activeCategory: chosenCategory });
}

function clearValidationFeedback() {
  [nameInput, emailInput, messageInput].forEach((input) => {
    if (input) {
      input.classList.remove("is-invalid");
    }
  });
  [nameError, emailError, messageError].forEach((errorEl) => {
    if (errorEl) {
      errorEl.textContent = "";
    }
  });
  if (formStatus) {
    formStatus.textContent = "";
    formStatus.classList.remove("is-success", "is-error");
  }
}

function validateContactFields() {
  let isValid = true;
  const nameValue = nameInput ? nameInput.value.trim() : "";
  const emailValue = emailInput ? emailInput.value.trim() : "";
  const messageValue = messageInput ? messageInput.value.trim() : "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nameValue.length < 2) {
    if (nameInput) nameInput.classList.add("is-invalid");
    if (nameError) nameError.textContent = "Please enter your name (at least 2 characters).";
    isValid = false;
  }

  if (!emailPattern.test(emailValue)) {
    if (emailInput) emailInput.classList.add("is-invalid");
    if (emailError) emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }

  if (messageValue.length < 10) {
    if (messageInput) messageInput.classList.add("is-invalid");
    if (messageError) messageError.textContent = "Please enter a message of at least 10 characters.";
    isValid = false;
  }

  return isValid;
}

function handleFormSubmit(event) {
  event.preventDefault();
  clearValidationFeedback();

  if (!validateContactFields()) {
    if (formStatus) {
      formStatus.textContent = "Please fix the highlighted fields before submitting.";
      formStatus.classList.add("is-error");
    }
    return;
  }

  if (contactForm) {
    contactForm.reset();
  }

  if (formStatus) {
    formStatus.textContent = "Message validated successfully and ready to send.";
    formStatus.classList.add("is-success");
  }
}

function initApp() {
  const savedThemeObj = readStoredJson(STORAGE_KEYS.theme, { theme: "light" });
  const initialTheme = savedThemeObj && typeof savedThemeObj.theme === "string"
    ? savedThemeObj.theme
    : "light";
  applyTheme(initialTheme);

  const savedCategoryObj = readStoredJson(STORAGE_KEYS.category, { activeCategory: "all" });
  const initialCategory = savedCategoryObj && typeof savedCategoryObj.activeCategory === "string"
    ? savedCategoryObj.activeCategory
    : "all";
  applyCategoryFilter(initialCategory);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", handleThemeToggle);
  }

  if (categoryFiltersContainer) {
    categoryFiltersContainer.addEventListener("click", handleCategoryClick);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }
}

initApp();