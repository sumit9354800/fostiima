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
  href?: string;
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
    excerpt:
      "Responsible AI Summit 2026 — Fostiima Business School.",
    content:
      "Responsible AI Summit 2026 was organised at Fostiima Business School.",
    coverImage:
      "https://fostiima.org/uploaded_files/thumb_cache/thumb_500_300_ai-impact-summit-2026.jpg",
    href: "https://fostiima.org/ai-impact-summit-2026.php",
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
      "PhD Chamber of Commerce, August Kranti Marg, Siri Institutional Area, Hauz Khas, New Delhi",
    excerpt:
      "Mission AI Sashakt Bharat at PhD Chamber of Commerce.",
    content:
      "Mission AI Sashakt Bharat was held at PhD Chamber of Commerce, August Kranti Marg, Siri Institutional Area, Hauz Khas, New Delhi.",
    coverImage: "",
    featured: true,
    status: "published",
  },

  {
    id: "margdarshak-awards-ceremony",
    slug: "margdarshak-awards-ceremony",
    title: "Margdarshak Awards Ceremony",
    day: "11",
    month: "DEC",
    year: "2025",
    date: "11 December 2025",
    location: "Nehru Place, Delhi",
    excerpt:
      "Margdarshak Awards Ceremony at Nehru Place, Delhi.",
    content:
      "Margdarshak Awards Ceremony was held at Nehru Place, Delhi.",
    coverImage: "",
    featured: false,
    status: "published",
  },

  {
    id: "margdarshak-3",
    slug: "margdarshak-3",
    title: "Margdarshak 3.0 Award Ceremony",
    day: "15",
    month: "DEC",
    year: "2024",
    date: "15 December 2024",
    location: "At FOSTIIMA, Delhi",
    excerpt:
      "Margdarshak 3.0 Award Ceremony at FOSTIIMA, Delhi.",
    content:
      "Margdarshak 3.0 Award Ceremony was held at FOSTIIMA, Delhi.",
    coverImage: "",
    featured: false,
    status: "published",
  },

  {
    id: "aima-51st-nmc-2024",
    slug: "aima-51st-nmc-2024",
    title: "AIMA's 51st NMC 2024",
    day: "16",
    month: "SEP",
    year: "2024",
    date: "16 September 2024",
    location: "At AIMA's 51st NMC",
    excerpt:
      "FOSTIIMA at AIMA's 51st NMC 2024.",
    content:
      "FOSTIIMA participated in AIMA's 51st NMC 2024.",
    coverImage: "",
    featured: false,
    status: "published",
  },

  {
    id: "olympians-manu-bhaker",
    slug: "olympians-manu-bhaker",
    title: "Olympians Manu Bhaker",
    day: "11",
    month: "SEP",
    year: "2024",
    date: "11 September 2024",
    location: "At Fostiima Business School, Delhi",
    excerpt:
      "Olympians Manu Bhaker at Fostiima Business School, Delhi.",
    content:
      "Olympians Manu Bhaker at Fostiima Business School, Delhi.",
    coverImage: "",
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