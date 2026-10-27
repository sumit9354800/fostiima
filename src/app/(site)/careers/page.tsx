
import type { Metadata } from "next";
import CareersHero from "@/components/careers/CareersHero";
import CareersContent from "@/components/careers/CareersContent";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
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
      <CareersHero />
      <CareersContent />
    </main>
  );
}
