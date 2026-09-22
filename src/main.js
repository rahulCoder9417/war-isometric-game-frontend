import { createCamera } from './core/camera.js';
import { startLoop } from './core/loop.js';
import { createRenderer } from './core/renderer.js';
import { bindResize } from './core/resize.js';
import { createAxes } from './debug/axes.js';
import { createCamp } from './demo/camp.js';
import { createHeldItems } from './demo/held-items.js';
import { createMarkers } from './demo/markers.js';
import { createWalkers, updateWalkers } from './demo/walkers.js';
import { bindKeys } from './input/keyboard.js';
import { createScene } from './scene/environment.js';
import { createHud } from './ui/hud.js';

const canvas = document.querySelector('#app');

const renderer = createRenderer(canvas);
const camera = createCamera();
const scene = createScene();

const walkers = createWalkers(scene);
const camp = createCamp(scene);
const markers = createMarkers(scene, walkers.map((walker) => walker.rig.item));
const heldItems = createHeldItems(scene, walkers);
const axes = createAxes(scene, [
  ...walkers.flatMap(({ rig }) => [rig.root, rig.shoulder, rig.item]),
  camp.tree,
  camp.tent,
]);
const hud = createHud(document.querySelector('#hud'), {
  label: 'red',
  item: walkers[0].rig.item,
  figure: walkers[0].rig.root,
  renderStats: renderer.info.render,
  isDropped: () => heldItems.dropped,
  areAxesVisible: () => axes.visible,
});

bindResize(canvas, camera, renderer);
bindKeys({ a: axes.toggle, d: heldItems.drop, r: heldItems.reset });

startLoop(renderer, ({ delta, elapsed }) => {
  updateWalkers(walkers, elapsed);

  // render() refreshes the whole graph, but it has not run yet this frame, so the
  // markers would otherwise read last frame's matrixWorld.
  scene.updateMatrixWorld();
  markers.sync();

  renderer.render(scene, camera);
  hud.update(delta);
});
