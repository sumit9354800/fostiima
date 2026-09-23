import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  Building2,
  FileText,
  GraduationCap,
  HeartHandshake,
  LayoutDashboard,
  MessageSquare,
  Newspaper,
  Presentation,
  School,
  Users,
} from "lucide-react";

export const adminModules = [
  {
    title: "Website Content",
    description:
      "Manage the main informational sections of the FOSTIIMA website.",
    href: "/admin/content",
    icon: Building2,
  },
  {
    title: "Faculty",
    description:
      "Manage faculty profiles, qualifications and faculty information.",
    href: "/admin/faculty",
    icon: Users,
  },
  {
    title: "Admissions",
    description:
      "Manage admission-related information and application content.",
    href: "/admin/admissions",
    icon: GraduationCap,
  },
  {
    title: "Placement",
    description: "Manage placement-related information and records.",
    href: "/admin/placement",
    icon: BriefcaseBusiness,
  },
  {
    title: "Conclave / Conference",
    description: "Manage conclave and conference events.",
    href: "/admin/conclave",
    icon: Presentation,
  },
  {
    title: "Blog",
    description: "Create, edit and manage blog posts.",
    href: "/admin/blog",
    icon: Newspaper,
  },
  {
    title: "Margdarshak",
    description: "Manage Margdarshak information and editions.",
    href: "/admin/margdarshak",
    icon: Award,
  },
  {
    title: "NIRF",
    description: "Manage NIRF data and related documents.",
    href: "/admin/nirf",
    icon: FileText,
  },
  {
    title: "Policies",
    description: "Manage HR policy, grievance and other policy content.",
    href: "/admin/policies",
    icon: BookOpen,
  },
  {
    title: "Contact & Enquiries",
    description: "View and manage website contact enquiries.",
    href: "/admin/enquiries",
    icon: MessageSquare,
  },
  {
    title: "Student Support",
    description: "Manage grievance and student support information.",
    href: "/admin/student-support",
    icon: HeartHandshake,
  },
  {
    title: "Academic Content",
    description: "Manage academic and programme-related content.",
    href: "/admin/academics",
    icon: School,
  },
] as const;

export const adminNavigation = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Home Page",
    href: "/admin/home",
    icon: LayoutDashboard,
  },
  {
    label: "Website Content",
    href: "/admin/content",
    icon: Building2,
  },
  {
    label: "Faculty",
    href: "/admin/faculty",
    icon: Users,
  },
  {
    label: "Admissions",
    href: "/admin/admissions",
    icon: GraduationCap,
  },
  {
    label: "Placement",
    href: "/admin/placement",
    icon: BriefcaseBusiness,
  },
  {
    label: "Conclave / Conference",
    href: "/admin/conclave",
    icon: Presentation,
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: Newspaper,
  },
  {
    label: "Margdarshak",
    href: "/admin/margdarshak",
    icon: Award,
  },
  {
    label: "NIRF",
    href: "/admin/nirf",
    icon: FileText,
  },
  {
    label: "Policies",
    href: "/admin/policies",
    icon: BookOpen,
  },
  {
    label: "Enquiries",
    href: "/admin/enquiries",
    icon: MessageSquare,
  },
] as const;
