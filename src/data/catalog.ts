export type Category = "trading" | "crypto" | "developer";

export type Product = {
  slug: string;
  code: string;
  category: Category;
  name: string;
  price: number;
  blurb: string;
  format: string;
  flow: string;
  whop: string;
  tool?: { href: string; label: string };
  includes: string[];
  limits: string;
};

export const STORE_URL = "https://whop.com/novaqi";

export const products: Product[] = [
  {
    slug: "execution-playbook",
    code: "01",
    category: "trading",
    name: "Execution Playbook",
    price: 19,
    blurb: "A practical guide to building a repeatable trading routine.",
    format: "PDF guide",
    flow: "Plan → Execute → Review",
    whop: "https://whop.com/novaqi/execution-playbook-c3/",
    tool: { href: "/playbook", label: "Open the session plan" },
    includes: [
      "Ten-page workbook: define the setup before you collect examples.",
      "Illustrative long breakout-and-retest research card. No short-selling rules.",
      "Order mechanics, a risk worksheet, and a one-page session plan.",
      "After-session scorecard and a weekly review that separates outcome from behaviour.",
    ],
    limits:
      "Educational process design with hypothetical cash-equity examples. It does not supply signals, tested strategies, or personalised advice. Stops do not guarantee a fill.",
  },
  {
    slug: "risk-desk",
    code: "02",
    category: "trading",
    name: "Risk Desk",
    price: 29,
    blurb: "Turn a planned downside budget into a position-size estimate.",
    format: "Browser tool",
    flow: "Risk / Position size",
    whop: "https://whop.com/novaqi/risk-desk-0a/",
    tool: { href: "/tools/risk-desk.html", label: "Open Risk Desk" },
    includes: [
      "Offline calculator for a long cash-equity or linear spot position.",
      "Uses equity, risk budget, entry, stop, target, fees, slippage, lot size and a cash cap.",
      "Rounds quantity down. If nothing fits, it says so — it does not round up.",
      "Printable plan. No broker connection and no live prices.",
    ],
    limits:
      "One account currency. No FX lots, futures, options, leverage or shorts. A gap, extra fees or thin liquidity can exceed the inputs. The estimate does not cap a real loss.",
  },
  {
    slug: "review-lab",
    code: "03",
    category: "trading",
    name: "Review Lab",
    price: 39,
    blurb: "Journal closed trades, record rule adherence and review your process.",
    format: "Browser tool + guide",
    flow: "Record / Reflect / Refine",
    whop: "https://whop.com/novaqi/review-lab-63/",
    tool: { href: "/tools/review-lab.html", label: "Open Review Lab" },
    includes: [
      "Ledger of closed observations: date, symbol, setup, net P/L, planned risk, adherence.",
      "Net R, win rate, average R, cumulative R, peak-to-trough drawdown in R, and adherence rate.",
      "JSON export and restore. Entries stay in this browser when storage is available.",
      "Hypothetical examples are labelled as examples, not performance.",
    ],
    limits:
      "Not a broker statement, tax report or proof of edge. Drawdown is in R, not an equity percentage. Keep one account currency per ledger. Export a backup before you clear the browser.",
  },
  {
    slug: "strategy-validation",
    code: "04",
    category: "trading",
    name: "Strategy Validation",
    price: 49,
    blurb: "Organise experiments and examine your strategy assumptions.",
    format: "Tool + guide + worksheets",
    flow: "Hypothesis → Evidence",
    whop: "https://whop.com/novaqi/strategy-validation-34/",
    tool: { href: "/tools/strategy-lab.html", label: "Open Strategy Lab" },
    includes: [
      "Strategy Lab for a chronological sequence of net R observations.",
      "Development versus later evaluation split, plus an extra cost per observation.",
      "PDF guide, a research-protocol memo, and a blank experiment register.",
      "JSON report export. Inputs are not saved automatically.",
    ],
    limits:
      "Manual analysis, not a backtest engine. No market data, significance test, Monte Carlo or forecast. A small sample cannot establish future performance.",
  },
  {
    slug: "discipline-os",
    code: "05",
    category: "trading",
    name: "Discipline Operating System",
    price: 39,
    blurb: "Bring intention to each session with a planner and a four-week practice.",
    format: "Planner + PDF guide",
    flow: "Prepare / Pause / Reset",
    whop: "https://whop.com/novaqi/discipline-operating-system/",
    tool: { href: "/tools/session-planner.html", label: "Open Session Planner" },
    includes: [
      "Session planner: a written contract, one observable behaviour, and four preparation gates.",
      "Post-session note for a success, a deviation, and one next action.",
      "PDF guide, eight response-card templates, and a four-week practice table.",
      "Local save plus JSON export. One working sheet in this browser.",
    ],
    limits:
      "A preparation count is not readiness to trade and not a profit signal. The planner does not choose a strategy or talk to a broker. It is not therapy or personalised advice.",
  },
  {
    slug: "crypto-research-desk",
    code: "06",
    category: "crypto",
    name: "Crypto Research Desk",
    price: 39,
    blurb: "Keep claims, sources and unanswered questions on one evidence board.",
    format: "Tool + guide + templates",
    flow: "Claim → Source → Evidence",
    whop: "https://whop.com/novaqi/crypto-research-desk/",
    tool: { href: "/tools/evidence-desk.html", label: "Open Evidence Desk" },
    includes: [
      "Evidence board for project identity, chain and a public contract or mint address.",
      "Topics with source, date, finding, status and next action. Up to 100 topics.",
      "Statuses are your workflow labels. They are not an investment rating.",
      "PDF guide, research memo and a source-register template. JSON backup.",
    ],
    limits:
      "The desk stores source URLs as text and never fetches them. No chain data, contract scan, audit or wallet connection. Do not enter secrets.",
  },
  {
    slug: "crypto-exposure-lab",
    code: "07",
    category: "crypto",
    name: "Crypto Exposure Lab",
    price: 49,
    blurb: "Explore concentration and hypothetical price shocks with manual inputs.",
    format: "Calculator + guide",
    flow: "Inputs / Scenarios / Exposure",
    whop: "https://whop.com/novaqi/crypto-exposure-lab/",
    tool: { href: "/tools/exposure-lab.html", label: "Open Exposure Lab" },
    includes: [
      "Manual USD spot calculator for 1–30 assets, cash, price shocks and a fee assumption.",
      "Gross, stressed and hypothetical net-liquidation figures, plus weights.",
      "Labelled worked example. Export the inputs; nothing autosaves.",
      "PDF guide, scenario memo and an assumption register.",
    ],
    limits:
      "Not a live portfolio, rebalance service or exchange connection. Slippage, taxes, liquidity, correlation, derivatives and leverage are omitted. Inputs are teaching numbers, not quotes.",
  },
  {
    slug: "agent-evaluation-kit",
    code: "08",
    category: "developer",
    name: "Agent Evaluation Kit",
    price: 59,
    blurb: "Run deterministic regression checks on saved agent-output records.",
    format: "Python + tests + guide",
    flow: "cases.json → evaluate.py",
    whop: "https://whop.com/novaqi/agent-evaluation-kit/",
    includes: [
      "Standard-library Python 3.11+ evaluator. No package install and no API key.",
      "Checks: contains, not_contains, json_keys, tool_names, max latency and max cost.",
      "Passing and failing fixtures, unittest suite, and a case-authoring note.",
      "Optional CI workflow template and a PDF guide. Reports hash the input files.",
    ],
    limits:
      "The runner does not generate answers, call tools, or judge whether a reply is true. A keyword pass can still be a wrong answer. Do not put secrets in fixtures.",
  },
  {
    slug: "mcp-contract-lab",
    code: "09",
    category: "developer",
    name: "MCP Contract Lab",
    price: 69,
    blurb: "Inspect tool manifests and smoke-test a real local stdio connection.",
    format: "Python + fixtures + guide",
    flow: "Manifest → Validate → Test",
    whop: STORE_URL,
    includes: [
      "A local workflow for reading an MCP tool manifest before you trust it.",
      "Validation of the contract, then a smoke test against a real stdio server you run.",
      "Fixtures and a guide ship with the Whop download.",
      "Separate from the Trading MCP subscription, which is not open yet.",
    ],
    limits:
      "This page does not connect to a remote agent or place orders. Confirm the current file list and licence on the Whop listing before you buy. Checkout for this kit is on the NovaQI store.",
  },
];

