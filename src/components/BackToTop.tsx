import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { scrollToId } from "../lib/scroll";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => scrollToId("top")}
      className={[
        "fixed bottom-6 right-6 z-40",
        "rounded-xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-glow",
        show ? "opacity-100" : "pointer-events-none opacity-0 translate-y-2",
      ].join(" ")}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5 text-white/90" />
    </button>
  );
}
