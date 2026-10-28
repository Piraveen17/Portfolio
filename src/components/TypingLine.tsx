import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function TypingLine({
  text,
  speed = 22,
  align = "start",
}: {
  text: string;
  speed?: number;
  align?: "start" | "center";
}) {
  const reduced = useReducedMotion();
  const chars = useMemo(() => text.split(""), [text]);
  const [i, setI] = useState(0);
  const shown = reduced ? chars.length : i;
  const done = shown >= chars.length;

  useEffect(() => {
    if (done || reduced) return;
    const t = window.setTimeout(() => setI((v) => v + 1), speed);
    return () => window.clearTimeout(t);
  }, [done, reduced, speed, i]);

  return (
    <p
      className={[
        "mt-5 flex items-baseline gap-2.5 font-mono text-sm text-fg-muted",
        align === "center" ? "justify-center" : "justify-start",
      ].join(" ")}
    >
      <span aria-hidden="true" className="relative top-[-1px] inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
      {/* Screen readers get the full sentence at once */}
      <span className="sr-only">Currently: {text}</span>
      <span aria-hidden="true">
        {chars.slice(0, shown).join("")}
        <span className={done ? "opacity-0" : "text-signal"}>▍</span>
      </span>
    </p>
  );
}
