# Capy Puzzle

**Complexity: ⭐⭐ (Below average)**

Capy (capy.me) is a Japanese CAPTCHA service best known for its jigsaw puzzle: the user drags a puzzle piece into the correct spot to complete an image. It also offers a text CAPTCHA. The widget is simple and predictable, which makes it one of the easier slider puzzles to automate.

#### How it looks:
<img src="../../assets/images/captchas/capy.svg" alt="Capy Puzzle" height="200">

#### How to identify:
- Jigsaw puzzle with a draggable piece: "Drag the puzzle piece"
- Public key starting with `PUZZLE_` (e.g., `PUZZLE_sample...`)
- Requests to `api.capy.me` (or a regional host such as `jp.api.capy.me`)
- Form fields `capy_captchakey`, `capy_challengekey`, `capy_answer`
- Private key starting with `KEY_` on the server side (never in the browser)
- Optional "onetime" CAPTCHA mode tied to a username/cookie

#### How it works:
1. The page loads the puzzle using a public puzzle key and receives a `capy_challengekey`.
2. The user drags the piece; the browser computes coordinate data (`capy_answer`, e.g., `10,20,30,40,`).
3. The site's backend POSTs `capy_challengekey`, `capy_privatekey` and `capy_answer` to `https://jp.api.capy.me/puzzle/verify` (or the configured regional host).
4. On success the server returns `true`; on failure a specific error code (`incorrect-answer`, `invalid-challenge-key`, etc.).
5. Some deployments use the text CAPTCHA endpoint (`gimpy/verify`) and a one-time mode.

---

### Free bypass methods

| Method | Description | Success Rate | Link |
|--------|-------------|--------------|------|
| **OpenCV template matching** | 🔥 Find the gap/piece position, then drag | 85-95% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **PuzzleSolver** | OpenCV gap detection with a human-like drag | 85-95% | [vsmutok/Puzzle-Captcha-Solver](https://github.com/vsmutok/Puzzle-Captcha-Solver) |
| **ddddocr** | Piece/gap recognition fallback | 75-90% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **DrissionPage** | Real browser to execute the widget and callbacks | 80-90% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Patchright** | Stealth Playwright for session-bound flows | 75-90% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) |

### Slider pipeline
1. Capture the background and the puzzle piece.
2. Remove transparency/whitespace and run edge detection.
3. Match the piece against the background (`TM_CCOEFF_NORMED`); the best match is the target gap.
4. Scale the distance to the actual slider pixel width.
5. Drag with an ease-in/ease-out curve, 2–5 px jitter and a small overshoot.
6. Submit and keep the same session/cookies.

### Practical tips
- The answer format is coordinate-based; if you reimplement the flow, match the exact format the widget uses.
- Keep the page session alive: `capy_challengekey` is tied to it.
- Use a human-like drag; Capy checks trajectory and timing on many deployments.
- The server verifies with a private key, so the answer must be correct — you cannot forge `true`.
- If the site enables the one-time mode, reuse the same username/cookie throughout the flow.

---

#### 💰 Paid alternatives:

| Service | Capy support | Notes |
|---------|--------------|-------|
| **2Captcha** | Capy Puzzle task | Returns `captchakey`, `challengekey`, `answer` |
| **CapSolver** | Capy Puzzle | Fast, AI-based |
| **Anti-Captcha** | Capy (check task list) | Availability varies |
| **DeathByCaptcha** | Capy (check task list) | Availability varies |

If free methods don't work, use API services: **2Captcha** or **CapSolver**. More details in the [Paid services](../solvers.md#paid-services-api) section.
