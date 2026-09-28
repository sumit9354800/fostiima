import Image from "next/image";

import { cloudinaryAsset } from "@/lib/cloudinary";

const placementImages = [
  cloudinaryAsset("/home/imagesection/1.jpeg"),
  cloudinaryAsset("/home/imagesection/2.jpeg"),
  cloudinaryAsset("/home/imagesection/3.jpeg"),
];
export default function PlacementGallery() {
  if (placementImages.length === 0) return null;

  return (
    <section className="w-full bg-[#f8fafc] py-12 sm:py-16">
      <div
        className="
          mx-auto
          flex
          max-w-7xl
          gap-6
          overflow-x-auto
          px-5
          sm:px-6
          lg:px-8
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {placementImages.map((image, index) => (
          <div
            key={image}
            className="
              group
              relative
              min-w-[88%]
              overflow-hidden
              rounded-2xl
              border
              border-[#dbe3ee]
              bg-white
              shadow-[0_10px_35px_rgba(6,26,58,0.08)]
              transition-all
              duration-500
              hover:-translate-y-1
              hover:shadow-[0_18px_45px_rgba(6,26,58,0.15)]
              sm:min-w-[48%]
              lg:min-w-0
              lg:flex-1
            "
          >
            <div className="overflow-hidden">
              <Image
                src={image}
                alt={`FOSTIIMA Placement ${index + 1}`}
                width={1200}
                height={800}
                sizes="
                  (max-width: 640px) 88vw,
                  (max-width: 1024px) 48vw,
                  33vw
                "
                className="
                  block
                  h-auto
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  ease-out
                  group-hover:scale-105
                "
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
