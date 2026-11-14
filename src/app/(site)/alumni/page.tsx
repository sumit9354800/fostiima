import type { Metadata } from "next";
import AlumniSections from "@/components/alumni/AlumniSections";
import { buildPageMetadata, withPageSeo } from "@/lib/seo";

const pageMetadata: Metadata = buildPageMetadata({
  title: "Alumni",
  description:
    "Discover the FOSTIIMA Business School alumni community, its professional achievements, career journeys and lasting connections.",
  path: "/alumni",
});

export default function AlumniPage() {
  return <AlumniSections />;
}

export const metadata: Metadata = withPageSeo("/alumni", pageMetadata);
