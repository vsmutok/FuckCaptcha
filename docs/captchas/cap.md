# Cap

**Complexity: ⭐ (Low)**

Cap is an open-source, self-hosted proof-of-work CAPTCHA. It is designed as a lightweight alternative to Cloudflare Turnstile: the browser solves a SHA-256 proof-of-work in a Web Worker, the user sees a small "Verify" widget, and the server validates a single-use token. There are no image puzzles, so the cheapest bypass is to let the widget do its job and capture the token.

#### How it looks:
<img src="../../assets/images/captchas/cap.svg" alt="Cap CAPTCHA" height="200">

#### How to identify:
- Custom element `<cap-widget>` or `<cap-widget data-cap-api-endpoint="...">`
- Attributes such as `data-cap-api-endpoint`, `data-cap-worker-count`, `data-cap-hidden-field-name`
- Hidden input `cap-token` (the name can be customised)
- "Verify" button with a short progress state
- Script from `https://cdn.jsdelivr.net/npm/@cap.js/widget` or a self-hosted copy
- Network calls to the configured `/challenge` and `/redeem` endpoints

#### How it works:
1. The widget requests a challenge from the site's Cap endpoint.
2. The browser solves a SHA-256 proof-of-work in one or more Web Workers.
3. The solution is redeemed for a token, which is written to the hidden `cap-token` field.
4. The widget emits a `solve` event with `event.detail.token`.
5. The backend validates the token with `@cap.js/server` (or the standalone Docker service).
6. Tokens are single-use, short-lived, and bound to the challenge.

---

### Free & open-source bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **Official widget** | 🔥 Load the widget and wait for `solve` / `cap-token` | ~100% | [tiagorangel1/cap](https://github.com/tiagorangel1/cap) |
| **@cap.js/solver** | Server-side Node.js solver for the proof-of-work | ~100% | [Cap solver docs](https://trycap.dev/guide/solver/) |
| **Playwright / DrissionPage** | Run the widget in a real browser and read the hidden field | ~100% | [microsoft/playwright-python](https://github.com/microsoft/playwright-python) · [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **Node worker script** | Reimplement the SHA-256 loop for headless pipelines | ~100% | [tiagorangel1/cap](https://github.com/tiagorangel1/cap) |

### Practical approach
1. Open the page with JavaScript and Web Workers enabled.
2. Wait for `<cap-widget>` to render and click "Verify" if required.
3. Listen for the `solve` event or poll the hidden `cap-token` input.
4. Submit the form immediately; the token is single-use.
5. If the site uses a custom hidden field name, read the widget attributes to find it.

### Practical tips
- Cap is CPU-bound: give the browser enough time and do not throttle background tabs.
- Web Workers and `crypto.subtle` must be available; some hardened headless profiles disable them.
- The token is validated server-side, so it cannot be forged — but it is cheap to generate locally.
- Self-hosted deployments may use a custom endpoint; read `data-cap-api-endpoint`.
- Cap is not a bot-management product: it proves work, not humanity. Pair it with rate limits on the server.

---

#### 💰 Paid alternatives:

Cap is intentionally cheap to solve locally, so token services are unnecessary. If you need scale, run the proof-of-work in your own worker pool or use a browser API:

| Service | Notes |
|---------|-------|
| **Bright Data / ZenRows / ScrapingBee** | Run the widget inside a managed browser |
| **2Captcha / CapSolver** | Usually do not offer Cap-specific tasks; local solving is faster and cheaper |

More details in the [Paid services](../solvers.md#paid-services-api) section.
