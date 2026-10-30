import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Frame } from "@/components/frame";

export const Route = createFileRoute("/playbook")({
  head: () => ({
    meta: [{ title: "Session plan — NovaQI Execution Playbook" }],
  }),
  component: PlaybookPage,
});

const STORAGE_KEY = "novaqi-session-plan-v1";

const fields = [
  {
    group: "Research context",
    items: [
      ["when", "Date / timezone"],
      ["universe", "Instrument universe"],
      ["session", "Session and timeframe"],
      ["events", "Known scheduled events"],
    ],
  },
  {
    group: "Trade specification",
    items: [
      ["setup", "Setup and level"],
      ["trigger", "Exact trigger"],
      ["levels", "Entry / stop / target"],
      ["invalid", "Reason the idea is invalid"],
    ],
  },
  {
    group: "Exposure check",
    items: [
      ["budget", "Equity / chosen budget"],
      ["costs", "Fees / slippage / lot size"],
      ["size", "Planned size / cash required"],
      ["open", "Other open exposure"],
    ],
  },
  {
    group: "Stand-down conditions",
    items: [
      ["daily", "Daily loss budget set before the session"],
      ["stuck", "Unresolved order or data issue"],
      ["skip", "Conditions under which you will skip"],
      ["habit", "One process behaviour to practise"],
    ],
  },
] as const;

type FieldId = (typeof fields)[number]["items"][number][0];
type Plan = Record<FieldId, string>;

const empty = Object.fromEntries(
  fields.flatMap((group) => group.items.map(([id]) => [id, ""])),
) as Plan;

function loadPlan(): Plan {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Plan>;
    const next = { ...empty };
    for (const key of Object.keys(empty) as FieldId[]) {
      if (typeof parsed[key] === "string") next[key] = parsed[key].slice(0, 400);
    }
    return next;
  } catch {
    return empty;
  }
}

function PlaybookPage() {
  const [plan, setPlan] = useState<Plan>(empty);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState("Write the plan before the session. A blank is honest.");

  useEffect(() => {
    setPlan(loadPlan());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
      setStatus("Saved in this browser. It is not a trade ticket and it is not synced.");
    } catch {
      setStatus("This browser would not store the plan. Print it or copy it out.");
    }
  }, [plan, ready]);

  function update(id: FieldId, value: string) {
    setPlan((current) => ({ ...current, [id]: value }));
  }

  return (
    <Frame>
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-mist">Execution Playbook · page 7</p>
        <h1 className="font-display mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
          Your one-page session plan
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-mist">
          Write the scenario, the invalidation and the size before you decide. A filled sheet is a
          rehearsal, not a signal. The full ten-page workbook is the Whop download. Pair the size
          line with{" "}
          <Link to="/products/$slug" params={{ slug: "risk-desk" }} className="text-mint">
            Risk Desk
          </Link>
          .
        </p>

        <form
          className="print-sheet mt-8 space-y-8"
          onSubmit={(event) => {
            event.preventDefault();
            window.print();
          }}
        >
          {fields.map((group) => (
            <fieldset key={group.group} className="space-y-4">
              <legend className="font-display text-2xl tracking-tight text-mint">{group.group}</legend>
              {group.items.map(([id, label]) => (
                <label key={id} className="block text-sm">
                  <span className="text-mist">{label}</span>
                  <input
                    value={plan[id]}
                    maxLength={400}
                    onChange={(event) => update(id, event.target.value)}
                    className="mt-1.5 w-full rounded-md border border-line bg-panel px-3 py-3 text-ink"
                  />
                </label>
              ))}
            </fieldset>
          ))}
          <p className="text-sm text-mist" role="status">
            {status}
          </p>
          <div className="print:hidden flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex min-h-12 items-center rounded-md bg-mint px-5 text-sm font-bold text-deep"
            >
              Print plan
            </button>
            <button
              type="button"
              className="inline-flex min-h-12 items-center rounded-md border border-line px-5 text-sm"
              onClick={() => {
                setPlan(empty);
                setStatus("Cleared. The previous notes are gone from this browser.");
              }}
            >
              Clear sheet
            </button>
            <a
              href="https://whop.com/novaqi/execution-playbook-c3/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center text-sm font-semibold text-mint"
            >
              Get the full playbook
            </a>
          </div>
        </form>

        <div className="mt-12 grid gap-4 text-sm leading-relaxed text-mist sm:grid-cols-3">
          <p>
            <span className="block font-semibold text-ink">Score later</span>
            One point each: setup qualified, size matched the plan, exit followed the rule, fills
            and costs recorded, review done. Out of five. Process, not a prediction.
          </p>
          <p>
            <span className="block font-semibold text-ink">Separate the outcome</span>
            A rule-following loss is not automatically a mistake. A lucky impulse is not
            automatically a good decision.
          </p>
          <p>
            <span className="block font-semibold text-ink">Stand down</span>
            If an order status is unclear, stop and confirm it. Do not increase size to recover a
            loss.
          </p>
        </div>
      </section>
    </Frame>
  );
}
