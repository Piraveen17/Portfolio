import { PROFILE } from "../lib/data";

export function ContactCard() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex gap-4">
        <img
          src="/profile.jpg"
          alt={`Portrait of ${PROFILE.name}`}
          width={96}
          height={120}
          className="h-[120px] w-[96px] shrink-0 rounded object-cover"
          loading="lazy"
          decoding="async"
        />
        <p className="text-[0.9375rem] leading-6">{PROFILE.about}</p>
      </div>
      <ul className="divide-y divide-line border-y border-line">
        {[
          { k: "email", v: PROFILE.email, href: `mailto:${PROFILE.email}` },
          { k: "github", v: "Piraveen17", href: PROFILE.github },
          { k: "linkedin", v: "sasikaran-piraveen", href: PROFILE.linkedin },
          { k: "instagram", v: "piraveen.13", href: PROFILE.instagram },
          { k: "resume", v: "resume.pdf", href: PROFILE.resumeUrl },
          { k: "location", v: PROFILE.location },
        ].map((r) => (
          <li key={r.k} className="grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-3 py-1">
            <span className="font-mono text-label text-mute">{r.k}</span>
            {r.href ? (
              <a className="link inline-flex min-h-[44px] items-center break-all" href={r.href}>
                {r.v}
              </a>
            ) : (
              <span className="py-2">{r.v}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
