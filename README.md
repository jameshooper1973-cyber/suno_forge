# suno_forge
# SunoForge Dark

A gothic ritual prompt builder for [Suno AI](https://suno.com). Select your genre, mood, instruments, key, and BPM — then auto-generate full lyrics (90+ words) powered by Qwen2.5 via HuggingFace. Copy the Style Box and Lyrics Box directly into Suno.

---

## Features

- **Style Box builder** — chip selectors for Genre, Mood, Instruments, Vocals, Effects, Key/Mode, BPM
- **17 ritual presets** — tap any to auto-generate a full prompt
- **AI lyrics generation** — Qwen2.5-7B writes 90+ word dark ritual lyrics matched to your style
- **Bilingual mode** — alternates lines between English and an ancient language (Latin, Sumerian, Enochian, Ancient Egyptian, Old Norse, Ancient Greek)
- **Structural cue tags** — insert Suno-compatible `[Verse]`, `[Chorus]`, `[Drop]` etc. with one tap
- **Mobile first** — built for Android, works in any browser

---

## File Structure

```
index.html       — entire frontend, single file
api/lyrics.js    — Vercel serverless function, proxies to HuggingFace Qwen
vercel.json      — Vercel config
```

---

## Deploy

### 1. HuggingFace Token
- Go to [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
- Create a token with **read** access (free account works)
- Copy the token

### 2. GitHub
- Create a new repo
- Upload all three files maintaining the `api/` subfolder structure:
  ```
  index.html
  api/lyrics.js
  vercel.json
  ```

### 3. Vercel
- Go to [vercel.com](https://vercel.com) → **Add New Project**
- Import your GitHub repo
- No build settings needed
- Go to **Project Settings → Environment Variables**
- Add: `HF_TOKEN` = your HuggingFace token
- **Redeploy** after adding the variable (Vercel requires a redeploy for env vars to take effect)

---

## How It Works

The frontend never touches the HuggingFace API directly. When you tap **Auto-Generate** or load a ritual preset:

1. `index.html` sends the prompt to `/api/lyrics`
2. Vercel runs `api/lyrics.js` server-side
3. `lyrics.js` calls HuggingFace Qwen2.5-7B-Instruct using `HF_TOKEN`
4. Lyrics are returned to the frontend

This keeps the token server-side and avoids CORS issues.

---

## Model

**Qwen/Qwen2.5-7B-Instruct** via HuggingFace Inference API  
Free tier supported. First request may be slow due to cold start.
