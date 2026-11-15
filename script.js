const themeToggle = document.querySelector(".theme-toggle");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const storageKey = "student-portfolio-theme";

let savedTheme;
try {
  savedTheme = window.localStorage.getItem(storageKey);
} catch {
  // The toggle still works when browser storage is unavailable.
}

let chosenTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : null;

function updateTheme() {
  const theme = chosenTheme ?? (systemTheme.matches ? "dark" : "light");
  document.documentElement.dataset.theme = theme;
  themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
}

themeToggle.addEventListener("click", () => {
  chosenTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  updateTheme();
  try {
    window.localStorage.setItem(storageKey, chosenTheme);
  } catch {
    // Keep the in-memory choice for this visit.
  }
});

systemTheme.addEventListener("change", updateTheme);
updateTheme();
themeToggle.hidden = false;
