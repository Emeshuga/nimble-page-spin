import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { POSTS, formatDate } from "@/lib/blog";

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

function Blog() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-4 py-20 sm:py-24">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Guides and answers on licensing, the NAVLE, the TN visa, and building a veterinary career
          in the United States.
        </p>
        <Link
          to="/reports/state-of-the-veterinary-workforce-2026"
          className="group mt-10 flex flex-col rounded-2xl border border-primary/20 bg-secondary/50 p-7 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <div className="text-xs font-semibold uppercase tracking-wide text-accent">
              Featured research
            </div>
            <h2 className="mt-2 text-xl font-semibold leading-snug text-primary group-hover:underline">
              2026 State of the Veterinary Workforce Report
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              The demand, pay, burnout, pipeline, and cross-border supply data behind the
              veterinarian shortage, compiled from BLS, AVMA, AAVMC, ICVA, Mars, and Merck
              sources.
            </p>
          </div>
          <span className="mt-4 inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-primary sm:mt-0 sm:pl-6">
            Read the report <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {POSTS.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm transition hover:shadow-md"
            >
              <div className="text-xs font-medium text-muted-foreground">
                {formatDate(post.date)} · {post.readMinutes} min read
              </div>
              <h2 className="mt-3 text-xl font-semibold leading-snug group-hover:text-primary">
                {post.title}
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Read more <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
