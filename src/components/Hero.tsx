import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Download,
  MapPin,
} from "lucide-react";
import { CASE_STUDY_PATH, PROFILE } from "../lib/data";
import { TypingLine } from "./TypingLine";
import { TiltCard } from "./TiltCard";
import { PipelineStrip, type Stage } from "./PipelineStrip";

const HERO_STAGES: Stage[] = [
  {
    label: "Message in",
    actor: "input",
    log: `in       "That's all, place the order"  (signed webhook, deduplicated)`,
  },
  {
    label: "Intent routed",
    actor: "model",
    log: "route    classify_intent → order agent",
  },
  {
    label: "Checkout proposed",
    actor: "model",
    log: "propose  request_checkout()   # places nothing",
  },
  {
    label: "Cart priced",
    actor: "code",
    log: "price    total from menu prices → pending_action(nonce, expiry)",
  },
  {
    label: "Customer confirms",
    actor: "person",
    log: "hold     summary + [Confirm] [Edit] [Cancel] → customer taps Confirm",
  },
  {
    label: "Order placed",
    actor: "code",
    log: "exec     consume nonce → INSERT order in one transaction",
  },
  {
    label: "Reply sent",
    actor: "code",
    log: 'send     "Order {number from database}, total {total from database}"',
  },
];

const SOCIALS = [
  { href: PROFILE.github, label: "GitHub", Icon: Github },
  { href: PROFILE.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${PROFILE.email}`, label: "Email", Icon: Mail },
  { href: PROFILE.instagram, label: "Instagram", Icon: Instagram },
];

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative pb-6 pt-10 sm:pb-8 sm:pt-16"
    >
      <div className="container-px">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <p className="font-mono text-sm text-fg-muted">{PROFILE.title}</p>

            <h1 className="mt-3 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-white">
              {PROFILE.name}
            </h1>

            <p className="mt-5 max-w-[34ch] text-xl leading-snug text-fg/90 sm:text-[1.375rem]">
              {PROFILE.tagline}
            </p>

            <TypingLine text={PROFILE.currently} align="start" />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={PROFILE.resumeUrl}
                className="btn-primary w-full sm:w-auto"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download resume
              </a>
              <a
                href={CASE_STUDY_PATH}
                className="btn-secondary w-full sm:w-auto"
              >
                See how my agents work
              </a>
            </div>

            <ul className="mt-6 flex items-center gap-2" aria-label="Profiles">
              {SOCIALS.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a className="icon-btn" href={href} aria-label={label}>
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <div className="mx-auto max-w-[340px] md:ml-auto md:mr-0 md:max-w-[380px]">
              <TiltCard maxTilt={3}>
                <figure className="panel overflow-hidden">
                  <div className="relative aspect-[4/5] w-full">
                    <img
                      src="/profile.jpg"
                      alt="Portrait of Sasikaran Piraveen"
                      className="h-full w-full object-cover"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
                  </div>
                  <figcaption className="space-y-1.5 border-t border-rule px-4 py-3">
                    <span className="flex items-center gap-2 text-sm text-fg-muted">
                      <MapPin
                        className="h-4 w-4 text-fg-faint"
                        aria-hidden="true"
                      />
                      {PROFILE.city}
                    </span>
                    <span className="flex items-baseline gap-2 font-mono text-label text-fg-muted">
                      <span
                        aria-hidden="true"
                        className="relative top-[-1px] h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
                      />
                      Open to Software Engineer roles
                    </span>
                  </figcaption>
                </figure>
              </TiltCard>
            </div>
          </div>
        </div>

        <div className="mt-14 sm:mt-16">
          <PipelineStrip
            stages={HERO_STAGES}
            caption="One request through my WhatsApp order agent"
          />
        </div>
      </div>
    </section>
  );
}
