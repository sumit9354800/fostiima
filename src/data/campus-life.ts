import { cloudinaryAsset } from "@/lib/cloudinary";

export type CampusLifeItem = {
  slug: string;
  title: string;
  description: string;
  image: string;
  details: string[];
  href: string;
};

export const campusLifeItems: CampusLifeItem[] = [
  {
    slug: "student-community",

    title: "Student Community",

    description:
      "Build meaningful connections, collaborate with peers and create lifelong friendships beyond the classroom.",

    image: cloudinaryAsset("home/campuslife/campuslife01.jpeg"),

    href: "/alumni",

    details: [
      "Collaborate with peers across diverse backgrounds.",
      "Build meaningful friendships and professional connections.",
      "Participate in student-led activities and initiatives.",
      "Develop teamwork, communication and leadership skills.",
    ],
  },

  {
    slug: "intellectual-life",

    title: "Brain Storming",

    description:
      "Engage in discussions, debates, workshops and activities that encourage curiosity and new perspectives.",

    image: cloudinaryAsset("home/campuslife/campuslife02.jpeg"),

    href: "/life-at-fostiima/brain-storming",

    details: [
      "Participate in discussions and knowledge-sharing sessions.",
      "Explore new ideas through debates and workshops.",
      "Develop critical thinking and analytical perspectives.",
      "Learn beyond the conventional classroom environment.",
    ],
  },

  {
    slug: "sports-recreation",

    title: "Sports & Fitness",

    description:
      "Balance academic life with sports, recreation and activities that encourage teamwork and sportsmanship.",

    image: cloudinaryAsset("home/campuslife/campuslife03.jpeg"),

    href: "/life-at-fostiima/sports-and-fitness",

    details: [
      "Take part in sports and recreational activities.",
      "Develop teamwork and sportsmanship.",
      "Maintain a healthy balance between academics and recreation.",
      "Build discipline, confidence and team spirit.",
    ],
  },

  {
    slug: "events-experiences",

    title: "Cultural Events",

    description:
      "Experience cultural activities, celebrations, industry interactions and memorable campus experiences.",

    image: cloudinaryAsset("home/campuslife/campuslife04.jpeg"),

    href: "/life-at-fostiima/cultural-events",

    details: [
      "Experience cultural activities and campus celebrations.",
      "Participate in industry interactions and events.",
      "Engage with diverse student and professional communities.",
      "Create memorable experiences throughout campus life.",
    ],
  },
];