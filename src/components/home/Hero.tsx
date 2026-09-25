
import { prisma } from "@/lib/prisma";

const DEFAULT_HERO_VIDEO = "/videos/fostiima-hero.mp4";

export default async function Hero() {
  const hero = await prisma.homeHero.findFirst({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const heroVideo = hero?.videoUrl || DEFAULT_HERO_VIDEO;

  return (
    <section className="relative w-full overflow-hidden bg-[#071a35]">
      <video
        className="block h-auto w-full"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* <div className="absolute inset-0 bg-[#071a35]/35" /> */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#071a35]/20 via-transparent to-[#071a35]/65" />
    </section>
  );
}
