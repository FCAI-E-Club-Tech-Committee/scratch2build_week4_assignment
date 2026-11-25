
const root = document.documentElement;

const darkMode = {
    modeName: "dark",
    background: "#1F1F1F",
    text: "#dedede",
    link: "#569CD6",
    iconPath: "data/dark.svg"
};

const lightMode = {
    modeName: "light",
    background: "#dedede",
    text: "#1F1F1F",
    link: "blue",
    iconPath: "data/light.svg"
};

const modeIcon = document.querySelector("#mode");

const navLinks = document.querySelector("#nav-links");
const navElements = document.querySelectorAll("#nav-links > li");

const main = document.querySelector("main");

const contactForm = document.querySelector('#contact-form');
//===================================================================
//================= Get Stored data in local storage ================
//===================================================================

const theme = localStorage.getItem('theme');
if (theme === 'dark') {
    modeIcon.dataset.mode = 'dark';
    modeIcon.setAttribute('src', 'data/dark.svg');
    
    root.style.setProperty('--background-color', darkColor);
    root.style.setProperty('--text-color', lightColor);
}

const currentSection = localStorage.getItem('currentSection');
if (currentSection) {
    main.dataset.activeSection = currentSection;

    for (let i = 0; i < navElements.length; i++) {
        if (navElements[i].dataset.section === currentSection) {
            navElements[i].dataset.current = 'true';
        }
        else {
            navElements[i].dataset.current = 'false';
        }
    }
}

//===================================================================
//================== Event Listeners ================================
//===================================================================

modeIcon.addEventListener('click', () => {
    const nextMode = modeIcon.dataset.mode === 'light' ? darkMode : lightMode;

    modeIcon.dataset.mode = nextMode.modeName;
    modeIcon.setAttribute('src', nextMode.iconPath);
    
    root.style.setProperty('--background-color', nextMode.background);
    root.style.setProperty('--text-color', nextMode.text);
    root.style.setProperty('--link-color', nextMode.link);

    localStorage.setItem('theme', nextMode.modeName);
    
});

navLinks.addEventListener('click', (event) => {
    const current = event.target.dataset.section;
    main.dataset.activeSection = current;

    for (let i = 0; i < navElements.length; i++) {
        navElements[i].dataset.current = 'false';
    }
    event.target.dataset.current = 'true';

    localStorage.setItem("currentSection", current);
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
});
