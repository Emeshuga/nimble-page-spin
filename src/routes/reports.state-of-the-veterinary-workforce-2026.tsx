import { createFileRoute, Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { PositioningBand } from "@/components/positioning-band";

const TITLE = "2026 State of the Veterinary Workforce Report";
const DESCRIPTION =
  "How big is the U.S. veterinarian shortage, really? VetBridge USA's 2026 report compiles the latest BLS, AVMA, AAVMC, ICVA, Mars, and Merck data on demand, pay, burnout, the pipeline, and the overlooked cross-border talent supply.";
const URL = "https://www.vetbridgeusa.com/reports/state-of-the-veterinary-workforce-2026";

export const Route = createFileRoute("/reports/state-of-the-veterinary-workforce-2026")({
  head: () => ({
    meta: [
      { title: `${TITLE} | VetBridge USA` },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: URL },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Report",
          headline: TITLE,
          description: DESCRIPTION,
          datePublished: "2026-07-13",
          dateModified: "2026-07-13",
          author: { "@type": "Organization", name: "VetBridge USA", url: "https://www.vetbridgeusa.com" },
          publisher: {
            "@type": "Organization",
            name: "VetBridge USA",
            logo: { "@type": "ImageObject", url: "https://www.vetbridgeusa.com/apple-touch-icon.png" },
          },
          mainEntityOfPage: URL,
        }),
      },
    ],
  }),
  component: Report,
});

/* ---------- building blocks ---------- */

function StatTile({ value, label, source }: { value: string; label: string; source: string }) {
  return (
    <div className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="text-3xl font-bold tracking-tight text-primary sm:text-4xl">{value}</div>
      <div className="mt-2 flex-1 text-sm leading-snug text-foreground">{label}</div>
      <div className="mt-3 text-xs text-muted-foreground">{source}</div>
    </div>
  );
}

