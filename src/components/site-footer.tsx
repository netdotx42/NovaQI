import { Link } from "@tanstack/react-router";
import { STORE_URL } from "@/data/catalog";

export function SiteFooter() {
  return (
    <footer className="print:hidden border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link to="/" className="flex items-center gap-2.5" aria-label="NovaQI home">
            <img
              src="/brand/novaqi-logo.webp"
              width={36}
              height={36}
              alt=""
              className="size-9 rounded-lg object-cover"
            />
            <span className="font-display text-xl font-semibold tracking-tight text-mint-hot">
              NovaQI
            </span>
          </Link>
          <p className="text-sm text-mist">Tools for independent thinking.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 sm:ml-auto">
            <a
              className="inline-flex min-h-11 items-center text-sm text-mist hover:text-ink"
              href="https://x.com/novaqi_biz"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
            <a
              className="inline-flex min-h-11 items-center text-sm text-mist hover:text-ink"
              href="https://www.instagram.com/novaqi.biz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
            <a
              className="inline-flex min-h-11 items-center text-sm text-mist hover:text-ink"
              href={STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Whop
            </a>
          </div>
        </div>
        <p className="border-t border-line pt-6 text-xs leading-relaxed text-mist">
          © 2026 NovaQI. Research, education and simulation only. Trading and crypto involve
          risk of loss. No investment advice or guaranteed results.
        </p>
      </div>
    </footer>
  );
}
