# war-isometric-game-frontend

A 2.5D isometric war simulation built with [Three.js](https://threejs.org) —
real 3D geometry, fixed orthographic camera, isometric angle.

Two factions, 50 units, a flat battlefield with trees and stone. Units fight
bare-fisted, or gather wood and stone, craft swords, and fight harder.

## Running it

```bash
pnpm install
pnpm dev
```

Then open the URL Vite prints (default `http://localhost:5173`).

```bash
pnpm build     # production build into dist/
pnpm preview   # serve the production build
```

## Status

Chapter 0, Phase 0.1 — a running Three.js scene: ground plane, grid, lit cube
with shadows, resize handling, delta-time loop, FPS readout.
