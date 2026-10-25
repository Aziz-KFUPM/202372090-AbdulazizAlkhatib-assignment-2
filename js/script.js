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

// Latest GitHub repositories (public API)
const reposStatus = document.getElementById("repos-status");
const reposList = document.getElementById("repos-list");
const reposRetry = document.getElementById("repos-retry");
const reposUrl = "https://api.github.com/users/Aziz-KFUPM/repos?sort=updated&per_page=6";

function showReposMessage(text, type) {
  reposStatus.textContent = text;
  reposStatus.className = type;
}

// Build one list item. textContent (not innerHTML) keeps API text from being read as HTML.
function createRepoItem(repo) {
  const item = document.createElement("li");
  item.className = "repo";

  const link = document.createElement("a");
  link.href = repo.html_url;
  link.textContent = repo.name;
  link.target = "_blank";
  link.rel = "noopener";

  const description = document.createElement("p");
  description.textContent = repo.description || "No description yet.";

  const details = document.createElement("small");
  const updated = new Date(repo.updated_at).toLocaleDateString();
  details.textContent = (repo.language ? repo.language + " · " : "") + "Updated " + updated;

  item.append(link, description, details);
  return item;
}

async function loadRepos() {
  showReposMessage("Loading repositories...", "loading");
  reposRetry.hidden = true;
  reposList.textContent = "";

  try {
    const response = await fetch(reposUrl);
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    const repos = await response.json();

    if (repos.length === 0) {
      showReposMessage("No public repositories yet. Check back soon!", "");
      return;
    }

    repos.forEach(function (repo) {
      reposList.appendChild(createRepoItem(repo));
    });
    showReposMessage("", "");
  } catch (error) {
    // 403/429 mean GitHub's hourly limit for visitors without a login was reached
    const limited = error.message === "HTTP 403" || error.message === "HTTP 429";
    const reason = limited
      ? "GitHub's request limit was reached. Wait a few minutes"
      : "Couldn't load repositories right now. Check your internet connection";
    showReposMessage(reason + ", then click Try again.", "error");
    reposRetry.hidden = false;
  }
}

reposRetry.addEventListener("click", loadRepos);
loadRepos();

// Contact form validation (no backend)
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

// Return the error message for one field, or "" if its value is fine
function getError(field) {
  const value = field.value.trim();
  if (field.name === "name" && value.length < 2) {
    return "Please enter your name (at least 2 characters).";
  }
  if (field.name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "Please enter a valid email, like name@example.com.";
  }
  if (field.name === "message" && value.length < 10) {
    return "Please write a message of at least 10 characters.";
  }
  return "";
}

// Show the message under the field (or clear it) and mark the field for screen readers
function showError(field, message) {
  document.getElementById(field.id + "-error").textContent = message;
  field.setAttribute("aria-invalid", message ? "true" : "false");
}

function showFormStatus(text, type) {
  formStatus.textContent = text;
  formStatus.className = "";
  void formStatus.offsetWidth; // forces a reflow so the slide-in animation plays again
  formStatus.className = type;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let firstInvalid = null;

  [form.elements.name, form.elements.email, form.elements.message].forEach(function (field) {
    const message = getError(field);
    showError(field, message);
    if (message && !firstInvalid) {
      firstInvalid = field;
    }
  });

  if (firstInvalid) {
    showFormStatus("Please fix the highlighted fields and try again.", "error");
    firstInvalid.focus();
    return;
  }

  showFormStatus("Thanks, " + form.elements.name.value.trim() + "! Your message was received.", "success");
  form.reset();
});

// While typing, update the error of a field that is already marked invalid
form.addEventListener("input", function (event) {
  if (event.target.getAttribute("aria-invalid") === "true") {
    showError(event.target, getError(event.target));
  }
});
