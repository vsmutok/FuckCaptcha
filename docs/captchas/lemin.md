# Lemin Captcha

**Complexity: ⭐⭐⭐ (Medium)**

Lemin Captcha (leminnow.com) is a puzzle CAPTCHA, most commonly the "Cropped" type: the user picks the crop that correctly completes the main image. It is image-based, lightweight and has a clean JavaScript API, which makes it relatively easy to automate compared with behavioural systems.

#### How it looks:
<img src="../../assets/images/captchas/lemin.svg" alt="Lemin Captcha" height="200">

#### How to identify:
- Parent `<div>` such as `id="lemin-cropped-captcha"`
- Script loaded from `api.leminnow.com`; the `captchaId` (`CROPPED_...`) is embedded in the script URL
- Global `window.leminCroppedCaptcha` with `getCaptcha()`, `getCaptchaValue()`, `isReady()`, `reloadPuzzle()`
- Form fields `lemin_challenge_id` and `lemin_answer` added on submit
- Verification endpoint `https://api.leminnow.com/captcha/v1/cropped/validate`

#### How it works:
1. The page loads the widget with a `captchaId` and a container `divId`.
2. The server returns an image puzzle and a `challenge_id`.
3. The user selects/assembles the correct crop; the widget stores an encrypted `answer`.
4. On submit the form includes `lemin_challenge_id` and `lemin_answer`.
5. The backend POSTs JSON `{private_key, challenge_id, answer}` to `/captcha/v1/cropped/validate`; the server returns `true`/`false` plus an error code.

---

### Free bypass methods

| Method | Description | Success Rate | Link |
|--------|-------------|--------------|------|
| **OpenCV** | 🔥 Compare candidate crops with the hole region (edges/color) | 75-90% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **DrissionPage** | Real browser; read `getCaptchaValue()` after solving | 80-95% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Playwright** | Automate clicks and extract `{answer, challenge_id}` | 80-95% | [microsoft/playwright-python](https://github.com/microsoft/playwright-python) |
| **ddddocr** | Crop classification fallback | 60-80% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **Patchright** | Stealth Playwright if the site fingerprints the browser | 70-90% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) |

### Practical approach
1. Extract `captchaId` from the script URL and the container's `divId`.
2. Open the page in a real browser and wait for `leminCroppedCaptcha.getCaptcha().isReady()`.
3. Grab the main image and candidate crops; score each candidate against the hole (edge continuity, color histograms).
4. Click the best candidate.
5. Read `getCaptchaValue()` → `{answer, challenge_id}` and submit the form immediately.

### Practical tips
- The answer is encrypted in the widget; don't try to forge it — extract it from `getCaptchaValue()`.
- `challenge_id` is tied to the widget instance; don't reload after solving.
- Multiple widgets on one page: use `window.leminCroppedCaptcha.getCaptcha('CAPTCHA_KEY')`.
- Lemin analyses network traffic — if you solve via a proxy, submit from the same IP.
- `reloadPuzzle()` is handy when OCR confidence is low: retry a few times before giving up.

---

#### 💰 Paid alternatives:

| Service | Lemin support | Notes |
|---------|---------------|-------|
| **2Captcha** | `LeminTaskProxyless` / `LeminTask` | Needs `captchaId`, `divId`, URL |
| **CapSolver** | Lemin Captcha | Token-based |
| **Anti-Captcha** | Lemin (check task list) | Availability varies |
| **DeathByCaptcha** | Lemin (check task list) | Availability varies |

If free methods don't work, use API services: **2Captcha** or **CapSolver**. More details in the [Paid services](../solvers.md#paid-services-api) section.
