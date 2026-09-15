import type { Metadata } from "next";

import CertificationDetails from "@/components/admissions/CertificationDetails";
import CuttingEdgeCourses from "@/components/admissions/CuttingEdgeCourses";
import FeeInclusions from "@/components/admissions/FeeInclusions";
import FeeSchedule from "@/components/admissions/FeeSchedule";
import FeeStructureHero from "@/components/admissions/FeeStructureHero";
import SelectGroup from "@/components/admissions/SelectGroup";
import { feeStructureData } from "@/data/fee-structure";

export const metadata: Metadata = {
  title: "Fee Structure | FOSTIIMA Business School",
  description:
    "Explore the fee structure, installment schedule, Select Group eligibility, fee inclusions, cutting edge courses and certification details for FOSTIIMA Business School PGDM Admissions 2026-28.",
};

export default function FeeStructurePage() {
  const {
    title,
    program,
    totalFee,
    installments,
    selectGroup,
    inclusions,
    cuttingEdgeCourses,
    certificationDetails,
  } = feeStructureData;

  return (
    <main className="bg-white">
      <FeeStructureHero
        title={title}
        program={program}
        totalFee={totalFee}
      />

      <FeeSchedule installments={installments} />

      <SelectGroup
        totalFee={selectGroup.totalFee}
        placement={selectGroup.placement}
        eligibility={selectGroup.eligibility}
      />

      <FeeInclusions inclusions={inclusions} />

      <CuttingEdgeCourses courses={cuttingEdgeCourses} />

      <CertificationDetails details={certificationDetails} />
    </main>
  );
}