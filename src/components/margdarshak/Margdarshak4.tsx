import Image from "next/image";

import { getMargdarshakEdition } from "@/data/margdarshak";

export default function Margdarshak4() {
  const edition = getMargdarshakEdition("margdarshak-4");

  if (!edition) {
    return null;
  }

  const visualSection = edition.sections[0];

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
      <div className="border-b border-slate-200 pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
          Margdarshak Awards
        </p>

        <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#102a56] sm:text-3xl">
          {edition.title}
        </h3>
      </div>

      <div className="mt-8 space-y-5">
        {edition.paragraphs.map(
          (paragraph, index) => (
            <p
              key={`${index}-${paragraph.slice(0, 24)}`}
              className="text-sm leading-7 text-slate-600 sm:text-base"
            >
              {paragraph}
            </p>
          ),
        )}
      </div>

      {visualSection?.images && (
        <div className="mt-10 space-y-8">
          {visualSection.images.map(
            (image, index) => (
              <div
                key={image.src}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1400}
                  height={900}
                  priority={index === 0}
                  className="h-auto w-full object-contain"
                />
              </div>
            ),
          )}
        </div>
      )}
    </article>
  );
}