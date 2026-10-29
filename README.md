# FuckCaptcha [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/vsmutok/FuckCaptcha/blob/main/LICENSE)
![CAPTCHA types: 38](https://img.shields.io/badge/CAPTCHA_types-38-blue.svg)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/vsmutok/FuckCaptcha/blob/main/CONTRIBUTING.md)
[![GitHub stars](https://img.shields.io/github/stars/vsmutok/FuckCaptcha?style=social)](https://github.com/vsmutok/FuckCaptcha/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/vsmutok/FuckCaptcha)](https://github.com/vsmutok/FuckCaptcha/commits/main)
[![Contributors](https://img.shields.io/github/contributors/vsmutok/FuckCaptcha)](https://github.com/vsmutok/FuckCaptcha/graphs/contributors)

**FuckCaptcha** is an open database dedicated to identification methods and bypass techniques for various types of CAPTCHA.

**[Browse the interactive guide →](https://vsmutok.github.io/FuckCaptcha/)**

## Contents

- [Project Goal](#project-goal)
- [CAPTCHA Identification](#captcha-identification)
- [Useful Links](#useful-links)

---
## Project Goal
We aim to gather all existing ways to bypass captchas in one place.  Our mission:
- 🆓 **Free Methods**: Collect and maintain an up-to-date list of open-source tools and libraries.
- 💰 **Paid Alternatives**: Provide information about effective paid services for solving complex tasks.
- 🧠 **Knowledge Base**:  Describe the complexity of each captcha and provide step-by-step instructions for bypassing it.

## CAPTCHA Identification

Click on any CAPTCHA below to see detailed information, complexity levels, and both free and paid bypass methods.

|                                                                                            |                                                                                                |                                                                                                  |                                                                                                    |                                                                                          |
| ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| <img src="assets/images/captchas/normal.svg" width="160" alt="Text-based CAPTCHA">         | <img src="assets/images/captchas/recaptcha-v2.svg" width="160" alt="reCAPTCHA v2">             | <img src="assets/images/captchas/recaptcha-v3.svg" width="160" alt="reCAPTCHA v3">               | <img src="assets/images/captchas/recaptcha-enterprise.svg" width="160" alt="reCAPTCHA Enterprise"> | <img src="assets/images/captchas/cloudflare.svg" width="160" alt="Cloudflare Turnstile"> |
| [**Text-based**](docs/captchas/normal.md)                                                  | [**reCAPTCHA v2**](docs/captchas/recaptcha.md#1-recaptcha-v2)                                  | [**reCAPTCHA v3**](docs/captchas/recaptcha.md#2-recaptcha-v3)                                    | [**reCAPTCHA Enterprise**](docs/captchas/recaptcha.md#3-recaptcha-enterprise)                      | [**Cloudflare**](docs/captchas/cloudflare.md)                                            |
| <img src="assets/images/captchas/geetest.svg" width="160" alt="GeeTest">                   | <img src="assets/images/captchas/arkose.svg" width="160" alt="Arkose Labs">                    | <img src="assets/images/captchas/aws.svg" width="160" alt="Amazon WAF">                          | <img src="assets/images/captchas/datadome-captcha.svg" width="160" alt="DataDome">                 | <img src="assets/images/captchas/mtcaptcha.svg" width="160" alt="MTCaptcha">             |
| [**GeeTest**](docs/captchas/geetest.md)                                                    | [**Arkose Labs**](docs/captchas/arkose.md)                                                     | [**Amazon WAF**](docs/captchas/aws.md)                                                           | [**DataDome**](docs/captchas/datadome.md)                                                          | [**MTCaptcha**](docs/captchas/mtcaptcha.md)                                              |
| <img src="assets/images/captchas/tencent.svg" width="160" alt="Tencent CAPTCHA">           | <img src="assets/images/captchas/hcaptcha.svg" width="160" alt="hCaptcha">                     | <img src="assets/images/captchas/yandex-smartcaptcha.svg" width="160" alt="Yandex SmartCaptcha"> | <img src="assets/images/captchas/vkcaptcha.svg" width="160" alt="VK Captcha">                      | <img src="assets/images/captchas/cap.svg" width="160" alt="Cap">                         |
| [**Tencent**](docs/captchas/tencent.md)                                                    | [**hCaptcha**](docs/captchas/hcaptcha.md)                                                      | [**Yandex**](docs/captchas/yandex-smartcaptcha.md)                                               | [**VK**](docs/captchas/vk.md)                                                                      | [**Cap**](docs/captchas/cap.md)                                                          |
| <img src="assets/images/captchas/yidun.svg" width="160" alt="Yidun CAPTCHA">               | <img src="assets/images/captchas/vaptcha.svg" width="160" alt="VAPTCHA">                       | <img src="assets/images/captchas/shumei.svg" width="160" alt="Shumei CAPTCHA">                   | <img src="assets/images/captchas/aliyun.svg" width="160" alt="Aliyun CAPTCHA">                     | <img src="assets/images/captchas/imperva.svg" width="160" alt="Imperva">                 |
| [**Yidun**](docs/captchas/yidun.md)                                                        | [**VAPTCHA**](docs/captchas/vaptcha.md)                                                        | [**Shumei**](docs/captchas/shumei.md)                                                            | [**Aliyun**](docs/captchas/aliyun.md)                                                              | [**Imperva**](docs/captchas/imperva.md)                                                  |
| <img src="assets/images/captchas/kasada.svg" width="160" alt="Kasada">                     | <img src="assets/images/captchas/human.svg" width="160" alt="HUMAN PerimeterX">                | <img src="assets/images/captchas/akamai.svg" width="160" alt="Akamai Bot Manager">               | <img src="assets/images/captchas/slider.svg" width="160" alt="Slider CAPTCHA">                     | <img src="assets/images/captchas/botdetect.svg" width="160" alt="BotDetect">             |
| [**Kasada**](docs/captchas/kasada.md)                                                      | [**HUMAN**](docs/captchas/human.md)                                                            | [**Akamai**](docs/captchas/akamai.md)                                                            | [**Slider**](docs/captchas/slider.md)                                                              | [**BotDetect**](docs/captchas/botdetect.md)                                              |
| <img src="assets/images/captchas/amazon.svg" width="160" alt="Amazon CAPTCHA">             | <img src="assets/images/captchas/binance.svg" width="160" alt="Binance CAPTCHA">               | <img src="assets/images/captchas/tiktok.svg" width="160" alt="TikTok CAPTCHA">                   | <img src="assets/images/captchas/audio.svg" width="160" alt="Audio CAPTCHA">                       | <img src="assets/images/captchas/altcha-captcha.svg" width="160" alt="Altcha">           |
| [**Amazon**](docs/captchas/amazon.md)                                                      | [**Binance**](docs/captchas/binance.md)                                                        | [**TikTok**](docs/captchas/tiktok.md)                                                            | [**Audio**](docs/captchas/audio.md)                                                                | [**Altcha**](docs/captchas/altcha.md)                                                    |
| <img src="assets/images/captchas/friendly-captcha.svg" width="160" alt="Friendly CAPTCHA"> | <img src="assets/images/captchas/atbcaptcha.svg" width="160" alt="ATB CAPTCHA">                | <img src="assets/images/captchas/captchafox.svg" width="160" alt="CaptchaFox">                   | <img src="assets/images/captchas/capy.svg" width="160" alt="Capy Puzzle">                          | <img src="assets/images/captchas/cutcaptcha.svg" width="160" alt="CutCaptcha">           |
| [**Friendly**](docs/captchas/friendly.md)                                                  | [**ATB**](docs/captchas/atbcaptcha.md)                                                         | [**CaptchaFox**](docs/captchas/captchafox.md)                                                    | [**Capy Puzzle**](docs/captchas/capy.md)                                                           | [**CutCaptcha**](docs/captchas/cutcaptcha.md)                                            |
| <img src="assets/images/captchas/lemin.svg" width="160" alt="Lemin">                       | <img src="assets/images/captchas/prosopo-procaptcha.svg" width="160" alt="Prosopo Procaptcha"> | <img src="assets/images/captchas/temu_captcha.svg" width="160" alt="Temu CAPTCHA">               |                                                                                                    |                                                                                          |
| [**Lemin**](docs/captchas/lemin.md)                                                        | [**Prosopo**](docs/captchas/prosopo.md)                                                        | [**Temu**](docs/captchas/temu.md)                                                                |                                                                                                    |                                                                                          |

## Useful Links
- [Bypass Tools](https://github.com/vsmutok/FuckCaptcha/blob/main/docs/solvers.md) - List of tools and services to bypass CAPTCHAs.
- [Useful Resources](https://github.com/vsmutok/FuckCaptcha/blob/main/docs/resources.md) - Additional resources and articles.

### Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---
  
### ⚠️ Disclaimer
  
This repository is created solely for **educational and research purposes**. Use the knowledge acquired responsibly and respect the terms of use of websites. The authors are not responsible for any misuse of the materials.

---

### ⭐ Star History
  
If this project was useful to you, give it a star! ⭐

---
