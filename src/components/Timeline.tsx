import { motion } from "framer-motion";
import { EXPERIENCE } from "../lib/data";

export function Timeline() {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="relative pl-6">
        <div className="absolute left-2 top-0 h-full w-px bg-white/10" />
        <div className="grid gap-5">
          {EXPERIENCE.map((e, idx) => (
            <motion.div
              key={e.role}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: idx * 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="absolute -left-[2px] top-6 h-3 w-3 rounded-full bg-blueglow-500 shadow-glow" />
              <div className="card card-hover p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold">{e.role}</h3>
                    <p className="text-sm text-white/70">{e.org}</p>
                  </div>
                  <span className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/70">
                    {e.period}
                  </span>
                </div>

                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/75">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
