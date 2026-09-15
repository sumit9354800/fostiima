import type { Metadata } from "next";
import CareersHero from "@/components/careers/CareersHero";
import CareersContent from "@/components/careers/CareersContent";

export const metadata: Metadata = {
  title: "Careers | FOSTIIMA Business School",
  description:
    "Explore career opportunities and current openings at FOSTIIMA Business School.",
};

export default function CareersPage() {
  return (
    <main>
      <CareersHero />
      <CareersContent />
    </main>
  );
}