# Contributing

Contributions are welcome!

Please read the [contribution guidelines](https://github.com/sindresorhus/awesome/blob/main/contributing.md) of the main Awesome list as well.

## Repository layout

| Path | Purpose |
| --- | --- |
| `docs/captchas/*.md` | One page per CAPTCHA. **This is the source of truth.** |
| `docs/solvers.md`, `docs/resources.md` | Cross-cutting reference pages. |
| `assets/images/captchas/*.svg` | Card and hero artwork. |
| `index.html` | Library page with search and filters. |
| `guide.html` | Reader that renders any `docs/*.md` file in the browser. |
| `assets/site.css`, `assets/site.js` | Shared shell, theme toggle and library filters. |
| `assets/guide.css`, `assets/guide.js` | Markdown reader, table of contents and link rewriting. |
| `assets/vendor/marked.min.js` | Vendored markdown renderer (MIT). |

The web pages never duplicate CAPTCHA content: `guide.html` fetches the
markdown file and renders it, so editing `docs/captchas/*.md` updates both
GitHub and the website.

## Adding a CAPTCHA

1. Copy an existing page in `docs/captchas/` and update the title, complexity
   and content.
2. Add an SVG to `assets/images/captchas/`.
3. Add a card in `index.html`:
   - `data-tags` — any of `risk`, `puzzle`, `text`, `open`;
   - `data-level` — `1`–`5`;
   - `href` — `guide.html?doc=docs/captchas/<file>.md`;
   - `data-search` — name, description and tag labels.
4. Add the matching row to the table in `README.md`.
5. Keep the complexity scale consistent:

   | Stars | Label |
   | --- | --- |
   | ⭐ | Low |
   | ⭐⭐ | Below average |
   | ⭐⭐⭐ | Medium |
   | ⭐⭐⭐⭐ | High |
   | ⭐⭐⭐⭐⭐ | Very High |

6. Run `npx --yes awesome-lint` before opening a pull request.

## Local preview

The reader fetches markdown over HTTP, so opening `index.html` via `file://`
will not work. Serve the repository root instead:

```sh
python3 -m http.server 8080
```

Then open <http://localhost:8080/>. Test both themes and a narrow viewport
before submitting.

## Criteria

- Only open-source tools or well-known paid services.
- High-quality descriptions and working links.
- Check that the CAPTCHA or tool is not already covered.
