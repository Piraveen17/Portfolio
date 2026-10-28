import { useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function TiltCard({
  children,
  maxTilt = 3,
}: {
  children: React.ReactNode;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduced || e.pointerType !== "mouse") return;

    const r = el.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * 2 - 1; // -1..1
    const py = ((e.clientY - r.top) / r.height) * 2 - 1; // -1..1

    const rx = (-py * maxTilt).toFixed(2);
    const ry = (px * maxTilt).toFixed(2);

    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="transition-transform duration-300 ease-out will-change-transform"
    >
      {children}
    </div>
  );
}
