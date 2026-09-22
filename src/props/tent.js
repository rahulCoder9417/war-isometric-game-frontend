import * as THREE from 'three';

const TENT = { width: 1.6, length: 2.2, height: 1.3 };

const HALF_WIDTH = TENT.width / 2;
const HALF_LENGTH = TENT.length / 2;

const FRONT_MINUS_X = [-HALF_WIDTH, 0, HALF_LENGTH];
const FRONT_PLUS_X = [HALF_WIDTH, 0, HALF_LENGTH];
const FRONT_RIDGE = [0, TENT.height, HALF_LENGTH];
const BACK_MINUS_X = [-HALF_WIDTH, 0, -HALF_LENGTH];
const BACK_PLUS_X = [HALF_WIDTH, 0, -HALF_LENGTH];
const BACK_RIDGE = [0, TENT.height, -HALF_LENGTH];

// Each face lists its own copy of its corners, so a corner's normal isn't averaged with the
// neighbouring face's and the faces stay flat. Corners run counter-clockwise seen from outside,
// the side three.js draws.
const POSITIONS = [
  ...FRONT_MINUS_X, ...FRONT_PLUS_X, ...FRONT_RIDGE,
  ...BACK_PLUS_X, ...BACK_MINUS_X, ...BACK_RIDGE,
  ...FRONT_PLUS_X, ...BACK_PLUS_X, ...BACK_RIDGE, ...FRONT_RIDGE,
  ...BACK_MINUS_X, ...FRONT_MINUS_X, ...FRONT_RIDGE, ...BACK_RIDGE,
];

const TRIANGLES = [
  0, 1, 2,
  3, 4, 5,
  6, 7, 8, 6, 8, 9,
  10, 11, 12, 10, 12, 13,
];

function createTentGeometry() {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(POSITIONS, 3));
  geometry.setIndex(TRIANGLES);
  geometry.computeVertexNormals();
  return geometry;
}

const geometry = createTentGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0xc2ae84, roughness: 0.9 });

export function createTent() {
  const tent = new THREE.Mesh(geometry, material);
  tent.name = 'tent';
  tent.castShadow = true;
  return tent;
}
