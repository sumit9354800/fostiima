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
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0b3b91]">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#c31e3b]/30 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-blue-400/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-4xl">
            <div className="mb-5 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-white/10 px-3 py-1.5 font-semibold text-blue-100 backdrop-blur-sm">
                {blog.category}
              </span>

              {blog.publishedAt && (
                <span className="text-blue-200">{blog.publishedAt}</span>
              )}
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {blog.title}
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-blue-100 sm:text-lg">
              {blog.excerpt}
            </p>

            <p className="mt-6 text-sm font-medium text-blue-200">
              By {blog.author}
            </p>
          </div>
        </div>
      </section>

      {/* Article */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
          <BlogContent content={blog.content} />
        </article>
      </section>
    </main>
  );
}