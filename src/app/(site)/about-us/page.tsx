import AboutHero from "@/components/about/AboutHero";
import AboutFostiima from "@/components/about/AboutFostiima";
import VisionMission from "@/components/about/VisionMission";
import ChairmanMessage from "@/components/about/ChairmanMessage";
import FoundingVision from "@/components/about/FoundingVision";
import ObjectivesSection from "@/components/about/ObjectivesSection";
import InfrastructureSection from "@/components/about/InfrastructureSection";
import type { Metadata } from "next";
import { buildPageMetadata, withPageSeo } from "@/lib/seo";

const pageMetadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Learn about FOSTIIMA Business School in Delhi: our founders, vision, objectives, chairman's message and campus infrastructure.",
  path: "/about-us",
});

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

export const metadata: Metadata = withPageSeo("/about-us", pageMetadata);
