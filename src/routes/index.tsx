import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  Stethoscope,
  Users,
  Building2,
  GraduationCap,
  CheckCircle2,
  Clock,
  Globe2,
  MapPin,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { CandidateDeck } from "@/components/candidate-deck";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VetBridge USA | Licensed International DVMs for U.S. Clinics" },
      {
        name: "description",
        content:
          "VetBridge USA bridges licensed veterinarians from Mexico and Canada with understaffed U.S. clinics. Visa-ready candidates. 3-year placement guarantee.",
      },
      {
        property: "og:title",
        content: "VetBridge USA | Licensed International DVMs for U.S. Clinics",
      },
      {
        property: "og:description",
        content:
          "Bridging Mexican and Canadian veterinary talent with U.S. clinics. Licensing, TN visa, relocation, end-to-end. 3-year placement guarantee.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <Hero />
      <Problem />
      <SolutionSplit />
      <Guarantee />
      <MidCta />
      <HowItWorks />
      <FinalCta />
      <SiteFooter />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(900px 460px at 88% 8%, oklch(0.72 0.15 55 / 0.10), transparent 62%), radial-gradient(760px 420px at -6% 0%, oklch(0.38 0.14 250 / 0.10), transparent 60%)",
        }}
      />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary px-3.5 py-1.5 text-[13px] font-medium text-primary">
              <Globe2 className="h-3.5 w-3.5 text-accent" />
              Mexico &amp; Canada &nbsp;→&nbsp; United States
            </div>
            <h1 className="text-[2.7rem] font-extrabold leading-[1.02] tracking-tight text-foreground sm:text-6xl">
              Meet your next
              <br />
              veterinarian.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
              Licensed DVMs from Mexico and Canada, credentialed, visa-eligible, and ready. Browse
              the pipeline; we handle licensing, TN visa, and relocation end-to-end.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/veterinarios"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-md shadow-primary/25 transition hover:opacity-90"
              >
                <Stethoscope className="h-4 w-4" /> I'm a Veterinarian
              </Link>
              <Link
                to="/clinics"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-base font-semibold text-foreground transition hover:bg-secondary"
              >
                <Building2 className="h-4 w-4" /> I'm Hiring
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" /> TN visa pathway
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" /> AVMA-accredited
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-accent" /> 3-year guarantee
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <CandidateDeck />
          </div>
        </div>
      </div>
    </section>
  );
}

function Problem() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <Clock className="h-3.5 w-3.5 text-accent" /> The U.S. DVM shortage
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Thousands of DVM roles sit unfilled. Vacancies stretch into months.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Every unfilled shift means turned-away patients, overworked staff, and lost revenue. The
            talent exists, it's just on the other side of a licensing and visa process most clinics
            can't navigate alone.
          </p>
        </div>
      </div>
    </section>
  );
}

function SolutionSplit() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Two sides. One bridge.</h2>
        <p className="mt-4 text-muted-foreground">Pick your path.</p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <PathCard
          icon={Stethoscope}
          eyebrow="For Veterinarians"
          title="Practice in the U.S. Multiply your income."
          body="If you're a licensed DVM in Mexico or Canada, we handle NAVLE prep, state licensing, TN visa, and placement in a sponsoring U.S. clinic."
          bullets={[
            "Salaries of $100K-$140K USD",
            "TN visa, no H-1B lottery",
            "Fast track for FMVZ-UNAM graduates 2011-2025",
          ]}
          cta={{ to: "/veterinarios", label: "See the veterinarian program" }}
        />
        <PathCard
          icon={Building2}
          eyebrow="For Clinics"
          title="Licensed, visa-ready DVMs. Guaranteed."
          body="We source, credential, and place international veterinarians so you can fill roles that have sat vacant for months."
          bullets={[
            "Canadian DVMs often placeable in weeks",
            "UNAM-accredited candidates on a 9-15 month path",
            "New York clinics: candidates available to start immediately.",
          ]}
          cta={{ to: "/clinics", label: "Request candidates" }}
          highlight
        />
      </div>
    </section>
  );
}

function PathCard({
  icon: Icon,
  eyebrow,
  title,
  body,
  bullets,
  cta,
  highlight,
}: {
  icon: typeof Stethoscope;
  eyebrow: string;
  title: string;
  body: string;
  bullets: string[];
  cta: { to: string; label: string };
  highlight?: boolean;
}) {
  return (
    <div
      className={`group relative flex flex-col rounded-3xl border p-8 shadow-sm transition hover:shadow-md sm:p-10 ${
        highlight ? "border-primary bg-card" : "border-border bg-card"
      }`}
    >
      <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-6 w-6" />
      </div>
      <div className="mt-5 text-xs font-semibold uppercase tracking-wide text-accent">
        {eyebrow}
      </div>
      <h3 className="mt-2 text-2xl font-bold tracking-tight">{title}</h3>
      <p className="mt-3 text-muted-foreground">{body}</p>
      <ul className="mt-5 space-y-2 text-sm text-foreground">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <Link
        to={cta.to}
        className="mt-8 inline-flex items-center gap-2 self-start rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
      >
        {cta.label} <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

function Guarantee() {
  return (
    <section className="border-y border-border bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 py-20 text-center lg:flex-row lg:text-left">
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
          <p className="mt-3 text-primary-foreground/80">
            A three-year replacement guarantee, because we only place people we'd bet three years
            on.
          </p>
        </div>
      </div>
    </section>
  );
}

function MidCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid gap-4 rounded-3xl border border-border bg-card p-8 shadow-sm sm:grid-cols-2 sm:p-12">
        <div>
          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">Ready to move?</h3>
          <p className="mt-2 text-muted-foreground">
            Whether you're a veterinarian building a career in the U.S., or a clinic that needs to
            fill a role, start here.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-start gap-3 sm:justify-end">
          <Link
            to="/veterinarios"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-secondary"
          >
            I'm a Veterinarian <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/clinics"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            I'm Hiring <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const items = [
    {
      icon: Users,
      title: "Global sourcing",
      body: "Networks in Mexico and Canada surface only candidates who are already licensed to practice.",
    },
    {
      icon: GraduationCap,
      title: "Credential + license",
      body: "We manage NAVLE prep and state board applications alongside veterinarian mentors.",
    },
    {
      icon: MapPin,
      title: "Visa + relocation",
      body: "TN visa work via independent immigration attorneys, plus relocation logistics.",
    },
    {
      icon: ShieldCheck,
      title: "3-year guarantee",
      body: "If the placement doesn't stick, we replace, no additional placement fee.",
    },
  ];
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What we handle</h2>
          <p className="mt-4 text-muted-foreground">
            End-to-end, so your clinic gets a productive DVM, and our veterinarian gets a career.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Choose your side of the bridge.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
        Whether you're a veterinarian building a career in the U.S., or a clinic that needs to fill
        a role, start here.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/veterinarios"
          className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-6 py-3 text-base font-semibold text-foreground transition hover:bg-secondary"
        >
          <Stethoscope className="h-4 w-4" /> I'm a Veterinarian
        </Link>
        <Link
          to="/clinics"
          className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          <Building2 className="h-4 w-4" /> I'm Hiring
        </Link>
      </div>
    </section>
  );
}
