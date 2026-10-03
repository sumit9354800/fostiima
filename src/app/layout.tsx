import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

const SITE_URL = "https://fostiima.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "FOSTIIMA Business School | PGDM & Management Education",
    template: "%s | FOSTIIMA Business School",
  },

  description:
    "FOSTIIMA Business School offers industry-focused PGDM and management education with strong emphasis on business knowledge, leadership, analytical skills, and career readiness.",

  keywords: [
    "FOSTIIMA Business School",
    "FOSTIIMA",
    "FOSTIIMA Business School Delhi",
    "business School Delhi",
    "PGDM college Delhi",
    "PGDM colleges in Delhi NCR",
    "best PGDM colleges in Delhi NCR",
    "management colleges in Delhi",
    "MBA colleges in Delhi",
    "MBA colleges in Delhi NCR",
    "management education Delhi",
  ],

  authors: [
    {
      name: "FOSTIIMA Business School",
      url: SITE_URL,
    },
  ],

  creator: "FOSTIIMA Business School",
  publisher: "FOSTIIMA Business School",

  applicationName: "FOSTIIMA Business School",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: SITE_URL,
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
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

  twitter: {
    card: "summary_large_image",
    title: "FOSTIIMA Business School | PGDM & Management Education",
    description:
      "Explore PGDM and management education at FOSTIIMA Business School.",
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
        {/* =====================================================
            GOOGLE ADS TAG — AW-11476359647
        ====================================================== */}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-11476359647"
          strategy="afterInteractive"
        />

        <Script id="google-ads-gtag-11476359647" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-11476359647');
          `}
        </Script>

        {/* =====================================================
            GOOGLE ADS TAG — AW-18383056369
        ====================================================== */}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18383056369"
          strategy="afterInteractive"
        />

        <Script id="google-ads-gtag-18383056369" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-18383056369');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}