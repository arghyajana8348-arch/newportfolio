# 🌌 Arghya Jana — Modern 3D Developer Portfolio

A next-generation, high-performance **3D Developer Portfolio** built using **TanStack Start**, **Three.js / React Three Fiber**, and **Tailwind CSS**. It is designed to showcase my academic journey, technical skills, projects, and activities as a Computer Science Engineering student.

---

## 🚀 Live Demo & Repository

* **GitHub Repository**: [arghyajana8348-arch/newportfolio](https://github.com/arghyajana8348-arch/newportfolio)
* **Framework**: TanStack Start (TypeScript)

---

## 🎨 Design & Aesthetic Philosophy

The portfolio features a **dark, cybernetic, glassmorphism-based UI** tailored for high-quality visual impact:

* **WebGL Particle System**: A fluid canvas particle field responsive to viewport sizing.
* **Mac-style Floating Dock**: A custom, physics-inspired dock that acts as the primary page navigator.
* **Interactivity First**: Custom settings panel to dynamically change the rendering parameters of Three.js objects.
* **Responsive Layout**: Designed to scale cleanly from high-res desktop monitors to mobile displays with specific flat layouts fallback.

---

## 🛠️ Technology Stack

### ⚡ Core & Full-Stack

* **TanStack Start**: Full-stack React framework with SSR, streaming, and hydrations.
* **TanStack Router**: Type-safe, file-based routing.
* **TanStack Query**: High-performance asynchronous state management.
* **TypeScript**: End-to-end type safety.
* **Vite & Nitro**: Ultra-fast build tool and server engine.

### 🔮 3D Engine & Canvas Graphics

* **Three.js**: Custom WebGL render logic.
* **React Three Fiber (R3F)**: Declarative, component-based Three.js rendering.
* **@react-three/drei**: Useful React helper primitives for R3F.
* **Spline**: Interactive 3D scene builder integration (`@splinetool/react-spline` / `@splinetool/runtime`).

### 💅 Styling & Animations

* **Tailwind CSS (v4)**: Curated variables and modern utility-first stylesheet.
* **Framer Motion**: Micro-animations, page entry sequences, and component transitions.
* **CSS Custom Utilities**: Reveal-on-scroll animations and interactive project cards with reflective overlays.

### 📬 Integrations

* **EmailJS**: Zero-backend email dispatch client-side.
* **Zod**: Type-safe form verification and validation schemas.

---

## ✨ Features Breakdown

### 1. Interactive 3D Spline Hero

The main hero section displays a dynamic 3D model loaded from Spline. The model animates and responds to mouse tracking, and it is automatically paused when scrolled out of view to optimize GPU/CPU cycles.

### 2. Canvas Particle Background (`ParticleField.tsx`)

A full-screen fixed canvas rendering:

* Up to 2,000 interactive floating point particles.
* Floating 3D wireframe geometries (an icosahedron and an octahedron) that rotate with trigonometric sine/cosine wave paths.
* A retro-futuristic grid floor assisting in depth perception.
* **Performance optimization**: On mobile devices, the grid and floating wireframe geometries are disabled, and the particle count is lowered to 350 to save battery and system resources.

### 3. Custom 3D Wireframe Configurator (`Hero3D.tsx`)

An interactive component showcasing modular 3D capabilities:

* Renders a wireframe icosahedron, a inner solid metal core, and two concentric outer rings.
* Integrates a settings toggle where users can customize the colors of the core, outer ring, inner ring, and glow intensity using a custom range slider.

### 4. macOS-inspired Floating Dock (`dock.tsx`)

A floating navigation widget anchored to the bottom of the page that:

* Shows tooltips/labels on hover.
* Handles page scrolling via native `scrollIntoView`.
* Bridges external developer links (LinkedIn, GitHub) in a single compact component.

### 5. Developer Profile Console (`container-scroll-animation.tsx`)

A simulated terminal bash session executing `arghya_jana_session.sh` that displays:

* Personal details via a mock `info.json` output.
* Current core competencies by listing shell configurations.

### 6. Interactive Stacked Event Cards (`display-cards.tsx`)

Renders academic activities (ACM Student Chapter, E-SUMMIT, gaming, and quiz achievements) using a stacked visual:

* **Desktop**: Skewed, stacked 3D cards overlapping each other, with hover translate effects and grayscale transitions.
* **Mobile**: Flat, clean lists optimized for touch gestures.

### 7. Form-to-Email Client

Integrated directly with **EmailJS** using public templates (`EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`), allowing users to submit messages through an styled terminal window and receive automated confirmations.

---

## 📁 Repository Directory Structure

```text
├── .vscode/               # Workspace settings
├── public/                # Static public assets (e.g., pdf, images)
├── src/
│   ├── assets/            # Local images and JSON assets
│   ├── components/        # Interactive components
│   │   ├── ui/            # UI components (Dock, GlowCard, display-cards)
│   │   ├── ClientOnly.tsx # Renders components only client-side to prevent SSR hydration errors
│   │   ├── Hero3D.tsx     # Three.js icosahedron scene with configurator
│   │   ├── ParticleField.tsx # Canvas particle background
│   │   └── LoadingScreen.tsx # Page loader and animation controller
│   ├── hooks/             # Custom hooks (e.g., useScrollReveal)
│   ├── lib/               # Utility functions (cn, error reporting)
│   ├── routes/
│   │   ├── __root.tsx     # Core application shell & metadata tags
│   │   └── index.tsx      # Main portfolio viewport & layout contents
│   ├── router.tsx         # TanStack Router configuration
│   ├── start.ts           # Entry point for TanStack Start
│   ├── server.ts          # Server entry point
│   └── styles.css         # Main stylesheet including custom v4 theme & classes
├── bun.lock               # Bun lockfile
├── package.json           # Dependencies and scripts configuration
└── tsconfig.json          # TypeScript configurations
```

---

## ⚡ Getting Started & Installation

### 📋 Prerequisites

Ensure you have **Node.js** (v18+) or **Bun** installed on your system.

### ⚙️ Step-by-Step Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/arghyajana8348-arch/newportfolio.git
   cd newportfolio
   ```

2. **Install dependencies:**
   Using Bun:

   ```bash
   bun install
   ```

   Or using npm:

   ```bash
   npm install
   ```

3. **Start the development server:**
   Using Bun:

   ```bash
   bun dev
   ```

   Or using npm:

   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:3000`.

4. **Lint and format the codebase:**

   ```bash
   bun run lint
   bun run format
   ```

5. **Build for production:**

   ```bash
   bun run build
   ```

   This compiles the project and prepares production assets in the `.output/` and `dist/` directories.

---

## 🧑‍💻 Creator Profile — Arghya Jana

* 🎓 **Education**: 1st-year B.Tech CSE student at **Heritage Institute of Technology** (2025–2029).
* 🏆 **Academic Standing**: SGPA of **9.53** (Heritage Institute of Technology).
* 📝 **Secondary (Class X)**: 94.5% (WBCSE)
* 📝 **Higher Secondary (Class XII)**: 93% (WBCHSE)
* 🤝 **Affiliations**: ACM HITK Student Chapter, EDIC.
