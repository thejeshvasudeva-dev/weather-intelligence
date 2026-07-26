# Weather Intelligence Web App 🌤️

A modern, responsive weather intelligence application built using Google AI Studio, deployed via Cloudflare Pages, and powered by the Open-Meteo API.

## 🚀 Live Demo
- **Live URL:** [https://weather-intelligence2.pages.dev/](https://weather-intelligence2.pages.dev/)

## 🛠️ Architecture & Workflow
1. **AI Generation:** Built using **Google AI Studio** with prompt-based UI/UX generation.
2. **Version Control:** Connected directly to **GitHub** for continuous code management.
3. **Deployment:** Hosted on **Cloudflare Pages** with automated build integration.
4. **Data Source:** Live weather metrics powered by the **Open-Meteo API**.

## ⚙️ Cloudflare Pages Configuration
- **Framework Preset:** None / Vite
- **Build Command:** `npm run build`
- **Build Directory:** `dist`

## 🧪 Verified Test Cases
- ✅ **Valid City Search:** Successfully fetches temperature, humidity, wind speed, and UV index (e.g., New York, London).
- ✅ **Error Handling:** Handles invalid searches gracefully with user notification popups.
