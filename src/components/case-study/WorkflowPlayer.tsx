import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { SCENARIOS, type ChatMessage, type ScenarioId, type TraceEntry } from "../../lib/caseStudies";
import { ACTOR_STYLE, ActorLegend } from "../PipelineStrip";
import { cn } from "../../lib/cn";

const SCENARIO_IDS = Object.keys(SCENARIOS) as ScenarioId[];

export function readScenarioParam(): ScenarioId {
  const v = new URLSearchParams(window.location.search).get("scenario");
  return SCENARIO_IDS.includes(v as ScenarioId) ? (v as ScenarioId) : "whatsapp";
}

function Bubble({ m }: { m: ChatMessage }) {
  const user = m.side === "user";
  return (
    <li className={cn("rise flex max-w-[92%] flex-col", user ? "items-end self-end" : "items-start self-start")}>
      <span className="mb-1 font-mono text-[11px] text-fg-faint">{m.who}</span>
      <div
        className={cn(
          "rounded-lg border px-3.5 py-2.5 text-sm leading-relaxed",
          user ? "rounded-tr-sm border-rule-strong bg-ink-850 text-fg" : "rounded-tl-sm border-rule bg-ink-950 text-fg"
        )}
      >
        <p className="whitespace-pre-line break-words">{m.text}</p>

        {m.chips ? (
          <ul className="mt-2.5 flex flex-wrap gap-1.5 border-t border-dashed border-rule pt-2.5" aria-label="Reply buttons">
            {m.chips.map((c) => (
              <li key={c} className="rounded border border-rule-strong px-2 py-0.5 text-xs text-fg-muted">
                {c}
              </li>
            ))}
          </ul>
        ) : null}

        {m.table ? (
          <div className="mt-3 overflow-x-auto rounded border border-rule">
            <table className="w-full min-w-[280px] border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-rule bg-ink-900">
                  {m.table.headers.map((h) => (
                    <th key={h} scope="col" className="px-2.5 py-1.5 font-mono font-medium text-fg-muted">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {m.table.rows.map((r) => (
                  <tr key={r[0]} className="border-b border-rule last:border-0">
                    {r.map((c, i) => (
                      <td key={i} className={cn("px-2.5 py-1.5", i > 0 && "font-mono")}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {m.sql ? (
          <details className="group mt-2.5">
            <summary className="cursor-pointer select-none font-mono text-xs text-fg-muted hover:text-signal">
              SQL that ran
            </summary>
            <pre className="mt-2 overflow-x-auto whitespace-pre rounded border border-rule bg-ink-900 p-2.5 font-mono text-[11px] leading-relaxed text-fg/85">
              {m.sql}
            </pre>
          </details>
        ) : null}
      </div>
    </li>
  );
}

function Trace({ t, index, active }: { t: TraceEntry; index: number; active: boolean }) {
  const a = ACTOR_STYLE[t.actor];
  return (
    <li
      className={cn(
        "rise relative grid grid-cols-[2rem_minmax(0,1fr)] gap-3 rounded-lg border p-3 transition-colors duration-300",
        active ? cn(a.border, "bg-ink-850") : "border-rule bg-ink-900/40"
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid h-8 w-8 place-items-center rounded-full border font-mono text-[11px]",
          active ? cn(a.border, a.text) : "border-rule-strong text-fg-faint"
        )}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <p className={cn("text-sm font-medium", active ? "text-white" : "text-fg/85")}>{t.title}</p>
          <span className={cn("font-mono text-[11px]", a.text, !active && "opacity-70")}>
            {a.name}: {t.status}
          </span>
        </div>
        <p className={cn("mt-1 text-[13px] leading-relaxed", active ? "text-fg/90" : "text-fg-muted")}>{t.body}</p>
        {t.code ? (
          <pre className="mt-2 overflow-x-auto whitespace-pre rounded border border-rule bg-ink-950 p-2.5 font-mono text-[11px] leading-relaxed text-fg/85">
            {t.code}
          </pre>
        ) : null}
      </div>
    </li>
  );
}

export function WorkflowPlayer() {
  const reduced = useReducedMotion();
  const [id, setId] = useState<ScenarioId>(readScenarioParam);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const chatRef = useRef<HTMLOListElement | null>(null);
  const traceRef = useRef<HTMLOListElement | null>(null);

  const scenario = SCENARIOS[id];
  const total = scenario.steps.length;
  const done = step >= total;

  const shown = useMemo(() => scenario.steps.slice(0, step), [scenario, step]);
  const chats = shown.flatMap((s) => (s.chat ? [s.chat] : []));
  const traces = shown.flatMap((s) => (s.trace ? [s.trace] : []));

  const choose = (next: ScenarioId) => {
    setId(next);
    setStep(0);
    setPlaying(false);
    const url = new URL(window.location.href);
    url.searchParams.set("scenario", next);
    history.replaceState(null, "", url);
  };

  const reset = () => {
    setStep(0);
    setPlaying(false);
  };

  useEffect(() => {
    if (!playing) return;
    if (done) {
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(() => setStep((s) => s + 1), step === 0 ? 150 : reduced ? 2200 : 1600);
    return () => window.clearTimeout(t);
  }, [playing, step, done, reduced]);

  // Keep the newest entry visible inside each pane without moving the page.
  useEffect(() => {
    for (const el of [chatRef.current, traceRef.current]) {
      if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
    }
  }, [step, reduced]);

  const percent = Math.round((step / total) * 100);

  return (
    <div className="panel overflow-hidden">
      {/* Controls */}
      <div className="flex flex-col gap-3 border-b border-rule p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        <div role="group" aria-label="Choose a system" className="grid grid-cols-2 gap-1 rounded-lg border border-rule bg-ink-950 p-1 sm:inline-grid">
          {SCENARIO_IDS.map((sid) => (
            <button
              key={sid}
              type="button"
              aria-pressed={sid === id}
              onClick={() => choose(sid)}
              className={cn(
                "min-h-[36px] whitespace-nowrap rounded-md px-2 text-[13px] transition-colors sm:px-3 sm:text-sm",
                sid === id ? "bg-ink-850 text-white shadow-[inset_0_0_0_1px_theme(colors.rule.strong)]" : "text-fg-muted hover:text-fg"
              )}
            >
              {SCENARIOS[sid].tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 sm:flex">
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setStep((s) => Math.min(s + 1, total));
            }}
            disabled={done}
            className="btn-primary whitespace-nowrap px-3 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <StepForward className="hidden h-4 w-4 sm:block" aria-hidden="true" />
            Next step
          </button>
          <button
            type="button"
            onClick={() => {
              if (playing) return setPlaying(false);
              if (done) setStep(0);
              setPlaying(true);
            }}
            className="btn-secondary whitespace-nowrap px-3"
          >
            {playing ? <Pause className="hidden h-4 w-4 sm:block" aria-hidden="true" /> : <Play className="hidden h-4 w-4 sm:block" aria-hidden="true" />}
            {playing ? "Pause" : "Play all"}
          </button>
          <button type="button" onClick={reset} disabled={step === 0} className="btn-secondary px-3 disabled:cursor-not-allowed disabled:opacity-40">
            <RotateCcw className="hidden h-4 w-4 sm:block" aria-hidden="true" />
            Reset
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="px-4 pt-4 sm:px-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <p className="max-w-prose text-sm text-fg/90">{done ? scenario.doneNote : scenario.summary}</p>
          <p className="shrink-0 font-mono text-label text-fg-muted" aria-live="polite">
            {step === 0 ? `${total} steps` : `Step ${step} of ${total}`}
          </p>
        </div>
        <div
          role="progressbar"
          aria-label="Walkthrough progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          className="mt-3 h-[3px] overflow-hidden rounded-full bg-rule"
        >
          <div className="h-full rounded-full bg-signal transition-[width] duration-500" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {/* Panes */}
      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <section aria-labelledby="pane-chat" className="flex min-w-0 flex-col rounded-lg border border-rule bg-ink-950/50">
          <header className="border-b border-rule px-4 py-3">
            <h3 id="pane-chat" className="text-sm font-medium text-fg">
              {scenario.channelTitle}
            </h3>
            <p className="text-xs text-fg-faint">{scenario.channelNote}</p>
          </header>
          <ol
            ref={chatRef}
            aria-live="polite"
            className="flex h-[300px] flex-col gap-3 overflow-y-auto p-4 sm:h-[460px]"
          >
            {chats.length === 0 ? (
              <li className="m-auto max-w-[24ch] text-center text-sm text-fg-faint">
                Press Next step to start the conversation.
              </li>
            ) : (
              chats.map((m, i) => <Bubble key={`${id}-c${i}`} m={m} />)
            )}
          </ol>
        </section>

        <section aria-labelledby="pane-trace" className="flex min-w-0 flex-col rounded-lg border border-rule bg-ink-950/50">
          <header className="flex flex-wrap items-start justify-between gap-x-4 gap-y-2 border-b border-rule px-4 py-3">
            <div>
              <h3 id="pane-trace" className="text-sm font-medium text-fg">
                Behind the scenes
              </h3>
              <p className="text-xs text-fg-faint">Who handled each step, and what they did</p>
            </div>
            <ActorLegend />
          </header>
          <ol ref={traceRef} aria-live="polite" className="flex h-[360px] flex-col gap-2.5 overflow-y-auto p-4 sm:h-[460px]">
            {traces.length === 0 ? (
              <li className="m-auto max-w-[28ch] text-center text-sm text-fg-faint">
                Each step will show whether the model, a person, or code handled it.
              </li>
            ) : (
              traces.map((t, i) => <Trace key={`${id}-t${i}`} t={t} index={i} active={i === traces.length - 1 && !done} />)
            )}
          </ol>
        </section>
      </div>
    </div>
  );
}
