
import { prisma } from "@/lib/prisma";

export async function getHomeContent() {
  const hero = await prisma.homeHero.findFirst({
    where: { isActive: true },
    orderBy: { createdAt: "desc" },
  });

  const stats = await prisma.homeStat.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });


  const about = await prisma.homeAbout.findFirst({
    where: { isActive: true },
    include: {
      highlights: {
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
      },
    },
  });

  const placementVideos = await prisma.homePlacementVideo.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return {
    hero,
    stats,
    about,
    placementVideos,
  };
}
