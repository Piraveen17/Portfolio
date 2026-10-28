import {
  Download,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { PROFILE } from "../lib/data";
import { getActiveSection, scrollToId } from "../lib/scroll";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const SOCIALS = [
  { href: PROFILE.github, label: "GitHub", Icon: Github },
  { href: PROFILE.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${PROFILE.email}`, label: "Email", Icon: Mail },
  { href: PROFILE.instagram, label: "Instagram", Icon: Instagram },
];

export function Navbar() {
  const isHome = window.location.pathname.replace(/\/+$/, "") === "";
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState(isHome ? ids[0] : "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 24);
      if (isHome) setActive(getActiveSection(ids, 140));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, isHome]);

  // Arriving from another page with /#section: scroll once the section exists.
  useEffect(() => {
    if (!isHome) return;
    const id = window.location.hash.replace("#", "");
    if (ids.includes(id)) {
      requestAnimationFrame(() =>
        document.getElementById(id)?.scrollIntoView({ block: "start" })
      );
    }
  }, [ids, isHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    if (!isHome) return; // let the browser navigate to /#id
    e.preventDefault();
    scrollToId(id);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full">
      <div
        className={[
          "border-b transition-colors duration-300",
          solid || open
            ? "border-rule bg-ink-950/85 backdrop-blur-md"
            : "border-transparent bg-transparent",
        ].join(" ")}
      >
        <div className="container-px flex h-16 items-center justify-between">
          <a
            href={isHome ? "#top" : "/"}
            onClick={go("top")}
            className="font-mono text-sm font-medium text-fg hover:text-white"
            aria-label={isHome ? "Back to top" : "Home"}
          >
            {PROFILE.brand}
            <span className="text-signal">_</span>
          </a>

          <nav
            aria-label="Sections"
            className="hidden items-center gap-6 md:flex"
          >
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={isHome ? `#${s.id}` : `/#${s.id}`}
                onClick={go(s.id)}
                aria-current={active === s.id ? "location" : undefined}
                className={[
                  "relative py-1 text-sm transition-colors",
                  active === s.id ? "text-fg" : "text-fg-muted hover:text-fg",
                ].join(" ")}
              >
                {s.label}
                <span
                  aria-hidden="true"
                  className={[
                    "absolute -bottom-[3px] left-0 h-[2px] w-full origin-left bg-signal transition-transform duration-300",
                    active === s.id ? "scale-x-100" : "scale-x-0",
                  ].join(" ")}
                />
              </a>
            ))}
          </nav>

          <a
            href={PROFILE.resumeUrl}
            className="btn-secondary hidden min-h-[36px] px-3 md:inline-flex"
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Resume
          </a>

          <button
            type="button"
            className="icon-btn md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute left-0 top-16 w-full border-b border-rule bg-ink-950/95 backdrop-blur-md md:hidden"
      >
        <nav aria-label="Sections" className="container-px py-3">
          <ul className="divide-y divide-rule">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={isHome ? `#${s.id}` : `/#${s.id}`}
                  onClick={go(s.id)}
                  aria-current={active === s.id ? "location" : undefined}
                  className={[
                    "flex items-center gap-3 py-3 text-base",
                    active === s.id ? "text-fg" : "text-fg-muted",
                  ].join(" ")}
                >
                  <span
                    aria-hidden="true"
                    className={[
                      "h-1.5 w-1.5 rounded-full",
                      active === s.id ? "bg-signal" : "bg-transparent",
                    ].join(" ")}
                  />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex items-center gap-2 border-t border-rule pt-4 pb-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                className="icon-btn"
                aria-label={label}
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            ))}
            <a href={PROFILE.resumeUrl} className="btn-primary ml-auto">
              <Download className="h-4 w-4" aria-hidden="true" />
              Résumé
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
