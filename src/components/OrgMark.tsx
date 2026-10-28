import { useMemo } from "react";
import { GraduationCap, Users, BadgeCheck, Pencil } from "lucide-react";

function getFallbackIcon(org: string) {
  const s = org.toLowerCase();
  if (s.includes("university") || s.includes("college")) return GraduationCap;
  if (s.includes("leo")) return Pencil;
  if (s.includes("ieee")) return BadgeCheck;
  return Users;
}

export function OrgMark({ org }: { org: string }) {
  const Icon = useMemo(() => getFallbackIcon(org), [org]);

  return (
    <div aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-rule">
      <Icon className="h-4 w-4 text-fg-faint" />
    </div>
  );
}
