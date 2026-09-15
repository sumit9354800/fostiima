export type NavigationItem = {
  label: string;
  href?: string;
  children?: NavigationItem[];
};

export const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },

  //   {
  //   label: "About Us",
  //   href: "/about-us",
  // },

  {
    label: "About Us",
    children: [
      {
        label: "About Us",
        href: "/about-us",
      },
      {
        label: "About Fostiima",
        href: "/about-us#about-fostiima",
      },
      {
        label: "Our Vision",
        href: "/about-us#our-vision",
      },
      {
        label: "Message From Chairman",
        href: "/about-us#message-from-chairman",
      },
      {
        label: "Trustees Founder",
        href: "/about-us#trustees-founder",
      },
      {
        label: "Our Objectives",
        href: "/about-us#our-objectives",
      },
      {
        label: "Infrastructures",
        href: "/about-us#infrastructures",
      },
    ],
  },

  {
    label: "FOSTIIMA Strength",
    href: "/fostiima-strength",
  },

  {
    label: "Academics",
    children: [
      {
        label: "Academics",
        href: "/academics",
      },
      // {
      //   label: "PGDM / MBA",
      //   href: "/programs/pgdm-mba",
      //   children: [
      //     {
      //       label: "Course Eligibility",
      //       href: "/programs/pgdm-mba/course-eligibility",
      //     },
      //     {
      //       label: "Course Module",
      //       href: "/programs/pgdm-mba/course-module",
      //     },
      //   ],
      // },
      {
        label: "Faculties",
        href: "/faculties",
      },
    ],
  },

  {
    label: "Admissions Process",
    children: [
      {
        label: "How to Apply",
        href: "/how-to-apply",
      },
      {
        label: "Fee Structure",
        href: "/fee-structure",
      },
      {
        label: "Testimonials",
        href: "/testimonials",
      },
    ],
  },

  {
    label: "Placement",
    children: [
      {
        label: "Summer Internship",
        children: [
          {
            label: "SIP 2024 - 2026",
            href: "/placement/summer-internship/sip-2024-2026",
          },
          {
            label: "SIP 2023 - 2025",
            href: "/placement/summer-internship/sip-2023-2025",
          },
          {
            label: "SIP 2022 - 2024",
            href: "/placement/summer-internship/sip-2022-2024",
          },
          {
            label: "SIP 2021 - 2023",
            href: "/placement/summer-internship/sip-2021-2023",
          },
          {
            label: "SIP 2020 - 2022",
            href: "/placement/summer-internship/sip-2020-2022",
          },
          {
            label: "SIP 2019 - 2021",
            href: "/placement/summer-internship/sip-2019-2021",
          },
        ],
      },

      {
        label: "Final Placements",
        children: [
          {
            label: "Final Placement 2021 - 2023",
            href: "/placement/final-placements/final-placement-2021-2023",
          },
          {
            label: "Final Placement 2020 - 2022",
            href: "/placement/final-placements/final-placement-2020-2022",
          },
          {
            label: "Final Placement 2019 - 2021",
            href: "/placement/final-placements/final-placement-2019-2021",
          },
        ],
      },

      {
        label: "Industry Interface",
        href: "/placement/industry-interface",
      },

      {
        label: "Recruiters",
        href: "/placement/recruiters",
      },
    ],
  },

  {
    label: "Life at FOSTIIMA",
    href: "/life-at-fostiima",
  },

  {
    label: "CONCLAVE/CONFERENCE",
    children: [
      {
        label: "About Margdarshak",
        href: "/about-margdarshak",
      },
      {
        label: "Margdarshak 4",
        href: "/margdarshak-4",
      },
      {
        label: "Margdarshak Contact Detail",
        href: "/margdarshak-contact-detail",
      },
    ],
  },

  {
    label: "Blog",
    href: "/blog",
  },

  {
    label: "Contact Us",
    href: "/contact",
  },
];

export const paymentUrl =
  "https://payments.cashfree.com/forms/FOSTIIMABUSINESSSCHOOL";
