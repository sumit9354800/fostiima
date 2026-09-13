"use client";

import { useEffect } from "react";

const HERO_VIDEO = "/videos/fostiima-hero.mp4";

export default function Hero() {
  
  useEffect(() => {
  function handleOpenApply() {
    setIsApplyModalOpen(true);
  }

  window.addEventListener("fostiima:open-apply", handleOpenApply);

  return () => {
    window.removeEventListener("fostiima:open-apply", handleOpenApply);
  };
}, []);

  function closeApplyModal() {
    setIsApplyModalOpen(false);
  }

  return (
    <>
      <section className="relative min-h-[calc(100svh-96px)] overflow-hidden bg-[#071a35]">
        {/* Background Video */}
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

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-[#071a35]/35" />

        <div className="absolute inset-0 bg-gradient-to-b from-[#071a35]/20 via-transparent to-[#071a35]/65" />

      </section>

    </>
  );
}