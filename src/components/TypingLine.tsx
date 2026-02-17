import { useEffect, useMemo, useState } from "react";

export function TypingLine({
  text,
  speed = 22,
  align = "start",
}: {
  text: string;
  speed?: number;
  align?: "start" | "center";
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
    <div
      className={[
        "mt-4 flex items-center gap-2 text-sm sm:text-base",
        align === "center" ? "justify-center" : "justify-start",
      ].join(" ")}
    >
      <span className="inline-flex h-2 w-2 rounded-full bg-blueglow-500 shadow-glow" />
      <span className="muted">
        {chars.slice(0, i).join("")}
        <span className={done ? "opacity-0" : "opacity-100"}>▍</span>
      </span>
    </div>
  );
}
