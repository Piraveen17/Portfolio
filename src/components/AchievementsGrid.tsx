import { ACHIEVEMENTS } from "../lib/data";

export function AchievementsGrid() {
  return (
    <ul className="max-w-4xl divide-y divide-rule border-y border-rule">
      {ACHIEVEMENTS.map((a) => (
        <li key={a.title} className="grid grid-cols-[3.5rem_minmax(0,1fr)] items-baseline gap-x-6 py-4 sm:grid-cols-[4rem_14rem_minmax(0,1fr)]">
          <span className="font-mono text-label text-fg-faint">{a.year}</span>
          <p className="font-medium text-fg">{a.title}</p>
          <p className="col-start-2 text-sm text-fg-muted sm:col-start-auto">{a.desc}</p>
        </li>
      ))}
    </ul>
  );
}
