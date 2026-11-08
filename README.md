# FuckCaptcha [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/vsmutok/FuckCaptcha/blob/main/LICENSE)
![CAPTCHA types: 39](https://img.shields.io/badge/CAPTCHA_types-39-blue.svg)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/vsmutok/FuckCaptcha/blob/main/CONTRIBUTING.md)
[![GitHub stars](https://img.shields.io/github/stars/vsmutok/FuckCaptcha?style=social)](https://github.com/vsmutok/FuckCaptcha/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/vsmutok/FuckCaptcha)](https://github.com/vsmutok/FuckCaptcha/commits/main)
[![Contributors](https://img.shields.io/github/contributors/vsmutok/FuckCaptcha)](https://github.com/vsmutok/FuckCaptcha/graphs/contributors)

<picture>
  <source media="(prefers-color-scheme: light)" srcset="assets/brand/readme-banner-light.png">
  <img src="assets/brand/readme-banner.png" alt="FuckCaptcha — the field guide to 39 CAPTCHA types">
</picture>

**FuckCaptcha** is an open reference for understanding CAPTCHA types, their context and the approaches documented around them. It is intended for education and authorized research, not for evading protections on services without permission.

**[Browse the interactive field guide →](https://vsmutok.github.io/FuckCaptcha/)**

## Contents

- [Project Goal](#project-goal)
- [How to Use the Guide](#how-to-use-the-guide)
- [CAPTCHA Identification](#captcha-identification)
- [Difficulty Scale](#difficulty-scale)
- [Project Structure](#project-structure)
- [Useful Links](#useful-links)

---
## Project Goal

Bring a changing landscape of CAPTCHA systems into one approachable, maintained reference. The project aims to make the material easier to navigate, compare and cite while keeping responsible, authorized use explicit.

## How to Use the Guide

1. Browse or search the library for the CAPTCHA type you want to understand.
2. Read its overview and compare the documented approaches, references and limitations.
3. Keep testing within an environment where you have permission, and respect applicable terms and privacy.

The project brings together a practical, maintainable reference for researchers, developers and curious readers: **identify** common CAPTCHA families and their context, **compare** documented tools and approaches with their trade-offs, and **stay responsible** by prioritizing authorized research, privacy and transparent sourcing.

## CAPTCHA Identification

Choose a CAPTCHA below to open its guide, review the challenge category and see the references and options documented for it.

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
| <img src="assets/images/captchas/lemin.svg" width="160" alt="Lemin">                       | <img src="assets/images/captchas/prosopo-procaptcha.svg" width="160" alt="Prosopo Procaptcha"> | <img src="assets/images/captchas/temu_captcha.svg" width="160" alt="Temu CAPTCHA">               | <img src="assets/images/captchas/arcaptcha.svg" width="160" alt="ARCaptcha">                       |                                                                                          |
| [**Lemin**](docs/captchas/lemin.md)                                                        | [**Prosopo**](docs/captchas/prosopo.md)                                                        | [**Temu**](docs/captchas/temu.md)                                                                | [**ARCaptcha**](docs/captchas/arcaptcha.md)                                                        |                                                                                          |

## Need Help?

If you have trouble solving any type of CAPTCHA, feel free to [open an issue](https://github.com/vsmutok/FuckCaptcha/issues) or email me at [vasyl.smutok@gmail.com](mailto:vasyl.smutok@gmail.com), and I will try to help.

## Difficulty Scale

Difficulty labels are editorial estimates for navigating the guide, not guarantees of how a challenge will behave in a particular context.

The five labels are **1 — Low**, **2 — Below average**, **3 — Medium**, **4 — High** and **5 — Very high**.

## Project Structure

The `docs/captchas/` directory contains individual reference pages; `docs/solvers.md` indexes documented tools and services; `docs/resources.md` collects further reading; `assets/images/captchas/` stores catalog illustrations; and `assets/brand/` contains the logo and banner artwork.

## Useful Links
- [Solver and service index](https://github.com/vsmutok/FuckCaptcha/blob/main/docs/solvers.md) - A directory of documented options.
- [Research resources](https://github.com/vsmutok/FuckCaptcha/blob/main/docs/resources.md) - Further reading and references.

### Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---
  
### Disclaimer
  
This repository is provided for **educational and authorized research purposes**. Respect applicable law, privacy and the terms of the services you use. The authors are not responsible for misuse of this material.

---

### Star History
  
If this project was useful to you, give it a star! ⭐

---
