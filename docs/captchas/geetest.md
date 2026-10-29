# GeeTest (v3 / v4)

**Complexity: ⭐⭐⭐ (Medium)**

GeeTest is a Chinese bot-management and CAPTCHA platform. It is widely used outside China too (marketplaces, crypto exchanges, TikTok-related services). Two major versions are still in the wild:

| Version | Typical challenge | Main parameters |
|---------|-------------------|-----------------|
| **v3** | Slide puzzle, icon click, "click in order" | `gt`, `challenge`, `validate`, `seccode` |
| **v4** | Slide puzzle / icon click with PoW + encrypted payload | `captcha_id`, `lot_number`, `payload`, `w` |

#### How it looks:
<img src="../../assets/images/captchas/geetest.svg" alt="GeeTest" height="200">

#### How to identify:
- Puzzle piece slider or "click on items in order"
- GeeTest logo / `geetest` in script or network requests
- v3: requests to `api.geetest.com` or `static.geetest.com` with `gt=` and `challenge=`
- v4: script `gcaptcha4.js`, calls with `captcha_id`, `lot_number`, `payload`, and a long encrypted `w` parameter
- Background image with a missing puzzle piece, or scattered icons to click in sequence

#### How it works:
1. The widget loads a challenge from GeeTest's servers.
2. The user drags the slider (or clicks icons); the browser collects mouse/touch trajectories and timing.
3. The client encrypts the result (in v4 the `w` parameter is AES/RSA-encrypted with values derived from the challenge).
4. GeeTest validates the encrypted payload and returns a `validate`/`seccode` token to the site.
5. Tokens are single-use and expire quickly.

---

## GeeTest v3

**Complexity: ⭐⭐⭐ (Medium)**

#### Free bypass methods:

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **PuzzleSolver** | 🔥 OpenCV template matching for the gap; human-like drag | 85-95% | [vsmutok/Puzzle-Captcha-Solver](https://github.com/vsmutok/Puzzle-Captcha-Solver) |
| **OpenCV** | Match the puzzle piece against the background (TM_CCOEFF_NORMED) | 80-95% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **ddddocr** | Built-in GeeTest slide support | 75-90% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **DrissionPage** | Handles widget interactions reliably | 80-90% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |

#### Slide puzzle pipeline:
1. Capture the background image and the puzzle-piece image (separate requests or canvas).
2. Remove whitespace/alpha, run edge detection, match the piece with the background.
3. Convert the horizontal distance to slider pixels (account for image scaling).
4. Generate a human-like drag trajectory: ease-in/ease-out, small overshoot, 2–5 px jitter, variable delays.
5. Trigger `gt` validation and submit the returned `validate`/`seccode`.

The trajectory is as important as the correct distance: a perfectly straight drag with constant speed is a strong bot signal.

---

## GeeTest v4

**Complexity: ⭐⭐⭐⭐ (High)**

v4 adds a proof-of-work step and encrypts the whole answer into the `w` parameter. The visible puzzle is only part of the challenge; the client-side JS also collects browser/environment signals.

#### Free bypass methods:

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **PuzzleSolver** | Supports GeeTest v4 images (slice + background) | 80-95% | [vsmutok/Puzzle-Captcha-Solver](https://github.com/vsmutok/Puzzle-Captcha-Solver) |
| **OpenCV** | Gap detection; feed the result into the site's own `w` builder | 75-90% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **DrissionPage** | Execute the real widget JS and let it build `w` | 75-90% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Playwright / Patchright** | Real browser context, easier reproduction of the JS flow | 70-90% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) |
| **ddddocr** | Slide distance recognition | 70-85% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |

#### Two practical approaches:
- **Browser-first (recommended):** run the real GeeTest JS in a stealth browser, solve the visual part, and let the page generate `w`. This avoids reimplementing the encryption and PoW.
- **Reverse-engineering:** extract the AES/RSA keys and PoW logic from `gcaptcha4.js`, build `w` yourself, and submit via HTTP. Faster and cheaper at scale, but breaks whenever GeeTest updates the script.

#### v4 tips:
- The `w` payload is tied to the `lot_number`/`captcha_id` pair; don't reuse it across challenges.
- GeeTest checks the mouse/touch trajectory; generate realistic curves and pauses.
- The PoW step increases CPU time — cache nothing that depends on the challenge.
- Behavioural and IP reputation checks run in parallel with the puzzle; a clean residential IP is often the difference between pass and loop.

---

#### 💰 Paid alternatives:

| Service | GeeTest support | Notes |
|---------|-----------------|-------|
| **2Captcha** | v3 (slide/click), v4 | Task types for GeeTest and GeeTest v4 |
| **Anti-Captcha** | v3, v4 | Proxy support required for some tasks |
| **CapSolver** | v3, v4 | Fast, AI-based |
| **YesCaptcha** | v3, v4 | Popular in the Chinese ecosystem |
| **CapMonster** | v3, v4 | Cheaper, slightly slower |

If free methods don't work, use API services: **2Captcha**, **Anti-Captcha**, or **CapSolver**. More details in the [Paid services](../solvers.md#paid-services-api) section.
