import type { Metadata } from "next";

import NIRFHero from "@/components/nirf/NIRFHero";
import NIRFOverview from "@/components/nirf/NIRFOverview";
import NIRFStudentStrength from "@/components/nirf/NIRFStudentStrength";
import NIRFPlacement from "@/components/nirf/NIRFPlacement";
import NIRFFinancialResources from "@/components/nirf/NIRFFinancialResources";
import NIRFResearch from "@/components/nirf/NIRFResearch";
import NIRFConsultancy from "@/components/nirf/NIRFConsultancy";
import NIRFEDP from "@/components/nirf/NIRFEDP";
import NIRFPwDFacilities from "@/components/nirf/NIRFPwDFacilities";
import NIRFFaculty from "@/components/nirf/NIRFFaculty";
import NIRFIntake from "@/components/nirf/ NIRFIntake";

export const metadata: Metadata = {
  title: "NIRF 2026 | FOSTIIMA Business School",
  description:
    "View submitted NIRF 2026 institute data for FOSTIIMA Business School, including intake, student strength, placement, financial resources, research and faculty details.",
};

export default function NIRFPage() {
  return (
    <>
      <NIRFHero />

      <NIRFOverview />

      <NIRFIntake />

      <NIRFStudentStrength />

      <NIRFPlacement />

      <NIRFFinancialResources />

      <NIRFResearch />

      <NIRFConsultancy />

      <NIRFEDP />

      <NIRFPwDFacilities />

      <NIRFFaculty />
    </>
  );
}