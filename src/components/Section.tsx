import type { PropsWithChildren } from "react";

export function Section(props: PropsWithChildren<{ id: string; title: string; subtitle?: string; tone?: "deep" | "mid" | "soft" }>) {
  return (
    <section id={props.id} className={`scroll-mt-24 py-16 sm:py-20 section-layer ${props.tone ? `tone-${props.tone}` : "tone-mid"}`}>
      <div className="container-px">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <div className="mx-auto mb-4 h-[3px] w-12 rounded-full bg-blueglow-500/80 shadow-glow" />
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{props.title}</h2>
          {props.subtitle ? <p className="mt-3 muted">{props.subtitle}</p> : null}
        </div>
        {props.children}
      </div>
    </section>
  );
}
