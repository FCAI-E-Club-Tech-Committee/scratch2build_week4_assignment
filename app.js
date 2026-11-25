const themeToggle = document.getElementById("theme-toggle");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
const contactForm = document.getElementById("contact-form");

const STORAGE_KEY = "portfolioPreferences";

function loadPreferences() {
    try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        return savedData ? JSON.parse(savedData) : {};
    } catch (error) {
        return {};
    }
}

function savePreferences() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (error) {
        // التخزين غير متاح، نتجاهل الخطأ
    }
}

const preferences = loadPreferences();

// Theme Toggle
function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark", isDark);
    if (themeToggle) {
        themeToggle.textContent = isDark ? "☀️" : "🌙";
    }
}

applyTheme(preferences.theme === "dark" ? "dark" : "light");

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
        preferences.theme = newTheme;
        applyTheme(newTheme);
        savePreferences();
    });
}

// Project Category Filter
function filterProjects(category, save = true) {
    projectCards.forEach((card) => {
        const matches = category === "all" || card.dataset.category === category;
        card.classList.toggle("hidden", !matches);
    });

    filterButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.category === category);
    });

    if (save) {
        preferences.category = category;
        savePreferences();
    }
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => filterProjects(button.dataset.category));
});

const validCategories = Array.from(filterButtons).map((b) => b.dataset.category);
const savedCategory = validCategories.includes(preferences.category)
    ? preferences.category
    : "all";

filterProjects(savedCategory, false); // من غير حفظ في التحميل الأول

// Contact Form Validation
if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const formStatus = document.getElementById("form-status");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        nameError.textContent = name ? "" : "Name is required.";
        emailError.textContent = emailPattern.test(email) ? "" : "Please enter a valid email.";
        messageError.textContent = message ? "" : "Message is required.";
        formStatus.textContent = "";

        if (name && emailPattern.test(email) && message) {
            formStatus.textContent = "Your form is valid! Thank you for contacting me.";
            contactForm.reset();
        }
    });
}