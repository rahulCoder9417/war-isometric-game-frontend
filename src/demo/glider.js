import * as THREE from 'three';

export const GLIDER_COLORS = { orange: 0xd9892b, teal: 0x2f9e94 };

const HOVER_HEIGHT = 1.4;
const FUSELAGE = { width: 0.14, height: 0.14, length: 1.25 };
const WING = { span: 1.1, thickness: 0.04, chord: 0.3, forward: 0.1 };
const TAIL_FIN = { thickness: 0.04, height: 0.3, chord: 0.28 };
const ROUGHNESS = 0.6;

const geometries = {
  fuselage: new THREE.BoxGeometry(FUSELAGE.width, FUSELAGE.height, FUSELAGE.length),
  wing: new THREE.BoxGeometry(WING.span, WING.thickness, WING.chord),
  tailFin: new THREE.BoxGeometry(TAIL_FIN.thickness, TAIL_FIN.height, TAIL_FIN.chord),
};

function createPart(name, geometry, material) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = name;
  mesh.castShadow = true;
  return mesh;
}

export function createGlider({ name, color, position }) {
  const material = new THREE.MeshStandardMaterial({ color, roughness: ROUGHNESS });

  const root = new THREE.Group();
  root.name = name;
  root.position.set(position.x, HOVER_HEIGHT, position.z);

  root.add(createPart('fuselage', geometries.fuselage, material));

  const wing = createPart('wing', geometries.wing, material);
  wing.position.z = WING.forward;
  root.add(wing);

  const tailFin = createPart('tail-fin', geometries.tailFin, material);
  tailFin.position.set(0, FUSELAGE.height / 2 + TAIL_FIN.height / 2, -(FUSELAGE.length / 2 - TAIL_FIN.chord / 2));
  root.add(tailFin);

  return root;
}
