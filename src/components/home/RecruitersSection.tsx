"use client";
import { useState } from "react";

const recruiterLogos = [
  {
    src: "/home/company-logo/company-logo1.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo2.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo3.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo4.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo5.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo6.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo7.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo8.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo9.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo10.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo11.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo12.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo13.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo14.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo15.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo16.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo17.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo18.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo19.webp",
    alt: "Recruiter",
  },
  {
    src: "/home/company-logo/company-logo20.webp",
    alt: "Recruiter",
  },
];

const firstRow = recruiterLogos.slice(0, 9);
const secondRow = recruiterLogos.slice(9);

type RecruiterLogo = {
  src: string;
  alt: string;
};

type LogoRowProps = {
  logos: RecruiterLogo[];
  direction: "left" | "right";
};

function LogoRow({ logos, direction }: LogoRowProps) {
  const [isPaused, setIsPaused] = useState(false);

  const duplicatedLogos = [...logos, ...logos];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className={
          direction === "left"
            ? "animate-recruiters-left flex w-max gap-4"
            : "animate-recruiters-right flex w-max gap-4"
        }
        style={{
          animationPlayState: isPaused ? "paused" : "running",
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.src}-${index}`}
            className="flex h-[76px] w-[150px] shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 shadow-[0_4px_18px_rgba(18,59,121,0.04)] transition-all duration-300 hover:border-[#123b79]/30 hover:shadow-[0_8px_25px_rgba(18,59,121,0.08)] sm:h-[82px] sm:w-[170px]"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              loading="lazy"
              className="max-h-[48px] max-w-[125px] object-contain sm:max-h-[52px] sm:max-w-[145px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RecruitersSection() {
  return (
    <section
      aria-labelledby="recruiters-heading"
      className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-12">
          <p className="text-md font-bold uppercase tracking-[0.18em] text-[#c31e3b] sm:text-sm">
            Career Opportunities
          </p>

          <h2
            id="recruiters-heading"
            className="mt-2 font-serif text-4xl font-bold leading-tight text-[#123b79] sm:text-5xl"
          >
            Our Prominent <span className="text-[#c31e3b]">Recruiters</span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
            Leading organisations across industries recruit talented
            professionals from FOSTIIMA Business School.
          </p>
        </div>

        {/* Marquee */}
        <div className="relative space-y-4">
          {/* Left → Right */}
          <LogoRow logos={firstRow} direction="right" />

          {/* Right → Left */}
          <LogoRow logos={secondRow} direction="left" />
        </div>
      </div>
    </section>
  );
}
