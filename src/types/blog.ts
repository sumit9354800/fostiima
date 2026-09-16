export type BlogStatus = "draft" | "published";

export type BlogBlock =
  | {
      type: "paragraph";
      content: string;
    }
  | {
      type: "heading";
      level: 2 | 3;
      content: string;
    }
  | {
      type: "list";
      items: string[];
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    }
  | {
      type: "image";
      src: string;
      alt: string;
      caption?: string;
    };

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  coverImageAlt: string;
  author: string;
  publishedAt: string;
  status: BlogStatus;
  content: BlogBlock[];
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
};