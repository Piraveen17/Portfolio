import { Link } from "react-router-dom";
import { PROFILE } from "../lib/data";
import { Latch } from "./Latch";

export function Hero() {
  return (
    <section id="top" aria-label="Introduction" className="py-12 sm:py-16">
      <div className="wrap grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div>
          <p className="font-mono text-code text-mute">{PROFILE.name}</p>
          <h1 className="h-display mt-3 text-[clamp(2rem,4vw,2.875rem)] leading-[1.12]">{PROFILE.headline}</h1>
          <p className="prose-measure mt-6 text-lead">
            {PROFILE.title} at {PROFILE.company}, working on an AI-driven ERP automation ecosystem. Computer Science
            undergraduate at the University of Jaffna.
          </p>
          <p className="prose-measure mt-4 text-mute">
            Below are two projects where you can step through a real request and watch the guardrails fire.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/work/intentlatch" className="btn-solid">
              Step through the WhatsApp agent
            </Link>
            <Link to="/work/car-rental" className="btn-line">
              Step through the booking platform
            </Link>
          </div>
          <p className="mt-6 flex flex-wrap gap-x-5 text-code">
            <a className="link inline-flex min-h-[44px] items-center" href={PROFILE.resumeUrl} download>
              Download resume
            </a>
            <a className="link inline-flex min-h-[44px] items-center" href={PROFILE.github}>
              GitHub
            </a>
            <a className="link inline-flex min-h-[44px] items-center" href={PROFILE.linkedin}>
              LinkedIn
            </a>
          </p>
        </div>
        <Latch />
      </div>
    </section>
  );
}
