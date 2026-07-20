import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { CheckCircle2, MessageCircle, Zap } from "lucide-react";
import { trackPixel } from "@/lib/meta-pixel";
import { whatsappLink, trackWhatsAppClick } from "@/lib/whatsapp";

/**
 * Thank-you / ad-conversion page, shared by the Spanish (Mexico) and English
 * (Canada) funnels. `en=1` renders the English copy + English WhatsApp opener +
 * a neutral priority badge (the UNAM fast-track label only applies to Mexico).
 */
const COPY = {
  es: {
    title: "¡Recibimos tu perfil! | VetBridge USA",
    heading: "¡Recibimos tu perfil!",
    badge: "VIP · Fast Track UNAM",
    body: (
      <>
        Un coordinador te contactará en menos de{" "}
        <strong className="text-foreground">24 horas</strong> por WhatsApp o correo. Si quieres
        adelantar el proceso, escríbenos ahora:
      </>
    ),
    whatsapp: "Escribir por WhatsApp",
    waText: "Hola, acabo de enviar mi perfil en VetBridge USA y quiero adelantar mi evaluación",
    back: "Volver al inicio",
  },
  en: {
    title: "We got your profile! | VetBridge USA",
    heading: "We got your profile.",
    badge: "Priority · Fast Track",
    body: (
      <>
        A coordinator will reach out within <strong className="text-foreground">24 hours</strong> by
        WhatsApp or email. Want a head start? Message us now:
      </>
    ),
    whatsapp: "Message us on WhatsApp",
    waText: "Hi VetBridge, I just submitted my profile and I'd like to get started.",
    back: "Back to home",
  },
} as const;

export const Route = createFileRoute("/gracias")({
  validateSearch: (search: Record<string, unknown>): { vip?: number; en?: number } => ({
    ...(search.vip == 1 ? { vip: 1 } : {}),
    ...(search.en == 1 ? { en: 1 } : {}),
  }),
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { title: "¡Recibimos tu perfil! | VetBridge USA" },
    ],
  }),
  component: Gracias,
});

function Gracias() {
  const { vip, en } = Route.useSearch();
  const c = COPY[en === 1 ? "en" : "es"];

  // This page is the ad conversion event: fire the Meta standard Lead event on arrival.
  useEffect(() => {
    trackPixel("Lead");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo-mark.png" alt="" className="h-8 w-auto" />
            <span className="text-lg font-semibold tracking-tight">VetBridge USA</span>
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-24">
        <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{c.heading}</h1>
          {vip === 1 && (
            <div className="mx-auto mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase text-accent-foreground">
              <Zap className="h-3.5 w-3.5" /> {c.badge}
            </div>
          )}
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{c.body}</p>
          <a
            href={whatsappLink(c.waText)}
            onClick={() => trackWhatsAppClick("gracias")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-md px-8 py-4 text-lg font-semibold text-white shadow-sm transition hover:opacity-90"
            style={{ backgroundColor: "#25D366" }}
          >
            <MessageCircle className="h-6 w-6" fill="white" />
            {c.whatsapp}
          </a>
          <div className="mt-8">
            <Link to="/" className="text-sm text-muted-foreground underline hover:text-foreground">
              {c.back}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
