import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "../lib/data";

const SOCIALS = [
  { href: PROFILE.github, label: "GitHub", Icon: Github },
  { href: PROFILE.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${PROFILE.email}`, label: "Email", Icon: Mail },
  { href: PROFILE.instagram, label: "Instagram", Icon: Instagram },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-rule py-8">
      <div className="container-px flex flex-col items-center justify-between gap-5 sm:flex-row">
        <p className="font-mono text-label text-fg-faint">
          © {year} {PROFILE.name}
        </p>
        <ul className="flex items-center gap-2" aria-label="Profiles">
          {SOCIALS.map(({ href, label, Icon }) => (
            <li key={label}>
              <a className="icon-btn" href={href} aria-label={label}>
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
