import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { CERTIFICATIONS, EDUCATION, LANGUAGES, VOLUNTEERING } from "../lib/data";
import { OrgMark } from "./OrgMark";

function Card({ children }: { children: React.ReactNode }) {
  return <div className="card card-hover p-6">{children}</div>;
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="display-text text-base font-semibold tracking-tight">{children}</h3>;
}

export function CredentialsBlock() {
  return (
    <div className="mx-auto mt-10 max-w-5xl space-y-6">
      <div className="h-px w-full bg-white/10" />

      <div className="grid gap-5 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card>
            <SubTitle>Education</SubTitle>
            <div className="mt-4 space-y-3">
              {EDUCATION.map((e) => (
                <div key={e.school} className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                  <OrgMark org={e.school} />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium text-white/90">{e.school}</p>
                      <span className="text-xs text-white/55">{e.period}</span>
                    </div>
                    <p className="mt-1 text-sm text-white/75">{e.program}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <SubTitle>Languages</SubTitle>
              <div className="mt-3 flex flex-wrap gap-2">
                {LANGUAGES.map((l) => (
                  <span
                    key={l.name}
                    className="rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/80"
                  >
                    <span className="text-white/90">{l.name}</span> • {l.level}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.06, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card>
            <SubTitle>Certifications</SubTitle>
            <div className="mt-4 grid gap-3">
              {CERTIFICATIONS.map((c) => (
                <div
                  key={`${c.title}-${c.issued}`}
                  className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3"
                >
                  <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                    <BadgeCheck className="h-5 w-5 text-blueglow-400" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <p className="text-sm font-medium text-white/90">{c.title}</p>
                      <span className="text-xs text-white/55">{c.issued}</span>
                    </div>
                    <p className="mt-1 text-sm text-white/70">{c.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <Card>
          <SubTitle>Leadership & Volunteering</SubTitle>
          <div className="mt-4 grid gap-3">
            {VOLUNTEERING.map((v) => (
              <div key={`${v.role}-${v.period}`} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-4">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <OrgMark org={v.org} />
                    <div>
                      <p className="text-sm font-semibold text-white/90">{v.role}</p>
                      <p className="text-sm text-white/70">{v.org}</p>
                    </div>
                  </div>
                  <span className="text-xs text-white/55">{v.period}</span>
                </div>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/75">
                  {v.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
