# Text-Based CAPTCHAs

**Complexity: ⭐ (Low)**

Text-based CAPTCHAs are the oldest and still the most common family of challenges. The server renders a short string (digits, letters, a word or a simple math task) with distortion, noise and overlapping lines, then asks the user to type it back. Modern variants are often generated on the fly, expire after a few minutes and are bound to the session/IP.

#### How it looks:
<img src="../../assets/images/captchas/normal.svg" alt="Normal Captcha" height="200">

#### How to identify:
- Distorted, wavy, rotated or scratched text
- Random letters and numbers, sometimes a word or a math expression
- Lines, dots or noise overlays on the background
- Colored or gradient background, sometimes a border/frame
- Often served from endpoints like `/captcha`, `/securimage`, `/simple-captcha`, `/kcap`, `/captcha.php`
- Response is usually an image (`image/png`, `image/jpeg`, `image/gif`) or base64 inside JSON

#### Common variants:

| Variant | Example | Notes |
|---------|---------|-------|
| Digits only | `482913` | Easiest; fixed length helps segmentation |
| Alphanumeric | `aB3xK9` | Case sensitivity is a common trap |
| Dictionary words | `orange` | Small vocabulary, sometimes case-insensitive |
| Math tasks | `7 + 4 = ?` | Parse the expression, then compute |
| Animated GIF | frames with moving noise | Extract the sharpest frame or average frames |
| Handwritten / 3D | stylized glyphs | Much harder for classic OCR |
| Emoji / icon selection | "pick the cat" | Belongs to image-recognition CAPTCHAs |

#### How it works (briefly):
1. The server generates a random answer and stores it in the session (or signs it in a token).
2. An image is rendered with that answer and sent to the client.
3. The user submits the text; the server compares it with the stored value and usually invalidates it.
4. Many implementations also validate the session cookie, referer and submission timing.

