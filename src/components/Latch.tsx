import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./walkthrough/useStepper";

type Phase = "idle" | "message" | "proposal" | "gate" | "committed" | "refused";

const ORDER: Phase[] = ["message", "proposal", "gate"];

/**
 * The hero demo: the real mechanism in miniature. The model proposes, a gate holds,
 * and only a confirmed pending_action lets code write. Sample data.
 */
export function Latch() {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduced ? "gate" : "idle");
  const [bypassed, setBypassed] = useState(0);
  const timers = useRef<number[]>([]);
  const confirmRef = useRef<HTMLButtonElement>(null);
  const replayRef = useRef<HTMLButtonElement>(null);

  const play = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setBypassed(0);
    if (reduced) {
      setPhase("gate");
      return;
    }
    setPhase("idle");
    ORDER.forEach((p, i) => {
      timers.current.push(window.setTimeout(() => setPhase(p), 500 + i * 1000));
    });
  };

  useEffect(() => {
    play();
    return () => timers.current.forEach(window.clearTimeout);
    // Runs once on load; play() reads `reduced` at call time.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seen = (p: Phase) => {
    if (phase === "committed" || phase === "refused") return p !== "idle";
    return ORDER.indexOf(phase) >= ORDER.indexOf(p) && phase !== "idle";
  };
  const atGate = phase === "gate" || phase === "refused";
  const done = phase === "committed";

  return (
    <div
      className="on-console rounded border border-console-line bg-console text-console-text"
      role="region"
      aria-label="Live demo: a model proposal, a confirmation gate, and a refused bypass"
    >
      <div className="flex items-baseline justify-between gap-3 border-b border-console-line px-4 py-3">
        <h2 className="font-mono text-code font-semibold">the latch</h2>
        <p className="font-mono text-label text-console-mute">sample data, try it</p>
      </div>

      <div className="min-h-[392px] space-y-3 p-4">
        {seen("message") ? (
          <div className="settle flex justify-end">
            <p className="max-w-[85%] rounded bg-[#E3EAE5] px-3 py-2 text-[0.9375rem] text-ink">
              <span className="mb-0.5 block font-mono text-[0.75rem] text-mute">customer</span>2 egg kottu, pickup please
            </p>
          </div>
        ) : null}

        {seen("proposal") ? (
          <div className="settle rounded-sm border-l-4 border-proposed-console bg-console-raised px-3 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="state state-proposed">proposed</span>
              <span className="font-mono text-code font-semibold">model output, not yet acted on</span>
            </div>
            <pre className="mt-2 overflow-x-auto font-mono text-[0.8125rem] leading-5 text-[#D9E4DD]" tabIndex={0} aria-label="Proposed tool call">
{`add_item { item_query: "egg kottu", quantity: 2 }
request_checkout {}`}
            </pre>
          </div>
        ) : null}

        {seen("gate") ? (
          <div
            className={`settle rounded-sm border-2 px-3 py-3 ${
              done
                ? "border-committed-console bg-committed-console/10"
                : phase === "refused"
                ? "border-rejected-console bg-rejected-console/10"
                : "border-proposed-console bg-proposed-console/10"
            }`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`state ${done ? "state-committed" : phase === "refused" ? "state-rejected" : "state-proposed"}`}
              >
                {done ? "gate open" : phase === "refused" ? "refused" : "gate closed"}
              </span>
              <span className="font-mono text-code font-semibold">confirmation gate</span>
            </div>
            <p className="mt-2 text-[0.9375rem] leading-6">
              {done
                ? "The customer confirmed this exact proposal."
                : phase === "refused"
                ? `Refused. Mutations only run from a confirmed pending_action. Attempts blocked: ${bypassed}.`
                : "Nothing is written until the customer confirms."}
            </p>
            <p className="mt-1 font-mono text-label text-console-mute">
              rows written: {done ? "1" : "0"}
            </p>
            {atGate ? (
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  ref={confirmRef}
                  type="button"
                  className="btn border-console-text bg-console-text text-console hover:bg-white"
                  onClick={() => {
                    setPhase("committed");
                    window.requestAnimationFrame(() => replayRef.current?.focus());
                  }}
                >
                  Confirm
                </button>
                <button
                  type="button"
                  className="btn border-console-mute bg-transparent text-console-text hover:border-console-text"
                  onClick={() => {
                    setBypassed((n) => n + 1);
                    setPhase("refused");
                  }}
                >
                  Execute without confirming
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {done ? (
          <div className="settle rounded-sm border-l-4 border-committed-console bg-console-raised px-3 py-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="state state-committed">committed</span>
              <span className="font-mono text-code font-semibold">code placed order KT-20418</span>
            </div>
            <p className="mt-2 text-[0.9375rem] leading-6">
              Total <span className="font-mono font-semibold">LKR 1,700.00</span>{" "}
              <span className="state state-sourced ml-1">sourced</span>
            </p>
            <p className="mt-1 font-mono text-label text-sourced-console">
              read from the menu table, not generated by the model
            </p>
          </div>
        ) : null}

        {phase === "idle" ? <p className="font-mono text-label text-console-mute">waiting for a message</p> : null}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-console-line px-4 py-3">
        <p className="font-mono text-label text-console-mute" aria-live="polite">
          {phase === "gate"
            ? "Your move: confirm, or try to skip the gate."
            : phase === "committed"
            ? "Executed after confirmation."
            : phase === "refused"
            ? "The bypass was refused."
            : ""}
        </p>
        <button
          ref={replayRef}
          type="button"
          className="btn border-console-mute bg-transparent px-3 text-console-text hover:border-console-text"
          onClick={play}
        >
          Replay
        </button>
      </div>
    </div>
  );
}
