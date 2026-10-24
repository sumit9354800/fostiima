"use client";

import Link from "next/link";

import {
  ArrowLeft,
  CornerDownLeft,
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Highlighter,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Underline,
  Undo2,
  GripVertical,
  ImagePlus,
  Link2,
  Loader2,
  Plus,
  Trash2,
  Unlink2,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

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

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeParagraphHtml(value: string) {
  if (!value) {
    return "";
  }

  // Old paragraphs are plain text. Escape them before putting them inside
  // contentEditable. New paragraphs can contain the saved <a> tags.
  if (!/<[a-z][\s\S]*>/i.test(value)) {
    return escapeHtml(value);
  }

  return value;
}

function sanitizeParagraphHtml(value: string) {
  if (typeof window === "undefined") {
    return value;
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(value, "text/html");

  // Convert legacy browser FONT nodes to SPAN so text colours survive sanitizing.
  for (const font of Array.from(doc.body.querySelectorAll("font"))) {
    const span = doc.createElement("span");
    const color = font.getAttribute("color");
    if (color && /^#[0-9a-f]{3,8}$/i.test(color)) span.style.color = color;
    span.innerHTML = font.innerHTML;
    font.replaceWith(span);
  }

  const allowedTags = new Set([
    "A", "BR", "P", "DIV", "H2", "H3", "H4", "STRONG", "B",
    "EM", "I", "U", "S", "STRIKE", "UL", "OL", "LI", "BLOCKQUOTE",
    "SPAN", "SUB", "SUP", "HR", "CODE", "PRE",
  ]);

  for (const element of Array.from(doc.body.querySelectorAll("*"))) {
    if (!allowedTags.has(element.tagName)) {
      element.replaceWith(doc.createTextNode(element.textContent || ""));
      continue;
    }

    if (element.tagName === "A") {
      const href = element.getAttribute("href")?.trim() || "";

      if (!/^(https?:|mailto:|tel:|\/|#)/i.test(href)) {
        element.replaceWith(doc.createTextNode(element.textContent || ""));
        continue;
      }

      element.setAttribute("href", href);
      element.setAttribute("target", "_blank");
      element.setAttribute("rel", "noopener noreferrer");
    }

    for (const attribute of Array.from(element.attributes)) {
      if (element.tagName === "A" && ["href", "target", "rel"].includes(attribute.name)) {
        continue;
      }

      if (element.tagName === "SPAN" && attribute.name === "style") {
        const safeStyles = (element.getAttribute("style") || "")
          .split(";")
          .map((rule) => rule.trim())
          .filter((rule) => /^(color|background-color|text-align|font-size):\s*[#(),.%\w\s-]+$/i.test(rule))
          .join("; ");
        if (safeStyles) element.setAttribute("style", safeStyles);
        else element.removeAttribute("style");
        continue;
      }

      if (element.tagName === "P" || element.tagName === "DIV" || /^H[234]$/.test(element.tagName)) {
        if (attribute.name === "style") {
          const alignment = (element.getAttribute("style") || "").match(/text-align:\s*(left|center|right|justify)/i)?.[0];
          if (alignment) element.setAttribute("style", alignment);
          else element.removeAttribute("style");
          continue;
        }
      }

      element.removeAttribute(attribute.name);
    }
  }

  return doc.body.innerHTML;
}

function ParagraphEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editorRef = useRef<HTMLDivElement>(null);
  const savedRangeRef = useRef<Range | null>(null);
  const [linkUrl, setLinkUrl] = useState("");
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Do not replace the editable DOM on every keystroke: doing so resets the caret
  // and makes selecting/formatting text frustrating. Sync only external changes.
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || document.activeElement === editor) return;
    const normalized = normalizeParagraphHtml(value);
    if (editor.innerHTML !== normalized) editor.innerHTML = normalized;
    setWordCount((editor.innerText || "").trim().split(/\s+/).filter(Boolean).length);
  }, [value]);

  const saveSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (editorRef.current?.contains(range.commonAncestorContainer)) {
      savedRangeRef.current = range.cloneRange();
    }
  };

  const restoreSelection = () => {
    const editor = editorRef.current;
    if (!editor) return false;
    editor.focus();
    const selection = window.getSelection();
    if (!selection || !savedRangeRef.current) return false;
    try {
      selection.removeAllRanges();
      selection.addRange(savedRangeRef.current);
      return true;
    } catch {
      return false;
    }
  };

  const emitChange = () => {
    if (!editorRef.current) return;
    const html = sanitizeParagraphHtml(editorRef.current.innerHTML);
    onChange(html);
    setWordCount((editorRef.current.innerText || "").trim().split(/\s+/).filter(Boolean).length);
    saveSelection();
  };

  const runCommand = (command: string, commandValue?: string) => {
    restoreSelection();
    document.execCommand(command, false, commandValue);
    emitChange();
  };

  const insertManualLineBreak = () => {
    const editor = editorRef.current;
    if (!editor) return;

    const restored = restoreSelection();
    if (!restored) {
      editor.focus();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(editor);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);
      savedRangeRef.current = range.cloneRange();
    }

    document.execCommand("insertHTML", false, "<br>");
    emitChange();
    saveSelection();
  };

  const keepSelection = (event: React.MouseEvent<HTMLElement>) => {
    saveSelection();
    event.preventDefault();
  };

  const openLinkInput = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    saveSelection();
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed || !selection.toString().trim()) {
      alert("Pehle editor mein jis text ko link banana hai use select karein.");
      return;
    }
    const anchor = selection.anchorNode?.parentElement?.closest("a");
    setLinkUrl(anchor?.getAttribute("href") || "");
    setShowLinkInput(true);
  };

  const applyLink = () => {
    const url = linkUrl.trim();
    if (!url) {
      alert("Please enter a URL.");
      return;
    }
    const safeUrl = /^(https?:|mailto:|tel:|\/|#)/i.test(url) ? url : `https://${url}`;
    if (!restoreSelection()) {
      alert("Link lagane ke liye pehle editor mein text select karein.");
      return;
    }
    document.execCommand("createLink", false, safeUrl);
    // Add safe target attributes; the sanitizer strips all other attributes.
    editorRef.current?.querySelectorAll("a").forEach((anchor) => {
      anchor.setAttribute("target", "_blank");
      anchor.setAttribute("rel", "noopener noreferrer");
    });
    emitChange();
    setShowLinkInput(false);
    setLinkUrl("");
  };

  const toolbarButton = (label: string, icon: React.ReactNode, command: string, commandValue?: string) => (
    <button
      key={label}
      type="button"
      title={label}
      aria-label={label}
      onMouseDown={keepSelection}
      onClick={() => runCommand(command, commandValue)}
      className="inline-flex h-9 min-w-9 items-center justify-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-[#123b79] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >{icon}</button>
  );

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 bg-slate-50 p-2">
        <select aria-label="Text style" defaultValue="P" onMouseDown={keepSelection}
          onChange={(e) => { runCommand("formatBlock", e.target.value); e.currentTarget.blur(); }}
          className="h-9 max-w-full rounded-md border border-slate-200 bg-white px-2 text-sm text-slate-700">
          <option value="P">Normal text</option><option value="H2">Heading 2</option>
          <option value="H3">Heading 3</option><option value="H4">Heading 4</option>
          <option value="BLOCKQUOTE">Quote</option><option value="PRE">Code block</option>
        </select>
        <select aria-label="Font size" defaultValue="3" onMouseDown={keepSelection}
          onChange={(e) => { runCommand("fontSize", e.target.value); e.currentTarget.blur(); }}
          className="h-9 rounded-md border border-slate-200 bg-white px-2 text-sm text-slate-700">
          <option value="1">10px</option><option value="2">13px</option><option value="3">16px</option>
          <option value="4">18px</option><option value="5">24px</option><option value="6">32px</option><option value="7">48px</option>
        </select>
        {toolbarButton("Bold (⌘/Ctrl+B)", <Bold size={16}/>, "bold")}
        {toolbarButton("Italic (⌘/Ctrl+I)", <Italic size={16}/>, "italic")}
        {toolbarButton("Underline (⌘/Ctrl+U)", <Underline size={16}/>, "underline")}
        {toolbarButton("Strikethrough", <Strikethrough size={16}/>, "strikeThrough")}
        {toolbarButton("Bulleted list", <List size={16}/>, "insertUnorderedList")}
        {toolbarButton("Numbered list", <ListOrdered size={16}/>, "insertOrderedList")}
        {toolbarButton("Align left", <AlignLeft size={16}/>, "justifyLeft")}
        {toolbarButton("Align center", <AlignCenter size={16}/>, "justifyCenter")}
        {toolbarButton("Align right", <AlignRight size={16}/>, "justifyRight")}
        {toolbarButton("Justify", <AlignCenter size={16}/>, "justifyFull")}
        {toolbarButton("Quote", <Quote size={16}/>, "formatBlock", "BLOCKQUOTE")}
        {toolbarButton("Undo", <Undo2 size={16}/>, "undo")}
        {toolbarButton("Redo", <Redo2 size={16}/>, "redo")}
        {toolbarButton("Clear formatting", <RemoveFormatting size={16}/>, "removeFormat")}
        <label title="Text color" className="flex h-9 cursor-pointer items-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700">
          <span className="font-bold">A</span><input aria-label="Text color" type="color" defaultValue="#1e293b" className="h-5 w-5 cursor-pointer border-0 bg-transparent p-0"
            onMouseDown={saveSelection} onChange={(e) => runCommand("foreColor", e.target.value)} />
        </label>
        <label title="Highlight color" className="flex h-9 cursor-pointer items-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-700">
          <Highlighter size={15}/><input aria-label="Highlight color" type="color" defaultValue="#fff176" className="h-5 w-5 cursor-pointer border-0 bg-transparent p-0"
            onMouseDown={saveSelection} onChange={(e) => runCommand("hiliteColor", e.target.value)} />
        </label>
        <button type="button" onMouseDown={openLinkInput} className="inline-flex h-9 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-xs font-semibold text-[#123b79] hover:bg-blue-50"><Link2 size={14}/> Add link</button>
        <button type="button" onMouseDown={(e) => { e.preventDefault(); saveSelection(); runCommand("unlink"); }} className="inline-flex h-9 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"><Unlink2 size={14}/> Remove link</button>
        <button type="button" title="Insert manual line break" aria-label="Insert manual line break" onMouseDown={(e) => { e.preventDefault(); saveSelection(); }} onClick={insertManualLineBreak} className="inline-flex h-9 items-center gap-1 rounded-md border border-slate-200 bg-white px-2 text-xs font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-[#123b79]"><CornerDownLeft size={14}/> Line Break</button>
        {showLinkInput && <div className="flex w-full flex-wrap gap-2 pt-2">
          <input type="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyLink(); } if (e.key === "Escape") setShowLinkInput(false); }} placeholder="https://example.com" className="h-9 min-w-[220px] flex-1 rounded-md border border-slate-200 px-3 text-sm" />
          <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={applyLink} className="rounded-md bg-[#123b79] px-3 text-sm font-bold text-white">Apply link</button>
          <button type="button" onClick={() => { setShowLinkInput(false); setLinkUrl(""); }} className="rounded-md border px-3 text-sm">Cancel</button>
        </div>}
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        role="textbox"
        aria-label="Blog article text editor"
        aria-multiline="true"
        spellCheck
        onInput={emitChange}
        onPaste={(event) => {
          event.preventDefault();
          const plainText = event.clipboardData.getData("text/plain");
          // Paste plain text only, without copied HTML or automatic <br> tags.
          document.execCommand("insertText", false, plainText);
          emitChange();
        }}
        onKeyUp={saveSelection}
        onMouseUp={saveSelection}
        onKeyDown={(event) => {
          const mod = event.metaKey || event.ctrlKey;
          if (mod && event.key.toLowerCase() === "b") {
            event.preventDefault();
            runCommand("bold");
            return;
          }
          if (mod && event.key.toLowerCase() === "i") {
            event.preventDefault();
            runCommand("italic");
            return;
          }
          if (mod && event.key.toLowerCase() === "u") {
            event.preventDefault();
            runCommand("underline");
            return;
          }
          // Keep Enter from generating browser-specific <div>/<p>/<br> markup.
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            document.execCommand("insertText", false, "\n");
            emitChange();
          }
        }}
        data-placeholder="Start writing your article here..."
        className="min-h-[240px] w-full whitespace-pre-wrap px-4 py-4 text-sm leading-7 text-slate-800 outline-none empty:before:text-slate-400 empty:before:content-[attr(data-placeholder)] [&_h2]:my-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:my-2 [&_h3]:text-xl [&_h3]:font-bold [&_h4]:my-2 [&_h4]:text-lg [&_h4]:font-semibold [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_blockquote]:my-3 [&_blockquote]:border-l-4 [&_blockquote]:border-slate-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_pre]:overflow-x-auto [&_pre]:rounded [&_pre]:bg-slate-100 [&_pre]:p-3 [&_code]:font-mono [&_a]:text-blue-700 [&_a]:underline"
      />
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-500">
        <span>Tip: paste uses plain text. Use Line Break to insert a manual break. Shortcuts: Ctrl/⌘ + B, I, U.</span>
        <span>{wordCount} words</span>
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

    // Blog images are uploaded through the dedicated blog-image endpoint.
    // Keep this limit aligned with src/app/api/admin/image-upload/route.ts.
    const maxImageSize = 4 * 1024 * 1024;
    if (file.size > maxImageSize) {
      alert("Blog image size cannot exceed 4MB. Please choose a smaller image.");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/image-upload", {
        method: "POST",
        body: formData,
        credentials: "same-origin",
        headers: { Accept: "application/json" },
        cache: "no-store",
      });

      // Avoid JSON parsing errors when Next.js returns an HTML 404/500 page.
      const contentType = response.headers.get("content-type") || "";
      let data: { success?: boolean; url?: string; error?: string } = {};

      if (contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const responseText = await response.text();
        console.error("[BLOG_IMAGE_UPLOAD_NON_JSON_RESPONSE]", {
          status: response.status,
          contentType,
          responsePreview: responseText.slice(0, 300),
        });
        throw new Error(
          `Image upload endpoint returned a non-JSON response (HTTP ${response.status}). Check that src/app/api/admin/image-upload/route.ts exists and the dev server has restarted.`,
        );
      }

      if (!response.ok || data.success === false) {
        throw new Error(data.error || `Image upload failed (HTTP ${response.status}).`);
      }

      if (typeof data.url !== "string" || !data.url.trim()) {
        throw new Error("Upload response did not include an image URL.");
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
                  Build your article using headings, paragraphs, links, and
                  tables.
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
                <button
                  type="button"
                  onClick={() => addBlock("image")}
                  className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700"
                >
                  <ImagePlus size={15} />
                  Image
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
                          : block.type === "paragraph"
                            ? "Paragraph"
                            : block.type === "image"
                              ? "Image"
                              : "Table"}
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
                  )}{" "}
                  {block.type === "paragraph" ? (
                    <ParagraphEditor
                      value={block.content}
                      onChange={(value) =>
                        updateBlock(block.id, "content", value)
                      }
                    />
                  ) : block.type === "heading" ? (
                    <textarea
                      value={block.content}
                      onChange={(event) =>
                        updateBlock(block.id, "content", event.target.value)
                      }
                      rows={2}
                      placeholder="Enter heading..."
                      className="w-full resize-y rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold leading-7 text-slate-800 outline-none focus:border-[#123b79]"
                    />
                  ) : null}
                  {block.type === "image" && (
                    <div className="grid gap-3 rounded-lg border border-slate-200 bg-white p-3 md:grid-cols-[1fr_220px]">
                      <div className="space-y-3">
                        <label className="block text-xs font-semibold text-slate-600">Image URL</label>
                        <input value={block.src || ""} onChange={(event) => updateBlock(block.id, "src", event.target.value)} placeholder="https://... or uploaded image URL" className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-[#123b79]" />
                        <label className="block text-xs font-semibold text-slate-600">Alt text (accessibility + SEO)</label>
                        <input value={block.alt || ""} onChange={(event) => updateBlock(block.id, "alt", event.target.value)} placeholder="Describe this image" className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-[#123b79]" />
                        <label className="block text-xs font-semibold text-slate-600">Caption (optional)</label>
                        <input value={block.caption || ""} onChange={(event) => updateBlock(block.id, "caption", event.target.value)} placeholder="Image caption" className="h-10 w-full rounded-md border border-slate-200 px-3 text-sm outline-none focus:border-[#123b79]" />
                      </div>
                      <div className="flex min-h-32 items-center justify-center overflow-hidden rounded-md bg-slate-100">
                        {block.src ? <img src={block.src} alt={block.alt || "Blog image preview"} className="max-h-48 w-full object-contain" /> : <div className="p-4 text-center text-xs text-slate-400"><ImagePlus size={24} className="mx-auto mb-2" />Paste an image URL to preview</div>}
                      </div>
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
