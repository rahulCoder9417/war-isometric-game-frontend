import * as THREE from 'three';

const FIELD_OF_VIEW = 50;
const NEAR = 0.1;
const FAR = 200;
const POSITION = new THREE.Vector3(4.2, 3.4, 5.6);
const TARGET = new THREE.Vector3(0, 0.85, 0);

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(FIELD_OF_VIEW, 1, NEAR, FAR);
  camera.position.copy(POSITION);
  camera.lookAt(TARGET);
  return camera;
}
