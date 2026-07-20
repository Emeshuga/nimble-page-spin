import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  MapPin,
  Plane,
  GraduationCap,
  ClipboardCheck,
  DollarSign,
  MessageCircle,
  Users,
  ShieldCheck,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { PositioningBand } from "@/components/positioning-band";
import { submitCanadianVetToHubSpot } from "@/lib/hubspot";
import { whatsappLink, trackWhatsAppClick } from "@/lib/whatsapp";

export const Route = createFileRoute("/canada")({
  head: () => ({
    meta: [
      { title: "VetBridge USA for Canadian Vets | Practice in the U.S." },
      {
        name: "description",
        content:
          "Canadian DVMs are already qualified to work in the U.S. TN visa at the border, no ECFVG, NAVLE already passed. We match you to a U.S. clinic and handle the visa and the move. Zero cost to you.",
      },
      {
        property: "og:title",
        content: "Canadian veterinarians: you're already qualified to work in the U.S.",
      },
      {
        property: "og:description",
        content:
          "TN visa at the border, no ECFVG, NAVLE already done. We match you to a U.S. clinic and coordinate the visa and relocation. No cost to the vet.",
      },
    ],
  }),
  component: CanadaPage,
});

const WA_TEXT =
  "Hi VetBridge, I'm a Canadian veterinarian interested in working in the U.S. I'd like to learn more.";

function CanadaPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader primaryCta={{ label: "Apply now", to: "/canada#apply" }} />
      <Hero />
      <TrustBar />
      <WhyCanadians />
      <HowItWorks />
      <PositioningBand
        before="You don't need a new degree or a new exam. You need "
        highlight="a job offer and a border crossing."
        body="Your Canadian license already carries the NAVLE. Your school is already AVMA-accredited. The rest is paperwork we handle for you."
      />
      <Opportunity />
      <ApplyForm />
      <FAQ />
      <FinalCta />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(1100px 560px at 88% -8%, oklch(0.72 0.15 55 / 0.10), transparent 62%), linear-gradient(180deg, oklch(0.955 0.025 264), oklch(0.995 0.003 240) 85%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-accent" /> For Canadian veterinarians
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              You're already qualified to practice in the{" "}
              <span className="text-primary">United States</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              A Canadian DVM is one of the few professions that crosses the border with almost no
              friction. No ECFVG, no re-doing the NAVLE, no visa lottery. We match you to a U.S.
              clinic that fits and handle the visa and the move. It costs you nothing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#apply"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
              >
                Apply now <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={whatsappLink(WA_TEXT)}
                onClick={() => trackWhatsAppClick("canada_hero")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition hover:bg-secondary"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" /> TN visa at the border
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" /> No cost to you
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-primary" /> You choose the clinic
              </span>
            </div>
          </div>

          {/* Right: photo with floating cards. */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-black/5">
              <img
                src="/canada-hero.jpg"
                alt="A smiling Canadian veterinarian in blue scrubs holding a happy dog in a bright clinic"
                width={1000}
                height={1200}
                className="aspect-[4/5] w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent"
              />
            </div>
            <div className="absolute -top-4 -right-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-xl backdrop-blur sm:-right-6">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Plane className="h-4 w-4 text-accent" /> Placeable in weeks
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 w-60 rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur sm:-left-6">
              <div className="text-xs font-medium text-muted-foreground">Why Canadians move first</div>
              <div className="mt-1 text-sm font-semibold leading-snug">
                Licensed here means NAVLE already passed there.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: Plane, label: "TN visa at the border, no consulate, no lottery" },
    { icon: GraduationCap, label: "AVMA-accredited school, no ECFVG" },
    { icon: ClipboardCheck, label: "Canadian license means NAVLE already passed" },
    { icon: ShieldCheck, label: "Zero cost to you, the clinic pays us" },
  ];
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-start gap-3">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span className="text-sm font-medium text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyCanadians() {
  const reasons = [
    {
      icon: Plane,
      title: "TN status at the border",
      body: "As a Canadian citizen, Veterinarian is a TN profession under the USMCA. With a job offer you're granted TN status at the airport preclearance or land border, usually the same day. No consulate interview, no waiting months, no lottery.",
    },
    {
      icon: GraduationCap,
      title: "No ECFVG certification",
      body: "Every Canadian veterinary college is AVMA-accredited. That means you skip the ECFVG process that internationally-trained vets spend years and thousands of dollars on. Your degree already counts in the U.S.",
    },
    {
      icon: ClipboardCheck,
      title: "The NAVLE is already done",
      body: "Licensure in Canada requires the NAVLE, the same North American exam U.S. states require. If you're licensed in a Canadian province, you've already passed the one exam that gates U.S. practice.",
    },
    {
      icon: DollarSign,
      title: "Keep more of what you earn",
      body: "The U.S. median for associate veterinarians is $125,510 (BLS, May 2024), and many roles pay above it. We negotiate the offer with you, not around you.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-semibold uppercase tracking-wide text-accent">
          The hard part doesn't apply to you
        </div>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          The paperwork most vets dread, you get to skip.
        </h2>
        <p className="mt-4 text-muted-foreground">
          Moving a veterinary career across a border is usually slow and expensive. For Canadian
          DVMs, almost none of that applies. Here's why.
        </p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {reasons.map(({ icon: Icon, title, body }) => (
          <div key={title} className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Tell us about you",
      body: "A two-minute profile: your province, school, license status, and where you'd like to land. No documents yet.",
    },
    {
      n: "02",
      title: "We match you to a clinic",
      body: "We bring you real U.S. openings that fit your location, species focus, and pay expectations. You interview and choose. You're never sent somewhere you didn't pick.",
    },
    {
      n: "03",
      title: "We coordinate the visa",
      body: "Once you accept an offer, an independent immigration attorney prepares your TN support letter. VetBridge coordinates the process end to end; we don't practice law, we make sure it's handled right.",
    },
    {
      n: "04",
      title: "You cross and start",
      body: "You present your offer and TN letter at the border, get TN status (up to three years, renewable), and start. We help with relocation and the first few weeks on the ground.",
    },
  ];
  return (
    <section id="how" className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-wide text-accent">
            One managed pipeline
          </div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            How it works, start to first day
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ n, title, body }) => (
            <div key={n} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="text-sm font-bold text-accent">{n}</div>
              <h3 className="mt-2 text-base font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Opportunity() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-20 sm:py-24">
      <div className="grid items-center gap-10 rounded-3xl border border-border bg-card p-8 shadow-sm sm:p-12 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The U.S. can't hire vets fast enough. You're exactly who they're short of.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Clinics across the country have open DVM roles they can't fill. You already meet every
            requirement to work there. We connect the two sides and carry the paperwork, so the only
            decision you have to make is whether the offer is right for you.
          </p>
          <a
            href="#apply"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            Start your profile <ArrowRight className="h-4 w-4" />
          </a>
        </div>
        <ul className="space-y-4">
          {[
            "You interview and choose the clinic, never the other way around.",
            "Your spouse and children can come with you on TD status.",
            "No cost to you at any step, the hiring clinic pays our fee.",
            "Straight answers, always. If something won't work for you, we'll tell you.",
          ].map((t) => (
            <li key={t} className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
              <span className="text-sm text-foreground">{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Nova Scotia",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Northwest Territories",
  "Nunavut",
  "Yukon",
];

const SCHOOLS = [
  "University of Guelph (OVC)",
  "University of Saskatchewan (WCVM)",
  "University of Calgary (UCVM)",
  "University of Prince Edward Island (AVC)",
  "Université de Montréal",
  "Other / trained abroad",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  province: string;
  licensed: string;
  navle: string;
  school: string;
  us_location: string;
  timeline: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  province: "",
  licensed: "",
  navle: "",
  school: "",
  us_location: "",
  timeline: "",
};

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

function ApplyForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  function update<K extends keyof FormState>(k: K, v: FormState[K]) {
    setForm((p) => ({ ...p, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    const licensed = form.licensed === "Yes";
    const ok = await submitCanadianVetToHubSpot({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      province: form.province,
      licensed,
      navle: form.navle,
      school: form.school,
      us_location: form.us_location.trim(),
      timeline: form.timeline,
    });

    if (!ok) {
      setStatus("error");
      return;
    }
    // English thank-you (en=1); fast-track (licensed + NAVLE passed) gets the priority badge.
    const priority = licensed && form.navle === "Passed";
    navigate({ to: "/gracias", search: priority ? { en: 1, vip: 1 } : { en: 1 } });
  }

  return (
    <section id="apply" className="mx-auto max-w-3xl px-4 py-20 sm:py-24">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Start your profile</h2>
        <p className="mt-3 text-muted-foreground">
          Two minutes, no documents yet. We'll reach out to talk through your options and the roles
          that fit.
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
      >
        <Field label="Full name">
          <input
            required
            minLength={2}
            maxLength={120}
            type="text"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputCls}
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Email">
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className={inputCls}
            />
          </Field>
          <Field label="Phone / WhatsApp">
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputCls}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Province">
            <select
              required
              value={form.province}
              onChange={(e) => update("province", e.target.value)}
              className={inputCls}
            >
              <option value="" disabled>
                Select a province
              </option>
              {PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Veterinary school">
            <select
              required
              value={form.school}
              onChange={(e) => update("school", e.target.value)}
              className={inputCls}
            >
              <option value="" disabled>
                Select your school
              </option>
              {SCHOOLS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Licensed to practice in Canada?">
            <select
              required
              value={form.licensed}
              onChange={(e) => update("licensed", e.target.value)}
              className={inputCls}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Yes">Yes, currently licensed</option>
              <option value="No">Not yet</option>
            </select>
          </Field>
          <Field label="Have you passed the NAVLE?">
            <select
              required
              value={form.navle}
              onChange={(e) => update("navle", e.target.value)}
              className={inputCls}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Passed">Yes, passed</option>
              <option value="Not yet">Not yet</option>
              <option value="Not sure">Not sure</option>
            </select>
          </Field>
        </div>

        <Field label="Where in the U.S. would you like to work?">
          <input
            type="text"
            maxLength={160}
            placeholder="A state or city, or 'open to anywhere'"
            value={form.us_location}
            onChange={(e) => update("us_location", e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="When could you start?">
          <select
            required
            value={form.timeline}
            onChange={(e) => update("timeline", e.target.value)}
            className={inputCls}
          >
            <option value="" disabled>
              Select
            </option>
            <option value="ASAP">As soon as possible</option>
            <option value="3-6 months">In the next 3-6 months</option>
            <option value="Just exploring">Just exploring for now</option>
          </select>
        </Field>

        {status === "error" && (
          <p className="text-sm text-destructive">
            Something went wrong sending your profile. Please try again, or reach us on{" "}
            <a
              href={whatsappLink(WA_TEXT)}
              onClick={() => trackWhatsAppClick("canada_form_error")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline"
            >
              WhatsApp
            </a>
            .
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : "Submit my profile"}
          {status !== "loading" && <ArrowRight className="h-4 w-4" />}
        </button>
        <p className="text-center text-xs text-muted-foreground">
          No cost to you, ever. The hiring clinic pays our fee.
        </p>
      </form>
    </section>
  );
}

const FAQS = [
  {
    q: "Does it really cost me nothing?",
    a: "Correct. You never pay VetBridge. The hiring clinic pays our placement fee. Your only costs are the standard government visa fees, which many clinics also cover as part of the offer.",
  },
  {
    q: "Do I need the ECFVG certification?",
    a: "No. The ECFVG is for graduates of non-accredited schools. Every Canadian veterinary college is AVMA-accredited, so you skip it entirely.",
  },
  {
    q: "Do I have to re-take the NAVLE in the U.S.?",
    a: "No. The NAVLE is the North American exam, and it's already required for Canadian licensure. If you're licensed in a Canadian province, you've passed the exam U.S. states require. You'll still apply for a license in your destination state, but you don't re-sit the exam.",
  },
  {
    q: "How does the TN visa work for Canadians?",
    a: "Veterinarian is a TN profession under the USMCA. As a Canadian citizen you're granted TN status directly at an airport preclearance or land border with your job offer and a support letter, usually the same day. TN status lasts up to three years and is renewable.",
  },
  {
    q: "Can my family come with me?",
    a: "Yes. Your spouse and unmarried children under 21 can accompany you on TD status. An immigration attorney will walk you through the specifics for your situation.",
  },
  {
    q: "How long does the whole thing take?",
    a: "For a licensed, NAVLE-passed vet who's ready to move, it can be a matter of weeks once you accept an offer, mostly gated by state licensing and the clinic's start date. We'll give you an honest timeline for your specific case, never a number we can't stand behind.",
  },
  {
    q: "What if it doesn't work out at the clinic?",
    a: "We back our placements. If a fit falls through, we work with you and the clinic to make it right. You're not on your own once you land.",
  },
];

function FAQ() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:py-24">
      <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
        Questions Canadian vets ask
      </h2>
      <div className="mt-10 space-y-3">
        {FAQS.map(({ q, a }) => (
          <details
            key={q}
            className="group rounded-2xl border border-border bg-card p-5 shadow-sm [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold">
              {q}
              <span className="text-accent transition group-open:rotate-45">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-20">
        <div className="mb-4 flex items-center justify-center gap-3 opacity-80">
          <Users className="h-5 w-5" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          The border is the only thing between you and the offer.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
          Start your profile and we'll show you what's possible. No documents, no cost, no pressure.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href="#apply"
            className="inline-flex items-center gap-2 rounded-full bg-card px-6 py-3 text-base font-semibold text-foreground shadow-sm transition hover:opacity-90"
          >
            Apply now <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={whatsappLink(WA_TEXT)}
            onClick={() => trackWhatsAppClick("canada_final")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-6 py-3 text-base font-medium text-primary-foreground transition hover:bg-primary-foreground/10"
          >
            <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
