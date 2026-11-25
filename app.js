// app.js
const themeToggleButton = document.getElementById('Dark');
themeToggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
}
const searchForm = document.getElementById('search');
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const categoryInput = document.getElementById('category-input').value;
    const allProjects = document.querySelectorAll('article');
    if (categoryInput === 'All') {
        // Show all projects
        const allProjects = document.querySelectorAll('article');
        allProjects.forEach(project => {
            project.style.display = 'block';
        });
    }
    else if(categoryInput === 'Web Development'){   
        allProjects.forEach(project => {
            if (project.getAttribute('category') === 'Web Development') {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }
    else if(categoryInput === 'Data Science'){ 
        allProjects.forEach(project => {
            if (project.getAttribute('category') === 'Data Science') {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }
    else if(categoryInput === 'AI Engineering'){
        allProjects.forEach(project => {
            if (project.getAttribute('category') === 'AI Engineering') {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }
   
});

const addForm = document.getElementById('add-form');
const projectNameInput = document.getElementById('project-name');
const descriptionInput = document.getElementById('project-description');
const categoryInput = document.getElementById('categoryinput');
const projectsSection = document.querySelector('section.projects');

addForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const nameValue = projectNameInput.value.trim();
  const descriptionValue = descriptionInput.value.trim();
  const categoryValue = categoryInput.value.trim();

  const isNameValid = nameValue.length > 0;
  const isDescriptionValid = descriptionValue.length > 0;
  const isCategoryValid = categoryValue !== '';

  if (!isNameValid || !isDescriptionValid || !isCategoryValid) {
    alert('Please fill in project name, description, and choose a category.');
    return;
  }

  const article = document.createElement('article');
  article.dataset.category = categoryValue;

  const titleEl = document.createElement('strong');
  titleEl.textContent = nameValue;

  const descEl = document.createElement('p');
  descEl.textContent = `Description: ${descriptionValue}`;

  const fieldEl = document.createElement('p');
  fieldEl.textContent = `Field: ${categoryValue}`;

  article.append(titleEl, descEl, fieldEl);
  projectsSection.appendChild(article);

  addForm.reset();
});