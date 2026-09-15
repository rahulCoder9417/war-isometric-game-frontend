import { createCamera } from './core/camera.js';
import { startLoop } from './core/loop.js';
import { createRenderer } from './core/renderer.js';
import { bindResize } from './core/resize.js';
import { createAxes } from './debug/axes.js';
import { createEulerOrderGliders, updateEulerOrderGliders } from './demo/euler-order.js';
import { createHeldItems } from './demo/held-items.js';
import { createMarkers } from './demo/markers.js';
import { createTurnBlendGliders, updateTurnBlendGliders } from './demo/turn-blend.js';
import { createWalkers, updateWalkers } from './demo/walkers.js';
import { bindKeys } from './input/keyboard.js';
import { createScene } from './scene/environment.js';
import { createHud } from './ui/hud.js';

const canvas = document.querySelector('#app');

const renderer = createRenderer(canvas);
const camera = createCamera();
const scene = createScene();

const walkers = createWalkers(scene);
const eulerOrderGliders = createEulerOrderGliders(scene);
const turnBlendGliders = createTurnBlendGliders(scene);
const markers = createMarkers(scene, walkers.map((walker) => walker.rig.item));
const heldItems = createHeldItems(scene, walkers);
const axes = createAxes(scene, [
  ...walkers.flatMap(({ rig }) => [rig.root, rig.shoulder, rig.item]),
  ...eulerOrderGliders,
  turnBlendGliders.anglesGlider,
  turnBlendGliders.slerpGlider,
]);
const hud = createHud(document.querySelector('#hud'), {
  label: 'red',
  item: walkers[0].rig.item,
  figure: walkers[0].rig.root,
  isDropped: () => heldItems.dropped,
  areAxesVisible: () => axes.visible,
});

bindResize(canvas, camera, renderer);
bindKeys({ a: axes.toggle, d: heldItems.drop, r: heldItems.reset });

startLoop(renderer, ({ delta, elapsed }) => {
  updateWalkers(walkers, elapsed);
  updateEulerOrderGliders(eulerOrderGliders, elapsed);
  updateTurnBlendGliders(turnBlendGliders, elapsed);

  // render() refreshes the whole graph, but it has not run yet this frame, so the
  // markers would otherwise read last frame's matrixWorld.
  scene.updateMatrixWorld();
  markers.sync();

  renderer.render(scene, camera);
  hud.update(delta);
});
