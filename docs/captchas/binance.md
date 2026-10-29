# Binance CAPTCHA

**Complexity: ⭐⭐⭐⭐ (High)**

Binance uses a custom CAPTCHA stack (`bCAPTCHA2`) on login, registration, password recovery, and sensitive actions. The first challenge is usually a slider puzzle; repeated failures can upgrade it to a grid/box selection. The answer is bound to a device fingerprint and a signed request, so a correct slide alone is not enough.

#### How it looks:
<img src="../../assets/images/captchas/binance.svg" alt="Binance CAPTCHA" height="200">

#### How to identify:
- Requests under `accounts.binance.com` and `bin.bnbstatic.com`
- `POST /bapi/accounts/v1/public/account/security/request/precheck` returning `captchaType: "bCAPTCHA2"`
- `POST /bapi/composite/v1/public/antibot/getCaptcha`
- Response fields `sig`, `salt`, `path2`, `ek`, `captchaType`, `tag`
- `POST /bapi/composite/v1/public/antibot/validateCaptcha`
- Token with the `captcha#` prefix
- `device-info`, `captcha-sdk-version`, `x-captcha-se`, `bnc-uuid` headers
- Slider text "Slide to complete the puzzle"

#### How it works:
1. The client calls the precheck endpoint with an email/biz type and receives `captchaType`, `sessionId`, `validateId`, and `validationTypes`.
2. `getCaptcha` returns the challenge metadata: `sig`, `salt`, `path2` (relative image path), `ek`, `captchaType`, and `tag`.
3. The image is loaded from `https://bin.bnbstatic.com` + `path2`.
4. The user solves the slide; the client sends the encrypted mouse trajectory and fingerprint data as `data`, plus a signature `s`, to `validateCaptcha`.
5. A successful response returns a token prefixed with `captcha#`, which is submitted with `sessionId` and `validateCodeType`.
6. If the risk score stays high, the challenge upgrades to a `BOX` grid selection.
7. The flow is undocumented and changes; field names are not a stable API.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **PuzzleSolver** | 🔥 Slide solver with gap detection and human-like drag | 70–90% | [vsmutok/Puzzle-Captcha-Solver](https://github.com/vsmutok/Puzzle-Captcha-Solver) |
| **OpenCV `matchTemplate`** | Canny edges + template matching for the puzzle gap | 75–92% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **DrissionPage / Playwright** | Drive the real widget and submit the trajectory in-session | 60–85% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) · [microsoft/playwright-python](https://github.com/microsoft/playwright-python) |
| **Patchright / Camoufox** | Reduce fingerprint and automation signals | 50–80% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) · [daijro/camoufox](https://github.com/daijro/camoufox) |
| **YOLOv8** | Detect targets for the BOX grid fallback | 80–95% (trained) | [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) |

### Practical approach
1. Use a real browser session with a consistent device fingerprint and a residential IP.
2. Trigger the challenge through the normal login/precheck flow; do not call undocumented endpoints cold.
3. Capture the original `bg` and piece images from the `getCaptcha` response.
4. Compute the gap position with Canny + `matchTemplate`, accounting for the image scale.
5. Perform a human-like drag with acceleration, slight overshoot, and jitter.
6. Submit the encrypted trajectory exactly as the page does; do not replace it with a simple x-coordinate.
7. Keep the `captcha#` prefix on the token and submit it with the matching `sessionId`.

### Practical tips
- `path2` is relative: prepend `https://bin.bnbstatic.com`.
- The token prefix `captcha#` is part of the value; truncating it causes a failure.
- Solving the CAPTCHA does not guarantee login — device fingerprinting and account risk checks run afterwards.
- The challenge upgrades to BOX after repeated failures; a fresh session is often better than retrying.
- This flow is unofficial and changes without notice; treat endpoint and field names as volatile.
- Avoid high-frequency attempts; Binance rate-limits and locks accounts aggressively.

---

#### 💰 Paid alternatives:

| Service | Notes |
|---------|-------|
| **2Captcha / CapSolver** | May support Binance slide challenges; check the current task type |
| **Specialised Binance solvers** | Some services target the full `bCAPTCHA2` flow, including the trajectory payload |
| **Residential proxies** | Essential for a consistent session and device score |

More details in the [Paid services](../solvers.md#paid-services-api) section.
