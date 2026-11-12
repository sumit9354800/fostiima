import { preload } from "react-dom";

import HeroVideo from "./HeroVideo";

const DEFAULT_HERO_VIDEO = "uploads/videos/IMG_7575.MOV";

// Smaller re-encodes of IMG_7575.MOV (same 1920x1080 frames, 60 s, stereo audio).
// The browser plays the first source it supports; the original MOV stays last
// as the fallback.
const HERO_VIDEO_WEBM = "uploads/videos/IMG_7575.webm";
const HERO_VIDEO_MP4 = "uploads/videos/IMG_7575.mp4";
const HERO_VIDEO_POSTER = "uploads/videos/IMG_7575-poster.webp";

// 1280x720 renditions of the same video (same 60 s and stereo audio) for
// screens up to 767 px wide; about 40% smaller than the 1080p files. The
// 1080p WebM/MP4 and the original MOV stay after them as fallbacks.
const HERO_VIDEO_MOBILE_QUERY = "(max-width: 767px)";
const HERO_VIDEO_WEBM_720 = "uploads/videos/IMG_7575-720p.webm";
const HERO_VIDEO_MP4_720 = "uploads/videos/IMG_7575-720p.mp4";

export default async function Hero() {


  const heroVideo = DEFAULT_HERO_VIDEO

  // The poster is the hero's first paint (and the LCP image), so fetch it
  // early and at high priority. The homepage is served at "/", so this is the
  // same URL the relative poster attribute resolves to.
  preload(`/${HERO_VIDEO_POSTER}`, { as: "image", fetchPriority: "high" });

  return (
    <section className="relative w-full overflow-hidden bg-[#071a35]">
      {/* Sources (same order: WebM, MP4, original MOV) are attached on the
          client after the poster has rendered; see HeroVideo. */}
      <HeroVideo
        poster={HERO_VIDEO_POSTER}
        sources={[
          { src: HERO_VIDEO_WEBM, type: 'video/webm; codecs="vp9, opus"' },
          {
            src: HERO_VIDEO_MP4,
            type: 'video/mp4; codecs="avc1.640028, mp4a.40.2"',
          },
          { src: heroVideo, type: "video/mp4" },
        ]}
        mobileMediaQuery={HERO_VIDEO_MOBILE_QUERY}
        mobileSources={[
          { src: HERO_VIDEO_WEBM_720, type: 'video/webm; codecs="vp9, opus"' },
          {
            src: HERO_VIDEO_MP4_720,
            type: 'video/mp4; codecs="avc1.640028, mp4a.40.2"',
          },
        ]}
      />

      {/* <div className="absolute inset-0 bg-[#071a35]/35" /> */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#071a35]/20 via-transparent to-[#071a35]/65" />
    </section>
  );
}
