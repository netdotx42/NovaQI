import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Braces, Hexagon } from "lucide-react";
import { useMemo, useState } from "react";
import { categoryLabel, products, type Category, type Product } from "@/data/catalog";

const filters: Array<Category | "all"> = ["all", "trading", "crypto", "developer"];

function Glyph({ category }: { category: Category }) {
  if (category === "developer") return <Braces className="size-14 text-mint" strokeWidth={1.25} />;
  if (category === "crypto") return <Hexagon className="size-14 text-mint" strokeWidth={1.25} />;
  return <ArrowUpRight className="size-14 text-mint" strokeWidth={1.25} />;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex min-w-0 flex-col overflow-hidden rounded-lg border border-line bg-panel shadow-[0_12px_30px_#00000033]">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="group flex flex-1 flex-col"
      >
        <div
          className={`art-grid flex h-44 flex-col justify-between p-5 ${
            product.category === "crypto"
              ? "art-grid-crypto"
              : product.category === "developer"
                ? "art-grid-developer"
                : ""
          }`}
        >
          <span className="font-mono text-[11px] tracking-[0.18em] text-mint-hot">
            NQ / {product.code}
          </span>
          <div className="flex justify-center" aria-hidden="true">
            <Glyph category={product.category} />
          </div>
          <code className="font-mono text-[11px] text-mist">{product.flow}</code>
        </div>
        <div className="flex flex-1 flex-col px-5 pt-5 pb-2">
          <p className="text-[11px] font-semibold tracking-[0.16em] text-mist uppercase">
            {product.format}
          </p>
          <h3 className="font-display mt-3 text-2xl font-medium tracking-tight group-hover:text-mint">
            {product.name}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">{product.blurb}</p>
        </div>
      </Link>
      <div className="flex items-center justify-between gap-3 border-t border-line px-5 py-4">
        <p className="font-display text-xl tabular-nums">
          ${product.price}
          <span className="ml-1 font-sans text-[11px] font-normal text-mist">one-time</span>
        </p>
        <a
          href={product.whop}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center text-xs font-semibold text-mint"
        >
          Get it on Whop
        </a>
      </div>
    </article>
  );
}

export function Catalog() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const visible = useMemo(
    () => products.filter((product) => filter === "all" || product.category === filter),
    [filter],
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter products">
        {filters.map((key) => {
          const count =
            key === "all" ? products.length : products.filter((product) => product.category === key).length;
          const active = filter === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(key)}
              className={`inline-flex min-h-11 items-center gap-2 rounded-md border px-4 text-sm ${
                active
                  ? "border-mint bg-mint text-deep"
                  : "border-line bg-transparent text-mist hover:text-ink"
              }`}
            >
              {categoryLabel[key]}
              {key === "all" ? (
                <span className={`font-mono text-[10px] ${active ? "text-deep/70" : "text-mist"}`}>
                  {String(count).padStart(2, "0")}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
