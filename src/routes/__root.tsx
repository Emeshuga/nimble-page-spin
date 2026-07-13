import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { META_PIXEL_ID, pixelHeadScript, trackPixel } from "../lib/meta-pixel";
import { GA4_ID, ga4ConfigScript, ga4PageView } from "../lib/analytics";
import { ReportPromoBar } from "../components/report-promo-bar";

const SITE_URL = "https://www.vetbridgeusa.com";

/** Pages whose primary content is Spanish (everything else is English). */
const SPANISH_PREFIXES = ["/veterinarios", "/privacidad", "/terminos"];

function langForPath(pathname: string): "es" | "en" {
  return SPANISH_PREFIXES.some((p) => pathname.startsWith(p)) ? "es" : "en";
}

const ORGANIZATION_JSONLD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "VetBridge USA",
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  email: "hello@vetbridgeusa.com",
  description:
    "VetBridge USA connects licensed international veterinarians from Mexico and Canada with understaffed U.S. veterinary clinics, coordinating licensing, TN visa, and relocation.",
});

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VetBridge USA | Licensed International DVMs for U.S. Clinics" },
      {
        name: "description",
        content:
          "VetBridge USA connects licensed international veterinarians from Mexico and Canada with understaffed U.S. clinics. We coordinate licensing, TN visa, and relocation end-to-end.",
      },
      { name: "author", content: "VetBridge USA" },
      { property: "og:site_name", content: "VetBridge USA" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg?v=2", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon-32.png?v=2", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16.png?v=2", type: "image/png", sizes: "16x16" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png?v=2" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const lang = langForPath(pathname);
  const canonical = SITE_URL + (pathname === "/" ? "" : pathname.replace(/\/$/, ""));

  return (
    <html lang={lang}>
      <head>
        <HeadContent />
        <link rel="canonical" href={canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ORGANIZATION_JSONLD }}
        />
        {META_PIXEL_ID && (
          <script dangerouslySetInnerHTML={{ __html: pixelHeadScript(META_PIXEL_ID) }} />
        )}
        {GA4_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} />
            <script dangerouslySetInnerHTML={{ __html: ga4ConfigScript(GA4_ID) }} />
          </>
        )}
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const router = useRouter();

  // The pixel's base snippet fires PageView on full page loads; this covers
  // client-side navigations (e.g. form -> /gracias) without double-counting the first load.
  useEffect(() => {
    let firstResolve = true;
    return router.subscribe("onResolved", () => {
      if (firstResolve) {
        firstResolve = false;
        return;
      }
      trackPixel("PageView");
      ga4PageView();
    });
  }, [router]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <ReportPromoBar />
    </QueryClientProvider>
  );
}
