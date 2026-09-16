import type { BlogPost } from "@/types/blog";
import BlogCard from "./BlogCard";

type BlogGridProps = {
  blogs: BlogPost[];
};

export default function BlogGrid({ blogs }: BlogGridProps) {
  if (blogs.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm">
        <p className="text-base font-medium text-slate-600">
          No blog articles are available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
}