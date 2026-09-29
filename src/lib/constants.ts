export const BLOG_BLOCK_TYPES = {
  HEADING: "heading",
  PARAGRAPH: "paragraph",
  IMAGE: "image",
  LIST: "list",
  TABLE: "table",
} as const;

export type BlogBlockType =
  (typeof BLOG_BLOCK_TYPES)[keyof typeof BLOG_BLOCK_TYPES];

export const BLOG_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
} as const;

export type BlogStatus =
  (typeof BLOG_STATUS)[keyof typeof BLOG_STATUS];