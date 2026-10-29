# BotDetect

**Complexity: ⭐ (Low)**

BotDetect is a self-hosted CAPTCHA library for .NET, .NET Core, Java, and PHP. Unlike cloud CAPTCHA services, it runs entirely on the site's server: it generates a distorted text image (and an audio alternative), stores the answer in session state, and validates the user's input locally. There is no third-party verification endpoint to call.

#### How it looks:
<img src="../../assets/images/captchas/botdetect.svg" alt="BotDetect CAPTCHA" height="200">

#### How to identify:
- Image request to `CaptchaImageHandler.ashx` (ASP.NET) or a similar library endpoint
- Form fields such as `CaptchaCode`, `CaptchaInputText`, or `CaptchaId`
- "BotDetect" watermark on the free version
- Distorted text with lines, dots, and a colored background
- Audio button that plays a spoken code
- `CaptchaId` hidden field identifying the widget instance

#### How it works:
1. The server-side control generates a random code and renders it as an image.
2. The code is stored in session state under the `CaptchaId`.
3. The user types the code; the server compares it with the stored value.
4. A failed attempt invalidates the code, so the user must request a new image.
5. Codes expire after a configurable timeout (20 minutes by default), and only one validation attempt is allowed per code.
6. The audio challenge uses the same code, so it can be solved with speech-to-text.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **ddddocr** | 🔥 Strong default for distorted text, no training required | 85–97% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **Tesseract + preprocessing** | Classic OCR with thresholding, deskew, and whitelisting | 60–85% | [tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract) |
| **EasyOCR / PaddleOCR** | Better on noisy or multi-font images | 75–92% | [JaidedAI/EasyOCR](https://github.com/JaidedAI/EasyOCR) · [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) |
| **Whisper** | Transcribe the audio challenge | 70–90% | [openai/whisper](https://github.com/openai/whisper) |
| **captcha_trainer** | Train a custom model for a specific BotDetect style | 95–99% (trained) | [kerlomz/captcha_trainer](https://github.com/kerlomz/captcha_trainer) |

### Practical approach
1. Download the CAPTCHA image with the same session cookies used for the form.
2. Preprocess: grayscale, increase contrast, remove noise, and crop the text area.
3. Run ddddocr or Tesseract with a character whitelist matching the site's code style.
4. Submit the answer together with the same `CaptchaId` and session.
5. If the site offers audio, download it and transcribe with Whisper.
6. On failure, request a new image — the old code is invalidated after one attempt.

### Practical tips
- BotDetect is self-hosted, so the image style depends on the site's configuration; tune preprocessing per target.
- The free version adds a "BotDetect" watermark, which can interfere with OCR; crop it out if possible.
- Respect the code timeout and submit promptly.
- Keep the session cookie: the answer is stored server-side and tied to the session.
- Some sites use custom character sets; a whitelist improves accuracy significantly.
- Audio challenges may be disabled or rate-limited.

---

#### 💰 Paid alternatives:

| Service | Notes |
|---------|-------|
| **2Captcha** | Standard image-to-text task works for BotDetect images |
| **DeathByCaptcha** | Image CAPTCHA support with a simple API |
| **CapSolver** | Image-to-text tasks; useful for high volume |

More details in the [Paid services](../solvers.md#paid-services-api) section.
