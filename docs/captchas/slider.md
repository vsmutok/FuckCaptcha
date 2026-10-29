# Slider CAPTCHA

**Complexity: ⭐⭐⭐ (Medium)**

Slider CAPTCHAs are a family rather than a single product: a background image with a gap, a puzzle piece, and a track with a handle. The user drags the piece into the gap (or rotates a disc, matches two shapes, or aligns a slider). They are popular because they are cheap to build, mobile-friendly, and easy to wrap in a risk engine.

#### How it looks:
<img src="../../assets/images/captchas/slider.svg" alt="Slider CAPTCHA" height="200">

#### How to identify:
- Background image with a cut-out gap and a separate puzzle piece
- Track with a draggable handle and text like "Slide to verify"
- Canvas or `<img>` elements for `bg` and `piece`
- Rotation variant with an inner disc and an outer ring
- Click variant with "select the matching shape" instructions
- Network requests that return the challenge images and a session ID

#### Common variants:
| Variant | What you do | Main challenge |
|---------|-------------|----------------|
| Jigsaw slide | Drag the piece into the gap | Gap detection |
| Gap fill | Drag a shape to the matching hole | Shape matching |
| Rotate | Spin the disc to the correct angle | Angle estimation |
| Multi-slide | Align several sliders | Multiple coordinates |
| Click-match | Click two identical objects | Object detection |

#### How it works:
1. The server generates a background, a piece, and the correct offset (and sometimes a tolerance).
2. The client renders the challenge and tracks the drag/click.
3. On submit, the client sends the offset, angle, or click coordinates — often together with the full trajectory and timing.
4. The server checks the answer within a tolerance and may also score the trajectory for human-likeness.
5. A failed attempt issues a new challenge; a successful one returns a token or sets a session flag.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **OpenCV `matchTemplate`** | 🔥 Find the gap by template matching or edge correlation | 80–95% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **PuzzleSolver** | End-to-end slider solver with human-like drag paths | 80–95% | [vsmutok/Puzzle-Captcha-Solver](https://github.com/vsmutok/Puzzle-Captcha-Solver) |
| **ddddocr** | Gap detection and simple slider helpers | 70–90% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **gtkit/slider** | Go solver with edge/template finders and trajectory models | 75–92% | [gtkit/slider](https://github.com/gtkit/slider) |
| **chushiyan/slide_captcha_cracking** | OpenCV tutorial with a complete example | 70–90% | [chushiyan/slide_captcha_cracking](https://github.com/chushiyan/slide_captcha_cracking) |
| **DrissionPage / Playwright** | Capture images and perform the drag in a real browser | 80–95% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) · [microsoft/playwright-python](https://github.com/microsoft/playwright-python) |

### Practical approach
1. Capture the original background and piece images from the network response, not a rescaled screenshot.
2. Preprocess: grayscale, blur, Canny/Sobel edges.
3. Run `matchTemplate` with `TM_CCOEFF_NORMED`; the best match gives the gap's top-left corner.
4. Convert the match position to the slider distance, accounting for the piece's initial offset and any CSS scaling.
5. Drag with an eased path: accelerate, overshoot slightly, correct back, add small Y-axis jitter.
6. Wait for the success state; if it fails, retry with a fresh challenge and a new trajectory.

### Practical tips
- Always use the image's natural dimensions; resizing breaks the coordinate math.
- The gap may be a dark region rather than a puzzle-shaped hole; try edge detection as a fallback.
- A straight, constant-speed drag is the most common failure mode.
- Some sliders check the release position only, others check the whole path; assume the stricter case.
- Rotate variants need angle estimation (e.g. feature matching or a trained model), not `matchTemplate`.
- Keep a retry budget: a wrong answer usually invalidates the challenge immediately.

---

#### 💰 Paid alternatives:

| Service | Notes |
|---------|-------|
| **2Captcha** | Image-to-text and Coordinates methods for custom sliders |
| **CapSolver** | Slider/jigsaw tasks for common providers |
| **DeathByCaptcha** | Image-based CAPTCHA and custom slider support |
| **Browser APIs** | Useful when the slider is wrapped in a larger risk flow |

More details in the [Paid services](../solvers.md#paid-services-api) section.
