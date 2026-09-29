import type { BlogPost } from "@/types/blog";

function parseJson(value: string | null) {
  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function mapBlocks(blocks: DbBlogBlock[]): BlogPost["content"] {
  return blocks
    .sort((a, b) => a.position - b.position)
    .map((block) => {
      const data = parseJson(block.data);

      switch (block.type) {
        case "heading":
          return {
            type: "heading",
            level:
              data?.level === 3
                ? 3
                : data?.level === 4
                  ? 4
                  : 2,
            content: block.content ?? "",
          };

        case "image":
          return {
            type: "image",
            src:
              typeof data?.src === "string"
                ? data.src
                : block.content ?? "",
            alt:
              typeof data?.alt === "string"
                ? data.alt
                : "FOSTIIMA Business School",
            caption:
              typeof data?.caption === "string"
                ? data.caption
                : undefined,
          };

        case "list":
          return {
            type: "list",
            items:
              Array.isArray(data?.items)
                ? data.items.filter(
                    (item: unknown): item is string =>
                      typeof item === "string",
                  )
                : [],
          };

        case "table":
          return {
            type: "table",
            headers:
              Array.isArray(data?.headers)
                ? data.headers.filter(
                    (item: unknown): item is string =>
                      typeof item === "string",
                  )
                : [],
            rows:
              Array.isArray(data?.rows)
                ? data.rows.map((row: unknown) =>
                    Array.isArray(row)
                      ? row.filter(
                          (cell: unknown): cell is string =>
                            typeof cell === "string",
                        )
                      : [],
                  )
                : [],
          };

        case "paragraph":
        default:
          return {
            type: "paragraph",
            content: block.content ?? "",
          };
      }
    }) as BlogPost["content"];
}

export function mapDbBlogPost(
  post: DbBlogPost,
): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    coverImage: post.coverImage,
    coverImageAlt: post.coverImageAlt,
    author: post.author,
    publishedAt: post.publishedAt
      ? post.publishedAt.toISOString()
      : undefined,

    seo: {
      metaTitle:
        post.metaTitle ?? post.title,
      metaDescription:
        post.metaDescription ?? post.excerpt,
      keywords: post.blogKeywords.map(
        (item) => item.keyword,
      ),
    },

    content: mapBlocks(post.blocks),
  };
}