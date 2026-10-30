import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { STORE_URL } from "@/data/catalog";

const nav = [
  { label: "The toolkit", hash: "products" },
  { label: "Trading MCP", hash: "mcp" },
  { label: "FAQ", hash: "faq" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="print:hidden sticky top-0 z-40 border-b border-line bg-canvas/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link to="/" className="flex min-h-11 items-center gap-2.5" aria-label="NovaQI home">
          <img
            src="/brand/novaqi-logo.webp"
            width={40}
            height={40}
            alt=""
            className="size-10 rounded-lg object-cover shadow-[0_0_18px_color-mix(in_srgb,var(--color-mint)_22%,transparent)]"
          />
          <span className="font-display text-2xl font-semibold tracking-tight text-mint-hot">
            NovaQI
          </span>
        </Link>

        <nav className="ml-8 hidden items-center gap-7 text-sm text-mist md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              className="transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/library" className="transition hover:text-ink">
            My tools
          </Link>
        </nav>

        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto inline-flex min-h-11 items-center rounded-md border border-line px-3.5 text-xs font-medium text-mint-hot transition hover:border-mint hover:text-ink"
        >
          Visit Whop
        </a>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-line text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-panel px-4 py-2 md:hidden"
          aria-label="Mobile"
        >
          {nav.map((item) => (
            <Link
              key={item.hash}
              to="/"
              hash={item.hash}
              className="flex min-h-11 items-center text-sm text-ink"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/library"
            className="flex min-h-11 items-center text-sm text-ink"
            onClick={() => setOpen(false)}
          >
            My tools
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
