import * as THREE from 'three';
import { TILE_SIZE } from '../world/units.js';

const WORLD_AXES_LENGTH = TILE_SIZE;
const LOCAL_AXES_LENGTH = 0.35;
const DRAW_AFTER_MESHES = 1;

function createAxesHelper(length) {
  const helper = new THREE.AxesHelper(length);
  helper.name = 'axes';
  // Axes sit inside the meshes they describe. depthTest off shows them through; drawing
  // them last stops a mesh rendered afterwards from painting over them.
  helper.material.depthTest = false;
  helper.renderOrder = DRAW_AFTER_MESHES;
  return helper;
}

export function createAxes(scene, targets) {
  const helpers = [createAxesHelper(WORLD_AXES_LENGTH)];
  scene.add(helpers[0]);

  for (const target of targets) {
    const helper = createAxesHelper(LOCAL_AXES_LENGTH);
    target.add(helper);
    helpers.push(helper);
  }

  let visible = true;

  return {
    toggle() {
      visible = !visible;
      for (const helper of helpers) helper.visible = visible;
    },
    get visible() {
      return visible;
    },
  };
}
