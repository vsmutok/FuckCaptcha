# 🛠️ CAPTCHA Solvers

The best free and open-source tools for bypassing CAPTCHA — plus paid API services when you need scale or a CAPTCHA type that is impractical to solve locally.

Start with the free stack: most modern CAPTCHAs are beaten by a clean browser, a matching IP and a small amount of computer vision, not by a magic library.

---

## 🆓 Free Tools (Open Source)

### 🌐 Browser Automation & Stealth

| Name | Best for | Repository |
|------|----------|------------|
| **DrissionPage** | Turnstile, DataDome, widget automation | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Patchright** | Stealth Playwright (patched fingerprints) | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) |
| **Camoufox** | Anti-detect Firefox with spoofed fingerprints | [daijro/camoufox](https://github.com/daijro/camoufox) |
| **undetected-chromedriver** | Patched Selenium Chrome | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |
| **nodriver** | Successor to undetected-chromedriver (CDP) | [ultrafunkamsterdam/nodriver](https://github.com/ultrafunkamsterdam/nodriver) |
| **Playwright** | Cross-browser automation (patch it for stealth) | [microsoft/playwright-python](https://github.com/microsoft/playwright-python) |
| **SeleniumBase** | Selenium with built-in stealth/UC mode | [seleniumbase/SeleniumBase](https://github.com/seleniumbase/SeleniumBase) |
| **Botasaurus** | Anti-detect scraping framework | [omkarcloud/botasaurus](https://github.com/omkarcloud/botasaurus) |
| **curl_cffi** | Browser TLS/JA3 impersonation without a browser | [lexiforest/curl_cffi](https://github.com/lexiforest/curl_cffi) |
| **cloudscraper** | Legacy Cloudflare IUAM bypass | [VeNoMouS/cloudscraper](https://github.com/VeNoMouS/cloudscraper) |
| **puppeteer-extra-plugin-stealth** | Node.js stealth layer for Puppeteer | [berstend/puppeteer-extra](https://github.com/berstend/puppeteer-extra) |

### 🧩 CAPTCHA-Specific Solvers

| Name | Best for | Repository |
|------|----------|------------|
| **hcaptcha-challenger** | hCaptcha (AI + automation) | [QIN2DIM/hcaptcha-challenger](https://github.com/QIN2DIM/hcaptcha-challenger) |
| **GoogleRecaptchaBypass** | reCAPTCHA v2 (audio + ffmpeg) | [sarperavci/GoogleRecaptchaBypass](https://github.com/sarperavci/GoogleRecaptchaBypass) |
| **CloudflareBypassForScraping** | Cloudflare challenge/Turnstile | [sarperavci/CloudflareBypassForScraping](https://github.com/sarperavci/CloudflareBypassForScraping) |
| **PuzzleSolver** | GeeTest, DataDome, Binance, TikTok sliders | [vsmutok/Puzzle-Captcha-Solver](https://github.com/vsmutok/Puzzle-Captcha-Solver) |
| **temu-captcha-solver** | Temu slide/swap/click/3×3 (uses a paid API) | [PyPI: temu-captcha-solver](https://pypi.org/project/temu-captcha-solver/) |
| **altcha-lib-py** | ALTCHA proof-of-work | [altcha-org/altcha-lib-py](https://github.com/altcha-org/altcha-lib-py) |
| **friendly-captcha-sdk** | Friendly Captcha widget/PoW | [FriendlyCaptcha/friendly-captcha-sdk](https://github.com/FriendlyCaptcha/friendly-captcha-sdk) |
| **procaptcha** | Prosopo Procaptcha integration | [prosopo/procaptcha](https://github.com/prosopo/procaptcha) |

### 🔤 OCR & Vision

| Name | Best for | Repository |
|------|----------|------------|
| **ddddocr** | Text, sliders, simple click tasks | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **EasyOCR** | Multi-language text CAPTCHAs | [JaidedAI/EasyOCR](https://github.com/JaidedAI/EasyOCR) |
| **PaddleOCR** | Complex symbols and layouts | [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) |
| **RapidOCR** | Lightweight ONNX OCR | [RapidAI/RapidOCR](https://github.com/RapidAI/RapidOCR) |
| **Tesseract** | Classic OCR (with preprocessing) | [tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract) |
| **OpenCV** | Slider gap detection, preprocessing | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **YOLOv8** | Object detection for grid/click tasks | [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) |
| **CLIP** | Zero-shot image classification | [openai/CLIP](https://github.com/openai/CLIP) |

### 🔊 Audio CAPTCHA

| Name | Best for | Repository |
|------|----------|------------|
| **Whisper** | Audio CAPTCHA transcription | [openai/whisper](https://github.com/openai/whisper) |
| **faster-whisper** | Faster CTranslate2 Whisper | [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper) |
| **SpeechBrain** | ASR models and pipelines | [speechbrain/speechbrain](https://github.com/speechbrain/speechbrain) |
| **noisereduce** | Remove background noise before ASR | [timsainb/noisereduce](https://github.com/timsainb/noisereduce) |
| **FFmpeg** | Convert/de-noise audio | [FFmpeg/FFmpeg](https://github.com/FFmpeg/FFmpeg) |

### 🌐 Browser Extensions

| Name | Best for | Repository |
|------|----------|------------|
| **Buster** | reCAPTCHA audio challenge | [dessant/buster](https://github.com/dessant/buster) |
| **NopeCHA** | Multiple CAPTCHA types (freemium) | [NopeCHALLC/nopecha-extension](https://github.com/NopeCHALLC/nopecha-extension) |
| **CapSolver** | Solver service integration | [capsolver/capsolver-browser-extension](https://github.com/capsolver/capsolver-browser-extension) |

### 🧠 Training Your Own Model

- Collect labelled samples and augment them (rotation, noise, distortion, occlusion).
- Fine-tune a small CNN/CRNN for fixed-length text, or YOLO for click/grid targets.
- For sliders, classical CV (edges + template matching) is usually faster and more reliable than a neural net.
- Keep a retry/fallback path: CAPTCHA providers rotate challenge variants regularly.

---

## Paid Services (API)

Token services solve the challenge on their infrastructure and return a token/answer that you inject into the page. They are useful for enterprise CAPTCHAs and high volume, but they cost money and still require a matching session/IP.

| Service | Best for | Price (approx.) | Notes |
|---------|----------|-----------------|-------|
| [**2Captcha**](https://2captcha.com/) | All common types, huge coverage | ~$0.5–3 per 1K | Worker + AI hybrid; extensive docs |
| [**Anti-Captcha**](https://anti-captcha.com/) | reCAPTCHA, hCaptcha, Turnstile | ~$0.5–2 per 1K | Stable, large worker base |
| [**CapSolver**](https://www.capsolver.com/) | AI-friendly, fast token types | ~$0.1–1 per 1K | Cheap, good API |
| [**DeathByCaptcha**](https://www.deathbycaptcha.com/) | Legacy/enterprise types | ~$1.39 per 1K | One of the oldest services |
| [**YesCaptcha**](https://yescaptcha.com/) | reCAPTCHA/Turnstile/hCaptcha | varies | Popular in the scraping community |
| [**NopeCHA**](https://www.nopecha.com/) | Turnstile, reCAPTCHA, hCaptcha | subscription | Extension + API |
| [**SadCaptcha**](https://sadcaptcha.com/) | TikTok/Temu-specific puzzles | varies | Specialised, not general-purpose |

### 🌐 Unblocker / Browser APIs

For CAPTCHAs that are really bot-management products (Cloudflare, DataDome, PerimeterX/HUMAN, Akamai, Kasada), a browser API is often more effective than a token service:

| Service | What it gives you |
|---------|-------------------|
| [**Bright Data**](https://brightdata.com/) | Unblocker API + residential proxies |
| [**ZenRows**](https://www.zenrows.com/) | Anti-bot bypass API |
| [**ScrapingBee**](https://www.scrapingbee.com/) | Headless browser + proxy API |
| [**Oxylabs**](https://oxylabs.io/) | Web unblocker + proxy pool |

### 🧰 SDKs

| SDK | Language | Repository |
|-----|----------|------------|
| **2captcha-python** | Python | [2captcha/2captcha-python](https://github.com/2captcha/2captcha-python) |
| **capsolver-python** | Python | [capsolver/capsolver-python](https://github.com/capsolver/capsolver-python) |

---

## 🧭 How to Choose

| CAPTCHA | First try | If it fails |
|---------|-----------|-------------|
| Text/image | ddddocr / EasyOCR + preprocessing | Paid image-to-text |
| Slider / jigsaw | OpenCV + human-like drag | 2Captcha / CapSolver |
| reCAPTCHA v2 | Audio (Buster/Whisper) or stealth browser | 2Captcha |
| reCAPTCHA v3 / Enterprise | Score farming with clean sessions | CapSolver / enterprise unblocker |
| hCaptcha | hcaptcha-challenger + stealth browser | CapSolver |
| Cloudflare Turnstile | DrissionPage / CloudflareBypass | Browser API |
| GeeTest v3/v4 | PuzzleSolver / OpenCV | 2Captcha |
| PoW (ALTCHA, Friendly, Cap) | Solve locally (cheap CPU work) | Usually not needed |
| DataDome / Kasada / HUMAN / Akamai | Full stealth browser + residential IP | Bright Data / ZenRows |

---

## ⚠️ Notes

- Use these tools only on sites you own or are authorised to test.
- Tokens are single-use and short-lived: extract and submit them in the same session.
- Match the IP, User-Agent and cookies between solving and submission, or the token may be rejected.
- Success rates are approximate and change as providers update their challenges.
