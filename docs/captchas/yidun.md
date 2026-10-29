# Yidun (NetEase) Captcha

**Complexity: ⭐⭐⭐ (Medium)**

Yidun (易盾) is NetEase's CAPTCHA and risk-control platform, widely used by Chinese sites for login, registration, and comment forms. The default widget is a slider puzzle, but deployments can switch to icon clicks, word selection, or a simple checkbox depending on the risk score.

#### How it looks:
<img src="../../assets/images/captchas/yidun.svg" alt="Yidun Captcha" height="200">

#### How to identify:
- Hidden field `NECaptchaValidate` containing a Base64 value
- Scripts and assets from `cstaticdun.126.net` / `dun.163.com`
- Container with classes like `yidun`, `yidun_slider`, `yidun_bg-img`, `yidun_jigsaw`
- Prompt "请向右滑动完成拼图" / "Slide to complete the puzzle"
- `captchaId` — a 32-character hex string passed to `initNECaptcha`
- Verification requests to `c.dun.163.com`

#### Common challenge types:
- **Slide** — drag a jigsaw piece into the gap.
- **Click** — click the requested characters or icons in order.
- **Icon / word** — select matching symbols from a grid.
- **Checkbox** — low-risk sessions may pass after a single click.

#### How it works:
1. The page calls `initNECaptcha` with the `captchaId` and renders the widget.
2. After the user solves the challenge, the SDK writes a Base64 token to the `NECaptchaValidate` field.
3. The site backend posts the token to Yidun's verification API (`c.dun.163.com/api/v2/verify`) together with the `captchaId`, a user identifier, and a signed request (`secretId`, timestamp, nonce, signature).
4. A successful verification returns a pass result; the token is single-use and expires after roughly 20 minutes.
5. The token is bound to the challenge and usually to the session, so it must be submitted from the same client.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **OpenCV template matching** | 🔥 Locate the gap with `matchTemplate` / edge detection, then drag | 70–90% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **PuzzleSolver** | Reusable slider solver with human-like trajectories | 70–90% | [vsmutok/Puzzle-Captcha-Solver](https://github.com/vsmutok/Puzzle-Captcha-Solver) |
| **ddddocr** | Detect slider gaps and simple click targets | 65–85% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **YOLOv8** | Train a detector for icon/word click challenges | 80–95% (trained) | [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) |
| **DrissionPage / Playwright** | Reliable widget automation and token extraction | 70–90% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) · [microsoft/playwright-python](https://github.com/microsoft/playwright-python) |

### Practical approach
1. Open the page in a real browser and wait for the Yidun widget to render.
2. Capture the background and the puzzle piece as separate images (avoid screenshots that rescale them).
3. Use Canny edges + `matchTemplate` to find the gap's x-coordinate.
4. Drag the slider with an eased, slightly jittered path; a straight instant drag is rejected.
5. Wait for the success state, then read `NECaptchaValidate` and submit the form.
6. If the challenge upgrades to click/icon mode, switch to a detector or a paid service.

### Practical tips
- The background and piece are often served as separate images; use the originals to preserve dimensions.
- Yidun checks the drag trajectory, not just the final offset.
- A failed attempt usually issues a fresh challenge; retry with a new trajectory rather than repeating the same one.
- `NECaptchaValidate` is Base64 and may need URL-encoding when submitted.
- Match the browser locale and IP to the target site; Chinese sites often score foreign sessions more aggressively.

---

#### 💰 Paid alternatives:

| Service | Notes |
|---------|-------|
| **2Captcha** | Offers Yidun tasks; check the current task type and required fields |
| **CapSolver** | Supports Yidun slide and click challenges |
| **Browser APIs** | Useful when the widget is part of a larger risk-control flow |

More details in the [Paid services](../solvers.md#paid-services-api) section.
