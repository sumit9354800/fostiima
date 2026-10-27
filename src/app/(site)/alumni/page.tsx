import type { Metadata } from "next";
import AlumniSections from "@/components/alumni/AlumniSections";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Alumni | FOSTIIMA Business School",
  description:
    "Discover the FOSTIIMA Business School alumni community, its professional achievements, career journeys and lasting connections.",

  alternates: {
    canonical: getCanonicalUrl("/alumni"),
  },
};

export default function AlumniPage() {
  return <AlumniSections />;
}