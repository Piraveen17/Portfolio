import { useEffect, useRef } from "react";
import type { ChatMessage } from "../../lib/walkthroughs/types";

export type ChatItem = ChatMessage & {
  key: string;
  /** This message carries the live gate buttons. */
  liveGate?: boolean;
  /** Which button was pressed after the gate resolved. */
  chosen?: "confirm" | "cancel";
};

type Props = {
  title: string;
  subtitle: string;
  items: ChatItem[];
  onGate?: (choice: "confirm" | "cancel") => void;
  emptyHint?: string;
};

export function ChatThread({ title, subtitle, items, onGate }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [items.length]);

  return (
    <section
      aria-label={title}
      className="flex h-[440px] flex-col overflow-hidden rounded border border-line bg-[#E1E7E0] sm:h-[520px]"
    >
      <header className="flex items-baseline justify-between gap-3 border-b border-line bg-surface px-4 py-3">
        <h3 className="font-mono text-code font-semibold">{title}</h3>
        <p className="font-mono text-label text-mute">{subtitle}</p>
      </header>
      <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto p-4" tabIndex={0} aria-label={`${title} messages`}>
        {items.map((m) => {
          const mine = m.from !== "agent";
          return (
            <div key={m.key} className={`settle flex ${mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[88%] rounded px-3 py-2 text-[0.9375rem] leading-6 ${
                  mine
                    ? "bg-ink text-paper"
                    : "border border-line bg-white text-ink"
                }`}
              >
                <p className={`mb-0.5 font-mono text-[0.75rem] ${mine ? "text-[#B9C7BF]" : "text-mute"}`}>
                  {m.from === "customer" ? "customer" : m.from === "admin" ? "admin" : "agent"}
                </p>
                <p className="whitespace-pre-line">{m.text}</p>
                {m.table ? (
                  <div className="mt-2 overflow-x-auto rounded-sm border border-line">
                    <table className="w-full min-w-[260px] text-left font-mono text-[0.75rem]">
                      <thead className="bg-surface text-mute">
                        <tr>
                          {m.table.cols.map((c) => (
                            <th key={c} scope="col" className="px-2 py-1 font-medium">
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {m.table.rows.map((r, i) => (
                          <tr key={i} className="border-t border-line">
                            {r.map((c, j) => (
                              <td key={j} className="px-2 py-1">
                                {c}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : null}
                {m.note ? <p className="mt-1 font-mono text-[0.75rem] text-mute">{m.note}</p> : null}
                {m.buttons ? (
                  <div className="mt-2 grid gap-1.5 border-t border-line pt-2">
                    {m.buttons.map((b) => {
                      const live = m.liveGate && (b.role === "confirm" || b.role === "cancel");
                      const picked = m.chosen && b.role === m.chosen;
                      if (live) {
                        return (
                          <button
                            key={b.label}
                            type="button"
                            onClick={() => onGate?.(b.role as "confirm" | "cancel")}
                            className={`min-h-[44px] rounded border px-3 py-2 font-mono text-code font-semibold ${
                              b.role === "confirm"
                                ? "border-ink bg-ink text-paper hover:bg-[#2b3a34]"
                                : "border-ink/55 bg-white text-ink hover:border-ink"
                            }`}
                          >
                            {b.label}
                          </button>
                        );
                      }
                      return (
                        <span
                          key={b.label}
                          className={`block rounded border px-3 py-2 text-center font-mono text-label ${
                            picked
                              ? "border-ink bg-ink font-semibold text-paper"
                              : "border-line bg-surface text-mute"
                          }`}
                        >
                          {picked ? `${b.label} (tapped)` : b.label}
                        </span>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
