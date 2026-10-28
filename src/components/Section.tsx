import type { PropsWithChildren } from "react";

export function Section(
  props: PropsWithChildren<{
    id: string;
    title: string;
    subtitle?: string;
    tone?: "deep" | "mid" | "soft";
  }>
) {
  const tone =
    props.tone === "soft" ? "bg-ink-900/40" : props.tone === "deep" ? "bg-transparent" : "bg-ink-900/20";

  return (
    <section
      id={props.id}
      aria-labelledby={`${props.id}-title`}
      className={`scroll-mt-20 py-14 sm:py-20 ${tone}`}
    >
      <div className="container-px">
        <header className="mb-10 sm:mb-12">
          <div className="flex items-center gap-5">
            <h2 id={`${props.id}-title`} className="h2 shrink-0">
              {props.title}
            </h2>
            <div aria-hidden="true" className="h-px flex-1 bg-rule" />
          </div>
          {props.subtitle ? (
            <p className="mt-3 max-w-prose text-fg-muted">{props.subtitle}</p>
          ) : null}
        </header>
        {props.children}
      </div>
    </section>
  );
}
