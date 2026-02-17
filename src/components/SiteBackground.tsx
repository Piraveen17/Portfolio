export function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Base */}
      <div className="absolute inset-0 bg-bg-950" />

      {/* Depth lighting (subtle, controlled) */}
      <div className="absolute inset-0 depth-vignette" />

      {/* Animated neon grid */}
      <div className="absolute inset-0 neon-grid-slow" />

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-950/70" />
    </div>
  );
}
