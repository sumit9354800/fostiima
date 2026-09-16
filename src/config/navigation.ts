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
      // {
      //   label: "Testimonials",
      //   href: "/testimonials",
      // },
    ],
  },

  {
    label: "Placement",
    children: [
      {
        label: "Summer Internship",
        href: "/placement/summer-internship",
      },
      {
        label: "Final Placements",
        href: "/placement/final-placements",
      },
      // {
      //   label: "Industry Interface",
      //   href: "/placement/industry-interface",
      // },

      // {
      //   label: "Recruiters",
      //   href: "/placement/recruiters",
      // },
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
        label: "CONCLAVE/CONFERENCE",
        href: "/conclave-conference",
      },
     {
      label: "MARGDARSHIK",
      href: "/margdarshak",
    },
    ],
  },

  {
    label: "Blog",
    href: "/blog",
  },

  {
    label: "Contact Us",
    href: "/contact-us",
  },
];

export const paymentUrl =
  "https://payments.cashfree.com/forms/FOSTIIMABUSINESSSCHOOL";
