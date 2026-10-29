# hCaptcha

**Complexity: ⭐⭐⭐ (Medium)**

hCaptcha is the second-largest CAPTCHA provider and the most common privacy-oriented alternative to reCAPTCHA. It serves image-grid challenges ("select all the buses"), area-selection tasks, and invisible/passive checks. The widget is usually a single checkbox, but the actual difficulty comes from the risk score behind it: a clean session may pass with one click, while a flagged one gets a long sequence of image challenges.

#### How it looks:
<img src="../../assets/images/captchas/hcaptcha.svg" alt="hCaptcha" height="200">

#### How to identify:
- Container `<div class="h-captcha" data-sitekey="...">`
- Iframe loaded from `hcaptcha.com` or `newassets.hcaptcha.com`
- Checkbox with the text "I am human"
- Image grid with a prompt such as "Please click each image containing a bus"
- Hidden textarea `h-captcha-response` (sometimes `g-recaptcha-response` for compatibility)
- Script `https://js.hcaptcha.com/1/api.js`
- "Protected by hCaptcha" footer link

#### Common challenge types:
- **Checkbox / passive** — one click or no interaction at all.
- **Image grid** — select all tiles matching a label.
- **Area select** — click every matching object in a single image.
- **Drag / multi-round** — repeated grids until the score is high enough.
- **Audio** — accessibility alternative used by blind users and automation.

#### How it works:
1. The page loads the hCaptcha script and renders the widget with a site key.
2. hCaptcha collects browser, network, and interaction signals and issues a challenge when needed.
3. After a successful challenge, the response token is written to `h-captcha-response`.
4. The site backend verifies it with a POST to `https://api.hcaptcha.com/siteverify`:

```text
secret=YOUR_SECRET
response=TOKEN
remoteip=USER_IP        # optional
sitekey=SITE_KEY        # optional
```

5. The response contains `success`, `challenge_ts`, `hostname`, `credit`, and `error-codes`. Enterprise accounts also receive a risk `score` and `score_reason`.
6. Tokens are single-use and expire quickly, so the form must be submitted in the same session.

#### hCaptcha Enterprise:
- Same widget, but the site receives a risk score instead of a binary pass/fail.
- Passive mode can approve a session without any visible challenge.
- Score thresholds are configured per site, so a valid token can still be rejected if the score is too low.
- Enterprise deployments often combine hCaptcha with their own device fingerprinting and rate limits.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **hcaptcha-challenger** | 🔥 AI-based image challenge solver with Selenium integration | 70–90% | [QIN2DIM/hcaptcha-challenger](https://github.com/QIN2DIM/hcaptcha-challenger) |
| **Patchright / Camoufox** | Stealth browsers that reduce automation signals and often get passive approval | 60–90% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) · [daijro/camoufox](https://github.com/daijro/camoufox) |
| **DrissionPage** | Reliable widget automation and response extraction | 50–80% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Buster** | Browser extension that uses the audio challenge | 60–85% | [dessant/buster](https://github.com/dessant/buster) |
| **Whisper + FFmpeg** | Transcribe the audio challenge locally | 60–85% | [openai/whisper](https://github.com/openai/whisper) |
| **YOLOv8** | Train a detector for the objects in grid challenges | 80–95% (trained) | [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) |
| **CLIP** | Zero-shot classification of grid tiles | 50–75% | [openai/CLIP](https://github.com/openai/CLIP) |

### Practical approach
1. Open the page in a real, persistent browser profile with JavaScript, cookies, and WebGL enabled.
2. Prefer a residential IP that matches the browser's language and timezone.
3. If the widget is passive, wait for `h-captcha-response` to fill automatically.
4. If a checkbox appears, click it with a human-like mouse path, then wait for the challenge to resolve.
5. For image grids, use hcaptcha-challenger or a custom detector; submit one round at a time and let the widget issue the next.
6. Read the token immediately before form submission and keep the same session/cookies.

### Practical tips
- Do not reload the widget after receiving a token — the response is bound to that challenge.
- Headless Chrome is heavily penalized; use headful mode or a patched stealth browser.
- A fresh profile with no history is suspicious. Warm up the profile on the target site first.
- hCaptcha updates its image prompts frequently, so retrain or use a maintained solver.
- Enterprise risk scores are not forgeable: if a site requires a high score, focus on session quality rather than solving more grids.
- Audio challenges are rate-limited and may be disabled on enterprise sites.

---

#### 💰 Paid alternatives:

| Service | Notes |
|---------|-------|
| **2Captcha / Anti-Captcha** | `HCaptchaTaskProxyless` and proxy variants; reliable for standard widgets |
| **CapSolver** | Fast hCaptcha token API, including Enterprise |
| **NopeCHA** | Subscription API + browser extension |
| **Bright Data / ZenRows** | Browser APIs that run the widget inside a real session |

More details in the [Paid services](../solvers.md#paid-services-api) section.
