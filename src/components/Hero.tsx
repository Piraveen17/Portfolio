import { motion } from "framer-motion";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  ArrowRight,
  Download,
  MapPin,
  Sparkles,
} from "lucide-react";
import { PROFILE } from "../lib/data";
import { scrollToId } from "../lib/scroll";
import { TypingLine } from "./TypingLine";
import { TiltCard } from "./TiltCard";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (d = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: d, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-20 sm:pt-24">
      {/* Hero-only animated background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 neon-grid-slow" />

        <motion.div
          className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-blueglow-500/25 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-28 top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl"
          animate={{ x: [0, -36, 0], y: [0, 18, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-[-120px] h-72 w-72 -translate-x-1/2 rounded-full bg-blueglow-400/15 blur-3xl"
          animate={{ y: [0, 28, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container-px relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-6xl"
        >
          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <motion.p
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={0.05}
                className="muted"
              >
                {PROFILE.title}
              </motion.p>

              <motion.h1
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={0.12}
                className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl display-text"
              >
                <span className="shimmer-text animate-shimmer">
                  {PROFILE.name}
                </span>
              </motion.h1>

              {/* Premium chips row (separate from H1) */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={0.17}
                className="mt-4 flex flex-wrap items-center gap-2"
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-blueglow-500/35 bg-blueglow-500/10 px-3 py-1 text-xs font-medium text-blueglow-300 shadow-glow">
                  <Sparkles className="h-3.5 w-3.5" /> Available for Internship
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/70 backdrop-blur">
                  <MapPin className="h-3.5 w-3.5 text-blueglow-400" />{" "}
                  {PROFILE.location}
                </span>
              </motion.div>

              <motion.p
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={0.2}
                className="mt-4 text-base sm:text-lg muted"
              >
                {PROFILE.tagline}
              </motion.p>

              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={0.28}
              >
                <TypingLine text={PROFILE.currently} align="start" />
              </motion.div>

              {/* Full-width CTAs on mobile = premium */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={0.34}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <a
                  href={PROFILE.resumeUrl}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blueglow-500/90 px-4 py-2.5 text-sm font-medium text-white shadow-glow transition hover:bg-blueglow-500 hover:shadow-glowStrong sm:w-auto"
                >
                  <Download className="h-4 w-4" />
                  Download Resume
                </a>

                <button
                  type="button"
                  onClick={() => scrollToId("projects")}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/90 backdrop-blur transition hover:-translate-y-0.5 hover:shadow-glow sm:w-auto"
                >
                  View Projects
                  <ArrowRight className="h-4 w-4 text-blueglow-400" />
                </button>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="show"
                variants={fadeUp}
                custom={0.42}
                className="mt-6 flex items-center gap-3"
              >
                <a
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-2 hover:shadow-glow"
                  href={PROFILE.github}
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5 text-white/90" />
                </a>
                <a
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-2 hover:shadow-glow"
                  href={PROFILE.linkedin}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5 text-white/90" />
                </a>
                <a
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-2 hover:shadow-glow"
                  href={`mailto:${PROFILE.email}`}
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5 text-white/90" />
                </a>
                <a
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-2 hover:shadow-glow"
                  href={PROFILE.instagram}
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5 text-white/90" />
                </a>
              </motion.div>
            </div>

            {/* Photo card tuned for mobile */}
            <div className="md:col-span-5">
              <div className="mx-auto max-w-[360px] md:max-w-none">
                <TiltCard>
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.22,
                      duration: 0.65,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="card card-hover rounded-3xl overflow-hidden relative before:absolute before:-inset-[2px] before:rounded-[26px] before:bg-blueglow-500/30 before:blur-lg before:opacity-70 before:-z-10"
                  >
                    <div className="relative aspect-[4/5] w-full">
                      <img
                        src="/profile.jpg"
                        alt="Profile"
                        className="h-full w-full object-cover opacity-95"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-950/60 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="rounded-2xl border border-white/10 bg-bg-950/55 p-3 backdrop-blur">
                          <p className="text-sm font-medium text-white/90">
                            Full-stack • Internship-ready
                          </p>
                          <p className="text-sm muted">
                            UI polish • clean architecture • reliable delivery
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TiltCard>
              </div>
            </div>
          </div>

          <div className="mt-16 h-px w-full bg-white/10" />
        </motion.div>
      </div>
    </section>
  );
}
