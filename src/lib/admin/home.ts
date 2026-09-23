import { prisma } from "@/lib/prisma";

export async function getHomeContent() {
  const [
    hero,
    stats,
    recognitions,
    about,
    placementVideos,
    campusHighlights,
    programs,
    awards,
    campusLife,
    recruiters,
  ] = await Promise.all([
    prisma.homeHero.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    }),

    prisma.homeStat.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),

    prisma.homeRecognition.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),

    prisma.homeAbout.findFirst({
      where: { isActive: true },
      include: {
        highlights: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
      },
    }),

    prisma.homePlacementVideo.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),

    prisma.homeCampusHighlight.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),

    prisma.homeProgram.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),

    prisma.homeAward.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),

    prisma.homeCampusLife.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),

    prisma.homeRecruiter.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    }),
  ]);

  return {
    hero,
    stats,
    recognitions,
    about,
    placementVideos,
    campusHighlights,
    programs,
    awards,
    campusLife,
    recruiters,
  };
}