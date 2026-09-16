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
  coverImage: string;
  href: string;
  featured: boolean;
  status: "published" | "draft";
};
export const conclaveEvents: ConclaveEvent[] = [
  {
    id: "responsible-ai-summit-2026",
    slug: "responsible-ai-summit-2026",
    title: "RESPONSIBLE AI SUMMIT 2026",
    day: "14",
    month: "FEB",
    year: "2026",
    date: "14 February 2026",
    location: "Fostiima Business School",
    excerpt: "RESPONSIBLE AI SUMMIT 2026",
    content: "RESPONSIBLE AI SUMMIT 2026 at Fostiima Business School.",
    coverImage: "",
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
    coverImage: "",
    href: "/conclave-conference/mission-ai-sashakt-bharat",
    featured: true,
    status: "published",
  },

  {
    id: "margdarshak-awards-ceremoney",
    slug: "margdarshak-awards-ceremoney",
    title: "Margdarshak Awards Ceremoney",
    day: "11",
    month: "DEC",
    year: "2025",
    date: "11 December 2025",
    location: "Margdarshak Awards Ceremoney At Nehru Place, Delhi",
    excerpt: "Margdarshak Awards Ceremoney",
    content: "Margdarshak Awards Ceremoney At Nehru Place, Delhi.",
    coverImage: "",
    href: "/conclave-conference/margdarshak-awards-ceremoney",
    featured: false,
    status: "published",
  },

  {
    id: "margdarshak-3",
    slug: "margdarshak-3",
    title: "Margdarshak 3.0 Award Ceremony-",
    day: "15",
    month: "DEC",
    year: "2024",
    date: "15 December 2024",
    location: "At FOSTIIMA, Delhi",
    excerpt: "Margdarshak 3.0 Award Ceremony-",
    content: "Margdarshak 3.0 Award Ceremony- At FOSTIIMA, Delhi.",
    coverImage: "",
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
    coverImage: "",
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
    location: "At Fostiima Business School, Delhi",
    excerpt: "Olympians Manu Bhaker.",
    content:
      "Olympians Manu Bhaker. At Fostiima Business School, Delhi.",
    coverImage: "",
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
    location: "At Fostiima Business School",
    excerpt: "HR Round Table 2024",
    content: "HR Round Table 2024 at Fostiima Business School.",
    coverImage: "",
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
    coverImage: "",
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
    coverImage: "",
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
    coverImage: "",
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
    coverImage: "",
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
    coverImage: "",
    href: "/conclave-conference/anil-somani-conversation-with-sadhguru",
    featured: false,
    status: "published",
  },

  {
    id: "fostiima-convocation-2023",
    slug: "fostiima-convocation-2023",
    title: "FOSTIIMA Convocation 2023",
    day: "11",
    month: "MAR",
    year: "2023",
    date: "11 March 2023",
    location: "At Fostiima Business School",
    excerpt: "FOSTIIMA Convocation 2023",
    content: "FOSTIIMA Convocation 2023 at Fostiima Business School.",
    coverImage: "",
    href: "/conclave-conference/fostiima-convocation-2023",
    featured: false,
    status: "published",
  },

  {
    id: "margdarshak-award-2",
    slug: "margdarshak-award-2",
    title: "Margdarshak Award 2.0",
    day: "12",
    month: "SEP",
    year: "2022",
    date: "12 September 2022",
    location: "At Fostiima Business School, Delhi",
    excerpt: "Margdarshak Award 2.0",
    content: "Margdarshak Award 2.0 at Fostiima Business School, Delhi.",
    coverImage: "",
    href: "/conclave-conference/margdarshak-award-2",
    featured: false,
    status: "published",
  },
];

export function getPublishedConclaveEvents() {
  return conclaveEvents.filter(
    (event) => event.status === "published",
  );
}

export function getFeaturedConclaveEvents() {
  return getPublishedConclaveEvents().filter(
    (event) => event.featured,
  );
}

export function getConclaveEventBySlug(slug: string) {
  return getPublishedConclaveEvents().find(
    (event) => event.slug === slug,
  );
}