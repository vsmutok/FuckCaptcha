# 🔓 FuckCaptcha

This repository is a collection of various CAPTCHA types and methods to bypass them, gathered in one place.

---

## 🧭 Navigation

| [**🛠️ Free Solvers**](docs/solvers.md) | [**📚 Resources**](docs/resources.md) |

---

## CAPTCHA Identification Guide

---

### 1. Text-Based CAPTCHAs

#### What it looks like:
<img src="assets/images/captchas/normal.svg" alt="Normal Captcha" height="200">

#### How to identify: 
- Distorted, wavy, or scratched text
- Random letters and numbers
- Lines or noise overlay
- Sometimes colored background

#### Free bypass methods: 

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **ddddocr** | 🔥 Best for simple CAPTCHAs, works out of box | 90-99% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **EasyOCR** | Multi-language OCR, good accuracy | 70-90% | [JaidedAI/EasyOCR](https://github.com/JaidedAI/EasyOCR) |
| **PaddleOCR** | Powerful OCR, great for complex text | 80-95% | [PaddlePaddle/PaddleOCR](https://github.com/PaddlePaddle/PaddleOCR) |
| **Tesseract** | Classic OCR, needs preprocessing | 50-80% | [tesseract-ocr/tesseract](https://github.com/tesseract-ocr/tesseract) |
| **captcha_trainer** | Train your own model | 95-99% | [kerlomz/captcha_trainer](https://github.com/kerlomz/captcha_trainer) |

---

### 2. Google reCAPTCHA v2

#### What it looks like:
<img src="assets/images/captchas/recaptcha-v2.svg" alt="reCAPTCHA v2" height="200">

#### How to identify:
- "I'm not a robot" checkbox
- 3x3 or 4x4 grid of images
- Google branding
- Blue VERIFY button

#### Free bypass methods:

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **Buster** | 🔥 Browser extension, solves via audio | 80-95% | [dessant/buster](https://github.com/dessant/buster) |
| **GoogleRecaptchaBypass** | 🔥 Fast reCAPTCHA solver | 90-95% | [sarperavci/GoogleRecaptchaBypass](https://github.com/sarperavci/GoogleRecaptchaBypass) |
| **undetected-chromedriver** | Stealth browsing, often auto-passes | 60-80% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |
| **YOLOv8** | Object detection for image grids | 70-85% | [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) |
| **Whisper** | Use OpenAI Whisper on audio challenge | 90-99% | [openai/whisper](https://github.com/openai/whisper) |

---

### 3. Google reCAPTCHA v3

#### What it looks like:
<img src="assets/images/captchas/recaptcha-v3.svg" alt="reCAPTCHA v3" height="200">

#### How to identify: 
- **NO visible challenge!**
- Small reCAPTCHA badge in the bottom right corner
- Works in background, scores behavior (0.0 - 1.0)

#### Free bypass methods:

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **undetected-chromedriver** | 🔥 Best option, mimics human | 85-95% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |
| **DrissionPage** | New automation framework | 80-90% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **playwright-stealth** | Stealth for Playwright | 75-90% | [AtuboDad/playwright_stealth](https://github.com/AtuboDad/playwright_stealth) |

---

### 4. Google reCAPTCHA Enterprise

#### What it looks like:
<img src="assets/images/captchas/recaptcha-enterprise.svg" alt="reCAPTCHA Enterprise" height="200">

#### How to identify:
- Similar to v2/v3 but used for enterprise protection
- Can include multi-factor authentication
- Advanced risk analysis

#### Free bypass methods:
- Same as reCAPTCHA v3 (Stealth browsers, real user behavior simulation)

---

### 5. Cloudflare Turnstile / Challenge

#### What it looks like:
<img src="assets/images/captchas/cloudflare.svg" alt="Cloudflare Turnstile" height="200">

#### How to identify: 
- Cloudflare logo and branding
- "Verify you are human" checkbox or automatic challenge
- "Checking your browser..." text (Challenge page)

#### Free bypass methods:

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **FlareSolverr** | 🔥 Proxy server for CF bypass | 90-98% | [FlareSolverr/FlareSolverr](https://github.com/FlareSolverr/FlareSolverr) |
| **CloudflareBypass** | 🔥 Verification bypass for scraping | 85-95% | [sarperavci/CloudflareBypassForScraping](https://github.com/sarperavci/CloudflareBypassForScraping) |
| **DrissionPage** | 🔥 Works great with Turnstile | 85-95% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **undetected-chromedriver** | Stealth Selenium | 70-85% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |

---

### 6. GeeTest (Slide/Click)

#### What it looks like:
<img src="assets/images/captchas/geetest.svg" alt="GeeTest" height="200">

#### How to identify:
- Puzzle piece slider or "Click on items in order"
- GeeTest logo
- Background image with missing piece or scattered icons

#### Free bypass methods:

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **PuzzleSolver** | 🔥 Multi-purpose puzzle solver | 85-95% | [vsmutok/Puzzle-Captcha-Solver](https://github.com/vsmutok/Puzzle-Captcha-Solver) |
| **OpenCV** | Find slider position via template matching | 80-95% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **ddddocr** | Built-in GeeTest support | 75-90% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **DrissionPage** | Handles GeeTest interactions well | 80-90% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |

---

### 7. Arkose Labs / FunCaptcha

#### What it looks like:
<img src="assets/images/captchas/arkose.svg" alt="Arkose Labs" height="200">

#### How to identify:
- **Rotating/matching game challenges**
- Arrow buttons to rotate objects
- **Arkose Labs** or **FunCaptcha** branding
- Used by: Roblox, EA, GitHub, Microsoft

#### Free bypass methods:
- **Custom CNN models** for rotation prediction
- **Stealth automation** with human-like delays

---

### 8. Amazon WAF CAPTCHA

#### What it looks like:
<img src="assets/images/captchas/aws.svg" alt="Amazon WAF" height="200">

#### How to identify: 
- Amazon/AWS branding
- Simple text-based challenge or grid
- "Enter the characters" or "Pick the image"

#### Free bypass methods:

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **Whisper** | Best for audio challenge | 85-95% | [openai/whisper](https://github.com/openai/whisper) |
| **ddddocr** | Good for text challenges | 60-80% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **undetected-chromedriver** | Stealth browsing | 70-85% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |

---

### 9. DataDome

#### What it looks like:
<img src="assets/images/captchas/datadome-captcha.svg" alt="DataDome" height="200">

#### How to identify: 
- **DataDome logo**
- "Press & Hold" button or slider interaction
- Blocks bots aggressively with fingerprinting

#### Free bypass methods: 

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **PuzzleSolver** | 🔥 Solves DataDome slider | 80-90% | [vsmutok/Puzzle-Captcha-Solver](https://github.com/vsmutok/Puzzle-Captcha-Solver) |
| **DrissionPage** | 🔥 Realistic automation | 60-75% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **undetected-chromedriver** | Stealth mode | 50-70% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |

---

### 10. MTCaptcha

#### What it looks like:
<img src="assets/images/captchas/mtcaptcha.svg" alt="MTCaptcha" height="200">

#### How to identify: 
- "I am human" checkbox
- **MTCaptcha** branding
- Simple and modern look

#### Free bypass methods: 
- **Stealth automation** (DrissionPage, Playwright Stealth)

---

### 11. Tencent Captcha

#### What it looks like:
<img src="assets/images/captchas/tencent.svg" alt="Tencent Captcha" height="200">

#### How to identify: 
- Slider puzzle (similar to GeeTest)
- **Tencent (腾讯)** branding
- Common on Chinese platforms (QQ, WeChat)

#### Free bypass methods:
- **OpenCV** for finding slider position
- **ddddocr** for object recognition

---

### 12. Audio CAPTCHAs

#### What it looks like:
<img src="assets/images/captchas/audio.svg" alt="Audio Captcha" height="200">

#### How to identify: 
- Audio player / speaker icon
- "Type what you hear" instruction
- Background noise with spoken numbers/letters

#### Free bypass methods:

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **Whisper** | 🔥🔥 BEST solution, OpenAI STT | 95-99% | [openai/whisper](https://github.com/openai/whisper) |
| **Vosk** | Offline speech recognition | 70-85% | [alphacep/vosk-api](https://github.com/alphacep/vosk-api) |

---

### 13. Altcha

#### What it looks like:
<img src="assets/images/captchas/altcha-captcha.svg" alt="Altcha" height="200">

#### How to identify:
- Simple checkbox
- "Verification successful" after a short wait
- Uses Proof-of-Work (PoW) in the background

#### Free bypass methods:
- **JavaScript Execution**: Simply run the PoW script in a headless browser

---

### 14. Friendly Captcha

#### What it looks like:
<img src="assets/images/captchas/friendly-captcha.svg" alt="Friendly Captcha" height="200">

#### How to identify:
- "I am human" button with a progress circle
- Background Proof-of-Work
- Privacy-focused, no tracking

#### Free bypass methods:
- **Auto-submit** scripts that wait for PoW completion

---

### 15. ATB Captcha

#### What it looks like:
<img src="assets/images/captchas/atbcaptcha.svg" alt="ATB Captcha" height="200">

#### How to identify:
- Text or slider challenge
- Specific to certain regions/services

#### Free bypass methods:
- **OCR** (ddddocr) or **Slider solvers**

---

### 16. CaptchaFox

#### What it looks like:
<img src="assets/images/captchas/captchafox.svg" alt="CaptchaFox" height="200">

#### How to identify:
- Modern interactive challenge
- Simple UI

#### Free bypass methods:
- **Stealth automation**

---

### 17. Capy Puzzle

#### What it looks like:
<img src="assets/images/captchas/capy.svg" alt="Capy Puzzle" height="200">

#### How to identify:
- Jigsaw puzzle slider
- "Drag the puzzle piece"

#### Free bypass methods:
- **OpenCV** template matching

---

### 18. CutCaptcha

#### What it looks like:
<img src="assets/images/captchas/cutcaptcha.svg" alt="CutCaptcha" height="200">

#### How to identify:
- "Slide to complete" puzzle
- Unique "cut" piece style

#### Free bypass methods:
- **Slider solver** scripts

---

### 19. Lemin Cropped Image

#### What it looks like:
<img src="assets/images/captchas/lemin.svg" alt="Lemin Cropped Image" height="200">

#### How to identify:
- Slider puzzle with cropped pieces
- "Assemble the image"

#### Free bypass methods:
- **OpenCV** or **CNN-based** solvers

---

### 20. Prosopo ProCaptcha

#### What it looks like:
<img src="assets/images/captchas/prosopo-procaptcha.svg" alt="Prosopo ProCaptcha" height="200">

#### How to identify:
- Interactive click or selection challenges
- Often used in Web3/Crypto

#### Free bypass methods:
- **YOLO** or **CLIP** for object selection

---

### 21. Temu Captcha

#### What it looks like:
<img src="assets/images/captchas/temu_captcha.svg" alt="Temu Captcha" height="200">

#### How to identify:
- Slider or text challenge on Temu website
- Aggressive bot detection

#### Free bypass methods:
- **Stealth browsers** + **Slider solvers**

---

## ⚠️ Disclaimer

This repository is for **educational and research purposes only**. Use responsibly and respect the terms of service of websites you interact with. The authors are not responsible for any misuse. 

---


## ⭐ Star History

If this helped you, give it a star! ⭐

---