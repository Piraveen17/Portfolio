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

export function Navbar() {
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState(ids[0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > 24);
      setActive(getActiveSection(ids, 140));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids]);

  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.replace("#", "");
      if (ids.includes(id)) setActive(id);
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, [ids]);

  return (
    <header className="fixed sticky left-0 top-0 z-40 w-full">
      <div
        className={[
          "transition-all duration-300",
          solid
            ? "border-b border-white/10 bg-bg-950/65 backdrop-blur"
            : "bg-transparent",
        ].join(" ")}
      >
        <div className="container-px flex h-16 items-center justify-between">
          <button
            type="button"
            onClick={() => scrollToId("top")}
            className="font-semibold tracking-wide text-white/90 hover:text-white"
            aria-label="Go to top"
          >
            <span className="text-white/90">{PROFILE.brand}</span>
            <span className="ml-2 text-xs text-blueglow-400/90">●</span>
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToId(s.id)}
                className={[
                  "text-sm transition-colors",
                  active === s.id
                    ? "text-white"
                    : "text-white/70 hover:text-white",
                ].join(" ")}
              >
                <span className="relative">
                  {s.label}
                  {active === s.id ? (
                    <span className="absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-blueglow-500/90 shadow-glow" />
                  ) : null}
                </span>
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={PROFILE.resumeUrl}
              className="inline-flex items-center gap-2 rounded-xl bg-blueglow-500/90 px-3 py-2 text-sm font-medium text-white shadow-glow transition hover:bg-blueglow-500 hover:shadow-glowStrong"
            >
              <Download className="h-4 w-4" />
              Resume
            </a>
          </div>

          <button
            type="button"
            className="md:hidden rounded-xl border border-white/10 bg-white/[0.04] p-2 backdrop-blur"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={[
          "md:hidden transition-all duration-300",
          open
            ? "max-h-[520px] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="border-b border-white/10 bg-bg-950/80 backdrop-blur">
          <div className="container-px py-4">
            <div className="grid gap-2">
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    scrollToId(s.id);
                    setOpen(false);
                  }}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left"
                >
                  <span
                    className={active === s.id ? "text-white" : "text-white/80"}
                  >
                    {s.label}
                  </span>
                  <span className="text-blueglow-400/80">→</span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <a
                href={PROFILE.github}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-2 hover:shadow-glow"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href={PROFILE.linkedin}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-2 hover:shadow-glow"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${PROFILE.email}`}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-2 hover:shadow-glow"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a
                href={PROFILE.instagram}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-2 hover:shadow-glow"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>

              <a
                href={PROFILE.resumeUrl}
                className="ml-auto inline-flex items-center gap-2 rounded-xl bg-blueglow-500/90 px-3 py-2 text-sm font-medium text-white shadow-glow transition hover:bg-blueglow-500 hover:shadow-glowStrong"
              >
                <Download className="h-4 w-4" />
                Resume
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
