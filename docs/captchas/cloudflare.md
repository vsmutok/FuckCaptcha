# Cloudflare Turnstile / Challenge

**Complexity: ⭐⭐⭐ (Medium)**

Cloudflare offers two different things that are often confused:

| Product | What it is | What you see |
|---------|------------|--------------|
| **Turnstile** | A CAPTCHA widget that any site can embed | Checkbox / non-interactive widget, `cf-turnstile-response` token |
| **Challenge** | Cloudflare's own bot check (JS, Managed, Interactive) | "Just a moment...", "Checking your browser", `cf_clearance` cookie |

Turnstile is a standalone token-based CAPTCHA (similar in flow to reCAPTCHA). Cloudflare Challenge is a full-page interstitial served by Cloudflare's edge and is not a widget you can embed. They are bypassed differently.

---

## 1. Cloudflare Turnstile

#### How it looks:
<img src="../../assets/images/captchas/cloudflare.svg" alt="Cloudflare Turnstile" height="200">

#### How to identify:
- Cloudflare logo and branding
- "Verify you are human" checkbox or an automatic (non-interactive) challenge
- Script `https://challenges.cloudflare.com/turnstile/v0/api.js`
- Container `<div class="cf-turnstile" data-sitekey="...">`
- Hidden field/input `cf-turnstile-response`
- JS calls to `turnstile.render()`, `turnstile.execute()`, `turnstile.getResponse()`

#### Modes:
- **Managed** — Cloudflare decides whether to show a checkbox or run invisibly.
- **Non-interactive** — runs automatically, no click required.
- **Invisible** — no widget at all; the token is requested by JS.

#### How it works:
1. The widget contacts `challenges.cloudflare.com` and receives a token.
2. The site submits the token as `cf-turnstile-response`.
3. The backend verifies it at `https://challenges.cloudflare.com/turnstile/v0/siteverify` with the secret key.
4. Tokens are single-use and expire after ~5 minutes.

