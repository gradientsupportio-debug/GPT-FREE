# ChatGPT Astra 6 - Web Application

A pixel-perfect, responsive web application implementing the 3 user flow screens for the **GPT-6 Astra** promotional campaign.

Built with **HTML5, CSS3, JavaScript**, and a zero-dependency **Java HTTP Server** (`Server.java`).

---

## 📱 Screens Included

1. **Screen 1 - Hero Landing Screen** (`media_1788881910913.png`)
   - Dark cosmic theme with angled electric cyan/blue light flare.
   - Serif header **"FREE"** and ultra-bold condensed **"GET GPT ASTRA 6"**.
   - Pill-shaped **"GET NOW"** CTA button.
   - Left-aligned offer copy (*"free for students clcik now..."*) and official AI disclaimer.

2. **Screen 2 - Registration Form** (`media_1788881910848.png`)
   - Clean white background with top-right "CHAT GPT" logo.
   - Italic serif labels: *"YOUR NAME"* and *"SELECT EDUCATION LEVEL"*.
   - Soft inset/drop-shadow input field (*"enter here"*) and dropdown with arrow indicator.
   - Blue pill **"SUBMIT"** button.
   - Bottom brand block with condensed **"GET GPT ASTRA 6"** and OpenAI emblem.

3. **Screen 3 - Viral Share Screen** (`media_1788881910851.png`)
   - Clean white background with bold headline: **"SHARE WITH 10 PEOPLE TO GET FREE CHAT GPT ASTRA 6"**.
   - Stacked blue pill buttons: **"WHATSAPP"** and **"INSTAGRAM"**.
   - Real interactive tracking: tracks shares towards 10 and unlocks a celebration modal with a student VIP access code upon reaching 10 shares.

---

## 🚀 How to Run

### Option 1: Run with Java Backend (Recommended)

Make sure you have Java 11+ installed (OpenJDK 17 is already supported):

```bash
# Compile the Java server
javac Server.java

# Run the server
java Server
```

Now open your browser and navigate to:
👉 **[http://localhost:8080](http://localhost:8080)**

The Java server serves all static files and handles the `/api/submit`, `/api/share`, and `/api/status` REST endpoints.

---

### Option 2: Open Directly in Any Browser

You can open `index.html` directly in Google Chrome, Microsoft Edge, Safari, or Firefox without needing any web server. The app automatically detects standalone mode and runs client-side state smoothly.

---

## 🛠️ Features & Highlights

- **Direct Screen Switcher**: Use the navigation tabs (1, 2, 3) at the top of the screen to jump directly to any screen for instant review.
- **Phone Mockup vs Fluid View**: Click the **Device View / Fluid View** button on the navbar to switch between a realistic smartphone bezel view and a responsive full-screen container view.
- **Interactive Flow**:
  - Click **GET NOW** on Screen 1 $\to$ navigates to Screen 2.
  - Enter name, select education level, and click **SUBMIT** on Screen 2 $\to$ registers with server and navigates to Screen 3.
  - Click **WHATSAPP** or **INSTAGRAM** on Screen 3 $\to$ triggers native share intents and increments the live progress bar from 0 to 10 shares.
  - Complete 10 shares $\to$ unlocks the reward celebration modal with the VIP activation code.
