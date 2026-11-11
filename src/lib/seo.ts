import type { Metadata } from "next";

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
