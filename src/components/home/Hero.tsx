

const DEFAULT_HERO_VIDEO = "uploads/videos/IMG_7575.MOV";

// Smaller re-encodes of IMG_7575.MOV (same 1920x1080 frames, 60 s, stereo audio).
// The browser plays the first source it supports; the original MOV stays last
// as the fallback.
const HERO_VIDEO_WEBM = "uploads/videos/IMG_7575.webm";
const HERO_VIDEO_MP4 = "uploads/videos/IMG_7575.mp4";
const HERO_VIDEO_POSTER = "uploads/videos/IMG_7575-poster.webp";

export default async function Hero() {


  const heroVideo = DEFAULT_HERO_VIDEO

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
        // The first frame shows until playback starts, and width/height
        // reserve the 16:9 space so nothing below the hero shifts.
        poster={HERO_VIDEO_POSTER}
        width={1920}
        height={1080}
      >
        <source src={HERO_VIDEO_WEBM} type='video/webm; codecs="vp9, opus"' />
        <source
          src={HERO_VIDEO_MP4}
          type='video/mp4; codecs="avc1.640028, mp4a.40.2"'
        />
        <source src={heroVideo} type="video/mp4" />
      </video>

      {/* <div className="absolute inset-0 bg-[#071a35]/35" /> */}

      <div className="absolute inset-0 bg-gradient-to-b from-[#071a35]/20 via-transparent to-[#071a35]/65" />
    </section>
  );
}
