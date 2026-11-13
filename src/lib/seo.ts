import type { Metadata } from "next";

import { PAGE_SEO } from "@/config/page-seo";

// The site is served from www; canonicals, OG URLs and the sitemap all use it.
export const SITE_URL = "https://www.fostiima.org";
export const SITE_NAME = "FOSTIIMA Business School";

const TITLE_SUFFIX = ` | ${SITE_NAME}`;

export const DEFAULT_OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

/**
 * Generates an absolute canonical URL for a page.
 * Example: getCanonicalUrl("/contact-us")
 *          => https://www.fostiima.org/contact-us
 */
export function getCanonicalUrl(path: string = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return new URL(normalizedPath, SITE_URL).toString();
}

/** Appends " | FOSTIIMA Business School" unless the title already ends with it. */
export function withSiteName(title: string): string {
  const trimmed = title.trim();

  return trimmed.endsWith(TITLE_SUFFIX) ? trimmed : `${trimmed}${TITLE_SUFFIX}`;
}

type PageMetadataInput = {
  /** Page title; the site name is appended when missing. */
  title: string;
  description: string;
  /** Path of the page, e.g. "/programs/pgdm". */
  path: string;
  /** Absolute URL or site path of a share image; defaults to /og-image.jpg. */
  image?: string | null;
  imageAlt?: string;
  type?: "website" | "article";
};

/**
 * Title, description, self-referencing canonical, and matching Open Graph and
 * Twitter tags for one page. Page-level openGraph and twitter objects replace
 * the root layout's entirely, so every field is set here.
 */
export function buildPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  type = "website",
}: PageMetadataInput): Metadata {
  const fullTitle = withSiteName(title);
  const url = getCanonicalUrl(path);
  const ogImage = image
    ? { url: image, alt: imageAlt ?? fullTitle }
    : DEFAULT_OG_IMAGE;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      locale: "en_IN",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage.url],
    },
  };
}

/** Client-supplied SEO text for one page (src/config/page-seo.ts). */
export type PageSeo = {
  /** Complete title, used as given (no site-name suffix is added). */
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
};

/**
 * Applies the client-supplied SEO text for `path` (src/config/page-seo.ts) to
 * a page's existing metadata. Only title, description and the Open Graph /
 * Twitter title and description are replaced, and only where a value is
 * supplied; canonical, robots, images and every other field are kept.
 */
export function withPageSeo(path: string, metadata: Metadata): Metadata {
  const seo = PAGE_SEO[path];
  if (!seo) return metadata;

  // Open Graph text is applied only when supplied: a held OG field keeps the
  // page's existing value instead of falling back to the meta text.
  const { ogTitle, ogDescription } = seo;
  const result: Metadata = { ...metadata };

  if (seo.title) result.title = { absolute: seo.title };
  if (seo.description) result.description = seo.description;

  if (ogTitle || ogDescription) {
    // A page without its own openGraph inherits the root layout's; supplying
    // one here would replace it, so the layout's image and site details are
    // kept in that case.
    const base = metadata.openGraph ?? {
      type: "website" as const,
      siteName: SITE_NAME,
      locale: "en_IN",
      images: [DEFAULT_OG_IMAGE],
    };
    result.openGraph = {
      ...base,
      ...(ogTitle ? { title: ogTitle } : {}),
      ...(ogDescription ? { description: ogDescription } : {}),
    };

    // Explicit Twitter text mirrors the Open Graph text, as it already did.
    if (metadata.twitter) {
      result.twitter = {
        ...metadata.twitter,
        ...(ogTitle ? { title: ogTitle } : {}),
        ...(ogDescription ? { description: ogDescription } : {}),
      };
    }
  }

  return result;
}
