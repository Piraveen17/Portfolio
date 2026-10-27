import { useEffect, useMemo, useRef, useState } from "react";
import { buildRace, RACE_REQUESTS, type Lane, type RaceTone } from "../../lib/walkthroughs/carRental";
import { CodeBlock } from "./CodeBlock";
import { Controls } from "./Controls";
import { useStepper } from "./useStepper";
import { WhyCaption } from "./WhyCaption";

const DAYS = [6, 7, 8, 9, 10, 11, 12, 13];

const TONE_CHIP: Record<RaceTone, { cls: string; text: string }> = {
  info: { cls: "border border-console-line text-console-mute", text: "sent" },
  proposed: { cls: "state-proposed", text: "pre-check" },
  committed: { cls: "state-committed", text: "ok" },
  waiting: { cls: "state-proposed", text: "waiting" },
  rejected: { cls: "state-rejected", text: "refused" },
};

const LIFECYCLE = ["pending", "confirmed", "completed"] as const;

export function BookingRace() {
  const [winner, setWinner] = useState<Lane>(0);
  const steps = useMemo(() => buildRace(winner), [winner]);
  const stepper = useStepper(steps.length, { intervalMs: 1800 });
  const { index } = stepper;
  const laneRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    laneRefs.current.forEach((el) => {
      if (el) el.scrollTop = el.scrollHeight;
    });
  }, [index, winner]);
  const step = steps[index];

  const events = steps.slice(0, index + 1).flatMap((s, si) => s.events.map((e, ei) => ({ ...e, key: `${s.id}-${ei}`, latest: si === index })));
  const confirmedNow = step.confirmed;
  const refused = step.refused;

  const barState = (lane: Lane): "confirmed" | "refused" | "pending" =>
    confirmedNow.includes(lane) ? "confirmed" : refused === lane ? "refused" : "pending";

  const statusLine = `Step ${index + 1} of ${steps.length}: ${step.title}`;

  return (
    <div role="region" aria-label="Concurrent booking demo">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          className={`btn ${winner === 1 ? "border-ink bg-ink text-paper" : "border-ink/55 text-ink hover:border-ink hover:bg-surface"}`}
          aria-pressed={winner === 1}
          onClick={() => {
            setWinner((w) => (w === 0 ? 1 : 0));
            stepper.reset();
          }}
        >
          Request B arrives first
        </button>
        <p className="text-mute">The outcome follows arrival order. Whoever takes the lock first wins; the other is refused. Dates and ids are sample data.</p>
      </div>

      <p className="sr-only" aria-live="polite">
        {statusLine}
      </p>

      {/* Calendar of the two requests for one car */}
      <div className="rounded border border-line bg-surface p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="font-mono text-code font-semibold">Toyota RAV4, November days (sample)</h3>
          <p className="font-mono text-label text-mute">end date is exclusive: [start, end)</p>
        </div>
        <div className="mt-3">
          <div>
            <div className="grid grid-cols-8 gap-px font-mono text-label text-mute" aria-hidden="true">
              {DAYS.map((d) => (
                <div key={d} className="border-l border-line px-1">
                  {d}
                </div>
              ))}
            </div>
            {RACE_REQUESTS.map((r, lane) => {
              const st = barState(lane as Lane);
              return (
                <div key={r.id} className="mt-2 grid grid-cols-8 gap-px">
                  <div
                    style={{ gridColumnStart: r.from - 6 + 1, gridColumnEnd: r.to - 6 + 1 }}
                    className={`flex min-h-[44px] items-center rounded-sm border-2 px-2 font-mono text-label font-semibold ${
                      st === "confirmed"
                        ? "border-committed bg-committed text-white"
                        : st === "refused"
                        ? "border-rejected bg-rejected-soft text-rejected"
                        : "border-dashed border-proposed bg-proposed-soft text-proposed"
                    }`}
                  >
                    {r.id}: {st === "confirmed" ? "confirmed" : st === "refused" ? "refused" : "pending"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-3 text-[0.9375rem] leading-6 text-mute">
          Request A is {RACE_REQUESTS[0].dates}. Request B is {RACE_REQUESTS[1].dates}. They overlap on Nov 9.
          {refused !== undefined ? ` Request ${RACE_REQUESTS[refused].id} was refused and stays pending.` : ""}
        </p>

        {/* Lifecycle */}
        <div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-label" aria-label="Booking lifecycle">
          {LIFECYCLE.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              <span
                className={`rounded-sm border px-2 py-0.5 ${
                  (s === "pending" && index < 4) || (s === "confirmed" && index >= 4)
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-mute"
                }`}
              >
                {s}
              </span>
              {i < LIFECYCLE.length - 1 ? <span aria-hidden="true" className="text-mute">to</span> : null}
            </span>
          ))}
          <span className="text-mute">
            also: pending to rejected or cancelled, confirmed to cancelled. Other moves are blocked by a trigger.
          </span>
        </div>
      </div>

      {/* Transactions */}
      <div className="on-console mt-4 rounded border border-console-line bg-console text-console-text">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-console-line px-4 py-3">
          <h3 className="font-mono text-code font-semibold">Two transactions, one car</h3>
          <p className="font-mono text-label text-console-mute" role="status">
            car-row lock:{" "}
            <span className={step.lock === "free" ? "" : "text-proposed-console"}>
              {step.lock === "free" ? "free" : `held by ${RACE_REQUESTS[step.lock].label}`}
            </span>
            , confirmed for this car:{" "}
            <span className={confirmedNow.length ? "text-committed-console" : ""}>
              {confirmedNow.length ? confirmedNow.map((l) => RACE_REQUESTS[l].label).join(", ") : "none"}
            </span>
          </p>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-px bg-console-line md:grid-cols-2">
          {([0, 1] as Lane[]).map((lane) => (
            <div key={lane} ref={(el) => { laneRefs.current[lane] = el; }} className="min-h-[220px] bg-console p-4 md:h-[360px] md:overflow-y-auto">
              <h4 className="font-mono text-code font-semibold">
                Staff {lane + 1}, {RACE_REQUESTS[lane].label}
                {lane === winner && index >= 2 ? <span className="ml-2 font-normal text-console-mute">(arrives first)</span> : null}
              </h4>
              <ol className="mt-3 space-y-3">
                {events
                  .filter((e) => e.lane === lane)
                  .map((e) => (
                    <li key={e.key} className={`settle rounded-sm border-l-4 bg-console-raised px-3 py-2 ${
                      e.tone === "committed"
                        ? "border-committed-console"
                        : e.tone === "rejected"
                        ? "border-rejected-console"
                        : e.tone === "waiting" || e.tone === "proposed"
                        ? "border-proposed-console"
                        : "border-console-line"
                    }`}>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`state ${TONE_CHIP[e.tone].cls}`}>{TONE_CHIP[e.tone].text}</span>
                        <span className="text-[0.9375rem]">{e.text}</span>
                      </div>
                      {e.code ? (
                        <CodeBlock
                          code={{ lang: e.code.startsWith("{") ? "json" : "sql", text: e.code, mark: e.tone === "rejected" ? { lines: [1, 2], tone: "rejected" } : undefined }}
                        />
                      ) : null}
                    </li>
                  ))}
                {events.filter((e) => e.lane === lane).length === 0 ? (
                  <li className="font-mono text-label text-console-mute">idle</li>
                ) : null}
              </ol>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Controls
          index={index}
          total={steps.length}
          canBack={index > 0}
          canNext={index < steps.length - 1}
          playing={stepper.playing}
          onBack={stepper.back}
          onNext={stepper.next}
          onReplay={stepper.replay}
          onToggle={stepper.toggle}
        />
        <WhyCaption>
          <strong className="font-semibold">{step.title}. </strong>
          {step.why}
        </WhyCaption>
      </div>
    </div>
  );
}
