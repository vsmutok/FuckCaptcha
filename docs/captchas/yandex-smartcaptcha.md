# Yandex SmartCaptcha

**Complexity: ⭐⭐⭐ (Medium)**

Yandex SmartCaptcha is the CAPTCHA service used across Yandex Cloud and a large part of the Russian web. It is a checkbox widget backed by a risk engine, with image challenges for suspicious sessions. The visible widget is small, but the token is short-lived and bound to the site key, so it must be verified server-side quickly.

#### How it looks:
<img src="../../assets/images/captchas/yandex-smartcaptcha.svg" alt="Yandex SmartCaptcha" height="200">

#### How to identify:
- Container `<div class="smart-captcha" data-sitekey="...">`
- Script `https://smartcaptcha.yandexcloud.net/captcha.js` (or `captcha.yandexcloud.net`)
- Checkbox with the text "I'm not a robot" / «Я не робот»
- Hidden input `smart-token`
- Image challenge with distorted text or object selection
- Callback attributes `data-callback`, `data-hl` (language)

#### How it works:
1. The widget requests a challenge for the site key and renders the checkbox.
2. On interaction, Yandex validates browser and network signals and may show an image challenge.
3. The token is placed in the hidden `smart-token` input.
4. The site backend validates it with a POST to `https://smartcaptcha.cloud.yandex.ru/validate`:

```text
secret=YOUR_SERVER_KEY
token=SMART_TOKEN
ip=USER_IP
host=example.com        # optional
```

5. A successful response has `status: "ok"`; failures return `status: "failed"` with a `message`.
6. Tokens are single-use and valid for about 5 minutes. Reusing a token or validating it from a different IP/host is rejected.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **Real browser (Playwright/DrissionPage)** | 🔥 Click the checkbox and read `smart-token`; the widget does the rest | 80–95% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Patchright / Camoufox** | Stealth browsers for sessions that get repeated image challenges | 60–85% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) · [daijro/camoufox](https://github.com/daijro/camoufox) |
| **ddddocr / EasyOCR** | Recognise the text-based image fallback | 60–85% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) · [JaidedAI/EasyOCR](https://github.com/JaidedAI/EasyOCR) |
| **YOLOv8** | Detect objects in selection challenges | 80–95% (trained) | [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) |

### Practical approach
1. Use a browser profile with Russian language and timezone if the target audience is Russian.
2. Load the page and wait for the `.smart-captcha` container to render.
3. Click the checkbox with a natural mouse movement; avoid instant programmatic clicks.
4. If an image challenge appears, solve it with OCR or object detection and submit.
5. Read `smart-token` right before submitting the form and validate it from the same IP.
6. Do not refresh the widget after the token is issued.

### Practical tips
- The `ip` parameter in server validation should match the user's IP; mismatches are a common cause of `failed`.
- `host` must match the domain configured for the site key.
- The widget can be configured to run invisibly; in that case just wait for `smart-token`.
- Repeated failures increase challenge difficulty, so fall back to a fresh browser profile and a new IP.
- SmartCaptcha is rare outside Russian-language sites; matching locale signals matters more than for global providers.

---

#### 💰 Paid alternatives:

| Service | Notes |
|---------|-------|
| **2Captcha** | Supports Yandex SmartCaptcha via a dedicated task type; check the current API docs |
| **CapSolver** | Lists Yandex SmartCaptcha support; verify the current task schema |
| **Residential proxies** | Often more useful than a solver, because the token is bound to the session IP |

More details in the [Paid services](../solvers.md#paid-services-api) section.
