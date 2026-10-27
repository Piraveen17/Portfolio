import { SKILLS } from "../lib/data";

const GROUPS = [
  "Agents and backend",
  "Programming",
  "Databases",
  "Web Development",
  "Frameworks",
  "Tools & IDEs",
  "Editing & Design",
] as const;

export function SkillsGrid() {
  return (
    <dl className="grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-5 sm:grid-cols-2">
      {GROUPS.map((g) => {
        const items = SKILLS.filter((s) => s.group === g);
        if (!items.length) return null;
        return (
          <div key={g}>
            <dt className="font-mono text-label font-semibold text-mute">{g}</dt>
            <dd className="mt-1 text-body">{items.map((s) => s.label).join(", ")}</dd>
          </div>
        );
      })}
    </dl>
  );
}
