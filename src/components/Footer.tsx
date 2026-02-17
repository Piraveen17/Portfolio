import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { PROFILE } from "../lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="container-px">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="text-sm font-medium text-white/90">Let’s build something meaningful.</p>
            <p className="mt-1 text-xs text-white/55">© {year} {PROFILE.name}</p>
          </div>

          <div className="flex items-center gap-2">
            <a className="rounded-xl border border-white/10 bg-white/[0.03] p-2 hover:shadow-glow" href={PROFILE.github} aria-label="GitHub">
              <Github className="h-5 w-5" />
            </a>
            <a className="rounded-xl border border-white/10 bg-white/[0.03] p-2 hover:shadow-glow" href={PROFILE.linkedin} aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a className="rounded-xl border border-white/10 bg-white/[0.03] p-2 hover:shadow-glow" href={`mailto:${PROFILE.email}`} aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
            <a className="rounded-xl border border-white/10 bg-white/[0.03] p-2 hover:shadow-glow" href={PROFILE.instagram} aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
