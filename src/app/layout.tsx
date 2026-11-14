import type { Metadata } from "next";
import "./globals.css";
import AttributionCapture from "@/components/common/AttributionCapture";
import PublicTracking from "@/components/common/PublicTracking";

const SITE_URL = "https://www.fostiima.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  // Pages set their full title ("About Us | FOSTIIMA Business School"), so
  // there is no title template; one would append the site name twice.
  title: "FOSTIIMA Business School | PGDM & Management Education",

  description:
    "FOSTIIMA Business School in Delhi offers industry-focused PGDM programmes that build business knowledge, leadership, analytical skills and careers.",

  authors: [{ name: "FOSTIIMA Business School", url: SITE_URL }],
  creator: "FOSTIIMA Business School",
  publisher: "FOSTIIMA Business School",
  applicationName: "FOSTIIMA Business School",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  // Global canonical is intentionally omitted here.
  // Set a self-referencing canonical in each page's metadata.

  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "FOSTIIMA Business School",
    title: "FOSTIIMA Business School | PGDM & Management Education",
    description:
      "Explore PGDM and management education at FOSTIIMA Business School with industry-focused learning, leadership development, analytical skills, and career-oriented programmes.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FOSTIIMA Business School",
      },
    ],
  },

  // No title or description here: on pages that only set openGraph, X/Twitter
  // falls back to that page's og:title and og:description instead of these
  // site-wide defaults.
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* GTM (script + noscript iframe) and Microsoft Clarity, public
            routes only: never rendered on /admin. */}
        <PublicTracking />

        {/* First-touch lead attribution for every public route (not admin). */}
        <AttributionCapture />

        {children}
      </body>
    </html>
  );
}