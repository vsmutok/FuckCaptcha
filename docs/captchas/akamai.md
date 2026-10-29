# Akamai Bot Manager

**Complexity: ⭐⭐⭐⭐⭐ (Very High)**

Akamai Bot Manager is an enterprise bot-detection layer that protects many large retail, banking, and travel sites. Most visitors never see a CAPTCHA: Akamai scores the session and either serves the page, issues a JavaScript sensor challenge, or returns an "Access Denied" page. The visible CAPTCHA, when present, is usually a separate product layered on top.

#### How it looks:
<img src="../../assets/images/captchas/akamai.svg" alt="Akamai Access Denied" height="200">

#### How to identify:
- Cookies `_abck`, `bm_sz`, `ak_bmsc`, `bm_sv`, `bm_s`, `bm_so`, `sec_cpt`
- `_abck` value with `~`-separated fields, e.g. `...~-1~...` (unvalidated) or `...~0~...` (validated)
- Sensor script served from a first-party path or `/_bm/_orchestration_/`
- `POST` with JSON body `{"sensor_data":"2;...;<ciphertext>"}`
- `Server: AkamaiGHost` on blocked responses
- "Access Denied" page with a reference ID
- `Akamai-BM-Telemetry` header on some API endpoints

#### How it works:
1. Akamai scores the first request using IP, TLS, headers, and cookies.
2. The page loads a sensor script that collects browser and device signals.
3. The script posts `sensor_data` back to the edge; the response updates `_abck`.
4. A validated `_abck` contains `~0~` in the state field; `~-1~` means not validated yet.
5. Protected endpoints require a valid `_abck` and may also check `bm_sz`, `bm_sv`, or a telemetry header.
6. Some deployments use SBSD/Content Protector, which adds tarpitting and additional cookies (`sec_cpt`, `sbsd`).
7. A `201 {"success":true}` response to a sensor post is not proof of validation — always check `_abck` and the protected request.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **Patchright / Camoufox** | 🔥 Stealth browsers for the sensor challenge and cookie warm-up | 40–70% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) · [daijro/camoufox](https://github.com/daijro/camoufox) |
| **DrissionPage** | Real Chromium session with cookie inspection | 35–65% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **SeleniumBase UC mode** | Patched Selenium for JS sensor pages | 35–60% | [seleniumbase/SeleniumBase](https://github.com/seleniumbase/SeleniumBase) |
| **curl_cffi** | TLS/JA3 impersonation after warming cookies | 25–50% | [lexiforest/curl_cffi](https://github.com/lexiforest/curl_cffi) |
| **nodriver** | CDP automation with fewer default leaks | 30–55% | [ultrafunkamsterdam/nodriver](https://github.com/ultrafunkamsterdam/nodriver) |

### Practical approach
1. Warm up the session in a real browser: load the homepage, let the sensor script run, and keep the cookie jar.
2. Inspect `_abck` after the sensor post; wait for the `~0~` state or verify with a protected request.
3. Reuse the same cookies, User-Agent, Accept-Language, and client hints for API calls.
4. Pace requests like a human; sending sensor posts back-to-back is a strong bot signal.
5. If the site uses SBSD/Content Protector, expect tarpitting and slower responses; do not retry aggressively.
6. For login or checkout endpoints, prefer a full browser session over raw HTTP.

### Practical tips
- `_abck` is opaque: send it back exactly as received, never reconstruct it.
- The `bm_sz` value is used by the sensor; dropping it can invalidate the session.
- Cookie names and schemes change between tenants; snapshot the whole jar by name.
- A validated cookie can be downscored by later behaviour, so keep the session consistent.
- Homepages are often lightly protected; test on the actual protected endpoint.
- Akamai may run alongside another vendor (e.g. `__uzm*` cookies); do not assume a single system.

---

#### 💰 Paid alternatives:

| Service | Notes |
|---------|-------|
| **Bright Data / ZenRows / ScrapingBee / Oxylabs** | Managed unblockers that handle Akamai sensor sessions |
| **Residential proxies** | Essential for IP reputation and session consistency |
| **Sensor-data APIs** | Specialised services generate `sensor_data`; coverage varies by Akamai version |

More details in the [Paid services](../solvers.md#paid-services-api) section.
