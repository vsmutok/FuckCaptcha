# Tencent Captcha

**Complexity: ⭐⭐⭐ (Medium)**

Tencent Captcha (腾讯防水墙 / TCaptcha) is a CAPTCHA and bot-protection service used across Tencent products and many Chinese platforms (QQ, WeChat ecosystem, games, e-commerce). It typically shows a slider puzzle, an icon-click challenge ("click the characters in order") or a one-click verification.

#### How it looks:
<img src="../../assets/images/captchas/tencent.svg" alt="Tencent Captcha" height="200">

#### Challenge types:
- **Slider puzzle** — drag the piece into the gap
- **Icon click** — click the requested characters/icons in order
- **One-click** — behavioral verification, no puzzle
- **Invisible** — silent scoring for low-risk users

#### How to identify:
- Script `https://turing.captcha.qcloud.com/TCaptcha.js` or `https://ssl.captcha.qq.com/TCaptcha.js`
- Global `TencentCaptcha` constructor and `new TencentCaptcha(appId, callback)`
- Parameters `aid`, `appid`, `sess`, `ticket`, `randstr`
- Network calls to `turing.captcha.qcloud.com` or `captcha.qq.com`
- **Tencent / 腾讯** branding, Chinese UI text
- Hidden fields `ticket` and `randstr` submitted with the form

#### How it works:
1. The page creates a `TencentCaptcha` instance with an app ID.
2. The widget requests a challenge (`sess`/`aid`) from Tencent's servers.
3. The user solves it; the client sends the encrypted result and receives a `ticket` + `randstr`.
4. The site submits `ticket` and `randstr`; the backend verifies them with Tencent.
5. The ticket is single-use and time-limited; newer versions encrypt more of the payload.

---

### Free bypass methods

| Method | Description | Success Rate | Link |
|--------|-------------|--------------|------|
| **OpenCV** | 🔥 Template matching / edge detection for the slider gap | 75-90% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **PuzzleSolver** | OpenCV-based gap detection with human-like drag | 75-90% | [vsmutok/Puzzle-Captcha-Solver](https://github.com/vsmutok/Puzzle-Captcha-Solver) |
| **ddddocr** | OCR/object recognition for icon-click challenges | 70-85% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **DrissionPage** | 🔥 Real Chromium, handles widget callbacks | 70-85% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Patchright / Camoufox** | Stealth browsers for one-click/invisible modes | 65-85% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) |
| **YOLOv8** | Detect icons for click-order tasks | 75-90% (with a trained model) | [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) |

### Slider pipeline
1. Capture the background and the slider piece (canvas or image requests).
2. Find the gap with template matching (`TM_CCOEFF_NORMED`) or edge detection.
3. Scale the distance to the actual slider width.
4. Drag with an ease-in/ease-out curve, small overshoot and 2–5 px jitter.
5. Wait for the success callback and read `ticket`/`randstr`.

### Icon-click pipeline
1. Parse the instruction text (e.g., "请依次点击：猫、树、车").
2. Detect candidate icons (YOLO or template matching).
3. Click them in the requested order with realistic delays.
4. Confirm and extract the ticket.

### Practical tips
- The slider trajectory is checked: constant-speed straight drags are flagged.
- Tencent often ties the challenge to a Chinese IP and a real browser environment; foreign datacenter IPs get harder challenges or loops.
- The `ticket` is single-use; don't submit it twice.
- Newer widgets encrypt more parameters (`sess`, `aid`) — a real browser that runs the official JS is more stable than reimplementing the flow.
- If a one-click/invisible mode is used, focus on fingerprint and behaviour rather than on solving a puzzle.

---

#### 💰 Paid alternatives:

| Service | Tencent support | Notes |
|---------|-----------------|-------|
| **CapSolver** | Tencent Captcha | Fast, AI-based |
| **2Captcha** | Tencent Captcha (check current task list) | Token-based |
| **YesCaptcha** | Tencent Captcha | Popular with Chinese targets |
| **Anti-Captcha** | Availability varies | Check the task list before integrating |

If free methods don't work, use API services: **2Captcha**, **Anti-Captcha**, or **CapSolver**. More details in the [Paid services](../solvers.md#paid-services-api) section.
