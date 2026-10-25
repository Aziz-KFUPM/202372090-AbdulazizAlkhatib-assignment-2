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
