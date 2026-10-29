# Imperva

**Complexity: ⭐⭐⭐⭐⭐ (Very High)**

Imperva (formerly Incapsula) is an enterprise bot-management and WAF platform. It does not always show a traditional CAPTCHA: suspicious clients get a JavaScript challenge, an "Access denied" interstitial, or a third-party CAPTCHA embedded in the block page. The decision is made from TLS, IP, cookie, and browser signals before a puzzle is ever displayed.

#### How it looks:
<img src="../../assets/images/captchas/imperva.svg" alt="Imperva challenge" height="200">

#### How to identify:
- Cookies `visid_incap_*`, `incap_ses_*`, `nlbi_*`, `___utmvc`
- Requests to `/_Incapsula_Resource?SWJIYLWA=...`
- Block page with an "Incapsula incident ID" or "Access to this page has been denied"
- JavaScript challenge that reloads the page after a short delay
- A reCAPTCHA, hCaptcha, or GeeTest widget embedded in the block page
- Response headers such as `X-Iinfo` and `X-CDN: Incapsula`

#### How it works:
1. The edge scores the first request using IP reputation, TLS/JA3 fingerprint, headers, and cookies.
2. Trusted clients get the page; suspicious ones receive a JavaScript challenge or a block page.
3. The challenge script collects browser signals and sets `___utmvc` / `incap_ses_*` cookies.
4. A valid cookie jar is required for subsequent requests; the challenge may be re-issued when the score drops.
5. Some deployments add a visible CAPTCHA (reCAPTCHA/hCaptcha/GeeTest) on top of the JS challenge.
6. There is no single "token" to solve — the session itself is the credential.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **Patchright / Camoufox** | 🔥 Stealth browsers with reduced automation fingerprints | 50–80% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) · [daijro/camoufox](https://github.com/daijro/camoufox) |
| **DrissionPage** | Real Chromium session with cookie/challenge handling | 45–75% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **SeleniumBase UC mode** | Patched Selenium for JS challenges | 45–75% | [seleniumbase/SeleniumBase](https://github.com/seleniumbase/SeleniumBase) |
| **curl_cffi** | Browser TLS/JA3 impersonation for API-heavy targets | 30–60% | [lexiforest/curl_cffi](https://github.com/lexiforest/curl_cffi) |
| **undetected-chromedriver / nodriver** | Patched Chrome automation | 40–70% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) · [ultrafunkamsterdam/nodriver](https://github.com/ultrafunkamsterdam/nodriver) |

### Practical approach
1. Use a persistent, real browser profile with a residential IP that matches the target region.
2. Open the target page and let the challenge script run; do not block it.
3. Wait for the block page to reload or the content to appear, then keep the full cookie jar.
4. Reuse the same cookies, User-Agent, and TLS fingerprint for subsequent requests.
5. If a visible CAPTCHA is embedded, solve that widget normally and continue in the same session.
6. For API endpoints, warm up the cookies in a browser first, then replay them with `curl_cffi`.

### Practical tips
- Imperva is a session-level product: solving one challenge does not guarantee access to every path.
- Datacenter IPs and mismatched TLS fingerprints are rejected before any JavaScript runs.
- A cold profile with no history is more suspicious; reuse a warmed profile when possible.
- Blocking analytics or challenge scripts often makes the score worse.
- Challenge pages and cookie names change between tenants and over time; do not hard-code a single flow.

---

#### 💰 Paid alternatives:

| Service | Notes |
|---------|-------|
| **Bright Data / ZenRows / ScrapingBee / Oxylabs** | Managed unblockers that handle Imperva sessions and cookies |
| **Residential proxies** | Essential for IP reputation; pair with a matching browser profile |
| **2Captcha / CapSolver** | Only useful if the block page embeds a supported CAPTCHA widget |

More details in the [Paid services](../solvers.md#paid-services-api) section.
