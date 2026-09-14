import * as THREE from 'three';

export const BODY = { width: 0.46, height: 0.9, depth: 0.28, groundClearance: 0.4 };
export const HEAD = { size: 0.3 };
export const VISOR = { width: 0.22, height: 0.07, depth: 0.04, eyeLine: 0.02, inset: 0.01 };
export const ARM = { width: 0.12, length: 0.5, shoulderDrop: 0.1 };
export const HAND = { gapBelowArm: 0.02 };
export const ITEM = { width: 0.1, length: 0.62, gripOverhang: 0.07, forward: 0.04, tilt: 0.25 };

export const geometries = {
  body: new THREE.BoxGeometry(BODY.width, BODY.height, BODY.depth),
  head: new THREE.BoxGeometry(HEAD.size, HEAD.size, HEAD.size),
  visor: new THREE.BoxGeometry(VISOR.width, VISOR.height, VISOR.depth),
  arm: new THREE.BoxGeometry(ARM.width, ARM.length, ARM.width),
  item: new THREE.BoxGeometry(ITEM.width, ITEM.length, ITEM.width),
};

export const materials = {
  limb: new THREE.MeshStandardMaterial({ color: 0xe0cdb2, roughness: 0.85 }),
  visor: new THREE.MeshStandardMaterial({ color: 0x1b1f24, roughness: 0.5 }),
  item: new THREE.MeshStandardMaterial({ color: 0x8a5a2b, roughness: 0.7 }),
};

export function createBodyMaterial(color) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.6 });
}
