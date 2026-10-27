import { BookingRace } from "../components/walkthrough/BookingRace";
import { SplitDemo } from "../components/walkthrough/SplitDemo";
import { WalkthroughFrame } from "../components/walkthrough/WalkthroughFrame";
import { CAR_CONTEXT, CAR_GLANCE, FLEET_SCENARIOS } from "../lib/walkthroughs/carRental";

export function CarRentalPage() {
  return (
    <WalkthroughFrame
      slug="car-rental"
      title="Car rental platform, step by step"
      pageTitle="Car rental platform walkthrough"
      context={CAR_CONTEXT}
      glance={CAR_GLANCE}
    >
      <nav aria-label="Demos on this page" className="flex flex-wrap gap-3 font-mono text-code">
        <a className="link inline-flex min-h-[44px] items-center" href="#booking">
          1. Two staff, one car
        </a>
        <a className="link inline-flex min-h-[44px] items-center" href="#assistant">
          2. Ask the fleet a question
        </a>
      </nav>

      <section id="booking" aria-labelledby="booking-h" className="scroll-mt-20">
        <h2 id="booking-h" className="h-display text-[1.5rem] leading-8">
          1. Two staff confirm overlapping bookings
        </h2>
        <p className="prose-measure mt-2 mb-6 text-mute">
          The most interesting part of the booking engine is what happens when two confirmations race. Step through it and
          watch the database settle it.
        </p>
        <BookingRace />
      </section>

      <section id="assistant" aria-labelledby="assistant-h" className="scroll-mt-20">
        <h2 id="assistant-h" className="h-display text-[1.5rem] leading-8">
          2. Ask the fleet a question
        </h2>
        <p className="prose-measure mt-2 mb-6 text-mute">
          Admins ask in plain English. A model proposes SQL, and code decides whether it may run. Try the two blocked
          examples as well as the successful one.
        </p>
        <SplitDemo
          label="Fleet query assistant walkthrough"
          scenarios={FLEET_SCENARIOS}
          chatTitle="Admin assistant"
          chatSubtitle="what the admin sees"
          traceTitle="Query pipeline"
          traceSubtitle="what the system does"
        />
      </section>
    </WalkthroughFrame>
  );
}
