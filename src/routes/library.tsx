import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Frame } from "@/components/frame";
import { getToolAccess } from "@/lib/tools-pass.functions";
import { TOOLS_PRICE_LABEL, browserTools } from "@/lib/tools-pass";

export const Route = createFileRoute("/library")({
  validateSearch: (search: Record<string, unknown>): { cancelled?: boolean; error?: boolean } => {
    const result: { cancelled?: boolean; error?: boolean } = {};
    if (search.cancelled === "1") result.cancelled = true;
    if (search.error === "1") result.error = true;
    return result;
  },
  loader: () => getToolAccess(),
  head: () => ({
    meta: [
      { title: "My tools — NovaQI" },
      {
        name: "description",
        content:
          "Pay once to open the six NovaQI browser tools. Guides and code kits are separate Whop purchases.",
      },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const access = Route.useLoaderData();
  const search = Route.useSearch();
  const [pending, setPending] = useState<"pay" | "restore" | "lock" | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  async function pay() {
    setPending("pay");
    setMessage(null);
    try {
      const response = await fetch("/api/tools/checkout", { method: "POST" });
      const data = (await response.json()) as { url?: string; message?: string };
      if (!response.ok || !data.url) {
        setMessage(data.message ?? "We could not start the payment. Please try again.");
        setPending(null);
        return;
      }
      window.location.assign(data.url);
    } catch {
      setMessage("We could not start the payment. Please try again.");
      setPending(null);
    }
  }

  async function restore(event: FormEvent) {
    event.preventDefault();
    setPending("restore");
    setMessage(null);
    try {
      const response = await fetch("/api/tools/restore", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await response.json()) as { message?: string };
      if (!response.ok) {
        setMessage(data.message ?? "We could not unlock this browser. Please try again.");
        setPending(null);
        return;
      }
      window.location.assign("/library");
    } catch {
      setMessage("We could not unlock this browser. Please try again.");
      setPending(null);
    }
  }

  async function lock() {
    setPending("lock");
    await fetch("/api/tools/lock", { method: "POST" });
    window.location.assign("/library");
  }

  return (
    <Frame>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-xs font-semibold tracking-widest text-mist">My tools</p>
        <h1 className="font-display mt-3 max-w-3xl text-5xl font-medium tracking-tight sm:text-6xl">
          {access.unlocked ? "Your tools are open." : "Open the six browser tools."}
        </h1>
        {access.unlocked ? (
          <Unlocked email={access.email} pending={pending === "lock"} onLock={lock} />
        ) : (
          <Locked
            paymentsReady={access.paymentsReady}
            cancelled={search.cancelled === true}
            confirmFailed={search.error === true}
            message={message}
            pending={pending}
            email={email}
            onEmail={setEmail}
            onPay={pay}
            onRestore={restore}
          />
        )}
      </section>
    </Frame>
  );
}

function Unlocked({
  email,
  pending,
  onLock,
}: {
  email: string | null;
  pending: boolean;
  onLock: () => void;
}) {
  return (
    <>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist">
        {email ? `Unlocked for ${email}. ` : ""}
        These tools run in this browser. Notes stay on this device. They are not sent to a broker,
        a wallet, or an exchange. This payment does not include the PDF guides or code kits. Those
        are separate purchases on Whop.
      </p>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {browserTools.map((tool) => (
          <li key={tool.file} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
            <div className="min-w-0 flex-1">
              <p className="font-display text-2xl tracking-tight">{tool.name}</p>
              <p className="text-sm text-mist">{tool.line}</p>
            </div>
            <a
              href={`/tools/${tool.file}`}
              className="inline-flex min-h-11 items-center text-sm font-semibold text-mint"
            >
              Open
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-mist">
        Export a backup from a tool before you clear this browser. On a new phone or computer, come
        back to this page and enter the same checkout email.
      </p>
      <button
        type="button"
        onClick={onLock}
        disabled={pending}
        className="mt-6 inline-flex min-h-11 items-center text-sm text-mist underline-offset-4 hover:text-ink hover:underline disabled:opacity-60"
      >
        {pending ? "Locking…" : "Lock this browser"}
      </button>
    </>
  );
}

function Locked({
  paymentsReady,
  cancelled,
  confirmFailed,
  message,
  pending,
  email,
  onEmail,
  onPay,
  onRestore,
}: {
  paymentsReady: boolean;
  cancelled: boolean;
  confirmFailed: boolean;
  message: string | null;
  pending: "pay" | "restore" | "lock" | null;
  email: string;
  onEmail: (value: string) => void;
  onPay: () => void;
  onRestore: (event: FormEvent) => void;
}) {
  return (
    <>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist">
        One payment of {TOOLS_PRICE_LABEL} opens all six tools on this site. It is not a
        subscription. You will not be billed again.
      </p>
      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {browserTools.map((tool) => (
          <li key={tool.file} className="rounded-lg border border-line bg-panel px-4 py-4">
            <p className="font-display text-xl tracking-tight">{tool.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-mist">{tool.line}</p>
          </li>
        ))}
      </ul>
      <div className="mt-8 max-w-2xl space-y-3 text-sm leading-relaxed text-mist">
        <p>What you get: the six tools above, in this browser, after Stripe confirms the payment.</p>
        <p>
          What you do not get: the PDF guides, worksheets, and code kits. Those stay separate
          one-time purchases on Whop. The session plan on the playbook page stays free.
        </p>
        <p>
          Stripe takes the card payment on their page. NovaQI does not see your card number. Stripe
          emails you a receipt. This browser stays unlocked for about a year. On another device,
          enter that same email and we check the receipt with Stripe.
        </p>
      </div>
      {cancelled ? (
        <p className="mt-6 max-w-2xl text-sm text-ink">
          The payment was cancelled. You have not been charged.
        </p>
      ) : null}
      {confirmFailed ? (
        <p className="mt-6 max-w-2xl text-sm text-ink">
          We could not confirm that payment. If money left your account, enter the email from your
          Stripe receipt below.
        </p>
      ) : null}
      {message ? <p className="mt-6 max-w-2xl text-sm text-ink">{message}</p> : null}
      {paymentsReady ? (
        <button
          type="button"
          onClick={onPay}
          disabled={pending !== null}
          className="mt-8 inline-flex min-h-12 items-center rounded-md bg-mint px-5 text-sm font-bold text-deep disabled:opacity-60"
        >
          {pending === "pay" ? "Opening the payment page…" : `Pay ${TOOLS_PRICE_LABEL} and open my tools`}
        </button>
      ) : (
        <p className="mt-8 max-w-2xl text-sm text-ink">
          Card payment is not switched on yet. The price is {TOOLS_PRICE_LABEL} once. Please try
          again later.
        </p>
      )}
      <form onSubmit={onRestore} className="mt-10 max-w-md">
        <h2 className="font-display text-2xl tracking-tight">I already paid</h2>
        <p className="mt-2 text-sm leading-relaxed text-mist">
          Enter the email from your Stripe receipt. We only use it to find that payment.
        </p>
        <label className="mt-4 block text-sm" htmlFor="checkout-email">
          Checkout email
        </label>
        <input
          id="checkout-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => onEmail(event.target.value)}
          className="mt-2 w-full rounded-md border border-line bg-panel px-3 py-3 text-base text-ink"
        />
        <button
          type="submit"
          disabled={pending !== null || !paymentsReady}
          className="mt-3 inline-flex min-h-12 items-center rounded-md border border-line px-5 text-sm font-semibold disabled:opacity-60"
        >
          {pending === "restore" ? "Checking…" : "Unlock this browser"}
        </button>
      </form>
      <p className="mt-8 text-sm text-mist">
        The free session plan is still open.{" "}
        <Link to="/playbook" className="text-mint">
          Open the session plan
        </Link>
      </p>
    </>
  );
}
