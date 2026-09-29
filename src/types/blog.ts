export type BlogHeadingBlock = {
  type: "heading";
  level: 2 | 3 | 4;
  content: string;
};

export type BlogParagraphBlock = {
  type: "paragraph";
  content: string;
};

export type BlogImageBlock = {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
};

export type BlogListBlock = {
  type: "list";
  items: string[];
};

export type BlogTableBlock = {
  type: "table";
  headers: string[];
  rows: string[][];
};

export type BlogContentBlock =
  | BlogHeadingBlock
  | BlogParagraphBlock
  | BlogImageBlock
  | BlogListBlock
  | BlogTableBlock;

export type BlogSeo = {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
};

export type BlogPost = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  publishedAt: string | null;
  status: "draft" | "published";
  content: BlogContentBlock[];
  seo: BlogSeo;
};