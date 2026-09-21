import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type AdminModuleCardProps = {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
};

export default function AdminModuleCard({
  title,
  description,
  href,
  icon: Icon,
}: AdminModuleCardProps) {
  return (
    <Link
      href={href}
      className="group border border-[#dbe3ee] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#c31e3b]/30 hover:shadow-[0_12px_30px_rgba(6,26,58,0.08)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center bg-[#061a3a] text-[#e5b83f]">
          <Icon className="h-5 w-5" />
        </div>

        <ArrowUpRight className="h-5 w-5 text-slate-300 transition-colors group-hover:text-[#c31e3b]" />
      </div>

      <h2 className="mt-6 text-lg font-bold text-[#061a3a]">
        {title}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </Link>
  );
}