# Audio CAPTCHAs

**Complexity: ⭐⭐⭐ (Medium)**

Audio CAPTCHAs are either standalone ("type what you hear") or an accessibility fallback for visual CAPTCHAs (reCAPTCHA, hCaptcha, AWS WAF, MTCaptcha, etc.). They usually contain spoken digits/letters mixed with background noise, music or distortion. For automation, the audio fallback is often the easiest route into an otherwise hard visual challenge.

#### How it looks:
<img src="../../assets/images/captchas/audio.svg" alt="Audio Captcha" height="200">

#### How to identify:
- Audio player / speaker icon, often next to a visual challenge
- "Type what you hear" / "Press play" instruction
- Requests to endpoints like `/audio`, `/audio.mp3`, `/captcha/audio`, or base64 audio in JSON
- `audio/mpeg`, `audio/wav`, `audio/ogg` responses
- Often a refresh button because the first clip may be intentionally noisy

#### How it works:
1. The server generates a random answer and renders a short audio clip (TTS + noise).
2. The clip URL is tied to the session and expires quickly.
3. The user types the answer; the server compares it with the stored value.
4. Some systems rotate the answer after N failed attempts or block audio after too many requests.

---

### Free bypass methods

| Tool | Description | Success Rate | Link |
|------|-------------|--------------|------|
| **Whisper** | 🔥🔥 Best general solution; large-v3 handles noise well | 90-99% | [openai/whisper](https://github.com/openai/whisper) |
| **faster-whisper** | CTranslate2 implementation, 4× faster, lower memory | 90-98% | [SYSTRAN/faster-whisper](https://github.com/SYSTRAN/faster-whisper) |
| **Vosk** | Offline lightweight STT, good for digits/letters | 70-85% | [alphacep/vosk-api](https://github.com/alphacep/vosk-api) |
| **wav2vec2** | Self-supervised STT models from Hugging Face | 70-90% | [facebook/wav2vec2-base-960h](https://huggingface.co/facebook/wav2vec2-base-960h) |
| **SpeechBrain** | STT toolkit with pretrained models | 70-90% | [speechbrain/speechbrain](https://github.com/speechbrain/speechbrain) |
| **noisereduce** | Spectral-gating denoising before STT | — (preprocessing) | [timsainb/noisereduce](https://github.com/timsainb/noisereduce) |
| **FFmpeg** | Convert, trim, normalize, resample audio | — (preprocessing) | [FFmpeg/FFmpeg](https://github.com/FFmpeg/FFmpeg) |

### Recommended pipeline
1. Download the audio with the same session cookies used for the challenge.
2. Convert to 16 kHz mono WAV: `ffmpeg -i in.mp3 -ar 16000 -ac 1 out.wav`.
3. Trim silence and normalize loudness (`loudnorm`); optionally apply light denoising.
4. Transcribe with **faster-whisper** (`small`/`medium`/`large-v3` depending on noise).
5. Restrict the expected alphabet when the site uses digits only (post-process the text).
6. If the answer is rejected, request a **new** audio clip — repeating the same one usually fails.

### Improving accuracy
- Try several preprocessing variants (raw, denoised, high-pass filtered) and pick the most confident transcription.
- Use language hints (`language="en"`) and disable translation.
- For digit-only challenges, map spoken words ("seven") to digits and strip spaces.
- Split the clip into segments if the speech is slow; transcribe each and concatenate.
- Keep a small local model for high volume and a large model for difficult clips.

### Practical tips
- Audio endpoints are often rate-limited and flagged faster than visual ones; don't hammer them from one IP.
- reCAPTCHA audio is heavily abused, so Google may serve distorted clips or block the audio path entirely for suspicious sessions.
- Some sites disable the audio button unless the page is focused/visible; simulate real interaction.
- The audio answer is usually case-insensitive, but check the site's behavior before normalizing.
- Always solve in the same session and submit quickly — audio tokens expire fast.

---

#### 💰 Paid alternatives:

Audio CAPTCHAs are usually cheap image/text tasks for paid services (send the clip or its transcription challenge):

| Service | Notes |
|---------|-------|
| **2Captcha** | Supports audio CAPTCHA / audio recognition tasks |
| **Anti-Captcha** | Audio recognition task type |
| **CapSolver** | Audio-to-text where supported |
| **CapMonster** | Audio recognition |

If free methods don't work, use API services: **2Captcha**, **Anti-Captcha**, or **CapSolver**. More details in the [Paid services](../solvers.md#paid-services-api) section.
