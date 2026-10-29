# Arkose Labs / FunCaptcha

**Complexity: ⭐⭐⭐⭐ (High)**

Arkose Labs (formerly FunCaptcha) is an enterprise bot-management platform with adaptive, multi-round visual challenges. It is used by Roblox, Microsoft, EA, GitHub, Twitch and many other large sites. The challenge is chosen based on risk: a clean user may pass with one click, while a suspicious session gets several rounds of 3D rotation, shape matching or image selection.

#### How it looks:
<img src="../../assets/images/captchas/arkose.svg" alt="Arkose Labs" height="200">

#### Challenge types:
- **3D object rotation** — rotate an object until it matches the target orientation
- **Image/shape matching** — pick the image that matches the reference
- **"Match the pattern"** — select tiles in the correct order
- **Audio / text fallback** — less common, easier to automate
- **Multi-round enforcement** — several challenges in a row if risk stays high

#### How to identify:
- Iframe or script from `arkoselabs.com` or `funcaptcha.com`
- `data-pkey` / `public_key` / `pk=` parameter in the widget URL
- Hidden input `fc-token` (a long encrypted blob)
- Network calls to `/fc/api/` or `/fc/gt2/`
- **Arkose Labs** or **FunCaptcha** branding
- A full-page "Please verify" enforcement screen on enterprise setups

#### How it works:
1. The site loads the Arkose widget with a public key.
2. Arkose creates a session and returns a challenge (possibly multiple rounds).
3. The client solves it and Arkose returns an encrypted `fc-token`.
4. The site sends `fc-token` to its backend, which verifies it with Arkose.
5. The token is tied to the session, IP and risk score; replaying it elsewhere fails.

---

### Free bypass methods

| Method | Description | Success Rate | Link |
|--------|-------------|--------------|------|
| **OpenCV + template matching** | For static image/shape matching rounds | 60-85% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **YOLOv8 / CNN classifier** | Detect the target object and choose the matching tile | 70-90% | [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) |
| **Angle-regression CNN** | Predict the rotation angle for 3D object rounds | 60-85% | custom model (PyTorch/TensorFlow) |
| **Whisper** | Transcribe the audio fallback when it is offered | 80-95% | [openai/whisper](https://github.com/openai/whisper) |
| **DrissionPage** | 🔥 Real Chromium control; good for multi-round widgets | 60-85% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Camoufox / Patchright** | Stealth browsers to keep the risk score low | 60-85% | [daijro/camoufox](https://github.com/daijro/camoufox) |
| **undetected-chromedriver** | Patched Selenium for the widget flow | 50-75% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |

### Solving the rotation challenge
1. Capture the target image and the draggable object (canvas or iframe screenshot).
2. Estimate the current and target orientation. A simple approach: keypoint matching (SIFT/ORB) + homography; a stronger one: train a CNN regressor on synthetic rotations.
3. Drag the object along a curved, human-like path with small overshoot and variable speed.
4. Wait for the round animation; repeat if Arkose serves more rounds.
5. Submit the final `fc-token`.

### Practical tips
- Arkose is **adaptive**: a bad fingerprint or a flagged IP causes extra rounds even if every answer is correct.
- Keep a persistent browser profile and a residential/mobile IP; datacenter IPs often get endless enforcement.
- Don't replay `fc-token`; request a new one for each protected action.
- Multi-round challenges are time-sensitive — parallelize image analysis, not browser actions.
- The audio fallback is usually the cheapest route when Arkose exposes it.

---

#### 💰 Paid alternatives:

| Service | Arkose/FunCaptcha support | Notes |
|---------|---------------------------|-------|
| **2Captcha** | Yes (FunCaptcha / Arkose) | Token-based; proxy may be required |
| **Anti-Captcha** | Yes | Stable worker pool |
| **CapSolver** | Yes | Fast AI-based solving |
| **NopeCHA** | FunCaptcha | API + extension |
| **YesCaptcha** | FunCaptcha | Alternative provider |

If free methods don't work, use API services: **2Captcha**, **Anti-Captcha**, or **CapSolver**. More details in the [Paid services](../solvers.md#paid-services-api) section.
