const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");

function applyThemeLabel(theme) {
  if (!themeToggle) return;
  themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
  );
}

function setTheme(theme) {
  root.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    /* storage can be unavailable in private mode */
  }
  applyThemeLabel(theme);
}

applyThemeLabel(root.dataset.theme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark");
  });

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", (event) => {
    try {
      if (!localStorage.getItem("theme")) {
        root.dataset.theme = event.matches ? "dark" : "light";
        applyThemeLabel(root.dataset.theme);
      }
    } catch (error) {
      root.dataset.theme = event.matches ? "dark" : "light";
      applyThemeLabel(root.dataset.theme);
    }
  });
}

/* Last updated stamp: resolved at runtime instead of being hardcoded */
const lastUpdated = document.querySelector("#last-updated");

if (lastUpdated) {
  const REPO = "vsmutok/FuckCaptcha";

  const stamp = (date) => {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) return;
    lastUpdated.dateTime = date.toISOString().slice(0, 10);
    lastUpdated.textContent = date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    lastUpdated.title = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  /* Immediate fallback: the page's own Last-Modified date. */
  stamp(new Date(document.lastModified));

  /* Preferred source: the date of the latest commit in the repository. */
  fetch(`https://api.github.com/repos/${REPO}/commits?per_page=1`, {
    headers: { Accept: "application/vnd.github+json" },
  })
    .then((response) => (response.ok ? response.json() : Promise.reject(response.status)))
    .then((commits) => {
      const committed = commits && commits[0] && commits[0].commit.committer.date;
      if (committed) stamp(new Date(committed));
    })
    .catch(() => {
      /* offline or rate limited: keep the Last-Modified fallback */
    });
}

/* Library page: search + filters (only present on index.html) */
const searchInput = document.querySelector("#captcha-search");
const cards = Array.from(document.querySelectorAll(".card"));
const filters = Array.from(document.querySelectorAll(".filter"));
const count = document.querySelector("#result-count");
const empty = document.querySelector("#empty-state");
const resetButton = document.querySelector("#reset-filters");

if (searchInput && cards.length && filters.length) {
  let activeFilter = "all";

  const normalize = (value) => value.toLowerCase().normalize("NFKD");

  const applyFilters = () => {
    const query = normalize(searchInput.value.trim());
    let visible = 0;

    cards.forEach((card) => {
      const tags = card.dataset.tags.split(" ");
      const haystack = normalize(card.dataset.search);
      const matchesFilter = activeFilter === "all" || tags.includes(activeFilter);
      const matchesQuery = !query || haystack.includes(query);
      const show = matchesFilter && matchesQuery;

      card.hidden = !show;
      if (show) visible += 1;
    });

    if (count) count.textContent = `${visible} / ${cards.length}`;
    if (empty) empty.hidden = visible !== 0;
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filters.forEach((item) => {
        item.setAttribute("aria-pressed", item === button ? "true" : "false");
      });
      applyFilters();
    });
  });

  searchInput.addEventListener("input", applyFilters);

  if (resetButton) {
    resetButton.addEventListener("click", () => {
      searchInput.value = "";
      filters[0].click();
      searchInput.focus();
    });
  }

  document.addEventListener("keydown", (event) => {
    const target = event.target;
    const isTyping =
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement ||
      target instanceof HTMLSelectElement ||
      target.isContentEditable;

    if (event.key === "/" && !isTyping) {
      event.preventDefault();
      searchInput.focus();
    }

    if (event.key === "Escape" && document.activeElement === searchInput) {
      searchInput.value = "";
      applyFilters();
      searchInput.blur();
    }
  });

  applyFilters();
}
