import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ArrowRight, X } from "lucide-react";

const STORAGE_KEY = "vb-report-promo-2026";

/**
 * Floating bottom promo bar for the annual workforce report (Incredible
 * Health style). Client-only (renders nothing on the server), slides up after
 * a short delay, and a dismissal is remembered in localStorage. Hidden on the
 * Spanish vet funnel, the report itself, and app/legal/conversion pages.
 */
const HIDDEN_PREFIXES = [
  "/veterinarios",
  "/reports",
  "/auth",
  "/dashboard",
  "/gracias",
  "/privacidad",
  "/terminos",
];

export function ReportPromoBar() {
  const { pathname } = useLocation();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    setDismissed(false);
    const t = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(t);
  }, []);

  if (dismissed || HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 px-3 pb-3 transition-all duration-500 print:hidden sm:px-4 sm:pb-4 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
    >
      <div
        className="mx-auto flex max-w-3xl items-center gap-3 rounded-xl border border-primary/15 px-4 py-3 shadow-xl sm:gap-4 sm:px-5"
        style={{ background: "oklch(0.9 0.055 264)" }}
      >
        <span className="hidden shrink-0 rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-accent-foreground sm:inline-block">
          New
        </span>
        <p className="min-w-0 flex-1 truncate text-sm font-bold tracking-tight text-primary sm:text-[15px]">
          <span className="sm:hidden">
            2026 Workforce Report<span className="text-accent"> is out.</span>
          </span>
          <span className="hidden sm:inline">
            The 2026 State of the Veterinary Workforce Report
            <span className="text-accent"> is out.</span>
          </span>
        </p>
        <Link
          to="/reports/state-of-the-veterinary-workforce-2026"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          <span className="sm:hidden">Read it</span>
          <span className="hidden sm:inline">Read the report</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            localStorage.setItem(STORAGE_KEY, "1");
            setDismissed(true);
          }}
          className="shrink-0 rounded-md p-1.5 text-primary/60 transition hover:bg-primary/10 hover:text-primary"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
