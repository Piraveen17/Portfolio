import { ACHIEVEMENTS, CERTIFICATIONS, EDUCATION, HIGHLIGHTS, VOLUNTEERING } from "../lib/data";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-mono text-code font-semibold">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function Row({ left, title, sub }: { left: string; title: string; sub?: string }) {
  return (
    <li className="grid grid-cols-[minmax(0,1fr)] gap-1 border-t border-line py-3 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
      <p className="font-mono text-label text-mute">{left}</p>
      <div>
        <p className="font-semibold leading-6">{title}</p>
        {sub ? <p className="text-[0.9375rem] leading-6 text-mute">{sub}</p> : null}
      </div>
    </li>
  );
}

export function CredentialsBlock() {
  return (
    <div className="space-y-10">
      <Group title="Education">
        <ul>
          {EDUCATION.map((e) => (
            <Row key={e.school} left={e.period} title={e.school} sub={e.program} />
          ))}
        </ul>
        <ul className="mt-2 flex flex-wrap gap-2" aria-label="Academic highlights">
          {HIGHLIGHTS.map((h) => (
            <li key={h.label} className="tag">
              {h.label}: {h.value}
            </li>
          ))}
        </ul>
      </Group>

      <Group title="Achievements">
        <ul>
          {ACHIEVEMENTS.map((a) => (
            <Row key={a.title} left={a.desc.match(/\((\d{4})\)/)?.[1] ?? ""} title={a.title} sub={a.desc} />
          ))}
        </ul>
      </Group>

      <Group title="Certifications">
        <ul>
          {CERTIFICATIONS.map((c) => (
            <Row key={`${c.title}-${c.issued}`} left={c.issued} title={c.title} sub={c.issuer} />
          ))}
        </ul>
      </Group>

      <Group title="Leadership and volunteering">
        <ul>
          {VOLUNTEERING.map((v) => (
            <Row key={`${v.role}-${v.period}`} left={v.period} title={`${v.role}, ${v.org}`} sub={v.bullets.join(" ")} />
          ))}
        </ul>
      </Group>
    </div>
  );
}
