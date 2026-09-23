import { createTent } from '../props/tent.js';
import { createTree } from '../props/tree.js';

const TREE_SPOT = { x: 1.2, z: -3.4 };
const TENT_SPOT = { x: -3.4, z: -3.2 };

export function createCamp(scene) {
  const tree = createTree();
  tree.position.set(TREE_SPOT.x, 0, TREE_SPOT.z);

  const tent = createTent();
  tent.position.set(TENT_SPOT.x, 0, TENT_SPOT.z);

  scene.add(tree, tent);
  return { tree, tent };
}
