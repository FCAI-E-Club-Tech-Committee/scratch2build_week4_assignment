# Scratch2Build Interactive Portfolio

A responsive personal portfolio built with semantic HTML5, CSS3 (Grid & Flexbox), and modern ES6+ JavaScript, featuring theme persistence and category filtering via `localStorage`, along with client-side contact form validation.

## ✨ Features

- **Semantic HTML5 Layout:** Structured using `<header>`, `<nav>`, `<main>`, `<section>`, and `<footer>` landmarks with accessible labels and clean hierarchy.
- **Responsive Design:** Built with CSS Grid and Flexbox to adapt smoothly across desktop and mobile viewports with zero horizontal overflow.
- **Dark / Light Theme Toggle:** Switches between light and dark CSS custom properties and saves the selected theme in `localStorage`.
- **Persistent Project Category Filter:** Filters project cards by category (`All`, `Web`, `C++ & Systems`, `Tools`) and remembers the active filter across reloads in `localStorage`.
- **Client-Side Form Validation:** Validates name, email format, and message length on submit using `event.preventDefault()`, displaying clear inline feedback and safe default fallbacks on first visit.

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (Custom Properties, Grid, Flexbox)
- **JavaScript (ES6+)** (`const`/`let`, DOM manipulation, event delegation, `localStorage` with `JSON.stringify` / `JSON.parse`)
- **Git & GitHub** (Feature branching, atomic commits, Pull Request workflow)

## 📁 Project Structure

```text
scratch2build-portfolio/
├── index.html                      # Page structure and semantic landmarks
├── styles.css                      # Styles, theme variables, and responsive layout
├── app.js                          # Interactivity, validation, and localStorage logic
├── README.md                       # Project documentation
└── .github/
    └── pull_request_template.md    # Pull Request template for contributors
```

## 🚀 Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/scratch2build-portfolio.git
   ```
2. Navigate into the project directory:
   ```bash
   cd scratch2build-portfolio
   ```
3. Open `index.html` in your browser (or serve it with a local static server such as VS Code Live Server).

## 🔀 Git Workflow

- `main` is protected and is never pushed to directly.
- Every feature or fix lives on its own `feature/*` branch (for example, `feature/interactive-portfolio-ui`) with small, descriptive, atomic commits.
- Changes are merged into `main` only through a Pull Request using `.github/pull_request_template.md`.

## 👤 Author

- **Contributor:** Ali Abdelhamid