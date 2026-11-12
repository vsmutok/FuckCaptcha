(function () {
  "use strict";

  const DOC_PATTERN = /^docs\/[A-Za-z0-9._/-]+\.md$/;
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("doc") || "docs/captchas/normal.md";
  const docPath =
    DOC_PATTERN.test(requested) && requested.indexOf("..") === -1 ? requested : null;

  const docEl = document.getElementById("doc");
  const statusEl = document.getElementById("doc-status");
  const crumbEl = document.getElementById("crumb-current");
  const sourceLink = document.getElementById("source-link");
  const copyLink = document.getElementById("copy-link");
  const tocList = document.getElementById("toc-list");
  const tocMobileList = document.getElementById("toc-mobile-list");

  const REPO = "https://github.com/vsmutok/FuckCaptcha";

  const escapeHtml = (value) =>
    value.replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[char]));

  function resolve(baseDir, href) {
    if (!href || /^(https?:|mailto:|tel:|data:|#|\/)/i.test(href)) return href;
    const stack = baseDir ? baseDir.split("/") : [];
    const parts = href.split("/");
    const out = stack.slice();
    for (const part of parts) {
      if (part === "" || part === ".") continue;
      if (part === "..") {
        out.pop();
        continue;
      }
      out.push(part);
    }
    return out.join("/");
  }

  function toGuideHref(resolved) {
    const hashIndex = resolved.indexOf("#");
    const path = hashIndex === -1 ? resolved : resolved.slice(0, hashIndex);
    const hash = hashIndex === -1 ? "" : resolved.slice(hashIndex);
    if (path.slice(-3) === ".md") {
      return "guide.html?doc=" + path + hash;
    }
    return resolved;
  }

  function showError(message, hint) {
    if (!docEl) return;
    docEl.innerHTML =
      '<div class="doc-status"><strong>' +
      escapeHtml(message) +
      "</strong>" +
      escapeHtml(hint || "") +
      ' <a href="' +
      REPO +
      '/tree/main/docs">Browse the docs on GitHub</a>.</div>';
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  const EMOJI_PREFIX = /^[\p{Extended_Pictographic}\uFE0F\u200D\s]+/u;
  const cleanLabel = (text) => text.replace(EMOJI_PREFIX, "").trim();

  /* The library on index.html is the single source of truth for titles,
     illustrations, categories and difficulty. */
  async function loadCatalog() {
    try {
      const response = await fetch("index.html", { cache: "no-cache" });
      if (!response.ok) return [];
      const page = new DOMParser().parseFromString(await response.text(), "text/html");
      return Array.from(page.querySelectorAll("#captcha-grid .card")).map((card) => {
        const link = card.querySelector("a[href]");
        const href = link ? link.getAttribute("href") : "";
        const doc = (href.split("doc=")[1] || "").split("#")[0];
        const tag = card.querySelector(".tag");
        const level = card.querySelector(".level");
        const img = card.querySelector("img");
        return {
          doc,
          href,
          title: (card.querySelector("h3") || {}).textContent || "",
          summary: (card.querySelector("p") || {}).textContent || "",
          image: img ? img.getAttribute("src") : "",
          tagClass: tag ? tag.className : "",
          tagText: tag ? tag.textContent.trim() : "",
          level: level ? level.dataset.level : "",
          levelText: level ? level.textContent.trim() : "",
        };
      });
    } catch (error) {
      return [];
    }
  }

  /* One pager entry per markdown file, in library order. */
  function pagerEntries(catalog) {
    const byDoc = new Map();
    catalog.forEach((entry) => {
      if (!entry.doc) return;
      if (!byDoc.has(entry.doc)) {
        byDoc.set(entry.doc, { doc: entry.doc, titles: [entry.title] });
      } else {
        byDoc.get(entry.doc).titles.push(entry.title);
      }
    });
    return Array.from(byDoc.values()).map((item) => ({
      doc: item.doc,
      title: item.titles.length > 1 ? item.titles[0].split(" ")[0] : item.titles[0],
    }));
  }

  function renderHero(entry, title) {
    if (!title) return;
    const hero = document.createElement("header");
    hero.className = "doc-hero" + (entry && entry.image ? " has-media" : "");

    const text = document.createElement("div");
    text.className = "doc-hero-text";
    if (entry) {
      const meta = document.createElement("div");
      meta.className = "doc-hero-meta";
      meta.innerHTML =
        '<span class="' + escapeHtml(entry.tagClass) + '">' + escapeHtml(entry.tagText) + "</span>" +
        '<span class="level" data-level="' + escapeHtml(entry.level) + '">' +
        escapeHtml(entry.levelText) + " difficulty</span>";
      text.appendChild(meta);
    } else {
      const kicker = document.createElement("span");
      kicker.className = "doc-kicker";
      kicker.textContent = "Field guide reference";
      text.appendChild(kicker);
    }
    title.parentNode.insertBefore(hero, title);
    text.appendChild(title);
    hero.appendChild(text);

    if (entry && entry.image) {
      const media = document.createElement("div");
      media.className = "doc-hero-media";
      media.innerHTML = '<img src="' + escapeHtml(entry.image) + '" alt="" width="320" height="160">';
      hero.appendChild(media);
    }
  }

  function renderPager(entries) {
    if (!docEl) return;
    const index = entries.findIndex((entry) => entry.doc === docPath);
    if (index === -1) return;
    const prev = entries[(index - 1 + entries.length) % entries.length];
    const next = entries[(index + 1) % entries.length];
    const link = (entry, dir) =>
      '<a class="pager-link pager-' + dir + '" href="guide.html?doc=' + escapeHtml(entry.doc) + '">' +
      '<span class="pager-label">' + (dir === "prev" ? "&larr; Previous" : "Next &rarr;") + "</span>" +
      '<span class="pager-title">' + escapeHtml(entry.title) + "</span></a>";
    const nav = document.createElement("nav");
    nav.className = "pager";
    nav.setAttribute("aria-label", "More CAPTCHA guides");
    nav.innerHTML = link(prev, "prev") + link(next, "next");
    docEl.appendChild(nav);
  }

  function addCopyButtons() {
    if (!docEl || !navigator.clipboard) return;
    docEl.querySelectorAll("pre").forEach((pre) => {
      const code = pre.querySelector("code");
      if (!code) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "code-copy";
      button.textContent = "Copy";
      button.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(code.innerText);
          button.textContent = "Copied";
          button.classList.add("is-done");
        } catch (error) {
          button.textContent = "Failed";
        }
        window.setTimeout(() => {
          button.textContent = "Copy";
          button.classList.remove("is-done");
        }, 1500);
      });
      pre.classList.add("has-copy");
      pre.appendChild(button);
    });
  }

  function trackProgress() {
    const bar = document.getElementById("read-progress");
    if (!bar || !docEl) return;
    let queued = false;
    const update = () => {
      queued = false;
      const rect = docEl.getBoundingClientRect();
      const total = rect.height - window.innerHeight + 120;
      const done = Math.min(1, Math.max(0, (120 - rect.top) / Math.max(total, 1)));
      bar.style.transform = "scaleX(" + done.toFixed(4) + ")";
    };
    const schedule = () => {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
  }

  function buildToc(headings) {
    const items = headings
      .map((heading) => {
        const id = heading.id || slugify(heading.textContent);
        heading.id = id;
        const level =
          heading.tagName === "H2"
            ? "toc-h2"
            : heading.tagName === "H3"
              ? "toc-h3"
              : "toc-h4";
        const label = escapeHtml(cleanLabel(heading.textContent));
        return (
          '<li class="' +
          level +
          '"><a href="#' +
          escapeHtml(id) +
          '">' +
          label +
          "</a></li>"
        );
      })
      .join("");

    if (tocList) tocList.innerHTML = items;
    if (tocMobileList) tocMobileList.innerHTML = items;
  }

  function watchActiveHeading() {
    const links = Array.from(document.querySelectorAll(".toc a"));
    if (!links.length || !("IntersectionObserver" in window)) return;
    const byId = new Map(links.map((link) => [link.getAttribute("href").slice(1), link]));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => link.classList.remove("is-active"));
          const active = byId.get(entry.target.id);
          if (active) active.classList.add("is-active");
        });
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: 0 }
    );

    document.querySelectorAll(".doc h2, .doc h3").forEach((heading) => {
      if (heading.id) observer.observe(heading);
    });
  }

  function highlightCode() {
    if (!docEl || !window.hljs) return;
    docEl.querySelectorAll("pre code").forEach((block) => {
      try {
        window.hljs.highlightElement(block);
      } catch (error) {
        /* leave the block unhighlighted */
      }
    });
  }

  function enhance(catalog) {
    if (!docEl) return;
    const baseDir = docPath.split("/").slice(0, -1).join("/");

    docEl.querySelectorAll("img[src]").forEach((img) => {
      img.setAttribute("src", resolve(baseDir, img.getAttribute("src")));
      img.setAttribute("loading", "lazy");
    });

    docEl.querySelectorAll("a[href]").forEach((link) => {
      const original = link.getAttribute("href");
      const resolved = resolve(baseDir, original);
      if (/^https?:/i.test(original)) {
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener");
        return;
      }
      link.setAttribute("href", toGuideHref(resolved));
    });

    docEl.querySelectorAll("table").forEach((table) => {
      if (table.parentElement && table.parentElement.classList.contains("table-wrap")) return;
      const wrap = document.createElement("div");
      wrap.className = "table-wrap";
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    });

    const meta = Array.from(docEl.querySelectorAll("p")).find((p) =>
      /^complexity:/i.test(p.textContent.trim())
    );
    if (meta) {
      const strong = meta.querySelector("strong");
      if (strong) strong.innerHTML = strong.innerHTML.replace(/^complexity:\s*/i, "");
      meta.classList.add("doc-meta");
    }

    const title = docEl.querySelector("h1");
    const headingText = title ? cleanLabel(title.textContent) : "Guide";
    const entry = catalog.find((item) => item.doc === docPath);
    renderHero(entry, title);
    const lede = docEl.querySelector(".doc-hero + p");
    if (lede) lede.classList.add("doc-lede");
    const tocMobile = document.querySelector(".toc-mobile");
    const anchor = lede || docEl.querySelector(".doc-hero");
    if (tocMobile && anchor) anchor.after(tocMobile);
    document.title = headingText + " — FuckCaptcha";
    if (crumbEl) crumbEl.textContent = headingText;

    if (sourceLink) sourceLink.setAttribute("href", REPO + "/blob/main/" + docPath);

    const headings = Array.from(docEl.querySelectorAll("h2, h3"));
    buildToc(headings);
    watchActiveHeading();
    addCopyButtons();
    renderPager(pagerEntries(catalog));
    trackProgress();
  }

  async function load() {
    if (!docPath) {
      showError("Unknown guide", "The requested document is not available.");
      return;
    }

    try {
      const [response, catalog] = await Promise.all([
        fetch(docPath, { cache: "no-cache" }),
        loadCatalog(),
      ]);
      if (!response.ok) throw new Error("HTTP " + response.status);
      const text = await response.text();
      const html = window.marked ? window.marked.parse(text) : escapeHtml(text);
      docEl.innerHTML = html;
      highlightCode();
      enhance(catalog);

      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (hash) {
        const target = document.getElementById(hash);
        if (target) {
          const htmlEl = document.documentElement;
          const previous = htmlEl.style.scrollBehavior;
          htmlEl.style.scrollBehavior = "auto";
          window.requestAnimationFrame(() => {
            target.scrollIntoView({ block: "start" });
            htmlEl.style.scrollBehavior = previous;
          });
        }
      }
    } catch (error) {
      showError(
        "Could not load this guide",
        "The markdown file could not be fetched. "
      );
    }
  }

  if (copyLink) {
    const originalLabel = copyLink.innerHTML;
    copyLink.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        copyLink.textContent = "Link copied";
        window.setTimeout(() => {
          copyLink.innerHTML = originalLabel;
        }, 1600);
      } catch (error) {
        /* clipboard can be unavailable */
      }
    });
  }

  if (statusEl && !docPath) {
    showError("Unknown guide", "The requested document is not available.");
    return;
  }

  load();
})();
