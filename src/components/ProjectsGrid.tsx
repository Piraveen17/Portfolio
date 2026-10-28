import { ExternalLink, Github } from "lucide-react";
import { PROJECTS, type Project } from "../lib/data";
import { ACTOR_STYLE, type Actor } from "./PipelineStrip";
import { cn } from "../lib/cn";

type LogRow = { actor: Actor; who: string; text: string };

/** What each featured system does with one request, written as an action log. */
const SCHEMATICS: Record<string, LogRow[]> = {
  "WhatsApp Order Agent": [
    { actor: "input", who: "customer", text: "Please cancel my order." },
    {
      actor: "model",
      who: "agent",
      text: "propose request_cancel_order(order)",
    },
    {
      actor: "code",
      who: "harness",
      text: "store pending_action, send buttons",
    },
    { actor: "person", who: "customer", text: "taps [Confirm]" },
    {
      actor: "code",
      who: "service",
      text: "check nonce and expiry, then cancel in one transaction",
    },
    { actor: "code", who: "reply", text: "status rendered from the order row" },
  ],
  "Car Rental Management System": [
    {
      actor: "input",
      who: "admin",
      text: "Which cars earned the most this year?",
    },
    {
      actor: "code",
      who: "router",
      text: "no pre-built metric matches, hand to planner",
    },
    {
      actor: "model",
      who: "planner",
      text: "propose SELECT … ORDER BY revenue LIMIT 3",
    },
    {
      actor: "code",
      who: "validator",
      text: "one SELECT, approved tables and functions, ≤ 100 rows",
    },
    {
      actor: "code",
      who: "database",
      text: "admin-only, read-only transaction",
    },
  ],
};

function ActionLog({ rows, label }: { rows: LogRow[]; label: string }) {
  return (
    <figure className="rounded-lg border border-rule bg-ink-950/70">
      <figcaption className="border-b border-rule px-4 py-2.5 font-mono text-label text-fg-faint">
        {label}
      </figcaption>
      <ol className="space-y-2.5 px-4 py-4">
        {rows.map((r, i) => {
          const a = ACTOR_STYLE[r.actor];
          return (
            <li
              key={i}
              className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 font-mono text-[12px] leading-[1.55]"
            >
              <span
                className={cn(
                  "flex h-[1.55em] items-center gap-2 self-start",
                  a.text
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn("h-1.5 w-1.5 shrink-0 rounded-full", a.bg)}
                />
                {r.who}
              </span>
              <span className="break-words text-fg/85">{r.text}</span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}

function FeaturedProject({ p }: { p: Project }) {
  const rows = SCHEMATICS[p.title];
  return (
    <article className="panel group grid grid-cols-1 gap-8 p-5 transition-colors duration-200 hover:border-rule-strong sm:p-7 lg:grid-cols-12 lg:gap-10">
      <div className="flex flex-col lg:col-span-7">
        <p className="font-mono text-label text-fg-faint">
          {p.year}
          {p.note ? (
            <span className="ml-3 rounded border border-rule-strong px-1.5 py-0.5 text-fg-muted">
              {p.note}
            </span>
          ) : null}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.015em] text-white">
          {p.title}
        </h3>
        <p className="mt-3 text-lead text-fg/90">{p.tagline}</p>
        <p className="mt-3 max-w-prose text-fg-muted">{p.description}</p>

        {p.guarantees ? (
          <div className="mt-6">
            <p className="text-sm font-medium text-fg">
              What the system enforces
            </p>
            <ul className="mt-3 space-y-2">
              {p.guarantees.map((g) => (
                <li key={g} className="flex gap-3 text-sm text-fg/85">
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-verified"
                  />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <p className="stack-list mt-6">{p.stack.join("  /  ")}</p>

        <div className="mt-6 flex flex-wrap gap-2 lg:mt-auto lg:pt-6">
          {p.walkthrough ? (
            <a href={p.walkthrough} className="btn-primary">
              Walkthrough
            </a>
          ) : null}
          {p.demo ? (
            <a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Live demo
              <ExternalLink
                className="h-3.5 w-3.5 text-fg-muted"
                aria-hidden="true"
              />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <Github className="h-4 w-4 text-fg-muted" aria-hidden="true" />
            Source
            <span className="sr-only">for {p.title} (opens in a new tab)</span>
          </a>
        </div>
      </div>

      {rows ? (
        <div className="lg:col-span-5">
          <ActionLog rows={rows} label="one request, start to finish" />
        </div>
      ) : null}
    </article>
  );
}

function OtherProject({ p }: { p: Project }) {
  return (
    <article className="tile tile-interactive relative flex flex-col p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-base font-semibold text-white">
          <a
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            className="after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-signal"
          >
            {p.title}
            <span className="sr-only"> source code (opens in a new tab)</span>
          </a>
        </h3>
        <span className="font-mono text-label text-fg-faint">{p.year}</span>
      </div>
      <p className="mt-2 text-sm text-fg/85">{p.tagline}</p>
      <p className="mt-2 text-sm text-fg-muted">{p.description}</p>
      <div className="mt-auto flex items-end justify-between gap-3 pt-4">
        <p className="stack-list">{p.stack.join("  /  ")}</p>
        <Github
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-fg-faint transition-colors group-hover:text-fg [.tile:hover_&]:text-fg"
        />
      </div>
    </article>
  );
}

export function ProjectsGrid() {
  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <div className="space-y-12">
      <div className="space-y-6">
        {featured.map((p) => (
          <FeaturedProject key={p.title} p={p} />
        ))}
      </div>

      <div>
        <h3 className="mb-4 text-sm font-medium text-fg-muted">Other work</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {others.map((p) => (
            <OtherProject key={p.title} p={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
