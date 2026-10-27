import { useCallback, useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

type Options = {
  /** Auto-play interval. Manual steps are never delayed. */
  intervalMs?: number;
  /** Auto-play halts when this returns true for the current index (e.g. a gate). */
  holdAt?: (index: number) => boolean;
};

/** index is the last revealed step (0-based). */
export function useStepper(total: number, { intervalMs = 1500, holdAt }: Options = {}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const holdRef = useRef(holdAt);
  holdRef.current = holdAt;

  const next = useCallback(
    () => setIndex((i) => Math.min(i + 1, total - 1)),
    [total]
  );
  const back = useCallback(() => {
    setPlaying(false);
    setIndex((i) => Math.max(i - 1, 0));
  }, []);
  const replay = useCallback(() => {
    setIndex(0);
    setPlaying(true);
  }, []);
  const reset = useCallback(() => {
    setIndex(0);
    setPlaying(false);
  }, []);
  const toggle = useCallback(() => {
    setPlaying((p) => !p);
  }, []);
  const pause = useCallback(() => setPlaying(false), []);

  useEffect(() => {
    if (!playing) return;
    if (index >= total - 1 || holdRef.current?.(index)) {
      setPlaying(false);
      return;
    }
    const t = window.setTimeout(next, intervalMs);
    return () => window.clearTimeout(t);
  }, [playing, index, total, intervalMs, next]);

  return { index, playing, next, back, replay, reset, toggle, pause, setIndex };
}
