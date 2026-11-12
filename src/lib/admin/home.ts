import { cache } from "react";

import { prisma } from "@/lib/prisma";

// Homepage data. Each getter is wrapped in React cache(), which lasts for one
// server request only: the data stays fresh on every request, and a getter
// called from more than one component still runs its query once.
//
// The homepage no longer reads the HomeHero row or a second copy of HomeAbout:
// neither result was used (the hero is a fixed video, and AboutSection reads
// HomeAbout through getHomeAbout below).

export const getHomeStats = cache(() =>
  prisma.homeStat.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  }),
);

export const getHomePlacementVideos = cache(() =>
  prisma.homePlacementVideo.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  }),
);

// Same query AboutSection has always run (highlights ordered by sortOrder,
// then createdAt).
export const getHomeAbout = cache(() =>
  prisma.homeAbout.findFirst({
    where: {
      isActive: true,
    },
    include: {
      highlights: {
        where: {
          isActive: true,
        },
        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            createdAt: "asc",
          },
        ],
      },
    },
  }),
);
