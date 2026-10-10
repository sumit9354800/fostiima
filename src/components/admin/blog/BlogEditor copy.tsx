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

  const [linkEditor, setLinkEditor] = useState<{
    blockId: string;
    text: string;
    url: string;
  } | null>(null);

  const [savedSelection, setSavedSelection] = useState<Range | null>(null);

  const openLinkEditor = (blockId: string) => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
      alert("Please select the text you want to turn into a link.");
      return;
    }

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString().trim();

    if (!selectedText) {
      alert("Please select the text you want to turn into a link.");
      return;
    }

    const container = range.commonAncestorContainer;
    const editor =
      container.nodeType === Node.ELEMENT_NODE
        ? (container as Element).closest("[data-blog-editor]")
        : container.parentElement?.closest("[data-blog-editor]");

    if (!editor) {
      alert("Please select text inside the paragraph editor.");
      return;
    }

    setSavedSelection(range.cloneRange());
    setLinkEditor({
      blockId,
      text: selectedText,
      url: "",
    });
  };

  const applyLink = () => {
    if (!linkEditor || !savedSelection) return;

    const url = linkEditor.url.trim();

    if (!url) {
      alert("Please enter a URL.");
      return;
    }

    const selection = window.getSelection();

    if (!selection) return;

    selection.removeAllRanges();
    selection.addRange(savedSelection);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.target = /^https?:\/\//i.test(url) ? "_blank" : "_self";
    anchor.rel = /^https?:\/\//i.test(url)
      ? "noopener noreferrer"
      : "";
    anchor.className =
      "text-[#123b79] underline decoration-[#123b79]/40 underline-offset-2 hover:text-[#c31e3b]";

    try {
      savedSelection.surroundContents(anchor);
    } catch {
      const fragment = savedSelection.extractContents();
      anchor.appendChild(fragment);
      savedSelection.insertNode(anchor);
    }

    const editorElement = document.querySelector(
      `[data-blog-editor-id="${linkEditor.blockId}"]`,
    ) as HTMLElement | null;

    if (editorElement) {
      setBlocks((previous) =>
        previous.map((block) =>
          block.id === linkEditor.blockId
            ? { ...block, content: editorElement.innerHTML }
            : block,
        ),
      );
    }

    setLinkEditor(null);
    setSavedSelection(null);
    selection.removeAllRanges();
  };

  const removeSelectedLink = (blockId: string) => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) {
      alert("Please place your cursor inside a link first.");
      return;
    }

    let node: Node | null = selection.anchorNode;

    while (node && node !== document.body) {
      if (
        node.nodeType === Node.ELEMENT_NODE &&
        (node as HTMLElement).tagName === "A"
      ) {
        const anchor = node as HTMLAnchorElement;
        const parent = anchor.parentNode;

        if (!parent) return;

        while (anchor.firstChild) {
          parent.insertBefore(anchor.firstChild, anchor);
        }

        parent.removeChild(anchor);

        const editorElement = document.querySelector(
          `[data-blog-editor-id="${blockId}"]`,
        ) as HTMLElement | null;

        if (editorElement) {
          setBlocks((previous) =>
            previous.map((block) =>
              block.id === blockId
                ? { ...block, content: editorElement.innerHTML }
                : block,
            ),
          );
        }

        return;
      }

      node = node.parentNode;
    }

    alert("Place your cursor inside an existing link to remove it.");
  };

  const syncContentEditable = (blockId: string, element: HTMLElement) => {
    setBlocks((previous) =>
      previous.map((block) =>
        block.id === blockId
          ? { ...block, content: element.innerHTML }
          : block,
      ),
    );
  };



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

            rows: block.table.rows.filter((\_, index) => index !== rowIndex),

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



        return block.content.trim().length > 0;

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

                  placeholder="https\://res.cloudinary.com/..."

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



                  {block.type !== "table" && (
                  <div className="space-y-3">
                    {block.type === "paragraph" && (
                      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-200 bg-white p-2">
                        <button
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => openLinkEditor(block.id)}
                          className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-[#123b79] hover:text-[#123b79]"
                        >
                          🔗 Add Link
                        </button>

                        <button
                          type="button"
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => removeSelectedLink(block.id)}
                          className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50"
                        >
                          Unlink
                        </button>

                        <span className="text-xs text-slate-400">
                          Select any text, then click Add Link.
                        </span>
                      </div>
                    )}

                    <div
                      data-blog-editor
                      data-blog-editor-id={block.id}
                      contentEditable
                      suppressContentEditableWarning
                      role="textbox"
                      aria-multiline="true"
                      onInput={(event) =>
                        syncContentEditable(block.id, event.currentTarget)
                      }
                      onBlur={(event) =>
                        syncContentEditable(block.id, event.currentTarget)
                      }
                      dangerouslySetInnerHTML={{
                        __html: block.content || "",
                      }}
                      className={`min-h-[170px] w-full resize-y overflow-auto rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-800 outline-none focus:border-[#123b79] ${
                        block.type === "heading"
                          ? "min-h-[74px] font-semibold"
                          : ""
                      }`}
                    />
                  </div>
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

                          \+ Add Row

                        </button>



                        <button

                          type="button"

                          onClick={() => addTableColumn(block.id)}

                          className="rounded-lg bg-[#123b79] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#0b2c5c]"

                        >

                          \+ Add Column

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



          {linkEditor && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 p-4">
            <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
              <div className="mb-5">
                <h3 className="text-lg font-bold text-[#0b2145]">Add Link</h3>
                <p className="mt-1 text-sm text-slate-500">
                  The selected text will become clickable.
                </p>
              </div>

              <div className="mb-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                <span className="font-semibold">Selected text:</span>{" "}
                {linkEditor.text}
              </div>

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                URL
              </label>

              <input
                autoFocus
                type="url"
                value={linkEditor.url}
                onChange={(event) =>
                  setLinkEditor((previous) =>
                    previous
                      ? { ...previous, url: event.target.value }
                      : previous,
                  )
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    applyLink();
                  }

                  if (event.key === "Escape") {
                    setLinkEditor(null);
                    setSavedSelection(null);
                  }
                }}
                placeholder="https://example.com or /programs/pgdm"
                className="h-12 w-full rounded-lg border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-[#123b79]"
              />

              <p className="mt-2 text-xs text-slate-400">
                External URLs open in a new tab. Internal URLs stay in the same
                tab.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setLinkEditor(null);
                    setSavedSelection(null);
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={applyLink}
                  className="rounded-lg bg-[#123b79] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0b2c5c]"
                >
                  Add Link
                </button>
              </div>
            </div>
          </div>
        )}

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

              {saving && <Loader2 size={16} className="animate-spin" />}



              {saving ? "Saving..." : "Save Blog"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

}
