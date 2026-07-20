/**
 * Google Analytics 4. The measurement ID is read from an env var so the tag
 * stays dormant until VITE_GA4_ID is set (e.g. "G-XXXXXXXXXX"). SPA route
 * changes are tracked in __root.tsx alongside the Meta pixel.
 */
export const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;

export function ga4ConfigScript(id: string): string {
  return `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{send_page_view:true});`;
}

/**
 * Fire a page_view on client-side navigation. No-op until GA4 is loaded.
 * GA4 derives the page dimension from `page_location` (full URL), not the
 * UA-era `page_path`, so we send the current href + title. Requires GA4's
 * enhanced-measurement "page changes based on browser history events" to be
 * OFF, otherwise SPA navigations get counted twice.
 */
export function ga4PageView(): void {
  ga4Event("page_view", {
    page_location: typeof window !== "undefined" ? window.location.href : undefined,
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });
}

/** Fire an arbitrary GA4 event. No-op until GA4 is loaded. */
export function ga4Event(name: string, params?: Record<string, unknown>): void {
  if (
    GA4_ID &&
    typeof window !== "undefined" &&
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag
  ) {
    (window as unknown as { gtag: (...a: unknown[]) => void }).gtag("event", name, params ?? {});
  }
}
