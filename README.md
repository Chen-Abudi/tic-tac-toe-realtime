# 🎮 ⭕❌ tic-tac-toe-realtime

A real-time multiplayer Tic Tac Toe game powered by **Node.js**, **Socket.IO**, and a cool UI inspired by a Figma design.

This monorepo is build with a modular mindset and includes both the **backend server**, the upcoming **frontend app**, and a **shared design system** with Storybook.

---

## ✨ Features

- Real-time multiplayer game via **`WebSockets`**
- Game rooms and dynamic player sessions
- Turn-based game logic with win/draw detection
- Smooth gameplay with state synchronization
- Modular monorepo powered by **`Yarn Workspaces`**
- Shared Design System using **`Storybook`** (in progress)
- Inspired by [this Figma design](https://www.figma.com/design/ajH9a7AsS7F58ysatXikmv/tic-tac-toe)

---

## 🧱 Tech Stack

### Backend

- ⚙️ Node.js + Express
- 🔌 Socket.IO (WebSockets)
- 🧠 Game logic in-memory (scalable later)
- 🔤 TypeScript, ts-node-dev

### Frontend (In Progress)

- ⚛️ React + Next.js
- ⚡ Vite for ultra-fast development
- 🎨 TailwindCSS + Custom animations
- 💾 Zustand for local state management
- 🧩 Component-driven with reusable UI
- 📕 Storybook for Design System (coming soon)
- 🧼 ESLint + Prettier (planned to be added later)

### Dev / Tooling

- 🧶 Yarn Workspaces
- 🗂️ Monorepo Layout
- 📁 Modular architecture
- 🧪 `test-client` for local socket testing
- 📦 GitHub + Feature branch workflow

---

## 📁 Project Structure

```txt
apps/
  ├── server/          # Backend API & Socket.IO server
  ├── client/              # Frontend app
  └── test-client/     # Simple socket.io client for testing

packages/
  └── shared
  └── ui/   # Shared UI components (Storybook)
```

<!-- ---

## 🚀 Getting Started

1. Install all dependencies

```bash

yarn install

```

2. Start the backend server

```bash

yarn workspace server dev

```

**Note**: Server runs on: http://localhost:4001

3. (Optional) Run the Socket.io test client

```bash

yarn workspace test-client ts-node index.ts

```

Note: This is a simple client for testing purposes. It will connect to the server and emit a message. -->

---

🛣️ Roadmap

- [x] Setup monorepo with Yarn Workspaces

- [x] Build backend with room management + game logic

- [x] Add test-client for real-time testing

- [x] Create frontend app and hook up sockets

- [x] Add responsive styles and transitions for gameplay

- [x] Fix game state / UI sync across clients

- [**In Progress**] Build out UI with Tailwind & match Figma

- [**In Progress**] Create design system with Storybook

- [ ] Add game animations and sound effects

- [ ] Add persistent database (optional)

- [ ] Add lobby / room browser (later on)

- [ ] Finalize design system in Storybook

---
