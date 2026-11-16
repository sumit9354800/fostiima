import type { Metadata } from "next";

import AcademicsHero from "@/components/academics/AcademicsHero";
import AcademicOverview from "@/components/academics/AcademicOverview";
import StudentAchievementsSection from "@/components/common/StudentAchievementsSection";
import AcademicHighlights from "@/components/academics/AcademicHighlights";
import { buildPageMetadata, withPageSeo } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";
import { PAGE_STRUCTURED_DATA } from "@/config/structured-data";

const pageMetadata: Metadata = buildPageMetadata({
  title: "Academics",
  description:
    "Explore academics at FOSTIIMA Business School: industry-relevant management education, a contemporary curriculum and analytical learning.",
  path: "/academics",
});

export default function AcademicsPage() {
  return (
    <main>
      <JsonLd data={PAGE_STRUCTURED_DATA["/academics"]} />

      <AcademicsHero />
      <AcademicOverview />
      <StudentAchievementsSection />
      <AcademicHighlights />
    </main>
  );
}

export const metadata: Metadata = withPageSeo("/academics", pageMetadata);
