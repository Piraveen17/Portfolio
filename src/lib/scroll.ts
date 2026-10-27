import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scroll to a hash target after navigation, or to the top for a new page. */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // Wait one frame so the target page has rendered.
      const t = window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
      });
      return () => window.cancelAnimationFrame(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
