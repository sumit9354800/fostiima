// Web encodes of the original camera file IMG_7575.MOV (1920x1080, 60 s).
// Browsers play the first source they support: WebM (34 MB) in Chrome, Edge
// and Firefox, MP4/H.264 (40 MB) in Safari. The 95 MB .MOV is no longer served.
const HERO_VIDEO_WEBM = "/uploads/videos/IMG_7575.webm";
const HERO_VIDEO_MP4 = "/uploads/videos/IMG_7575.mp4";
const HERO_VIDEO_POSTER = "/uploads/videos/IMG_7575-poster.webp";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-[#071a35]">
      {/* The hero is a video, so the page's one H1 is visually hidden. */}
      <h1 className="sr-only">
        FOSTIIMA Business School – PGDM College in Delhi NCR
      </h1>

      <video
        className="block h-auto w-full"
        autoPlay
        muted
        loop
        playsInline
        // Nothing is fetched before autoplay asks for it; until then the
        // poster shows, and width/height reserve the 16:9 space so the page
        // below does not shift.
        preload="none"
        poster={HERO_VIDEO_POSTER}
        width={1920}
        height={1080}
        aria-hidden="true"
      >
        <source src={HERO_VIDEO_WEBM} type='video/webm; codecs="vp9, opus"' />
        <source
          src={HERO_VIDEO_MP4}
          type='video/mp4; codecs="avc1.640028, mp4a.40.2"'
        />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-[#071a35]/20 via-transparent to-[#071a35]/65" />
    </section>
  );
}
