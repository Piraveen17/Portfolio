export function WhyCaption({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded border border-line bg-surface px-4 py-3" aria-live="polite" aria-atomic="true">
      <p className="font-mono text-label font-semibold text-mute">why this step exists</p>
      <p className="mt-1 max-w-[72ch] text-body">{children}</p>
    </div>
  );
}
