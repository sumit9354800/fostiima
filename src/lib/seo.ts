const SITE_URL = "https://www.fostiima.org";

/**
 * Generates an absolute canonical URL for a page.
 * Example: getCanonicalUrl("/contact-us")
 *          => https://www.fostiima.org/contact-us
 */
export function getCanonicalUrl(path: string = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return new URL(normalizedPath, SITE_URL).toString();
}