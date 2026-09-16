import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogContent from "@/components/blog/BlogContent";
import { getBlogBySlug, getPublishedBlogs } from "@/data/blog/blogs";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getPublishedBlogs().map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found | FOSTIIMA Business School",
    };
  }

  return {
    title: blog.seo.metaTitle,
    description: blog.seo.metaDescription,
    keywords: blog.seo.keywords,
  };
}

export default async function BlogDetailPage({
  params,
}: BlogDetailPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#061a3a]">
        {/* Subtle Background Grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.75) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        {/* Subtle Ambient Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#c31e3b]/10 blur-[120px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-48 left-1/3 h-[420px] w-[420px] rounded-full bg-[#183f78]/20 blur-[100px]"
        />

        <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            {/* Category + Date */}
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#e5b83f]" />

                <span className="text-xs font-bold uppercase tracking-[0.24em] text-[#e5b83f]">
                  {blog.category}
                </span>
              </div>

              {blog.publishedAt && (
                <>
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-[#c31e3b]"
                  />

                  <span className="text-sm font-medium text-[#b8c5d8]">
                    {blog.publishedAt}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {blog.title}
            </h1>

            {/* Excerpt */}
            <p className="mt-7 max-w-3xl text-base leading-8 text-[#b8c5d8] sm:text-lg">
              {blog.excerpt}
            </p>

            {/* Author */}
            <p className="mt-7 text-sm font-semibold text-white">
              By{" "}
              <span className="text-[#e5b83f]">
                {blog.author}
              </span>
            </p>

            {/* Accent Line */}
            <div className="mt-10 h-px w-full max-w-3xl bg-[#1d3559]" />
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
        <article className="border border-[#dbe3ee] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <BlogContent content={blog.content} />
        </article>
      </section>
    </main>
  );
}