import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { ACHIEVEMENTS } from "../lib/data";

export function AchievementsGrid() {
  return (
    <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {ACHIEVEMENTS.map((a, idx) => (
        <motion.div
          key={a.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: idx * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="card card-hover p-5"
        >
          <div className="flex items-start gap-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
              <Trophy className="h-5 w-5 text-blueglow-400" />
            </div>
            <div>
              <p className="text-sm font-semibold">{a.title}</p>
              <p className="mt-1 text-sm muted">{a.desc}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
