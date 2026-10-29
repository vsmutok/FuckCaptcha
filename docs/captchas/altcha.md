# Altcha

**Complexity: ⭐ (Low)**

ALTCHA is an open-source, self-hosted, privacy-first CAPTCHA alternative. Instead of visual puzzles it uses **proof-of-work (PoW)**: the browser computes a cryptographic challenge in the background and submits a signed payload. There is no tracking or fingerprinting by design, so the "bypass" is simply to solve the PoW — no browser interaction is required.

#### How it looks:
<img src="../../assets/images/captchas/altcha-captcha.svg" alt="Altcha" height="200">

#### How to identify:
- `<altcha-widget>` element or the `altcha` script (`altcha.min.js` / `altcha.js`)
- Checkbox "I'm not a robot" that turns into "Verification successful" after a short wait
- A JSON challenge with fields like `algorithm`, `challenge`, `salt`, `signature`, `maxnumber`
- Hidden form field named `altcha` containing a base64 payload
- Requests to `/altcha` or a configured challenge endpoint
- In v3, algorithm names such as `PBKDF2/SHA-256`, `SCRYPT`, `ARGON2ID`

#### How it works:
1. The server creates a challenge and signs it with an HMAC secret.
2. The widget solves the PoW in a Web Worker (iterated hash / PBKDF2 / scrypt / Argon2id).
3. The solution is packed into a base64 payload together with the challenge and signature.
4. The payload is placed in the `altcha` hidden field and submitted.
5. The server verifies the PoW and the signature; no token service is involved.

---

### Free bypass methods

| Method | Description | Success Rate | Link |
|--------|-------------|--------------|------|
| **altcha (official Python lib)** | 🔥 Solves the challenge and builds the payload | ~100% (if cost is reasonable) | [altcha-org/altcha-lib-py](https://github.com/altcha-org/altcha-lib-py) |
| **Official JS widget** | Run the widget in Node/Playwright and read the payload | ~100% | [altcha-org/altcha](https://github.com/altcha-org/altcha) |
| **Custom solver** | Reimplement SHA-256/PBKDF2/scrypt/Argon2id search | ~100% (v1) | [hashlib](https://docs.python.org/3/library/hashlib.html) |
| **Playwright / DrissionPage** | Let the real page solve the PoW, then read the hidden input | ~100% | [g1879/DrissionPage](https://github.com/g1879/DrissionPage) |
| **ddddocr** | Only for the optional image-code fallback | 60-85% | [sml2h3/ddddocr](https://github.com/sml2h3/ddddocr) |

### Python approach (official library)
1. Fetch the page/challenge JSON; extract the challenge object.
2. Solve it with `solve_challenge(challenge)`.
3. Build `Payload(challenge, solution).to_base64()`.
4. Put the result into the `altcha` form field and submit.

```python
from altcha import solve_challenge, Payload

solution = solve_challenge(challenge)
payload = Payload(challenge, solution).to_base64()
data = {"altcha": payload}
```

### Practical tips
- The cost/`maxnumber` determines solving time. Low-cost challenges solve in milliseconds; Argon2id/scrypt challenges may take seconds but are still cheap compared to a real CAPTCHA.
- The payload is signed; modifying any field invalidates it.
- Some deployments use a short validity window — submit the payload promptly.
- ALTCHA can be configured with an image-code fallback; that fallback is OCR-able, but the PoW path is easier.
- Because it is self-hosted, there is no central bypass API; write a generic solver once and reuse it.

---

#### 💰 Paid alternatives:

Paying is usually unnecessary: PoW challenges are cheap to solve locally. If the deployment adds an image-code fallback or a custom anti-bot layer, use a normal OCR/image service:

| Service | Notes |
|---------|-------|
| **2Captcha** | Image/code fallback |
| **Anti-Captcha** | Image/code fallback |
| **CapSolver** | Image/code fallback |

More details in the [Paid services](../solvers.md#paid-services-api) section.
