const HERO_VIDEO = "/videos/fostiima-hero.mp4";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100svh-96px)] overflow-hidden bg-[#071a35]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-[#071a35]/35" />

      <div className="absolute inset-0 bg-gradient-to-b from-[#071a35]/20 via-transparent to-[#071a35]/65" />
    </section>
  );
}