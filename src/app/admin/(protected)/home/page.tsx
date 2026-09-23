import Link from "next/link";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Building2,
  Clapperboard,
  GraduationCap,
  ImageIcon,
  LayoutDashboard,
  PlaySquare,
  Users,
} from "lucide-react";

const homeSections = [
  {
    title: "Hero",
    description: "Manage the homepage hero video and primary presentation.",
    href: "/admin/home/hero",
    icon: PlaySquare,
  },
  {
    title: "Stats",
    description: "Manage homepage statistics and key institutional figures.",
    href: "/admin/home/stats",
    icon: BarChart3,
  },
  {
    title: "Recognition",
    description: "Manage recognition and affiliation logos.",
    href: "/admin/home/recognition",
    icon: Award,
  },
  {
    title: "About",
    description: "Manage homepage About FOSTIIMA content and highlights.",
    href: "/admin/home/about",
    icon: Building2,
  },
  {
    title: "Placement Videos",
    description: "Manage placement-related YouTube videos shown on the homepage.",
    href: "/admin/home/placement-videos",
    icon: Clapperboard,
  },
  {
    title: "Campus Highlights",
    description: "Manage the homepage campus highlight cards.",
    href: "/admin/home/campus-highlights",
    icon: ImageIcon,
  },
  {
    title: "Programs",
    description: "Manage programmes displayed on the homepage.",
    href: "/admin/home/programs",
    icon: GraduationCap,
  },
  {
    title: "Awards",
    description: "Manage awards and accreditation content.",
    href: "/admin/home/awards",
    icon: Award,
  },
  {
    title: "Campus Life",
    description: "Manage campus life content shown on the homepage.",
    href: "/admin/home/campus-life",
    icon: BookOpen,
  },
  {
    title: "Recruiters",
    description: "Manage recruiter logos displayed on the homepage.",
    href: "/admin/home/recruiters",
    icon: Users,
  },
];

export default function HomeAdminPage() {
  return (
    <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="border border-[#dbe3ee] bg-white">
        <div className="border-b border-[#dbe3ee] px-6 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-[#061a3a] text-[#e5b83f]">
              <LayoutDashboard className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
                Homepage
              </p>

              <h1 className="mt-1 text-2xl font-bold text-[#061a3a]">
                Home Page Management
              </h1>
            </div>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-500">
            Manage the editable sections of the FOSTIIMA homepage from one
            place. Changes made here will be used by the public website.
          </p>
        </div>

        <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:p-8">
          {homeSections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.href}
                href={section.href}
                className="group border border-[#dbe3ee] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/30 hover:shadow-[0_12px_30px_rgba(6,26,58,0.08)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center bg-[#061a3a] text-[#e5b83f]">
                    <Icon className="h-5 w-5" />
                  </div>

                  <ArrowRight className="h-5 w-5 text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#c31e3b]" />
                </div>

                <h2 className="mt-5 text-base font-bold text-[#061a3a]">
                  {section.title}
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {section.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}