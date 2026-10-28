import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { cn } from "../lib/cn";

export type Actor = "input" | "model" | "person" | "code";

export type Stage = {
  label: string;
  actor: Actor;
  /** One line, written like a log entry. */
  log: string;
};

export const ACTOR_STYLE: Record<
  Actor,
  { name: string; text: string; border: string; bg: string; fill: string }
> = {
  input: { name: "input", text: "text-fg-muted", border: "border-rule-strong", bg: "bg-fg-muted", fill: "bg-fg-faint" },
  model: { name: "model", text: "text-signal", border: "border-signal", bg: "bg-signal", fill: "bg-signal/70" },
  person: { name: "person", text: "text-hold", border: "border-hold", bg: "bg-hold", fill: "bg-hold/70" },
  code: { name: "code", text: "text-verified", border: "border-verified", bg: "bg-verified", fill: "bg-verified/70" },
};

export function ActorLegend({ className }: { className?: string }) {
  const items: { actor: Actor; text: string }[] = [
    { actor: "model", text: "Model proposes" },
    { actor: "person", text: "Person approves" },
    { actor: "code", text: "Code executes" },
  ];
  return (
    <ul className={cn("flex flex-wrap gap-x-5 gap-y-1.5", className)} aria-label="Color key">
      {items.map((i) => (
        <li key={i.actor} className="flex items-center gap-2 font-mono text-label text-fg-muted">
          <span aria-hidden="true" className={cn("h-2 w-2 rounded-full", ACTOR_STYLE[i.actor].bg)} />
          {i.text}
        </li>
      ))}
    </ul>
  );
}

const STEP_MS = 1900;

/**
 * A request moving through an agent pipeline, one stage at a time.
 * Click a stage to inspect it; auto-advance stops on hover, focus, click, or reduced motion.
 */
export function PipelineStrip({ stages, caption }: { stages: Stage[]; caption: string }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(!reduced);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = playing && !hovering && visible;

  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => {
      setActive((i) => (i + 1) % stages.length);
    }, STEP_MS);
    return () => window.clearInterval(t);
  }, [running, stages.length]);

  const current = stages[active];
  const style = ACTOR_STYLE[current.actor];

  return (
    <div
      ref={rootRef}
      className="panel relative overflow-hidden"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-rule px-4 py-3 sm:px-5">
        <p className="text-sm font-medium text-fg">{caption}</p>
        <div className="flex items-center gap-4">
          <ActorLegend className="hidden sm:flex" />
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="inline-flex h-8 items-center gap-1.5 rounded-md border border-rule px-2.5 font-mono text-label text-fg-muted transition-colors hover:border-rule-strong hover:text-fg"
            aria-label={playing ? "Pause the pipeline animation" : "Play the pipeline animation"}
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing ? "Pause" : "Play"}
          </button>
        </div>
      </div>

      <ol className="grid gap-3 px-4 py-5 sm:px-5 lg:grid-cols-7 lg:gap-0 lg:py-6">
        {stages.map((s, i) => {
          const a = ACTOR_STYLE[s.actor];
          const isActive = i === active;
          const reached = i < active;
          const isLast = i === stages.length - 1;
          return (
            <li key={s.label} className="relative flex items-start gap-3 lg:flex-col lg:items-center lg:gap-2.5 lg:px-1 lg:text-center">
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[17px] top-[38px] h-[calc(100%-26px)] w-px bg-rule lg:left-[calc(50%+22px)] lg:top-[18px] lg:h-px lg:w-[calc(100%-44px)]"
                >
                  <span
                    className={cn(
                      "block h-full w-full origin-top transition-transform duration-500 ease-out lg:origin-left",
                      a.fill,
                      reached ? "scale-x-100 scale-y-100" : "scale-y-0 lg:scale-x-0 lg:scale-y-100"
                    )}
                  />
                </span>
              ) : null}

              <button
                type="button"
                onClick={() => {
                  setActive(i);
                  setPlaying(false);
                }}
                aria-current={isActive ? "step" : undefined}
                aria-label={`Stage ${i + 1}: ${s.label}, handled by ${a.name}`}
                className={cn(
                  "relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full border bg-ink-900 font-mono text-label transition-colors duration-300",
                  isActive ? cn(a.border, a.text, "bg-ink-850") : reached ? cn("border-rule-strong", a.text) : "border-rule text-fg-faint hover:border-rule-strong hover:text-fg-muted"
                )}
              >
                {String(i + 1).padStart(2, "0")}
                {isActive && running ? (
                  <span aria-hidden="true" className={cn("absolute inset-0 animate-ping rounded-full border opacity-30", a.border)} />
                ) : null}
              </button>

              <div className="min-w-0 pt-1.5 lg:pt-0">
                <p className={cn("text-sm font-medium transition-colors duration-300", isActive ? "text-fg" : "text-fg-muted")}>
                  {s.label}
                </p>
                <p className={cn("font-mono text-[11px] leading-4", a.text, "opacity-80")}>{a.name}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="border-t border-rule bg-ink-950/60 px-4 py-3 sm:px-5">
        <p className="flex min-h-[2.5rem] items-baseline gap-3 font-mono text-[12.5px] leading-5 sm:min-h-[1.25rem]">
          <span className={cn("shrink-0", style.text)}>[{String(active + 1).padStart(2, "0")}]</span>
          <span className="min-w-0 whitespace-pre-wrap break-words text-fg/90">
            {current.log}
          </span>
        </p>
      </div>
    </div>
  );
}
