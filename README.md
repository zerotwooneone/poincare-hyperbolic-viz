# Poincaré Disk Hyperbolic Visualization

A real-time, non-Euclidean WebGL visualization built with React Three Fiber. This project renders a mesmerizing, infinitely repeating {7,3} hyperbolic tessellation (Poincaré Disk) populated by actors navigating complex geodesic paths.

To achieve a locked 60fps across devices, all heavy mathematical computations—including non-Euclidean geometry generation and Möbius transformations for actor trajectories—are offloaded to a pre-computation data pipeline powered by Python and `uv`.

## 🏗️ Architecture

This repository is split into two distinct domains:

1. **The Data Pipeline (`/pipeline`)**: A Python-based toolchain that pre-calculates the hyperbolic lattice, bakes the non-Euclidean movement paths (geodesics) into JSON tracks, and generates procedural lookup textures (LUTs).
2. **The Frontend (`/src`)**: A React Three Fiber (R3F) application that acts as a rendering engine and presentation layer. It consumes the baked data, interpolates actor positions, applies custom GLSL shaders, and manages application state via Zustand.

## 🛠️ Tech Stack

* **Frontend:** React, React Three Fiber (R3F), Drei, Zustand, Vite.
* **Shaders:** Custom GLSL (Vertex & Fragment) via `vite-plugin-glsl`.
* **Pipeline:** Python 3.11+, `uv` (dependency & workspace management), Numpy, Trimesh.

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18+) and your preferred package manager (`npm`, `yarn`, or `pnpm`).
* [uv](https://github.com/astral-sh/uv) (Extremely fast Python package installer and resolver).

### 1. Generate the Assets (Data Pipeline)

Before running the frontend, you must bake the non-Euclidean geometries and trajectories. The pipeline outputs directly to `public/generated/`.

```bash
cd pipeline
# uv will automatically resolve dependencies and run the build script
uv run run_pipeline.sh
cd ..
```

*Note: If `public/generated/` is successfully populated, you are ready to start the UI.*

### 2. Start the Frontend Dev Server

Install the frontend dependencies and spin up the Vite development server.

```bash
npm install
npm run dev
```

Navigate to `http://localhost:5173` to view the visualization.

## 📂 Project Structure

```text
poincare-hyperbolic-viz/
├── pipeline/                      # 🐍 Python Asset Generation Toolchain
│   ├── src/
│   │   ├── math_hyperbolic.py     # Core non-Euclidean math utilities
│   │   ├── build_lattice.py       # Generates the {7,3} disk geometry buffers
│   │   ├── build_trajectories.py  # Bakes complex movement paths for actors
│   │   └── build_textures.py      # Generates procedural LUTs and gradients
│   └── run_pipeline.sh            # Executes builders -> outputs to ../public/generated/
│
├── public/
│   └── generated/                 # ⚠️ TARGET DIR FOR PIPELINE (DO NOT EDIT)
│       ├── geometry/              
│       ├── paths/                 
│       └── textures/              
│
└── src/                           # ⚛️ React / R3F Source
    ├── store/                     # Zustand state management (playback, theme)
    ├── ui/                        # Strict 2D HTML/DOM overlays (Controls, HUD)
    ├── canvas/                    # Strict 3D WebGL (Scene, Background, Actors)
    ├── hooks/                     # Custom hooks (e.g., useBakedPaths, useLatticeData)
    └── App.tsx                    # Layout shell
```

## 🧠 Development Notes

* **Strict DOM/WebGL Separation:** Do not mix HTML UI elements deeply within the R3F `<Canvas>`. The UI sits on top of the canvas via absolute positioning in `App.tsx` and passes data to the 3D scene exclusively through Zustand.
* **Animation Loops:** Avoid `useState` or `setState` inside `useFrame`. The actors' movement logic subscribes to Zustand's transient state and interpolates the pre-baked JSON arrays directly in the render loop to prevent React reconciliation overhead.
* **Shaders:** GLSL shaders are located in `src/canvas/shaders/` and imported as strings using `vite-plugin-glsl`.

## 📜 License

MIT License
