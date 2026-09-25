import Link from "next/link";

import type { BlogPost } from "@/types/blog";

type BlogCardProps = {
  blog: BlogPost;
};

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col border border-[#dbe3ee] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/30 hover:shadow-[0_18px_45px_rgba(6,26,58,0.10)]">
      {/* Image / Cover */}
      <Link
        href={`/blog/${blog.slug}`}
        className="relative block aspect-[16/9] overflow-hidden bg-[#061a3a]"
      >
        {blog.coverImage ? (
          <img
            src={blog.coverImage}
            alt={blog.coverImageAlt}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            {/* Grid */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* Subtle red glow */}
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#c31e3b]/15 blur-3xl"
            />

            <div className="relative px-7 text-center">
              <div className="mx-auto mb-4 flex items-center justify-center gap-2">
                <span className="h-px w-6 bg-[#e5b83f]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#e5b83f]">
                  FOSTIIMA
                </span>

                <span className="h-px w-6 bg-[#e5b83f]" />
              </div>

              <p className="line-clamp-3 text-xl font-bold leading-tight text-white sm:text-2xl">
                {blog.title}
              </p>
            </div>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category / Date */}
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="border border-[#c31e3b]/20 bg-[#c31e3b]/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#c31e3b]">
            {blog.category}
          </span>

          {blog.publishedAt && (
            <>
              <span className="h-1 w-1 rounded-full bg-[#e5b83f]" />

              <span className="text-md font-medium text-slate-500">
                {blog.publishedAt}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h2 className="line-clamp-2 text-xl font-bold leading-snug text-[#0b2347] transition-colors duration-200 group-hover:text-[#c31e3b]">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h2>

        {/* Excerpt */}
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-600">
          {blog.excerpt}
        </p>

        {/* Bottom */}
        <div className="mt-auto pt-6">
          <div className="mb-5 h-px w-full bg-[#e5eaf1]" />

          <Link
            href={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-[0.08em] text-[#c31e3b] transition-colors duration-200 hover:text-[#061a3a]"
          >
            Read Article

            <span
              aria-hidden="true"
              className="text-base transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
} 