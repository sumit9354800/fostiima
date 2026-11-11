import type { Metadata } from "next";
import AlumniSections from "@/components/alumni/AlumniSections";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Alumni",
  description:
    "Discover the FOSTIIMA Business School alumni community, its professional achievements, career journeys and lasting connections.",
  path: "/alumni",
});

export default function AlumniPage() {
  return <AlumniSections />;
}