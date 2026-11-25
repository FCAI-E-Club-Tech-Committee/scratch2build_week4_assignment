## 📌 Pull Request Information

**Assignment:** Week 4 Assignment & Milestone 1 - Git Hygiene & Pull Request Workflow

**Contributor Name:** Malak Usama

**GitHub Username:** MalakUsama22

**Branch Name:** MalakUsama

## 🎯 What Does This PR Include?

- Semantic HTML page with header, nav, main, sections and footer
- Responsive layout using CSS Grid for the project cards and Flexbox for the header and filter buttons
- Dark / light theme toggle that is saved in localStorage
- Project category filter (All, C#, C++) that remembers the active category
- Contact form with client-side validation for name, email and message
- Pull request template in `.github/pull_request_template.md`

## 🧠 Concept Comment (Required - 2 Sentences)

1. I worked on a feature branch instead of pushing to `main` so that `main` always stays in a working state and my changes can be reviewed in a Pull Request before they are merged.
2. I used localStorage to save the theme and the selected category so the page remembers the visitor's choices after a refresh, and I used `e.preventDefault()` on the form so I could validate the inputs myself instead of the page reloading.

## 🛠️ Concepts Implemented

- [✅ ] Semantic HTML Landmarks
- [✅ ] Responsive CSS (Grid / Flexbox)
- [✅ ] DOM Selection and Manipulation
- [✅ ] Event Listeners
- [✅ ] Form Validation (`e.preventDefault()`)
- [ ] `localStorage` Persistence (`setItem`, `getItem`, `JSON.stringify`, `JSON.parse`)
- [✅ ] Defensive Null-Checking (safe defaults on first visit)
- [✅ ] Git Feature Branching and Atomic Commits
- [ ] Project Documentation (README / PROPOSAL.md)
- [ ] Other: __________

## ✅ Checklist

- [✅ ] I worked on a `feature/*` branch and did not push directly to `main`.
- [✅ ] My commits are atomic and have descriptive messages (no vague "update" or "fix").
- [✅ ] My code follows the required project structure.
- [✅ ] I used `const` and `let` instead of `var`.
- [✅ ] I avoided inline HTML event handlers.
- [✅ ] I tested my implementation in the browser (mobile and desktop widths).
- [✅ ] I checked the browser console for errors.
- [✅ ] There are no leftover merge conflict markers in any file.
- [ ] I added or updated the README if necessary.

## 🧪 Testing

- Opened `index.html` in the browser and checked the layout at desktop and mobile widths with DevTools (no horizontal scrolling).
- Clicked the theme toggle, refreshed the page, and confirmed the theme was remembered.
- Clicked each filter button, refreshed the page, and confirmed the active category was remembered.
- Submitted the contact form empty, with an invalid email and with a short message to check the error messages, then with valid input to check the success message.
- Checked the browser console for errors.

## 📸 Screenshots (If Applicable)


## 📝 Additional Notes

The project categories are C# and C++ because my projects are a Unity game in C# and two C++ projects.
