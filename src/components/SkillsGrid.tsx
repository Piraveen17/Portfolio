import { motion } from "framer-motion";
import {
  Braces,
  Database,
  Cpu,
  Code2,
  Terminal,
  Cloud,
  Shield,
  Boxes,
  Frame,
} from "lucide-react";
import { SKILLS } from "../lib/data";

const ICONS: Record<string, any> = {
  Frontend: Code2,
  Backend: Braces,
  "AI / ML": Cpu,
  Database: Database,
  Tools: Terminal,
  Framework: Frame,
};

const groups = [
  "Frontend",
  "Backend",
  "AI / ML",
  "Database",
  "Tools",
  "Framework",
] as const;

export function SkillsGrid() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, idx) => {
          const Icon = ICONS[g] ?? Boxes;
          const items = SKILLS.filter((s) => s.group === g);
          if (!items.length) return null;

          return (
            <motion.div
              key={g}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: idx * 0.06,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="card card-hover p-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
                    <Icon className="h-5 w-5 text-blueglow-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{g}</p>
                    <p className="text-xs text-white/60">
                      {items.length} skills
                    </p>
                  </div>
                </div>
                <div className="h-8 w-8 rounded-xl bg-blueglow-500/10" />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {items.map((s) => (
                  <div
                    key={s.label}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-white/85 transition hover:-translate-y-0.5 hover:shadow-glow"
                  >
                    <span>{s.label}</span>
                    <span className="text-blueglow-400/0 transition group-hover:text-blueglow-400/90">
                      ✦
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
