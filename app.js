const STORAGE_KEY = 'prefs';
const VALID_THEMES = ['light', 'dark'];
const VALID_FILTERS = ['all', 'web', 'game', 'creative'];

const defaultPrefs = { theme: 'light', filter: 'all' };

//1
function loadPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || defaultPrefs;
    return {
      theme: VALID_THEMES.includes(saved.theme) ? saved.theme : defaultPrefs.theme,
      filter: VALID_FILTERS.includes(saved.filter) ? saved.filter : defaultPrefs.filter,
    };
  } catch (err) {
    return { ...defaultPrefs };
  }
}

function savePrefs(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (err) {
    /* Storage can be full or blocked (private mode). The site still works, just without memory. */
  }
}

const prefs = loadPrefs();

//2
function applyTheme(theme) {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const label = document.getElementById('theme-label');
  const isDark = theme === 'dark';

  root.dataset.theme = theme;
  toggle.setAttribute('aria-pressed', String(isDark));
  icon.textContent = isDark ? '☀️' : '🌙';
  label.textContent = isDark ? 'Light' : 'Dark';
}

function initThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  applyTheme(prefs.theme);

  toggle.addEventListener('click', () => {
    prefs.theme = prefs.theme === 'dark' ? 'light' : 'dark';
    applyTheme(prefs.theme);
    savePrefs(prefs);
  });
}

//3 
function applyFilter(filter) {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.card');
  const status = document.getElementById('filter-status');
  let visible = 0;

  buttons.forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.filter === filter));
  });

  cards.forEach((card) => {
    const show = filter === 'all' || card.dataset.category === filter;
    card.hidden = !show;
    if (show) visible += 1;
  });

  status.textContent = `Showing ${visible} project${visible === 1 ? '' : 's'}`;
}

function initProjectFilter() {
  const filters = document.querySelector('.filters');
  applyFilter(prefs.filter);

  // Event delegation: one listener on the container instead of one per button
  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    prefs.filter = btn.dataset.filter;
    applyFilter(prefs.filter);
    savePrefs(prefs);
  });
}

//4
function initModal() {
  const modal = document.getElementById('project-modal');
  const title = document.getElementById('modal-title');
  const body = document.getElementById('modal-body');
  const closeBtn = document.getElementById('modal-close');
  const grid = document.querySelector('.card-grid');
  let lastTrigger = null;

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.details-btn');
    if (!btn) return;
    const card = btn.closest('.card');
    title.textContent = card.dataset.title;
    body.textContent = card.dataset.details;
    lastTrigger = btn;
    modal.showModal();
  });

  closeBtn.addEventListener('click', () => modal.close());

  // Clicking the dark backdrop (outside the dialog box) closes it
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });

  // Return focus to the button that opened the modal (accessibility)
  modal.addEventListener('close', () => {
    if (lastTrigger) lastTrigger.focus();
  });
}

//5
function setError(input, message) {
  const errorEl = document.getElementById(`${input.id}-error`);
  errorEl.textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validateForm(form) {
  const name = form.elements.name;
  const email = form.elements.email;
  const message = form.elements.message;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;

  if (name.value.trim().length < 2) {
    setError(name, 'Please enter your name (at least 2 characters).');
    valid = false;
  } else setError(name, '');

  if (!emailPattern.test(email.value.trim())) {
    setError(email, 'Please enter a valid email address.');
    valid = false;
  } else setError(email, '');

  if (message.value.trim().length < 10) {
    setError(message, 'Your message should be at least 10 characters.');
    valid = false;
  } else setError(message, '');

  return valid;
}

//6
function initContactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // stop the page from reloading
    status.textContent = '';

    if (validateForm(form)) {
      status.textContent = `Thanks, ${form.elements.name.value.trim()}! Your message is ready to send.`;
      form.reset();
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();
  initThemeToggle();
  initProjectFilter();
  initModal();
  initContactForm();
});