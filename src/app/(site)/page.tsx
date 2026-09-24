import AboutSection from "@/components/home/AboutSection";
import CampusHighlights from "@/components/home/CampusHighlights";
import Hero from "@/components/home/Hero";
import RecognitionSection from "@/components/home/RecognitionSection";
import RecruitersSection from "@/components/home/RecruitersSection";
import StatsBar from "@/components/home/StatsBar";
import ProgramsSection from "@/components/home/ProgramsSection";
import ConclaveSection from "@/components/conclave/ConclaveSection";
import AwardsSection from "@/components/home/AwardsSection";
import CampusLifeSection from "@/components/home/CampusLifeSection";
import FacultySection from "@/components/home/FacultySection";
import ReviewSection from "@/components/reviews/ReviewSection";
import FAQSection from "@/components/home/FAQSection";
import MediaPresenceSection from "@/components/home/MediaPresenceSection";
import PlacementVideos from "@/components/home/PlacementVideos";

import { getHomeContent } from "@/lib/admin/home";

export default async function HomePage() {
  const {
    stats,
    placementVideos,
    programs,
  } = await getHomeContent();

  const videos = placementVideos.map((video) => ({
    id: video.id,
    title: video.title,
    batch: video.batch,
    youtubeUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
  }));

  return (
    <>
      <Hero />

      <StatsBar stats={stats} />

      <RecognitionSection />

      <AboutSection />

      <PlacementVideos videos={videos} />

      <CampusHighlights />

      <ProgramsSection programs={programs} />

      <ConclaveSection />

      <AwardsSection />

      <CampusLifeSection />

      <FacultySection />

      <RecruitersSection />

      <MediaPresenceSection />

      <ReviewSection />

      <FAQSection />
    </>
  );
}