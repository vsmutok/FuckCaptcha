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
