import * as THREE from 'three';

const BACKGROUND_COLOR = 0x0d1014;
const FOG = { near: 18, far: 48 };

const SKY_LIGHT = { skyColor: 0x93b7e0, groundColor: 0x2a2118, intensity: 0.55 };
const SUN = {
  color: 0xffe9c4,
  intensity: 2.1,
  position: new THREE.Vector3(8, 12, 6),
  shadowMapSize: 1024,
  shadowExtent: 12,
  shadowNear: 0.5,
  shadowFar: 40,
};

const GROUND = { size: 40, color: 0x3f4d3a, roughness: 0.95 };
const GRID = { centerLineColor: 0x5a6a52, lineColor: 0x46533f, zFightOffset: 0.002 };

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BACKGROUND_COLOR);
  scene.fog = new THREE.Fog(BACKGROUND_COLOR, FOG.near, FOG.far);

  addLights(scene);
  addGround(scene);

  return scene;
}

function addLights(scene) {
  scene.add(new THREE.HemisphereLight(SKY_LIGHT.skyColor, SKY_LIGHT.groundColor, SKY_LIGHT.intensity));

  const sun = new THREE.DirectionalLight(SUN.color, SUN.intensity);
  sun.position.copy(SUN.position);
  sun.castShadow = true;
  sun.shadow.mapSize.set(SUN.shadowMapSize, SUN.shadowMapSize);
  sun.shadow.camera.left = -SUN.shadowExtent;
  sun.shadow.camera.right = SUN.shadowExtent;
  sun.shadow.camera.top = SUN.shadowExtent;
  sun.shadow.camera.bottom = -SUN.shadowExtent;
  sun.shadow.camera.near = SUN.shadowNear;
  sun.shadow.camera.far = SUN.shadowFar;
  scene.add(sun);
}

function addGround(scene) {
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(GROUND.size, GROUND.size),
    new THREE.MeshStandardMaterial({ color: GROUND.color, roughness: GROUND.roughness }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const grid = new THREE.GridHelper(GROUND.size, GROUND.size, GRID.centerLineColor, GRID.lineColor);
  grid.position.y = GRID.zFightOffset;
  scene.add(grid);
}
