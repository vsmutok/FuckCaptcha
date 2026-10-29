# Amazon CAPTCHA

**Complexity: ⭐ (Low)**

The classic Amazon CAPTCHA is the "Enter the characters you see below" page shown when Amazon's risk engine suspects automated browsing. It is a distorted text image, not the AWS WAF challenge — the two are different products and appear on different pages. It is one of the simplest CAPTCHAs to solve with OCR, but solving it does not automatically restore a flagged session.

#### How it looks:
<img src="../../assets/images/captchas/amazon.svg" alt="Amazon CAPTCHA" height="200">

#### How to identify:
- Title "Amazon.com" and the text "Enter the characters you see below"
- Form action `/errors/validateCaptcha` with method `GET`
- Hidden fields `amzn` and `amzn-r`
- Input `field-keywords` (the answer field)
- Image served from `images-na.ssl-images-amazon.com/captcha/...`
- "Try different image" link and "Continue shopping" button
- Footer note "Sorry, we just need to make sure you're not a robot"

#### How it works:
1. Amazon's risk engine redirects suspicious sessions to the CAPTCHA page.
2. The page includes hidden tokens (`amzn`, `amzn-r`) and a distorted text image.
3. The user types the characters into `field-keywords` and submits the form.
4. Amazon validates the answer and the hidden tokens, then redirects back to the original path.
5. Answers are usually case-insensitive, but repeated failures raise the risk score.
6. The CAPTCHA event itself is used to reset the session's risk score; it does not grant lasting trust.

#### Amazon CAPTCHA vs AWS WAF:
- **Amazon CAPTCHA** — the classic text image on `amazon.com/errors/validateCaptcha`.
- **AWS WAF CAPTCHA** — a separate AWS product with its own widget, puzzle, and token; see [Amazon WAF](aws.md).

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **ddddocr** | 🔥 Excellent on Amazon's clean text images | 90–98% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **Tesseract + preprocessing** | Threshold, deskew, and whitelist alphanumerics | 70–90% | [tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract) |
| **EasyOCR** | Robust default for noisy images | 80–95% | [JaidedAI/EasyOCR](https://github.com/JaidedAI/EasyOCR) |
| **Playwright / DrissionPage** | Keep the session, submit the form, and follow the redirect | 90–98% | [microsoft/playwright-python](https://github.com/microsoft/playwright-python) · [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Residential proxies** | Reduce how often the CAPTCHA appears | — | [Bright Data](https://brightdata.com/) |

### Practical approach
1. Keep the browser session that received the CAPTCHA; do not start a new one.
2. Download the image and preprocess it (grayscale, contrast, threshold).
3. OCR with ddddocr or Tesseract; drop spaces and punctuation.
4. Fill `field-keywords` and submit the form with the original `amzn` and `amzn-r` values.
5. Follow the redirect and verify that the product page loads.
6. If the CAPTCHA reappears, slow down and use a cleaner IP instead of retrying rapidly.

### Practical tips
- The answer is usually case-insensitive, but preserve the characters exactly as OCR reads them.
- Do not lose the hidden `amzn` / `amzn-r` fields — they bind the answer to the original request.
- Solving the CAPTCHA does not fix a bad IP or a bot-like request pattern.
- Avoid incognito and fresh profiles for routine browsing; a logged-in account is trusted more.
- On mobile, the same CAPTCHA may be served in a different layout; identify by the form action, not the visuals.
- Do not confuse this page with the AWS WAF challenge; the fixes are different.

---

#### 💰 Paid alternatives:

| Service | Notes |
|---------|-------|
| **2Captcha** | Standard image-to-text task; cheap and reliable for Amazon's text CAPTCHA |
| **DeathByCaptcha** | Image CAPTCHA API |
| **CapSolver** | Image-to-text support |
| **Bright Data / ZenRows** | Reduce CAPTCHA frequency with better IPs and sessions |

More details in the [Paid services](../solvers.md#paid-services-api) section.
