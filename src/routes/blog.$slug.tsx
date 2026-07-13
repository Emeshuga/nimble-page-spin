import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-header";
import { getPost, formatDate } from "@/lib/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | VetBridge USA` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "VetBridge USA Blog" }],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: loaderData.title,
              description: loaderData.excerpt,
              datePublished: loaderData.date,
              dateModified: loaderData.date,
              author: { "@type": "Organization", name: "VetBridge USA" },
              publisher: {
                "@type": "Organization",
                name: "VetBridge USA",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.vetbridgeusa.com/apple-touch-icon.png",
                },
              },
              mainEntityOfPage: `https://www.vetbridgeusa.com/blog/${loaderData.slug}`,
            }),
          },
        ]
      : [],
  }),
  component: Post,
});

function Post() {
  const post = Route.useLoaderData();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
        <Link
          to="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> All articles
        </Link>
        <div className="mt-6 text-sm font-medium text-muted-foreground">
          {formatDate(post.date)} · {post.readMinutes} min read
        </div>
        <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{post.title}</h1>
        <div className="mt-8 space-y-5">
          {post.body.map((block, i) =>
            block.startsWith("## ") ? (
              <h2 key={i} className="pt-4 text-xl font-semibold tracking-tight sm:text-2xl">
                {block.slice(3)}
              </h2>
            ) : (
              <p key={i} className="leading-relaxed text-muted-foreground">
                {block}
              </p>
            ),
          )}
        </div>

        {post.cta ? (
          <Link
            to={post.cta.href}
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            {post.cta.label} <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}

        <div className="mt-12 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
          <h3 className="text-lg font-semibold">Ready to take the next step?</h3>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              to="/veterinarios"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Evalúa tu Perfil <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/clinics"
              className="inline-flex items-center rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium transition hover:bg-secondary"
            >
              I'm hiring
            </Link>
          </div>
        </div>
      </article>
      <SiteFooter />
    </div>
  );
}
