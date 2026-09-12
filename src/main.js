import * as THREE from 'three';
import { createRig } from './rig.js';

const canvas = document.querySelector('#app');
const hudFps = document.querySelector('#hud-fps');
const hudLocal = document.querySelector('#hud-local');
const hudWorld = document.querySelector('#hud-world');
const hudState = document.querySelector('#hud-state');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d1014);
scene.fog = new THREE.Fog(0x0d1014, 18, 48);

const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
camera.position.set(4.2, 3.4, 5.6);
camera.lookAt(0, 0.85, 0);

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

const markerGeometry = new THREE.SphereGeometry(0.19, 12, 8);
const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xffd166, wireframe: true });

const walkers = [
  { rig: createRig(0xb5453c), anchor: new THREE.Vector2(-2.4, 0), phase: 0, dropWith: 'add' },
  { rig: createRig(0x3f6fb5), anchor: new THREE.Vector2(2.4, 0), phase: Math.PI, dropWith: 'attach' },
];

for (const walker of walkers) {
  scene.add(walker.rig.root);
  walker.marker = new THREE.Mesh(markerGeometry, markerMaterial);
  scene.add(walker.marker);
}

const WALK_RADIUS = 1.15;
const WALK_SPEED = 0.9;

let itemsDropped = false;

function dropItems() {
  if (itemsDropped) return;
  for (const walker of walkers) {
    // add() keeps the item's local transform, so it teleports; attach() rewrites
    // the local transform to preserve the item's current world transform.
    if (walker.dropWith === 'add') scene.add(walker.rig.item);
    else scene.attach(walker.rig.item);
  }
  itemsDropped = true;
}

function resetItems() {
  if (!itemsDropped) return;
  for (const walker of walkers) {
    const { hand, item, itemRestPosition, itemRestQuaternion } = walker.rig;
    hand.add(item);
    item.position.copy(itemRestPosition);
    item.quaternion.copy(itemRestQuaternion);
  }
  itemsDropped = false;
}

window.addEventListener('keydown', (event) => {
  if (event.repeat) return;
  const key = event.key.toLowerCase();
  if (key === 'd') dropItems();
  if (key === 'r') resetItems();
});

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
const worldPosition = new THREE.Vector3();
let elapsed = 0;
let fpsAccumulator = 0;
let fpsFrames = 0;

function format(vector) {
  return `${vector.x.toFixed(2)}, ${vector.y.toFixed(2)}, ${vector.z.toFixed(2)}`;
}

function tick() {
  const delta = clock.getDelta();
  elapsed += delta;

  for (const walker of walkers) {
    const { rig, anchor, phase } = walker;
    const angle = elapsed * WALK_SPEED + phase;

    rig.root.position.set(
      anchor.x + Math.cos(angle) * WALK_RADIUS,
      0,
      anchor.y + Math.sin(angle) * WALK_RADIUS,
    );
    rig.root.rotation.y = Math.atan2(-Math.sin(angle), Math.cos(angle));

    rig.body.position.y = 0.85 + Math.sin(angle * 6) * 0.035;
    rig.shoulder.rotation.x = Math.sin(angle * 6) * 0.9;
  }

  // render() refreshes the whole graph, but it has not run yet this frame, so a
  // direct matrixWorld read without this returns last frame's transform.
  // One graph-wide update beats getWorldPosition() per item, which re-walks the
  // ancestor chain on every call.
  scene.updateMatrixWorld();

  for (const walker of walkers) {
    walker.marker.position.setFromMatrixPosition(walker.rig.item.matrixWorld);
  }

  renderer.render(scene, camera);

  fpsAccumulator += delta;
  fpsFrames += 1;
  if (fpsAccumulator >= 0.5) {
    hudFps.textContent = `${Math.round(fpsFrames / fpsAccumulator)} fps`;
    fpsAccumulator = 0;
    fpsFrames = 0;

    const red = walkers[0].rig.item;
    red.getWorldPosition(worldPosition);
    hudLocal.textContent = `red item local  ${format(red.position)}`;
    hudWorld.textContent = `red item world  ${format(worldPosition)}`;
    hudState.textContent = itemsDropped
      ? 'dropped — red used add(), blue used attach()   [R] reset'
      : 'held   [D] drop';
  }
}

renderer.setAnimationLoop(tick);
