import * as THREE from 'three';

const REFRESH_INTERVAL = 0.5;

function formatVector(vector) {
  return `${vector.x.toFixed(2)}, ${vector.y.toFixed(2)}, ${vector.z.toFixed(2)}`;
}

function formatAngle(radians) {
  return `${radians.toFixed(3)} rad  ${THREE.MathUtils.radToDeg(radians).toFixed(1)}°`;
}

export function createHud(root, { label, item, figure, isDropped, areAxesVisible }) {
  const lines = {
    fps: root.querySelector('#hud-fps'),
    local: root.querySelector('#hud-local'),
    world: root.querySelector('#hud-world'),
    heading: root.querySelector('#hud-heading'),
    state: root.querySelector('#hud-state'),
    axes: root.querySelector('#hud-axes'),
  };
  const worldPosition = new THREE.Vector3();
  let secondsSinceRefresh = 0;
  let framesSinceRefresh = 0;
  let shownDropped = null;
  let shownAxes = null;

  function refreshFps() {
    lines.fps.textContent = `${Math.round(framesSinceRefresh / secondsSinceRefresh)} fps`;
  }

  function refreshReadouts() {
    shownDropped = isDropped();
    shownAxes = areAxesVisible();
    lines.local.textContent = `${label} item local  ${formatVector(item.position)}`;
    lines.world.textContent = `${label} item world  ${formatVector(item.getWorldPosition(worldPosition))}`;
    lines.heading.textContent = `${label} heading     ${formatAngle(figure.rotation.y)}`;
    lines.state.textContent = shownDropped
      ? 'dropped — red used add(), blue used attach()   [R] reset'
      : 'held   [D] drop';
    lines.axes.textContent = shownAxes ? 'axes on    [A] hide' : 'axes off   [A] show';
  }

  function stateChanged() {
    return isDropped() !== shownDropped || areAxesVisible() !== shownAxes;
  }

  return {
    update(delta) {
      secondsSinceRefresh += delta;
      framesSinceRefresh += 1;

      if (secondsSinceRefresh >= REFRESH_INTERVAL) {
        refreshFps();
        refreshReadouts();
        secondsSinceRefresh = 0;
        framesSinceRefresh = 0;
      } else if (stateChanged()) {
        refreshReadouts();
      }
    },
  };
}
