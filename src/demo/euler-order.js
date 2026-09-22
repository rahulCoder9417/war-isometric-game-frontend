import * as THREE from 'three';
import { GLIDER_COLORS, createGlider } from './glider.js';

const NOSE_UP = THREE.MathUtils.degToRad(40);
const YAW_SPEED = 0.8;

const GLIDER_SETUPS = [
  { name: 'glider-xyz', color: GLIDER_COLORS.orange, position: { x: -4.5, z: -3.5 }, order: 'XYZ' },
  { name: 'glider-yxz', color: GLIDER_COLORS.teal, position: { x: -2.5, z: -3.5 }, order: 'YXZ' },
];

export function createEulerOrderGliders(scene) {
  return GLIDER_SETUPS.map((setup) => {
    const glider = createGlider(setup);
    glider.rotation.order = setup.order;
    scene.add(glider);
    return glider;
  });
}

export function updateEulerOrderGliders(gliders, elapsed) {
  const yaw = elapsed * YAW_SPEED;
  for (const glider of gliders) {
    // A positive X rotation tips +Z downwards (right-hand rule), so raising the nose is negative.
    glider.rotation.set(-NOSE_UP, yaw, 0);
  }
}
