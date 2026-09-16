import type { Metadata } from "next";

import BlogHero from "@/components/blog/BlogHero";
import BlogGrid from "@/components/blog/BlogGrid";
import { getPublishedBlogs } from "@/data/blog/blogs";

export const metadata: Metadata = {
  title: "Blog | FOSTIIMA Business School",
  description:
    "Explore articles, insights and updates from FOSTIIMA Business School.",
};

export default function BlogPage() {
  const blogs = getPublishedBlogs();

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <BlogHero />

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10 lg:py-20">
        <div className="mb-10 max-w-3xl">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-[#e5b83f]" />

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#e5b83f]">
              Latest Articles
            </p>
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-[#c31e3b] sm:text-4xl">
            Insights from FOSTIIMA
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Discover perspectives and information from the world of
            management education.
          </p>
        </div>

        <BlogGrid blogs={blogs} />
      </section>
    </main>
  );
}