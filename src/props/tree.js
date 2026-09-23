import * as THREE from 'three';

const TRUNK = { radiusTop: 0.1, radiusBottom: 0.15, height: 1, segments: 6 };
const CANOPY = { radius: 0.8, height: 2.2, segments: 8 };

const geometries = {
  trunk: new THREE.CylinderGeometry(TRUNK.radiusTop, TRUNK.radiusBottom, TRUNK.height, TRUNK.segments),
  canopy: new THREE.ConeGeometry(CANOPY.radius, CANOPY.height, CANOPY.segments),
};

const materials = {
  trunk: new THREE.MeshStandardMaterial({ color: 0x6b4a2f, roughness: 0.9 }),
  canopy: new THREE.MeshStandardMaterial({ color: 0x3f6b3a, roughness: 0.8 }),
};

function createPart(name, geometry, material) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.castShadow = true;
  return mesh;
}

export function createTree() {
  const root = new THREE.Group();
  root.name = 'tree';

  const trunk = createPart('trunk', geometries.trunk, materials.trunk);
  trunk.position.y = TRUNK.height / 2;
  root.add(trunk);

  const canopy = createPart('canopy', geometries.canopy, materials.canopy);
  canopy.position.y = TRUNK.height + CANOPY.height / 2;
  root.add(canopy);

  return root;
}
