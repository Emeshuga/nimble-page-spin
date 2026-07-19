import { createFileRoute, Link } from "@tanstack/react-router";
import { Stethoscope, ShieldCheck, Globe2, HeartHandshake, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { PositioningBand } from "@/components/positioning-band";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About VetBridge USA | Bridging Veterinary Talent and U.S. Clinics" },
      {
        name: "description",
        content:
          "VetBridge USA connects licensed international veterinarians from Mexico and Canada with understaffed U.S. clinics, coordinating licensing, TN visa, and relocation end-to-end.",
      },
    ],
  }),
  component: About,
});

function About() {
  const values = [
    {
      icon: Globe2,
      title: "A real bridge, both ways",
      body: "The U.S. faces a severe veterinarian shortage while thousands of skilled DVMs in Mexico and Canada are ready to practice. We connect the two.",
    },
    {
      icon: ShieldCheck,
      title: "Legitimate pathways only",
      body: "We work within AVMA accreditation, the NAVLE, state licensing boards, and the USMCA TN visa. No shortcuts, no false promises.",
    },
    {
      icon: HeartHandshake,
      title: "End-to-end support",
      body: "From evaluation to first shift and beyond, exam prep, licensing, visa (via independent attorneys), relocation, and post-placement support.",
    },
  ];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-4 py-20 sm:py-24">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
          <Stethoscope className="h-3.5 w-3.5 text-accent" /> About us
        </div>
        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
          We bridge licensed veterinary talent with the U.S. clinics that need them.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          VetBridge USA connects experienced veterinarians from Mexico and Canada with veterinary
          clinics and hospitals across the United States. We coordinate the entire journey -
          credential evaluation, NAVLE preparation, state licensing, the TN visa (handled by
          independent immigration attorneys, we are not a law firm), relocation, and ongoing support
          once our veterinarians are working.
        </p>
      </section>

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, body }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-20">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          The accreditation behind us
        </h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Canadian veterinary schools are accredited by the AVMA Council on Education, and graduates
          of the FMVZ-UNAM during its AVMA accreditation period (2011-2025) are recognized as
          graduates of an accredited school. Combined with the NAVLE (administered by the ICVA) and
          the USMCA TN visa category for veterinarians, this creates legitimate, well-defined
          pathways for international DVMs to practice in the United States. Eligibility is always
          confirmed individually against current official requirements.
        </p>
      </section>

      {/*
        PLACEHOLDER, TEAM / FOUNDERS SECTION (to fill in later).
        Add founder names, photos, and credentials here once finalized.
      */}

      <PositioningBand
        before="The talent was never the problem. "
        highlight="The paperwork was."
        body="VetBridge exists to remove the licensing, visa, and relocation barriers between qualified veterinarians and the U.S. clinics that need them."
      />

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Whether you're hiring or looking to practice in the U.S., start here.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/veterinarios"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
            >
              I'm a Veterinarian <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/clinics"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition hover:bg-secondary"
            >
              I'm Hiring
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Questions?{" "}
            <a href={`mailto:${SITE.emailGeneral}`} className="text-primary underline">
              {SITE.emailGeneral}
            </a>
          </p>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
