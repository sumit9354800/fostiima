
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/seo";

import { CampusGallerySection } from "@/components/life-at-fostiima/CampusGallerySection";
import { LifeAtFostiimaCTA } from "@/components/life-at-fostiima/LifeAtFostiimaCTA";
import { LifeAtFostiimaHero } from "@/components/life-at-fostiima/LifeAtFostiimaHero";

export const metadata: Metadata = {
  title: "Life at FOSTIIMA | FOSTIIMA Business School",
  description:
    "Explore campus life at FOSTIIMA Business School through campus galleries, student experiences and campus activities.",

  alternates: {
    canonical: getCanonicalUrl("/life-at-fostiima"),
  },

  openGraph: {
    type: "website",
    url: getCanonicalUrl("/life-at-fostiima"),
    title: "Life at FOSTIIMA | FOSTIIMA Business School",
    description:
      "Explore campus life at FOSTIIMA Business School through campus galleries, student experiences and campus activities.",
    siteName: "FOSTIIMA Business School",
  },
};

export default function LifeAtFostiimaPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <LifeAtFostiimaHero />
      <CampusGallerySection />
      <LifeAtFostiimaCTA />
    </main>
  );
}
