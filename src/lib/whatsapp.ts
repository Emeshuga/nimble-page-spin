import { SITE } from "./site";
import { ga4Event } from "./analytics";
import { trackPixel } from "./meta-pixel";

/**
 * Build a wa.me link with a per-surface pre-filled text. Each surface (page,
 * flyer, group post) gets its own wording so incoming chats self-attribute —
 * wa.me carries no UTM data, the opening message is the only source signal.
 */
export function whatsappLink(text: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

/**
 * Count a WhatsApp tap in GA4 + Meta. These leads bypass the form entirely
 * (no /gracias, no HubSpot), so this click is the only conversion signal.
 * Meta gets the standard Contact event — Lead stays reserved for /gracias.
 */
export function trackWhatsAppClick(source: string): void {
  ga4Event("whatsapp_click", { source });
  trackPixel("Contact", { source });
}
