export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.replaceState(null, "", `#${id}`);
}

export function getActiveSection(ids: string[], offset = 120) {
  const y = window.scrollY + offset;
  let current = ids[0] ?? "";
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.offsetTop <= y) current = id;
  }
  return current;
}
