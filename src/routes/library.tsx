import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Frame } from "@/components/frame";
import { STORE_URL, products } from "@/data/catalog";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "My Library — NovaQI" },
      {
        name: "description",
        content: "Open NovaQI browser tools and find Whop downloads for guides and kits.",
      },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const tools = products.filter((product) => product.tool);

  return (
    <Frame>
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-mist">Your library</p>
        <h1 className="font-display mt-3 max-w-3xl text-5xl font-medium tracking-tight sm:text-6xl">
          Files stay with the order. Tools run here.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist">
          NovaQI does not collect a password on this page. Guides, worksheets and Python kits are
          delivered by Whop to the email you used at checkout. The browser tools below keep their
          notes in this browser only.
        </p>
        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-md bg-mint px-5 text-sm font-bold text-deep"
        >
          Open your Whop orders
          <ArrowUpRight className="size-4" />
        </a>

        <h2 className="font-display mt-14 text-3xl tracking-tight">Open a browser tool</h2>
        <ul className="mt-6 divide-y divide-line border-y border-line">
          {tools.map((product) => (
            <li key={product.slug} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[11px] tracking-[0.16em] text-mint">NQ / {product.code}</p>
                <p className="mt-1 font-display text-2xl tracking-tight">{product.name}</p>
                <p className="text-sm text-mist">{product.blurb}</p>
              </div>
              <div className="flex gap-4">
                <a
                  href={product.tool?.href}
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-mint"
                >
                  {product.tool?.label}
                </a>
                <Link
                  to="/products/$slug"
                  params={{ slug: product.slug }}
                  className="inline-flex min-h-11 items-center text-sm text-mist hover:text-ink"
                >
                  Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-xs leading-relaxed text-mist">
          Export a JSON backup from any tool before you clear browser data or switch devices.
          Nothing on this page is sent to a broker, a wallet, or an exchange.
        </p>
      </section>
    </Frame>
  );
}
