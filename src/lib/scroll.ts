export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

export function getActiveSection(ids: string[], offset = 120) {
  // At the very bottom the last section may never reach the offset line; treat it as active.
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (atBottom && ids.length) return ids[ids.length - 1];

  const y = window.scrollY + offset;
  // Nothing is active until the first section reaches the offset line (e.g. while the hero is in view).
  let current = "";
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.offsetTop <= y) current = id;
  }
  return current;
}
