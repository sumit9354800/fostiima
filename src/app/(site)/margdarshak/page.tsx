import type { Metadata } from "next";

import AboutMargdarshak from "@/components/margdarshak/AboutMargdarshak";
import MargdarshakHero from "@/components/margdarshak/MargdarshakHero";
import MargdarshakTabs from "@/components/margdarshak/MargdarshakTabs";

export const metadata: Metadata = {
  title: "Margdarshak | FOSTIIMA Business School",
  description:
    "Explore the Margdarshak Awards, their editions, award process, jury panels, advisory councils and winners at FOSTIIMA Business School.",
};

export default function MargdarshakPage() {
  return (
    <main>
      <MargdarshakHero />

      <AboutMargdarshak />

      <MargdarshakTabs />
    </main>
  );
}