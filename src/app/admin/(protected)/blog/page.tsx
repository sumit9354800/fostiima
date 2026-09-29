import Link from "next/link";
import { Plus } from "lucide-react";

import { requireAdmin } from "@/lib/admin/require-admin";
import { getAllAdminBlogs } from "@/lib/queries";

export default async function AdminBlogPage() {
  await requireAdmin();

  const blogs = await getAllAdminBlogs();

  return (
    <main className="p-6 lg:p-8">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
            Content Management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#061a3a]">
            Blog
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create and manage website blog articles.
          </p>
        </div>

        <Link
          href="/admin/blog/new"
          className="inline-flex h-11 items-center justify-center gap-2 bg-[#c31e3b] px-5 text-sm font-bold text-white transition hover:bg-[#a91832]"
        >
          <Plus size={18} />
          New Blog
        </Link>
      </div>

      <div className="overflow-hidden border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse">
            <thead>
              <tr className="bg-[#061a3a] text-left text-sm text-white">
                <th className="px-5 py-4">Title</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Updated</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog) => (
                <tr
                  key={blog.id}
                  className="border-t border-slate-200"
                >
                  <td className="px-5 py-4">
                    <p className="font-semibold text-[#061a3a]">
                      {blog.title}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      /blog/{blog.slug}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {blog.category}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={
                        blog.status === "published"
                          ? "inline-flex bg-green-50 px-3 py-1 text-xs font-bold text-green-700"
                          : "inline-flex bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700"
                      }
                    >
                      {blog.status}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500">
                    {blog.updatedAt.toLocaleDateString(
                      "en-IN",
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      href={`/admin/blog/${blog.id}/edit`}
                      className="text-sm font-bold text-[#c31e3b] hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!blogs.length && (
          <div className="px-6 py-16 text-center">
            <p className="font-semibold text-[#061a3a]">
              No blog posts yet.
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Create your first blog post.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}