import { BeyondAcademicsSection } from "@/components/life-at-fostiima/BeyondAcademicsSection";
import { CampusGallerySection } from "@/components/life-at-fostiima/CampusGallerySection";
import { LifeAtFostiimaCTA } from "@/components/life-at-fostiima/LifeAtFostiimaCTA";
import { LifeAtFostiimaHero } from "@/components/life-at-fostiima/LifeAtFostiimaHero";
import { LifeExperienceSection } from "@/components/life-at-fostiima/LifeExperienceSection";
import { StudentJourneySection } from "@/components/life-at-fostiima/StudentJourneySection";
import { CampusActivitiesSection } from '@/components/life-at-fostiima/CampusActivitiesSection';

export default function LifeAtFostiimaPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <LifeAtFostiimaHero />
      <LifeExperienceSection />
      <CampusGallerySection />
      <CampusActivitiesSection />
      <BeyondAcademicsSection />
      <StudentJourneySection />
      <LifeAtFostiimaCTA />
    </main>
  );
}