import type { Metadata } from "next";

import AdmissionProcess from "@/components/admissions/AdmissionProcess";
import ApplicationRequirements from "@/components/admissions/ApplicationRequirements";
import ApplicationSubmission from "@/components/admissions/ApplicationSubmission";
import FeatSection from "@/components/admissions/FeatSection";
import HowToApplyHero from "@/components/admissions/HowToApplyHero";
import PgdmOverview from "@/components/admissions/PgdmOverview";
import WorkExperience from "@/components/admissions/WorkExperience";
import { howToApplyData } from "@/data/how-to-apply";

export const metadata: Metadata = {
  title: "How to Apply | FOSTIIMA Business School",
  description:
    "Learn about the application requirements, admission process, PGDM eligibility, work experience criteria and FEAT at FOSTIIMA Business School.",
};

export default function HowToApplyPage() {
  const {
    applicationRequirements,
    submission,
    applicationKit,
    pgdm,
    admissionProcess,
    workExperience,
    feat,
  } = howToApplyData;

  return (
    <main className="bg-white">
      <HowToApplyHero />

      <ApplicationRequirements
        requirements={applicationRequirements}
      />

      <ApplicationSubmission
        submission={submission}
        applicationKit={applicationKit}
      />

      <PgdmOverview
        title={pgdm.title}
        paragraphs={pgdm.paragraphs}
      />

      <AdmissionProcess
        title={admissionProcess.title}
        intro={admissionProcess.intro}
        factors={admissionProcess.factors}
        cutoff={admissionProcess.cutoff}
      />

      <WorkExperience
        title={workExperience.title}
        paragraphs={workExperience.paragraphs}
      />

      <FeatSection
        title={feat.title}
        paragraphs={feat.paragraphs}
      />
    </main>
  );
}