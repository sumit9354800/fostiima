import { unstable_cache } from "next/cache";

import {
  CONTENT_REVALIDATE_SECONDS,
  CONTENT_TAGS,
} from "@/lib/content-cache";
import { prisma } from "@/lib/prisma";

// Cached results are stored as JSON, so these select only plain fields (no
// Date values, which would come back from the cache as strings).

export const getHomeContent = unstable_cache(
  async () => {
    const [stats, placementVideos] = await Promise.all([
      prisma.homeStat.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        select: {
          id: true,
          value: true,
          label: true,
          icon: true,
          sortOrder: true,
          isActive: true,
        },
      }),
      prisma.homePlacementVideo.findMany({
        where: { isActive: true },
        orderBy: { sortOrder: "asc" },
        select: { id: true, title: true, batch: true, youtubeId: true },
      }),
    ]);

    return { stats, placementVideos };
  },
  ["home-content"],
  { tags: [CONTENT_TAGS.home], revalidate: CONTENT_REVALIDATE_SECONDS },
);

export const getHomeAbout = unstable_cache(
  async () =>
    prisma.homeAbout.findFirst({
      where: { isActive: true },
      select: {
        eyebrow: true,
        title: true,
        description1: true,
        description2: true,
        highlights: {
          where: { isActive: true },
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
          select: { id: true, icon: true, title: true, description: true },
        },
      },
    }),
  ["home-about"],
  { tags: [CONTENT_TAGS.home], revalidate: CONTENT_REVALIDATE_SECONDS },
);
