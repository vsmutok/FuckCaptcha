# ATB Captcha (atbCAPTCHA)

**Complexity: ⭐⭐⭐ (Medium)**

atbCAPTCHA is a behavioural risk-control system that renders a click, slider, image-alignment or invisible challenge depending on the risk score. It is used in finance, telecom, e-commerce and IoT, and it validates traffic in several stages rather than with a single puzzle.

#### How it looks:
<img src="../../assets/images/captchas/atbcaptcha.svg" alt="ATB Captcha" height="200">

#### Challenge types:
- **Slider** — align a piece or a cut-out
- **Image click** — click/align certain images
- **Invisible** — silent token issue for low-risk sessions
- **Multi-stage validation** — additional checks after the visible task

#### How to identify:
- Global `appId` and `apiServer` parameters in the page source
- `apiServer` often points to `https://cap.aisecurius.com`
- JS SDK initialization with a `success` callback: `as.Captcha(element, {appId, apiServer, success})`
- Token passed to the callback (often starts with a short prefix and a colon)
- atbCAPTCHA branding or a widget loaded from the `apiServer` domain
- Hidden form field or JS callback receiving the final token

#### How it works:
1. The page initializes the widget with `appId` and `apiServer`.
2. The client requests a challenge; atbCAPTCHA chooses the type based on risk.
3. The visible task (or invisible check) produces a token.
4. The token is passed to the site's `success` callback and submitted to the backend.
5. atbCAPTCHA validates the token together with IP, UA, timing and behavioural signals.

---

### Free bypass methods

| Method | Description | Success Rate | Link |
|--------|-------------|--------------|------|
| **DrissionPage** | 🔥 Real Chromium; run the widget and capture the callback token | 70-85% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **OpenCV** | Slider/gap detection (template matching, edge detection) | 70-90% (visible slider) | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **ddddocr** | OCR/object detection for image tasks | 65-85% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **YOLOv8** | Detect target images for click/align challenges | 70-90% (with a trained model) | [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) |
| **Patchright / Camoufox** | Stealth browsers to keep the risk score low | 60-85% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) |
| **undetected-chromedriver** | Patched Selenium | 60-80% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |

### Practical approach
1. Extract `appId`, `apiServer` and the page URL.
2. Open the page in a real browser with a clean residential IP.
3. If an invisible check runs, wait for the `success` callback.
4. If a slider appears, solve it with OpenCV + a human-like drag.
5. If an image task appears, detect the requested images and click them in order.
6. Capture the token from the callback or the hidden field and submit it immediately.

### Practical tips
- The token is tied to the IP/UA that solved it; use the same proxy for solving and submission.
- atbCAPTCHA has multiple validation stages — passing the visible puzzle does not guarantee the token will be accepted if the fingerprint is bad.
- Use residential proxies; datacenter IPs are usually scored as high risk.
- Don't reload the widget after solving; the token may be invalidated.
- Keep mouse trajectories natural — risk-adaptive systems check the interaction, not only the final answer.

---

#### 💰 Paid alternatives:

| Service | atbCAPTCHA support | Notes |
|---------|--------------------|-------|
| **2Captcha** | `AtbCaptchaTaskProxyless` / `AtbCaptchaTask` | Requires `websiteURL`, `appId`, `apiServer` |
| **DeathByCaptcha** | Type 24 | Sends the same `appId`/`apiServer` payload |
| **CapSolver** | atbCAPTCHA | Check the current task list |
| **Anti-Captcha** | Availability varies | Check the task list |

If free methods don't work, use API services: **2Captcha** or **DeathByCaptcha**. More details in the [Paid services](../solvers.md#paid-services-api) section.
