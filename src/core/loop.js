import * as THREE from 'three';

export function startLoop(renderer, onFrame) {
  const clock = new THREE.Clock();
  const time = { delta: 0, elapsed: 0 };

  renderer.setAnimationLoop(() => {
    // Clock.getElapsedTime() calls getDelta() internally, so reading both each
    // frame would make the second return ~0. Elapsed is summed from delta instead.
    time.delta = clock.getDelta();
    time.elapsed += time.delta;
    onFrame(time);
  });

  return () => renderer.setAnimationLoop(null);
}
