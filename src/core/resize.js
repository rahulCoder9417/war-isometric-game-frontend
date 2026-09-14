export function bindResize(canvas, camera, renderer) {
  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height, false);
  }

  window.addEventListener('resize', resize);
  resize();

  return () => window.removeEventListener('resize', resize);
}
