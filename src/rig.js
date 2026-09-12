import * as THREE from 'three';

const bodyGeometry = new THREE.BoxGeometry(0.46, 0.9, 0.28);
const headGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const visorGeometry = new THREE.BoxGeometry(0.22, 0.07, 0.04);
const armGeometry = new THREE.BoxGeometry(0.12, 0.5, 0.12);
const itemGeometry = new THREE.BoxGeometry(0.1, 0.62, 0.1);

const limbMaterial = new THREE.MeshStandardMaterial({ color: 0xe0cdb2, roughness: 0.85 });
const visorMaterial = new THREE.MeshStandardMaterial({ color: 0x1b1f24, roughness: 0.5 });
const itemMaterial = new THREE.MeshStandardMaterial({ color: 0x8a5a2b, roughness: 0.7 });

export function createRig(bodyColor) {
  const root = new THREE.Group();

  const body = new THREE.Mesh(
    bodyGeometry,
    new THREE.MeshStandardMaterial({ color: bodyColor, roughness: 0.6 }),
  );
  body.position.y = 0.85;
  body.castShadow = true;
  root.add(body);

  const head = new THREE.Mesh(headGeometry, limbMaterial);
  head.position.y = 0.6;
  head.castShadow = true;
  body.add(head);

  const visor = new THREE.Mesh(visorGeometry, visorMaterial);
  visor.position.set(0, 0.02, 0.16);
  head.add(visor);

  const shoulder = new THREE.Group();
  shoulder.position.set(0.29, 0.35, 0);
  body.add(shoulder);

  const arm = new THREE.Mesh(armGeometry, limbMaterial);
  arm.position.y = -0.25;
  arm.castShadow = true;
  shoulder.add(arm);

  const hand = new THREE.Object3D();
  hand.position.y = -0.52;
  shoulder.add(hand);

  const item = new THREE.Mesh(itemGeometry, itemMaterial);
  item.position.set(0, -0.24, 0.04);
  item.rotation.x = 0.25;
  item.castShadow = true;
  hand.add(item);

  return {
    root,
    body,
    shoulder,
    hand,
    item,
    itemRestPosition: item.position.clone(),
    itemRestQuaternion: item.quaternion.clone(),
  };
}
