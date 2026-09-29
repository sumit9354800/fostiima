import { placementPages } from "@/data/placement";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type PlacementSlug = keyof typeof placementPages;

export default async function PlacementDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!(slug in placementPages)) {
    notFound();
  }

  const page = placementPages[slug as PlacementSlug];

  return (
    <main className="min-h-screen bg-white">
      <section className="px-6 py-16 text-center sm:px-10 lg:px-20">

        <h1 className="mt-4 text-4xl font-bold text-[#c31e3b] sm:text-5xl">
          {page.title}
        </h1>

        <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#64748b] sm:text-lg">
          {page.description}
        </p>
      </section>

      {page.rowImages && page.rowImages.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {page.rowImages.map((image, index) => (
              <div
                key={`${slug}-row-${index}`}
                className="relative aspect-square overflow-hidden rounded-xl bg-[#eef2f7]"
              >
                <Image
                  src={image}
                  alt={`${page.title} - Image ${index + 1}`}
                  fill
                  sizes="
                    (max-width: 640px) 50vw,
                    (max-width: 1024px) 33vw,
                    20vw
                  "
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {page.fullImages && page.fullImages.length > 0 && (
        <section className="w-full">
          {page.fullImages.map((image, index) => (
            <div
              key={`${slug}-full-${index}`}
              className="w-full overflow-hidden"
            >
              <Image
                src={image}
                alt={`${page.title} - ${index + 1}`}
                width={1920}
                height={1080}
                priority={index === 0}
                sizes="100vw"
                className="block h-auto w-full"
              />
            </div>
          ))}
        </section>
      )}

      <div className="flex justify-center px-6 py-12">
        <Link
          href="/placement"
          className="
            inline-flex
            items-center
            rounded-full
            bg-[#061a3a]
            px-7
            py-3
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#c31e3b]
          "
        >
          ← Back to Placement
        </Link>
      </div>
    </main>
  );
}