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
