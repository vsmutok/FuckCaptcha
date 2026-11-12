<div align="center">

# FuckCaptcha [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

<picture>
  <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/brand/readme-banner-light.png">
  <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/brand/readme-banner.png">
  <img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/brand/readme-banner-light.png" alt="FuckCaptcha — the field guide to 39 CAPTCHA types">
</picture>

<br>
<br>

[![Field guide: live](https://img.shields.io/website?url=https%3A%2F%2Fvsmutok.github.io%2FFuckCaptcha%2F&style=flat-square&label=field%20guide&up_message=live&down_message=offline&color=14919b)](https://vsmutok.github.io/FuckCaptcha/#library)
[![CAPTCHA types: 39](https://img.shields.io/badge/CAPTCHA_types-39-6b5b95?style=flat-square)](https://vsmutok.github.io/FuckCaptcha/#captcha-grid)
[![License: CC0 1.0](https://img.shields.io/badge/license-CC0_1.0-4c8c6a?style=flat-square)](https://github.com/vsmutok/FuckCaptcha/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/vsmutok/FuckCaptcha?style=flat-square&color=c1943a)](https://github.com/vsmutok/FuckCaptcha/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/vsmutok/FuckCaptcha?style=flat-square&color=4f6f9e)](https://github.com/vsmutok/FuckCaptcha/commits/main)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-b26a8a?style=flat-square)](https://github.com/vsmutok/FuckCaptcha/blob/main/CONTRIBUTING.md)

<br>

**FuckCaptcha** is an open reference for understanding CAPTCHA types, their context and the approaches documented around them. It is intended for education and authorized research, not for evading protections on services without permission.

**[Browse the interactive field guide →](https://vsmutok.github.io/FuckCaptcha/)**

</div>

## Contents

- [Project Goal](#project-goal)
- [How to Use the Guide](#how-to-use-the-guide)
- [CAPTCHA Identification](#captcha-identification)
- [Useful Links](#useful-links)
- [Need Help](#need-help)
- [Star History](#star-history)

## Project Goal

CAPTCHAs are one of the main obstacles in web scraping and automation, and the landscape changes constantly. This guide keeps it in one maintained place: how to **identify** each CAPTCHA family, **compare** the documented tools and approaches with their trade-offs, and pick what fits your case, whether that is a solver, a library or avoiding the challenge altogether.

## How to Use the Guide

1. Find the CAPTCHA you are dealing with in the catalog below, or search the interactive library.
2. Read its overview, detection signals, documented approaches and limitations.
3. Choose an approach that fits your project and budget.

## CAPTCHA Identification

Each tile opens its guide. Stars show how hard the CAPTCHA is to deal with, from ★☆☆☆☆ (low) to ★★★★★ (very high). 

<details>
<summary>Difficulty scale</summary>

| Score             | Rating | Meaning                                                                       |
| ----------------- | :----: | ----------------------------------------------------------------------------- |
| 1 — Low           | ★☆☆☆☆  | Straightforward challenge with widely documented, well-understood approaches. |
| 2 — Below average | ★★☆☆☆  | Mostly simple, with a few quirks that require some care.                      |
| 3 — Medium        | ★★★☆☆  | A balanced challenge that combines several techniques or moving parts.        |
| 4 — High          | ★★★★☆  | Complex challenge needing deeper analysis, tooling or tuning.                 |
| 5 — Very high     | ★★★★★  | Advanced, frequently updated or heavily defended; hardest to deal with.       |

</details><table>
  <tr>
    <td align="center"><a href="docs/captchas/normal.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/normal.svg" width="160" alt="Text-based CAPTCHA"><br><b>Text-based</b><br><sub title="Difficulty 1/5">★☆☆☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/recaptcha.md#1-recaptcha-v2"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/recaptcha-v2.svg" width="160" alt="reCAPTCHA v2"><br><b>reCAPTCHA v2</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/recaptcha.md#2-recaptcha-v3"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/recaptcha-v3.svg" width="160" alt="reCAPTCHA v3"><br><b>reCAPTCHA v3</b><br><sub title="Difficulty 4/5">★★★★☆</sub></a></td>
    <td align="center"><a href="docs/captchas/recaptcha.md#3-recaptcha-enterprise"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/recaptcha-enterprise.svg" width="160" alt="reCAPTCHA Enterprise"><br><b>reCAPTCHA Enterprise</b><br><sub title="Difficulty 5/5">★★★★★</sub></a></td>
    <td align="center"><a href="docs/captchas/cloudflare.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/cloudflare.svg" width="160" alt="Cloudflare Turnstile"><br><b>Cloudflare</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="docs/captchas/geetest.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/geetest.svg" width="160" alt="GeeTest"><br><b>GeeTest</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/arkose.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/arkose.svg" width="160" alt="Arkose Labs"><br><b>Arkose Labs</b><br><sub title="Difficulty 4/5">★★★★☆</sub></a></td>
    <td align="center"><a href="docs/captchas/aws.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/aws.svg" width="160" alt="Amazon WAF"><br><b>Amazon WAF</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/datadome.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/datadome-captcha.svg" width="160" alt="DataDome"><br><b>DataDome</b><br><sub title="Difficulty 5/5">★★★★★</sub></a></td>
    <td align="center"><a href="docs/captchas/mtcaptcha.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/mtcaptcha.svg" width="160" alt="MTCaptcha"><br><b>MTCaptcha</b><br><sub title="Difficulty 2/5">★★☆☆☆</sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="docs/captchas/tencent.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/tencent.svg" width="160" alt="Tencent CAPTCHA"><br><b>Tencent</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/hcaptcha.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/hcaptcha.svg" width="160" alt="hCaptcha"><br><b>hCaptcha</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/yandex-smartcaptcha.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/yandex-smartcaptcha.svg" width="160" alt="Yandex SmartCaptcha"><br><b>Yandex</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/vk.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/vkcaptcha.svg" width="160" alt="VK Captcha"><br><b>VK</b><br><sub title="Difficulty 4/5">★★★★☆</sub></a></td>
    <td align="center"><a href="docs/captchas/cap.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/cap.svg" width="160" alt="Cap"><br><b>Cap</b><br><sub title="Difficulty 1/5">★☆☆☆☆</sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="docs/captchas/yidun.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/yidun.svg" width="160" alt="Yidun CAPTCHA"><br><b>Yidun</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/vaptcha.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/vaptcha.svg" width="160" alt="VAPTCHA"><br><b>VAPTCHA</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/shumei.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/shumei.svg" width="160" alt="Shumei CAPTCHA"><br><b>Shumei</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/aliyun.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/aliyun.svg" width="160" alt="Aliyun CAPTCHA"><br><b>Aliyun</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/imperva.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/imperva.svg" width="160" alt="Imperva"><br><b>Imperva</b><br><sub title="Difficulty 5/5">★★★★★</sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="docs/captchas/kasada.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/kasada.svg" width="160" alt="Kasada"><br><b>Kasada</b><br><sub title="Difficulty 5/5">★★★★★</sub></a></td>
    <td align="center"><a href="docs/captchas/human.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/human.svg" width="160" alt="HUMAN PerimeterX"><br><b>HUMAN</b><br><sub title="Difficulty 5/5">★★★★★</sub></a></td>
    <td align="center"><a href="docs/captchas/akamai.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/akamai.svg" width="160" alt="Akamai Bot Manager"><br><b>Akamai</b><br><sub title="Difficulty 5/5">★★★★★</sub></a></td>
    <td align="center"><a href="docs/captchas/slider.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/slider.svg" width="160" alt="Slider CAPTCHA"><br><b>Slider</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/botdetect.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/botdetect.svg" width="160" alt="BotDetect"><br><b>BotDetect</b><br><sub title="Difficulty 1/5">★☆☆☆☆</sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="docs/captchas/amazon.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/amazon.svg" width="160" alt="Amazon CAPTCHA"><br><b>Amazon</b><br><sub title="Difficulty 1/5">★☆☆☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/binance.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/binance.svg" width="160" alt="Binance CAPTCHA"><br><b>Binance</b><br><sub title="Difficulty 4/5">★★★★☆</sub></a></td>
    <td align="center"><a href="docs/captchas/tiktok.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/tiktok.svg" width="160" alt="TikTok CAPTCHA"><br><b>TikTok</b><br><sub title="Difficulty 4/5">★★★★☆</sub></a></td>
    <td align="center"><a href="docs/captchas/audio.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/audio.svg" width="160" alt="Audio CAPTCHA"><br><b>Audio</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/altcha.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/altcha-captcha.svg" width="160" alt="Altcha"><br><b>Altcha</b><br><sub title="Difficulty 1/5">★☆☆☆☆</sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="docs/captchas/friendly.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/friendly-captcha.svg" width="160" alt="Friendly CAPTCHA"><br><b>Friendly</b><br><sub title="Difficulty 1/5">★☆☆☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/atbcaptcha.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/atbcaptcha.svg" width="160" alt="ATB CAPTCHA"><br><b>ATB</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/captchafox.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/captchafox.svg" width="160" alt="CaptchaFox"><br><b>CaptchaFox</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/capy.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/capy.svg" width="160" alt="Capy Puzzle"><br><b>Capy Puzzle</b><br><sub title="Difficulty 2/5">★★☆☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/cutcaptcha.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/cutcaptcha.svg" width="160" alt="CutCaptcha"><br><b>CutCaptcha</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="docs/captchas/lemin.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/lemin.svg" width="160" alt="Lemin"><br><b>Lemin</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/prosopo.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/prosopo-procaptcha.svg" width="160" alt="Prosopo Procaptcha"><br><b>Prosopo</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"><a href="docs/captchas/temu.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/temu_captcha.svg" width="160" alt="Temu CAPTCHA"><br><b>Temu</b><br><sub title="Difficulty 4/5">★★★★☆</sub></a></td>
    <td align="center"><a href="docs/captchas/arcaptcha.md"><img src="https://raw.githubusercontent.com/vsmutok/FuckCaptcha/main/assets/images/captchas/arcaptcha.svg" width="160" alt="ARCaptcha"><br><b>ARCaptcha</b><br><sub title="Difficulty 3/5">★★★☆☆</sub></a></td>
    <td align="center"></td>
  </tr>
</table>

## Useful Links

- [Solver and service index](https://github.com/vsmutok/FuckCaptcha/blob/main/docs/solvers.md) - Open-source projects and services documented in the guide.
- [Research resources](https://github.com/vsmutok/FuckCaptcha/blob/main/docs/resources.md) - Papers, write-ups and further reading.

## Need Help

Stuck on a specific CAPTCHA? [Open an issue](https://github.com/vsmutok/FuckCaptcha/issues) or email [vasyl.smutok@gmail.com](mailto:vasyl.smutok@gmail.com), and I will try to help.

## Contributing

Contributions are welcome: new CAPTCHA types, fresher references or corrections. See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow.

## Star History

If this project was useful to you, give it a star.

[![Star History Chart](https://api.star-history.com/svg?repos=vsmutok/FuckCaptcha&type=Date)](https://star-history.com/#vsmutok/FuckCaptcha&Date)
