import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const v = h > 0 ? (window.scrollY / h) * 100 : 0;
      setP(Math.max(0, Math.min(100, v)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-50 h-[2px] w-full bg-transparent">
      <div
        className="h-full bg-blueglow-500/90 shadow-glow"
        style={{ width: `${p}%` }}
      />
    </div>
  );
}
