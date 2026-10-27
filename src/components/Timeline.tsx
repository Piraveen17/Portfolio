import { EXPERIENCE } from "../lib/data";

export function Timeline() {
  return (
    <ol className="divide-y divide-line border-y border-line">
      {EXPERIENCE.map((e) => (
        <li key={`${e.role}-${e.period}`} className="grid grid-cols-[minmax(0,1fr)] gap-2 py-5 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
          <p className="font-mono text-label text-mute">{e.period}</p>
          <div>
            <h3 className="font-semibold">{e.role}</h3>
            <p className="text-mute">{e.org}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[0.9375rem] leading-6">
              {e.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
