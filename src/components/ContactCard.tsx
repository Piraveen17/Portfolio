import { useEffect, useState } from "react";
import { Check, Copy, Github, Instagram, Linkedin, MapPin } from "lucide-react";
import { PROFILE } from "../lib/data";

const PROFILES = [
  { href: PROFILE.github, label: "GitHub", handle: "Piraveen", Icon: Github },
  {
    href: PROFILE.linkedin,
    label: "LinkedIn",
    handle: "sasikaran-piraveen",
    Icon: Linkedin,
  },
  {
    href: PROFILE.instagram,
    label: "Instagram",
    handle: "piraveen",
    Icon: Instagram,
  },
];

export function ContactCard() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
    } catch {
      // Clipboard blocked: select the address so the visitor can copy it themselves.
      const el = document.getElementById("contact-email");
      const sel = window.getSelection();
      if (el && sel) {
        const range = document.createRange();
        range.selectNodeContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };

  return (
    <div className="grid gap-10 md:grid-cols-12">
      <div className="md:col-span-7">
        <p className="max-w-prose text-lead text-fg/90">
          I'm looking for software engineering roles where I can build AI
          features end to end, from the agent logic to the database underneath.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <a
            id="contact-email"
            href={`mailto:${PROFILE.email}`}
            className="font-mono text-lg text-white underline decoration-signal/50 underline-offset-[6px] transition-colors hover:decoration-signal sm:text-xl"
          >
            {PROFILE.email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="btn-secondary min-h-[36px] px-3"
          >
            {copied ? (
              <Check className="h-4 w-4 text-verified" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4 text-fg-muted" aria-hidden="true" />
            )}
            {copied ? "Copied" : "Copy"}
          </button>
          <span className="sr-only" aria-live="polite">
            {copied ? "Email address copied to clipboard" : ""}
          </span>
        </div>

        <p className="mt-5 flex items-center gap-2 text-sm text-fg-muted">
          <MapPin className="h-4 w-4 text-fg-faint" aria-hidden="true" />
          {PROFILE.location}
        </p>
      </div>

      <ul
        className="divide-y divide-rule border-y border-rule md:col-span-5"
        aria-label="Profiles"
      >
        {PROFILES.map(({ href, label, handle, Icon }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 py-3.5 transition-colors"
            >
              <span className="flex items-center gap-3 text-fg">
                <Icon
                  className="h-4 w-4 text-fg-faint transition-colors group-hover:text-signal"
                  aria-hidden="true"
                />
                {label}
                <span className="sr-only">(opens in a new tab)</span>
              </span>
              <span className="font-mono text-label text-fg-faint transition-colors group-hover:text-fg-muted">
                {handle}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
