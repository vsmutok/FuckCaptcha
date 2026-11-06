# Vendored dependencies

## marked

- File: `marked.min.js`
- Version: 12.0.2
- Source: https://github.com/markedjs/marked
- License: MIT (see `marked.LICENSE.md`)

Used by `guide.html` / `assets/guide.js` to render the markdown files in
`docs/` directly in the browser, so the markdown stays the single source of
truth for every CAPTCHA page.

To update it:

```sh
npm pack marked@<version>
tar -xzf marked-<version>.tgz
cp package/marked.min.js assets/vendor/marked.min.js
cp package/LICENSE.md assets/vendor/marked.LICENSE.md
```

## highlight.js

- File: `highlight.min.js`
- Version: 11.9.0
- Source: https://github.com/highlightjs/highlight.js
- License: BSD-3-Clause (see `highlight.LICENSE.md`)

Used by `guide.html` / `assets/guide.js` to add syntax highlighting to code
blocks in the rendered markdown. Token colors are defined in `assets/guide.css`
with CSS variables, so they follow the light/dark theme automatically.

To update it:

```sh
curl -fsSL https://cdnjs.cloudflare.com/ajax/libs/highlight.js/<version>/highlight.min.js \
  -o assets/vendor/highlight.min.js
curl -fsSL https://raw.githubusercontent.com/highlightjs/highlight.js/<version>/LICENSE \
  -o assets/vendor/highlight.LICENSE.md
```
