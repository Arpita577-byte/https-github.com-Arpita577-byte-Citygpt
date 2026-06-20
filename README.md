<div align="center">

# CityGPT

### AI-Powered Smart City Complaint Management System

[![Live Demo](https://img.shields.io/badge/Live%20Demo-city--gpt--one.vercel.app-blue?style=for-the-badge&logo=vercel)](https://city-gpt-one.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-96.8%25-3178C6?style=for-the-badge&logo=typescript)](https://github.com/Arpita577-byte/City_gpt)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI%20Powered-4285F4?style=for-the-badge&logo=google)](https://aistudio.google.com)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

**CityGPT** is a full-stack AI-powered civic complaint platform where citizens report city problems — potholes, water leaks, garbage, electrical failures — and get real-time AI triage, repair ETAs, and Green Points for their contributions.

[View Demo](https://city-gpt-one.vercel.app) · [Report Bug](https://github.com/Arpita577-byte/City_gpt/issues) · [Request Feature](https://github.com/Arpita577-byte/City_gpt/issues)

</div>

---

##  Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [API Reference](#-api-reference)
- [AI Capabilities](#-ai-capabilities)
- [Gamification](#-gamification--green-points)
- [Contributing](#-contributing)
- [License](#-license)

---

##  Overview

CityGPT transforms how citizens interact with municipal authorities. Instead of calls going unanswered and complaints lost in bureaucracy, CityGPT provides:

- **Instant AI classification** of every complaint via Google Gemini
- **Community-driven prioritization** — complaints with 50+ votes auto-escalate to HIGH priority
- **Real-time repair tracking** with before/after photo verification by municipal workers
- **Predictive hazard analytics** that flags at-risk infrastructure before it fails
- **Multilingual support** including English, Hindi, and Hinglish

---

## ✨ Features

| Feature | Description |
|---|---|
|  **AI Complaint Detection** | Gemini auto-classifies category, priority, team, and ETA from text, voice, or photo |
|  **Voice Input** | Voice-to-text complaint submission analyzed by Gemini |
|  **Image Analysis** | Camera photo uploaded → Gemini Vision inspects and classifies the issue |
|  **Live City Map** | Geo-located complaints pinned on an interactive map |
|  **Predictive Hazard Engine** | AI predicts infrastructure failures (pipeline, sewer, electrical) by ward |
|  **CityGPT Chat** | Multilingual AI chatbot grounded in live complaint data |
|  **Community Voting** | Citizens upvote issues; 50+ votes → AUTO priority escalation |
|  **Community Feed** | Reddit-style posts linked to active complaints |
|  **Green Points & Badges** | Gamified rewards for reporting and resolving city issues |
|  **SOS Emergency Alerts** | One-tap SOS creates CRITICAL complaint, dispatches first responders (ETA: 7 min) |
|  **Worker Dashboard** | Municipal workers update task status and upload resolution photos |
|  **Live Notifications** | Real-time alerts for escalations, resolutions, and reward credits |
|  **Modern UI** | React 19, Tailwind CSS v4, Framer Motion animations |

---

##  Tech Stack

**Frontend**
- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com) via `@tailwindcss/vite`
- [Framer Motion v12](https://www.framer.com/motion/) (`motion`) for animations
- [Lucide React](https://lucide.dev) for icons
- [Vite 6](https://vite.dev) for blazing-fast HMR dev builds

**Backend**
- [Node.js](https://nodejs.org) + [Express 4](https://expressjs.com)
- [TypeScript](https://www.typescriptlang.org/) with `tsx` for zero-compile dev
- In-memory session store (persists across the session)

**AI**
- [Google Gemini](https://aistudio.google.com) via `@google/genai` v2
- Model: `gemini-3.5-flash`
- Structured JSON output with schema enforcement
- Gemini Vision for image-based complaint classification
- Graceful fallback to rule-based heuristics when API key is absent

**Build & Deploy**
- [esbuild](https://esbuild.github.io/) for production server bundling
- [Vercel](https://vercel.com) for deployment

---

##  Project Structure

```
City_gpt/
├── src/                    # React frontend source
│   └── ...                 # Components, pages, hooks
├── server.ts               # Express API server + Gemini AI integration (697 lines)
├── index.html              # Vite HTML entry point
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── metadata.json           # Project metadata
├── package.json            # Dependencies & scripts
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `>= 18`
- A **Google Gemini API Key** — [Get one free at Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Arpita577-byte/City_gpt.git
cd City_gpt

# 2. Install dependencies
npm install

# 3. Set up environment variables
echo "GEMINI_API_KEY=your_api_key_here" > .env

# 4. Start the development server
npm run dev
```

The app will be available at **[http://localhost:3000](http://localhost:3000)**

> **Note:** CityGPT runs in **AI fallback mode** if `GEMINI_API_KEY` is not set — all features remain functional using rule-based heuristics in place of Gemini responses.

---

##  Environment Variables

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | Recommended | Google Gemini API key for AI features. App works without it in fallback mode. |

---

##  Available Scripts

```bash
npm run dev      # Start full-stack dev server (Express + Vite HMR on port 3000)
npm run build    # Build frontend (Vite) + bundle server (esbuild → dist/server.cjs)
npm run start    # Run the production build
npm run lint     # TypeScript type check (tsc --noEmit)
npm run clean    # Remove dist/ and server.js
```

---

## 📡 API Reference

Base URL: `http://localhost:3000/api`

### Health

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Server status + AI online flag |

### Complaints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/complaints` | Fetch all active complaints |
| `POST` | `/complaints/report` | Submit a complaint (AI-classified via Gemini) |
| `POST` | `/complaints/:id/vote` | Upvote a complaint (auto-escalates at 50 votes) |

### Workers

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/worker/update-status` | Update complaint status + upload after-photo |

### Community

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/community` | Fetch community posts feed |
| `POST` | `/community` | Create a new community post |
| `POST` | `/community/:id/vote` | Upvote a community post |

### Rewards & Notifications

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/rewards` | Fetch Green Points, badges, leaderboard |
| `GET` | `/notifications` | Fetch notification list |
| `POST` | `/notifications/read` | Mark all notifications as read |

### AI & Alerts

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/predictions` | Fetch AI predictive hazard models |
| `POST` | `/chat` | CityGPT multilingual chat assistant |
| `POST` | `/sos` | Trigger SOS emergency alert (ETA: 7 min) |

<details>
<summary><b>POST /complaints/report — Request Body</b></summary>

```json
{
  "title": "Garbage overflow near school",
  "description": "Large pile of trash uncleared for 3 days",
  "category": "waste",
  "lat": 19.076,
  "lng": 72.877,
  "locationDescription": "Behind Modern Public School, Ward 3",
  "imageBase64": "data:image/jpeg;base64,...",
  "voiceInput": "kachra bahut zyada hai yahan"
}
```

</details>

<details>
<summary><b>POST /chat — Request Body</b></summary>

```json
{
  "message": "Road pe paani bhar gaya station ke paas",
  "chatHistory": [
    { "sender": "user", "text": "Hi" },
    { "sender": "bot", "text": "Hello! How can I help?" }
  ]
}
```

</details>

---

## 🤖 AI Capabilities

### Complaint Auto-Classification

When a complaint is submitted, Gemini analyzes text, voice input, and optionally a camera photo to return a structured JSON response with:

- **Category** — one of `waste`, `water`, `pothole`, `traffic`, `lighting`, `tree`, `animal`, `emergency`
- **Priority** — `low`, `medium`, or `high`
- **Formal title & description** — polished for municipal records
- **Assigned team** — correct municipal department
- **ETA** — realistic restoration time based on severity

Gemini uses enforced schema output (`responseMimeType: "application/json"`) ensuring consistent, parseable responses every time.

### CityGPT Chat Assistant

The `/api/chat` endpoint injects the **entire live complaints database** as grounding context into every Gemini call, enabling citizens to ask natural-language questions about active incidents. It understands regional languages — *"Road pe paani bhar gaya"* is correctly mapped to the Sector 4 Station water pipeline fracture (`COMP-102`).

### Predictive Hazard Engine

Pre-computed AI predictions proactively flag at-risk infrastructure by ward:

| Ward | Hazard | Probability | Timeline |
|---|---|---|---|
| Ward 3 | Water Pipeline Rupture | 85% | 12 Days |
| Ward 4 | Sewer Blockage | 72% | 18 Days |
| Ward 1 | Streetlight Circuit Burnout | 60% | 25 Days |

---

## 🏆 Gamification — Green Points

Citizens earn Green Points for civic participation, displayed on a live leaderboard.

| Action | Points |
|---|---|
| Reporting a valid complaint | +10 pts |
| Complaint verified & resolved | +50 pts |
| Pothole verification upvote | +20 pts |
| Weekly active citizen streak | +100 pts |

**Badges** unlock at contribution milestones:

- 🥇 **Smart Citizen** — Reported 5 valid city issues
- 🌳 **Eco Hero** — Removed 100kg of localized garbage footprint
- 🛡️ **City Guardian** — Verified before/after evidence photos

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. **Fork** the repository
2. **Create** your feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add some feature'`
4. **Push** to the branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

Please make sure your PR description clearly explains the problem and solution.

---

## 📄 License

This project is open source. See the [repository](https://github.com/Arpita577-byte/City_gpt) for details.

---

<div align="center">

Built with ❤️ by [Arpita](https://github.com/Arpita577-byte)

*Making cities smarter, one complaint at a time. 🌱*

⭐ **Star this repo if you find it useful!** ⭐

</div>
