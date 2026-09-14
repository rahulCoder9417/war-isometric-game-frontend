import * as THREE from 'three';
import { ARM, BODY, HAND, HEAD, ITEM, VISOR, createBodyMaterial, geometries, materials } from './parts.js';

function createPart(name, geometry, material, { castShadow = true } = {}) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.castShadow = castShadow;
  return mesh;
}

export function createRig(bodyColor) {
  const root = new THREE.Group();
  root.name = 'rig';

  const body = createPart('body', geometries.body, createBodyMaterial(bodyColor));
  body.position.y = BODY.groundClearance + BODY.height / 2;
  root.add(body);

  const head = createPart('head', geometries.head, materials.limb);
  head.position.y = BODY.height / 2 + HEAD.size / 2;
  body.add(head);

  // Too small to cast a visible shadow, and every caster is drawn again into the shadow map.
  const visor = createPart('visor', geometries.visor, materials.visor, { castShadow: false });
  visor.position.set(0, VISOR.eyeLine, HEAD.size / 2 + VISOR.depth / 2 - VISOR.inset);
  head.add(visor);

  const shoulder = new THREE.Group();
  shoulder.name = 'shoulder';
  shoulder.position.set(BODY.width / 2 + ARM.width / 2, BODY.height / 2 - ARM.shoulderDrop, 0);
  body.add(shoulder);

  const arm = createPart('arm', geometries.arm, materials.limb);
  arm.position.y = -ARM.length / 2;
  shoulder.add(arm);

  const hand = new THREE.Object3D();
  hand.name = 'hand';
  hand.position.y = -(ARM.length + HAND.gapBelowArm);
  shoulder.add(hand);

  const item = createPart('item', geometries.item, materials.item);
  item.position.set(0, -(ITEM.length / 2 - ITEM.gripOverhang), ITEM.forward);
  item.rotation.x = ITEM.tilt;
  hand.add(item);

  return {
    root,
    body,
    shoulder,
    hand,
    item,
    rest: {
      bodyY: body.position.y,
      itemPosition: item.position.clone(),
      itemQuaternion: item.quaternion.clone(),
    },
  };
}
