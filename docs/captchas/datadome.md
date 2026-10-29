# DataDome

**Complexity: ⭐⭐⭐⭐⭐ (Very High)**

DataDome is an enterprise bot-management platform used by marketplaces, travel sites, ticketing and e-commerce. It combines device fingerprinting, behavioural analysis, IP reputation, TLS/HTTP fingerprinting and a challenge system. Its CAPTCHA is only the visible last resort — most requests are blocked or silently scored before any puzzle appears.

#### How it looks:
<img src="../../assets/images/captchas/datadome-captcha.svg" alt="DataDome" height="200">

#### Challenge types:
- **"Press & Hold"** button (the most common DataDome challenge)
- **Slider puzzle** — move a piece into the gap
- **Device check / "Please verify you are a human"** interstitial
- Silent blocking (403) without any visible challenge

#### How to identify:
- Iframe or script from `captcha-delivery.com` or `js.datadome.co`
- Response header `x-dd-b` and/or `set-cookie: datadome=...`
- HTTP 403 with a small HTML page containing the DataDome challenge
- Network requests to `https://geo.captcha-delivery.com/`
- Text like "Please verify you are a human" or "Press & Hold"

#### How it works:
1. Every request is scored using fingerprint, behaviour, IP and TLS signals.
2. Suspicious traffic receives a challenge page or a `datadome` cookie with a challenge payload.
3. Solving the challenge (press-and-hold or slider) issues a valid `datadome` cookie.
4. The cookie is bound to the client's IP, User-Agent and fingerprint; reusing it elsewhere fails.
5. DataDome continuously re-evaluates the session, so a cookie can expire mid-scrape.

---

### Free bypass methods

| Method | Description | Success Rate | Link |
|--------|-------------|--------------|------|
| **PuzzleSolver** | 🔥 OpenCV slider/gap detection for the puzzle variant | 70-85% (after challenge appears) | [vsmutok/Puzzle-Captcha-Solver](https://github.com/vsmutok/Puzzle-Captcha-Solver) |
| **DrissionPage** | 🔥 Real Chromium with fewer automation leaks | 50-70% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Camoufox** | Anti-detect Firefox; strong fingerprint spoofing | 50-75% | [daijro/camoufox](https://github.com/daijro/camoufox) |
| **Patchright** | Stealth-patched Playwright | 45-70% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) |
| **undetected-chromedriver** | Patched Selenium | 40-65% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |
| **curl_cffi** | TLS/JA3 impersonation for lighter requests | 40-65% | [lexiforest/curl_cffi](https://github.com/lexiforest/curl_cffi) |

> Success rates are much lower than for widget CAPTCHAs because the challenge is only part of the problem. A perfect slider solve on a flagged IP still loops or gets blocked.

### Press & Hold approach
1. Detect the challenge iframe (`captcha-delivery.com`).
2. Move the mouse to the button along a curved path.
3. Press and hold for a randomized 4–10 seconds, with tiny jitter.
4. Release, wait for the redirect/reload, and keep the resulting cookies.
5. Reuse the same browser session for the target requests; don't export cookies to another IP.

### Slider approach
1. Screenshot the background and the puzzle piece.
2. Find the gap with template matching / edge detection (PuzzleSolver).
3. Drag with an ease-in/ease-out curve and 2–5 px jitter.
4. Verify that the page actually navigated; DataDome often re-challenges.

### Practical tips
- **Residential/mobile proxies are mandatory** in practice; datacenter IPs are usually blocked before the challenge.
- Keep a persistent profile: cookies, localStorage, fonts, timezone and WebGL must stay consistent.
- Warm up the session (home page → category → product → target) before hitting protected endpoints.
- DataDome hates unrealistic speed: throttle requests, reuse connections, and avoid parallel bursts from one profile.
- Solve the challenge in the same browser that will make the requests.
- Don't retry in a tight loop; repeated failures raise the risk score and extend the block.

---

#### 💰 Paid alternatives:

DataDome is usually solved by **unblocker APIs**, not by token services:

| Service | Notes |
|---------|-------|
| **Bright Data Web Unlocker** | Handles DataDome server-side; residential proxy pool |
| **ZenRows** | Anti-bot API with DataDome support |
| **ScrapingBee** | Unblocker with JS rendering |
| **Oxylabs Web Unblocker** | Enterprise-grade unblocking |
| **ScraperAPI** | Simpler unblocker; check DataDome coverage |
| **CapSolver / 2Captcha** | May support the visible slider/press-and-hold, but not the fingerprinting layer |

If free methods don't work, use an unblocker API or a paid solver. More details in the [Paid services](../solvers.md#paid-services-api) section.
