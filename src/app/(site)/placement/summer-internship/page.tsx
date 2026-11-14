import type { Metadata } from "next";
import SummerInternshipContent from "@/components/placement/summer-internship/SummerInternshipContent";
import SummerInternshipHero from "@/components/placement/summer-internship/SummerInternshipHero";
import { summerInternshipBatches } from "@/data/placement/summer-internship";
import { getCanonicalUrl, withPageSeo } from "@/lib/seo";
const pageMetadata: Metadata = {
  title: "Summer Internship | FOSTIIMA Business School",
  description:
    "Explore summer internship profile-wise data and key highlights across FOSTIIMA batches.",

  alternates: {
    canonical: getCanonicalUrl("/placement/summer-internship"),
  },

  openGraph: {
    type: "website",
    url: getCanonicalUrl("/placement/summer-internship"),
    title: "Summer Internship | FOSTIIMA Business School",
    description:
      "Explore summer internship profile-wise data and key highlights across FOSTIIMA batches.",
    siteName: "FOSTIIMA Business School",
  },
};

export default function SummerInternshipPage() {
  return (
    <main className="bg-white">
      <SummerInternshipHero />

      <SummerInternshipContent
        batches={summerInternshipBatches}
      />
    </main>
  );
}

export const metadata: Metadata = withPageSeo("/placement/summer-internship", pageMetadata);
