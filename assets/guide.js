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

  function buildToc(headings) {
    const items = headings
      .map((heading) => {
        const id = heading.id || slugify(heading.textContent);
        heading.id = id;
        const level = heading.tagName === "H2" ? "toc-h2" : "toc-h3";
        const label = escapeHtml(heading.textContent.trim());
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

  function enhance() {
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
    const headingText = title ? title.textContent.trim() : "Guide";
    document.title = headingText + " — FuckCaptcha";
    if (crumbEl) crumbEl.textContent = headingText;

    if (sourceLink) sourceLink.setAttribute("href", REPO + "/blob/main/" + docPath);

    const headings = Array.from(docEl.querySelectorAll("h2, h3"));
    buildToc(headings);
    watchActiveHeading();
  }

  async function load() {
    if (!docPath) {
      showError("Unknown guide", "The requested document is not available.");
      return;
    }

    try {
      const response = await fetch(docPath, { cache: "no-cache" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const text = await response.text();
      const html = window.marked ? window.marked.parse(text) : escapeHtml(text);
      docEl.innerHTML = html;
      enhance();

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
