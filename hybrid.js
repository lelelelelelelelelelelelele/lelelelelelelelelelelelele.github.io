const root = document.documentElement;
const themeToggle = document.querySelector("[data-theme-toggle]");
const year = document.querySelector("[data-year]");
const header = document.querySelector("[data-header]");
const navLinks = [...document.querySelectorAll('[data-nav] a[href^="#"]')];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

let savedTheme = null;

try {
  savedTheme = localStorage.getItem("theme");
} catch {
  // Theme persistence is optional.
}

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeToggle?.setAttribute(
    "aria-label",
    theme === "dark" ? "Use light theme" : "Use dark theme",
  );
}

applyTheme(initialTheme);

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);

  try {
    localStorage.setItem("theme", nextTheme);
  } catch {
    // The page still works when storage is unavailable.
  }
});

const workTabList = document.querySelector("[data-work-tabs]");
const workTabs = [...document.querySelectorAll("[data-work-tab]")];
const workPanels = [...document.querySelectorAll("[data-work-panel]")];

function activateWorkTab(tab, { focus = false, updateUrl = false } = {}) {
  const view = tab?.dataset.workTab;
  const panel = workPanels.find((candidate) => candidate.dataset.workPanel === view);

  if (!view || !panel) return;

  workTabs.forEach((candidate) => {
    const active = candidate === tab;
    candidate.setAttribute("aria-selected", String(active));
    candidate.setAttribute("tabindex", active ? "0" : "-1");
  });

  workPanels.forEach((candidate) => {
    candidate.hidden = candidate !== panel;
  });

  if (focus) tab.focus();

  if (updateUrl && window.history?.replaceState) {
    const url = new URL(window.location.href);

    if (view === "academic") url.searchParams.delete("view");
    else url.searchParams.set("view", view);

    window.history.replaceState(null, "", url);
  }
}

if (workTabList && workTabs.length > 0 && workPanels.length === workTabs.length) {
  const requestedView = new URLSearchParams(window.location.search).get("view");
  const initialTab =
    workTabs.find((tab) => tab.dataset.workTab === requestedView) || workTabs[0];

  root.classList.add("work-tabs-ready");
  activateWorkTab(initialTab);

  workTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      activateWorkTab(tab, { updateUrl: true });
    });

    tab.addEventListener("keydown", (event) => {
      const currentIndex = workTabs.indexOf(tab);
      let nextIndex = null;

      if (event.key === "ArrowRight") nextIndex = (currentIndex + 1) % workTabs.length;
      if (event.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + workTabs.length) % workTabs.length;
      }
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = workTabs.length - 1;

      if (nextIndex === null) return;

      event.preventDefault();
      activateWorkTab(workTabs[nextIndex], { focus: true, updateUrl: true });
    });
  });
}

let navigationFrame = null;

function updateActiveNavigation() {
  navigationFrame = null;
  const marker = window.scrollY + (header?.offsetHeight || 0) + 48;
  let activeSection = null;

  sections.forEach((section) => {
    if (section.offsetTop <= marker) activeSection = section;
  });

  if (
    sections.length > 0 &&
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
  ) {
    activeSection = sections[sections.length - 1];
  }

  navLinks.forEach((link) => {
    const active = activeSection && link.getAttribute("href") === `#${activeSection.id}`;
    if (active) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
}

function scheduleNavigationUpdate() {
  if (navigationFrame !== null) return;
  navigationFrame = window.requestAnimationFrame(updateActiveNavigation);
}

window.addEventListener("scroll", scheduleNavigationUpdate, { passive: true });
window.addEventListener("resize", scheduleNavigationUpdate);
updateActiveNavigation();

if (year) year.textContent = String(new Date().getFullYear());
