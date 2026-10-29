# Prosopo Procaptcha

**Complexity: ⭐⭐⭐ (Medium)**

Procaptcha by Prosopo (UK) is a GDPR-focused, drop-in replacement for reCAPTCHA/hCaptcha. It runs one of four challenge types: `frictionless` (risk-based), `pow` (proof of work), `puzzle` (drag the piece into the gap) and `image` (image selection). The challenge type is configured per site key and chosen by the server at session start.

#### How it looks:
<img src="../../assets/images/captchas/prosopo-procaptcha.svg" alt="Prosopo Procaptcha" height="200">

#### How to identify:
- Script `https://js.prosopo.io/js/procaptcha.bundle.js` (or `.iife.js`)
- Container `<div class="procaptcha" data-sitekey="...">`
- Hidden form field / POST parameter `procaptcha-response` (a JSON payload)
- Options/callbacks: `Procaptcha.render()`, `window.procaptcha.start()`, `sessionId`, `placement`
- Verification endpoint `https://api.prosopo.io/siteverify` (regional: `eu-api`, `us-api`)

#### Challenge types:
- **Frictionless** — default; inspects the browser, then picks invisible PoW, puzzle or image based on risk
- **PoW** — invisible proof-of-work for low-risk sessions
- **Puzzle** — drag the piece into the gap
- **Image** — image selection for the highest risk

#### How it works:
1. The widget requests a session from the Prosopo server using the site key.
2. The server inspects the browser environment (it explicitly looks for Playwright/Selenium) and picks a challenge.
3. The user (or the worker) solves it; the widget produces a `procaptcha-response` token.
4. The backend POSTs JSON `{secret, token}` to `/siteverify` and gets `{status, verified, score?}`.
5. Professional/Enterprise tiers add a bot score (closer to 1 = more likely a bot).

---

### Free bypass methods

| Method | Description | Success Rate | Link |
|--------|-------------|--------------|------|
| **DrissionPage** | 🔥 Real Chromium; pass the frictionless check and PoW | 75-90% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Patchright** | Stealth Playwright; defeats the automation detection | 70-90% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) |
| **Camoufox** | Anti-detect Firefox with clean fingerprints | 70-90% | [daijro/camoufox](https://github.com/daijro/camoufox) |
| **OpenCV** | Puzzle gap detection for the puzzle type | 70-85% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **ddddocr** | OCR/selection helper for the image type | 60-80% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **Official React/JS bundle** | Run the widget legitimately in a browser-like environment | ~100% (PoW) | [prosopo/procaptcha](https://github.com/prosopo/procaptcha) |

### Practical approach
1. Extract the site key and open the page in a stealth browser.
2. In frictionless mode, a clean environment usually gets only an invisible PoW — just wait for the token.
3. If a puzzle appears, measure the gap with OpenCV and drag with a human-like curve.
4. If an image challenge appears, the environment is flagged — rotate the IP/profile first.
5. Read `procaptcha-response` from the form and submit immediately.

### Practical tips
- Procaptcha says outright that it fingerprints Playwright/Selenium; vanilla automation is detected quickly.
- PoW is CPU-bound and runs in Web Workers — keep timeouts generous.
- `sessionId` (if the site sets it) must be passed to siteverify too, or the token won't verify.
- Tokens are single-use; don't reload the widget after solving.
- The `score` field (paid tiers) can reject a technically valid token if the session looks bot-like.

---

#### 💰 Paid alternatives:

| Service | Procaptcha support | Notes |
|---------|--------------------|-------|
| **CapSolver** | Procaptcha | Token-based, check current support |
| **2Captcha** | Limited / check task list | Support may vary |
| **Anti-Captcha** | Limited / check task list | Support may vary |
| **Browser/unblocker APIs** | Run the widget in a real browser | Bright Data, ZenRows, ScrapingBee |

Because the invisible PoW is cheap to run locally, paid services are usually only needed for the image/puzzle bands or at scale. More details in the [Paid services](../solvers.md#paid-services-api) section.
