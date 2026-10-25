// Greeting by time of day
const greeting = document.getElementById("greeting");
const hour = new Date().getHours();
let timeGreeting = "Good evening";
if (hour < 12) {
  timeGreeting = "Good morning";
} else if (hour < 18) {
  timeGreeting = "Good afternoon";
}
greeting.textContent = timeGreeting + ", I'm Abdulaziz";

// Dark/light theme toggle (remembered in localStorage)
const toggle = document.getElementById("theme-toggle");

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  toggle.textContent = theme === "dark" ? "Light" : "Dark";
}

applyTheme(localStorage.getItem("theme") || "light");

toggle.addEventListener("click", function () {
  const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
});

// Project filter buttons + live search
const searchInput = document.getElementById("project-search");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".projects .card");
const projectsEmpty = document.getElementById("projects-empty");
let activeFilter = "all";

// Show only the cards that match both the active filter and the search text
function updateProjects() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  projectCards.forEach(function (card) {
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = card.textContent.toLowerCase().includes(query);
    card.hidden = !(matchesFilter && matchesSearch);
    if (!card.hidden) {
      visibleCount++;
    }
  });

  projectsEmpty.hidden = visibleCount > 0;
}

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(function (other) {
      other.setAttribute("aria-pressed", other === button ? "true" : "false");
    });
    updateProjects();
  });
});

searchInput.addEventListener("input", updateProjects);

// Contact form validation (no backend)
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in all fields.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    formStatus.textContent = "Please enter a valid email address.";
  } else {
    formStatus.textContent = "Thanks, " + name + "! Your message was received.";
    form.reset();
  }
});
