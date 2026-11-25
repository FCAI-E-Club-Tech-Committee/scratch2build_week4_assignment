## 📌 Pull Request Information
 
**Assignment:** Week 4 Assignment & Milestone 1 - Git Hygiene & Pull Request Workflow
 
**Contributor** Name:Jana
 
**GitHub Username:** janaeldereny
 
**Branch Name:** `feature/page-structure`
 
## 🎯 What Does This PR Include?
 
Briefly describe the changes and implementations included in this Pull Request.

 
- Semantic HTML structure with header, nav, main, sections and footer
- Responsive layout in styles.css using CSS Grid and Flexbox
- Project cards section and contact form markup

## 🧠 Concept Comment (Required - 2 Sentences)
 
Answer in plain English: **why** did you make this engineering decision?
For example: *"Why did we protect `main` and merge via a feature branch?"* or *"How did we resolve any overlapping edits?"*
 
PRs missing this explanation will receive a **Changes Requested** tag.
1. I built the page structure on a separate feature branch so that `main` always stays in a clean, working state and I can review the changes in a Pull Request before they are merged.
2. I used semantic landmarks and Grid/Flexbox because they make the page easier to read for screen readers and let the layout adapt to mobile and desktop without horizontal overflow.

## 🛠️ Concepts Implemented
 
- [x] Semantic HTML Landmarks
- [x] Responsive CSS (Grid / Flexbox)
- [ ] DOM Selection and Manipulation
- [ ] Event Listeners
- [ ] Form Validation (`e.preventDefault()`)
- [ ] `localStorage` Persistence (`setItem`, `getItem`, `JSON.stringify`, `JSON.parse`)
- [ ] Defensive Null-Checking (safe defaults on first visit)
- [x] Git Feature Branching and Atomic Commits
- [ ] Project Documentation (README / PROPOSAL.md)
- [ ] Other: __________
## ✅ Checklist
 
- [x] I worked on a `feature/*` branch and did not push directly to `main`.
- [x] My commits are atomic and have descriptive messages (no vague "update" or "fix").
- [x] My code follows the required project structure.
- [x] I used `const` and `let` instead of `var`.
- [x] I avoided inline HTML event handlers.
- [x] I tested my implementation in the browser (mobile and desktop widths).
- [x] I checked the browser console for errors.
- [x] There are no leftover merge conflict markers in any file.
- [ ] I added or updated the README if necessary.
## 🧪 Testing
 
Describe how you tested your implementation.
- Opened index.html in the browser and checked the layout at desktop and phone widths in DevTools
- Confirmed there is no horizontal scrollbar
- Confirmed the console shows no errors

-
## 📸 Screenshots (If Applicable)
 
Add screenshots or screen recordings demonstrating your work.
 
## 📝 Additional Notes
 
Mention any challenges, improvements, or questions related to this submission.
 
