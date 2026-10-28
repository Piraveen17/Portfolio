import type { Actor } from "../components/PipelineStrip";

export type ChatMessage = {
  who: string;
  /** "user" bubbles sit right, "bot" bubbles sit left. */
  side: "user" | "bot";
  text: string;
  chips?: string[];
  table?: { headers: string[]; rows: string[][] };
  sql?: string;
};

export type TraceEntry = {
  actor: Actor;
  title: string;
  body: string;
  code?: string;
  status: string;
};

export type Step = { chat?: ChatMessage; trace?: TraceEntry };

export type ScenarioId = "whatsapp" | "car-rental";

export type Scenario = {
  id: ScenarioId;
  tab: string;
  summary: string;
  channelTitle: string;
  channelNote: string;
  doneNote: string;
  steps: Step[];
};

export const SCENARIOS: Record<ScenarioId, Scenario> = {
  whatsapp: {
    id: "whatsapp",
    tab: "WhatsApp order agent",
    summary:
      "A customer orders two kottu. Code finds the order is ambiguous and offers buttons, prices the cart, and places the order only after the customer taps Confirm.",
    channelTitle: "WhatsApp chat",
    channelNote: "What the customer sees",
    doneNote:
      "Done. The model proposed two tool calls; code checked them, priced the cart and wrote the order; the customer approved it.",
    steps: [
      {
        chat: { who: "Customer", side: "user", text: "I'd like two kottu." },
        trace: {
          actor: "model",
          title: "Propose a tool call",
          body: "The order agent calls add_item with the quantity the customer said. It is not allowed to invent one; if no quantity was stated, code rejects the call.",
          code: `{
  "tool": "add_item",
  "item_query": "kottu",
  "quantity": 2
}`,
          status: "proposed",
        },
      },
      {
        trace: {
          actor: "code",
          title: "Search the menu",
          body: "Code searches the menu. “Kottu” matches four items, so nothing is added and the tool reports that the customer must choose.",
          code: `{ "status": "NEEDS_CLARIFICATION", "note": "Nothing was added." }`,
          status: "nothing added",
        },
      },
      {
        chat: {
          who: "Assistant",
          side: "bot",
          text: "Which kottu did you mean?",
          chips: ["Egg kottu", "Chicken kottu", "Mutton kottu", "Beef kottu"],
        },
        trace: {
          actor: "person",
          title: "Customer picks from buttons",
          body: "Code builds the buttons from the matching menu rows, so the customer's tap maps to an exact menu item.",
          status: "waiting on customer",
        },
      },
      {
        chat: { who: "Customer", side: "user", text: "Egg kottu" },
        trace: {
          actor: "code",
          title: "Add to the cart",
          body: "The tap carries the menu item ID and code adds 2 × egg kottu to the cart. A cart is only a draft, so no confirmation is needed yet.",
          status: "added to cart",
        },
      },
      {
        chat: { who: "Customer", side: "user", text: "That's all, place the order." },
        trace: {
          actor: "model",
          title: "Propose checkout",
          body: "The agent calls request_checkout. This proposes placing the order; it does not place it.",
          code: `{ "tool": "request_checkout" }`,
          status: "proposed",
        },
      },
      {
        trace: {
          actor: "code",
          title: "Price the cart and hold the action",
          body: "Code re-checks availability and opening hours, totals the cart from menu prices, and stores a pending action. The action has a one-time nonce, an expiry, and the cart version it was priced against.",
          code: `pending_action(
  action_type  = CHECKOUT,
  cart_version = <version priced>,
  nonce        = <single use>,
  expires_at   = <deadline>,
)`,
          status: "pending",
        },
      },
      {
        chat: {
          who: "Assistant",
          side: "bot",
          text: "2 × Egg kottu\nTotal {total from database}\nPlace this order?",
          chips: ["Confirm", "Edit", "Cancel"],
        },
        trace: {
          actor: "person",
          title: "Wait for Confirm",
          body: "Only the customer's tap can place the order. The stored cart version lets code detect a cart that changed after it was priced.",
          status: "waiting on customer",
        },
      },
      {
        chat: { who: "Customer", side: "user", text: "Confirm" },
        trace: {
          actor: "code",
          title: "Place the order",
          body: "Code consumes the pending action (the nonce works once), creates the order in PostgreSQL, and takes the order number from the new row.",
          status: "executed",
        },
      },
      {
        chat: {
          who: "Assistant",
          side: "bot",
          text: "Order {number from database} is placed.\n2 × Egg kottu\nTotal {total from database}",
        },
        trace: {
          actor: "code",
          title: "Send through the outbox",
          body: "The reply is rendered from the order row and queued in an outbox. A worker sends it and records delivery receipts. Bracketed values stand in for real data.",
          status: "sent",
        },
      },
    ],
  },

  "car-rental": {
    id: "car-rental",
    tab: "Car rental analytics",
    summary:
      "An admin asks two business questions. The first is answered by a pre-built query; the second needs generated SQL, which is parsed and checked before it runs read-only.",
    channelTitle: "Analytics assistant",
    channelNote: "What the admin sees",
    doneNote:
      "Done. Code routed both questions, the model drafted one query and two sentences, and Postgres enforced read-only access.",
    steps: [
      {
        chat: { who: "Admin", side: "user", text: "What is our revenue?" },
        trace: {
          actor: "code",
          title: "Match against pre-built metrics",
          body: "Code, not the model, normalizes the question and checks it against five tested metric queries. This one names revenue but no time period, so the system asks instead of choosing a default.",
          status: "needs detail",
        },
      },
      {
        chat: {
          who: "Assistant",
          side: "bot",
          text: "Which reporting period would you like revenue for?",
          chips: ["This month", "Last month", "Compare this month with last month"],
        },
        trace: {
          actor: "person",
          title: "Wait for the admin",
          body: "The options are fixed in code. Nothing runs until the admin picks one.",
          status: "waiting on admin",
        },
      },
      {
        chat: { who: "Admin", side: "user", text: "Compare this month with last month" },
        trace: {
          actor: "code",
          title: "Run the pre-built revenue query",
          body: "A hand-written query computes both months in the business's time zone. No generated SQL is involved.",
          code: `getRevenueSummary(supabase, {
  period: "comparison",
  timezone: "Asia/Colombo",
})`,
          status: "deterministic",
        },
      },
      {
        chat: {
          who: "Assistant",
          side: "bot",
          text: "Revenue this month is $18,450 from 42 paid bookings, up $3,200 (21%) on last month's $15,250.",
        },
        trace: {
          actor: "model",
          title: "Phrase the figures",
          body: "The model only turns figures it was given into a sentence. If the call fails or times out, a fixed template writes the answer instead. Figures here are illustrative.",
          status: "sent",
        },
      },
      {
        chat: { who: "Admin", side: "user", text: "Which vehicles generated the most revenue this year?" },
        trace: {
          actor: "code",
          title: "No metric matches: hand to the planner",
          body: "Only now is the model involved. It is given the approved schema: seven tables, with credential columns removed.",
          code: `{
  "allowed_tables": ["bookings", "cars", "payments", "maintenance",
                     "reviews", "car_unavailable", "users"],
  "forbidden_columns": ["password", "password_hash", "token", "secret", ...]
}`,
          status: "schema bound",
        },
      },
      {
        trace: {
          actor: "model",
          title: "Model proposes SQL",
          body: "Gemini returns one query and a short explanation. It has not run.",
          code: `SELECT c.make, c.model,
       SUM(b.total_amount) AS revenue,
       COUNT(b.id)         AS bookings
FROM cars c
JOIN bookings b ON b.car_id = c.car_id
WHERE b.payment_status = 'paid'
GROUP BY c.car_id, c.make, c.model
ORDER BY revenue DESC
LIMIT 3;`,
          status: "proposed",
        },
      },
      {
        trace: {
          actor: "code",
          title: "Parse and check the SQL",
          body: "pgsql-ast-parser turns the text into a syntax tree. The validator rejects more than one statement, anything but SELECT, data-modifying CTEs, SELECT INTO, unapproved tables, forbidden columns and unapproved functions. LIMIT is capped at 100.",
          status: "validated",
        },
      },
      {
        trace: {
          actor: "code",
          title: "Execute read-only",
          body: "An admin-only Postgres function runs the query in a read-only transaction with a 3 s statement timeout, and clamps the result to 100 rows again. The server abandons the call after 6 s.",
          code: `[
  { "make": "Toyota", "model": "Land Cruiser", "revenue": 14200, "bookings": 28 },
  { "make": "Honda", "model": "Vezel e:HEV", "revenue": 9800, "bookings": 34 },
  { "make": "Mercedes-Benz", "model": "C-Class", "revenue": 8750, "bookings": 15 }
]`,
          status: "3 rows",
        },
      },
      {
        chat: {
          who: "Assistant",
          side: "bot",
          text: "The Toyota Land Cruiser earned the most this year ($14,200 from 28 bookings), followed by the Honda Vezel e:HEV ($9,800) and the Mercedes-Benz C-Class ($8,750).",
          table: {
            headers: ["Vehicle", "Bookings", "Revenue"],
            rows: [
              ["Toyota Land Cruiser", "28", "$14,200"],
              ["Honda Vezel e:HEV", "34", "$9,800"],
              ["Mercedes-Benz C-Class", "15", "$8,750"],
            ],
          },
          sql: `SELECT c.make, c.model, SUM(b.total_amount) AS revenue, COUNT(b.id) AS bookings
FROM cars c JOIN bookings b ON b.car_id = c.car_id
WHERE b.payment_status = 'paid'
GROUP BY c.car_id, c.make, c.model
ORDER BY revenue DESC
LIMIT 3;`,
        },
        trace: {
          actor: "model",
          title: "Summarize and show the evidence",
          body: "The model summarizes the returned rows. The table and the exact SQL that ran sit under the answer so the admin can check it.",
          status: "sent",
        },
      },
    ],
  },
};
