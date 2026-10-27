import { useEffect, useMemo, useRef, useState } from "react";
import type { Scenario, Step } from "../../lib/walkthroughs/types";
import { ChatThread, type ChatItem } from "./ChatThread";
import { Controls } from "./Controls";
import { Trace } from "./Trace";
import { useStepper } from "./useStepper";
import { WhyCaption } from "./WhyCaption";

type Props = {
  scenarios: Scenario[];
  chatTitle: string;
  chatSubtitle: string;
  traceTitle: string;
  traceSubtitle: string;
  /** Accessible name for the whole demo region. */
  label: string;
};

export function SplitDemo(props: Props) {
  const [scenarioId, setScenarioId] = useState(props.scenarios[0].id);
  const scenario = props.scenarios.find((s) => s.id === scenarioId) ?? props.scenarios[0];
  // Re-mount per scenario so stepper state resets cleanly.
  return (
    <div role="region" aria-label={props.label}>
      <div role="group" aria-label="Choose a scenario" className="mb-4 flex flex-wrap gap-2">
        {props.scenarios.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={s.id === scenario.id}
            onClick={() => setScenarioId(s.id)}
            className={`btn ${
              s.id === scenario.id
                ? "border-ink bg-ink text-paper"
                : "border-ink/55 bg-transparent text-ink hover:border-ink hover:bg-surface"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <p className="mb-4 max-w-[68ch] text-mute">{scenario.blurb}</p>
      <ScenarioPlayer key={scenario.id} scenario={scenario} {...props} />
    </div>
  );
}

function ScenarioPlayer({ scenario, chatTitle, chatSubtitle, traceTitle, traceSubtitle }: Props & { scenario: Scenario }) {
  const [declined, setDeclined] = useState(false);
  const gateIndex = scenario.steps.findIndex((s) => s.gate);
  const stepper = useStepper(scenario.steps.length, {
    holdAt: (i) => !!scenario.steps[i]?.gate,
  });
  const nextRef = useRef<HTMLButtonElement>(null);
  const { index } = stepper;

  const atGate = !declined && !!scenario.steps[index]?.gate;
  const visible: Step[] = useMemo(() => {
    if (declined && scenario.declined) return [...scenario.steps.slice(0, gateIndex + 1), scenario.declined];
    return scenario.steps.slice(0, index + 1);
  }, [declined, scenario, index, gateIndex]);

  const current = visible[visible.length - 1];
  const total = declined ? gateIndex + 2 : scenario.steps.length;
  const shownIndex = declined ? gateIndex + 1 : index;

  const chatItems: ChatItem[] = useMemo(() => {
    const items: ChatItem[] = [];
    visible.forEach((s, si) => {
      s.chat?.forEach((m, mi) => {
        const isGateMsg = !!s.gate && !!m.buttons?.some((b) => b.role === "confirm");
        const resolved = isGateMsg && (declined || si < visible.length - 1);
        items.push({
          ...m,
          key: `${scenario.id}-${s.id}-${mi}`,
          liveGate: isGateMsg && !resolved,
          chosen: resolved ? (declined ? "cancel" : "confirm") : undefined,
        });
      });
    });
    return items;
  }, [visible, declined, scenario.id]);

  const refocusNext = () => window.requestAnimationFrame(() => nextRef.current?.focus());

  const onGate = (choice: "confirm" | "cancel") => {
    stepper.pause();
    if (choice === "confirm") {
      stepper.next();
    } else if (scenario.declined) {
      setDeclined(true);
    }
    refocusNext();
  };

  // Leaving a declined branch by replaying/going back.
  useEffect(() => {
    if (declined && index !== gateIndex) setDeclined(false);
  }, [declined, index, gateIndex]);

  const canBack = declined || index > 0;
  const canNext = !declined && !atGate && index < scenario.steps.length - 1;

  const onBack = () => {
    if (declined) {
      setDeclined(false);
      stepper.pause();
    } else stepper.back();
  };
  const onReplay = () => {
    setDeclined(false);
    stepper.replay();
  };

  return (
    <div>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 lg:grid-cols-2">
        <ChatThread title={chatTitle} subtitle={chatSubtitle} items={chatItems} onGate={onGate} />
        <Trace
          title={traceTitle}
          subtitle={traceSubtitle}
          steps={visible}
          gateState={(_s, isLast) => (declined ? "declined" : isLast && atGate ? "pending" : "passed")}
        />
      </div>

      <div className="sticky bottom-0 z-10 mt-4 border-t border-line bg-paper py-3 sm:static sm:border-0 sm:py-0">
        <Controls
          index={shownIndex}
          total={total}
          canBack={canBack}
          canNext={canNext}
          nextLabel={atGate ? "Confirm in the chat" : "Next"}
          playing={stepper.playing}
          onBack={onBack}
          onNext={stepper.next}
          onReplay={onReplay}
          onToggle={stepper.toggle}
          nextRef={nextRef}
        />
        <WhyCaption>
          {atGate && !stepper.playing
            ? `${current.why} Auto-play always stops at this gate, so press Confirm or Cancel in the chat.`
            : current.why}
        </WhyCaption>
      </div>
    </div>
  );
}
