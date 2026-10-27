import { Link } from "react-router-dom";
import { PROFILE } from "../lib/data";

const LINKS = [
  { to: "/#work", label: "work" },
  { to: "/#experience", label: "experience" },
  { to: "/#skills", label: "skills" },
  { to: "/#contact", label: "contact" },
];

export function Navbar() {
  return (
    <header className="sm:sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <div className="wrap flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2">
        <Link to="/" className="inline-flex min-h-[44px] items-center font-mono text-code font-semibold" aria-label={`${PROFILE.name}, home`}>
          {PROFILE.brand}
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-x-1">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="inline-flex min-h-[44px] items-center px-2 font-mono text-code text-mute hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
          <a href={PROFILE.resumeUrl} className="inline-flex min-h-[44px] items-center px-2 font-mono text-code font-semibold underline underline-offset-4 sm:btn-line sm:ml-2 sm:min-h-[40px] sm:py-1 sm:no-underline" download>
            resume.pdf
          </a>
        </nav>
      </div>
    </header>
  );
}
