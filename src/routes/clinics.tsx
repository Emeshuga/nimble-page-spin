import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ShieldCheck,
  Building2,
  Clock,
  MapPin,
  CheckCircle2,
  Plus,
  Minus,
  Users,
  Zap,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { supabase } from "@/integrations/supabase/client";
import { submitClinicToHubSpot } from "@/lib/hubspot";

export const Route = createFileRoute("/clinics")({
  head: () => ({
    meta: [
      { title: "VetBridge USA for Clinics | Licensed, Visa-Ready Veterinarians" },
      {
        name: "description",
        content:
          "Fill vacant DVM roles with licensed international veterinarians. Canadian DVMs placeable in weeks, UNAM-accredited on 9-15 months, NY limited permits let ECFVG vets start immediately. 3-year placement guarantee.",
      },
      {
        property: "og:title",
        content: "VetBridge USA for Clinics, Your next DVM is already licensed and visa-ready",
      },
      {
        property: "og:description",
        content:
          "Licensed international veterinarians for U.S. clinics. TN visa, NY limited permits, 3-year placement guarantee.",
      },
    ],
  }),
  component: ClinicsPage,
});

function ClinicsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader primaryCta={{ label: "Request Candidates", to: "/clinics#request" }} />
      <Hero />
      <Speed />
      <NewYork />
      <GuaranteeBand />
      <MidCta />
      <Handles />
      <HowItWorks />
      <RequestForm />
      <FAQ />
      <FinalCta />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1000px 500px at 80% -10%, oklch(0.72 0.15 55 / 0.15), transparent 60%), radial-gradient(900px 500px at -10% 10%, oklch(0.38 0.14 250 / 0.18), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 py-24 sm:py-28">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Building2 className="h-3.5 w-3.5 text-accent" /> For U.S. veterinary clinics
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Your next veterinarian is already{" "}
            <span className="text-primary">licensed and visa-ready</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Every week a DVM role sits open is a week of turned-away patients, burned-out staff, and
            lost revenue. We source licensed international veterinarians, Mexico and Canada, and
            place them into U.S. clinics with a 3-year replacement guarantee.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#request"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              Request Candidates <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center rounded-md border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition hover:bg-secondary"
            >
              How it works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Speed() {
  const cards = [
    {
      icon: Zap,
      flag: "🇨🇦 Canada",
      title: "Placeable in weeks",
      body: "Canadian DVMs qualify for the TN visa issued at the border, and many are already NAVLE-passed. The path from offer letter to first shift can run in weeks, not quarters.",
    },
    {
      icon: Clock,
      flag: "🇲🇽 Mexico",
      title: "Accelerated 9-15 month path",
      body: "UNAM-accredited Mexican DVMs (FMVZ-UNAM 2011-2025) work under AVMA accreditation, they skip ECFVG and go directly to state licensing and TN visa.",
    },
  ];
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Speed to placement</h2>
          <p className="mt-4 text-muted-foreground">
            Two distinct pipelines. Both licensed, credentialed, and visa-eligible.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {cards.map(({ icon: Icon, flag, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {flag}
                </div>
              </div>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewYork() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div
        className="relative overflow-hidden rounded-3xl border-2 border-accent/50 p-8 shadow-lg sm:p-12"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.72 0.15 55 / 0.18), oklch(0.38 0.14 250 / 0.15))",
        }}
      >
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-accent-foreground">
          <Zap className="h-3.5 w-3.5" />
          New York Fast Start
        </div>
        <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
          In New York? Your veterinarian can start working now.
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/85 sm:text-lg">
          ECFVG-certified international veterinarians qualify for a New York State{" "}
          <strong className="text-foreground">limited permit</strong>, allowing them to practice
          immediately under the supervision of a NY-licensed veterinarian while they complete the
          NAVLE. The permit is valid for up to two years.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: MapPin,
              title: "Start immediately",
              body: "Practice under supervision the day the permit is issued.",
            },
            {
              icon: Users,
              title: "Experienced candidates",
              body: "Many ECFVG-pathway DVMs bring 7-15 years of experience, including running entire hospitals, with strong English.",
            },
            {
              icon: Zap,
              title: "Structured integration",
              body: "Supervision as a benefit: your team onboards a licensed international DVM inside your standards, not in isolation.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-border/60 bg-card/80 p-5 backdrop-blur"
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <div className="mt-3 text-base font-semibold">{title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
        <a
          href="#request"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Request NY candidates <ArrowRight className="h-4 w-4" />
        </a>
        <p className="mt-6 max-w-3xl text-xs text-muted-foreground">
          Limited permits are issued by the NYSED Office of the Professions; eligibility is
          determined individually.
        </p>
      </div>
    </section>
  );
}

function GuaranteeBand() {
  return (
    <section className="border-y border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-16 text-center lg:flex-row lg:text-left">
        <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-primary-foreground/10">
          <ShieldCheck className="h-14 w-14" />
        </div>
        <div className="max-w-3xl">
          <div className="text-xs font-semibold uppercase tracking-wide text-primary-foreground/70">
            3-Year Placement Guarantee
          </div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            If your veterinarian leaves within 36 months, we replace them at no additional placement
            fee.
          </h2>
        </div>
        <a
          href="#request"
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-primary-foreground px-5 py-3 text-sm font-semibold text-primary transition hover:opacity-90"
        >
          Request Candidates <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function MidCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center">
      <a
        href="#request"
        className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
      >
        Request Candidates <ArrowRight className="h-4 w-4" />
      </a>
    </section>
  );
}

function Handles() {
  const items = [
    "Sourcing licensed international candidates",
    "Credential verification (AVMA / ECFVG)",
    "State licensing coordination",
    "TN visa process via independent immigration attorneys",
    "Relocation logistics",
    "Onboarding + post-placement support",
  ];
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What we handle end-to-end
          </h2>
          <p className="mt-4 text-muted-foreground">
            You interview and choose. We handle the rest.
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl gap-3">
          {items.map((it) => (
            <div
              key={it}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm font-medium">{it}</span>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-muted-foreground">
          VetBridge USA is not a law firm. Immigration work is performed by independent immigration
          attorneys.
        </p>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { n: "01", t: "Tell us your need", d: "Role, state, species focus, urgency." },
    { n: "02", t: "We match licensed candidates", d: "Curated profiles that fit your clinic." },
    { n: "03", t: "Interview & choose", d: "You interview. You decide." },
    { n: "04", t: "We handle visa + relocation", d: "TN visa, licensing, moving logistics." },
  ];
  return (
    <section id="how" className="mx-auto max-w-6xl px-4 py-20">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s) => (
          <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
            <div className="text-sm font-mono font-semibold text-accent">{s.n}</div>
            <div className="mt-2 text-lg font-semibold">{s.t}</div>
            <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

type ReqForm = {
  clinic_name: string;
  state: string;
  role_type: string;
  species_focus: string;
  urgency: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
};

const EMPTY_REQ: ReqForm = {
  clinic_name: "",
  state: "",
  role_type: "",
  species_focus: "",
  urgency: "",
  contact_name: "",
  contact_email: "",
  contact_phone: "",
};

function RequestForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<ReqForm>(EMPTY_REQ);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof ReqForm>(k: K, v: ReqForm[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  const canNext1 = form.clinic_name.trim().length >= 2 && form.state.trim().length >= 2;
  const canNext2 = form.role_type !== "" && form.urgency !== "";
  const canSubmit =
    form.contact_name.trim().length >= 2 &&
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.contact_email) &&
    form.contact_phone.trim().length >= 7;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("loading");
    setError(null);
    const { data: sess } = await supabase.auth.getSession();
    const user_id = sess.session?.user.id ?? null;
    const { error: err } = await supabase.from("clinic_requests").insert({
      clinic_name: form.clinic_name.trim(),
      state: form.state.trim(),
      role_type: form.role_type,
      species_focus: form.species_focus || null,
      urgency: form.urgency,
      contact_name: form.contact_name.trim(),
      contact_email: form.contact_email.trim(),
      contact_phone: form.contact_phone.trim(),
      user_id,
    });
    if (err) {
      console.error(err);
      setError("Something went wrong. Please try again or email us.");
      setStatus("error");
      return;
    }
    // Also push into HubSpot CRM (fire-and-forget; Supabase is source of truth).
    void submitClinicToHubSpot({
      clinic_name: form.clinic_name.trim(),
      state: form.state.trim(),
      role_type: form.role_type,
      species_focus: form.species_focus,
      urgency: form.urgency,
      contact_name: form.contact_name.trim(),
      contact_email: form.contact_email.trim(),
      contact_phone: form.contact_phone.trim(),
    });
    setStatus("done");
  }

  if (status === "done") {
    return (
      <section id="request" className="mx-auto max-w-3xl px-4 py-24">
        <div className="rounded-3xl border-2 border-primary bg-card p-10 text-center shadow-md">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h2 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
            Request received. Thank you.
          </h2>
          <p className="mt-3 text-muted-foreground">
            A placement coordinator will reach out within 24 hours to review candidates for your
            clinic.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="request" className="mx-auto max-w-3xl px-4 py-24">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Request Candidates</h2>
        <p className="mt-3 text-muted-foreground">
          Three quick steps. A coordinator responds within 24 hours.
        </p>
      </div>
      <div className="mb-6 flex items-center gap-2">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex flex-1 items-center gap-2">
            <div
              className={`grid h-8 w-8 place-items-center rounded-full text-xs font-semibold ${
                step >= n
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground"
              }`}
            >
              {n}
            </div>
            {n < 3 && (
              <div
                className={`h-1 flex-1 rounded-full ${step > n ? "bg-primary" : "bg-secondary"}`}
              />
            )}
          </div>
        ))}
      </div>
      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        {step === 1 && (
          <>
            <Field label="Clinic name">
              <input
                required
                className={inputCls}
                value={form.clinic_name}
                onChange={(e) => set("clinic_name", e.target.value)}
              />
            </Field>
            <Field label="State">
              <input
                required
                placeholder="e.g. New York"
                className={inputCls}
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
              />
            </Field>
            <div className="flex justify-end">
              <button
                type="button"
                disabled={!canNext1}
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <Field label="Role type">
              <select
                required
                className={inputCls}
                value={form.role_type}
                onChange={(e) => set("role_type", e.target.value)}
              >
                <option value="">Select…</option>
                <option>Full-time associate DVM</option>
                <option>Part-time associate DVM</option>
                <option>Emergency / relief</option>
                <option>Lead / medical director</option>
              </select>
            </Field>
            <Field label="Species focus (optional)">
              <select
                className={inputCls}
                value={form.species_focus}
                onChange={(e) => set("species_focus", e.target.value)}
              >
                <option value="">No preference</option>
                <option>Small animal / companion</option>
                <option>Mixed practice</option>
                <option>Exotics</option>
                <option>Large animal / equine</option>
              </select>
            </Field>
            <Field label="Urgency">
              <select
                required
                className={inputCls}
                value={form.urgency}
                onChange={(e) => set("urgency", e.target.value)}
              >
                <option value="">Select…</option>
                <option>ASAP, role open now</option>
                <option>Within 3 months</option>
                <option>Within 6 months</option>
                <option>Planning ahead (6+ months)</option>
              </select>
            </Field>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                Back
              </button>
              <button
                type="button"
                disabled={!canNext2}
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <Field label="Your name">
              <input
                required
                className={inputCls}
                value={form.contact_name}
                onChange={(e) => set("contact_name", e.target.value)}
              />
            </Field>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Email">
                <input
                  required
                  type="email"
                  className={inputCls}
                  value={form.contact_email}
                  onChange={(e) => set("contact_email", e.target.value)}
                />
              </Field>
              <Field label="Phone">
                <input
                  required
                  type="tel"
                  className={inputCls}
                  value={form.contact_phone}
                  onChange={(e) => set("contact_phone", e.target.value)}
                />
              </Field>
            </div>
            {error && (
              <p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {error}
              </p>
            )}
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="rounded-md border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={!canSubmit || status === "loading"}
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-60"
              >
                {status === "loading" ? "Sending…" : "Submit request"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              By submitting, you agree to our{" "}
              <Link to="/terminos" className="underline hover:text-foreground">
                Terms
              </Link>{" "}
              and{" "}
              <Link to="/privacidad" className="underline hover:text-foreground">
                Privacy
              </Link>
              .
            </p>
          </>
        )}
      </form>
    </section>
  );
}

function FAQ() {
  const items = [
    {
      q: "How fast can you place a candidate?",
      a: "Canadian DVMs already NAVLE-passed can be placed in weeks (TN visa is issued at the border). UNAM-accredited Mexican DVMs typically 9-15 months on the accelerated path. NY limited permit candidates can begin practicing immediately under supervision.",
    },
    {
      q: "How does the 3-year placement guarantee work?",
      a: "If the veterinarian we place leaves your clinic within 36 months of start date, we replace them at no additional placement fee. The guarantee refers to candidate replacement only; it does not guarantee visa or licensing outcomes.",
    },
    {
      q: "What is a TN visa?",
      a: "A USMCA (T-MEC) professional work visa exclusive to Mexican and Canadian nationals. Veterinarian is a listed profession. No lottery, no annual cap; renewable indefinitely in 3-year periods. Canadians receive it at the border; Mexicans at a U.S. consulate in Mexico.",
    },
    {
      q: "What is the New York limited permit?",
      a: "A permit from the NYSED Office of the Professions allowing ECFVG-certified international DVMs to practice under the supervision of a NY-licensed veterinarian while they complete the NAVLE. Valid up to two years. Eligibility is determined individually.",
    },
    {
      q: "What does the clinic need to do?",
      a: "Interview and choose the candidate, sign the sponsoring offer letter, and provide the supervision structure the visa/license category requires. We handle sourcing, credentialing, licensing coordination, immigration attorney handoff, and relocation.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-3xl px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Clinic FAQ</h2>
        </div>
        <div className="mt-10 space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="rounded-xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-foreground">{it.q}</span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 shrink-0 text-primary" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-primary" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                    {it.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Stop losing revenue to open shifts.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
        Request candidates now. A coordinator responds within 24 hours.
      </p>
      <div className="mt-8">
        <a
          href="#request"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          Request Candidates <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground shadow-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/30";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}
