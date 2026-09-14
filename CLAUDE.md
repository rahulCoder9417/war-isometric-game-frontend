# war-isometric-game-frontend

A 2.5D isometric war simulation built with Three.js. Real 3D geometry viewed
through a fixed orthographic camera at an isometric angle.

**Target:** a flat battlefield with trees, stone and wood; 50 units split into
two factions; mouse-driven camera (drag-pan, wheel-zoom, edge-scroll, 90°
rotation). Units fight bare-fisted, or gather wood + stone, craft a sword, and
fight harder. The sim runs to a conclusion.

## Stack

Vanilla JavaScript + Three.js + Vite. **pnpm only.** No framework, no
TypeScript, no ECS library — everything hand-rolled so the mechanics stay
visible.

```
pnpm install
pnpm dev      # http://localhost:5173
pnpm build
```

## How work is requested

This repo is a learning project. `ignore/doc.md` (gitignored, local only) holds
the full curriculum: 22 chapters, ~130 phases.

The user asks for **one chapter + phase at a time** ("do Chapter 3, Phase 3.2").
For each request:

1. Create a branch: `chapter-N/phase-N-M-short-slug`.
2. Implement **only that phase**. Do not jump ahead.
3. **Teach the Three.js first** — the concepts, classes and math used in that
   phase, in detail, assuming they are new. Explain the mental model and name
   the traps, not just API signatures.
4. **Then** walk through the diff: what changed, why, alternatives considered,
   what breaks at 10x scale.

## Code conventions

- **No tutorial comments.** No file-header essays, no `/* --- section --- */`
  banners, no narrating what the next line obviously does. Explanations belong
  in chat and in `ignore/doc.md`, not in the source.
- A comment is only justified when it explains something the code cannot: a
  non-obvious trap, a magic constant's origin, a deliberate deviation.
- Simulation logic stays separate from rendering logic. The sim should be
  readable without a single `THREE.` call.
- Sim code is deterministic: one seeded RNG, fixed timestep, no `Math.random()`.
- Every phase must leave `pnpm dev` working and visibly better.
