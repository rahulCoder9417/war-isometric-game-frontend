import * as THREE from 'three';

const MARKER_GEOMETRY = new THREE.SphereGeometry(0.19, 12, 8);
const MARKER_MATERIAL = new THREE.MeshBasicMaterial({ color: 0xffd166, wireframe: true });

export function createMarkers(scene, targets) {
  const meshes = targets.map(() => {
    const mesh = new THREE.Mesh(MARKER_GEOMETRY, MARKER_MATERIAL);
    mesh.name = 'marker';
    scene.add(mesh);
    return mesh;
  });

  return {
    // Reads matrixWorld directly instead of calling getWorldPosition() per target,
    // so the scene's matrices must be updated before this runs.
    sync() {
      for (let i = 0; i < targets.length; i += 1) {
        meshes[i].position.setFromMatrixPosition(targets[i].matrixWorld);
      }
    },
  };
}