export const categoryLabel: Record<Category | "all", string> = {
  all: "All tools",
  trading: "Trading",
  crypto: "Crypto research",
  developer: "AI & MCP",
};

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const faqs = [
  {
    q: "What am I buying?",
    a: "Focused digital products: a PDF guide, a browser tool, worksheets, or developer source, depending on the listing. Read the file list and licence on Whop before you pay. Each product is sold separately.",
  },
  {
    q: "Do these tools trade for me?",
    a: "No. They support education, research, calculations and record keeping. Trading MCP, when it launches, is local simulation only. There are no signals, profit guarantees or live broker orders.",
  },
  {
    q: "How will I get my downloads?",
    a: "Buy on the Whop listing. Browser tools on this site run locally in your browser. Guides, worksheets and the Python kits are delivered with the Whop order. This site does not ask for a NovaQI password.",
  },
  {
    q: "What do I need to run them?",
    a: "Browser tools are for a current desktop browser. Guides need a PDF reader. The Agent Evaluation Kit and Trading MCP need Python 3.11 or newer. Some MCP features need a compatible client and your own data credentials.",
  },
  {
    q: "When does the MCP free trial start?",
    a: "The subscription is not open yet. The planned offer is 7 days free, then US$29 a month until you cancel. Checkout stays closed until access, delivery and cancellation instructions are ready.",
  },
  {
    q: "What about support, refunds and my data?",
    a: "Support and refund terms are on the Whop listing. Browser tools store notes in this browser when storage works — export a backup. This site has no payment form. Whop handles checkout on its own pages.",
  },
] as const;
