import { useMemo } from "react";
import { GraduationCap, Users, BadgeCheck, Pencil } from "lucide-react";

function getFallbackIcon(org: string) {
  const s = org.toLowerCase();
  if (s.includes("university")) return GraduationCap;
  if (s.includes("leo")) return Pencil;
  if (s.includes("ieee")) return BadgeCheck;
  return Users;
}

export function OrgMark({ org }: { org: string }) {
  const Icon = useMemo(() => getFallbackIcon(org), [org]);

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
      <Icon className="h-5 w-5 text-blueglow-400" />
    </div>
  );
}
