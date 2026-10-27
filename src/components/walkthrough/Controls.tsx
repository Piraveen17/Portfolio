import type { RefObject } from "react";

type Props = {
  index: number;
  total: number;
  canBack: boolean;
  canNext: boolean;
  /** Replaces the Next label while a gate blocks progress. */
  nextLabel?: string;
  playing: boolean;
  onBack: () => void;
  onNext: () => void;
  onReplay: () => void;
  onToggle: () => void;
  nextRef?: RefObject<HTMLButtonElement>;
};

export function Controls({
  index,
  total,
  canBack,
  canNext,
  nextLabel = "Next",
  playing,
  onBack,
  onNext,
  onReplay,
  onToggle,
  nextRef,
}: Props) {
  const atEnd = index >= total - 1;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" className="btn-line" onClick={onBack} disabled={!canBack}>
        Back
      </button>
      <button
        type="button"
        ref={nextRef}
        className="btn-solid disabled:cursor-not-allowed disabled:opacity-45"
        onClick={onNext}
        disabled={!canNext}
      >
        {nextLabel}
      </button>
      <button type="button" className="btn-line" onClick={onReplay}>
        Replay
      </button>
      <button
        type="button"
        className="btn-line"
        onClick={onToggle}
        aria-pressed={playing}
        disabled={atEnd && !playing}
      >
        {playing ? "Pause" : "Auto-play"}
      </button>
      <p className="ml-auto font-mono text-label text-mute" aria-hidden="true">
        step {index + 1} of {total}
      </p>
    </div>
  );
}
