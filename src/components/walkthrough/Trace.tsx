import { useEffect, useRef } from "react";
import type { Step, TraceKind } from "../../lib/walkthroughs/types";
import { CodeBlock } from "./CodeBlock";

const CHIP: Record<TraceKind, string> = {
  info: "border border-console-line text-console-mute",
  proposed: "state-proposed",
  gate: "state-proposed",
  committed: "state-committed",
  sourced: "state-sourced",
  rejected: "state-rejected",
};

const RAIL: Record<TraceKind, string> = {
  info: "border-console-line",
  proposed: "border-proposed-console",
  gate: "border-proposed-console",
  committed: "border-committed-console",
  sourced: "border-sourced-console",
  rejected: "border-rejected-console",
};

export type GateState = "pending" | "passed" | "declined";

type Props = {
  title: string;
  subtitle: string;
  steps: Step[];
  /** Resolved state of the gate step, if one is visible. */
  gateState?: (step: Step, isLast: boolean) => GateState;
};

function CheckList({ checks }: { checks: NonNullable<Step["checks"]> }) {
  return (
    <ul className="mt-3 space-y-1.5" aria-label="Validator checks">
      {checks.map((c) => (
        <li key={c.label} className="flex items-start gap-2 font-mono text-[0.8125rem] leading-5">
          <span
            className={`mt-px inline-block w-[3.25rem] shrink-0 rounded-sm px-1 text-center text-[0.75rem] font-semibold ${
              c.result === "pass"
                ? "state-committed"
                : c.result === "fail"
                ? "state-rejected"
                : "border border-console-line text-console-mute"
            }`}
          >
            {c.result === "pass" ? "pass" : c.result === "fail" ? "fail" : "skip"}
          </span>
          <span className="text-console-text">
            {c.label}
            {c.note ? <span className="block text-console-mute">{c.note}</span> : null}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Trace({ title, subtitle, steps, gateState }: Props) {
  const scroller = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [steps.length]);

  return (
    <section
      aria-label={title}
      className="on-console flex h-[440px] flex-col overflow-hidden rounded border border-console-line bg-console text-console-text sm:h-[520px]"
    >
      <header className="flex items-baseline justify-between gap-3 border-b border-console-line px-4 py-3">
        <h3 className="font-mono text-code font-semibold">{title}</h3>
        <p className="font-mono text-label text-console-mute">{subtitle}</p>
      </header>
      <ol ref={scroller} className="flex-1 space-y-3 overflow-y-auto p-4" tabIndex={0} aria-label={`${title} steps`}>
        {steps.map((s, i) => {
          const last = i === steps.length - 1;
          const gs = s.gate ? gateState?.(s, last) : undefined;
          return (
            <li
              key={s.id}
              className={`settle rounded-sm border-l-4 bg-console-raised px-3 py-3 ${RAIL[s.kind]} ${
                last ? "ring-1 ring-console-line" : ""
              }`}
              aria-current={last ? "step" : undefined}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className={`state ${CHIP[s.kind]}`}>{s.label}</span>
                <h4 className="font-mono text-code font-semibold">{s.title}</h4>
              </div>
              {s.body ? <p className="mt-2 text-[0.9375rem] leading-6 text-console-text">{s.body}</p> : null}
              {s.gate ? (
                <div
                  className={`mt-3 rounded-sm border-2 px-3 py-2 font-mono text-[0.8125rem] leading-5 ${
                    gs === "pending"
                      ? "border-proposed-console bg-proposed-console/10 text-proposed-console"
                      : gs === "declined"
                      ? "border-rejected-console bg-rejected-console/10 text-rejected-console"
                      : "border-committed-console bg-committed-console/10 text-committed-console"
                  }`}
                  role="status"
                >
                  {gs === "pending" ? (
                    <>
                      <strong className="font-semibold">Gate closed.</strong> Nothing is written until the customer
                      presses Confirm. Rows written: 0.
                    </>
                  ) : gs === "declined" ? (
                    <>
                      <strong className="font-semibold">Gate refused.</strong> The customer pressed Cancel. Rows
                      written: 0.
                    </>
                  ) : (
                    <>
                      <strong className="font-semibold">Gate open.</strong> The customer confirmed this exact
                      proposal.
                    </>
                  )}
                </div>
              ) : null}
              {s.code ? <CodeBlock code={s.code} /> : null}
              {s.checks ? <CheckList checks={s.checks} /> : null}
              {s.sourceNote ? (
                <p className="mt-2 font-mono text-[0.8125rem] text-sourced-console">{s.sourceNote}</p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
