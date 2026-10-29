# CaptchaFox

**Complexity: ⭐⭐⭐ (Medium)**

CaptchaFox is a privacy-friendly CAPTCHA provider positioned as a drop-in alternative to reCAPTCHA/hCaptcha. It offers an inline widget, popup and hidden mode, plus a "OneClick" risk engine that decides whether a visible challenge is needed. The widget is usually a click/checkbox challenge; harder sessions may get an interactive task.

#### How it looks:
<img src="../../assets/images/captchas/captchafox.svg" alt="CaptchaFox" height="200">

#### How to identify:
- Script `https://cdn.captchafox.com/api.js`
- Container `<div class="captchafox" data-sitekey="...">`
- Hidden input `cf-captcha-response`
- Global `captchafox` object with `render()`, `execute()`, `getResponse()`
- Attributes `data-mode="inline|popup|hidden"` and `data-start="none|auto|focus"`
- Verification endpoint `https://api.captchafox.com/siteverify`

#### Modes:
- **Inline** — widget visible in the form
- **Popup** — challenge opens in a modal
- **Hidden** — no widget; the site calls `captchafox.execute()` on submit
- **OneClick** — risk-based; many users pass without an active challenge

#### How it works:
1. The widget loads with a site key and requests a challenge.
2. After verification, a token is written to `cf-captcha-response`.
3. The site's backend posts the token + secret to `api.captchafox.com/siteverify`.
4. Tokens are single-use and expire quickly.
5. Hidden/OneClick modes rely on browser and behavioural signals to skip the challenge.

---

### Free bypass methods

| Method | Description | Success Rate | Link |
|--------|-------------|--------------|------|
| **DrissionPage** | 🔥 Real Chromium; run the widget and read the token | 75-90% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Patchright** | Stealth-patched Playwright | 70-90% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) |
| **Camoufox** | Anti-detect Firefox | 70-90% | [daijro/camoufox](https://github.com/daijro/camoufox) |
| **undetected-chromedriver** | Patched Selenium | 65-85% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |
| **ddddocr** | OCR for interactive image challenges | 60-80% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |

### Practical approach
1. Open the page in a stealth browser with a clean residential IP.
2. For inline/popup mode, click the widget and wait for `cf-captcha-response`.
3. For hidden mode, call `captchafox.execute()` (or let the site call it) and read the resolved token.
4. If an interactive challenge appears, solve it with OCR/vision or retry with a cleaner profile.
5. Submit the form right away — tokens are single-use and short-lived.

### Practical tips
- Hidden/OneClick mode is mostly about fingerprint and IP reputation; a fresh datacenter IP triggers more challenges.
- Keep the same session and User-Agent from challenge to submission.
- Don't reload the widget after verification; the token may be invalidated.
- If the site uses `data-start="auto"`, the widget may verify without any click — just wait.
- Token extraction via `captchafox.getResponse()` is more reliable than DOM polling.

---

#### 💰 Paid alternatives:

| Service | CaptchaFox support | Notes |
|---------|--------------------|-------|
| **CapSolver** | CaptchaFox | Token-based |
| **2Captcha** | Check the current task list | Support may vary |
| **Anti-Captcha** | Check the current task list | Support may vary |
| **YesCaptcha** | CaptchaFox | Alternative provider |

If free methods don't work, use API services such as **CapSolver**. More details in the [Paid services](../solvers.md#paid-services-api) section.