#### Free bypass methods:

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **CloudflareBypassForScraping** | 🔥 Browser pool + DrissionPage, returns cookies or page data | 85-95% | [sarperavci/CloudflareBypassForScraping](https://github.com/sarperavci/CloudflareBypassForScraping) |
| **DrissionPage** | 🔥 Real Chromium control, works well with Turnstile widgets | 85-95% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Camoufox** | Anti-detect Firefox build for widget/challenge flows | 75-90% | [daijro/camoufox](https://github.com/daijro/camoufox) |
| **Patchright** | Stealth-patched Playwright | 75-90% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) |
| **puppeteer-extra (stealth)** | Stealth plugin for Puppeteer that hides automation flags | 70-85% | [berstend/puppeteer-extra](https://github.com/berstend/puppeteer-extra) |
| **undetected-chromedriver** | Patched Selenium, hides automation flags | 70-85% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |
| **Scrapy-Playwright** | Scrapy integration with Playwright for browser automation | 65-80% | [scrapy-plugins/scrapy-playwright](https://github.com/scrapy-plugins/scrapy-playwright) |
| **Selenium Wire** | Extends Selenium to inspect and modify requests/headers | 60-75% | [wkeeling/selenium-wire](https://github.com/wkeeling/selenium-wire) |
| **NopeCHA extension** | Freemium extension with Turnstile support | 60-85% (free quota) | [NopeCHALLC/nopecha-extension](https://github.com/NopeCHALLC/nopecha-extension) |
| **FlareSolverr** | Proxy server for Cloudflare challenges (not Turnstile tokens) | 80-95% | [FlareSolverr/FlareSolverr](https://github.com/FlareSolverr/FlareSolverr) |
| **requests-html** | Browser-like HTTP client; helps with light JS challenges | 60-75% | [psf/requests-html](https://github.com/psf/requests-html) |
| **OpenWPM** | Programmable browser automation for measurement and research | 50-70% | [mozilla/OpenWPM](https://github.com/mozilla/OpenWPM) |

#### Practical tips:
- Turnstile often passes automatically in a clean, real browser; the hard part is not the click but the fingerprint and IP reputation.
- Keep the same browser session for widget load → token → form submit.
- Don't reload the widget after solving; the token may be invalidated.
- If the site calls `turnstile.execute()` itself, let its own flow run instead of injecting a token.
- Residential/mobile IPs and persistent profiles dramatically improve the pass rate.
- Headless Chrome without patches is usually detected; use a stealth build or a real display.

---

## 2. Cloudflare Challenge (JS / Managed / Interactive)

#### How it looks:
- Full-page "Just a moment..." or "Checking your browser before accessing..."
- Cloudflare ray ID at the bottom
- Sometimes an interactive "Verify you are human" box (Interactive Challenge)
- After success, the browser receives a `cf_clearance` cookie

#### How to identify:
- HTTP response header `server: cloudflare` + `cf-mitigated: challenge`
- Cookies `cf_clearance`, `__cf_bm`, `cf_chl_*`
- Page title "Just a moment..."
- Challenge platform script `/cdn-cgi/challenge-platform/`

#### How it works:
1. Cloudflare serves a JS challenge that collects browser signals and computes a proof-of-work/answer.
2. On success it sets `cf_clearance`, bound to the client IP and User-Agent.
3. Subsequent requests carrying that cookie and the same fingerprint are allowed.

#### Free bypass methods:

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **FlareSolverr** | 🔥 Runs a real browser and returns `cf_clearance` + HTML | 85-95% | [FlareSolverr/FlareSolverr](https://github.com/FlareSolverr/FlareSolverr) |
| **CloudflareBypassForScraping** | 🔥 DrissionPage-based cookie/HTML service | 85-95% | [sarperavci/CloudflareBypassForScraping](https://github.com/sarperavci/CloudflareBypassForScraping) |
| **DrissionPage** | Solve the challenge in a controlled Chromium | 80-95% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Camoufox / Patchright** | Stealth browsers that survive JS fingerprinting | 70-90% | [daijro/camoufox](https://github.com/daijro/camoufox) |
| **curl_cffi** | Reuse a valid `cf_clearance` with matching TLS fingerprint | 60-85% | [lexiforest/curl_cffi](https://github.com/lexiforest/curl_cffi) |
| **cloudscraper** | Legacy JS-challenge solver; works only on older/basic setups | 20-60% | [VeNoMouS/cloudscraper](https://github.com/VeNoMouS/cloudscraper) |

#### Practical tips:
- `cf_clearance` is bound to **IP + User-Agent**: if you change either, the cookie becomes invalid.
- Copy the whole cookie jar, not just `cf_clearance`; `__cf_bm` and other cookies matter.
- Don't solve the challenge in a headless browser and then reuse the cookie in `requests` with a different TLS stack — use `curl_cffi` with matching impersonation.
- Managed Challenges can silently escalate to Interactive; keep a real browser available as a fallback.
- Rate matters: a challenge solved on a clean IP can last hours; on a flagged IP it may loop forever.

---

#### 💰 Paid alternatives:

**Turnstile / Challenge tokens and unblocking:**

| Service | Notes |
|---------|-------|
| **2Captcha** | Turnstile and Cloudflare Challenge task types |
| **CapSolver** | Turnstile, Challenge, and anti-bot bypass |
| **Anti-Captcha** | Turnstile support with proxy |
| **YesCaptcha** | Turnstile/Cloudflare tasks |
| **NopeCHA** | Turnstile API + extension |
| **Bright Data / ZenRows / ScrapingBee / Oxylabs** | Full unblocker APIs that handle Cloudflare server-side |

If free methods don't work, use API services: **2Captcha**, **Anti-Captcha**, **CapSolver**, or an unblocker API. More details in the [Paid services](../solvers.md#paid-services-api) section.

---

### Recommendations
- Combine a couple of complementary tools (a stealth browser plus a cookie-fetching service) instead of relying on a single one.
- When blocked, rotate proxies or change the tool configuration; a fresh, clean IP often matters more than the tool.
- Keep tools up to date and re-check their docs, as Cloudflare's challenge changes frequently.
- Respect local laws and Cloudflare's policies when automating or bypassing challenges.
