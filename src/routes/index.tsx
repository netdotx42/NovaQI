import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Catalog } from "@/components/catalog";
import { Frame } from "@/components/frame";
import { STORE_URL, faqs } from "@/data/catalog";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <Frame>
      <section className="border-b border-line">
        <img
          src="/brand/novaqi-banner.webp"
          width={1949}
          height={650}
          alt="NovaQI mint orbital mark against an emerald planet and star field"
          className="aspect-[1949/650] max-h-[420px] w-full object-cover object-center"
          fetchPriority="high"
        />
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-20">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-mist">
            <span className="size-1.5 rounded-full bg-mint shadow-[0_0_12px_var(--color-mint)]" />
            Independent thinking. Better tools.
          </p>
          <h1 className="font-display mt-5 text-6xl leading-[0.98] font-medium tracking-tighter sm:text-7xl lg:text-8xl">
            Less noise.
            <br />
            More <span className="text-mint">process.</span>
          </h1>
        </div>
        <div className="flex flex-col items-start gap-5 lg:pb-2">
          <p className="max-w-md text-base leading-relaxed text-mist">
            Turn research into a repeatable routine. Practical tools for traders, crypto
            researchers and people building with AI.
          </p>
          <a
            href="#products"
            className="inline-flex min-h-12 items-center gap-8 rounded-md bg-linear-to-br from-mint-hot to-mint px-5 text-sm font-bold text-deep shadow-[0_0_24px_color-mix(in_srgb,var(--color-mint)_18%,transparent)] transition hover:from-mint-hot hover:to-mint-hot"
          >
            Find your toolkit
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </section>

      <div className="border-y border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 font-mono text-[11px] tracking-[0.14em] text-mist sm:flex-row sm:justify-between sm:px-6">
          <span>01 / Think clearer</span>
          <span>Research · Risk · Development</span>
          <span className="hidden sm:inline">Scroll to explore</span>
        </div>
      </div>

      <div className="border-b border-line bg-panel text-mint-hot">
        <ul className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-sm sm:flex-row sm:justify-between sm:px-6">
          {["Built for your workflow", "Clear inputs. Visible assumptions.", "No performance promises."].map(
            (item) => (
              <li key={item} className="flex items-center gap-3">
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-mint" />
                {item}
              </li>
            ),
          )}
        </ul>
      </div>

      <section id="products" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-mist">The NovaQI toolkit</p>
            <h2 className="font-display mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
              Your process.
              <br />
              Your next upgrade.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-mist">
            Start with the problem you want to solve. Focused downloads. One-time prices.
            Final terms are on each Whop listing.
          </p>
        </div>
        <Catalog />
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-mist">
          Suggested launch prices in USD. Availability, final prices and purchase terms are shown
          on Whop. Browser tools on this site run locally. Guides and source files ship with the
          order.
        </p>
      </section>

      <section id="mcp" className="scroll-mt-24 border-y border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-mist">
              <span className="size-1.5 rounded-full bg-mint" />
              The connected workflow / coming soon
            </p>
            <h2 className="font-display mt-4 text-5xl leading-[1.02] font-medium tracking-tight sm:text-6xl">
              Your AI.
              <br />
              A more useful
              <br />
              <span className="text-mint">set of tools.</span>
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-mist">
              Bring structured market research, position sizing and paper-portfolio tools into a
              compatible MCP client.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Stock and spot-crypto research tools",
                "Position sizing and technical indicators",
                "Local, persistent paper-trading ledger",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-mint" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 max-w-md text-xs leading-relaxed text-mist">
              Planned release: a local Python 3.11+ server with stdio transport. Demo data by
              default. Optional Alpaca data uses your own credentials. No live order execution.
            </p>
          </div>
          <div className="rounded-lg border border-line bg-panel p-6 sm:p-8">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-mist">NovaQI Trading MCP</p>
            <p className="font-display mt-4 text-6xl tracking-tighter tabular-nums sm:text-7xl">
              $29
              <span className="ml-2 font-sans text-sm font-normal tracking-normal text-mist">
                / month
              </span>
            </p>
            <p className="mt-2 text-sm text-mint">7-day free trial planned</p>
            <hr className="my-6 border-line" />
            <p className="text-sm text-mist">One focused MCP workflow for research and simulation.</p>
            <div className="mt-5 rounded-md border border-line bg-canvas p-4 font-mono text-sm leading-8">
              <p className="text-xs text-mist">novaqi://operating-policy</p>
              <p>
                <Check className="mr-2 inline size-3.5 text-mint" aria-hidden="true" />
                get_quote
              </p>
              <p>
                <Check className="mr-2 inline size-3.5 text-mint" aria-hidden="true" />
                calculate_position_size
              </p>
              <p>
                <Check className="mr-2 inline size-3.5 text-mint" aria-hidden="true" />
                paper_portfolio
              </p>
              <p className="text-xs text-mist">8 tools · structured outputs · local ledger</p>
            </div>
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-between rounded-md bg-mint px-4 text-sm font-bold text-deep"
            >
              Follow the launch on Whop
              <ArrowUpRight className="size-4" />
            </a>
            <p className="mt-4 text-xs leading-relaxed text-mist">
              Subscription launch pending. The planned offer is 7 days free, then US$29/month until
              cancelled. Paid access and delivery are not yet enabled.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:py-24">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-mist">Before you start</p>
            <h2 className="font-display mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
              Good questions.
              <br />
              Clear answers.
            </h2>
          </div>
          <div>
            {faqs.map((item) => (
              <details key={item.q} className="group border-b border-line py-2">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-base">
                  {item.q}
                  <span className="font-mono text-mint group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="pb-4 text-sm leading-relaxed text-mist">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mint text-deep">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:py-20">
          <p className="text-[11px] font-semibold tracking-[0.18em]">
            Make your next session more intentional.
          </p>
          <h2 className="font-display mt-4 text-5xl font-medium tracking-tight sm:text-6xl">
            Put process first.
          </h2>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-3 rounded-md bg-deep px-5 text-sm font-bold text-mint"
            >
              Explore NovaQI on Whop
              <ArrowUpRight className="size-4" />
            </a>
            <Link
              to="/library"
              className="inline-flex min-h-12 items-center rounded-md border border-deep/30 px-5 text-sm font-semibold"
            >
              Already purchased
            </Link>
          </div>
        </div>
      </section>
    </Frame>
  );
}
