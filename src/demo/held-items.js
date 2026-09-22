export function createHeldItems(scene, walkers) {
  let dropped = false;

  function drop() {
    if (dropped) return;
    for (const { rig, dropWith } of walkers) {
      // add() keeps the item's local transform, so it teleports; attach() rewrites
      // the local transform to preserve the item's current world transform.
      if (dropWith === 'add') scene.add(rig.item);
      else scene.attach(rig.item);
    }
    dropped = true;
  }

  function reset() {
    if (!dropped) return;
    for (const { rig } of walkers) {
      rig.hand.add(rig.item);
      rig.item.position.copy(rig.rest.itemPosition);
      rig.item.quaternion.copy(rig.rest.itemQuaternion);
      rig.item.scale.copy(rig.rest.itemScale);
    }
    dropped = false;
  }

  return {
    drop,
    reset,
    get dropped() {
      return dropped;
    },
  };
}
