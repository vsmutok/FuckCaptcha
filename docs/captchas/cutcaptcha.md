# CutCaptcha

**Complexity: ⭐⭐⭐ (Medium)**

CutCaptcha ("cut" + "captcha") is a puzzle CAPTCHA where the user selects the correct cut piece and assembles the picture. It appears mostly on file-sharing/download sites such as Filecrypt and therefore inside download managers like JDownloader. There is no official documentation site — the parameters have to be reverse-engineered from real deployments.

#### How it looks:
<img src="../../assets/images/captchas/cutcaptcha.svg" alt="CutCaptcha" height="200">

#### How to identify:
- Challenge inside an `<iframe>`; the page has a global `CUTCAPTCHA_MISERY_KEY` variable
- The key is a 40-character hex string (SHA-1 length), e.g. `56a9e9b989aa8cf99e0cea28d4b4678b84fa7a4e`
- The iframe's inner `document.body` has a `data-apikey` attribute (8 letters/digits), e.g. `SAb83IIB`
- The same 8-character API key is often the name of the included JS file
- Result field `input#cap_token`; callback `capResponseCallback(token)`
- Common on Filecrypt download-container pages

#### How it works:
1. The page embeds the CutCaptcha widget in an iframe and exposes `CUTCAPTCHA_MISERY_KEY`.
2. The widget shows a puzzle: pick/assemble the right cut fragment into the picture.
3. On success the client receives a token.
4. The token is placed into `input#cap_token` (or passed to `capResponseCallback`) and submitted.
5. The site's backend validates the token — there is no public siteverify endpoint to call yourself.

---

### Free bypass methods

| Method | Description | Success Rate | Link |
|--------|-------------|--------------|------|
| **DrissionPage** | 🔥 Real browser; solve the puzzle and inject the token | 70-85% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **OpenCV** | Fragment/gap matching for the cut puzzle | 70-85% | [opencv/opencv-python](https://github.com/opencv/opencv-python) |
| **ddddocr** | Piece recognition fallback | 60-80% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |
| **Patchright** | Stealth Playwright for iframe interaction | 65-85% | [Kaliiiiiiiiii-Vinyzu/patchright-python](https://github.com/Kaliiiiiiiiii-Vinyzu/patchright-python) |
| **JDownloader + solver plugin** | Existing integrations already handle CutCaptcha flows | varies | [JDownloader](https://jdownloader.org/) |

### Practical approach
1. Get the exact page URL — it must include the path where the CAPTCHA is loaded, not just the domain.
2. Read `CUTCAPTCHA_MISERY_KEY` from the page's JS context.
3. Get the API key from the iframe's inner body (`data-apikey`) or from the included JS filename.
4. Solve the puzzle: identify the correct fragment, drag/click it into place with a human-like path.
5. Write the token to `input#cap_token`, then submit the form — or call `capResponseCallback(token)` if defined.

### Practical tips
- Don't look for `data-sitekey`; CutCaptcha doesn't use it.
- Cross-origin iframes hide the inner body — use the JS-filename trick for the API key.
- The service is a single point of failure: if `v2.cutcaptcha.net` is down or its certificate expired, the CAPTCHA simply won't load (this happened in June 2024).
- `cutcaptcha.com` is a parked domain; there are no official docs.
- Keep cookies/session from solving to submission; the token is tied to the challenge session.

---

#### 💰 Paid alternatives:

| Service | CutCaptcha support | Notes |
|---------|--------------------|-------|
| **2Captcha** | `CutCaptchaTaskProxyless` / `CutCaptchaTask` | Needs `miseryKey` + `apiKey` |
| **CapSolver** | CutCaptcha | Token-based |
| **Anti-Captcha** | CutCaptcha (check task list) | Availability varies |
| **EveryInfra / Unlock API** | CutCaptcha | Alternative providers |

If free methods don't work, use API services: **2Captcha**. More details in the [Paid services](../solvers.md#paid-services-api) section.
