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
    src: "/life-at-fostiima/2.webp",

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
            src: "/life-at-fostiima/1.webp",
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
            src: "/life-at-fostiima/2.webp",
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
            src: "/life-at-fostiima/3.webp",
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
            src: "/life-at-fostiima/4.webp",
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
            src: "/life-at-fostiima/5.webp",
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
            src: "/life-at-fostiima/6.webp",
            alt: "Academic infrastructure at FOSTIIMA",
          },
        ],
      },
    ],
  },

  {
    src: 
      "/life-at-fostiima/brain-storming/brainstorming1.webp",

    alt: "Brain Storming at FOSTIIMA",

    title: "Brain Storming",

    description:
      "Collaborative brainstorming and idea-driven learning experiences at FOSTIIMA.",

    size: "small",

    href: "/life-at-fostiima/brain-storming",

    slug: "brain-storming",

    images: [
      {
        src: 
          "/life-at-fostiima/brain-storming/brainstorming1.webp",
        alt: "Brain Storming at FOSTIIMA",
      },
      {
        src: 
          "/life-at-fostiima/brain-storming/brainstorming2.webp",
        alt: "Brain Storming activity at FOSTIIMA",
      },
      {
        src: 
          "/life-at-fostiima/brain-storming/brainstorming3.webp",
        alt: "Brain Storming session at FOSTIIMA",
      },
    ],

    content: [],
  },

  {
    src: 
      "/life-at-fostiima/business-exposure-tips/dubai/dubai1.webp",

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
        src: 
          "/life-at-fostiima/business-exposure-tips/dubai/dubai1.webp",
        alt: "Business exposure in Dubai - 1",
      },
      {
        src: 
          "/life-at-fostiima/business-exposure-tips/dubai/dubai2.webp",
        alt: "Business exposure in Dubai - 2",
      },
      {
        src: 
          "/life-at-fostiima/business-exposure-tips/dubai/dubai3.webp",
        alt: "Business exposure in Dubai - 3",
      },
      {
        src: 
          "/life-at-fostiima/business-exposure-tips/dubai/dubai4.webp",
        alt: "Business exposure in Dubai - 4",
      },
      {
        src: 
          "/life-at-fostiima/business-exposure-tips/dubai/dubai6.webp",
        alt: "Business exposure in Dubai - 6",
      },
      {
        src: 
          "/life-at-fostiima/business-exposure-tips/dubai/dubai7.webp",
        alt: "Business exposure in Dubai - 7",
      },

      // Malaysia
      {
        src: 
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia1.webp",
        alt: "Business exposure in Malaysia - 1",
      },
      {
        src: 
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia2.webp",
        alt: "Business exposure in Malaysia - 2",
      },
      {
        src: 
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia3.webp",
        alt: "Business exposure in Malaysia - 3",
      },
      {
        src: 
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia4.webp",
        alt: "Business exposure in Malaysia - 4",
      },
      {
        src: 
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia5.webp",
        alt: "Business exposure in Malaysia - 5",
      },
      {
        src: 
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia6.webp",
        alt: "Business exposure in Malaysia - 6",
      },
      {
        src: 
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia7.webp",
        alt: "Business exposure in Malaysia - 7",
      },
      {
        src: 
          "/life-at-fostiima/business-exposure-tips/malaysia/malaysia8.webp",
        alt: "Business exposure in Malaysia - 8",
      },
    ],

    content: [],
  },

  {
    src: 
      "/life-at-fostiima/corporate-talk/corporate-talk1.webp",

    alt: "Corporate Talk at FOSTIIMA",

    title: "Corporate Talk",

    description:
      "Industry leaders and professionals sharing insights and experiences with FOSTIIMA students.",

    size: "small",

    href: "/life-at-fostiima/corporate-talk",

    slug: "corporate-talk",

    images: [
      {
        src: 
          "/life-at-fostiima/corporate-talk/corporate-talk1.webp",
        alt: "Corporate Talk at FOSTIIMA - 1",
      },
      {
        src: 
          "/life-at-fostiima/corporate-talk/corporate-talk2.webp",
        alt: "Corporate Talk at FOSTIIMA - 2",
      },
      {
        src: 
          "/life-at-fostiima/corporate-talk/corporate-talk3.webp",
        alt: "Corporate Talk at FOSTIIMA - 3",
      },
      {
        src: 
          "/life-at-fostiima/corporate-talk/corporate-talk4.webp",
        alt: "Corporate Talk at FOSTIIMA - 4",
      },
      {
        src: 
          "/life-at-fostiima/corporate-talk/corporate-talk5.webp",
        alt: "Corporate Talk at FOSTIIMA - 5",
      },
      {
        src: 
          "/life-at-fostiima/corporate-talk/corporate-talk6.webp",
        alt: "Corporate Talk at FOSTIIMA - 6",
      },
      {
        src: 
          "/life-at-fostiima/corporate-talk/corporate-talk7.webp",
        alt: "Corporate Talk at FOSTIIMA - 7",
      },
      {
        src: 
          "/life-at-fostiima/corporate-talk/corporate-talk8.webp",
        alt: "Corporate Talk at FOSTIIMA - 8",
      },
      {
        src: 
          "/life-at-fostiima/corporate-talk/corporate-talk9.webp",
        alt: "Corporate Talk at FOSTIIMA - 9",
      },
      {
        src: 
          "/life-at-fostiima/corporate-talk/corporate-talk10.webp",
        alt: "Corporate Talk at FOSTIIMA - 10",
      },
    ],

    content: [],
  },

  {
    src: "/life-at-fostiima/sports-and-fitness/sport17.webp",

    alt: "Sports and Fitness at FOSTIIMA",

    title: "Sports & Fitness",

    description:
      "Sports, fitness and recreational activities that promote an active and healthy campus experience.",

    size: "small",

    href: "/life-at-fostiima/sports-and-fitness",

    slug: "sports-and-fitness",

    images: [
      {
        src: "/life-at-fostiima/sports-and-fitness/sport1.webp",
        alt: "Sports and Fitness at FOSTIIMA - 1",
      },
      {
        src: "/life-at-fostiima/sports-and-fitness/sport2.webp",
        alt: "Sports and Fitness at FOSTIIMA - 2",
      },
      {
        src: "/life-at-fostiima/sports-and-fitness/sport3.webp",
        alt: "Sports and Fitness at FOSTIIMA - 3",
      },
      {
        src: "/life-at-fostiima/sports-and-fitness/sport4.webp",
        alt: "Sports and Fitness at FOSTIIMA - 4",
      },
      {
        src: "/life-at-fostiima/sports-and-fitness/sport5.webp",
        alt: "Sports and Fitness at FOSTIIMA - 5",
      },
      {
        src: "/life-at-fostiima/sports-and-fitness/sport6.webp",
        alt: "Sports and Fitness at FOSTIIMA - 6",
      },
      {
        src: "/life-at-fostiima/sports-and-fitness/sport7.webp",
        alt: "Sports and Fitness at FOSTIIMA - 7",
      },
      {
        src: "/life-at-fostiima/sports-and-fitness/sport8.webp",
        alt: "Sports and Fitness at FOSTIIMA - 8",
      },
      {
        src: "/life-at-fostiima/sports-and-fitness/sport9.webp",
        alt: "Sports and Fitness at FOSTIIMA - 9",
      },
      {
        src: 
          "/life-at-fostiima/sports-and-fitness/sport10.webp",
        alt: "Sports and Fitness at FOSTIIMA - 10",
      },
      {
        src: 
          "/life-at-fostiima/sports-and-fitness/sport11.webp",
        alt: "Sports and Fitness at FOSTIIMA - 11",
      },
      {
        src: 
          "/life-at-fostiima/sports-and-fitness/sport12.webp",
        alt: "Sports and Fitness at FOSTIIMA - 12",
      },
      {
        src: 
          "/life-at-fostiima/sports-and-fitness/sport13.webp",
        alt: "Sports and Fitness at FOSTIIMA - 13",
      },
      {
        src: 
          "/life-at-fostiima/sports-and-fitness/sport14.webp",
        alt: "Sports and Fitness at FOSTIIMA - 14",
      },
      {
        src: 
          "/life-at-fostiima/sports-and-fitness/sport15.webp",
        alt: "Sports and Fitness at FOSTIIMA - 15",
      },
      {
        src: 
          "/life-at-fostiima/sports-and-fitness/sport16.webp",
        alt: "Sports and Fitness at FOSTIIMA - 16",
      },
      {
        src: 
          "/life-at-fostiima/sports-and-fitness/sport17.webp",
        alt: "Sports and Fitness at FOSTIIMA - 17",
      },
      {
        src: 
          "/life-at-fostiima/sports-and-fitness/sport18.webp",
        alt: "Sports and Fitness at FOSTIIMA - 18",
      },
      {
        src: 
          "/life-at-fostiima/sports-and-fitness/sport19.webp",
        alt: "Sports and Fitness at FOSTIIMA - 19",
      },
      {
        src: 
          "/life-at-fostiima/sports-and-fitness/sport20.webp",
        alt: "Sports and Fitness at FOSTIIMA - 20",
      },
    ],

    content: [],
  },

  {
    src: 
      "/life-at-fostiima/team-building-camp/team-building-camp2.webp",

    alt: "Team Building Camp at FOSTIIMA",

    title: "Team Building And Leadership Camp",

    description:
      "Collaborative activities and experiences designed to strengthen teamwork, leadership and student engagement.",

    size: "small",

    href: "/life-at-fostiima/team-building-camp",

    slug: "team-building-camp",

    images: [
      {
        src: 
          "/life-at-fostiima/team-building-camp/team-building-camp1.webp",
        alt: "Team Building Camp at FOSTIIMA - 1",
      },
      {
        src: 
          "/life-at-fostiima/team-building-camp/team-building-camp2.webp",
        alt: "Team Building Camp at FOSTIIMA - 2",
      },
      {
        src: 
          "/life-at-fostiima/team-building-camp/team-building-camp3.webp",
        alt: "Team Building Camp at FOSTIIMA - 3",
      },
      {
        src: 
          "/life-at-fostiima/team-building-camp/team-building-camp4.webp",
        alt: "Team Building Camp at FOSTIIMA - 4",
      },
      {
        src: 
          "/life-at-fostiima/team-building-camp/team-building-camp5.webp",
        alt: "Team Building Camp at FOSTIIMA - 5",
      },
      {
        src: 
          "/life-at-fostiima/team-building-camp/team-building-camp6.webp",
        alt: "Team Building Camp at FOSTIIMA - 6",
      },
    ],

    content: [],
  },

  {
    src: 
      "/life-at-fostiima/cultural-events/teacher_day/teacher_day2.webp",

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
            src: 
              "/life-at-fostiima/cultural-events/swadeshi-mela/swadeshi-mela1.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/swadeshi-mela/swadeshi-mela2.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/swadeshi-mela/swadeshi-mela3.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/swadeshi-mela/swadeshi-mela4.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/swadeshi-mela/swadeshi-mela5.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/swadeshi-mela/swadeshi-mela6.webp",
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
            src: 
              "/life-at-fostiima/cultural-events/diwali/diwali1.webp",
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/diwali/diwali2.webp",
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/diwali/diwali3.webp",
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/diwali/diwali_4.webp",
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/diwali/diwali5.webp",
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/diwali/diwali6.webp",
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/diwali/diwali7.webp",
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/diwali/diwali8.webp",
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/diwali/diwali9.webp",
            alt: "diwali Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/diwali/diwali10.webp",
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
            src: 
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day1.webp",
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day2.webp",
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day_3.webp",
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day4.webp",
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day9.webp",
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day10.webp",
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day11.webp",
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day12.webp",
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day13.webp",
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day14.webp",
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day15.webp",
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day16.webp",
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day17.webp",
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day18.webp",
            alt: "Aagaman Day at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/aagaman-day/aagaman-day19.webp",
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
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6104.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6105.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6107.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6108.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6113.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6114.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6120.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6126.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6138.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6146.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6156.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6162.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6163.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6180.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6181.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6184.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6188.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6218.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6104.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6249.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6285.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6286.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6343.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/vitt-manthan/IMG_6387.webp",
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
            src: 
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day1.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day2.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day3.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day4.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day5.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day6.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day7.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day8.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day9.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day10.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day11.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day12.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day13.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/teacher_day/teacher_day14.webp",
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
            src: 
              "/life-at-fostiima/cultural-events/milan/milan1.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
             "/life-at-fostiima/cultural-events/milan/milan2.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/milan/milan3.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
             "/life-at-fostiima/cultural-events/milan/milan4.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/milan/milan5.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
             "/life-at-fostiima/cultural-events/milan/milan6.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
             "/life-at-fostiima/cultural-events/milan/milan7.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
             "/life-at-fostiima/cultural-events/milan/milan8.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/milan/milan9.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
             "/life-at-fostiima/cultural-events/milan/milan10.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/milan/milan11.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
             "/life-at-fostiima/cultural-events/milan/milan12.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/milan/milan13.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/milan/milan14.webp",
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
            src: 
              "/life-at-fostiima/cultural-events/marketing/marketing1.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/marketing/marketing2.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/marketing/marketing3.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
          {
            src: 
              "/life-at-fostiima/cultural-events/marketing/marketing4.webp",
            alt: "Swadeshi Mela at FOSTIIMA - 1",
          },
        ],
        href: "/life-at-fostiima/cultural-events/marketing-carnival",
        slug: "marketing-carnival",
      },
    ],
  },
];
