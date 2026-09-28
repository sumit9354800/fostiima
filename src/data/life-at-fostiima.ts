import { cloudinaryAsset } from "@/lib/cloudinary";

export type LifeAtFostiimaImage = {
  src: string;
  alt: string;
};

export type LifeAtFostiimaContent = {
  title: string;
  description: string;
  images: LifeAtFostiimaImage[];

  // Optional rakho — existing data break nahi hoga
  href?: string;
  slug?: string;
};

export type LifeAtFostiimaSection = {
  src: string;
  alt: string;
  title: string;
  description: string;
  size: "small" | "large";
  href: string;
  slug: string;
  images: LifeAtFostiimaImage[];
  content: LifeAtFostiimaContent[];
};

export const lifeAtFostiimaSections: LifeAtFostiimaSection[] = [
  {
    src: cloudinaryAsset("/life-at-fostiima/2.jpeg"),

    alt: "Academic Excellence at FOSTIIMA",

    title: "Academic Excellence",

    description:
      "A contemporary learning environment focused on industry-aligned curriculum, experienced faculty, practical exposure, global perspectives, professional skills, and modern academic infrastructure.",

    size: "small",

    href: "/life-at-fostiima/academic-excellence",

    slug: "academic-excellence",

    images: [],

    content: [
      {
        title: "Robust & Industry-Aligned Curriculum",
        description:
          "The curriculum incorporates contemporary areas such as Data Analytics, AI in Business, Digital Marketing, and Fintech. Case-study based learning and practical simulations help students connect academic concepts with real-world business situations. The curriculum is also designed to evolve with changing industry requirements through inputs from industry experts and corporate advisory boards.",

        images: [
          {
            src: cloudinaryAsset("/life-at-fostiima/1.jpeg"),
            alt: "Industry-aligned curriculum at FOSTIIMA",
          },
        ],
      },

      {
        title: "Esteemed Faculty",
        description:
          "FOSTIIMA brings together academic and corporate expertise through faculty members, industry professionals, and guest lecturers. Faculty engagement extends beyond classroom teaching through research papers, books, industry consulting projects, and knowledge sharing. A structured mentorship approach enables students to receive individual academic and professional guidance throughout their learning journey.",

        images: [
          {
            src: cloudinaryAsset("/life-at-fostiima/2.jpeg"),
            alt: "FOSTIIMA faculty",
          },
        ],
      },

      {
        title: "Practical Learning & Experiential Pedagogy",
        description:
          "Students receive opportunities to work on live corporate projects involving real-world business challenges. Summer internships, industry exposure, field visits, workshops, and masterclasses conducted by CXOs, MDs, CEOs, and other industry professionals complement classroom learning and provide practical perspectives.",

        images: [
          {
            src: cloudinaryAsset("/life-at-fostiima/3.jpeg"),
            alt: "Practical learning at FOSTIIMA",
          },
        ],
      },

      {
        title: "Global Exposure & Research Focus",
        description:
          "The academic ecosystem encourages global perspectives through international immersion opportunities, academic collaborations, student exchange initiatives, and global study experiences where available. Faculty and students also engage in research activities, including research papers, publications, and whitepapers that contribute to knowledge creation.",

        images: [
          {
            src: cloudinaryAsset("/life-at-fostiima/4.jpeg"),
            alt: "Global exposure and research at FOSTIIMA",
          },
        ],
      },

      {
        title: "Skill Enhancement & Certifications",
        description:
          "Students can build additional career-ready capabilities through value-added certifications and professional training in areas such as Bloomberg Terminal, Advanced Excel, Python, Six Sigma, and NISM. Soft-skill and leadership development initiatives include personality development, mock interviews, communication workshops, and professional readiness activities.",

        images: [
          {
            src: cloudinaryAsset("/life-at-fostiima/5.jpeg"),
            alt: "Professional skill development at FOSTIIMA",
          },
        ],
      },

      {
        title: "Academic Infrastructure & Support",
        description:
          "The academic environment is supported by digital learning resources, knowledge resources, modern classrooms, computer and analytics facilities, and other academic support systems. Access to digital libraries and knowledge databases, along with technology-enabled learning spaces and incubation facilities, can further support academic and professional development.",

        images: [
          {
            src: cloudinaryAsset("/life-at-fostiima/6.jpeg"),
            alt: "Academic infrastructure at FOSTIIMA",
          },
        ],
      },
    ],
  },

  {
    src: cloudinaryAsset(
      "/life-at-fostiima/brain-storming/brainstorming1.jpeg",
    ),

    alt: "Brain Storming at FOSTIIMA",

    title: "Brain Storming",

    description:
      "Collaborative brainstorming and idea-driven learning experiences at FOSTIIMA.",

    size: "small",

    href: "/life-at-fostiima/brain-storming",

    slug: "brain-storming",

    images: [
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/brain-storming/brainstorming1.jpeg",
        ),
        alt: "Brain Storming at FOSTIIMA",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/brain-storming/brainstorming2.jpeg",
        ),
        alt: "Brain Storming activity at FOSTIIMA",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/brain-storming/brainstorming3.jpeg",
        ),
        alt: "Brain Storming session at FOSTIIMA",
      },
    ],

    content: [],
  },

  {
    src: cloudinaryAsset(
      "/life-at-fostiima/business-exposure-tips/dubai/dubai1.jpg",
    ),

    alt: "Global Immersion Trips",

    title: "Global Immersion Trips",

    description:
      "International business exposure through educational and industry experiences in Dubai and Malaysia.",

    size: "small",

    href: "/life-at-fostiima/business-exposure-tips",

    slug: "business-exposure-tips",

    images: [
      // Dubai
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/business-exposure-tips/dubai/dubai1.jpg",
        ),
        alt: "Business exposure in Dubai - 1",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/business-exposure-tips/dubai/dubai2.jpg",
        ),
        alt: "Business exposure in Dubai - 2",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/business-exposure-tips/dubai/dubai3.jpg",
        ),
        alt: "Business exposure in Dubai - 3",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/business-exposure-tips/dubai/dubai4.jpg",
        ),
        alt: "Business exposure in Dubai - 4",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/business-exposure-tips/dubai/dubai6.jpg",
        ),
        alt: "Business exposure in Dubai - 6",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/business-exposure-tips/dubai/dubai7.jpg",
        ),
        alt: "Business exposure in Dubai - 7",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/business-exposure-tips/dubai/dubai8.jpg",
        ),
        alt: "Business exposure in Dubai - 8",
      },

      // Malaysia
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia1.jpeg",
        ),
        alt: "Business exposure in Malaysia - 1",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia2.jpeg",
        ),
        alt: "Business exposure in Malaysia - 2",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia3.jpeg",
        ),
        alt: "Business exposure in Malaysia - 3",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia4.jpeg",
        ),
        alt: "Business exposure in Malaysia - 4",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia5.jpeg",
        ),
        alt: "Business exposure in Malaysia - 5",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia6.jpeg",
        ),
        alt: "Business exposure in Malaysia - 6",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia7.jpeg",
        ),
        alt: "Business exposure in Malaysia - 7",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia8.jpeg",
        ),
        alt: "Business exposure in Malaysia - 8",
      },
    ],

    content: [],
  },

  {
    src: cloudinaryAsset(
      "/life-at-fostiima/corporate-talk/corporate-talk1.JPG",
    ),

    alt: "Corporate Talk at FOSTIIMA",

    title: "Corporate Talk",

    description:
      "Industry leaders and professionals sharing insights and experiences with FOSTIIMA students.",

    size: "small",

    href: "/life-at-fostiima/corporate-talk",

    slug: "corporate-talk",

    images: [
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/corporate-talk/corporate-talk1.JPG",
        ),
        alt: "Corporate Talk at FOSTIIMA - 1",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/corporate-talk/corporate-talk2.JPG",
        ),
        alt: "Corporate Talk at FOSTIIMA - 2",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/corporate-talk/corporate-talk3.JPG",
        ),
        alt: "Corporate Talk at FOSTIIMA - 3",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/corporate-talk/corporate-talk4.JPG",
        ),
        alt: "Corporate Talk at FOSTIIMA - 4",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/corporate-talk/corporate-talk5.JPG",
        ),
        alt: "Corporate Talk at FOSTIIMA - 5",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/corporate-talk/corporate-talk6.JPG",
        ),
        alt: "Corporate Talk at FOSTIIMA - 6",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/corporate-talk/corporate-talk7.JPG",
        ),
        alt: "Corporate Talk at FOSTIIMA - 7",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/corporate-talk/corporate-talk8.JPG",
        ),
        alt: "Corporate Talk at FOSTIIMA - 8",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/corporate-talk/corporate-talk9.JPeG",
        ),
        alt: "Corporate Talk at FOSTIIMA - 9",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/corporate-talk/corporate-talk10.JPeG",
        ),
        alt: "Corporate Talk at FOSTIIMA - 10",
      },
    ],

    content: [],
  },

  {
    src: cloudinaryAsset("/life-at-fostiima/sports-and-fitness/sport17.JPG"),

    alt: "Sports and Fitness at FOSTIIMA",

    title: "Sports & Fitness",

    description:
      "Sports, fitness and recreational activities that promote an active and healthy campus experience.",

    size: "small",

    href: "/life-at-fostiima/sports-and-fitness",

    slug: "sports-and-fitness",

    images: [
      {
        src: cloudinaryAsset("/life-at-fostiima/sports-and-fitness/sport1.JPG"),
        alt: "Sports and Fitness at FOSTIIMA - 1",
      },
      {
        src: cloudinaryAsset("/life-at-fostiima/sports-and-fitness/sport2.JPG"),
        alt: "Sports and Fitness at FOSTIIMA - 2",
      },
      {
        src: cloudinaryAsset("/life-at-fostiima/sports-and-fitness/sport3.JPG"),
        alt: "Sports and Fitness at FOSTIIMA - 3",
      },
      {
        src: cloudinaryAsset("/life-at-fostiima/sports-and-fitness/sport4.JPG"),
        alt: "Sports and Fitness at FOSTIIMA - 4",
      },
      {
        src: cloudinaryAsset("/life-at-fostiima/sports-and-fitness/sport5.JPG"),
        alt: "Sports and Fitness at FOSTIIMA - 5",
      },
      {
        src: cloudinaryAsset("/life-at-fostiima/sports-and-fitness/sport6.JPG"),
        alt: "Sports and Fitness at FOSTIIMA - 6",
      },
      {
        src: cloudinaryAsset("/life-at-fostiima/sports-and-fitness/sport7.JPG"),
        alt: "Sports and Fitness at FOSTIIMA - 7",
      },
      {
        src: cloudinaryAsset("/life-at-fostiima/sports-and-fitness/sport8.JPG"),
        alt: "Sports and Fitness at FOSTIIMA - 8",
      },
      {
        src: cloudinaryAsset("/life-at-fostiima/sports-and-fitness/sport9.JPG"),
        alt: "Sports and Fitness at FOSTIIMA - 9",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/sports-and-fitness/sport10.JPG",
        ),
        alt: "Sports and Fitness at FOSTIIMA - 10",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/sports-and-fitness/sport11.JPG",
        ),
        alt: "Sports and Fitness at FOSTIIMA - 11",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/sports-and-fitness/sport12.JPG",
        ),
        alt: "Sports and Fitness at FOSTIIMA - 12",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/sports-and-fitness/sport13.JPG",
        ),
        alt: "Sports and Fitness at FOSTIIMA - 13",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/sports-and-fitness/sport14.JPG",
        ),
        alt: "Sports and Fitness at FOSTIIMA - 14",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/sports-and-fitness/sport15.JPG",
        ),
        alt: "Sports and Fitness at FOSTIIMA - 15",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/sports-and-fitness/sport16.JPG",
        ),
        alt: "Sports and Fitness at FOSTIIMA - 16",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/sports-and-fitness/sport17.JPG",
        ),
        alt: "Sports and Fitness at FOSTIIMA - 17",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/sports-and-fitness/sport18.JPG",
        ),
        alt: "Sports and Fitness at FOSTIIMA - 18",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/sports-and-fitness/sport19.JPG",
        ),
        alt: "Sports and Fitness at FOSTIIMA - 19",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/sports-and-fitness/sport20.JPG",
        ),
        alt: "Sports and Fitness at FOSTIIMA - 20",
      },
    ],

    content: [],
  },

  {
    src: cloudinaryAsset(
      "/life-at-fostiima/team-building-camp/team-building-camp2.jpeg",
    ),

    alt: "Team Building Camp at FOSTIIMA",

    title: "Team Building And Leadership Camp",

    description:
      "Collaborative activities and experiences designed to strengthen teamwork, leadership and student engagement.",

    size: "small",

    href: "/life-at-fostiima/team-building-camp",

    slug: "team-building-camp",

    images: [
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/team-building-camp/team-building-camp1.jpeg",
        ),
        alt: "Team Building Camp at FOSTIIMA - 1",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/team-building-camp/team-building-camp2.jpeg",
        ),
        alt: "Team Building Camp at FOSTIIMA - 2",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/team-building-camp/team-building-camp3.jpeg",
        ),
        alt: "Team Building Camp at FOSTIIMA - 3",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/team-building-camp/team-building-camp4.jpeg",
        ),
        alt: "Team Building Camp at FOSTIIMA - 4",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/team-building-camp/team-building-camp5.jpeg",
        ),
        alt: "Team Building Camp at FOSTIIMA - 5",
      },
      {
        src: cloudinaryAsset(
          "/life-at-fostiima/team-building-camp/team-building-camp6.webp",
        ),
        alt: "Team Building Camp at FOSTIIMA - 6",
      },
    ],

    content: [],
  },

  {
    src: cloudinaryAsset(
      "/life-at-fostiima/cultural-events/teacher_day/teacher_day2.jpg",
    ),

    alt: "Cultural Events at FOSTIIMA",

    title: "Cultural Events",

    description:
      "A vibrant celebration of festivals, traditions, sports and memorable student experiences at FOSTIIMA Business School.",

    size: "small",

    href: "/life-at-fostiima/cultural-events",

    slug: "cultural-events",

    images: [],

    content: [
      {
        title: "Swadeshi Mela",
        description:
          "A vibrant celebration promoting Indian culture, traditions, creativity and entrepreneurship through student participation and cultural activities.",
        images: [
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/swadeshi-mela/swadeshi-mela1.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/swadeshi-mela/swadeshi-mela2.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/swadeshi-mela/swadeshi-mela3.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/swadeshi-mela/swadeshi-mela4.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/swadeshi-mela/swadeshi-mela5.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/swadeshi-mela/swadeshi-mela6.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
        ],
        href: "/life-at-fostiima/cultural-events/swadeshi-mela/",
        slug: "swadeshi-mela",
      },

      {
        title: "Diwali Mela",
        description:
          "A festive celebration filled with lights, cultural activities, student participation and the spirit of togetherness.",
        images: [
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/diwali/diwali1.jpg",
            ),
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/diwali/diwali2.jpg",
            ),
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/diwali/diwali3.jpg",
            ),
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/diwali/diwali04.jpg",
            ),
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/diwali/diwali5.jpg",
            ),
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/diwali/diwali6.jpg",
            ),
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/diwali/diwali7.jpg",
            ),
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/diwali/diwali8.jpg",
            ),
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/diwali/diwali9.jpg",
            ),
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/diwali/diwali10.jpg",
            ),
            alt: "diwali Mela at FOSTIIMA - 1",
          },
        ],
        href: "/life-at-fostiima/cultural-events/diwali-mela",
        slug: "diwali-mela",
      },

      {
        title: "Aagaman Day",
        description:
          "A welcoming celebration designed to introduce new students to the FOSTIIMA community through engaging activities and memorable experiences.",
        images: [
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day1.jpg",
            ),
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day2.jpg",
            ),
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day3.jpg",
            ),
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day4.jpg",
            ),
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day9.jpg",
            ),
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day10.jpg",
            ),
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day11.jpg",
            ),
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day12.jpg",
            ),
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day13.jpg",
            ),
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day14.jpg",
            ),
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day15.jpg",
            ),
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day16.jpg",
            ),
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day17.jpg",
            ),
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day18.jpg",
            ),
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day19.jpg",
            ),
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
        ],
        href: "/life-at-fostiima/cultural-events/aagaman-day",
        slug: "aagaman-day",
      },

      {
        title: "VITT Manthan",
        description:
          "An engaging platform encouraging interaction, ideas, discussion and learning through student-driven activities and experiences.",
        images: [
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6104.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6105.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6107.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6108.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6113.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6114.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6120.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6126.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6138.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6146.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6156.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6162.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6163.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6180.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6181.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6184.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6188.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6218.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6104.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6249.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6285.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6286.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6343.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6387.JPG",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
        ],
        href: "/life-at-fostiima/cultural-events/vitt-manthan",
        slug: "vitt-manthan",
      },

      {
        title: "Teacher's Day",
        description:
          "A special occasion celebrating the dedication, guidance and contribution of faculty members through student-led activities and expressions of gratitude.",
        images: [
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day1.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day2.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day3.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day4.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day5.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day6.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day7.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day8.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day9.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day10.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day11.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day12.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day13.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day14.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
        ],
        href: "/life-at-fostiima/cultural-events/teachers-day",
        slug: "teachers-day",
      },

      {
        title: "Milan",
        description:
          "A memorable gathering that brings students and the FOSTIIMA community together through interaction, celebration and shared experiences.",
        images: [
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/milan/DSC09401 (2).jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/milan/DSC09407 (2).jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/milan/DSC09418 (2).jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/milan/DSC09419 (2).jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/milan/DSC09422 (2).jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/milan/DSC09430 (2).jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/milan/DSC09432.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/milan/DSC09436 (2).jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/milan/DSC09437 (2).jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/milan/DSC09440 (2).jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/milan/DSC09445 (2).jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/milan/DSC09448.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/milan/DSC09451.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/milan/IMG_9448.jpg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
        ],
        href: "/life-at-fostiima/cultural-events/milan",
        slug: "milan",
      },

      {
        title: "Marketing Carnival",
        description:
          "A creative and engaging event showcasing marketing ideas, student creativity, communication skills and practical business learning.",
        images: [
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/marketing/marketing1.jpeg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/marketing/marketing2.jpeg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/marketing/marketing3.jpeg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: cloudinaryAsset(
              "/life-at-fostiima/cultural-events/marketing/marketing4.jpeg",
            ),
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
        ],
        href: "/life-at-fostiima/cultural-events/marketing-carnival",
        slug: "marketing-carnival",
      },
    ],
  },
];
