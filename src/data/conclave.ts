import { cloudinaryAsset } from "@/lib/cloudinary";

export type ConclaveEvent = {
  id: string;

  slug: string;

  title: string;

  day: string;

  month: string;

  year: string;

  date: string;

  location: string;

  excerpt: string;

  content: string;

  bgImage: string;

  // Gallery images
  images: string[];

  // Optional event video
  video?: string[];

  href: string;

  featured: boolean;

  status: "published" | "draft";
};

export const conclaveEvents: ConclaveEvent[] = [
  {
    id: "margdarshak-4",
    slug: "margdarshak-4",
    title: "Margdarshak 4.0",
    day: "10",
    month: "JAN",
    year: "2027",
    date: "10 January 2027",
    location: "dates . to be announced",
    excerpt: "Mission AI Sashakt Bharat",
    content:
      "Mission AI Sashakt Bharat at PhD Chamber of Commerce, August Kranti Marg, Siri Institutional Area, Hauz Khas, New Delhi, Delhi 110016.",
    bgImage: "",
    images: [],
    video: [
      "https://www.youtube-nocookie.com/embed/uHBCJwwSiSc",
      "https://www.youtube-nocookie.com/embed/ZxXq0N5i060",
    ],
    href: "/conclave-conference/margdarshak-4",
    featured: true,
    status: "published",
  },

  {
    id: "fostiima-convocation-2026",
    slug: "fostiima-convocation-2026",
    title: "FOSTIIMA Convocation 2026",
    day: "11",
    month: "MAR",
    year: "2026",
    date: "11 March 2026",
    location: "At FOSTIIMA Business School",
    excerpt: "FOSTIIMA Convocation 2026",
    content: "FOSTIIMA Convocation 2026 at FOSTIIMA Business School.",
    bgImage: "",

    images: [
      "/conclave/convocation/convocation1.webp",
      "/conclave/convocation/convocation2.webp",
      "/conclave/convocation/convocation3.webp",
      "/conclave/convocation/convocation4.webp",
      "/conclave/convocation/convocation5.webp",
      "/conclave/convocation/convocation6.webp",
      "/conclave/convocation/convocation7.webp",
      "/conclave/convocation/convocation8.webp",
      "/conclave/convocation/convocation9.webp",
      "/conclave/convocation/convocation10.webp",
      "/conclave/convocation/convocation11.webp",
      "/conclave/convocation/convocation12.webp",
      "/conclave/convocation/convocation13.webp",
      "/conclave/convocation/convocation14.webp",
      "/conclave/convocation/convocation15.webp",
      "/conclave/convocation/convocation16.webp",
      "/conclave/convocation/convocation18.webp",
      "/conclave/convocation/convocation19.webp",
      "/conclave/convocation/convocation20.webp",
      "/conclave/convocation/convocation21.webp",
      "/conclave/convocation/convocation22.webp",
      "/conclave/convocation/convocation23.webp",
    ],
    href: "/conclave-conference/fostiima-convocation-2026",
    featured: false,
    status: "published",
  },

  {
    id: "responsible-ai-summit-2026",
    slug: "responsible-ai-summit-2026",
    title: "RESPONSIBLE AI SUMMIT 2026",
    day: "14",
    month: "FEB",
    year: "2026",
    date: "14 February 2026",
    location: "FOSTIIMA Business School",
    excerpt: "RESPONSIBLE AI SUMMIT 2026",
    content: "RESPONSIBLE AI SUMMIT 2026 at FOSTIIMA Business School.",
    bgImage: "/conclave/AI-Conclave-2026/AI1.webp",
    images: [
      "/conclave/AI-Conclave-2026/AI1.webp",
      "/conclave/AI-Conclave-2026/AI2.webp",
      "/conclave/AI-Conclave-2026/AI3.webp",
      "/conclave/AI-Conclave-2026/AI4.webp",
      "/conclave/AI-Conclave-2026/AI5.webp",
      "/conclave/AI-Conclave-2026/AI6.webp",
      "/conclave/AI-Conclave-2026/AI7.webp",
      "/conclave/AI-Conclave-2026/AI8.webp",
      "/conclave/AI-Conclave-2026/AI9.webp",
      "/conclave/AI-Conclave-2026/AI10.webp",
      "/conclave/AI-Conclave-2026/AI11.webp",
      "/conclave/AI-Conclave-2026/AI12.webp",
      "/conclave/AI-Conclave-2026/AI13.webp",
      "/conclave/AI-Conclave-2026/AI14.webp",
      "/conclave/AI-Conclave-2026/AI15.webp",
      "/conclave/AI-Conclave-2026/AI16.webp",
      "/conclave/AI-Conclave-2026/AI17.webp",
      "/conclave/AI-Conclave-2026/AI18.webp",
      "/conclave/AI-Conclave-2026/AI19.webp",
    ],
    href: "/conclave-conference/responsible-ai-summit-2026",
    featured: true,
    status: "published",
  },

  {
    id: "mission-ai-sashakt-bharat",
    slug: "mission-ai-sashakt-bharat",
    title: "Mission AI Sashakt Bharat",
    day: "10",
    month: "JAN",
    year: "2026",
    date: "10 January 2026",
    location:
      "PhD Chamber of Commerce, August Kranti Marg, Siri Institutional Area, Hauz Khas, New Delhi, Delhi 110016",
    excerpt: "Mission AI Sashakt Bharat",
    content:
      "Mission AI Sashakt Bharat at PhD Chamber of Commerce, August Kranti Marg, Siri Institutional Area, Hauz Khas, New Delhi, Delhi 110016.",

    bgImage: "",
    images: [],
    video: [
      "https://www.youtube-nocookie.com/embed/uHBCJwwSiSc",
      "https://www.youtube-nocookie.com/embed/ZxXq0N5i060",
    ],
    href: "/conclave-conference/mission-ai-sashakt-bharat",
    featured: true,
    status: "published",
  },

  {
    id: "margdarshak-awards-Ceremony",
    slug: "margdarshak-awards-Ceremony",
    title: "Margdarshak Awards Ceremony-3.0",
    day: "11",
    month: "DEC",
    year: "2025",
    date: "11 December 2025",
    location: "Margdarshak Awards Ceremony At Nehru Place, Delhi",
    excerpt: "Margdarshak Awards Ceremony",
    content: "Margdarshak Awards Ceremony At Nehru Place, Delhi.",
    bgImage: "/conclave/margdarshak3/Margdarshak3.0-12.webp",
    video: [
      "https://www.youtube-nocookie.com/embed/dMNO1a6laDs",
      "https://www.youtube-nocookie.com/embed/g0F7DL_B9ns",
    ],
    images: [
      "/conclave/margdarshak3/Margdarshak3-1.webp",
      "/conclave/margdarshak3/Margdarshak3-2.webp",
      "/conclave/margdarshak3/Margdarshak3-3.webp",
      "/conclave/margdarshak3/Margdarshak3-4.webp",
      "/conclave/margdarshak3/Margdarshak3-5.webp",
      "/conclave/margdarshak3/Margdarshak3-6.webp",
      "/conclave/margdarshak3/Margdarshak3-7.webp",
      "/conclave/margdarshak3/Margdarshak3-8.webp",
      "/conclave/margdarshak3/Margdarshak3-9.webp",
      "/conclave/margdarshak3/Margdarshak3-10.webp",
      "/conclave/margdarshak3/Margdarshak3-11.webp",
      "/conclave/margdarshak3/Margdarshak3-12.webp",
      "/conclave/margdarshak3/Margdarshak3-13.webp",
    ],
    href: "/conclave-conference/margdarshak-awards-Ceremony",
    featured: false,
    status: "published",
  },

  {
    id: "margdarshak-3",
    slug: "margdarshak-3",
    title: "Margdarshak-2.0 Award Ceremony",
    day: "15",
    month: "DEC",
    year: "2024",
    date: "15 December 2024",
    location: "At FOSTIIMA, Delhi",
    excerpt: "Margdarshak 2.0 Award Ceremony",
    content: "Margdarshak 2.0 Award Ceremony- At FOSTIIMA, Delhi.",
    bgImage: "/conclave/margdarshak2/Margdarshak2.0-11.webp",
    images: [
      "/conclave/margdarshak2/Margdarshak2-1.webp",
      "/conclave/margdarshak2/Margdarshak2-2.webp",
      "/conclave/margdarshak2/Margdarshak2-3.webp",
      "/conclave/margdarshak2/Margdarshak2-4.webp",
      "/conclave/margdarshak2/Margdarshak2-5.webp",
      "/conclave/margdarshak2/Margdarshak2-6.webp",
      "/conclave/margdarshak2/Margdarshak2-7.webp",
      "/conclave/margdarshak2/Margdarshak2-8.webp",
      "/conclave/margdarshak2/Margdarshak2-9.webp",
      "/conclave/margdarshak2/Margdarshak2-10.webp",
      "/conclave/margdarshak2/Margdarshak2-11.webp",
      "/conclave/margdarshak2/Margdarshak2-12.webp",
      "/conclave/margdarshak2/Margdarshak2-13.webp",
    ],
    href: "/conclave-conference/margdarshak-3",
    featured: false,
    status: "published",
  },

  {
    id: "aima-51st-nmc-2024",
    slug: "aima-51st-nmc-2024",
    title: "AIMA's 51st NMC 2024.",
    day: "16",
    month: "SEP",
    year: "2024",
    date: "16 September 2024",
    location: "At AIMA's 51st NMC",
    excerpt: "AIMA's 51st NMC 2024.",
    content: "AIMA's 51st NMC 2024. At AIMA's 51st NMC.",
    bgImage: "",

    video: ["https://www.youtube-nocookie.com/embed/FBaQPH0qRCY"],
    images: [
      "/conclave/aima/aima5.webp",
      "/conclave/aima/aima2.webp",
      "/conclave/aima/aima3.webp",
      "/conclave/aima/aima4.webp",
    ],
    href: "/conclave-conference/aima-51st-nmc-2024",
    featured: false,
    status: "published",
  },

  {
    id: "olympians-manu-bhaker",
    slug: "olympians-manu-bhaker",
    title: "Olympians Manu Bhaker.",
    day: "11",
    month: "SEP",
    year: "2024",
    date: "11 September 2024",
    location: "At FOSTIIMA Business School, Delhi",
    excerpt: "Olympians Manu Bhaker.",
    content: "Olympians Manu Bhaker. At FOSTIIMA Business School, Delhi.",
    bgImage: "",

    images: [
      // "/conclave/olympians/olympians1.webp",
      // "/conclave/olympians/olympians2.webp",
      // "/conclave/olympians/olympians4.webp",
      // "/conclave/olympians/olympians6.webp",
      // "/conclave/olympians/olympians7.webp",
      // "/conclave/olympians/olympians8.webp",
    ],
    href: "/conclave-conference/olympians-manu-bhaker",
    featured: false,
    status: "published",
  },

  {
    id: "hr-round-table-2024",
    slug: "hr-round-table-2024",
    title: "HR Round Table 2024",
    day: "28",
    month: "JUN",
    year: "2024",
    date: "28 June 2024",
    location: "At FOSTIIMA Business School",
    excerpt: "HR Round Table 2024",
    content: "HR Round Table 2024 at FOSTIIMA Business School.",
    video: [
      "https://www.youtube-nocookie.com/embed/anidmyGO8TI",
      "https://www.youtube-nocookie.com/embed/v2csvRiB7QQ",
      "https://www.youtube-nocookie.com/embed/_dKIFstCaas",
      "https://www.youtube-nocookie.com/embed/4xpr7OQ9VXc",
    ],
    bgImage: "/conclave/HR-round/hr11.webp",
    images: [
      "/conclave/HR-round/hr1.webp",
      "/conclave/HR-round/hr2.webp",
      "/conclave/HR-round/hr3.webp",
      "/conclave/HR-round/hr4.webp",
      "/conclave/HR-round/hr5.webp",
      "/conclave/HR-round/hr6.webp",
      "/conclave/HR-round/hr7.webp",
      "/conclave/HR-round/hr8.webp",
      "/conclave/HR-round/hr9.webp",
      "/conclave/HR-round/hr10.webp",
      "/conclave/HR-round/hr11.webp",
      "/conclave/HR-round/hr12.webp",
      "/conclave/HR-round/hr13.webp",
      "/conclave/HR-round/hr14.webp",
      "/conclave/HR-round/hr15.webp",
      "/conclave/HR-round/hr16.webp",
    ],
    href: "/conclave-conference/hr-round-table-2024",
    featured: false,
    status: "published",
  },

  {
    id: "anil-somani-with-ashwini-vaishnaw",
    slug: "anil-somani-with-ashwini-vaishnaw",
    title: "Mr. Anil Somani with Ashwini Vaishnaw.",
    day: "05",
    month: "JUN",
    year: "2024",
    date: "05 June 2024",
    location: "At The Indian Express Adda",
    excerpt: "Mr. Anil Somani with Ashwini Vaishnaw.",
    content:
      "Mr. Anil Somani with Ashwini Vaishnaw. At The Indian Express Adda.",
    bgImage: "",

    images: [],
    href: "/conclave-conference/anil-somani-with-ashwini-vaishnaw",
    featured: false,
    status: "published",
  },

  {
    id: "exit-poll",
    slug: "exit-poll",
    title: "Exit Poll पर ख़ास बातचीत",
    day: "03",
    month: "JUN",
    year: "2024",
    date: "03 June 2024",
    location: "At Exit Poll ?? ???? ??????",
    excerpt: "Exit Poll पर ख़ास बातचीत.",
    content: "Exit Poll पर ख़ास बातचीत.",
    bgImage: "",

    images: [],
    href: "/conclave-conference/exit-poll",
    featured: false,
    status: "published",
  },

  {
    id: "dr-s-jaishankar-indian-express-adda",
    slug: "dr-s-jaishankar-indian-express-adda",
    title: "Dr. S. Jaishankar at Indian Express Adda",
    day: "12",
    month: "MAR",
    year: "2024",
    date: "12 March 2024",
    location: "At Indian Express Adda",
    excerpt: "Dr. S. Jaishankar at Indian Express Adda.",
    content: "Dr. S. Jaishankar at Indian Express Adda.",
    bgImage: "/conclave/s jaishankar.webp",
    video: ["https://www.youtube-nocookie.com/embed/y50QVxs9G7E"],
    images: ["/conclave/s jaishankar.webp"],
    href: "/conclave-conference/dr-s-jaishankar-indian-express-adda",
    featured: false,
    status: "published",
  },

  {
    id: "discussion-on-budget-2024",
    slug: "discussion-on-budget-2024",
    title: "Discussion On Budget 2024",
    day: "02",
    month: "FEB",
    year: "2024",
    date: "02 February 2024",
    location: "On ABP News discussion",
    excerpt: "Discussion On Budget 2024",
    content: "Discussion On Budget 2024 on ABP News discussion.",
    bgImage: "/conclave/budget.webp",
    video: [
      "https://www.youtube-nocookie.com/embed/20kb_kuj95k",
      "https://www.youtube-nocookie.com/embed/dQto_WwpSxk",
    ],
    images: ["/conclave/budget.webp"],
    href: "/conclave-conference/discussion-on-budget-2024",
    featured: false,
    status: "published",
  },

  {
    id: "anil-somani-conversation-with-sadhguru",
    slug: "anil-somani-conversation-with-sadhguru",
    title: "Mr. Anil Somani conversation with #sadhguru",
    day: "11",
    month: "DEC",
    year: "2023",
    date: "11 December 2023",
    location: "At Indian Express Adda",
    excerpt: "Mr. Anil Somani conversation with #sadhguru",
    content:
      "Mr. Anil Somani conversation with #sadhguru at Indian Express Adda.",
    bgImage: "",

    video: ["https://www.youtube-nocookie.com/embed/g9qx6YeVF98"],
    images: [],
    href: "/conclave-conference/anil-somani-conversation-with-sadhguru",
    featured: false,
    status: "published",
  },
];

export function getPublishedConclaveEvents() {
  return conclaveEvents.filter((event) => event.status === "published");
}

export function getFeaturedConclaveEvents() {
  return getPublishedConclaveEvents().filter((event) => event.featured);
}

export function getConclaveEventBySlug(slug: string) {
  return getPublishedConclaveEvents().find((event) => event.slug === slug);
}
