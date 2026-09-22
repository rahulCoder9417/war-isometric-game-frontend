import * as THREE from 'three';
import { GLIDER_COLORS, createGlider } from './glider.js';

const TURN = THREE.MathUtils.degToRad(135);
const BLEND_SPEED = 1.1;

const GLIDER_SETUPS = {
  angles: { name: 'glider-lerp-angles', color: GLIDER_COLORS.orange, position: { x: 2.5, z: -3.5 } },
  slerp: { name: 'glider-slerp', color: GLIDER_COLORS.teal, position: { x: 4.5, z: -3.5 } },
};

const UP = new THREE.Vector3(0, 1, 0);
const REST = new THREE.Quaternion();
const TURNED = new THREE.Quaternion().setFromAxisAngle(UP, TURN);
const REST_ANGLES = new THREE.Euler().setFromQuaternion(REST);
// The same orientation as a flat 135° turn, but it reads back as (-180°, 45°, -180°).
const TURNED_ANGLES = new THREE.Euler().setFromQuaternion(TURNED);

export function createTurnBlendGliders(scene) {
  const anglesGlider = createGlider(GLIDER_SETUPS.angles);
  const slerpGlider = createGlider(GLIDER_SETUPS.slerp);
  scene.add(anglesGlider, slerpGlider);
  return { anglesGlider, slerpGlider };
}

export function updateTurnBlendGliders({ anglesGlider, slerpGlider }, elapsed) {
  const t = (1 - Math.cos(elapsed * BLEND_SPEED)) / 2;

  anglesGlider.rotation.set(
    THREE.MathUtils.lerp(REST_ANGLES.x, TURNED_ANGLES.x, t),
    THREE.MathUtils.lerp(REST_ANGLES.y, TURNED_ANGLES.y, t),
    THREE.MathUtils.lerp(REST_ANGLES.z, TURNED_ANGLES.z, t),
  );
  slerpGlider.quaternion.slerpQuaternions(REST, TURNED, t);
}
