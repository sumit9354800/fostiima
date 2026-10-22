
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProgramsSection from "@/components/home/ProgramsSection";
import MediaPresenceSection from "@/components/home/MediaPresenceSection";
import SiteSearch from "@/components/common/SiteSearch";
import { getHomeContent } from "@/lib/admin/home";

export default async function NotFound() {
  const { programs } = await getHomeContent();

  return (
    <>
      <Header />

      <main className="bg-white">
        {/* 404 Not Found Section */}
        <section className="px-5 pb-4 pt-12 text-center sm:pt-16">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
              Error 404
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Page Not Found
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base">
              Oops! The page you&apos;re looking for may have been moved,
              removed, or doesn&apos;t exist. Search below to find what
              you need.
            </p>

            <div className="mx-auto mt-5 flex items-center justify-center gap-2 text-sm text-gray-500">
              <span className="h-px w-8 bg-gray-300" />
              <span>Let&apos;s find your way</span>
              <span className="h-px w-8 bg-gray-300" />
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <SiteSearch />

        {/* Existing Programs Section */}
        <ProgramsSection programs={programs} />

        {/* Existing Media / News Section */}
        <MediaPresenceSection />
      </main>

      <Footer />
    </>
  );
}
