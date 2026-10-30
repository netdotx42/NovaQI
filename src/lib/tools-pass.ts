/** One-time price for the six browser tools. 4900 = US$49.00. */
export const TOOLS_PRICE_CENTS = 4900;
export const TOOLS_PRICE_LABEL = "$49";
export const TOOLS_PRICE_ID = "price_1UWFZu17sTkAsp8vvweTc3Ek";
export const TOOLS_PRODUCT_KEY = "novaqi-browser-tools";

export const browserTools = [
  {
    file: "risk-desk.html",
    name: "Risk Desk",
    line: "Turn a planned loss limit into a position-size estimate.",
  },
  {
    file: "review-lab.html",
    name: "Review Lab",
    line: "Record closed trades and review whether you followed the plan.",
  },
  {
    file: "strategy-lab.html",
    name: "Strategy Lab",
    line: "Look at a sequence of results you type in yourself.",
  },
  {
    file: "session-planner.html",
    name: "Session Planner",
    line: "Write what you will and will not do in one session.",
  },
  {
    file: "evidence-desk.html",
    name: "Evidence Desk",
    line: "Keep a claim, its source, and the open question in one place.",
  },
  {
    file: "exposure-lab.html",
    name: "Exposure Lab",
    line: "Try price shocks on amounts you enter by hand.",
  },
] as const;

export type ToolsCheckout = {
  payment_status?: string | null;
  amount_subtotal?: number | null;
  amount_total?: number | null;
  currency?: string | null;
  livemode?: boolean | null;
  metadata?: { product?: string | null } | null;
};

/** True only for a completed live payment of this exact product. */
export function isPaidToolsSession(session: ToolsCheckout): boolean {
  const subtotal = session.amount_subtotal ?? session.amount_total;
  return (
    session.payment_status === "paid" &&
    subtotal === TOOLS_PRICE_CENTS &&
    session.currency === "usd" &&
    session.livemode === true &&
    session.metadata?.product === TOOLS_PRODUCT_KEY
  );
}

export function toolFile(name: string): (typeof browserTools)[number]["file"] | null {
  const match = browserTools.find((tool) => tool.file === name || tool.file === `${name}.html`);
  return match?.file ?? null;
}
