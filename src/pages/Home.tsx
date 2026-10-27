import { ContactCard } from "../components/ContactCard";
import { CredentialsBlock } from "../components/CredentialsBlock";
import { Hero } from "../components/Hero";
import { ProjectsGrid } from "../components/ProjectsGrid";
import { Section } from "../components/Section";
import { SkillsGrid } from "../components/SkillsGrid";
import { Timeline } from "../components/Timeline";
import { RESEARCH } from "../lib/data";
import { useEffect } from "react";

export function Home() {
  useEffect(() => {
    document.title = "Sasikaran Piraveen, Software Engineering Intern";
  }, []);
  return (
    <>
      <Hero />
      <Section id="work" n="01" title="work">
        <ProjectsGrid />
      </Section>
      <Section id="experience" n="02" title="experience">
        <Timeline />
      </Section>
      <Section id="research" n="03" title="research">
        {RESEARCH.map((r) => (
          <article key={r.title}>
            <h3 className="font-semibold leading-6">{r.title}</h3>
            <p className="prose-measure mt-2 text-mute">{r.description}</p>
            <ul className="mt-3 flex flex-wrap gap-2" aria-label="Topics">
              {r.tags.map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </Section>
      <Section id="skills" n="04" title="skills">
        <SkillsGrid />
      </Section>
      <Section id="credentials" n="05" title="credentials">
        <CredentialsBlock />
      </Section>
      <Section id="contact" n="06" title="contact">
        <ContactCard />
      </Section>
    </>
  );
}
