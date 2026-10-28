import { CERTIFICATIONS, EDUCATION, HIGHLIGHTS, VOLUNTEERING } from "../lib/data";
import { OrgMark } from "./OrgMark";

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-semibold text-white">{children}</h3>;
}

export function CredentialsBlock() {
  return (
    <div className="mt-16 grid gap-x-12 gap-y-12 border-t border-rule pt-12 lg:grid-cols-2">
      <div>
        <SubTitle>Education</SubTitle>
        <ul className="mt-4 space-y-5">
          {EDUCATION.map((e) => (
            <li key={e.school} className="flex gap-4">
              <OrgMark org={e.school} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="font-medium text-fg">{e.school}</p>
                  <span className="font-mono text-label text-fg-faint">{e.period}</span>
                </div>
                <p className="mt-0.5 text-sm text-fg-muted">{e.program}</p>
              </div>
            </li>
          ))}
        </ul>

        <h4 className="mt-8 text-sm font-medium text-fg">Academic highlights</h4>
        <dl className="mt-3 divide-y divide-rule border-y border-rule">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className="flex flex-wrap justify-between gap-x-4 py-2.5 text-sm">
              <dt className="text-fg-muted">{item.label}</dt>
              <dd className="font-mono text-[13px] text-fg">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div>
        <SubTitle>Certifications</SubTitle>
        <ul className="mt-4 divide-y divide-rule border-y border-rule">
          {CERTIFICATIONS.map((c) => (
            <li key={`${c.title}-${c.issued}`} className="flex items-baseline justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="text-sm text-fg">{c.title}</p>
                <p className="mt-0.5 text-sm text-fg-muted">{c.issuer}</p>
              </div>
              <span className="shrink-0 font-mono text-label text-fg-faint">{c.issued}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="lg:col-span-2">
        <SubTitle>Leadership and volunteering</SubTitle>
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {VOLUNTEERING.map((v) => (
            <li key={`${v.role}-${v.period}`} className="tile flex gap-4 p-4">
              <OrgMark org={v.org} />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <p className="font-medium text-fg">{v.role}</p>
                  <span className="font-mono text-label text-fg-faint">{v.period}</span>
                </div>
                <p className="text-sm text-fg-muted">{v.org}</p>
                {v.bullets.map((b) => (
                  <p key={b} className="mt-2 text-sm text-fg/85">
                    {b}
                  </p>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
