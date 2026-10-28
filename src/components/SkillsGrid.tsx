import { SKILLS, SKILL_GROUPS } from "../lib/data";

export function SkillsGrid() {
  return (
    <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
      {SKILL_GROUPS.map((g) => {
        const items = SKILLS.filter((s) => s.group === g);
        if (!items.length) return null;

        return (
          <div key={g} className="border-t border-rule pt-4">
            <h3 className="text-sm font-medium text-fg">{g}</h3>
            <ul className="mt-3 space-y-1.5 font-mono text-[13px] text-fg-muted">
              {items.map((s) => (
                <li key={s.label} className="transition-colors hover:text-fg">
                  {s.label}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
