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
        "icon-btn bg-ink-900/90 backdrop-blur",
        "transition-[opacity,transform] duration-300",
        show ? "opacity-100" : "pointer-events-none invisible translate-y-2 opacity-0",
      ].join(" ")}
      aria-label="Back to top"
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
