import * as THREE from 'three';

const canvas = document.querySelector('#app');
const hudFps = document.querySelector('#hud-fps');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d1014);
scene.fog = new THREE.Fog(0x0d1014, 18, 48);

const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
camera.position.set(6, 6, 10);
camera.lookAt(0, 0.5, 0);

scene.add(new THREE.HemisphereLight(0x93b7e0, 0x2a2118, 0.55));

const sun = new THREE.DirectionalLight(0xffe9c4, 2.1);
sun.position.set(8, 12, 6);
sun.castShadow = true;
sun.shadow.mapSize.set(1024, 1024);
sun.shadow.camera.left = -12;
sun.shadow.camera.right = 12;
sun.shadow.camera.top = 12;
sun.shadow.camera.bottom = -12;
sun.shadow.camera.near = 0.5;
sun.shadow.camera.far = 40;
scene.add(sun);

const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(40, 40),
  new THREE.MeshStandardMaterial({ color: 0x3f4d3a, roughness: 0.95 }),
);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const grid = new THREE.GridHelper(40, 40, 0x5a6a52, 0x46533f);
grid.position.y = 0.002; // lift off the ground plane to avoid z-fighting
scene.add(grid);

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshStandardMaterial({ color: 0xc9713b, roughness: 0.45 }),
);
cube.position.y = 0.5;
cube.castShadow = true;
scene.add(cube);

function resize() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height, false);
}

window.addEventListener('resize', resize);
resize();

const clock = new THREE.Clock();
let fpsAccumulator = 0;
let fpsFrames = 0;

function tick() {
  const delta = clock.getDelta();

  cube.rotation.y += delta * 0.8;
  cube.rotation.x += delta * 0.3;

  renderer.render(scene, camera);

  fpsAccumulator += delta;
  fpsFrames += 1;
  if (fpsAccumulator >= 0.5) {
    hudFps.textContent = `${Math.round(fpsFrames / fpsAccumulator)} fps`;
    fpsAccumulator = 0;
    fpsFrames = 0;
  }
}

renderer.setAnimationLoop(tick);
