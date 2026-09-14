import AboutSection from "@/components/home/AboutSection";
import CampusHighlights from "@/components/home/CampusHighlights";
import Hero from "@/components/home/Hero";
import PlacementVideos from "@/components/home/PlacementVideos";
import RecognitionSection from "@/components/home/RecognitionSection";
import RecruitersSection from "@/components/home/RecruitersSection";
import StatsBar from "@/components/home/StatsBar";
import ProgramsSection from "@/components/home/ProgramsSection";
import ConclaveSection from "@/components/conclave/ConclaveSection";
import AwardsSection from "@/components/home/AwardsSection";
import CampusLifeSection from "@/components/home/CampusLifeSection";
import FacultySection from "@/components/home/FacultySection";

export default function HomePage() {
  return (
    <>
      <Hero />

      <StatsBar />

      <RecognitionSection />

      <AboutSection />

      <PlacementVideos />

      <CampusHighlights />

      <ProgramsSection />

      <ConclaveSection />

      <AwardsSection />

      <CampusLifeSection />

      <FacultySection />

      <RecruitersSection />
    </>
  );
}