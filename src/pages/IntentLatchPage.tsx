import { SplitDemo } from "../components/walkthrough/SplitDemo";
import { WalkthroughFrame } from "../components/walkthrough/WalkthroughFrame";
import {
  INTENTLATCH_CONTEXT,
  INTENTLATCH_GLANCE,
  INTENTLATCH_SCENARIOS,
} from "../lib/walkthroughs/intentlatch";

export function IntentLatchPage() {
  return (
    <WalkthroughFrame
      slug="intentlatch"
      title="WhatsApp order management, step by step"
      pageTitle="WhatsApp order management walkthrough"
      context={INTENTLATCH_CONTEXT}
      glance={INTENTLATCH_GLANCE}
    >
      <section aria-labelledby="demo-h">
        <h2 id="demo-h" className="h-display text-[1.5rem] leading-8">
          Follow one request through the system
        </h2>
        <p className="prose-measure mt-2 mb-6 text-mute">
          Pick a scenario, then step through it. When the trace reaches the confirmation gate, press Confirm or Cancel in
          the chat yourself. All menu items, prices and order numbers are sample data.
        </p>
        <SplitDemo
          label="WhatsApp order walkthrough"
          scenarios={INTENTLATCH_SCENARIOS}
          chatTitle="WhatsApp chat"
          chatSubtitle="what the customer sees"
          traceTitle="System trace"
          traceSubtitle="what the system does"
        />
      </section>
    </WalkthroughFrame>
  );
}
