
import type { Metadata } from "next";
import CareersHero from "@/components/careers/CareersHero";
import CareersContent from "@/components/careers/CareersContent";
import { getCanonicalUrl, withPageSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { PAGE_STRUCTURED_DATA } from "@/config/structured-data";

const pageMetadata: Metadata = {
  title: "Careers | FOSTIIMA Business School",
  description:
    "Explore career opportunities and current openings at FOSTIIMA Business School.",

  alternates: {
    canonical: getCanonicalUrl("/careers"),
  },

  openGraph: {
    type: "website",
    url: getCanonicalUrl("/careers"),
    title: "Careers | FOSTIIMA Business School",
    description:
      "Explore career opportunities and current openings at FOSTIIMA Business School.",
    siteName: "FOSTIIMA Business School",
  },
};

export default function CareersPage() {
  return (
    <main>
      <JsonLd data={PAGE_STRUCTURED_DATA["/careers"]} />

      <CareersHero />
      <CareersContent />
    </main>
  );
}

export const metadata: Metadata = withPageSeo("/careers", pageMetadata);
