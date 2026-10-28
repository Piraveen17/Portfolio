export function SiteBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-ink-950" />

      {/* Drafting-surface grid, strongest at the top of the viewport */}
      <div className="absolute inset-0 dot-grid [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

      {/* A single cool light source from the top-left, kept faint */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_12%_-10%,rgba(56,189,248,0.07),transparent_70%)]" />

      <div className="absolute inset-0 noise opacity-[0.03]" />
    </div>
  );
}
