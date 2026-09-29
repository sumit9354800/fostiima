"use client";

import {
  Edit3,
  Eye,
  FileText,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Blog = {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  coverImage: string;
  status: "draft" | "published";
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const loadBlogs = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/admin/blog",
        {
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to load blogs.",
        );
      }

      setBlogs(data.blogs ?? []);
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to load blogs.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadBlogs();
  }, []);

  const deleteBlog = async (blog: Blog) => {
    const confirmed = window.confirm(
      `Delete "${blog.title}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(blog.id);

      const response = await fetch(
        `/api/admin/blog/${blog.id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to delete blog.",
        );
      }

      await loadBlogs();
    } catch (error) {
      console.error(error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete blog.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-full bg-[#f8fafc] px-6 py-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
              Content Management
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#0b2145]">
              Blog
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Create, edit, publish and manage
              FOSTIIMA Business School blog
              articles.
            </p>
          </div>

          <Link
            href="/admin/blog/new"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#123b79] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0e2f62]"
          >
            <Plus size={18} />
            New Blog
          </Link>
        </div>

        {/* Stats */}

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#123b79]/10 text-[#123b79]">
                <FileText size={20} />
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Total Blogs
                </p>

                <p className="mt-1 text-2xl font-bold text-[#0b2145]">
                  {blogs.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Published
            </p>

            <p className="mt-1 text-2xl font-bold text-emerald-600">
              {
                blogs.filter(
                  (blog) =>
                    blog.status ===
                    "published",
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Drafts
            </p>

            <p className="mt-1 text-2xl font-bold text-amber-600">
              {
                blogs.filter(
                  (blog) =>
                    blog.status ===
                    "draft",
                ).length
              }
            </p>
          </div>
        </div>

        {/* Table */}

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <Loader2
                size={28}
                className="animate-spin text-[#123b79]"
              />
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                <FileText
                  size={25}
                  className="text-slate-400"
                />
              </div>

              <h2 className="text-lg font-semibold text-slate-800">
                No blogs yet
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Create your first blog article.
              </p>

              <Link
                href="/admin/blog/new"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#c31e3b] px-4 py-2.5 text-sm font-semibold text-white"
              >
                <Plus size={17} />
                Create Blog
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Blog
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Category
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Author
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {blogs.map((blog) => (
                    <tr
                      key={blog.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                            {blog.coverImage ? (
                              <img
                                src={
                                  blog.coverImage
                                }
                                alt={
                                  blog.title
                                }
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center">
                                <FileText
                                  size={20}
                                  className="text-slate-400"
                                />
                              </div>
                            )}
                          </div>

                          <div className="max-w-[420px]">
                            <p className="font-semibold text-[#123b79]">
                              {blog.title}
                            </p>

                            <p className="mt-1 truncate text-xs text-slate-400">
                              /blog/
                              {
                                blog.slug
                              }
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {blog.category}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {blog.author}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={
                            blog.status ===
                            "published"
                              ? "inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
                              : "inline-flex rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700"
                          }
                        >
                          {blog.status ===
                          "published"
                            ? "Published"
                            : "Draft"}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {blog.status ===
                            "published" && (
                            <Link
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-[#123b79] hover:text-[#123b79]"
                              title="View Blog"
                            >
                              <Eye
                                size={16}
                              />
                            </Link>
                          )}

                          <Link
                            href={`/admin/blog/${blog.id}/edit`}
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-[#123b79] hover:text-[#123b79]"
                            title="Edit Blog"
                          >
                            <Edit3
                              size={16}
                            />
                          </Link>

                          <button
                            type="button"
                            onClick={() =>
                              deleteBlog(
                                blog,
                              )
                            }
                            disabled={
                              deletingId ===
                              blog.id
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                            title="Delete Blog"
                          >
                            {deletingId ===
                            blog.id ? (
                              <Loader2
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              <Trash2
                                size={16}
                              />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}