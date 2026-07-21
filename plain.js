const root = document.documentElement;
const toggle = document.querySelector("[data-theme-toggle]");
const themeColor = document.querySelector('meta[name="theme-color"]');

let savedTheme = null;

try {
  savedTheme = localStorage.getItem("theme");
} catch {
  // Theme persistence is optional.
}

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function applyTheme(theme) {
  const dark = theme === "dark";
  root.dataset.theme = theme;
  toggle?.setAttribute("aria-label", dark ? "Use light theme" : "Use dark theme");
  if (toggle) toggle.textContent = dark ? "light" : "dark";
  themeColor?.setAttribute("content", dark ? "#1c1c1a" : "#fbfaf7");
}

applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

toggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);

  try {
    localStorage.setItem("theme", nextTheme);
  } catch {
    // The page still works when storage is unavailable.
  }
});
