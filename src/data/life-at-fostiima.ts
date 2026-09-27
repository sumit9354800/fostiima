import { cloudinaryAsset } from "@/lib/cloudinary";

export type LifeAtFostiimaImage = {
  src: string;
  alt: string;
};

export type LifeAtFostiimaContent = {
  title: string;
  description: string;
  images: LifeAtFostiimaImage[];
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

      {
        title: "Mr. Ashish Bhalla",
        description:
          "Founder and CEO - Synsperity Business Consulting. Ashish Bhalla is the Head Campus Relations – Director HR for HCL Tech. He has overall 19 years of extensive experience in HR and has a very long association with the HCL group. His current role involves hiring from B-Schools. His expertise involves Volume Recruitments, US IT staffing, operating large projects, Customer service, Technical support, Collections Back Office and order to Cash domains.",
        images: [],
      },

      {
        title: "Mr. Gaurav Bhatia",
        description:
          "Director - Protiviti. Gaurav Bhatia is working as Director. He is India lead with Protiviti's Knowledge and Innovation Group. Prior to this, he was associated as an AVP with Evideserve. He has an overall experience of 23 years. He is pass out from one of India's prestigious colleges, IIM Kolkata, and completed his MBA from International University of Japan.",
        images: [],
      },

      {
        title: "Ms. Bhavna Marwah",
        description:
          "Director - People & Culture | Human Resources Leader - Protiviti Consulting. Bhavna Marwah is dedicated to fostering an inclusive and supportive work environment as she spearheads HR initiatives at Protiviti. With a focus on building strong HPR capabilities to drive business growth. Her extensive experience spans over two decades, during which she played pivotal roles in organizations such as Protiviti Capability Center India, IHS Global Inside and Exide Industries Limited.",
        images: [],
      },

      {
        title: "Ms. Mitali Tayal",
        description:
          "Senior Vice President & Head Affluent Client Servicing - IndusInd Bank. Mitali Tayal, based in Gurgaon, India, is a seasoned professional with over 22 years of extensive experience in Banking, Finance and BPO industries. Currently she is serving as the Head of service strategy and Quality Assurance at RBL Bank. With a rich background including roles at prestigious institutions such as GE, Royal Bank of Scotland and ICICI Bank, she brings a wealth of knowledge in Banking operations, Quality Improvement, Team Management, and BPO operations management. Mitali's career journey reflects her commitment to excellence and customer satisfaction.",
        images: [],
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

    alt: "Business Exposure Trips - Dubai",

    title: "Business Exposure Trips",

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
          "/life-at-fostiima/business-exposure-tips/dubai/dubai5.jpg",
        ),
        alt: "Business exposure in Dubai - 5",
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
    src: cloudinaryAsset("/life-at-fostiima/sports-and-fitness/sport1.JPG"),

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
      "/life-at-fostiima/team-building-camp/team-building-camp1.jpeg",
    ),

    alt: "Team Building Camp at FOSTIIMA",

    title: "Team Building Camp",

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

    content: [
      {
        title: "Life@ FOSTIIMA",
        description:
          "Life at FOSTIIMA Business School brings together academic learning, student engagement, teamwork, professional development and memorable campus experiences. Students participate in a wide range of activities that encourage collaboration, creativity, confidence and personal growth.",
        images: [ ],
      },

      {
        title: "Computer Laboratory",
        description:
          "FOSTIIMA has four computer labs with Wi-Fi network facilities in a dynamic and spacious environment. The computer centre is equipped with branded Dell computers and the latest application software, with approximately 160 computers across the campus. The labs have high-speed connectivity, firewall security systems and LCD projectors for classroom presentations and video conferencing facilities.",
        images: [],
      },
    ],
  },
];
