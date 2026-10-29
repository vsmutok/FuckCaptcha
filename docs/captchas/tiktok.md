# TikTok CAPTCHA

**Complexity: ⭐⭐⭐⭐ (High)**

TikTok (ByteDance) uses a custom image-puzzle CAPTCHA shared across TikTok, CapCut, Lark, and Douyin. It comes in four visual variants: slide, rotate ("whirl"), 3D object matching, and icon selection. The challenge is bound to the device ID, cookies, and session IP, so a token generated elsewhere is useless — the answer must be applied in the same session.

#### How it looks:
<img src="../../assets/images/captchas/tiktok.svg" alt="TikTok CAPTCHA" height="200">

#### How to identify:
- Wide background with a cut-out gap and a separate puzzle piece (slide)
- Two concentric circular images (whirl/rotate)
- Several 3D-rendered objects with a "find the matching pair" prompt
- An image plus a text instruction to click matching icons
- Requests tied to `device_id`, `iid`, and TikTok/ByteDance anti-bot endpoints
- A drag or click challenge that re-issues on failure

#### Common variants:
| Variant | Task | Answer format |
|---------|------|---------------|
| Slide | Drag the piece into the gap | X distance / proportion |
| Whirl | Rotate the inner disc to align with the ring | Angle / drag distance |
| 3D | Click the two matching 3D objects | Two points |
| Icon | Click the icons matching the prompt, in order | List of points |

#### How it works:
1. The client requests a challenge as part of login, registration, or a risk-triggered action.
2. The server returns one or more images and the challenge type.
3. The user performs the drag/rotation/click; the client records the trajectory and timing.
4. The answer is submitted with device and session identifiers.
5. TikTok validates the answer and the behaviour; a wrong position or an unnatural trajectory fails.
6. A failed attempt issues a fresh challenge; there is no long-lived token to reuse.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **OpenCV `matchTemplate`** | 🔥 Slide gap detection with Sobel/Canny preprocessing | 75–92% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **PuzzleSolver** | Slide solver with human-like drag paths | 70–90% | [vsmutok/Puzzle-Captcha-Solver](https://github.com/vsmutok/Puzzle-Captcha-Solver) |
| **xtekky/TikTok-Captcha-Solver** | Research solver for the slide puzzle | experimental | [xtekky/TikTok-Captcha-Solver](https://github.com/xtekky/TikTok-Captcha-Solver) |
| **YOLOv8 / CLIP** | Detect 3D objects and match icons | 70–90% (trained) | [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) · [openai/CLIP](https://github.com/openai/CLIP) |
| **DrissionPage / Playwright** | Perform the drag/click in the real session | 60–85% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) · [microsoft/playwright-python](https://github.com/microsoft/playwright-python) |

### Practical approach
1. Extract the original challenge images from the network response; keep their dimensions and transparency.
2. Identify the variant: wide background + piece = slide; concentric circles = whirl; multiple 3D objects = match; prompt + icons = icon.
3. For slide, use Sobel/Canny + `matchTemplate` to find the gap, then drag with an eased, jittered path.
4. For whirl, estimate the rotation angle and drag along the circular track.
5. For 3D/icon, use a detector or classifier and click the targets in the requested order.
6. Perform the action in the same browser session and submit immediately.

### Practical tips
- A token minted on another device/IP will be rejected; the challenge is session-bound.
- The drag trajectory is inspected — a straight, constant-speed drag fails even at the correct position.
- Use the original image bytes, not a resized screenshot; geometry changes break the answer.
- A failed attempt re-issues the challenge; retry with a new trajectory.
- TikTok rotates variants frequently; keep fallbacks for slide, whirl, 3D, and icon.
- Mobile and desktop deployments may use different challenge sets.

---

#### 💰 Paid alternatives:

| Service | Notes |
|---------|-------|
| **SadCaptcha** | TikTok-specific solver with slide/rotate/3D/icon coverage |
| **Capzy** | TikTok/ByteDance image-puzzle API; returns the move, not a token |
| **2Captcha / CapSolver** | May support some TikTok variants; check current coverage |

More details in the [Paid services](../solvers.md#paid-services-api) section.
