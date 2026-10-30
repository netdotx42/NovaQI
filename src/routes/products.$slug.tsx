import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Frame } from "@/components/frame";
import { categoryLabel, getProduct } from "@/data/catalog";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => ({
    meta: [{ title: `${getProduct(params.slug)?.name ?? "Product"} — NovaQI` }],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const product = getProduct(slug);

  if (!product) {
    return (
      <Frame>
        <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
          <h1 className="font-display text-4xl tracking-tight">That product is not in the toolkit.</h1>
          <Link to="/" hash="products" className="mt-6 inline-flex min-h-11 items-center text-mint">
            Back to the toolkit
          </Link>
        </div>
      </Frame>
    );
  }

  return (
    <Frame>
      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          to="/"
          hash="products"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-mist hover:text-ink"
        >
          <ArrowLeft className="size-4" />
          Toolkit
        </Link>
        <p className="mt-8 font-mono text-[11px] tracking-[0.18em] text-mint">
          NQ / {product.code} · {categoryLabel[product.category]}
        </p>
        <div className="mt-4 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.16em] text-mist uppercase">
              {product.format}
            </p>
            <h1 className="font-display mt-3 text-5xl font-medium tracking-tight sm:text-6xl">
              {product.name}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist">{product.blurb}</p>
            <p className="font-display mt-6 text-5xl tabular-nums">
              ${product.price}
              <span className="ml-2 font-sans text-sm font-normal text-mist">
                suggested one-time price
              </span>
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={product.whop}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-mint px-5 text-sm font-bold text-deep"
              >
                Get it on Whop
                <ArrowUpRight className="size-4" />
              </a>
              {product.tool ? (
                <a
                  href={product.tool.href}
                  className="inline-flex min-h-12 items-center justify-center rounded-md border border-line px-5 text-sm font-semibold text-ink"
                >
                  {product.tool.label}
                </a>
              ) : null}
            </div>
            <p className="mt-4 max-w-xl text-xs leading-relaxed text-mist">
              Whop shows the live price, tax and refund terms. {product.flow}
              {product.tool?.href.startsWith("/tools/")
                ? " The download on Whop is separate from My tools. This browser tool opens after one payment of $49, which covers all six tools."
                : ""}
            </p>
          </div>
          <div className="rounded-lg border border-line bg-panel p-6">
            <h2 className="font-display text-2xl tracking-tight">What is included</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-mist">
              {product.includes.map((item) => (
                <li key={item} className="border-t border-line pt-3 first:border-t-0 first:pt-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="mt-10 max-w-3xl rounded-lg border border-line bg-canvas px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">What this does not do</h2>
          <p className="mt-2 text-sm leading-relaxed text-mist">{product.limits}</p>
        </aside>
      </article>
    </Frame>
  );
}
