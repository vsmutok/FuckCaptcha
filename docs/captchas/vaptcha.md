# VAPTCHA

**Complexity: ⭐⭐⭐ (Medium)**

VAPTCHA is a Chinese CAPTCHA provider whose widget has evolved from a click-based challenge to a mix of click, slide, and 3D tasks. It is common on Chinese registration and login pages. The modern V4 SDK is loaded from `cdn4.vaptcha.com`; older integrations still use the V3 script and API.

#### How it looks:
<img src="../../assets/images/captchas/vaptcha.svg" alt="VAPTCHA" height="200">

#### How to identify:
- Script `https://cdn4.vaptcha.com/src/v4.js` (V4) or `https://v-cn.vaptcha.com/v3.js` (V3)
- Global `vaptcha(...)` initializer with `vid` and `vkey`
- Container with a "点击完成验证" / "Click to verify" button
- Click challenge with several icons and an instruction
- Slide or 3D challenge for riskier sessions
- Token fields such as `vaptcha_token` / `vaptcha-token`

#### Common challenge types:
- **Click** — select the icons that match the prompt, in order.
- **Slide** — drag a piece into the gap.
- **3D** — rotate or manipulate an object.
- **Invisible** — low-risk sessions pass without interaction.

#### How it works:
1. The page initializes VAPTCHA with the public `vid` and the server-side `vkey`.
2. The SDK fetches the challenge configuration (`v4c.vaptcha.com/api/v1/config` in V4) and renders the widget.
3. The user solves the challenge; the SDK produces a token.
4. The token is sent to the site backend and verified against VAPTCHA's API (commonly `v41.vaptcha.com/api/v1/verify` in V4; check the current docs for the exact host and parameters).
5. Tokens are short-lived and single-use, and are bound to the challenge session.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **DrissionPage / Playwright** | 🔥 Drive the widget and extract the token after solving | 70–90% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) · [microsoft/playwright-python](https://github.com/microsoft/playwright-python) |
| **YOLOv8** | Detect click targets for icon challenges | 80–95% (trained) | [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) |
| **CLIP** | Zero-shot matching of icons to the prompt | 55–80% | [openai/CLIP](https://github.com/openai/CLIP) |
| **OpenCV** | Slider gap detection and template matching | 65–85% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **Patchright / Camoufox** | Reduce automation signals for invisible/passive mode | 60–85% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) · [daijro/camoufox](https://github.com/daijro/camoufox) |

### Practical approach
1. Load the page and wait for the VAPTCHA widget to initialize.
2. If the challenge is invisible, wait for the token to appear automatically.
3. For click challenges, capture the image, run detection/classification, and click the targets in the requested order.
4. For sliders, compute the gap position and drag with a human-like trajectory.
5. Read the token from the hidden field or the SDK callback and submit immediately.
6. Keep the same session and IP for solving and verification.

### Practical tips
- VAPTCHA has both client tokens and server tokens; make sure you extract the one the backend expects.
- The V3 and V4 APIs are different — do not mix scripts, tokens, or verification endpoints.
- Click order matters; a correct set in the wrong order fails.
- The token expires quickly, so avoid unnecessary navigation between solving and submitting.
- VAPTCHA is sensitive to browser fingerprints; a real browser is usually more reliable than raw HTTP.

---

#### 💰 Paid alternatives:

| Service | Notes |
|---------|-------|
| **2Captcha / CapSolver** | Both list VAPTCHA support; verify the current task schema and token format |
| **Browser APIs** | Useful for click/3D variants that are hard to outsource as a simple token |
| **Residential proxies** | Match the target region and keep the session consistent |

More details in the [Paid services](../solvers.md#paid-services-api) section.
