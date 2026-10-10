"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  GripVertical,
  ImagePlus,
  Loader2,
  Plus,
  Trash2,
  Bold,
  Italic,
  Link2,
  Unlink,
} from "lucide-react";
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import NextLink from "next/link";
import TiptapLink from "@tiptap/extension-link";

type BlockType = "heading" | "paragraph" | "image" | "table";

type TableData = {
  headers: string[];
  rows: string[][];
};

type BlogBlock = {
  id: string;
  type: BlockType;
  content: string;
  level?: 2 | 3;
  src?: string;
  alt?: string;
  caption?: string;
  table?: TableData;
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
const EMPTY_BLOCK = (type: BlockType = "paragraph"): BlogBlock => ({
  id: crypto.randomUUID(),
  type,
  content: "",
  ...(type === "heading" ? { level: 2 } : {}),
  ...(type === "image"
    ? {
        src: "",
        alt: "",
        caption: "",
      }
    : {}),
  ...(type === "table"
    ? {
        table: {
          headers: ["Column 1", "Column 2"],
          rows: [["", ""]],
        },
      }
    : {}),
});

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/** Rich-text editor for article heading/paragraph blocks. Content is stored as HTML. */
function RichTextBlockEditor({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: false,
        codeBlock: false,
        blockquote: false,
        bulletList: false,
        orderedList: false,
        horizontalRule: false,
      }),
      TiptapLink.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-[#123b79] underline underline-offset-2",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "min-h-[130px] w-full px-4 py-3 text-sm leading-7 text-slate-800 outline-none",
        "data-placeholder": placeholder,
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  const addLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const enteredUrl = window.prompt(
      "Link URL (https://...)",
      previousUrl || "https://",
    );
    if (enteredUrl === null) return;
    const href = enteredUrl.trim();
    if (!href) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    const safeUrl = /^(https?:\/\/|mailto:|tel:)/i.test(href)
      ? href
      : `https://${href}`;
    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: safeUrl })
      .run();
  };

  const toolbarButton =
    "inline-flex h-9 items-center justify-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-600 transition hover:border-[#123b79] hover:text-[#123b79] disabled:cursor-not-allowed disabled:opacity-40";

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white focus-within:border-[#123b79]">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 bg-slate-50 p-2">
        <button
          type="button"
          disabled={!editor}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`${toolbarButton} ${editor?.isActive("bold") ? "border-[#123b79] bg-[#123b79]/5 text-[#123b79]" : ""}`}
          title="Bold"
        >
          <Bold size={15} /> Bold
        </button>
        <button
          type="button"
          disabled={!editor}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`${toolbarButton} ${editor?.isActive("italic") ? "border-[#123b79] bg-[#123b79]/5 text-[#123b79]" : ""}`}
          title="Italic"
        >
          <Italic size={15} /> Italic
        </button>
        <button
          type="button"
          disabled={!editor}
          onMouseDown={(event) => event.preventDefault()}
          onClick={addLink}
          className={`${toolbarButton} ${editor?.isActive("link") ? "border-[#123b79] bg-[#123b79]/5 text-[#123b79]" : ""}`}
          title="Select text first, then add a link"
        >
          <Link2 size={15} /> Add Link
        </button>
        <button
          type="button"
          disabled={!editor || !editor.isActive("link")}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() =>
            editor?.chain().focus().extendMarkRange("link").unsetLink().run()
          }
          className={toolbarButton}
          title="Remove link"
        >
          <Unlink size={15} /> Remove Link
        </button>
      </div>
      <EditorContent editor={editor} />
      <style jsx global>{`
        .tiptap p {
          margin: 0;
        }
        .tiptap p.is-editor-empty:first-child::before {
          color: #94a3b8;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .tiptap a {
          color: #123b79;
          text-decoration: underline;
          text-underline-offset: 2px;
        }
      `}</style>
      <div className="border-t border-slate-100 px-4 py-2 text-[11px] text-slate-400">
        Text ko select karein, phir Add Link par click karke URL enter karein.
      </div>
    </div>
  );
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
    initialData?.blocks?.length ? initialData.blocks : [EMPTY_BLOCK()],
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

      slug: mode === "create" ? slugify(value) : previous.slug,
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
    setBlocks((previous) => [...previous, EMPTY_BLOCK(type)]);
  };

  const updateTableCell = (
    blockId: string,
    rowIndex: number,
    columnIndex: number,
    value: string,
  ) => {
    setBlocks((previous) =>
      previous.map((block) => {
        if (block.id !== blockId || block.type !== "table" || !block.table) {
          return block;
        }

        const rows = block.table.rows.map((row) => [...row]);

        rows[rowIndex][columnIndex] = value;

        return {
          ...block,
          table: {
            ...block.table,
            rows,
          },
        };
      }),
    );
  };

  const updateTableHeader = (
    blockId: string,
    columnIndex: number,
    value: string,
  ) => {
    setBlocks((previous) =>
      previous.map((block) => {
        if (block.id !== blockId || block.type !== "table" || !block.table) {
          return block;
        }

        const headers = [...block.table.headers];

        headers[columnIndex] = value;

        return {
          ...block,
          table: {
            ...block.table,
            headers,
          },
        };
      }),
    );
  };

  const addTableColumn = (blockId: string) => {
    setBlocks((previous) =>
      previous.map((block) => {
        if (block.id !== blockId || block.type !== "table" || !block.table) {
          return block;
        }

        return {
          ...block,
          table: {
            headers: [
              ...block.table.headers,
              `Column ${block.table.headers.length + 1}`,
            ],
            rows: block.table.rows.map((row) => [...row, ""]),
          },
        };
      }),
    );
  };

  const addTableRow = (blockId: string) => {
    setBlocks((previous) =>
      previous.map((block) => {
        if (block.id !== blockId || block.type !== "table" || !block.table) {
          return block;
        }

        return {
          ...block,
          table: {
            ...block.table,
            rows: [...block.table.rows, block.table.headers.map(() => "")],
          },
        };
      }),
    );
  };

  const removeTableColumn = (blockId: string) => {
    setBlocks((previous) =>
      previous.map((block) => {
        if (
          block.id !== blockId ||
          block.type !== "table" ||
          !block.table ||
          block.table.headers.length <= 1
        ) {
          return block;
        }

        return {
          ...block,
          table: {
            headers: block.table.headers.slice(0, -1),
            rows: block.table.rows.map((row) => row.slice(0, -1)),
          },
        };
      }),
    );
  };

  const removeTableRow = (blockId: string, rowIndex: number) => {
    setBlocks((previous) =>
      previous.map((block) => {
        if (
          block.id !== blockId ||
          block.type !== "table" ||
          !block.table ||
          block.table.rows.length <= 1
        ) {
          return block;
        }

        return {
          ...block,
          table: {
            ...block.table,
            rows: block.table.rows.filter((_, index) => index !== rowIndex),
          },
        };
      }),
    );
  };

  const removeBlock = (id: string) => {
    setBlocks((previous) => {
      if (previous.length === 1) {
        return previous;
      }

      return previous.filter((block) => block.id !== id);
    });
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    setBlocks((previous) => {
      const newBlocks = [...previous];

      const targetIndex = direction === "up" ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= newBlocks.length) {
        return previous;
      }

      [newBlocks[index], newBlocks[targetIndex]] = [
        newBlocks[targetIndex],
        newBlocks[index],
      ];

      return newBlocks;
    });
  };

  const uploadCoverImage = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append("file", file);
      formData.append("destination", "cloudinary");

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to upload image.");
      }

      if (!data?.url) {
        throw new Error("Upload completed but image URL was not returned.");
      }

      updateField("coverImage", data.url);
    } catch (error) {
      console.error("[BLOG_IMAGE_UPLOAD]", error);

      alert(error instanceof Error ? error.message : "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      .filter((block) => {
        if (block.type === "table") {
          return Boolean(
            block.table &&
            block.table.headers.length > 0 &&
            block.table.rows.length > 0,
          );
        }

        if (block.type === "image") {
          return Boolean(block.src?.trim());
        }

        return (
          block.content
            .replace(/<[^>]*>/g, "")
            .replace(/&nbsp;/g, " ")
            .trim().length > 0
        );
      })
      .map((block) => ({
        type: block.type,

        content:
          block.type === "image"
            ? block.caption?.trim() || ""
            : block.type === "table"
              ? ""
              : block.content.trim(),

        level: block.type === "heading" ? block.level || 2 : undefined,

        data:
          block.type === "image"
            ? {
                src: block.src?.trim() || "",
                alt: block.alt?.trim() || form.title.trim(),
                caption: block.caption?.trim() || "",
              }
            : block.type === "table"
              ? {
                  headers: block.table?.headers || [],
                  rows: block.table?.rows || [],
                }
              : undefined,
      }));
    if (!cleanBlocks.length) {
      alert("Please add at least one content block.");
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
        coverImageAlt: form.coverImageAlt.trim() || form.title.trim(),
        author: form.author.trim() || "FOSTIIMA Business School",
        status: form.status,

        metaTitle: form.metaTitle.trim() || null,

        metaDescription: form.metaDescription.trim() || null,

        keywords: form.keywords
          .split(",")
          .map((keyword) => keyword.trim())
          .filter(Boolean),

        blocks: cleanBlocks,
      };

      const url =
        mode === "create" ? "/api/admin/blog" : `/api/admin/blog/${blogId}`;

      const response = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to save blog.");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      console.error("[BLOG_SAVE]", error);

      alert(error instanceof Error ? error.message : "Failed to save blog.");
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
            <NextLink
              href="/admin/blog"
              className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#123b79]"
            >
              <ArrowLeft size={16} />
              Back to Blogs
            </NextLink>

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
              Blog Management
            </p>

            <h1 className="mt-1 text-3xl font-bold text-[#0b2145]">
              {mode === "create" ? "Create New Blog" : "Edit Blog"}
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
                <Loader2 size={17} className="animate-spin" />
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
                Main information displayed on the blog.
              </p>
            </div>

            <div className="grid gap-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Blog Title *
                </label>

                <input
                  value={form.title}
                  onChange={(event) => handleTitleChange(event.target.value)}
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
                      updateField("slug", slugify(event.target.value))
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
                      updateField("category", event.target.value)
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
                    updateField("excerpt", event.target.value)
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
                      updateField("author", event.target.value)
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
                        event.target.value as "draft" | "published",
                      )
                    }
                    className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm outline-none focus:border-[#123b79]"
                  >
                    <option value="draft">Draft</option>

                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Cover Image */}

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0b2145]">Cover Image</h2>

              <p className="mt-1 text-sm text-slate-500">
                Upload the featured image for this article.
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
                    updateField("coverImage", event.target.value)
                  }
                  placeholder="https://res.cloudinary.com/..."
                  className="h-12 w-full rounded-lg border border-slate-200 px-4 text-sm outline-none focus:border-[#123b79]"
                />

                <div className="mt-4">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-[#123b79] hover:text-[#123b79]">
                    {uploading ? (
                      <Loader2 size={17} className="animate-spin" />
                    ) : (
                      <ImagePlus size={17} />
                    )}

                    {uploading ? "Uploading..." : "Upload Image"}

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                      onChange={(event) => {
                        const file = event.target.files?.[0];

                        if (file) {
                          uploadCoverImage(file);
                        }

                        event.target.value = "";
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
                      updateField("coverImageAlt", event.target.value)
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
                    alt={form.coverImageAlt || form.title}
                    className="aspect-video h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-video flex-col items-center justify-center text-slate-400">
                    <ImagePlus size={32} />

                    <span className="mt-2 text-xs">No image selected</span>
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
                  Build your article using headings and paragraphs.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => addBlock("heading")}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#123b79]/20 bg-[#123b79]/5 px-3 py-2 text-xs font-bold text-[#123b79]"
                >
                  <Plus size={15} />
                  Heading
                </button>

                <button
                  type="button"
                  onClick={() => addBlock("paragraph")}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600"
                >
                  <Plus size={15} />
                  Paragraph
                </button>

                <button
                  type="button"
                  onClick={() => addBlock("table")}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#c31e3b]/20 bg-[#c31e3b]/5 px-3 py-2 text-xs font-bold text-[#c31e3b]"
                >
                  <Plus size={15} />
                  Table
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
                      <GripVertical size={17} className="text-slate-400" />

                      <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                        {block.type === "heading"
                          ? `Heading ${block.level || 2}`
                          : "Paragraph"}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={index === 0}
                        onClick={() => moveBlock(index, "up")}
                        className="rounded-md px-2 py-1 text-xs text-slate-500 hover:bg-white disabled:opacity-30"
                      >
                        ↑
                      </button>

                      <button
                        type="button"
                        disabled={index === blocks.length - 1}
                        onClick={() => moveBlock(index, "down")}
                        className="rounded-md px-2 py-1 text-xs text-slate-500 hover:bg-white disabled:opacity-30"
                      >
                        ↓
                      </button>

                      <button
                        type="button"
                        onClick={() => removeBlock(block.id)}
                        className="ml-1 rounded-md p-2 text-red-500 transition hover:bg-red-50"
                        title="Delete block"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {block.type === "heading" && (
                    <select
                      value={block.level || 2}
                      onChange={(event) =>
                        updateBlock(
                          block.id,
                          "level",
                          Number(event.target.value),
                        )
                      }
                      className="mb-3 h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-[#123b79]"
                    >
                      <option value={2}>H2</option>

                      <option value={3}>H3</option>
                    </select>
                  )}

                  {(block.type === "heading" || block.type === "paragraph") && (
                    <RichTextBlockEditor
                      value={block.content}
                      onChange={(value) =>
                        updateBlock(block.id, "content", value)
                      }
                      placeholder={
                        block.type === "heading"
                          ? "Enter heading..."
                          : "Write paragraph..."
                      }
                    />
                  )}
                  {block.type === "table" && block.table && (
                    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[650px] border-collapse">
                          <thead>
                            <tr>
                              {block.table.headers.map(
                                (header, columnIndex) => (
                                  <th
                                    key={`header-${columnIndex}`}
                                    className="border border-slate-200 bg-[#0b2145] p-2"
                                  >
                                    <input
                                      value={header}
                                      onChange={(event) =>
                                        updateTableHeader(
                                          block.id,
                                          columnIndex,
                                          event.target.value,
                                        )
                                      }
                                      className="w-full rounded border border-white/20 bg-transparent px-2 py-2 text-sm font-semibold text-white outline-none placeholder:text-white/50"
                                      placeholder={`Column ${columnIndex + 1}`}
                                    />
                                  </th>
                                ),
                              )}
                            </tr>
                          </thead>

                          <tbody>
                            {block.table.rows.map((row, rowIndex) => (
                              <tr key={`row-${rowIndex}`}>
                                {row.map((cell, columnIndex) => (
                                  <td
                                    key={`cell-${rowIndex}-${columnIndex}`}
                                    className="border border-slate-200 p-2"
                                  >
                                    <input
                                      value={cell}
                                      onChange={(event) =>
                                        updateTableCell(
                                          block.id,
                                          rowIndex,
                                          columnIndex,
                                          event.target.value,
                                        )
                                      }
                                      className="w-full rounded border border-slate-200 px-2 py-2 text-sm text-slate-700 outline-none focus:border-[#123b79]"
                                      placeholder="Enter value..."
                                    />
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="flex flex-wrap gap-2 border-t border-slate-200 bg-slate-50 p-3">
                        <button
                          type="button"
                          onClick={() => addTableRow(block.id)}
                          className="rounded-lg bg-[#123b79] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#0b2c5c]"
                        >
                          + Add Row
                        </button>

                        <button
                          type="button"
                          onClick={() => addTableColumn(block.id)}
                          className="rounded-lg bg-[#123b79] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#0b2c5c]"
                        >
                          + Add Column
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            removeTableRow(
                              block.id,
                              block.table!.rows.length - 1,
                            )
                          }
                          disabled={block.table.rows.length <= 1}
                          className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          − Remove Row
                        </button>

                        <button
                          type="button"
                          onClick={() => removeTableColumn(block.id)}
                          disabled={block.table.headers.length <= 1}
                          className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          − Remove Column
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* SEO */}

          <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0b2145]">SEO Settings</h2>

              <p className="mt-1 text-sm text-slate-500">
                Search engine metadata for this blog.
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
                    updateField("metaTitle", event.target.value)
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
                  value={form.metaDescription}
                  onChange={(event) =>
                    updateField("metaDescription", event.target.value)
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
                    updateField("keywords", event.target.value)
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
            <NextLink
              href="/admin/blog"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600"
            >
              Cancel
            </NextLink>

            <button
              type="submit"
              disabled={saving || uploading}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#123b79] px-6 text-sm font-bold text-white disabled:opacity-60"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}

              {saving ? "Saving..." : "Save Blog"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
