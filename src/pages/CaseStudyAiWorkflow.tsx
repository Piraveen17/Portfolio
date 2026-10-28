import { useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { SiteBackground } from "../components/SiteBackground";
import { ScrollProgress } from "../components/ScrollProgress";
import { BackToTop } from "../components/BackToTop";
import { Footer } from "../components/Footer";
import { ACTOR_STYLE, type Actor } from "../components/PipelineStrip";
import { WorkflowPlayer } from "../components/case-study/WorkflowPlayer";
import { cn } from "../lib/cn";

const RULES: { actor: Actor; title: string; text: string }[] = [
  {
    actor: "model",
    title: "The model proposes",
    text: "It reads the request and suggests a tool call or a query. It never writes to the database.",
  },
  {
    actor: "person",
    title: "A person approves changes",
    text: "Placing, changing or cancelling an order waits for the customer to tap Confirm.",
  },
  {
    actor: "code",
    title: "Code executes and supplies the numbers",
    text: "Tested code validates each proposal, runs it, and fills every price, total and count from the database.",
  },
];

type DiagramStage = { actor: Actor; name: string; text: string };

const WHATSAPP_STAGES: DiagramStage[] = [
  {
    actor: "input",
    name: "Webhook",
    text: "FastAPI checks the HMAC signature over the raw request body, records the message ID to drop duplicates, and returns 200 straight away.",
  },
  {
    actor: "code",
    name: "Queue",
    text: "A Redis + ARQ job runs per customer, debounced and under a per-customer lock, with retries and a dead-letter queue.",
  },
  {
    actor: "code",
    name: "Pre-router",
    text: "Button taps, yes/no replies and commands are handled by code. No model call.",
  },
  {
    actor: "model",
    name: "Router",
    text: "One forced classify_intent call picks a specialist: Menu, Order, Customer or Support.",
  },
  {
    actor: "model",
    name: "Specialist agent",
    text: "Emits typed tool calls. Its prompt holds an opaque customer ID and display name, never a phone number.",
  },
  {
    actor: "code",
    name: "Tools and services",
    text: "Validate every call. Reads and cart edits run directly; placing, changing or cancelling an order creates a pending action instead.",
  },
  {
    actor: "person",
    name: "Confirmation",
    text: "The customer taps Confirm. The action's nonce works once and the action expires.",
  },
  {
    actor: "code",
    name: "Outbox",
    text: "Replies are rendered from database rows, queued, sent by a worker, and tracked through delivery receipts.",
  },
];

const VALIDATOR_RULES: [string, string][] = [
  ["Statement count", "Exactly one. Anything after a semicolon is rejected."],
  [
    "Statement type",
    "SELECT only, including inside CTEs. SELECT INTO is rejected.",
  ],
  ["Tables", "Seven approved tables, in approved schemas only."],
  [
    "Columns",
    "Credential columns such as password_hash, token and api_key are rejected.",
  ],
  [
    "Functions",
    "Only allowlisted aggregates and helpers, such as count, sum and coalesce.",
  ],
  ["Row limit", "LIMIT is added or lowered to at most 100."],
];

function StageDiagram({
  stages,
  label,
}: {
  stages: DiagramStage[];
  label: string;
}) {
  return (
    <ol aria-label={label} className="relative">
      {stages.map((s, i) => {
        const a = ACTOR_STYLE[s.actor];
        const last = i === stages.length - 1;
        return (
          <li
            key={s.name}
            className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 pb-5 last:pb-0"
          >
            {!last ? (
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-[17px] top-9 w-px bg-rule"
              />
            ) : null}
            <span
              aria-hidden="true"
              className={cn(
                "relative grid h-9 w-9 place-items-center rounded-full border bg-ink-900 font-mono text-[11px]",
                a.border,
                a.text
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="pt-1.5">
              <p className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-medium text-fg">{s.name}</span>
                <span className={cn("font-mono text-[11px]", a.text)}>
                  {a.name}
                </span>
              </p>
              <p className="mt-1 max-w-prose text-sm text-fg-muted">{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function Code({ children, caption }: { children: string; caption: string }) {
  return (
    <figure className="overflow-hidden rounded-lg border border-rule bg-ink-950">
      <figcaption className="border-b border-rule px-4 py-2 font-mono text-label text-fg-faint">
        {caption}
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-fg/85">
        {children}
      </pre>
    </figure>
  );
}

function DesignPart({
  id,
  index,
  title,
  lead,
  children,
}: {
  id: string;
  index: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <article
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-20 border-t border-rule pt-10"
    >
      <p className="font-mono text-label text-fg-faint">{index}</p>
      <h3
        id={`${id}-title`}
        className="mt-1 text-2xl font-semibold tracking-[-0.015em] text-white"
      >
        {title}
      </h3>
      <p className="mt-3 max-w-prose text-lead text-fg/85">{lead}</p>
      <div className="mt-8">{children}</div>
    </article>
  );
}

export function CaseStudyAiWorkflow() {
  useEffect(() => {
    document.title = "AI workflow case study: Sasikaran Piraveen";
    const hash = window.location.hash.slice(1);
    if (hash)
      requestAnimationFrame(() =>
        document.getElementById(hash)?.scrollIntoView()
      );
  }, []);

  return (
    <div className="min-h-screen text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-signal focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-ink-950"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <SiteBackground />
      <Navbar />

      <main id="main">
        {/* 30-second read */}
        <section
          id="top"
          aria-labelledby="cs-title"
          className="pb-14 pt-10 sm:pb-20 sm:pt-16"
        >
          <div className="container-px">
            <nav
              aria-label="Breadcrumb"
              className="font-mono text-label text-fg-faint"
            >
              <a href="/#projects" className="hover:text-fg">
                Projects
              </a>
              <span aria-hidden="true" className="mx-2">
                /
              </span>
              <span aria-current="page" className="text-fg-muted">
                AI workflow case study
              </span>
            </nav>

            <h1
              id="cs-title"
              className="mt-5 max-w-[20ch] text-[clamp(2.1rem,5vw,3.4rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white"
            >
              Two AI systems where the model proposes and code decides
            </h1>
            <p className="mt-5 max-w-prose text-lead text-fg/85">
              A WhatsApp agent that takes food orders, and an assistant that
              answers business questions about a car rental company. Both use a
              language model to understand people. Neither lets it change data
              or make up a number.
            </p>

            <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-rule bg-rule md:grid-cols-3">
              {RULES.map((r) => {
                const a = ACTOR_STYLE[r.actor];
                return (
                  <li key={r.title} className="bg-ink-900 p-5">
                    <p className="flex items-center gap-2.5 font-medium text-fg">
                      <span
                        aria-hidden="true"
                        className={cn("h-2 w-2 rounded-full", a.bg)}
                      />
                      {r.title}
                    </p>
                    <p className="mt-2 text-sm text-fg-muted">{r.text}</p>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <a href="#walkthrough" className="link">
                Run the walkthrough
              </a>
              <a href="#design" className="link">
                Read the system design
              </a>
            </div>
          </div>
        </section>

        {/* Interactive run */}
        <section
          id="walkthrough"
          aria-labelledby="walkthrough-title"
          className="scroll-mt-20 bg-ink-900/20 py-14 sm:py-20"
        >
          <div className="container-px">
            <div className="mb-8 flex items-center gap-5">
              <h2 id="walkthrough-title" className="h2 shrink-0">
                Run it step by step
              </h2>
              <div aria-hidden="true" className="h-px flex-1 bg-rule" />
            </div>
            <p className="-mt-4 mb-8 max-w-prose text-fg-muted">
              Left: what the customer or admin sees. Right: what happened behind
              each message, and whether the model, a person, or code was
              responsible.
            </p>
            <WorkflowPlayer />
          </div>
        </section>

        {/* System design */}
        <section
          id="design"
          aria-labelledby="design-title"
          className="scroll-mt-20 py-14 sm:py-20"
        >
          <div className="container-px">
            <div className="mb-4 flex items-center gap-5">
              <h2 id="design-title" className="h2 shrink-0">
                System design
              </h2>
              <div aria-hidden="true" className="h-px flex-1 bg-rule" />
            </div>
            <p className="mb-12 max-w-prose text-fg-muted">
              For engineers: how each guarantee is enforced, and where.
            </p>

            <div className="space-y-16">
              <DesignPart
                id="design-whatsapp"
                index="01"
                title="WhatsApp order agent"
                lead="A message passes through eight stages. Two involve the model; neither can change an order on its own."
              >
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <StageDiagram
                      stages={WHATSAPP_STAGES}
                      label="WhatsApp agent pipeline"
                    />
                  </div>
                  <div className="space-y-6 lg:col-span-5">
                    <div>
                      <h4 className="font-medium text-fg">
                        Why the model can't change data
                      </h4>
                      <p className="mt-2 text-sm text-fg-muted">
                        Agents and tools can only call the service layer (api →
                        services → repositories → db). A tool that would place,
                        change or cancel an order doesn't do it: it stores a
                        pending action and sends the customer buttons. Only the
                        tap, handled by deterministic code, executes it.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-fg">
                        Why the model can't act as someone else
                      </h4>
                      <p className="mt-2 text-sm text-fg-muted">
                        <code className="font-mono text-[13px] text-fg">
                          customer_id
                        </code>{" "}
                        is never a tool argument. The harness injects it from
                        the verified webhook, so a prompt injection can't
                        redirect an action to another customer.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-fg">
                        What reaches the model and the logs
                      </h4>
                      <p className="mt-2 text-sm text-fg-muted">
                        Prompts get an opaque customer ID and display name only.
                        Phone numbers are masked in every log line, and errors
                        are stored as class, status and code, never their text.
                        Prometheus metrics and optional OpenTelemetry tracing
                        cover each run.
                      </p>
                    </div>
                    <Code caption="pending_action (SQLAlchemy model, abridged)">{`action_type:   str          # CHECKOUT, MODIFY_ORDER, CANCEL_ORDER, ...
payload:       JSON
cart_version:  int | None   # cart changed since pricing?
nonce:         str, unique  # single use
status:        "PENDING"
expires_at:    datetime
consumed_at:   datetime | None`}</Code>
                  </div>
                </div>
              </DesignPart>

              <DesignPart
                id="design-analytics"
                index="02"
                title="Car rental analytics assistant"
                lead="Known questions never reach the model's SQL path. New questions do, and their SQL is checked twice: once as a syntax tree in the app, once inside Postgres."
              >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-rule p-5">
                    <p className="font-mono text-label text-verified">
                      path A: code
                    </p>
                    <h4 className="mt-1 font-medium text-fg">Known question</h4>
                    <p className="mt-2 text-sm text-fg-muted">
                      Code matches the question against five tested metric
                      queries: bookings today, pending bookings, revenue, top
                      vehicles, overdue rentals. A revenue question with no
                      period gets fixed options instead of a guessed default.
                      The model only phrases the result.
                    </p>
                  </div>
                  <div className="rounded-lg border border-rule p-5">
                    <p className="font-mono text-label text-signal">
                      path B: model, then code
                    </p>
                    <h4 className="mt-1 font-medium text-fg">New question</h4>
                    <p className="mt-2 text-sm text-fg-muted">
                      Gemini receives the approved schema and drafts one query.
                      The query is parsed with pgsql-ast-parser and checked
                      against the rules below, then run through an admin-only,
                      read-only Postgres function.
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
                  <div className="lg:col-span-6">
                    <h4 className="font-medium text-fg">
                      What the validator rejects
                    </h4>
                    <table className="mt-3 w-full border-collapse text-left text-sm">
                      <thead className="sr-only">
                        <tr>
                          <th scope="col">Check</th>
                          <th scope="col">Rule</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-rule border-y border-rule">
                        {VALIDATOR_RULES.map(([k, v]) => (
                          <tr key={k}>
                            <th
                              scope="row"
                              className="w-36 py-2.5 pr-4 align-top font-mono text-[12.5px] font-normal text-fg-muted"
                            >
                              {k}
                            </th>
                            <td className="py-2.5 text-fg/85">{v}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <h4 className="mt-8 font-medium text-fg">
                      Checking the answer
                    </h4>
                    <p className="mt-2 text-sm text-fg-muted">
                      For count metrics, the model's sentence must contain the
                      exact count the database returned. For a query with no
                      rows, it must say nothing was found. If a check fails, or
                      the model call fails or times out, a fixed template writes
                      the answer. The admin also sees the result table and the
                      exact SQL that ran.
                    </p>
                  </div>
                  <div className="lg:col-span-6">
                    <Code caption="execute_readonly_analytics, the database's own checks">{`IF NOT public.is_role(ARRAY['admin']) THEN
  RAISE EXCEPTION 'Access denied' USING ERRCODE = '42501';
END IF;

SET LOCAL transaction_read_only = on;
SET LOCAL statement_timeout     = '10000ms';

-- reject a second statement or any write keyword
IF query_text ~* ';\\s*\\S+' THEN RAISE ...; END IF;

clamped_rows := LEAST(GREATEST(COALESCE(max_rows, 100), 1), 100);
EXECUTE format('SELECT ... FROM ( %s ) _inner LIMIT %s', ...);`}</Code>
                  </div>
                </div>
              </DesignPart>

              <DesignPart
                id="design-bookings"
                index="03"
                title="Booking integrity and access control"
                lead="Double bookings are prevented by the database, not by a check in the app that two requests could both pass."
              >
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                  <div className="space-y-6 lg:col-span-6">
                    <div>
                      <h4 className="font-medium text-fg">Overlaps</h4>
                      <p className="mt-2 text-sm text-fg-muted">
                        An exclusion constraint makes Postgres reject a second
                        confirmed booking for the same car whose dates overlap,
                        even if two staff confirm at the same moment. Ranges are
                        half-open, so a return and a pickup on the same day
                        don't clash.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-fg">
                        Races between confirm, payment and blocks
                      </h4>
                      <p className="mt-2 text-sm text-fg-muted">
                        Overlapping pending requests are allowed so staff can
                        choose which to confirm, but two of them can't both be
                        paid. A trigger takes a{" "}
                        <code className="font-mono text-[13px] text-fg">
                          FOR NO KEY UPDATE
                        </code>{" "}
                        lock on the car row, so confirms, payments and
                        maintenance blocks for one car run one at a time.
                        Conflicts fail.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-fg">
                        Who can see and change what
                      </h4>
                      <p className="mt-2 text-sm text-fg-muted">
                        Row-level security on bookings, payments and users:
                        customers read their own rows, staff read and update all
                        bookings, and only admins delete or run analytics
                        queries.
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 lg:col-span-6">
                    <Code caption="bookings_no_overlap_confirmed">{`ALTER TABLE public.bookings
  ADD CONSTRAINT bookings_no_overlap_confirmed
  EXCLUDE USING gist (
    car_id WITH =,
    tstzrange(start_date, end_date, '[)') WITH &&
  ) WHERE (status = 'confirmed');`}</Code>
                    <Code caption="RLS policy on bookings">{`CREATE POLICY bookings_select_own_or_staff ON public.bookings
  FOR SELECT USING (
    user_id = auth.uid()
    OR public.is_role(ARRAY['admin', 'staff'])
  );`}</Code>
                  </div>
                </div>
              </DesignPart>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
