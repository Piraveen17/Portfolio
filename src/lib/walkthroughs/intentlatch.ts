import type { Context, GlanceItem, Scenario, Step } from "./types";

/*
 * Walkthrough content for IntentLatch (WhatsApp order management).
 * Tool names, argument shapes, enum values, statuses and the LKR format come from the
 * repository (app/agents/tools/order_tools.py, router.py, pending_action_service.py,
 * rendering/money.py). Menu items, prices, order numbers and ids are SAMPLE data.
 */

export const INTENTLATCH_CONTEXT: Context = {
  problem:
    "Customers want to order, change and cancel food over WhatsApp, but an LLM that can write to the database will eventually write the wrong thing.",
  role: "I designed and built the backend: the webhook pipeline, the agent harness, the typed tools and the confirmation flow.",
  decision:
    "The model only proposes. Every order change runs in deterministic code after the customer taps Confirm, and every price comes from a database read.",
};

export const INTENTLATCH_GLANCE: { stack: string[]; decisions: GlanceItem[] } = {
  stack: [
    "Python 3.12",
    "FastAPI",
    "ARQ + Redis",
    "PostgreSQL + Alembic",
    "OpenRouter",
    "Docker",
  ],
  decisions: [
    {
      title: "Propose, confirm, execute",
      body: "Order tools are requests. The system stores a pending_action and sends Confirm and Cancel buttons. Only a tap executes it, once.",
    },
    {
      title: "Numbers come from the database",
      body: "Prices and totals are rendered by code from a DB read. A guardrail also recognises price-shaped tokens in model text.",
    },
    {
      title: "Identity is not an argument",
      body: "customer_id is injected by the harness from the signed webhook. The model cannot name another customer.",
    },
  ],
};

const SAMPLE = "sample menu and order numbers";

function inbound(text: string): Step {
  return {
    id: "inbound",
    kind: "info",
    label: "received",
    title: "Webhook receives the message",
    body: "The signature is checked over the raw body, the message id is inserted under a unique index, a job is queued, and the request returns 200.",
    code: {
      lang: "text",
      text: "POST /webhooks/whatsapp\nX-Hub-Signature-256  verified (HMAC-SHA256, raw body)\nmessages.wamid       inserted (unique)\nqueue                customer_turn enqueued",
    },
    chat: [{ from: "customer", text }],
    why: "No business logic and no LLM call runs before the signature passes, and a redelivered message id cannot create a second order.",
  };
}

function route(intent: string): Step {
  return {
    id: "route",
    kind: "info",
    label: "routed",
    title: "Router picks a specialist",
    body: "No button tap or yes/no is pending, so one forced classify_intent call runs. Its output is validated against a schema.",
    code: {
      lang: "json",
      text: `{\n  "name": "classify_intent",\n  "arguments": {\n    "intent": "${intent}",\n    "confidence": 0.9,\n    "language": "en"\n  }\n}`,
    },
    why: "Routing is a single constrained call with typed output, so a wrong guess can only pick the wrong specialist. It cannot take an action.",
  };
}

function declined(): Step {
  return {
    id: "declined",
    kind: "rejected",
    label: "rejected",
    title: "Customer cancelled, nothing was written",
    body: "The pending_action ends as DECLINED. No order row was created or changed.",
    chat: [{ from: "agent", text: "Okay, I have cancelled that. Nothing was changed." }],
    why: "A declined proposal is a normal outcome. Because execution only follows a tap, cancelling needs no cleanup.",
  };
}

