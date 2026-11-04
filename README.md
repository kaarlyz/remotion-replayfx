# ReplayFX — Programmatic Motion Teaser 🎬⚡

> High-octane commercial video teaser engineered entirely in code using **Remotion 4**, **React 19**, and **TypeScript**. Features 12 cinematic scenes, custom mathematical easing curves, dynamic audio sync, and 60 FPS transitions.

[![Remotion](https://img.shields.io/badge/Remotion-4.0-FF4154?logo=remotion&logoColor=white)](https://remotion.dev/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)

---

## 🎬 Video Specs & Architecture

| Parameter | Specification |
| :--- | :--- |
| **Duration** | 900 frames (30.0 seconds @ 30 FPS) |
| **Resolution** | 1280 × 720 (16:9 Landscape HD) |
| **Renderer** | Headless Chrome GPU Canvas via Remotion CLI |
| **Audio** | Synced `hype_audio.wav` with automated transitional ducking |

---

## 🎞️ 12-Scene Storyboard Pipeline

```text
[01] Hook ────────► [02] Reveal ──────► [03] Value Pillars ──► [04] Live Candlesticks
"90% Blow Up"       "REPLAYFX"          3 Architecture Cards    Real-time OHLC render
      │                   │                     │                     │
      ▼                   ▼                     ▼                     ▼
[05] TP Flash ────► [06] MFE/MAE ─────► [07] Monte Carlo ────► [08] Prop Firm Stamps
+$1,450 Profit      Risk/Reward Split   10,000 Iterations       FTMO / Funding Pips
      │                   │                     │                     │
      ▼                   ▼                     ▼                     ▼
[09] WhatsApp ────► [10] Equity Curve ─► [11] Tech Stack ────► [12] Grand Finale
Telegram Bot Ping   Rocket Linechart    Vite / SQLite / Node   CTA & Sound Outro
```

---

## 🛠️ Transitions & Motion Mechanics

- **Mathematical Springs & Easing:** Built with `@remotion/transitions` utilizing `slide()`, `blurSlide()`, `zoomInOut()`, `fade()`, and `wipe()`.
- **Procedural Particle Background (`src/v4/Bg.tsx`):** Canvas radial gradients and moving grid lines that react to scene progression.
- **Python Audio Synthesis:** Includes standalone audio generation script `generate_hype_audio.py` for procedural audio synthesis.

---

## 🚀 Quick Start & Studio Preview

### 1. Installation
```bash
git clone https://github.com/kaarlyz/remotion-replayfx.git
cd remotion-replayfx
npm install
```

### 2. Launch Remotion Studio (Interactive Web Preview)
Starts the interactive browser studio with frame scrubbing, layer inspection, and audio wave:
```bash
npm run dev
# or
npx remotion studio
```
Access the studio at `http://localhost:3000`.

### 3. Headless Video Export (Render MP4)
Render the complete H.264 video file directly to disk:
```bash
npx remotion render ReplayFXV4 out/replayfx_v4.mp4
```

---

## 📁 Repository Structure

```text
remotion-replayfx/
├── src/
│   ├── Composition.tsx       # 12-scene sequence & transition orchestration
│   ├── Root.tsx              # Remotion root configuration & registry
│   ├── index.ts              # Remotion entry point
│   └── v4/                   # Scene components & animated SVG elements
│       ├── Bg.tsx            # Animated tech background grid & glow
│       └── Scenes.tsx        # High-craft visual cards (S01 to S12)
├── public/                   # Soundtracks & static assets (hype_audio.wav)
├── generate_hype_audio.py    # Python synthesizer for procedural sound effects
├── remotion.config.ts        # Remotion video configuration
├── tsconfig.json             # TypeScript compiler rules
└── package.json
```

---

## 📄 License
MIT License. Created by [kaarlyz](https://github.com/kaarlyz).
