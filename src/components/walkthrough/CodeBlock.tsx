import type { CodeSample } from "../../lib/walkthroughs/types";

const SQL_KEYWORDS =
  /^(SELECT|FROM|WHERE|AND|OR|NOT|EXISTS|JOIN|LEFT|INNER|ON|AS|IN|IS|NULL|LIMIT|ORDER|BY|GROUP|DROP|TABLE|DELETE|INSERT|UPDATE|SET|INTO|VALUES|EXCLUDE|USING|BEGIN|COMMIT|ROLLBACK|FOR|NO|KEY|DATE|BETWEEN|ILIKE|LIKE|SUM|COUNT|lower)$/i;

type Tok = { text: string; cls: string };

function tokenize(code: CodeSample): Tok[][] {
  const lines = code.text.split("\n");
  return lines.map((line) => {
    const out: Tok[] = [];
    const re =
      code.lang === "sql"
        ? /(--.*$)|('(?:[^']|'')*')|(\b\d+(?:\.\d+)?\b)|([A-Za-z_][A-Za-z0-9_]*)|(\s+)|(.)/g
        : /("(?:[^"\\]|\\.)*")(\s*:)?|(\b-?\d+(?:\.\d+)?\b)|(\btrue\b|\bfalse\b|\bnull\b)|(\s+)|(.)/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(line))) {
      if (code.lang === "sql") {
        if (m[1]) out.push({ text: m[1], cls: "opacity-70 italic" });
        else if (m[2]) out.push({ text: m[2], cls: "text-[#B5D3C6]" });
        else if (m[3]) out.push({ text: m[3], cls: "text-[#D9E4DD]" });
        else if (m[4])
          out.push({
            text: m[4],
            cls: SQL_KEYWORDS.test(m[4]) ? "font-semibold text-white" : "",
          });
        else out.push({ text: m[0], cls: "" });
      } else {
        if (m[1] && m[2])
          out.push({ text: m[1], cls: "font-semibold text-white" }, { text: m[2], cls: "" });
        else if (m[1]) out.push({ text: m[1], cls: "text-[#B5D3C6]" });
        else if (m[3] || m[4]) out.push({ text: m[0], cls: "text-[#D9E4DD]" });
        else out.push({ text: m[0], cls: "" });
      }
    }
    return out;
  });
}

const MARK: Record<string, string> = {
  proposed: "bg-proposed-console/15 border-l-2 border-proposed-console",
  rejected: "bg-rejected-console/15 border-l-2 border-rejected-console",
  sourced: "bg-sourced-console/15 border-l-2 border-sourced-console",
  committed: "bg-committed-console/15 border-l-2 border-committed-console",
};

export function CodeBlock({ code, label }: { code: CodeSample; label?: string }) {
  const lines = tokenize(code);
  const marked = new Set(code.mark?.lines ?? []);
  return (
    <figure className="mt-3">
      {label ? (
        <figcaption className="mb-1 font-mono text-label text-console-mute">{label}</figcaption>
      ) : null}
      <pre
        tabIndex={0}
        aria-label={label ?? `${code.lang} sample`}
        className="overflow-x-auto rounded-sm border border-console-line bg-[#101914] py-2 font-mono text-[0.8125rem] leading-[1.35rem] text-console-text"
      >
        <code>
          {lines.map((toks, i) => (
            <span
              key={i}
              className={`block whitespace-pre px-3 ${
                marked.has(i + 1) ? MARK[code.mark!.tone] : "border-l-2 border-transparent"
              }`}
            >
              {toks.length ? (
                toks.map((t, j) => (
                  <span key={j} className={t.cls}>
                    {t.text}
                  </span>
                ))
              ) : (
                " "
              )}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}
