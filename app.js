const themeBtn = document.getElementById("theme-toggle");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

function filterProjects(category) {
  cards.forEach(function (card) {
    if (category === "all" || card.getAttribute("data-category") === category) {
      card.classList.remove("hidden");
    } else {
      card.classList.add("hidden");
    }
  });

  filterBtns.forEach(function (btn) {
    if (btn.getAttribute("data-category") === category) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  localStorage.setItem("category", category);
}

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    filterProjects(btn.getAttribute("data-category"));
  });
});

const savedCategory = localStorage.getItem("category") || "all";
filterProjects(savedCategory);

const form = document.getElementById("contact-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const success = document.getElementById("success");

  let valid = true;

  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  success.textContent = "";

  if (name === "") {
    nameError.textContent = "Please enter your name.";
    valid = false;
  }

  if (email === "" || !email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Please enter a valid email.";
    valid = false;
  }

  if (message.length < 10) {
    messageError.textContent = "Message must be at least 10 characters.";
    valid = false;
  }

  if (valid) {
    success.textContent = "Thanks! Your message was sent.";
    form.reset();
  }
});