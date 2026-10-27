import { PROFILE } from "../lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line py-8">
      <div className="wrap flex flex-wrap items-center justify-between gap-4 text-mute">
        <p className="font-mono text-label">
          {year} {PROFILE.name}. Walkthrough data is sample data.
        </p>
        <p className="flex gap-4 font-mono text-label">
          <a className="link inline-flex min-h-[44px] items-center" href={PROFILE.github}>
            github
          </a>
          <a className="link inline-flex min-h-[44px] items-center" href={PROFILE.linkedin}>
            linkedin
          </a>
          <a className="link inline-flex min-h-[44px] items-center" href={`mailto:${PROFILE.email}`}>
            email
          </a>
        </p>
      </div>
    </footer>
  );
}
