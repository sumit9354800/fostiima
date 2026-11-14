import { preload } from "react-dom";

import HeroVideo from "./HeroVideo";

// Web encodes of the original camera recording (1920x1080, 60 s, stereo
// audio). The browser plays the first source it supports: WebM in Chrome,
// Edge and Firefox, MP4/H.264 in Safari.
const HERO_VIDEO_WEBM = "/uploads/videos/IMG_7575.webm";
const HERO_VIDEO_MP4 = "/uploads/videos/IMG_7575.mp4";
const HERO_VIDEO_POSTER = "/uploads/videos/IMG_7575-poster.webp";

// 1280x720 renditions of the same video for screens up to 767 px wide; about
// 40% smaller than the 1080p files, which stay after them as fallbacks.
const HERO_VIDEO_MOBILE_QUERY = "(max-width: 767px)";
const HERO_VIDEO_WEBM_720 = "/uploads/videos/IMG_7575-720p.webm";
const HERO_VIDEO_MP4_720 = "/uploads/videos/IMG_7575-720p.mp4";

export default function Hero() {
  // The poster is the hero's first paint (and the LCP image), so fetch it
  // early and at high priority. Same URL as the poster attribute.
  preload(HERO_VIDEO_POSTER, { as: "image", fetchPriority: "high" });

  return (
    <section className="relative w-full overflow-hidden bg-[#071a35]">
      {/* Sources are attached on the client after the poster has rendered,
          and not at all for reduced-motion visitors; see HeroVideo. */}
      <HeroVideo
        poster={HERO_VIDEO_POSTER}
        sources={[
          { src: HERO_VIDEO_WEBM, type: 'video/webm; codecs="vp9, opus"' },
          {
            src: HERO_VIDEO_MP4,
            type: 'video/mp4; codecs="avc1.640028, mp4a.40.2"',
          },
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

      <div className="absolute inset-0 bg-gradient-to-b from-[#071a35]/20 via-transparent to-[#071a35]/65" />
    </section>
  );
}
