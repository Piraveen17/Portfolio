import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { PROJECTS } from "../lib/data";

const accentMap: Record<string, { ring: string; glow: string; chip: string }> = {
  cyan: {
    ring: "ring-blueglow-500/30",
    glow: "shadow-glow",
    chip: "border-blueglow-500/35 bg-blueglow-500/10 text-blueglow-400",
  },
  red: {
    ring: "ring-red-500/25",
    glow: "shadow-[0_0_0_1px_rgba(239,68,68,.25),_0_18px_60px_rgba(239,68,68,.18)]",
    chip: "border-red-500/35 bg-red-500/10 text-red-200",
  },
};

export function ProjectsGrid() {
  return (
    <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-12">
      {/* Featured */}
      {PROJECTS.slice(0, 1).map((p) => {
        const a = accentMap[p.accent] ?? accentMap.cyan;
        return (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, rotateX: 1.5, rotateY: -1.5 }}
            className={`card overflow-hidden md:col-span-12 ring-1 ring-white/10 ${a.glow}`}
            style={{ transformStyle: "preserve-3d" as any }}
          >
            <div className="relative aspect-[21/9] overflow-hidden">
              <img
                src={p.image}
                alt={`${p.title} poster`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-950/75 via-bg-950/10 to-transparent" />
              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-xl border px-3 py-1 text-xs font-medium backdrop-blur"
                   style={{ borderColor: "rgba(255,255,255,.12)", background: "rgba(0,0,0,.25)" }}>
                <span className={`h-2 w-2 rounded-full ${p.accent === "red" ? "bg-red-400" : "bg-blueglow-400"} `} />
                Featured • {p.year}
              </div>
            </div>

            <div className="p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="display-text text-xl font-semibold tracking-tight sm:text-2xl">{p.title}</h3>
                  <p className="mt-2 text-sm text-white/80">{p.tagline}</p>
                </div>
                <a
                  href={p.github}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/90 transition hover:-translate-y-0.5 hover:shadow-glow"
                >
                  <Github className="h-4 w-4 text-blueglow-400" />
                  GitHub
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-white/80">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        );
      })}

      {/* Two cards */}
      {PROJECTS.slice(1).map((p, idx) => {
        const a = accentMap[p.accent] ?? accentMap.cyan;
        return (
          <motion.article
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: idx * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, rotateX: 1.2, rotateY: 1.2 }}
            className={`card overflow-hidden md:col-span-6 ring-1 ring-white/10 ${a.glow}`}
            style={{ transformStyle: "preserve-3d" as any }}
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={p.image}
                alt={`${p.title} poster`}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-950/75 via-bg-950/10 to-transparent" />
              <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-xl border px-3 py-1 text-xs font-medium backdrop-blur"
                   style={{ borderColor: "rgba(255,255,255,.12)", background: "rgba(0,0,0,.25)" }}>
                <span className={`h-2 w-2 rounded-full ${p.accent === "red" ? "bg-red-400" : "bg-blueglow-400"} `} />
                {p.year}
              </div>
            </div>

            <div className="p-6">
              <h3 className="display-text text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm text-white/80">{p.tagline}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.slice(0, 4).map((s) => (
                  <span key={s} className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-white/80">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between">
                <a
                  href={p.github}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/90 transition hover:-translate-y-0.5 hover:shadow-glow"
                >
                  <Github className="h-4 w-4 text-blueglow-400" />
                  GitHub
                </a>
                <span className="text-xs text-white/50">Selected</span>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
