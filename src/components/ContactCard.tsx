import { Github, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { PROFILE } from "../lib/data";

export function ContactCard() {
  return (
    <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
      <div className="card card-hover p-6">
        <h3 className="text-lg font-semibold">Let’s connect</h3>
        <p className="mt-2 muted">
          Looking for a <span className="text-white/85 font-medium">Full-stack internship</span> where I can ship features end-to-end and learn from real product teams.
        </p>

        <div className="mt-5 flex flex-col gap-3 text-sm">
          <a
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:shadow-glow"
            href={`mailto:${PROFILE.email}`}
          >
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-blueglow-400" /> {PROFILE.email}
            </span>
            <span className="text-blueglow-400/80">→</span>
          </a>

          <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blueglow-400" /> {PROFILE.location}
            </span>
            <span className="text-white/40">•</span>
          </div>
        </div>
      </div>

      <div className="card card-hover p-6">
        <h3 className="text-lg font-semibold">Find me online</h3>
        <p className="mt-2 muted">GitHub, LinkedIn and socials.</p>

        <div className="mt-5 grid gap-3">
          <a className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:shadow-glow" href={PROFILE.github}>
            <span className="flex items-center gap-2"><Github className="h-4 w-4 text-blueglow-400" /> GitHub</span>
            <span className="text-blueglow-400/80">→</span>
          </a>
          <a className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:shadow-glow" href={PROFILE.linkedin}>
            <span className="flex items-center gap-2"><Linkedin className="h-4 w-4 text-blueglow-400" /> LinkedIn</span>
            <span className="text-blueglow-400/80">→</span>
          </a>
          <a className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 hover:shadow-glow" href={PROFILE.instagram}>
            <span className="flex items-center gap-2"><Instagram className="h-4 w-4 text-blueglow-400" /> Instagram</span>
            <span className="text-blueglow-400/80">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
