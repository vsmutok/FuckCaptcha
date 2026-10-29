# Google reCAPTCHA

reCAPTCHA is a service from Google that helps protect websites from spam and abuse. It is the most widely deployed CAPTCHA family on the web (~67% of sites that use a CAPTCHA in 2026). There are several versions, each with its own characteristics, endpoints and bypass surface.

| Version | What the user sees | Main signal | Complexity |
|---------|--------------------|-------------|------------|
| v2 "I'm not a robot" | Checkbox + image grid | Risk score + interaction | ⭐⭐⭐ |
| v2 Invisible | Nothing until a challenge appears | Behavioral score | ⭐⭐⭐⭐ |
| v3 | Nothing, a score is returned to the site | JS/heuristic score (0.0–1.0) | ⭐⭐⭐⭐ |
| Enterprise | v2/v3 widgets + account-level controls | Risk score + custom rules | ⭐⭐⭐⭐⭐ |

---

### 1. reCAPTCHA v2
**Complexity: ⭐⭐⭐ (Medium)**

The classic checkbox widget. After clicking, Google may return a token immediately or show an image grid (3×3/4×4, "select all traffic lights") or an audio challenge.

#### How it looks:
<img src="../../assets/images/captchas/recaptcha-v2.svg" alt="reCAPTCHA v2" height="150">

#### How to identify:
- `<div class="g-recaptcha" data-sitekey="...">` or `data-sitekey` in the page source
- Script `https://www.google.com/recaptcha/api.js`
- Iframe with `src` containing `/recaptcha/api2/anchor` and `/recaptcha/api2/bframe`
- Text input named `g-recaptcha-response` (the token field)
- `grecaptcha.render()` / `grecaptcha.execute()` calls in JS

#### How it works:
1. The widget requests a challenge from Google using the site key.
2. Google returns a token (`g-recaptcha-response`) that is valid for ~2 minutes.
3. The site sends the token to its backend, which calls Google's `siteverify` endpoint.
4. The token is single-use and usually tied to the site key and the user's session.

#### How to bypass:

