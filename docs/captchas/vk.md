# VK Captcha

**Complexity: ⭐⭐⭐⭐ (High)**

VK (VKontakte) uses its own CAPTCHA stack under the VK ID brand. Since 2026 the old image CAPTCHA (`captcha_sid` / `captcha_img`) has been replaced by a JavaScript-heavy "not a robot" widget that combines a proof-of-work, browser fingerprinting, and an optional slider. It appears on login, registration, password recovery, and API error 14 responses.

#### How it looks:
<img src="../../assets/images/captchas/vkcaptcha.svg" alt="VK Captcha" height="200">

#### How to identify:
- Page or iframe on `id.vk.com` / `id.vk.ru` with a path like `/not_robot_captcha`
- Checkbox `#not-robot-captcha-checkbox`
- Large obfuscated script `not_robot_captcha.js`
- A slider variant for suspicious sessions
- VK API error `error_code: 14`, `error_msg: "Captcha needed"` with `redirect_uri` and `remixstlid`
- Legacy fields `captcha_sid` and `captcha_img` only on old integrations

#### How it works:
1. The VK API or login page returns a captcha error containing `redirect_uri`, a temporary user identifier `remixstlid`, and sometimes `captcha_sid` / `captcha_img` for legacy clients.
2. The client opens the VK ID captcha page and runs `not_robot_captcha.js`.
3. The script calls `captchaNotRobot.initSession` and `captchaNotRobot.check`, solving a proof-of-work and collecting a FingerprintJS `browser_fp` plus device and network signals.
4. The proof-of-work is submitted as `v2.` + Base64(JSON `{hash, nonce}`), and the check request includes `debug_info` and interaction data.
5. On success, VK returns `success_token`.
6. The original API request is repeated with `success_token` and `remixstlid` (the cookie and the parameter must match).
7. The token is bound to the session, browser fingerprint, and IP.

#### Why it is hard:
- The proof-of-work is only one layer; the browser fingerprint must be consistent.
- `browser_fp` is a FingerprintJS visitor ID derived from canvas, WebGL, fonts, and other signals — it cannot be fabricated from plain HTTP.
- The script is heavily obfuscated and changes often.
- The `debug_info` field and request timing are checked for automation.
- A valid token is rejected if `remixstlid` is missing or does not match the session.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **Playwright + real Chromium** | 🔥 Drive the official widget, click the checkbox, intercept `success_token` | 60–85% | [microsoft/playwright-python](https://github.com/microsoft/playwright-python) |
| **Patchright / Camoufox** | Reduce CDP and headless fingerprints for the FingerprintJS check | 50–80% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) · [daijro/camoufox](https://github.com/daijro/camoufox) |
| **vk-captcha-solver (npm)** | Community solver for the VK ID captcha page | experimental | [@tripoloski/vk-captcha-solver](https://www.npmjs.com/package/@tripoloski/vk-captcha-solver) |
| **DrissionPage** | Browser automation with better control over the VK ID iframe | 50–75% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |

### Practical approach
1. Use a persistent browser profile with a residential IP in the target region.
2. Trigger the captcha naturally (login, registration, or a controlled API call).
3. Open the `redirect_uri`, wait for `#not-robot-captcha-checkbox`, and click it with a Bezier mouse path.
4. If a slider appears, solve it with OpenCV template matching and a human-like drag.
5. Intercept the `captchaNotRobot.check` response and extract `success_token`.
6. Replay the original request with both `success_token` and the `remixstlid` cookie/parameter.
7. Keep the same browser context, cookies, User-Agent, and IP through the whole flow.

### Practical tips
- Do not strip or randomize `debug_info`; a random value is a strong bot signal.
- Ensure `initSession` runs before `check`; skipping it causes `status: BOT`.
- Keep the `remixstlid` cookie from the captcha page — the token alone is not enough.
- Use a real browser for the fingerprint; HTTP-only solvers need a full reverse-engineering of the fingerprint payload.
- Slider success depends on trajectory quality, not just the final position.
- VK changes the flow frequently; pin a known-good script version only for research, never for production bypass.

---

#### 💰 Paid alternatives:

| Service | Notes |
|---------|-------|
| **2Captcha / CapSolver** | VK support changes often; check whether the current VK ID flow is covered |
| **Residential proxies** | Essential: the token is bound to the session IP |
| **Browser APIs (Bright Data, ZenRows)** | Run the full widget in a real browser session |

More details in the [Paid services](../solvers.md#paid-services-api) section.
