import type { ReactNode } from "react";

/**
 * Incredible-Health-style positioning band: a soft periwinkle section that
 * fades in from the page background at the top and back out at the bottom,
 * with a centered two-tone heading (navy + amber highlight) and subtext.
 * Place it between light sections so the fade blends seamlessly.
 */
export function PositioningBand({
  before,
  highlight,
  after,
  body,
}: {
  before: ReactNode;
  highlight: ReactNode;
  after?: ReactNode;
  body: ReactNode;
}) {
  return (
    <section
      className="relative"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, oklch(0.9 0.055 264) 24%, oklch(0.9 0.055 264) 76%, transparent 100%)",
      }}
    >
      <div className="mx-auto max-w-3xl px-4 py-28 text-center sm:py-32">
        <h2 className="text-3xl font-bold tracking-tight text-primary sm:text-4xl lg:text-5xl">
          {before}
          <span className="text-accent">{highlight}</span>
          {after}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-primary/70">{body}</p>
      </div>
    </section>
  );
}
