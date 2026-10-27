import type { PropsWithChildren } from "react";

/** Ledger-style section: sequence number and name in a left gutter, content to the right. */
export function Section({
  id,
  n,
  title,
  children,
}: PropsWithChildren<{ id: string; n: string; title: string }>) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-16 border-t border-line py-12 sm:py-16">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] gap-6 md:grid-cols-[9rem_minmax(0,1fr)] lg:grid-cols-[11rem_minmax(0,1fr)]">
        <h2 id={`${id}-h`} className="h-display text-[1.375rem] leading-8 md:sticky md:top-20 md:self-start">
          <span className="block font-mono text-label font-normal text-mute">{n}</span>
          {title}
        </h2>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
