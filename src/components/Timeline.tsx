import { EXPERIENCE } from "../lib/data";
import { cn } from "../lib/cn";

export function Timeline() {
  return (
    <ol aria-label="Work and teaching" className="max-w-4xl">
      {EXPERIENCE.map((e, idx) => {
        const last = idx === EXPERIENCE.length - 1;
        return (
          <li key={e.role} className="grid md:grid-cols-[8rem_minmax(0,1fr)] md:gap-x-8">
            <p className="hidden pt-[3px] text-right font-mono text-label text-fg-muted md:block">{e.period}</p>

            <div className={cn("relative border-l pl-6 sm:pl-8", last ? "border-transparent pb-0" : "border-rule pb-10")}>
              <span
                aria-hidden="true"
                className={cn(
                  "absolute -left-[5px] top-[7px] h-[9px] w-[9px] rounded-full border-2 bg-ink-950",
                  e.current ? "border-signal" : "border-rule-strong"
                )}
              />
              {last ? <span aria-hidden="true" className="absolute left-[-1px] top-0 h-[8px] w-px bg-rule" /> : null}

              <p className="font-mono text-label text-fg-muted md:hidden">{e.period}</p>
              <h3 className="text-lg font-semibold leading-snug text-white">{e.role}</h3>
              <p className="mt-0.5 text-sm text-fg-muted">{e.org}</p>
              <ul className="mt-3 max-w-prose space-y-1.5 text-[15px] text-fg/85">
                {e.bullets.map((b) => (
                  <li key={b} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-fg-faint">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
