# Text-Based CAPTCHAs

**Complexity: ⭐ (Low)**

#### How it looks:
<img src="../../assets/images/captchas/normal.svg" alt="Normal Captcha" height="200">

#### How to identify:
- Distorted, wavy, or scratched text
- Random letters and numbers
- Lines or noise overlay
- Sometimes colored background

#### Demo to try it yourself:
- Basic text CAPTCHA demo: [captcha.com – Text CAPTCHA demo](https://captcha.com/demos/features/captcha-demo.aspx)

---

### Free & open-source bypass methods
| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **ddddocr** | 🔥 Best for simple CAPTCHAs, works out of box | 90-99% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **EasyOCR** | Multi-language OCR, good accuracy | 70-90% | [JaidedAI/EasyOCR](https://github.com/JaidedAI/EasyOCR) |
| **PaddleOCR** | Powerful OCR, great for complex text | 80-95% | [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) |
| **Tesseract** | Classic OCR, needs preprocessing | 50-80% | [tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract) |
| **captcha_trainer** | Train your own model | 95-99% | [kerlomz/captcha_trainer](https://github.com/kerlomz/captcha_trainer) |
| **MMOCR** | OCR toolkit from OpenMMLab with many models | 80-98% | [open-mmlab/mmocr](https://github.com/open-mmlab/mmocr) |
| **TrOCR** | Transformer-based OCR (Hugging Face) | 85-98% | [microsoft/trocr-base](https://huggingface.co/microsoft/trocr-base-printed) |
| **CRNN baselines** | Lightweight CNN+RNN text recognizers | 80-95% | [meijieru/crnn.pytorch](https://github.com/meijieru/crnn.pytorch) |

---

### Preprocessing tricks to boost OCR
- Convert to grayscale → adaptive threshold (e.g., Otsu) to remove background noise.
- Deskew/rotate to horizontal text.
- Morphology (dilate/erode) to reconnect broken strokes; remove thin noise with opening.
- Median/gaussian blur to reduce speckles; bilateral filter to keep edges.
- Resize 2–4× with lanczos before OCR.
- Invert colors if foreground/background is inverted.
- Segment characters (vertical projection) and run per-character OCR when spacing is big.

---

### Custom training options
- Collect 2–5k synthetic samples using fonts + noise similar to target CAPTCHA.
- Train with **captcha_trainer**, **MMOCR**, or a CRNN in PyTorch/TensorFlow.
- Use CTC loss for variable-length strings; augment with elastic distortions, blur, salt & pepper, random lines.
- Export to ONNX/TensorRT for fast inference.

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
| **DeathByCaptcha** | $1.39 | 15-30s | [deathbycaptcha.com](https://deathbycaptcha.com/api#api_details_upload_captcha |

---

### 📊 Quick decision guide
- Try **ddddocr** first (fast, high accuracy on simple text).
- If noisy/warped: preprocess (binarize, deskew, denoise) then **PaddleOCR/MMOCR**.
- Need maximum accuracy or custom font: train with **captcha_trainer** or **CRNN** on synthetic data.
- Want hands-off: use paid solvers (2Captcha/Anti-Captcha/CapSolver).