This means OCR alone is not always enough: you must keep the same session/cookies, submit quickly enough and reuse the token exactly once.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **ddddocr** | 🔥 Best starting point, works out of the box, no training | 90-99% (simple) | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **EasyOCR** | Multi-language OCR, easy API | 70-90% | [JaidedAI/EasyOCR](https://github.com/JaidedAI/EasyOCR) |
| **PaddleOCR** | Strong on complex/noisy text, many pretrained models | 80-95% | [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) |
| **Tesseract** | Classic OCR; needs preprocessing and whitelisting | 50-80% | [tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract) |
| **MMOCR** | OpenMMLab toolbox: detection + recognition pipelines | 80-98% | [open-mmlab/mmocr](https://github.com/open-mmlab/mmocr) |
| **TrOCR** | Transformer OCR from Hugging Face | 85-98% | [microsoft/trocr-base-printed](https://huggingface.co/microsoft/trocr-base-printed) |
| **captcha_trainer** | Train a custom model on your target CAPTCHA | 95-99% (trained) | [kerlomz/captcha_trainer](https://github.com/kerlomz/captcha_trainer) |
| **CRNN baseline** | Lightweight CNN+RNN+CTC recognizer | 80-95% | [meijieru/crnn.pytorch](https://github.com/meijieru/crnn.pytorch) |
| **OpenCV** | Preprocessing, segmentation, template matching | — | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **YOLOv8** | Detect/segment characters or challenge objects | 85-98% | [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) |
| **Buster** | Browser extension that also helps with audio fallbacks | 70-90% | [dessant/buster](https://github.com/dessant/buster) |

> Success rates are rough estimates for typical, non-adversarial text CAPTCHAs. Modern anti-OCR CAPTCHAs (heavy warping, adversarial noise, animated backgrounds) drop accuracy significantly and usually require a custom-trained model.

---

### Preprocessing tricks to boost OCR
- Convert to grayscale → adaptive threshold (Otsu / adaptive Gaussian) to remove background noise.
- Deskew/rotate to horizontal text; estimate the angle via `minAreaRect` or Hough lines.
- Morphology: dilate/erode to reconnect broken strokes; opening to remove thin noise.
- Median/Gaussian blur to reduce speckles; bilateral filter to keep edges.
- Remove long lines with morphological operations or Hough transform before OCR.
- Resize 2–4× with Lanczos before OCR; keep the aspect ratio.
- Invert colors if foreground/background are inverted.
- Segment characters with vertical projection and run per-character OCR when spacing is big.
- Restrict the alphabet (`tessedit_char_whitelist`, `-c tessedit_char_whitelist=...`) to digits/letters actually used.
- Try several preprocessing variants and pick the result by confidence, not by a single pass.

### Training your own model
- Collect 2–5k synthetic samples using fonts + noise similar to the target CAPTCHA.
- Train with **captcha_trainer**, **MMOCR**, or a CRNN in PyTorch/TensorFlow.
- Use CTC loss for variable-length strings; augment with elastic distortions, blur, salt & pepper, random lines, rotation and perspective.
- Balance the alphabet: otherwise rare characters (0/O, 1/l/I) dominate errors.
- Export to ONNX/TensorRT for fast inference.
- If the CAPTCHA is session-bound, train on images captured with the same renderer, not on screenshots from another site.

### Vision-LLM approach (when allowed)
Modern multimodal models (GPT-4o, Gemini, Claude) can read many low-complexity text CAPTCHAs. They are slow and relatively expensive per request, but useful for low-volume tasks and for quickly labeling a training set. Always check the target site's terms and the provider's usage policy.

---

### Cloud / vision APIs (when allowed)
| Service | Notes |
|---------|-------|
| **Google Cloud Vision** | Strong on warped text; pay-per-use |
| **AWS Textract** | Good multi-language support |
| **Azure Read** | Solid printed-text OCR |
| **GPT-4o / Gemini Vision** | Vision-LMMs can solve many low-complexity text CAPTCHAs |

---

## 💰 Paid alternatives:

If free methods don't work, use API services:

| Service | Price (per 1000) | Speed | Link |
|---------|------------------|-------|------|
| **2Captcha** | $0.50 - $1.00 | 10-30s | [2captcha.com](https://2captcha.com/p/simple_captcha) |
| **Anti-Captcha** | $0.50 - $1.00 | 10-30s | [anti-captcha.com](https://anti-captcha.com/apidoc/task-types/ImageToTextTask) |
| **CapSolver** | $0.40 - $0.80 | 5-20s | [capsolver.com](https://docs.capsolver.com/en/guide/recognition/ImageToTextTask/) |
| **CapMonster** | $0.40 - $0.90 | 10-25s | [capmonster.cloud](https://capmonster.cloud/en/textcaptcha) |
| **DeathByCaptcha** | ~$1.39 | 15-30s | [deathbycaptcha.com](https://deathbycaptcha.com/api#api_details_upload_captcha) |

Use the **ImageToTextTask** family of task types: you send the image (file/base64) and receive the recognized text.

---

### 📊 Quick decision guide
- Try **ddddocr** first (fast, high accuracy on simple text).
- If noisy/warped: preprocess (binarize, deskew, denoise) then **PaddleOCR/MMOCR**.
- Need maximum accuracy or a custom font: train with **captcha_trainer** or **CRNN** on synthetic data.
- Hands-off and low volume: use a paid solver (2Captcha / Anti-Captcha / CapSolver).

### Common pitfalls
- **Case sensitivity**: many sites accept only exact case; normalize only if the site does.
- **Session binding**: reloading the image often invalidates the previous answer.
- **Single-use tokens**: don't reuse a solved CAPTCHA for another request.
- **Timing checks**: submitting in milliseconds is a bot signal; add realistic delays.
- **Character confusion**: `0/O`, `1/l/I`, `5/S`, `2/Z` — use site-specific alphabets if known.
