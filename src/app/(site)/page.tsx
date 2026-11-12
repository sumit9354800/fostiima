export const dynamic = "force-dynamic";
import AboutSection from "@/components/home/AboutSection";
import CampusHighlights from "@/components/home/CampusHighlights";
import Hero from "@/components/home/Hero";
import RecognitionSection from "@/components/home/RecognitionSection";
import RecruitersSection from "@/components/home/RecruitersSection";
import StatsBar, { StatsBarPlaceholder } from "@/components/home/StatsBar";
import ProgramsSection from "@/components/home/ProgramsSection";
import StudentAchievementsSection from "@/components/common/StudentAchievementsSection";
import ConclaveSection from "@/components/conclave/ConclaveSection";
import AwardsSection from "@/components/home/AwardsSection";
import CampusLifeSection from "@/components/home/CampusLifeSection";
import FacultySection from "@/components/home/FacultySection";
import ReviewSection from "@/components/reviews/ReviewSection";
import FAQSection from "@/components/home/FAQSection";
import MediaPresenceSection from "@/components/home/MediaPresenceSection";
import PlacementVideos from "@/components/home/PlacementVideos";
import LeadershipMessage from "@/components/home/LeadershipMessage";
import {
  getHomeAbout,
  getHomePlacementVideos,
  getHomeStats,
} from "@/lib/admin/home";
import { Suspense } from "react";
import PlacementGallery from "@/components/home/PlacementGallery";
import type { Metadata } from "next";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "FOSTIIMA Business School | Top PGDM Institute in Delhi",
  description:
    "Discover FOSTIIMA Business School, its PGDM programs, placements, faculty, campus life, recruiters and academic excellence in Delhi.",

  alternates: {
    canonical: getCanonicalUrl("/"),
  },

  openGraph: {
    type: "website",
    url: getCanonicalUrl("/"),
    title: "FOSTIIMA Business School | Top PGDM Institute in Delhi",
    description:
      "Discover FOSTIIMA Business School, its PGDM programs, placements, faculty, campus life, recruiters and academic excellence in Delhi.",
    siteName: "FOSTIIMA Business School",
  },
};

// The hero needs no database data, so it is sent in the first HTML flush. The
// sections below it (same order as before) wait for the homepage queries,
// which now run in parallel, inside one Suspense boundary.
export default function HomePage() {
  return (
    <>
      <Hero />

      <Suspense fallback={<HomeSectionsFallback />}>
        <HomeSections />
      </Suspense>
    </>
  );
}

// Reserves the stats bar's exact size, plus at least a screen of space so the
// footer stays out of view until the sections arrive.
function HomeSectionsFallback() {
  return (
    <>
      <StatsBarPlaceholder />
      <div aria-hidden="true" className="min-h-screen bg-white" />
    </>
  );
}

async function HomeSections() {
  // getHomeAbout() is started here so it runs alongside the other two
  // queries; AboutSection awaits the same cached request.
  const [stats, placementVideos] = await Promise.all([
    getHomeStats(),
    getHomePlacementVideos(),
    getHomeAbout(),
  ]);

  const videos = placementVideos.map((video) => ({
    id: video.id,
    title: video.title,
    batch: video.batch,
    youtubeUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
  }));

  return (
    <>
      <StatsBar stats={stats} />

      <RecognitionSection />

      <AboutSection />

      <LeadershipMessage />

      <PlacementVideos videos={videos} />

      <CampusHighlights />

      <ProgramsSection />

      <StudentAchievementsSection />

      <ConclaveSection />

      <AwardsSection />

      <CampusLifeSection />

      <FacultySection />

      <RecruitersSection />

      <MediaPresenceSection />

      <ReviewSection />

      <PlacementGallery />

      <FAQSection />
    </>
  );
}
