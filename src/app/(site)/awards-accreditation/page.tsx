import AccreditationGrid from "@/components/awards-accreditation/AccreditationGrid";
import AwardsAccreditationHero from "@/components/awards-accreditation/AwardsAccreditationHero";

export default function AwardsAccreditationPage() {
  return (
    <main className="min-h-screen bg-white">
      <AwardsAccreditationHero />
      <AccreditationGrid />
    </main>
  );
}