# MTCaptcha

**Complexity: ⭐⭐ (Below average)**

MTCaptcha is a privacy-focused (GDPR-friendly) CAPTCHA service with a modern widget. It offers checkbox, image-grid and invisible/low-friction modes, and it is generally less aggressive than enterprise anti-bot platforms — which makes it one of the easier widget CAPTCHAs to automate.

#### How it looks:
<img src="../../assets/images/captchas/mtcaptcha.svg" alt="MTCaptcha" height="200">

#### How to identify:
- "I am human" checkbox or a small image challenge
- **MTCaptcha** branding
- Script `https://service.mtcaptcha.com/mtcv1/client/mtcaptcha.min.js` (and `service2.mtcaptcha.com/.../mtcaptcha2.min.js`)
- Global JS object `mtcaptchaConfig` with a `sitekey`
- Container `<div class="mtcaptcha"></div>`
- Hidden input `mtcaptcha-verifiedtoken`
- JS API: `mtcaptcha.getVerifiedToken()`

#### How it works:
1. The widget loads with a site key and renders a checkbox or challenge.
2. After verification, MTCaptcha inserts a hidden input `mtcaptcha-verifiedtoken` into the form.
3. The site's backend calls `https://service.mtcaptcha.com/mtcv1/api/checktoken?privatekey=...&token=...`.
4. Each token is valid for a few minutes and can be checked only once (anti-replay).
5. Invisible/low-friction mode may verify without showing a widget, based on IP reputation and behaviour.

---

### Free bypass methods

| Method | Description | Success Rate | Link |
|--------|-------------|--------------|------|
| **DrissionPage** | 🔥 Real Chromium; click the checkbox and wait for the token | 80-95% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Patchright** | Stealth-patched Playwright | 75-90% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) |
| **Camoufox** | Anti-detect Firefox | 75-90% | [daijro/camoufox](https://github.com/daijro/camoufox) |
| **undetected-chromedriver** | Patched Selenium | 70-90% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |
| **ddddocr** | OCR if an image-grid challenge appears | 60-80% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |

### Practical approach
1. Open the page in a stealth browser with a residential IP.
2. Click the "I am human" checkbox with a human-like mouse path.
3. If an image challenge appears, solve it (OCR/vision model) or retry with a cleaner profile — MTCaptcha often passes on the checkbox alone.
4. Read the token:
   - from the hidden input `mtcaptcha-verifiedtoken`, or
   - via `mtcaptcha.getVerifiedToken()`.
5. Submit the form immediately; the token expires quickly and is single-use.

### Practical tips
- Invisible mode depends heavily on IP reputation: a clean residential IP may pass without any interaction.
- Keep cookies and localStorage from the first visit; MTCaptcha uses them for risk scoring.
- Don't solve the same widget twice — request a fresh token after any reload.
- Image challenges are usually simple; a general OCR model plus a few retries is often enough.
- Token extraction via JS is more reliable than parsing the DOM after a re-render.

---

#### 💰 Paid alternatives:

| Service | MTCaptcha support | Notes |
|---------|-------------------|-------|
| **2Captcha** | MTCaptcha task | Token-based, proxy support |
| **CapSolver** | MTCaptcha | Fast, AI-based |
| **Anti-Captcha** | MTCaptcha (availability varies) | Check current task list |
| **YesCaptcha** | MTCaptcha | Alternative provider |

If free methods don't work, use API services: **2Captcha**, **Anti-Captcha**, or **CapSolver**. More details in the [Paid services](../solvers.md#paid-services-api) section.
