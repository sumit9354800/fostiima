import type { Metadata } from "next";
import SummerInternshipContent from "@/components/placement/summer-internship/SummerInternshipContent";
import SummerInternshipHero from "@/components/placement/summer-internship/SummerInternshipHero";
import { summerInternshipBatches } from "@/data/placement/summer-internship";

export const metadata: Metadata = {
  title: "Summer Internship | FOSTIIMA Business School",
  description:
    "Explore summer internship profile-wise data and key highlights across FOSTIIMA batches.",
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