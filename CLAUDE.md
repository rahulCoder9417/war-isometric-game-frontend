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

## World conventions

- **1 unit = 1 metre.** Lengths and positions are metres, speeds are metres per
  second, time is seconds.
- **+Y is up.** The ground is the XZ plane at `y = 0`. Things are built with
  their origin at their feet, so standing on the ground is `position.y = 0`.
- **A tile is 1 × 1 m** (`TILE_SIZE` in `src/world/units.js`), with grid lines
  on whole metres.
- **Axes are right-handed.** Seen from the positive end of an axis, a positive
  rotation turns counter-clockwise, so `rotation.x > 0` tips +Z downwards.
- **Models face +Z**, which puts their +X side on their *left*. Facing a ground
  direction `(dx, dz)` is `rotation.y = Math.atan2(dx, dz)`.
- **Angles are radians** everywhere in code. Write a hand-picked angle as
  `THREE.MathUtils.degToRad(40)`; show degrees only in UI.
- **When a rotation combines axes, set `rotation.order` on purpose** (`'YXZ'` for
  turn-then-tilt). Blend orientations with quaternion `slerp`, never by lerping
  Euler angles.

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
