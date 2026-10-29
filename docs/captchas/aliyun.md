# Aliyun Captcha

**Complexity: ⭐⭐⭐ (Medium)**

Aliyun Captcha (阿里云验证码 2.0) is Alibaba Cloud's CAPTCHA service. It is used across Alibaba properties and by many Chinese businesses. The widget supports slide, rotate, image-click, and word challenges, and the server verifies a signed `CaptchaVerifyParam` rather than a simple token.

#### How it looks:
<img src="../../assets/images/captchas/aliyun.svg" alt="Aliyun Captcha" height="200">

#### How to identify:
- Hidden field `CaptchaVerifyParam`
- `SceneId` configuration value in the page source
- Scripts from `o.alicdn.com/captcha-frontend/aliyunCaptcha/`
- Container with classes like `aliyun-captcha`, `aliyunCaptcha-*`
- Chinese prompt "请按住滑块，拖动到最右边" / "请完成以下验证"
- Verification API calls that return codes such as `T001`, `F001`, `F002`

#### Common challenge types:
- **Slide** — drag a puzzle piece into the gap.
- **Rotate** — rotate an image to the correct orientation.
- **Image click** — click the requested objects or characters.
- **Word** — type the displayed text.

#### How it works:
1. The page initializes the widget with a `SceneId` and loads the Aliyun Captcha script.
2. After solving, the SDK generates `CaptchaVerifyParam`:
   - **V2** — a JSON string with `sceneId`, `certifyId`, `deviceToken`, and `data`.
   - **V3** — a Base64-encoded parameter string.
3. The site backend calls Aliyun's verification API (server SDK `VerifyIntelligentCaptcha` / `VerifyCaptcha`) with the parameter.
4. The API returns a code; `T001` usually means verification passed, while `F...` codes indicate failure or risk rejection.
5. The parameter is single-use and expires quickly. It is bound to the scene and the session.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **OpenCV template matching** | 🔥 Solve slide/rotate challenges from the challenge images | 70–90% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **PuzzleSolver** | Slider gap detection with human-like drag | 70–90% | [vsmutok/Puzzle-Captcha-Solver](https://github.com/vsmutok/Puzzle-Captcha-Solver) |
| **YOLOv8** | Detect click targets in image challenges | 80–95% (trained) | [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) |
| **ddddocr / PaddleOCR** | Recognise word challenges | 60–85% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) · [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) |
| **DrissionPage / Playwright** | Drive the widget and extract `CaptchaVerifyParam` | 70–90% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) · [microsoft/playwright-python](https://github.com/microsoft/playwright-python) |

### Practical approach
1. Load the page and wait for the Aliyun widget to render.
2. Capture the challenge images from the network response, not from a rescaled screenshot.
3. Solve the slide/rotate task with OpenCV, or the click task with a detector.
4. Perform the drag/click with a natural trajectory.
5. Read `CaptchaVerifyParam` and submit it to the site immediately.
6. Keep the same browser session; the parameter is tied to the device token.

### Practical tips
- V2 and V3 parameters are different formats — confirm which one your target uses.
- `T001` is the common success code, but the exact code set depends on the API version.
- A valid parameter can still be rejected if the risk score is high; session quality matters.
- The `certifyId` and `deviceToken` must come from the same widget instance.
- Aliyun rotates challenge variants, so keep a fallback solver.

---

#### 💰 Paid alternatives:

| Service | Notes |
|---------|-------|
| **CapSolver** | Supports Aliyun Captcha; verify the current task type |
| **2Captcha** | May offer Aliyun tasks depending on the variant |
| **Browser APIs** | Useful when the parameter is bound to a risk-scored session |

More details in the [Paid services](../solvers.md#paid-services-api) section.
