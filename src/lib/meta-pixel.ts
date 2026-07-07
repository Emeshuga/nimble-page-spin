declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

/** Inline base snippet for the <head>. Fires PageView on every full page load. */
export function pixelHeadScript(id: string): string {
  return `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');`;
}

/** Fire a standard event. No-op when the pixel isn't configured or loaded. */
export function trackPixel(event: string): void {
  if (META_PIXEL_ID && typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event);
  }
}
