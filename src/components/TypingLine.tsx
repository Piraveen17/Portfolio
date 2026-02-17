import { useEffect, useMemo, useState } from "react";

export function TypingLine({
  text,
  speed = 22,
}: {
  text: string;
  speed?: number;
}) {
  const chars = useMemo(() => text.split(""), [text]);
  const [i, setI] = useState(0);
  const done = i >= chars.length;

  useEffect(() => {
    if (done) return;
    const t = window.setTimeout(() => setI((v) => v + 1), speed);
    return () => window.clearTimeout(t);
  }, [done, speed, i]);

  return (
    <div className="mt-4 flex items-center justify-start gap-2 text-m sm:text-base">
      <span className="inline-flex h-2 w-2 rounded-full bg-blueglow-500 shadow-glow" />
      <span className="muted">
        {chars.slice(0, i).join("")}
        <span className={done ? "opacity-0" : "opacity-100"}>▍</span>
      </span>
    </div>
  );
}
