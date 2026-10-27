import AboutHero from "@/components/about/AboutHero";
import AboutFostiima from "@/components/about/AboutFostiima";
import VisionMission from "@/components/about/VisionMission";
import ChairmanMessage from "@/components/about/ChairmanMessage";
import FoundingVision from "@/components/about/FoundingVision";
import ObjectivesSection from "@/components/about/ObjectivesSection";
import InfrastructureSection from "@/components/about/InfrastructureSection";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us | FOSTIIMA Business School",
  alternates: {
    canonical: getCanonicalUrl("/about-us"),
  },
};

export default function AboutUsPage() {
  return (
    <main>
      <AboutHero />

      <AboutFostiima />

      <VisionMission />

      <ChairmanMessage />

      <FoundingVision />

      <ObjectivesSection />

      <InfrastructureSection />
    </main>
  );
}