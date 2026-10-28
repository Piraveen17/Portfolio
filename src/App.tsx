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
import { RESEARCH } from "./lib/data";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const ABOUT_FACTS = [
  { k: "Focus", v: "LLM agents and the backend systems that keep them safe" },
  { k: "Work", v: "Software Engineering Intern, David Pieris Holdings" },
  { k: "Research", v: "Deepfake detection with RGB and forensic feature fusion" },
  { k: "Study", v: "BSc (Hons) Computer Science, University of Jaffna. OGPA 3.85/4.0" },
];

export function App() {
  return (
    <div className="min-h-screen text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-signal focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-950"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <SiteBackground />
      <Analytics />
      <SpeedInsights />

      <Navbar />
      <main id="main">
        <Hero />

        <Section
          id="about"
          title="About"
          subtitle="What I work on, and why."
          tone="soft"
        >
          <div className="grid gap-10 md:grid-cols-12">
            <div className="space-y-4 text-lead text-fg/85 md:col-span-7">
              <p>
                I'm a Computer Science undergraduate at the University of Jaffna and a
                Software Engineering Intern working on AI for ERP automation.
              </p>
              <p>
                Most of my work is about one problem: letting a language model help with a
                real business task without letting it make things up or change data on
                its own. In my systems the model reads the request and proposes an action.
                Code checks it, asks a person when something will change, and takes every
                number from the database.
              </p>
              <p>
                Before AI work I built full-stack web apps with Next.js and PostgreSQL, and
                I still care about clear interfaces. I'm also researching deepfake
                detection.
              </p>
            </div>

            <dl className="grid content-start gap-x-6 gap-y-5 border-t border-rule pt-6 sm:grid-cols-2 md:col-span-5 md:grid-cols-1 md:border-l md:border-t-0 md:pl-8 md:pt-1">
              {ABOUT_FACTS.map((x) => (
                <div key={x.k}>
                  <dt className="label">{x.k}</dt>
                  <dd className="mt-1 text-fg">{x.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>

        <Section
          id="skills"
          title="Skills"
          subtitle="Grouped by what I use them for."
          tone="mid"
        >
          <SkillsGrid />
        </Section>

        <Section
          id="projects"
          title="Projects"
          subtitle="The first two have step-by-step walkthroughs of how they work inside."
          tone="deep"
        >
          <ProjectsGrid />
        </Section>

        <Section id="research" title="Research" tone="mid">
          <div className="grid gap-6">
            {RESEARCH.map((r) => (
              <article key={r.title} className="grid gap-3 md:grid-cols-[8rem_minmax(0,1fr)] md:gap-x-8">
                <p className="label md:pt-1.5 md:text-right">
                  <span aria-hidden="true" className="text-signal">●</span> {r.status}
                </p>
                <div>
                  <h3 className="max-w-[46ch] text-xl font-semibold leading-snug tracking-[-0.01em]">
                    {r.title}
                  </h3>
                  <p className="mt-3 max-w-prose text-fg-muted">{r.description}</p>
                  <p className="stack-list mt-4">{r.tags.join("  /  ")}</p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="experience"
          title="Experience"
          subtitle="Work, teaching, and education."
          tone="soft"
        >
          <Timeline />
          <CredentialsBlock />
        </Section>

        <Section
          id="achievements"
          title="Achievements"
          subtitle="Competitive programming and hackathons."
          tone="mid"
        >
          <AchievementsGrid />
        </Section>

        <Section
          id="contact"
          title="Contact"
          subtitle="Email is the fastest way to reach me."
          tone="deep"
        >
          <ContactCard />
        </Section>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
