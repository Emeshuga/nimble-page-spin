import { Link } from "@tanstack/react-router";
import { Stethoscope } from "lucide-react";
import { SITE } from "@/lib/site";

export function SiteHeader({ primaryCta }: { primaryCta?: { label: string; to: string } }) {
  const cta = primaryCta ?? { label: "Request Candidates", to: "/clinics" };
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Stethoscope className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">VetBridge USA</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <Link to="/veterinarios" className="transition hover:text-foreground">
            For Veterinarians
          </Link>
          <Link to="/clinics" className="transition hover:text-foreground">
            For Clinics
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition hover:bg-secondary"
          >
            Log in
          </Link>
          <Link
            to={cta.to}
            className="hidden rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:inline-flex"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Stethoscope className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold tracking-tight">VetBridge USA</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Bridging licensed international veterinary talent with U.S. clinics that need them. We
              coordinate licensing, visa (via independent immigration attorneys), and relocation
              end-to-end.
            </p>
            <a
              href={`mailto:${SITE.emailGeneral}`}
              className="mt-4 inline-block text-sm text-muted-foreground hover:text-foreground"
            >
              {SITE.emailGeneral}
            </a>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/veterinarios" className="hover:text-foreground">
                  For Veterinarians
                </Link>
              </li>
              <li>
                <Link to="/clinics" className="hover:text-foreground">
                  For Clinics
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/reports/state-of-the-veterinary-workforce-2026"
                  className="hover:text-foreground"
                >
                  2026 Workforce Report
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/auth" className="hover:text-foreground">
                  Log in
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/privacidad" className="hover:text-foreground">
                  Privacy
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="hover:text-foreground">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground/80">
          VetBridge USA is a recruitment and coordination service. It is not a law firm and does not
          provide legal immigration advice; visa work is performed by independent immigration
          attorneys. The 3-Year Placement Guarantee refers to candidate replacement only and does
          not guarantee visa or licensing outcomes, which depend on individual eligibility and the
          relevant authorities. © {new Date().getFullYear()} VetBridge USA.
        </p>
      </div>
    </footer>
  );
}
