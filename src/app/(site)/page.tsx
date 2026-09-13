import AboutSection from "@/components/home/AboutSection";
import Hero from "@/components/home/Hero";
import PlacementVideos from "@/components/home/PlacementVideos";
import RecognitionSection from "@/components/home/RecognitionSection";
import StatsBar from "@/components/home/StatsBar";

export default function HomePage() {
  return (
    <>
      <Hero />

      <StatsBar />

      <RecognitionSection />

      <AboutSection />

      <PlacementVideos />
    </>
  );
}