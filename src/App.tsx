import { Navbar } from "./components/Navbar";
import { SiteBackground } from "./components/SiteBackground";
import { ScrollProgress } from "./components/ScrollProgress";
import { BackToTop } from "./components/BackToTop";
import { Hero } from "./components/Hero";
import { Section } from "./components/Section";
import { SkillsGrid } from "./components/SkillsGrid";
import { ProjectsGrid } from "./components/ProjectsGrid";
import { Timeline } from "./components/Timeline";
import { AchievementsGrid } from "./components/AchievementsGrid";
import { CredentialsBlock } from "./components/CredentialsBlock";
import { ContactCard } from "./components/ContactCard";
import { Footer } from "./components/Footer";
import { motion } from "framer-motion";
import { RESEARCH } from "./lib/data";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export function App() {
  return (
    <div className="min-h-screen bg-bg-950 text-white font-body">
      <ScrollProgress />
      <SiteBackground />
      <Analytics />
      <SpeedInsights />

      <Navbar />
      <main>
        <Hero />

        <Section
          id="about"
          title="ABOUT"
          subtitle="Focused on clean UI, reliable systems, and research-driven curiosity."
          tone="soft"
        >
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="card card-hover p-6"
            >
              <p className="text-sm leading-7 text-white/80">
                I am a Computer Science undergraduate (BSc Hons, reading) with a
                strong focus on building clean user interfaces and production-ready
                systems. I enjoy shipping reliable full-stack features, from UI
                design to data validation and API integration. Alongside product
                work, I am interested in deep learning research, especially
                computer vision topics like deepfake detection. I value clear
                architecture, thoughtful UX decisions, and performance-aware
                implementation.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "UI/UX",
                  "Full-stack",
                  "Deep Learning",
                  "System Design",
                  "Frontend",
                ].map((t) => (
                  <span
                    key={t}
                    className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="grid gap-4">
              {[
                { k: "Focus", v: "Frontend and full-stack development" },
                { k: "Strength", v: "Polished UI and reliable logic" },
                { k: "Research", v: "Deep learning for real-world problems" },
                { k: "Currently", v: "BSc (Hons) CS - OGPA 3.89/4.0" },
              ].map((x, idx) => (
                <motion.div
                  key={x.k}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    delay: idx * 0.06,
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="card card-hover p-6"
                >
                  <p className="text-xs text-white/55">{x.k}</p>
                  <p className="mt-1 text-sm font-medium text-white/85">
                    {x.v}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <Section
          id="skills"
          title="SKILLS"
          subtitle="Core tools and technologies I use to build and ship products."
          tone="mid"
        >
          <SkillsGrid />
        </Section>

        <Section
          id="projects"
          title="PROJECTS"
          subtitle="Selected work built with real-world constraints."
          tone="deep"
        >
          <ProjectsGrid />
          <p className="mt-6 text-center text-xs text-white/50">
            Replace thumbnails inside{" "}
            <span className="text-white/70">public/projects/</span>.
          </p>
        </Section>

        <Section
          id="research"
          title="RESEARCH"
          subtitle="Focused highlights in AI and systems exploration."
          tone="mid"
        >
          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            {RESEARCH.map((r, idx) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{
                  delay: idx * 0.06,
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="card card-hover p-6 md:col-span-2 md:justify-self-center md:max-w-3xl"
              >
                <h3 className="text-base font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm muted">{r.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {r.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-1 text-xs text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section
          id="experience"
          title="EXPERIENCE"
          subtitle="Teaching support, teamwork, and delivery experience."
          tone="soft"
        >
          <Timeline />
          <CredentialsBlock />
        </Section>

        <Section
          id="achievements"
          title="ACHIEVEMENTS"
          subtitle="Hackathons and competitive programming participation."
          tone="mid"
        >
          <AchievementsGrid />
        </Section>

        <Section
          id="contact"
          title="CONTACT"
          subtitle="Fastest way to reach me - email and socials."
          tone="deep"
        >
          <ContactCard />
        </Section>

        <Footer />
      </main>
      <BackToTop />
    </div>
  );
}
