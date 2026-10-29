# Shumei Captcha

**Complexity: ⭐⭐⭐ (Medium)**

Shumei (数美) is a Chinese risk-control vendor whose CAPTCHA widget is common on registration, login, and marketing pages. It supports slide, click, rotate, and word challenges, and the widget is tightly integrated with Shumei's device fingerprinting and risk engine.

#### How it looks:
<img src="../../assets/images/captchas/shumei.svg" alt="Shumei Captcha" height="200">

#### How to identify:
- Requests to `captcha.fengkongcloud.cn`
- Endpoints `/ca/v1/conf`, `/ca/v1/register`, `/ca/v2/fverify`
- Parameters `organization`, `appId`, `model`, `rversion`, `sdkver`
- Container classes such as `smCaptcha`, `sm-button`, `sm-slider`
- Prompt "请完成安全验证" / "Please complete the security verification"
- A slider, rotating image, or click challenge

#### Common challenge types:
- **Slide** — drag a puzzle piece into the gap.
- **Rotate** — rotate an image to the correct angle.
- **Click** — select characters or icons in order.
- **Word** — type the displayed characters.

#### How it works:
1. The page calls `/ca/v1/conf` to load the configuration for the `organization` and `appId`.
2. `/ca/v1/register` returns the challenge assets (background `bg`, foreground `fg`, and a request ID `rid`).
3. The user solves the challenge; the SDK sends the answer to `/ca/v2/fverify` with the `rid` and risk signals.
4. On success, Shumei returns a pass token/result that the site backend verifies.
5. The challenge is bound to the `rid` and the session; answers are single-use and expire quickly.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **OpenCV template matching** | 🔥 Locate the slide gap from `bg` and `fg` | 70–90% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **PuzzleSolver** | Slider solver with eased drag trajectories | 70–90% | [vsmutok/Puzzle-Captcha-Solver](https://github.com/vsmutok/Puzzle-Captcha-Solver) |
| **ddddocr** | Gap detection and simple OCR/click helpers | 65–85% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **YOLOv8** | Detect click/icon targets | 80–95% (trained) | [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) |
| **DrissionPage / Playwright** | Capture assets and submit the answer in-session | 70–90% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) · [microsoft/playwright-python](https://github.com/microsoft/playwright-python) |

### Practical approach
1. Open the page and capture the `/ca/v1/register` response; use the original `bg` and `fg` images.
2. Compute the gap position with Canny edges and `matchTemplate`.
3. Drag the slider with acceleration, slight overshoot, and small Y-axis jitter.
4. Wait for the success callback, then submit the form with the returned token.
5. For rotate challenges, estimate the angle from the image and perform a curved drag.
6. For click challenges, use a detector or a maintained solver.

### Practical tips
- The `rid` ties the challenge to one attempt; do not reuse it after a failure.
- Shumei collects device fingerprints, so a real browser with a consistent profile is safer than raw HTTP.
- Match the Chinese locale and a regional IP when the target audience is in China.
- The slider gap may be subtle; use edge detection rather than raw pixel comparison.
- Repeated failures can upgrade the challenge type or block the session entirely.

---

#### 💰 Paid alternatives:

| Service | Notes |
|---------|-------|
| **CapSolver** | Lists Shumei slide/click support; check the current task type |
| **2Captcha** | May offer Shumei tasks depending on the challenge variant |
| **Browser APIs** | Better for rotate/click variants and risk-scored sessions |

More details in the [Paid services](../solvers.md#paid-services-api) section.
