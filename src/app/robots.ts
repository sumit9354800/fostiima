import type { MetadataRoute } from "next";

import {
  GSC_NOV_2026_ALREADY_REDIRECTED,
  GSC_NOV_2026_REDIRECTS,
} from "@/config/gsc-redirects-nov-2026";

// Redirected URLs from "GSC issues nov 2026" that "Disallow: /*.php" would
// block. Google must crawl them to see the 301. "$" ends the match, so only
// the exact URL (with or without its trailing slash) is allowed: other
// ".php" and gallery URLs stay blocked.
const GSC_NOV_2026_ALLOWED = [
  ...Object.values(GSC_NOV_2026_REDIRECTS).flat(),
  ...GSC_NOV_2026_ALREADY_REDIRECTED,
]
  .filter((path) => path.includes(".php"))
  .flatMap((path) => [`${path}$`, `${path}/$`]);

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: [
        "/",
        // These old gallery URLs 301 to /life-at-fostiima (next.config.ts), so
        // they stay crawlable for Google to see the redirect. The longer
        // Allow rule wins over "Disallow: /*.php".
        "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/1/image/45",
        "/life-at-fostiima.php/nggallery/album/freshy-meet-2021-new/page/1/image/22-1",
        "/life-at-fostiima.php/nggallery/album/Workshop-on-Self-Awareness/image/self-awarness",
        "/life-at-fostiima.php/nggallery/album/Workshop-on-Self-Awareness/image/self-awarness-1",
        "/life-at-fostiima.php/nggallery/album/Workshop-on-Self-Awareness/image/self-awarness-3",
        "/life-at-fostiima.php/nggallery/album/lohri-2024/page/2/image/img_8715",
        ...GSC_NOV_2026_ALLOWED,
      ],
      // /_next/ must stay crawlable: it serves the CSS, JavaScript and
      // optimised images Google needs to render and index the pages.
      disallow: [
        "/admin/",
        "/api/",
        // Retired URLs from the old PHP/WordPress site (GSC, October 2026).
        // No current page has ".php" in its path; this also covers every
        // "/life-at-fostiima.php/nggallery/..." gallery URL.
        "/*.php",
        "/blog/the-ultimate-guide-to-success-when-seeking-an-mba-pgdm",
        // Malformed homepage URLs "/&" and "/$". "$" is the end-of-URL anchor
        // in robots.txt, so a literal "$" must be written as "%24".
        "/&",
        "/%24",
      ],
    },

    sitemap: [
      "https://www.fostiima.org/sitemap.xml",
      "https://www.fostiima.org/sitemap-images.xml",
      "https://www.fostiima.org/sitemap-index.xml",
      "https://www.fostiima.org/sitemap-videos.xml",
    ],
    host: "https://www.fostiima.org",
  };
}
