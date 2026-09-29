import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogContent from "@/components/blog/BlogContent";
import { getBlogBySlug } from "@/lib/queries";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

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

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="relative overflow-hidden bg-[#061a3a]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.75) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.75) 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-[#c31e3b]/10 blur-[120px]"
        />

        <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-4xl">
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-[#e5b83f]" />

                <span className="text-md font-bold uppercase tracking-[0.24em] text-[#e5b83f]">
                  {blog.category}
                </span>
              </div>

              {blog.publishedAt && (
                <>
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-[#c31e3b]"
                  />

                  <time
                    dateTime={blog.publishedAt}
                    className="text-sm font-medium text-[#b8c5d8]"
                  >
                    {new Date(
                      blog.publishedAt,
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </>
              )}
            </div>

            <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              {blog.title}
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-[#b8c5d8] sm:text-lg">
              {blog.excerpt}
            </p>

            <p className="mt-7 text-sm font-semibold text-white">
              By{" "}
              <span className="text-[#e5b83f]">
                {blog.author}
              </span>
            </p>
          </div>
        </div>
      </section>

      {blog.coverImage && (
        <section className="mx-auto max-w-5xl px-6 pt-10 sm:px-8 lg:px-10">
          <div className="overflow-hidden border border-[#dbe3ee] bg-white">
            <img
              src={blog.coverImage}
              alt={blog.coverImageAlt}
              className="h-auto max-h-[560px] w-full object-cover"
            />
          </div>
        </section>
      )}

      <section className="mx-auto max-w-5xl px-6 py-12 sm:px-8 sm:py-16 lg:px-10">
        <article className="border border-[#dbe3ee] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <BlogContent content={blog.content} />
        </article>
      </section>
    </main>
  );
}