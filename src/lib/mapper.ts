import type { BlogBlock } from "@/generated/prisma/client";
import type {
  BlogContentBlock,
  BlogPost,
} from "@/types/blog";

type UnknownRecord = Record<string, unknown>;

function parseJson(value: string | null): UnknownRecord | null {
  if (!value) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      Array.isArray(parsed)
    ) {
      return null;
    }

    return parsed as UnknownRecord;
  } catch {
    return null;
  }
}

function parseStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (item): item is string => typeof item === "string",
  );
}

function parseTableRows(value: unknown): string[][] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(Array.isArray)
    .map((row) =>
      row.filter(
        (cell): cell is string => typeof cell === "string",
      ),
    );
}

export function mapBlogBlocks(
  blocks: BlogBlock[],
): BlogContentBlock[] {
  return [...blocks]
    .sort((a, b) => a.position - b.position)
    .map((block): BlogContentBlock | null => {
      const data = parseJson(block.data);

      switch (block.type) {
        case "heading": {
          const level =
            data?.level === 3
              ? 3
              : data?.level === 4
                ? 4
                : 2;

          return {
            type: "heading",
            level,
            content: block.content ?? "",
          };
        }

        case "paragraph":
          return {
            type: "paragraph",
            content: block.content ?? "",
          };

        case "image": {
          const src =
            typeof data?.src === "string"
              ? data.src
              : block.content ?? "";

          if (!src) {
            return null;
          }

          return {
            type: "image",
            src,
            alt:
              typeof data?.alt === "string"
                ? data.alt
                : "FOSTIIMA Business School",
            caption:
              typeof data?.caption === "string"
                ? data.caption
                : undefined,
          };
        }

        case "list":
          return {
            type: "list",
            items: parseStringArray(data?.items),
          };

        case "table":
          return {
            type: "table",
            headers: parseStringArray(data?.headers),
            rows: parseTableRows(data?.rows),
          };

        default:
          return {
            type: "paragraph",
            content: block.content ?? "",
          };
      }
    })
    .filter(
      (block): block is BlogContentBlock => block !== null,
    );
}

export function mapDbBlogPost(post: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  publishedAt: Date | null;
  status: "draft" | "published";
  metaTitle: string | null;
  metaDescription: string | null;
  blocks: BlogBlock[];
  blogKeywords: {
    keyword: string;
  }[];
}): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    coverImage: post.coverImage,
    coverImageAlt: post.coverImageAlt,
    author: post.author,
    publishedAt: post.publishedAt
      ? post.publishedAt.toISOString()
      : null,
    status: post.status,
    content: mapBlogBlocks(post.blocks),
    seo: {
      metaTitle: post.metaTitle ?? post.title,
      metaDescription:
        post.metaDescription ?? post.excerpt,
      keywords: post.blogKeywords.map(
        (keyword) => keyword.keyword,
      ),
    },
  };
}