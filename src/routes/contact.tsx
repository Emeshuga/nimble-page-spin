import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, CheckCircle2 } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { SITE } from "@/lib/site";
import { submitContactToHubSpot } from "@/lib/hubspot";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact VetBridge USA" },
      {
        name: "description",
        content:
          "Get in touch with VetBridge USA — veterinarians looking to practice in the U.S. and clinics looking to hire licensed international DVMs.",
      },
    ],
  }),
  component: Contact,
});

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const canSubmit =
    form.name.trim().length >= 2 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) &&
    form.message.trim().length >= 5;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading");
    const ok = await submitContactToHubSpot({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
    setStatus(ok ? "done" : "error");
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-4 py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Get in touch</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Whether you're a veterinarian exploring the move or a clinic looking to hire, we'd
              love to hear from you. We respond within one business day.
            </p>
            <div className="mt-8 space-y-4">
              <a
                href={`mailto:${SITE.emailGeneral}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:shadow-sm"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">Email</div>
                  <div className="text-sm text-muted-foreground">{SITE.emailGeneral}</div>
                </div>
              </a>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition hover:shadow-sm"
              >
                <div
                  className="grid h-10 w-10 place-items-center rounded-lg text-white"
                  style={{ backgroundColor: "#25D366" }}
                >
                  <MessageCircle className="h-5 w-5" fill="white" />
                </div>
                <div>
                  <div className="text-sm font-semibold">WhatsApp</div>
                  <div className="text-sm text-muted-foreground">Message us directly</div>
                </div>
              </a>
              <div className="rounded-xl border border-border bg-card p-4 text-sm text-muted-foreground">
                For clinic inquiries:{" "}
                <a href={`mailto:${SITE.emailClinics}`} className="text-primary underline">
                  {SITE.emailClinics}
                </a>
              </div>
            </div>
          </div>

          <div>
            {status === "done" ? (
              <div className="rounded-3xl border-2 border-primary bg-card p-10 text-center shadow-md">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h2 className="mt-6 text-2xl font-bold">Thanks — message received.</h2>
                <p className="mt-3 text-muted-foreground">
                  We'll get back to you within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
              >
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Name</span>
                  <input
                    required
                    className={inputCls}
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Email</span>
                  <input
                    required
                    type="email"
                    className={inputCls}
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium">Message</span>
                  <textarea
                    required
                    rows={5}
                    className={inputCls}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  />
                </label>
                {status === "error" && (
                  <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                    Something went wrong. Please email us directly at {SITE.emailGeneral}.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-60"
                >
                  {status === "loading" ? "Sending…" : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