export const INTENTLATCH_SCENARIOS: Scenario[] = [
  {
    id: "place",
    label: "Place an order",
    blurb: `Customer asks for two egg kottu for pickup. Follow the request from webhook to a placed order. Prices are ${SAMPLE}.`,
    declined: declined(),
    steps: [
      inbound("2 egg kottu, pickup please"),
      route("order"),
      {
        id: "propose-add",
        kind: "proposed",
        label: "proposed",
        title: "Order agent proposes a tool call",
        body: "The model returns a tool name and arguments, nothing else. customer_id is not in them: the harness injects it from the webhook context.",
        code: {
          lang: "json",
          text: '{\n  "name": "add_item",\n  "arguments": {\n    "item_query": "egg kottu",\n    "quantity": 2\n  }\n}',
          mark: { lines: [4, 5], tone: "proposed" },
        },
        why: "Identity is never an LLM argument, so no prompt can make the agent act on another customer's cart.",
      },
      {
        id: "validate-add",
        kind: "committed",
        label: "committed",
        title: "Code validates, then edits the draft cart",
        body: "The cart is draft state. No order exists yet.",
        checks: [
          { label: "Arguments match the AddItemArgs schema", result: "pass" },
          { label: "Quantity 2 appears in the customer's message", result: "pass", note: "A quantity other than 1 must be stated by the customer." },
          { label: "item_query resolves to exactly one menu item", result: "pass", note: "egg kottu, menu_item_id 7" },
        ],
        why: "The model cannot invent a quantity. Code checks the number against what the customer actually typed.",
      },
      {
        id: "propose-checkout",
        kind: "proposed",
        label: "proposed",
        title: "Agent asks to check out",
        body: "request_checkout does not place the order. It asks the system to send a confirmation.",
        code: { lang: "json", text: '{\n  "name": "request_checkout",\n  "arguments": {}\n}' },
        why: "The only ordering tool the model has is a request. Execution is not something it can call.",
      },
      {
        id: "price",
        kind: "sourced",
        label: "sourced",
        title: "Total is read from the database",
        body: "Code reads the unit price from the menu table and does the arithmetic. The model never writes a number.",
        code: {
          lang: "sql",
          text: "SELECT price_minor FROM menu_items WHERE id = 7;  -- 85000\n-- total_minor = 2 * 85000 = 170000\n-- format_lkr(170000) -> \"LKR 1,700.00\"",
        },
        sourceNote: "sourced from database, not generated by the model",
        why: "A price is the one number a customer will hold you to, so it only ever comes from a DB read rendered by code.",
      },
      {
        id: "gate",
        kind: "gate",
        label: "gate",
        gate: true,
        title: "Confirmation gate",
        body: "The system, not the model, builds this summary and sends the buttons. The proposal is stored as a pending_action with a nonce, an expiry and the cart version.",
        code: {
          lang: "json",
          text: '{\n  "pending_action": {\n    "action_type": "CHECKOUT",\n    "status": "PENDING",\n    "nonce": "<random>",\n    "cart_version": 3,\n    "expires_at": "<timestamp>"\n  }\n}',
          mark: { lines: [4], tone: "proposed" },
        },
        chat: [
          {
            from: "agent",
            text: "Your order\n2 x Egg Kottu   LKR 1,700.00\nTotal   LKR 1,700.00\nPickup",
            note: "sample data",
            buttons: [
              { label: "Confirm", role: "confirm" },
              { label: "Edit", role: "choice" },
              { label: "Cancel", role: "cancel" },
            ],
          },
        ],
        why: "This is the core safety claim: nothing is written until the customer taps Confirm on this exact proposal.",
      },
      {
        id: "execute",
        kind: "committed",
        label: "committed",
        title: "Deterministic code places the order",
        body: "The tap claims the pending_action atomically (PENDING to CONSUMED, matched to this customer) and the order is created from the cart.",
        code: {
          lang: "text",
          text: "pending_action  PENDING -> CONSUMED\norder           KT-20418 created from cart v3\noutcome         EXECUTED",
        },
        why: "Claiming the action first makes the tap idempotent: a second tap sees ALREADY_DONE, and an edited cart yields STALE.",
      },
      {
        id: "reply",
        kind: "sourced",
        label: "sourced",
        title: "Reply is rendered from the stored order",
        body: "Order number, lines and total come from the order row. The model writes no part of this message.",
        sourceNote: "sourced from database, not generated by the model",
        chat: [
          {
            from: "agent",
            text: "Order placed.\nKT-20418, pickup\n2 x Egg Kottu\nTotal LKR 1,700.00",
            note: "sample data",
          },
        ],
        why: "The final message is a template filled from the database, so what the customer sees always matches what was stored.",
      },
    ],
  },
  {
    id: "modify",
    label: "Modify an order",
    blurb: `Customer changes an order that is already placed. Same rule: the model proposes the change, the customer confirms it, code applies it. Prices are ${SAMPLE}.`,
    declined: declined(),
    steps: [
      inbound("can you make that 3 egg kottu instead of 2"),
      route("order"),
      {
        id: "read-order",
        kind: "sourced",
        label: "sourced",
        title: "Agent reads the order first",
        body: "A read tool returns the customer's order from the database. The harness scopes it to this customer.",
        code: {
          lang: "json",
          text: '{\n  "name": "get_order",\n  "arguments": { "order_number": "KT-20418" }\n}',
        },
        sourceNote: "sourced from database, not generated by the model",
        why: "The agent works from stored facts (item ids, quantities), not from memory of an earlier chat message.",
      },
      {
        id: "propose-modify",
        kind: "proposed",
        label: "proposed",
        title: "Agent proposes the change",
        body: "Only changed lines are listed, each with its new total quantity.",
        code: {
          lang: "json",
          text: '{\n  "name": "request_modify_order",\n  "arguments": {\n    "order_number": "KT-20418",\n    "changes": [\n      { "menu_item_id": 7, "quantity": 3 }\n    ]\n  }\n}',
          mark: { lines: [6], tone: "proposed" },
        },
        why: "The tool is named request_ on purpose: calling it cannot change the order, only start a confirmation.",
      },
      {
        id: "validate-modify",
        kind: "committed",
        label: "committed",
        title: "Code checks whether the change is allowed",
        checks: [
          { label: "Quantity 3 appears in the customer's message", result: "pass" },
          { label: "Order belongs to this customer", result: "pass", note: "customer_id comes from the harness." },
          { label: "Kitchen has not started the order", result: "pass", note: "Otherwise the tool returns ORDER_MODIFICATION_LOCKED and offers a human." },
        ],
        why: "Business rules live in services, not in the prompt, so the model cannot talk its way past a locked order.",
      },
      {
        id: "price",
        kind: "sourced",
        label: "sourced",
        title: "New total is read from the database",
        code: {
          lang: "sql",
          text: "SELECT price_minor FROM menu_items WHERE id = 7;  -- 85000\n-- new_total_minor = 3 * 85000 = 255000\n-- format_lkr(255000) -> \"LKR 2,550.00\"",
        },
        sourceNote: "sourced from database, not generated by the model",
        why: "The before and after totals shown to the customer are both computed by code.",
      },
      {
        id: "gate",
        kind: "gate",
        label: "gate",
        gate: true,
        title: "Confirmation gate",
        body: "The pending_action stores the order version, so a change made elsewhere in the meantime makes this confirmation stale.",
        code: {
          lang: "json",
          text: '{\n  "pending_action": {\n    "action_type": "MODIFY_ORDER",\n    "status": "PENDING",\n    "order_version": 1\n  }\n}',
        },
        chat: [
          {
            from: "agent",
            text: "Change order KT-20418\nEgg Kottu: 2 -> 3\nNew total   LKR 2,550.00\n(was LKR 1,700.00)",
            note: "sample data",
            buttons: [
              { label: "Confirm", role: "confirm" },
              { label: "Edit", role: "choice" },
              { label: "Cancel", role: "cancel" },
            ],
          },
        ],
        why: "Changing money after the fact needs the same explicit tap as placing the order.",
      },
      {
        id: "execute",
        kind: "committed",
        label: "committed",
        title: "Deterministic code applies the change",
        code: {
          lang: "text",
          text: "pending_action  PENDING -> CONSUMED\norder           KT-20418 items updated\noutcome         EXECUTED",
        },
        why: "If the order version moved since the proposal, the outcome would be STALE and nothing would change.",
      },
      {
        id: "reply",
        kind: "sourced",
        label: "sourced",
        title: "Reply is rendered from the stored order",
        sourceNote: "sourced from database, not generated by the model",
        chat: [
          {
            from: "agent",
            text: "Order updated.\nKT-20418, pickup\n3 x Egg Kottu\nTotal LKR 2,550.00",
            note: "sample data",
          },
        ],
        why: "The confirmation reads the stored order back, so the customer sees what was actually saved.",
      },
    ],
  },
  {
    id: "ambiguous",
    label: "Ambiguous request",
    blurb: `Customer says "a kottu" and several menu items match. The agent must ask instead of guessing. Prices are ${SAMPLE}.`,
    declined: declined(),
    steps: [
      inbound("add a kottu please"),
      route("order"),
      {
        id: "propose-add",
        kind: "proposed",
        label: "proposed",
        title: "Order agent proposes a tool call",
        code: {
          lang: "json",
          text: '{\n  "name": "add_item",\n  "arguments": {\n    "item_query": "kottu",\n    "quantity": 1\n  }\n}',
        },
        why: "Quantity 1 is the implicit default, so the guard allows it without the customer stating a number.",
      },
      {
        id: "clarify",
        kind: "committed",
        label: "no write",
        title: "Menu search finds several matches, nothing is added",
        body: "The tool returns NEEDS_CLARIFICATION with candidates. The cart is unchanged and the customer is shown the options to tap.",
        code: {
          lang: "json",
          text: '{\n  "status": "NEEDS_CLARIFICATION",\n  "candidates": [\n    "Egg Kottu",\n    "Chicken Kottu",\n    "Mutton Kottu"\n  ],\n  "note": "Nothing was added."\n}',
          mark: { lines: [2, 8], tone: "committed" },
        },
        chat: [
          {
            from: "agent",
            text: "Which kottu would you like?",
            buttons: [
              { label: "Egg Kottu", role: "choice" },
              { label: "Chicken Kottu", role: "choice" },
              { label: "Mutton Kottu", role: "choice" },
            ],
          },
        ],
        why: "When the data is ambiguous, code refuses to pick for the model. Asking costs one message, guessing costs a wrong order.",
      },
      {
        id: "tap",
        kind: "info",
        label: "received",
        title: "Customer taps an option",
        body: "The pre-router handles button taps without an LLM call. The tap carries a menu_item_id, so there is nothing left to interpret.",
        chat: [{ from: "customer", text: "Chicken Kottu" }],
        why: "Deterministic input (a tapped id) skips the model entirely, which is faster and cannot be misread.",
      },
      {
        id: "add",
        kind: "committed",
        label: "committed",
        title: "Code adds the chosen item to the draft cart",
        checks: [
          { label: "menu_item_id 8 exists and is available", result: "pass" },
          { label: "Quantity 1 (implicit default)", result: "pass" },
        ],
        why: "The cart edit uses the id from the tap, not text the model produced.",
      },
      {
        id: "price",
        kind: "sourced",
        label: "sourced",
        title: "Total is read from the database",
        code: {
          lang: "sql",
          text: "SELECT price_minor FROM menu_items WHERE id = 8;  -- 105000\n-- format_lkr(105000) -> \"LKR 1,050.00\"",
        },
        sourceNote: "sourced from database, not generated by the model",
        why: "Same rule on every path: the number on the summary is read, not generated.",
      },
      {
        id: "gate",
        kind: "gate",
        label: "gate",
        gate: true,
        title: "Confirmation gate",
        body: "Checkout was proposed after the cart was filled. The order still needs a tap.",
        chat: [
          {
            from: "agent",
            text: "Your order\n1 x Chicken Kottu   LKR 1,050.00\nTotal   LKR 1,050.00\nPickup",
            note: "sample data",
            buttons: [
              { label: "Confirm", role: "confirm" },
              { label: "Edit", role: "choice" },
              { label: "Cancel", role: "cancel" },
            ],
          },
        ],
        why: "A clarified request still passes the same gate as a clear one.",
      },
      {
        id: "execute",
        kind: "committed",
        label: "committed",
        title: "Deterministic code places the order",
        code: {
          lang: "text",
          text: "pending_action  PENDING -> CONSUMED\norder           KT-20419 created from cart v2\noutcome         EXECUTED",
        },
        why: "One code path creates orders, whichever route led to the gate.",
      },
      {
        id: "reply",
        kind: "sourced",
        label: "sourced",
        title: "Reply is rendered from the stored order",
        sourceNote: "sourced from database, not generated by the model",
        chat: [
          {
            from: "agent",
            text: "Order placed.\nKT-20419, pickup\n1 x Chicken Kottu\nTotal LKR 1,050.00",
            note: "sample data",
          },
        ],
        why: "End state: a stored order, and a message built from it.",
      },
    ],
  },
];
