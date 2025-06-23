# 🐍 Snake Game Tutorial App

An educational, cross-platform desktop application that demonstrates how to build a modern **Snake** game using **Tauri**, **React**, and **TypeScript**.  
The project showcases full-stack communication between a Rust backend (via Tauri) and a React frontend, while walking you through common Factory/AI-powered development workflows.

---

## ✨ Features

| Category | Details |
|-----------|---------|
| Gameplay  | Classic Snake mechanics, boundary wrapping, score tracking, incremental speed. |
| Controls  | Arrow keys / **W A S D** for movement, **Space** to pause / resume, click **Restart** to play again. |
| Visuals   | Canvas-based rendering with responsive sizing, rounded snake head with animated eyes, modern UI via [shadcn/ui]. |
| UX        | Pause overlay, game-over screen with score, restart button, keyboard shortcuts. |
| Tech Demo | Demonstrates Rust ↔︎ TypeScript messaging, hot-reloading with Vite, and multi-window Tauri capabilities (optional). |

---

## 📸 Screenshots / Demo

> Replace the placeholders below with actual images or GIFs after you run the app.

| Title                | Preview |
|----------------------|---------|
| Main menu & greeting | `docs/screenshots/main.png` |
| In-game              | `docs/screenshots/ingame.gif` |
| Game over            | `docs/screenshots/gameover.png` |

Add screenshots to the `docs/screenshots` folder and commit them – they will be rendered automatically.

---

## 🚀 Quick Start

```bash
# 1. Clone your fork / this repo
git clone https://github.com/<your-username>/snake-game-tauri.git
cd snake-game-tauri

# 2. Install dependencies
# ⬇ Node packages
npm install
# ⬇ Rust toolchain (if you don't have it)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y

# 3. Run in development mode
npm run tauri dev      # starts Vite + Tauri + hot reload
# The desktop window should pop up within a few seconds.
```

---

## 🎮 Controls & Rules

| Key / Action | Result                            |
|--------------|-----------------------------------|
| ← ↑ ↓ → or **W A S D** | Move snake               |
| **Space**    | Pause / resume game               |
| **Restart** button | Reset score & start new run |
| Eat red food | Grow snake length, +10 points     |
| Hit yourself | Game over                         |
| Hit wall     | Wrapped to opposite edge          |

Objective: **grow as long as possible without colliding with yourself.**

---

## 🛠️ Technologies Used

- **Tauri** – secure, lightweight Rust wrapper around web UI
- **React 18** + **Vite** – fast frontend bundling & HMR
- **TypeScript** – static typing for the UI layer
- **Rust** – backend commands (greeting demo, optional game logic extension)
- **shadcn/ui** + **Lucide Icons** – beautiful headless UI primitives
- **HTML5 Canvas** – smooth game rendering

---

## 🧑‍💻 Development Guide

| Step | Command | Notes |
|------|---------|-------|
| Install JS deps | `npm i` | Uses `package-lock.json` for reproducibility |
| Install Rust    | `rustup` | `rustc --version` should print ≥ 1.70 |
| Dev server      | `npm run tauri dev` | Auto-reloads on file save |
| Lint / format   | `npm run lint` / `cargo fmt` | Configure in `.eslintrc` and `rustfmt.toml` |
| Build release   | `npm run tauri build` | Creates native binary for your OS |
| Run tests       | _coming soon_ | Add React Testing Library & E2E tests |

Project layout (simplified):

```
├─ src/               # React + TS source
│  ├─ components/
│  │  └─ SnakeGame.tsx
│  └─ ...
├─ src-tauri/         # Rust backend
├─ public/ or index.html
└─ vite.config.ts
```

---

## 🏗️ Installation (Production Build)

```bash
# Build native installers / binaries
npm run tauri build

# The output will be in:
#  └─ src-tauri/target/release/bundle/<platform>/
# Example: .app (macOS), .msi / .exe (Windows), .deb / .AppImage (Linux)
```

Distribute the generated package or upload it to releases.

---

## 🤝 Contributing

Pull Requests are welcome!  
Suggestions: difficulty modes, sound effects, high-score persistence, or refactoring parts of the game into Rust for performance.

1. `git checkout -b feature/<name>`
2. Code → commit → `git push`
3. Open a PR targeting `dev` branch

---

## 📄 License

This project is released under the **MIT License** – see [LICENSE](LICENSE) for details.

---

Happy hacking & enjoy the nostalgia! 🐍
