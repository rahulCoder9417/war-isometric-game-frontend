import { createRig } from '../rig/create-rig.js';

const WALK_RADIUS = 1.15;
const WALK_SPEED = 0.9;
const STEPS_PER_LAP = 6;
const BOB_HEIGHT = 0.035;
const ARM_SWING = 0.9;

const WALKER_SETUPS = [
  { color: 0xb5453c, anchor: { x: -2.4, z: 0 }, phase: 0, dropWith: 'add' },
  { color: 0x3f6fb5, anchor: { x: 2.4, z: 0 }, phase: Math.PI, dropWith: 'attach' },
];

export function createWalkers(scene) {
  return WALKER_SETUPS.map(({ color, anchor, phase, dropWith }) => {
    const rig = createRig(color);
    scene.add(rig.root);
    return { rig, anchor, phase, dropWith };
  });
}

export function updateWalkers(walkers, elapsed) {
  for (const { rig, anchor, phase } of walkers) {
    const angle = elapsed * WALK_SPEED + phase;
    const step = Math.sin(angle * STEPS_PER_LAP);

    rig.root.position.set(
      anchor.x + Math.cos(angle) * WALK_RADIUS,
      0,
      anchor.z + Math.sin(angle) * WALK_RADIUS,
    );
    rig.root.rotation.y = Math.atan2(-Math.sin(angle), Math.cos(angle));

    rig.body.position.y = rig.rest.bodyY + step * BOB_HEIGHT;
    rig.shoulder.rotation.x = step * ARM_SWING;
  }
}
