"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  GripVertical,
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";

type BlockType = "heading" | "paragraph";

type BlogBlock = {
  id: string;
  type: BlockType;
  content: string;
  level?: 2 | 3;
};

type FormState = {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  status: "draft" | "published";
  metaTitle: string;
  metaDescription: string;
  keywords: string;
};

type BlogEditorProps = {
  mode: "create" | "edit";
  blogId?: string;
  initialData?: {
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    coverImage: string;
    coverImageAlt: string;
    author: string;
    status: "draft" | "published";
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    blocks: BlogBlock[];
  };
};

const EMPTY_FORM: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  category: "",
  coverImage: "",
  coverImageAlt: "",
  author: "FOSTIIMA Business School",
  status: "draft",
  metaTitle: "",
  metaDescription: "",
  keywords: "",
};

const EMPTY_BLOCK = (): BlogBlock => ({
  id: crypto.randomUUID(),
  type: "paragraph",
  content: "",
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function BlogEditor({
  mode,
  blogId,
  initialData,
}: BlogEditorProps) {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(() => {
    if (!initialData) {
      return EMPTY_FORM;
    }

    return {
      title: initialData.title,
      slug: initialData.slug,
      excerpt: initialData.excerpt,
      category: initialData.category,
      coverImage: initialData.coverImage,
      coverImageAlt: initialData.coverImageAlt,
      author: initialData.author,
      status: initialData.status,
      metaTitle: initialData.metaTitle,
      metaDescription: initialData.metaDescription,
      keywords: initialData.keywords.join(", "),
    };
  });

  const [blocks, setBlocks] = useState<BlogBlock[]>(
    initialData?.blocks?.length
      ? initialData.blocks
      : [EMPTY_BLOCK()],
  );

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const updateField = <K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleTitleChange = (value: string) => {
    setForm((previous) => ({
      ...previous,
      title: value,

      slug:
        mode === "create"
          ? slugify(value)
          : previous.slug,
    }));
  };

  const updateBlock = (
    id: string,
    field: keyof BlogBlock,
    value: string | number,
  ) => {
    setBlocks((previous) =>
      previous.map((block) =>
        block.id === id
          ? {
              ...block,
              [field]: value,
            }
          : block,
      ),
    );
  };

  const addBlock = (type: BlockType) => {
    setBlocks((previous) => [
      ...previous,
      {
        ...EMPTY_BLOCK(),
        type,
        level:
          type === "heading"
            ? 2
            : undefined,
      },
    ]);
  };

  const removeBlock = (id: string) => {
    setBlocks((previous) => {
      if (previous.length === 1) {
        return previous;
      }

      return previous.filter(
        (block) => block.id !== id,
      );
    });
  };

  const moveBlock = (
    index: number,
    direction: "up" | "down",
  ) => {
    setBlocks((previous) => {
      const newBlocks = [...previous];

      const targetIndex =
        direction === "up"
          ? index - 1
          : index + 1;

      if (
        targetIndex < 0 ||
        targetIndex >= newBlocks.length
      ) {
        return previous;
      }

      [
        newBlocks[index],
        newBlocks[targetIndex],
      ] = [
        newBlocks[targetIndex],
        newBlocks[index],
      ];

      return newBlocks;
    });
  };

  const uploadCoverImage = async (
    file: File,
  ) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);
      formData.append(
        "destination",
        "cloudinary",
      );

      const response = await fetch(
        "/api/admin/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to upload image.",
        );
      }

      if (!data?.url) {
        throw new Error(
          "Upload completed but image URL was not returned.",
        );
      }

      updateField("coverImage", data.url);
    } catch (error) {
      console.error(
        "[BLOG_IMAGE_UPLOAD]",
        error,
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to upload image.",
      );
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (saving || uploading) {
      return;
    }

    if (!form.title.trim()) {
      alert("Title is required.");
      return;
    }

    if (!form.slug.trim()) {
      alert("Slug is required.");
      return;
    }

    if (!form.excerpt.trim()) {
      alert("Excerpt is required.");
      return;
    }

    if (!form.category.trim()) {
      alert("Category is required.");
      return;
    }

    if (!form.coverImage.trim()) {
      alert("Cover image is required.");
      return;
    }

    const cleanBlocks = blocks
      .filter(
        (block) =>
          block.content.trim().length > 0,
      )
      .map((block) => ({
        type: block.type,
        content: block.content.trim(),
        level:
          block.type === "heading"
            ? block.level || 2
            : undefined,
      }));

    if (!cleanBlocks.length) {
      alert(
        "Please add at least one content block.",
      );
      return;
    }

    try {
      setSaving(true);

      const payload = {
        title: form.title.trim(),
        slug: form.slug.trim(),
        excerpt: form.excerpt.trim(),
        category: form.category.trim(),
        coverImage: form.coverImage.trim(),
        coverImageAlt:
          form.coverImageAlt.trim() ||
          form.title.trim(),
        author:
          form.author.trim() ||
          "FOSTIIMA Business School",
        status: form.status,

        metaTitle:
          form.metaTitle.trim() || null,

        metaDescription:
          form.metaDescription.trim() || null,

        keywords: form.keywords
          .split(",")
          .map((keyword) => keyword.trim())
          .filter(Boolean),

        blocks: cleanBlocks,
      };

      const url =
        mode === "create"
          ? "/api/admin/blog"
          : `/api/admin/blog/${blogId}`;

      const response = await fetch(url, {
        method:
          mode === "create"
            ? "POST"
            : "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Failed to save blog.",
        );
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      console.error(
        "[BLOG_SAVE]",
        error,
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to save blog.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-full bg-[#f8fafc] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}

        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/admin/blog"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#123b79]"
            >
              <ArrowLeft size={16} />
              Back to Blogs
            </Link>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
              Blog Management
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#0b2145]">
              {mode === "create"
                ? "Create New Blog"
                : "Edit Blog"}
            </h1>
          </div>

          <button
            type="submit"
            form="blog-editor-form"
            disabled={saving || uploading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c31e3b] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#a91832] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              "Save Blog"
            )}
          </button>
        </div>

        <form
          id="blog-editor-form"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Basic Information */}

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0b2145]">
                Basic Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Main information displayed on
                the blog.
              </p>
            </div>

            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Blog Title *
                </label>

                <input
                  value={form.title}
                  onChange={(event) =>
                    handleTitleChange(
                      event.target.value,
                    )
                  }
                  placeholder="Best PGDM Colleges in Delhi NCR"
                  className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#123b79]"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Slug *
                  </label>

                  <input
                    value={form.slug}
                    onChange={(event) =>
                      updateField(
                        "slug",
                        slugify(
                          event.target.value,
                        ),
                      )
                    }
                    placeholder="best-pgdm-colleges-in-delhi-ncr"
                    className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:border-[#123b79]"
                  />

                  <p className="mt-1 text-xs text-slate-400">
                    /blog/{form.slug || "..."}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Category *
                  </label>

                  <input
                    value={form.category}
                    onChange={(event) =>
                      updateField(
                        "category",
                        event.target.value,
                      )
                    }
                    placeholder="PGDM"
                    className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:border-[#123b79]"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Excerpt *
                </label>

                <textarea
                  value={form.excerpt}
                  onChange={(event) =>
                    updateField(
                      "excerpt",
                      event.target.value,
                    )
                  }
                  rows={4}
                  placeholder="Short description of the article..."
                  className="w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none focus:border-[#123b79]"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Author
                  </label>

                  <input
                    value={form.author}
                    onChange={(event) =>
                      updateField(
                        "author",
                        event.target.value,
                      )
                    }
                    className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-[#123b79]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={(event) =>
                      updateField(
                        "status",
                        event.target.value as
                          | "draft"
                          | "published",
                      )
                    }
                    className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#123b79]"
                  >
                    <option value="draft">
                      Draft
                    </option>

                    <option value="published">
                      Published
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Cover Image */}

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0b2145]">
                Cover Image
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Upload the featured image for
                this article.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Image URL
                </label>

                <input
                  value={form.coverImage}
                  onChange={(event) =>
                    updateField(
                      "coverImage",
                      event.target.value,
                    )
                  }
                  placeholder="https://res.cloudinary.com/..."
                  className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-[#123b79]"
                />

                <div className="mt-4">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#123b79] hover:text-[#123b79]">
                    {uploading ? (
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                    ) : (
                      <ImagePlus size={17} />
                    )}

                    {uploading
                      ? "Uploading..."
                      : "Upload Image"}

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(event) => {
                        const file =
                          event.target.files?.[0];

                        if (file) {
                          uploadCoverImage(
                            file,
                          );
                        }

                        event.target.value =
                          "";
                      }}
                    />
                  </label>
                </div>

                <div className="mt-5">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Image Alt Text
                  </label>

                  <input
                    value={form.coverImageAlt}
                    onChange={(event) =>
                      updateField(
                        "coverImageAlt",
                        event.target.value,
                      )
                    }
                    placeholder="Descriptive alt text"
                    className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-[#123b79]"
                  />
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                {form.coverImage ? (
                  <img
                    src={form.coverImage}
                    alt={
                      form.coverImageAlt ||
                      form.title
                    }
                    className="aspect-video h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-video flex-col items-center justify-center text-slate-400">
                    <ImagePlus size={32} />

                    <span className="mt-2 text-xs">
                      No image selected
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Content Editor */}

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0b2145]">
                  Article Content
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Build your article using
                  headings and paragraphs.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    addBlock("heading")
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-[#123b79]/20 bg-[#123b79]/5 px-3 py-2 text-xs font-bold text-[#123b79]"
                >
                  <Plus size={15} />
                  Heading
                </button>

                <button
                  type="button"
                  onClick={() =>
                    addBlock("paragraph")
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600"
                >
                  <Plus size={15} />
                  Paragraph
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {blocks.map((block, index) => (
                <div
                  key={block.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <GripVertical
                        size={17}
                        className="text-slate-400"
                      />

                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        {block.type ===
                        "heading"
                          ? `Heading ${
                              block.level ||
                              2
                            }`
                          : "Paragraph"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() =>
                          moveBlock(
                            index,
                            "up",
                          )
                        }
                        className="rounded-md px-2 py-1 text-xs text-slate-500 hover:bg-white disabled:opacity-30"
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        disabled={
                          index ===
                          blocks.length - 1
                        }
                        onClick={() =>
                          moveBlock(
                            index,
                            "down",
                          )
                        }
                        className="rounded-md px-2 py-1 text-xs text-slate-500 hover:bg-white disabled:opacity-30"
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          removeBlock(
                            block.id,
                          )
                        }
                        className="ml-1 rounded-md p-2 text-red-500 transition hover:bg-red-50"
                        title="Delete block"
                      >
                        <Trash2
                          size={16}
                        />
                      </button>
                    </div>
                  </div>

                  {block.type ===
                    "heading" && (
                    <select
                      value={
                        block.level || 2
                      }
                      onChange={(event) =>
                        updateBlock(
                          block.id,
                          "level",
                          Number(
                            event.target
                              .value,
                          ),
                        )
                      }
                      className="mb-3 h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#123b79]"
                    >
                      <option value={2}>
                        H2
                      </option>

                      <option value={3}>
                        H3
                      </option>
                    </select>
                  )}

                  <textarea
                    value={block.content}
                    onChange={(event) =>
                      updateBlock(
                        block.id,
                        "content",
                        event.target.value,
                      )
                    }
                    rows={
                      block.type ===
                      "heading"
                        ? 2
                        : 6
                    }
                    placeholder={
                      block.type ===
                      "heading"
                        ? "Enter heading..."
                        : "Write paragraph..."
                    }
                    className={`w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-800 outline-none focus:border-[#123b79] ${
                      block.type ===
                      "heading"
                        ? "font-semibold"
                        : ""
                    }`}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* SEO */}

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0b2145]">
                SEO Settings
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Search engine metadata for this
                blog.
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Meta Title
                </label>

                <input
                  value={form.metaTitle}
                  onChange={(event) =>
                    updateField(
                      "metaTitle",
                      event.target.value,
                    )
                  }
                  placeholder="SEO title"
                  className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-[#123b79]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Meta Description
                </label>

                <textarea
                  value={
                    form.metaDescription
                  }
                  onChange={(event) =>
                    updateField(
                      "metaDescription",
                      event.target.value,
                    )
                  }
                  rows={4}
                  placeholder="SEO description..."
                  className="w-full resize-y rounded-lg border border-slate-200 px-4 py-3 text-sm leading-6 outline-none focus:border-[#123b79]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Keywords
                </label>

                <input
                  value={form.keywords}
                  onChange={(event) =>
                    updateField(
                      "keywords",
                      event.target.value,
                    )
                  }
                  placeholder="PGDM, Delhi NCR, management education"
                  className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-[#123b79]"
                />

                <p className="mt-1 text-xs text-slate-400">
                  Separate keywords with commas.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom save */}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/blog"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving || uploading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#123b79] px-6 text-sm font-bold text-white disabled:opacity-60"
            >
              {saving && (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              )}

              {saving
                ? "Saving..."
                : "Save Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}