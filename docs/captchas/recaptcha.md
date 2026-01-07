# Google reCAPTCHA

reCAPTCHA is a service from Google that helps protect websites from spam and abuse. There are several main versions, each with its own characteristics.

---

### 1. reCAPTCHA v2
**Complexity: ⭐⭐⭐ (Medium)**

This is the most common version where the user needs to interact with a widget.

#### How it looks:
<img src="../../assets/images/captchas/recaptcha-v2.svg" alt="reCAPTCHA v2" height="150">

#### Characteristics:
- "I'm not a robot" checkbox.
- Image selection tasks (3x3 or 4x4 grid).
- Audio tasks for accessibility.

#### How to bypass:
| Tool | Description | Success Rate | Link |
|------------|------|--------------|-----------|
| **Buster** | 🔥 Browser extension, solves via audio | 80-95% | [dessant/buster](https://github.com/dessant/buster) |
| **GoogleRecaptchaBypass** | 🔥 Fast reCAPTCHA bypass | 90-95% | [sarperavci/GoogleRecaptchaBypass](https://github.com/sarperavci/GoogleRecaptchaBypass) |
| **Whisper** | Using OpenAI Whisper model for audio tasks | 90-99% | [openai/whisper](https://github.com/openai/whisper) |

---

### 2. reCAPTCHA v3
**Complexity: ⭐⭐⭐⭐ (High)**

Works in the background and evaluates user actions with scores (from 0.0 to 1.0).

#### How it looks:
<img src="../../assets/images/captchas/recaptcha-v3.svg" alt="reCAPTCHA v3" height="100">

#### Characteristics:
- **No visible tasks!**
- Small reCAPTCHA badge in the bottom right corner.
- Analyzes user behavior on the site.

#### How to bypass:
| Tool | Description | Success Rate | Link |
|------------|------|--------------|-----------|
| **undetected-chromedriver** | 🔥 Best option, imitates humans | 85-95% | [ultrafunkamsterdam/undetected-chromedriver](https://github.com/ultrafunkamsterdam/undetected-chromedriver) |
| **DrissionPage** | New automation framework | 80-90% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **playwright-stealth** | Stealth mode for Playwright | 75-90% | [AtuboDad/playwright_stealth](https://github.com/AtuboDad/playwright_stealth) |

---

### 3. reCAPTCHA Enterprise
**Complexity: ⭐⭐⭐⭐⭐ (Very High)**

An advanced version for large companies that combines v2 and v3 methods with additional security features.

#### How it looks:
<img src="../../assets/images/captchas/recaptcha-enterprise.svg" alt="reCAPTCHA Enterprise" height="150">

#### Characteristics:
- May include multi-factor authentication.
- Deep risk analysis.
- Often visually indistinguishable from v2/v3.

#### How to bypass:
- Use the same methods as for **reCAPTCHA v3** (Stealth browsers, simulation of real user behavior).
- For Enterprise, it's often critical to have high-quality proxies and a clean cookie history.

---

### General tips for bypassing reCAPTCHA:
1. **Quality proxies**: Use residential or mobile proxies.
2. **User-Agent**: Always use real and up-to-date browser headers.
3. **Mouse movement emulation**: When automating v2, it's important to imitate human movements.
4. **Cookies**: Session maintenance and the presence of cookies from Google services significantly increase the chances of easy passage.

---

#### 💰 Paid alternatives:
If free methods don't work or you need high speed, it's recommended to use API services such as **2Captcha**, **Anti-Captcha**, or **CapSolver**. See the [Paid services](../solvers.md#paid-services-api) section for more details.
