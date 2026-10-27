/** Semantic state of a trace row. Color + a text label always appear together. */
export type TraceKind =
  | "info"
  | "proposed"
  | "gate"
  | "committed"
  | "sourced"
  | "rejected";

export type ChatButton = {
  label: string;
  /** confirm and cancel are live at a gate step; choice is a static quick reply. */
  role: "confirm" | "cancel" | "choice";
};

export type ChatMessage = {
  from: "customer" | "agent" | "admin";
  text: string;
  buttons?: ChatButton[];
  /** Small table rendered inside the bubble (query results). */
  table?: { cols: string[]; rows: string[][] };
  /** Footnote inside the bubble, e.g. "sample data". */
  note?: string;
};

export type CodeLang = "json" | "sql" | "text";

export type CodeSample = {
  lang: CodeLang;
  text: string;
  /** 1-based line numbers to mark, with the tone to mark them in. */
  mark?: { lines: number[]; tone: "proposed" | "rejected" | "sourced" | "committed" };
};

export type Check = { label: string; result: "pass" | "fail" | "skipped"; note?: string };

export type Step = {
  id: string;
  kind: TraceKind;
  /** Text shown in the state chip, e.g. "PROPOSED". */
  label: string;
  title: string;
  body?: string;
  code?: CodeSample;
  checks?: Check[];
  /** Annotation shown under a sourced value. */
  sourceNote?: string;
  chat?: ChatMessage[];
  /** One short sentence on why this step exists in the architecture. */
  why: string;
  /** At a gate, the visitor must press Confirm or Cancel in the chat. */
  gate?: boolean;
};

export type Scenario = {
  id: string;
  label: string;
  blurb: string;
  steps: Step[];
  /** Shown instead of the remaining steps when the visitor cancels at the gate. */
  declined?: Step;
};

export type GlanceItem = { title: string; body: string };

export type Context = { problem: string; role: string; decision: string };