| Method | Description | Success Rate | Link |
|--------|-------------|--------------|------|
| **Audio challenge + Whisper** | Switch to the audio challenge, transcribe with Whisper, submit | 80-95% | [openai/whisper](https://github.com/openai/whisper) |
| **Buster** | 🔥 Browser extension that automates the audio challenge | 80-95% | [dessant/buster](https://github.com/dessant/buster) |
| **GoogleRecaptchaBypass** | DrissionPage/Selenium script (audio-based) | 85-95% | [sarperavci/GoogleRecaptchaBypass](https://github.com/sarperavci/GoogleRecaptchaBypass) |
| **DrissionPage** | Real Chromium control, good fingerprint; combine with audio solver | 80-95% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **undetected-chromedriver** | Patched Selenium that hides automation flags | 70-90% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |
| **Patchright** | Patched Playwright with stealth fixes | 75-90% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) |
| **Camoufox** | Anti-detect Firefox build | 75-90% | [daijro/camoufox](https://github.com/daijro/camoufox) |

> The audio route is the most reliable free method, but Google rate-limits and fingerprints it. Rotate sessions/proxies and avoid solving hundreds of challenges from one IP.

---

### 2. reCAPTCHA v3
**Complexity: ⭐⭐⭐⭐ (High)**

Works in the background and evaluates user actions with a score from 0.0 (bot) to 1.0 (human). The site decides what to do: allow, challenge or block. There is no widget to solve.

#### How it looks:
<img src="../../assets/images/captchas/recaptcha-v3.svg" alt="reCAPTCHA v3" height="100">

#### How to identify:
- Script `https://www.google.com/recaptcha/api.js?render=SITE_KEY`
- Calls to `grecaptcha.execute(sitekey, {action: '...'})`
- No visible widget; sometimes a small reCAPTCHA badge in the corner
- Hidden input with the returned token, usually submitted with the form

#### Characteristics:
- **No visible tasks** — you cannot "click" your way through it.
- The score is computed from browser/device signals, cookies, mouse/keystroke behavior, IP reputation, site history and the action name.
- The same token can be verified only once, and it expires quickly.
- The site may require a minimum score (e.g., 0.5) for a sensitive action.

#### How to bypass:
- Use a **real, clean browser profile** with history, cookies and a residential/mobile IP.
- Avoid headless fingerprints: use **Patchright**, **Camoufox**, **DrissionPage** or a properly configured **undetected-chromedriver**.
- Warm up the session: visit pages, scroll, move the mouse, wait, then trigger the action.
- Match the expected `action` name and page context; tokens are bound to the action.
- Keep the score high enough for the target site — sometimes 0.3 is accepted, sometimes 0.7 is required.
- Reuse a persistent profile per account/IP instead of a fresh browser on every request.

| Tool | Description | Success Rate | Link |
|------------|------|--------------|-----------|
| **undetected-chromedriver** | 🔥 Patched Chrome, hides common automation flags | 70-90% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |
| **DrissionPage** | Chromium control with fewer CDP leaks | 75-90% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Patchright** | Stealth-patched Playwright | 75-90% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) |
| **Camoufox** | Anti-detect Firefox with fingerprint spoofing | 75-90% | [daijro/camoufox](https://github.com/daijro/camoufox) |
| **playwright-stealth** | Stealth patches for Playwright | 65-85% | [AtuboDad/playwright_stealth](https://github.com/AtuboDad/playwright_stealth) |
| **curl_cffi** | TLS/JA3 impersonation for API-heavy flows | 60-85% | [lexiforest/curl_cffi](https://github.com/lexiforest/curl_cffi) |

---

### 3. reCAPTCHA Enterprise
**Complexity: ⭐⭐⭐⭐⭐ (Very High)**

An advanced version for large companies that combines v2/v3 methods with additional account-level controls, custom risk rules and deeper telemetry.

#### How it looks:
<img src="../../assets/images/captchas/recaptcha-enterprise.svg" alt="reCAPTCHA Enterprise" height="150">

#### How to identify:
- Script `https://www.google.com/recaptcha/enterprise.js?render=SITE_KEY`
- `grecaptcha.enterprise.render()` / `grecaptcha.enterprise.execute()`
- Iframe paths containing `/recaptcha/enterprise/`
- Site key often starts with `6L...` like regular reCAPTCHA, so check the script URL, not only the key

#### Characteristics:
- May include multi-factor or account-reputation checks.
- Deep risk analysis; custom thresholds per action.
- Often visually indistinguishable from v2/v3.
- Tokens are verified through the Enterprise Assessment API rather than the public `siteverify` endpoint.

#### How to bypass:
- Use the same methods as for **reCAPTCHA v3** (real browser, stealth patches, clean residential IP, warmed profile).
- Enterprise is much more sensitive to IP reputation and session history: a fresh datacenter IP is usually rejected even with a perfect browser.
- Keep consistent fingerprints per profile (timezone, locale, WebGL, fonts, screen size) and avoid switching proxies mid-session.
- If the widget shows a v2-style challenge, the audio route still works; otherwise prefer real-user traffic or paid solvers with enterprise task types.

---

### General tips for bypassing reCAPTCHA
1. **Quality proxies**: residential or mobile proxies; avoid public datacenter ranges.
2. **User-Agent and headers**: always use a real, current browser and matching `Accept-Language`/`Sec-CH-UA` headers.
3. **Mouse/keyboard emulation**: for v2, imitate human movement; for v3, generate ordinary page interaction before the protected action.
4. **Cookies and profile history**: a persistent profile with Google cookies and prior visits raises the score significantly.
5. **Timing**: don't submit instantly; wait, scroll, and interact naturally.
6. **One token, one request**: never replay a token; request a fresh one for each action.
7. **Don't over-solve**: hammering the audio challenge from one IP quickly poisons the score and triggers blocks.

---

#### 💰 Paid alternatives:

| Service | Supported tasks | Notes |
|---------|-----------------|-------|
| **2Captcha** | v2, v2 Invisible, v3, Enterprise | `ReCaptchaV2Task`, `ReCaptchaV3Task`, enterprise variants |
| **Anti-Captcha** | v2, v2 Invisible, v3, Enterprise | Stable worker pool; proxy support |
| **CapSolver** | v2, v3, Enterprise | Fast AI-based solving, low prices |
| **CapMonster** | v2, v3, Enterprise | Cheaper, slightly slower |
| **DeathByCaptcha** | v2, v3 | Older service, mixed speed |

See the [Paid services](../solvers.md#paid-services-api) section for more details. Paid services return a ready token; you still need to submit it in the correct field and keep the same session/IP that was used for solving.
