import { cloudinaryAsset } from "@/lib/cloudinary";

const recognitions = [

  {

    src: "/badge/badge1.webp",

    alt: "National board or accredition",

  },

  {

    src: "/badge/badge2.webp",

    alt: "Association of Indian Universities recognition",

  },

  {

    src: "/badge/badge3.webp",

    alt: "AICTE approval",

  },

];

export default function RecognitionSection() {
  return (
    <section className="border-y border-slate-100 bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Heading */}
          <div className="text-center sm:text-left">
            <p className="text-md font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
              Recognition & Affiliations
            </p>

            <h2 className="mt-1 text-xl font-bold text-[#123b79] sm:text-2xl">
              Recognised & Affiliated
            </h2>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-8 sm:gap-10">
            {recognitions.map((recognition) => (
              <div
                key={recognition.src}
                className="flex h-20 w-20 items-center justify-center rounded-xl border border-slate-200 bg-white p-2 sm:h-24 sm:w-24"
              >
                <img
                  src={recognition.src}
                  alt={recognition.alt}
                  width={96}
                  height={96}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}