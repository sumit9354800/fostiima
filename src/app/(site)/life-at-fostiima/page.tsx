import { CampusGallerySection } from "@/components/life-at-fostiima/CampusGallerySection";
import { LifeAtFostiimaCTA } from "@/components/life-at-fostiima/LifeAtFostiimaCTA";
import { LifeAtFostiimaHero } from "@/components/life-at-fostiima/LifeAtFostiimaHero";

export default function LifeAtFostiimaPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <LifeAtFostiimaHero />
      <CampusGallerySection />
      <LifeAtFostiimaCTA />
    </main>
  );
}