import { useRef } from "react";

export function TiltCard({
  children,
  maxTilt = 4,
}: {
  children: React.ReactNode;
  maxTilt?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const px = (x / r.width) * 2 - 1; // -1..1
    const py = (y / r.height) * 2 - 1; // -1..1

    const rx = (-py * maxTilt).toFixed(2);
    const ry = (px * maxTilt).toFixed(2);

    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="transition-transform duration-200 will-change-transform"
    >
      {children}
    </div>
  );
}
