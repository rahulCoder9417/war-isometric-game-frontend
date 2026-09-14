import * as THREE from 'three';

const REFRESH_INTERVAL = 0.5;

function formatVector(vector) {
  return `${vector.x.toFixed(2)}, ${vector.y.toFixed(2)}, ${vector.z.toFixed(2)}`;
}

export function createHud(root, { label, item, isDropped }) {
  const lines = {
    fps: root.querySelector('#hud-fps'),
    local: root.querySelector('#hud-local'),
    world: root.querySelector('#hud-world'),
    state: root.querySelector('#hud-state'),
  };
  const worldPosition = new THREE.Vector3();
  let secondsSinceRefresh = 0;
  let framesSinceRefresh = 0;

  function refresh() {
    lines.fps.textContent = `${Math.round(framesSinceRefresh / secondsSinceRefresh)} fps`;
    lines.local.textContent = `${label} local  ${formatVector(item.position)}`;
    lines.world.textContent = `${label} world  ${formatVector(item.getWorldPosition(worldPosition))}`;
    lines.state.textContent = isDropped()
      ? 'dropped — red used add(), blue used attach()   [R] reset'
      : 'held   [D] drop';
  }

  return {
    update(delta) {
      secondsSinceRefresh += delta;
      framesSinceRefresh += 1;
      if (secondsSinceRefresh < REFRESH_INTERVAL) return;

      refresh();
      secondsSinceRefresh = 0;
      framesSinceRefresh = 0;
    },
  };
}
