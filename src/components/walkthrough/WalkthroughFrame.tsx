import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { PROJECTS } from "../../lib/data";
import type { Context, GlanceItem } from "../../lib/walkthroughs/types";

type Props = {
  slug: string;
  title: string;
  /** Used for document.title. */
  pageTitle: string;
  context: Context;
  glance: { stack: string[]; decisions: GlanceItem[] };
  children: React.ReactNode;
};

export function WalkthroughFrame({ slug, title, pageTitle, context, glance, children }: Props) {
  const h1 = useRef<HTMLHeadingElement>(null);
  const project = PROJECTS.find((p) => p.caseStudyUrl === `/work/${slug}`);

  useEffect(() => {
    const prev = document.title;
    document.title = `${pageTitle} | Sasikaran Piraveen`;
    h1.current?.focus({ preventScroll: true });
    return () => {
      document.title = prev;
    };
  }, [pageTitle]);

  return (
    <article className="wrap py-10 sm:py-14">
      <Link to="/#work" className="link inline-flex min-h-[44px] items-center font-mono text-code">
        Back to work
      </Link>

      <header className="mt-4">
        <h1 ref={h1} tabIndex={-1} className="h-display text-[clamp(1.875rem,4.5vw,2.75rem)] leading-[1.15] focus-visible:!shadow-none focus-visible:!outline-none">
          {title}
        </h1>
        {project?.status ? (
          <p className="mt-2 font-mono text-code text-proposed">Status: {project.status}</p>
        ) : null}
      </header>

      <dl className="mt-8 grid grid-cols-[minmax(0,1fr)] gap-6 border-y border-line py-6 md:grid-cols-3">
        {[
          { k: "The problem", v: context.problem },
          { k: "My role", v: context.role },
          { k: "The decision I'm proudest of", v: context.decision },
        ].map((c) => (
          <div key={c.k}>
            <dt className="font-mono text-label font-semibold text-mute">{c.k}</dt>
            <dd className="mt-1 text-[1.0625rem] leading-7">{c.v}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-10 space-y-14">{children}</div>

      <section aria-labelledby="glance-h" className="mt-16 border-t border-ink pt-8">
        <h2 id="glance-h" className="h-display text-[1.5rem] leading-8">
          Architecture at a glance
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Stack">
          {glance.stack.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
        <ol className="mt-6 grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-3">
          {glance.decisions.map((d, i) => (
            <li key={d.title} className="border-t border-line pt-3">
              <p className="font-mono text-label text-mute">decision {i + 1}</p>
              <h3 className="mt-1 font-semibold">{d.title}</h3>
              <p className="mt-1 text-[0.9375rem] leading-6 text-mute">{d.body}</p>
            </li>
          ))}
        </ol>
        {project ? (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a className="btn-solid" href={project.github}>
              GitHub repository
            </a>
            {project.demo ? (
              <a className="btn-line" href={project.demo}>
                Live demo
              </a>
            ) : null}
            {project.demoNote ? <span className="font-mono text-label text-mute">{project.demoNote}</span> : null}
          </div>
        ) : null}
        {project?.prototypeUrl ? (
          <p className="mt-4 text-[0.9375rem] text-mute">
            This walkthrough was first built as a standalone page.{" "}
            <a className="link" href={project.prototypeUrl}>
              View the original prototype
            </a>
            .
          </p>
        ) : null}
      </section>
    </article>
  );
}
