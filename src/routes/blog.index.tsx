import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BarChart3, Building2, Stethoscope } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { POSTS, CATEGORIES, formatDate } from "@/lib/blog";
import type { BlogCategory } from "@/lib/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "VetBridge USA Blog | Working as a Veterinarian in the U.S." },
      {
        name: "description",
        content:
          "Guides on veterinary licensing, the NAVLE, the TN visa, and building a veterinary career in the United States as an international DVM.",
      },
    ],
  }),
  component: Blog,
});

/** Branded thumbnail treatment per category: gradient + icon, no stock photos. */
const THUMB: Record<BlogCategory, { icon: LucideIcon; bg: string }> = {
  Research: {
    icon: BarChart3,
    bg: "linear-gradient(135deg, oklch(0.38 0.14 250), oklch(0.62 0.11 264))",
  },
  "For clinics": {
    icon: Building2,
    bg: "linear-gradient(135deg, oklch(0.62 0.11 264), oklch(0.72 0.15 55))",
  },
  "For veterinarians": {
    icon: Stethoscope,
    bg: "linear-gradient(135deg, oklch(0.3 0.1 250), oklch(0.72 0.15 55))",
  },
};

type Filter = "All posts" | BlogCategory;

function Blog() {
  const [filter, setFilter] = useState<Filter>("All posts");
  const posts = filter === "All posts" ? POSTS : POSTS.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="bg-secondary/40">
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Blog</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Guides and research on licensing, the NAVLE, the TN visa, and hiring across the
            border.
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <nav className="rounded-2xl border border-border bg-card p-3 shadow-sm">
                {(["All posts", ...CATEGORIES] as Filter[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setFilter(c)}
                    className={`block w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition ${
                      filter === c
                        ? "bg-secondary text-primary"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </nav>

              <Link
                to="/reports/state-of-the-veterinary-workforce-2026"
                className="group block rounded-2xl border border-primary/15 p-5 shadow-sm transition hover:shadow-md"
                style={{ background: "oklch(0.9 0.055 264)" }}
              >
                <div className="text-xs font-bold uppercase tracking-wide text-accent">
                  Featured research
                </div>
                <div className="mt-2 text-base font-bold leading-snug tracking-tight text-primary">
                  2026 State of the Veterinary Workforce
                </div>
                <p className="mt-2 text-sm leading-relaxed text-primary/70">
                  The demand, pay, burnout, and pipeline data behind the shortage, fully cited.
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:underline">
                  Read the report <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </aside>

            {/* Post list */}
            <div className="space-y-6">
              {posts.map((post) => {
                const t = THUMB[post.category];
                const Icon = t.icon;
                return (
                  <Link
                    key={post.slug}
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="group flex gap-5 rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:shadow-md sm:gap-6 sm:p-5"
                  >
                    {post.thumb ? (
                      <img
                        src={post.thumb}
                        alt=""
                        loading="lazy"
                        className="h-24 w-24 shrink-0 rounded-xl object-cover sm:h-28 sm:w-28"
                      />
                    ) : (
                      <div
                        className="grid h-24 w-24 shrink-0 place-items-center rounded-xl sm:h-28 sm:w-28"
                        style={{ background: t.bg }}
                      >
                        <Icon className="h-9 w-9 text-white/90" strokeWidth={1.75} />
                      </div>
                    )}
                    <div className="min-w-0 py-1">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-muted-foreground">
                        <span>{formatDate(post.date)}</span>
                        <span className="rounded-full bg-secondary px-2.5 py-0.5 text-primary">
                          {post.category}
                        </span>
                        <span>{post.readMinutes} min read</span>
                      </div>
                      <h2 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-primary group-hover:underline sm:text-xl">
                        {post.title}
                      </h2>
                      <p className="mt-1.5 hidden text-sm leading-relaxed text-muted-foreground sm:line-clamp-2 sm:block">
                        {post.excerpt}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      <SiteFooter />
    </div>
  );
}