function Section({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14 sm:py-16">
      <div className="text-sm font-semibold uppercase tracking-wide text-accent">{kicker}</div>
      <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2>
      <div className="mt-6 space-y-5 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

function SourceLine({ children }: { children: ReactNode }) {
  return <p className="!mt-4 text-xs text-muted-foreground/80">Sources: {children}</p>;
}

function Src({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-border underline-offset-2 hover:text-foreground"
    >
      {children}
    </a>
  );
}

/**
 * Single-series vertical bar chart, direct-labeled on every bar (few marks),
 * native SVG <title> tooltips, fills from the site design tokens.
 */
function BarChart({
  data,
  unit,
  ariaLabel,
  yMax,
}: {
  data: { label: string; value: number; note?: string }[];
  unit: string;
  ariaLabel: string;
  yMax: number;
}) {
  const W = 560;
  const H = 240;
  const padX = 16;
  const padTop = 30;
  const padBottom = 34;
  const plotH = H - padTop - padBottom;
  const band = (W - padX * 2) / data.length;
  const barW = Math.min(72, band * 0.55);
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={ariaLabel}
      className="mt-6 w-full max-w-xl"
    >
      {/* baseline */}
      <line
        x1={padX}
        y1={H - padBottom}
        x2={W - padX}
        y2={H - padBottom}
        stroke="var(--color-border)"
        strokeWidth="1"
      />
      {data.map((d, i) => {
        const h = Math.max(4, (d.value / yMax) * plotH);
        const x = padX + band * i + (band - barW) / 2;
        const y = H - padBottom - h;
        return (
          <g key={d.label}>
            <title>{`${d.label}: ${d.value.toLocaleString("en-US")}${unit}${d.note ? ` (${d.note})` : ""}`}</title>
            <rect x={x} y={y} width={barW} height={h} rx="4" fill="var(--color-primary)" />
            {/* square off the bottom corners so bars anchor to the baseline */}
            <rect x={x} y={H - padBottom - 4} width={barW} height={4} fill="var(--color-primary)" />
            <text
              x={x + barW / 2}
              y={y - 8}
              textAnchor="middle"
              className="fill-foreground"
              fontSize="14"
              fontWeight="600"
            >
              {d.value.toLocaleString("en-US")}
              {unit}
            </text>
            <text
              x={x + barW / 2}
              y={H - padBottom + 20}
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize="12"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- page ---------- */

function Report() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="print:hidden">
        <SiteHeader />
      </div>

      {/* Hero */}
      <section className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:py-24">
          <div className="text-sm font-semibold uppercase tracking-wide text-accent">
            VetBridge USA Research
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
            2026 State of the Veterinary Workforce
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Demand for veterinary care keeps climbing while the profession argues about whether
            the shortage is temporary or structural. This report compiles the latest public data
            on demand, pay, burnout, the education pipeline, and the one supply channel almost
            nobody is measuring: internationally trained veterinarians.
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            Published July 2026 · Every figure cited to its primary source · Free to reference
            with attribution and a link
          </p>
          <div className="mt-7 flex flex-wrap gap-3 print:hidden">
            <a
              href="/vetbridge-2026-state-of-the-veterinary-workforce.pdf"
              download
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Download the report (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Key findings */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Key findings</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatTile
            value="133,475"
            label="U.S. veterinarians in 2025, and roughly 69% are women."
            source="AVMA, 2025"
          />
          <StatTile
            value="$158B"
            label="U.S. pet industry spending in 2025, projected to reach $165B in 2026."
            source="APPA, 2025"
          />
          <StatTile
            value="$125,510"
            label="Median annual pay for veterinarians as of May 2024."
            source="U.S. Bureau of Labor Statistics"
          />
          <StatTile
            value="14,000–24,000"
            label="Projected companion-animal veterinarian shortfall by 2030 in the Mars Veterinary Health analysis. A newer AVMA-commissioned study disputes it."
            source="Mars Veterinary Health, 2023"
          />
          <StatTile
            value="~50%"
            label="Share of veterinarians reporting burnout, a figure that has stayed high across three study cycles."
            source="Merck Animal Health Wellbeing Study, 2024"
          />
          <StatTile
            value="282/yr"
            label="Average number of foreign-trained veterinarians passing the NAVLE each year over the past decade. The overlooked supply lever."
            source="AAVMC, 2024"
          />
        </div>
      </section>

      {/* 1. Demand */}
      <Section kicker="Part 1" title="Demand for veterinary care has never been higher">
        <p>
          Pet ownership in the United States reached a new high in 2025: 95 million households,
          about 71% of the country, now own a pet. Total industry spending hit $158 billion in
          2025 and is projected to reach $165 billion in 2026. Veterinary care is the single
          largest slice of that wallet after food, at 32.4% of household pet spending, and the
          average pet-owning household reported spending about $1,700 on their pets in 2025,
          roughly $200 more than in the previous two years.
        </p>
        <p>
          Demand is also compounding faster than the customer base itself. The Mars Veterinary
          Health workforce analysis found pet-owning households growing about 1.5% per year while
          demand for pet healthcare services grows about 6.1% per year. People are not just
          getting more pets. They are treating the pets they have like family members, and buying
          more care per animal.
        </p>
        <SourceLine>
          <Src href="https://americanpetproducts.org/industry-trends-and-stats">APPA industry statistics</Src>,{" "}
          <Src href="https://www.avma.org/news/evolving-pet-owner-economics-what-data-reveal-veterinary-teams">AVMA pet-owner economics</Src>,{" "}
          <Src href="https://www.marsveterinary.com/media/uploads/2023/08/Characterizing-the-Need.pdf">Mars Veterinary Health</Src>
        </SourceLine>
      </Section>

      {/* 2. Workforce */}
      <Section kicker="Part 2" title="The workforce serving that demand">
        <p>
          The AVMA counts 133,475 U.S. veterinarians as of 2025. The profession is now roughly
          69% female (91,889 women to 40,595 men), one of the most complete gender shifts of any
          doctoral profession. Most veterinarians work in companion-animal practice, with smaller
          segments in mixed, equine, food-animal, and laboratory-animal medicine.
        </p>
        <p>
          Pay reflects the demand. The Bureau of Labor Statistics puts the median annual wage at
          $125,510 as of May 2024, and projects employment of veterinarians to grow 10% from 2024
          to 2034, much faster than the average across all occupations, with about 3,000 openings
          projected each year over the decade.
        </p>
        <SourceLine>
          <Src href="https://www.avma.org/resources-tools/reports-statistics/market-research-statistics-us-veterinarians">AVMA U.S. veterinarian numbers</Src>,{" "}
          <Src href="https://www.bls.gov/ooh/healthcare/veterinarians.htm">BLS Occupational Outlook Handbook</Src>
        </SourceLine>
      </Section>

      {/* 3. Shortage debate */}
      <Section kicker="Part 3" title="Is there actually a shortage? The honest answer: it's contested">
        <p>
          The most cited forecast comes from a 2023 analysis for Mars Veterinary Health by
          economist Dr. James Lloyd: the U.S. could need up to 55,000 additional veterinarians by
          2030, with a projected shortfall of 14,000 to 24,000 companion-animal veterinarians,
          roughly 11% to 18% of the need. More than 12,500 companion-animal veterinarians are
          expected to retire by 2030, and the widely quoted implication is that up to 75 million
          pets could lack access to care by the end of the decade.
        </p>
        <p>
          In late 2024, a workforce study by Brakke Consulting commissioned by the AVMA pushed
          back: it projects that existing and planned veterinary colleges will keep supply roughly
          in line with demand through 2035, with no dire shortage or excess. Its key assumption is
          that demand growth normalizes after the pandemic-era spike, and it notes that supply of
          companion-animal veterinarians is now growing faster than pet-owning households.
        </p>
        <p>
          Both can be partly right. The optimistic view depends on demand cooling and on 13
          proposed new veterinary schools all reaching accreditation. And even the AVMA-commissioned
          study does not claim the pain is over today: clinics in rural areas, food-animal
          medicine, and shelter medicine face acute gaps that national averages hide, and any
          practice owner who has run a DVM job posting in the last three years has felt how thin
          the applicant pool is right now. Whichever forecast proves closer for 2030, the hiring
          market of 2026 is still severely supply-constrained.
        </p>
        <SourceLine>
          <Src href="https://marsveterinary.com/tackling-the-veterinary-professional-shortage/">Mars Veterinary Health</Src>,{" "}
          <Src href="https://www.avma.org/news/no-dire-shortage-veterinarians-anticipated-coming-years">AVMA / Brakke Consulting</Src>
        </SourceLine>
      </Section>

      {/* 4. Pipeline */}
      <Section kicker="Part 4" title="The pipeline is growing, but it leaks">
        <p>
          The education pipeline is expanding at a record pace. First-year seats at U.S.
          veterinary colleges passed 4,000 for the first time in the 2022-23 school year, up
          37.7% from a decade earlier, and 13 proposed new schools would add nearly 40% more
          capacity within ten years if all are accredited. But the Brakke study itself estimates
          that by 2035 only about 4% of practicing veterinarians would have graduated from those
          new schools. New capacity arrives slowly.
        </p>
        <BarChart
          ariaLabel="First-year veterinary school seats in the United States: 2,938 in 2012-13 versus 4,047 in 2022-23"
          unit=""
          yMax={4500}
          data={[
            { label: "2012-13", value: 2938 },
            { label: "2022-23", value: 4047, note: "+37.7% in a decade" },
          ]}
        />
        <p>
          Meanwhile the licensing exam has become a tighter valve. The NAVLE composite pass rate
          fell from 95% in 2020 to 86% in 2023, a three-year slide the profession has struggled
          to explain, before recovering slightly to 88% in 2024. Every point below the historical
          norm is a class of would-be doctors delayed at the door.
        </p>
        <BarChart
          ariaLabel="NAVLE composite pass rate: 95 percent in 2020, 86 percent in 2023, 88 percent in 2024"
          unit="%"
          yMax={100}
          data={[
            { label: "2020", value: 95 },
            { label: "2023", value: 86 },
            { label: "2024", value: 88, note: "first uptick after a three-year slide" },
          ]}
        />
        <p>
          The pipeline also leaks at the far end. Roughly half of veterinarians report burnout,
          a rate that has stayed stubbornly high across three cycles of the Merck Animal Health
          Veterinary Wellbeing Study, which estimates burnout costs the profession about $1.93
          billion per year. Support-staff turnover exceeds 30% annually in many markets, which
          pushes more load onto the doctors who remain.
        </p>
        <SourceLine>
          <Src href="https://www.avma.org/news/us-veterinary-colleges-increase-seats-accelerating-rate">AVMA on college seats</Src>,{" "}
          <Src href="https://news.vin.com/doc/?id=12516859">VIN News on NAVLE pass rates</Src>,{" "}
          <Src href="https://www.merck-animal-health-usa.com/about-us/veterinary-wellbeing-and-scholarships/veterinary-wellbeing-study-iii/">Merck Animal Health Wellbeing Study</Src>
        </SourceLine>
      </Section>

      <PositioningBand
        before="Every fix on the table takes a decade. "
        highlight="Except one."
        body="New schools graduate their first classes years from now. The third lever is veterinarians who are already trained, already examined to the same standard, and already legal to hire under a treaty most clinics have never used."
      />

      {/* 5. Cross-border */}
      <Section kicker="Part 5" title="The overlooked supply: internationally trained veterinarians">
        <p>
          Here is the number that should get more attention: over the past decade, an average of
          just 282 foreign-trained veterinarians passed the NAVLE each year. The AVMA's ECFVG
          equivalency program certified 168 international graduates in 2022, from 41 countries.
          Against a projected gap measured in the tens of thousands, the international channel is
          running at a rounding error, not because the talent does not exist, but because the
          path is slow and poorly understood.
        </p>
        <p>
          The structural pieces are already in place. Veterinarian is a listed profession under
          the USMCA's TN visa, which has no annual cap and no lottery, is issued in three-year
          renewable increments, and is available to citizens of Mexico and Canada. All five
          Canadian veterinary schools are AVMA-accredited, and many licensed Canadian
          veterinarians have already passed the NAVLE, the same exam U.S. graduates take. In
          Mexico, the national university UNAM held full AVMA accreditation from 2011 through
          2025, which means its graduates from that window are recognized as accredited-school
          graduates: a finite, credentialed pool that can move to U.S. licensure without the
          multi-year equivalency process other international graduates face.
        </p>
        <p>
          No serious analysis claims cross-border recruiting alone closes a five-figure gap. But
          it is the only supply lever that operates in months instead of years, and it is
          available to any clinic today.
        </p>
        <SourceLine>
          <Src href="https://aavmc.org/wp-content/uploads/2024/06/Demand-for-and-Supply-of-Veterinarians-in-the-U.S.-to-2032-New.pdf">AAVMC supply and demand study</Src>,{" "}
          <Src href="https://www.avma.org/education/educational-commission-foreign-veterinary-graduates">AVMA ECFVG</Src>,{" "}
          <Src href="https://www.avma.org/education/center-for-veterinary-accreditation/accredited-veterinary-colleges">AVMA accredited colleges list</Src>
        </SourceLine>
      </Section>

      {/* 6. Outlook */}
      <Section kicker="Part 6" title="What we expect for the rest of 2026">
        <p>
          Four things worth watching. First, demand keeps compounding: APPA projects industry
          spending to reach $165 billion in 2026, and veterinary care has been taking a growing
          share of it. Second, the NAVLE recovery is fragile: one year of improvement after a
          three-year slide is a data point, not a trend. Third, new-school capacity will not
          meaningfully arrive before the 2030s, so the 2026 hiring market stays supply-constrained
          regardless of which long-range forecast wins. Fourth, the UNAM accreditation window
          closed at the end of 2025, which makes the existing pool of accredited-window Mexican
          graduates a fixed asset: it can only shrink as those veterinarians are hired.
        </p>
        <p>
          We will update this report annually, and future editions will add VetBridge USA's own
          placement and candidate data as our marketplace grows.
        </p>
      </Section>

      {/* Methodology */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:py-16">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Methodology and sources</h2>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          This report synthesizes publicly available data published between 2023 and 2026 by the
          U.S. Bureau of Labor Statistics, the American Veterinary Medical Association, the
          American Association of Veterinary Medical Colleges, the International Council for
          Veterinary Assessment, the American Pet Products Association, Mars Veterinary Health,
          and Merck Animal Health. Where sources disagree, both positions are presented. No
          figures are VetBridge USA estimates. You are welcome to cite this report with
          attribution and a link to this page.
        </p>
        <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
          <li><Src href="https://www.bls.gov/ooh/healthcare/veterinarians.htm">BLS Occupational Outlook Handbook: Veterinarians</Src></li>
          <li><Src href="https://www.avma.org/resources-tools/reports-statistics/market-research-statistics-us-veterinarians">AVMA: U.S. veterinarian numbers (2025)</Src></li>
          <li><Src href="https://www.avma.org/news/no-dire-shortage-veterinarians-anticipated-coming-years">AVMA: Brakke Consulting workforce study (2024)</Src></li>
          <li><Src href="https://marsveterinary.com/tackling-the-veterinary-professional-shortage/">Mars Veterinary Health: Tackling the veterinary professional shortage (2023)</Src></li>
          <li><Src href="https://www.avma.org/news/us-veterinary-colleges-increase-seats-accelerating-rate">AVMA: U.S. veterinary colleges increase seats (AAVMC data)</Src></li>
          <li><Src href="https://news.vin.com/doc/?id=12516859">VIN News: NAVLE pass rates ticked up in 2024</Src></li>
          <li><Src href="https://www.merck-animal-health-usa.com/about-us/veterinary-wellbeing-and-scholarships/veterinary-wellbeing-study-iii/">Merck Animal Health: Veterinary Wellbeing Study III</Src></li>
          <li><Src href="https://americanpetproducts.org/industry-trends-and-stats">APPA: Pet industry market size and statistics (2025-2026)</Src></li>
          <li><Src href="https://aavmc.org/wp-content/uploads/2024/06/Demand-for-and-Supply-of-Veterinarians-in-the-U.S.-to-2032-New.pdf">AAVMC: Demand for and supply of veterinarians in the U.S. to 2032</Src></li>
          <li><Src href="https://www.avma.org/education/educational-commission-foreign-veterinary-graduates">AVMA: ECFVG program</Src></li>
        </ul>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-secondary/40 print:hidden">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Hiring in this market?
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
            VetBridge USA places licensed veterinarians from Mexico and Canada into U.S. clinics,
            coordinating licensing, the TN visa (through independent immigration attorneys), and
            relocation, backed by a 3-year replacement guarantee.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/clinics"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Request Candidates <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/blog"
              className="inline-flex items-center rounded-md border border-border bg-card px-6 py-3 text-sm font-medium transition hover:bg-secondary"
            >
              Read our guides
            </Link>
          </div>
        </div>
      </section>

      <div className="print:hidden">
        <SiteFooter />
      </div>
      <div className="hidden border-t border-border px-4 py-6 text-center text-xs text-muted-foreground print:block">
        2026 State of the Veterinary Workforce · VetBridge USA · www.vetbridgeusa.com · Cite with
        attribution and a link
      </div>
    </div>
  );
}
