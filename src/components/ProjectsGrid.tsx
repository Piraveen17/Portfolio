import { Link } from "react-router-dom";
import { PROJECTS, type Project } from "../lib/data";

type Tone = "info" | "proposed" | "committed" | "sourced" | "rejected";

const RAIL: Record<Tone, string> = {
  info: "border-line",
  proposed: "border-proposed",
  committed: "border-committed",
  sourced: "border-sourced",
  rejected: "border-rejected",
};
const CHIP: Record<Tone, string> = {
  info: "border border-line text-mute",
  proposed: "state-proposed",
  committed: "state-committed",
  sourced: "state-sourced",
  rejected: "state-rejected",
};

const FLOWS: Record<string, { label: string; text: string; tone: Tone }[]> = {
  intentlatch: [
    { label: "proposed", text: "Model emits a typed tool call", tone: "proposed" },
    { label: "gate", text: "Customer taps Confirm", tone: "proposed" },
    { label: "committed", text: "Code executes the change", tone: "committed" },
    { label: "sourced", text: "Total read from the database", tone: "sourced" },
  ],
  "car-rental": [
    { label: "race", text: "Two staff confirm overlapping dates", tone: "info" },
    { label: "waiting", text: "Car-row lock serialises them", tone: "proposed" },
    { label: "committed", text: "First passes the exclusion constraint", tone: "committed" },
    { label: "rejected", text: "Second gets a clean 409", tone: "rejected" },
  ],
};

function slugOf(p: Project) {
  return p.caseStudyUrl?.split("/").pop() ?? "";
}

function Featured({ p }: { p: Project }) {
  const flow = FLOWS[slugOf(p)] ?? [];
  return (
    <article className="grid grid-cols-[minmax(0,1fr)] gap-6 border-t border-ink py-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div>
        <p className="font-mono text-label text-mute">
          {p.year}
          {p.status ? `, ${p.status}` : ""}
        </p>
        <h3 className="h-display mt-1 text-[1.5rem] leading-8">{p.title}</h3>
        <p className="mt-3 text-lead">{p.tagline}</p>
        <p className="prose-measure mt-3 text-mute">{p.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
          {p.stack.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {p.caseStudyUrl ? (
            <Link to={p.caseStudyUrl} className="btn-solid">
              Step through it
            </Link>
          ) : null}
          <a className="btn-line" href={p.github}>
            GitHub
          </a>
          {p.demo ? (
            <a className="btn-line" href={p.demo}>
              Live demo
            </a>
          ) : p.demoNote ? (
            <span className="font-mono text-label text-mute">{p.demoNote}</span>
          ) : null}
        </div>
      </div>
      <ol className="space-y-2 self-start" aria-label={`How ${p.title} stays safe`}>
        {flow.map((f, i) => (
          <li key={f.label} className={`flex items-center gap-3 border-l-4 bg-surface px-3 py-3 ${RAIL[f.tone]}`}>
            <span className="font-mono text-label text-mute" aria-hidden="true">
              {i + 1}
            </span>
            <span className={`state ${CHIP[f.tone]}`}>{f.label}</span>
            <span className="text-[0.9375rem]">{f.text}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}

function Plain({ p }: { p: Project }) {
  return (
    <article className="flex flex-col rounded border border-line bg-surface p-5">
      <p className="font-mono text-label text-mute">{p.year}</p>
      <h3 className="mt-1 font-mono text-code font-semibold leading-6">{p.title}</h3>
      <p className="mt-2 text-[0.9375rem] leading-6">{p.tagline}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Stack">
        {p.stack.map((s) => (
          <li key={s} className="tag">
            {s}
          </li>
        ))}
      </ul>
      <p className="mt-auto flex flex-wrap gap-x-5 pt-4 text-code">
        <a className="link inline-flex min-h-[44px] items-center" href={p.github}>
          GitHub
        </a>
        {p.demo ? (
          <a className="link inline-flex min-h-[44px] items-center" href={p.demo}>
            Live demo
          </a>
        ) : null}
      </p>
    </article>
  );
}

export function ProjectsGrid() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);
  return (
    <div>
      {featured.map((p) => (
        <Featured key={p.title} p={p} />
      ))}
      <h3 className="mt-6 border-t border-line pt-8 font-mono text-code font-semibold">More projects</h3>
      <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-2">
        {rest.map((p) => (
          <Plain key={p.title} p={p} />
        ))}
      </div>
    </div>
  );
}
