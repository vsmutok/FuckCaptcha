# Friendly Captcha

**Complexity: ⭐ (Low)**

Friendly Captcha is a privacy-first, proof-of-work CAPTCHA from Germany. The browser solves a cryptographic puzzle in a Web Worker; the user only clicks once (or not at all in zero-click mode). There are no image grids and no tracking cookies, so like ALTCHA the cheapest route is to let the PoW run and capture the response.

#### How it looks:
<img src="../../assets/images/captchas/friendly-captcha.svg" alt="Friendly Captcha" height="200">

#### How to identify:
- Container `<div class="frc-captcha" data-sitekey="...">`
- "I am human" button with a progress circle, then a checkmark
- Hidden input `frc-captcha-response` (the field name can be customized)
- API calls to `https://global.frcapi.com/api/v2/captcha/` (v2)
- Script `widget.module.min.js` / `sdk` from Friendly Captcha
- Text like "Protected by Friendly Captcha"

#### Widget modes:
- **Smart (default)** — decides whether a click is required based on session signals.
- **One-click** — the user must click once; then the PoW completes.
- **Zero-click** — the widget completes automatically.

#### How it works:
1. The widget requests a challenge from Friendly Captcha using the site key.
2. A Web Worker solves a VDF/proof-of-work puzzle (CPU-bound, no user puzzle).
3. The solution string is stored in `frc-captcha-response` (or a custom field).
4. The site's backend verifies it at `https://global.frcapi.com/api/v2/captcha/siteverify` with an API key.
5. Each response is single-use and expires.

---

### Free bypass methods

| Method | Description | Success Rate | Link |
|--------|-------------|--------------|------|
| **Real browser (Playwright/DrissionPage)** | 🔥 Let the official widget solve the PoW and read the response | ~100% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Patchright / Camoufox** | Stealth browsers for zero-click/smart modes | 85-95% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) |
| **Official JS SDK** | Load the SDK in Node/headless browser and use `getResponse()` | ~100% | [FriendlyCaptcha/friendly-captcha-sdk](https://github.com/FriendlyCaptcha/friendly-captcha-sdk) |
| **undetected-chromedriver** | Patched Selenium | 80-95% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |

### Practical approach
1. Open the page in a real browser with JS enabled.
2. If the mode requires a click, click the widget with a human-like mouse path.
3. Wait for the `completed` state or poll the hidden `frc-captcha-response` field.
4. Submit the form with the response; don't reload the widget afterwards.
5. If the site uses zero-click, simply wait — the response appears automatically.

### Practical tips
- The PoW is CPU-bound: lower-end machines may take a second or two, so use generous timeouts.
- Web Workers and WASM must be available; some hardened headless setups disable them and break the widget.
- The response is single-use and expires; extract it right before submission.
- Smart/zero-click modes still use risk signals; a clean IP and a normal browser profile improve the outcome.
- The response token is verified server-side with a secret API key, so you cannot forge it — you must actually solve the PoW.

---

#### 💰 Paid alternatives:

Friendly Captcha is usually not supported by token services because there is no visual task to outsource. Run the PoW locally (it is cheap), or use a full unblocker/browser API if you need scale:

| Service | Notes |
|---------|-------|
| **Bright Data / ZenRows / ScrapingBee** | Browser/unblocker APIs that can run the widget |
| **2Captcha / CapSolver** | Support is limited or absent for PoW-only widgets |

More details in the [Paid services](../solvers.md#paid-services-api) section.
