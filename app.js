const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const root = document.documentElement;

const filterButtons = document.querySelectorAll(".filter-button");
const projectCards = document.querySelectorAll(".project-card");
const emptyState = document.getElementById("empty-state");

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

const storageKeys = {
    theme: "portfolio-theme",
    filter: "portfolio-project-filter"
};

function getSavedSetting(key, fallback) {
    try {
        return localStorage.getItem(key) || fallback;
    } catch {
        return fallback;
    }
}

function saveSetting(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch {
        // The website still works if storage is unavailable.
    }
}

// Theme toggle
function setTheme(theme) {
    const isLight = theme === "light";

    root.dataset.theme = isLight ? "light" : "dark";
    themeIcon.textContent = isLight ? "☾" : "☀";

    themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark theme" : "Switch to light theme"
    );

    themeToggle.setAttribute("aria-pressed", String(isLight));

    saveSetting(storageKeys.theme, theme);
}

const savedTheme = getSavedSetting(storageKeys.theme, "dark");

setTheme(savedTheme === "light" ? "light" : "dark");

themeToggle.addEventListener("click", () => {
    const currentTheme = root.dataset.theme;
    const nextTheme = currentTheme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
});

// Project filters
function filterProjects(category) {
    let visibleProjects = 0;

    projectCards.forEach((card) => {
        const matches =
            category === "all" || card.dataset.category === category;

        card.hidden = !matches;

        if (matches) {
            visibleProjects++;
        }
    });

    filterButtons.forEach((button) => {
        const isActive = button.dataset.filter === category;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });

    emptyState.hidden = visibleProjects > 0;

    saveSetting(storageKeys.filter, category);
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        filterProjects(button.dataset.filter);
    });
});

const savedFilter = getSavedSetting(storageKeys.filter, "all");

const validFilter = [...filterButtons].some(
    (button) => button.dataset.filter === savedFilter
);

filterProjects(validFilter ? savedFilter : "all");

// Current year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form validation
function setFieldError(field, message) {
    const errorElement = document.getElementById(`${field.id}-error`);

    errorElement.textContent = message;
    field.setAttribute("aria-invalid", String(Boolean(message)));
}

function validateField(field) {
    const value = field.value.trim();
    let message = "";

    if (!value) {
        message = "This field is required.";
    } else if (
        field.name === "name" &&
        (value.length < 2 || value.length > 80)
    ) {
        message = "Name must contain between 2 and 80 characters.";
    } else if (
        field.name === "email" &&
        (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
            value.length > 254)
    ) {
        message = "Enter a valid email address.";
    } else if (
        field.name === "message" &&
        (value.length < 10 || value.length > 2000)
    ) {
        message = "Message must contain between 10 and 2000 characters.";
    }

    setFieldError(field, message);

    return message === "";
}

const formFields = [
    document.getElementById("name"),
    document.getElementById("email"),
    document.getElementById("message")
];

formFields.forEach((field) => {
    field.addEventListener("input", () => {
        validateField(field);
        formStatus.textContent = "";
        formStatus.className = "form-status";
    });
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const results = formFields.map(validateField);
    const isValid = results.every(Boolean);

    if (!isValid) {
        formStatus.textContent =
            "Please correct the errors before continuing.";
        formStatus.className = "form-status error";

        const firstInvalidField = formFields.find(
            (field) => field.getAttribute("aria-invalid") === "true"
        );

        firstInvalidField?.focus();
        return;
    }

    formStatus.textContent =
        "Validation successful! This demo does not send messages to a server.";
    formStatus.className = "form-status success";
});