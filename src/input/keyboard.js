export function bindKeys(actions) {
  function onKeyDown(event) {
    if (event.repeat) return;
    const key = event.key.toLowerCase();
    if (Object.hasOwn(actions, key)) actions[key]();
  }

  window.addEventListener('keydown', onKeyDown);

  return () => window.removeEventListener('keydown', onKeyDown);
}
