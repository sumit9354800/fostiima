import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogContent from "@/components/blog/BlogContent";
import { getBlogBySlug } from "@/lib/queries";
import Link from "next/link";

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

      {/* Blog Content — Updated alignment and spacing */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <article
          aria-label={blog.title}
          className="w-full min-w-0 border border-[#dbe3ee] bg-white p-5 shadow-[0_8px_35px_rgba(6,26,58,0.04)] sm:p-8 md:p-10 lg:p-12"
        >
          <div className="w-full min-w-0 text-justify [overflow-wrap:anywhere] [&_p]:my-5 [&_p]:text-base [&_p]:leading-8 [&_p]:text-slate-700 [&_h2]:mb-5 [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:text-[#20477f] [&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:leading-snug [&_h3]:text-[#20477f] [&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_li]:pl-1 [&_li]:leading-8 [&_img]:my-8 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-lg [&_blockquote]:my-8 [&_blockquote]:border-l-4 [&_blockquote]:border-[#c31e3b] [&_blockquote]:pl-5 [&_blockquote]:italic [&_a]:font-medium [&_a]:text-[#c31e3b] [&_a]:underline [&_strong]:font-bold">
            <BlogContent content={blog.content} />
          </div>
        </article>

        {/* Back to Blog */}
        <div className="mt-8 flex flex-col gap-4 border border-[#e2e8f0] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="font-semibold text-[#061a3a]">
              Want to read more?
            </p>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Explore more insights from FOSTIIMA Business School.
            </p>
          </div>

          <Link
            href="/blog"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 bg-[#c31e3b] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#a91932] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c31e3b] focus-visible:ring-offset-2"
          >
            Explore All Blogs
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}