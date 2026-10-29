# HUMAN (PerimeterX)

**Complexity: ⭐⭐⭐⭐⭐ (Very High)**

HUMAN Security, formerly PerimeterX, is an enterprise bot-management platform. Its visible challenge is the familiar "Press & Hold" button, but the real decision is made by a sensor script that collects browser and behavioural signals. Many deployments run invisibly and never show the button at all.

#### How it looks:
<img src="../../assets/images/captchas/human.svg" alt="HUMAN Press and Hold" height="200">

#### How to identify:
- Element `#px-captcha` with a "Press & Hold" button
- Cookies `_px3`, `_pxvid`, `_pxhd`, `_pxde`, `pxcts`
- Requests to `px-cloud.net`, `px-cdn.net`, or a first-party collector path
- `X-PX-Authorization` header on protected requests
- Page title "Access to this page has been denied" or a challenge overlay
- Obfuscated `init.js` / `captcha.js` sensor scripts

#### How it works:
1. The sensor script collects browser, canvas, WebGL, font, and behavioural signals.
2. It posts a telemetry payload to the collector and receives/updates `_px3`.
3. Suspicious sessions get the Press & Hold challenge; low-risk sessions pass invisibly.
4. The button checks press duration, pointer pressure, movement during the hold, and timing integrity.
5. A successful interaction produces a verification token that the collector validates.
6. Protected requests must carry the resulting cookies and, on some sites, `X-PX-Authorization`.
7. The score is continuous: a valid cookie can be downscored later by bot-like behaviour.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **Patchright / Camoufox** | 🔥 Stealth browsers for the sensor and Press & Hold flow | 40–70% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) · [daijro/camoufox](https://github.com/daijro/camoufox) |
| **DrissionPage** | Real Chromium with pointer-event control | 35–65% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **SeleniumBase UC mode** | Patched Selenium for sensor-heavy pages | 35–60% | [seleniumbase/SeleniumBase](https://github.com/seleniumbase/SeleniumBase) |
| **Playwright + CDP input** | Native pointer events for the hold gesture | 30–60% | [microsoft/playwright-python](https://github.com/microsoft/playwright-python) |
| **curl_cffi** | HTTPS/TLS impersonation for warmed sessions | 20–45% | [lexiforest/curl_cffi](https://github.com/lexiforest/curl_cffi) |

### Practical approach
1. Use a real browser, a residential IP, and a persistent profile.
2. Let the sensor script load and post telemetry; do not block the collector.
3. If Press & Hold appears, press the button with a real pointer event, hold for a natural duration (several seconds), add slight movement, and release.
4. Wait for the challenge overlay to disappear and the protected content to render.
5. Keep `_px3`, `_pxvid`, and the rest of the cookie jar for subsequent requests.
6. If the session is denied, start fresh with a different profile and IP rather than retrying aggressively.

### Practical tips
- The hold duration is not the only check: pressure, micro-movement, and timing integrity matter.
- A cookie being present does not mean the session passed; `_px3` is issued on failed challenges too.
- HUMAN often penalizes reused profiles and cookies from previous visits, so test both fresh and warmed sessions.
- Headless Chrome is challenged aggressively; headful or anti-detect browsers work better.
- Behaviour after the challenge matters: slow down and avoid bot-like request patterns.
- The collector domains and script names change; identify by cookie/header patterns, not just URLs.

---

#### 💰 Paid alternatives:

| Service | Notes |
|---------|-------|
| **Bright Data / ZenRows / ScrapingBee** | Managed unblockers with browser sessions |
| **Residential proxies** | Strongly recommended; IP reputation drives the score |
| **2Captcha / CapSolver** | May support specific Press & Hold deployments; coverage varies |

More details in the [Paid services](../solvers.md#paid-services-api) section.
