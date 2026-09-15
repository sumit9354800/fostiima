export type AcademicFocus = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type AcademicHighlight = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export type AcademicsData = {
  title: string;
  intro: string;
  focus: AcademicFocus[];
  highlights: AcademicHighlight[];
};

export const academicsData: AcademicsData = {
  title: "Academics",

  intro:
    "Management education at FOSTIIMA focuses on teaching key business concepts while simultaneously developing the analytical skills of the students. It is therefore imperative that the FOSTIIMA course curriculum is contemporary and in tune with the needs of the industry. Accordingly, FOSTIIMA curriculum has been designed by the Dean and the faculty after taking inputs from eminent academicians, industry experts and some leading global B-Schools. Care has been exercised to encapsulate knowledge inputs in all new and emerging areas in the current global economic scenario. The curriculum is reviewed periodically so that it maintains its cutting edge relevance to the industry.",

  focus: [
    {
      id: "business-concepts",
      title: "Key Business Concepts",
      description:
        "Strong emphasis on teaching key business concepts while developing the analytical skills of the students.",
      icon: "book-open",
    },
    {
      id: "analytical-skills",
      title: "Analytical Skills",
      description:
        "Management education focuses on developing the analytical skills required to understand business challenges.",
      icon: "brain",
    },
    {
      id: "global-perspective",
      title: "Global Perspective",
      description:
        "Inputs from leading global B-Schools help keep the curriculum aligned with the current global economic scenario.",
      icon: "globe",
    },
    {
      id: "periodic-review",
      title: "Periodic Curriculum Review",
      description:
        "The curriculum is reviewed periodically to maintain its cutting-edge relevance to the industry.",
      icon: "refresh-cw",
    },
  ],

  highlights: [
    {
      id: "top-b-schools",
      title: "Amongst Top 20 B-Schools in India",
      description:
        "Amongst top 20 B-schools in India in terms of Education & Placements.",
      icon: "award",
    },
    {
      id: "aicte-pgdm",
      title: "Two Year Full Time PGDM",
      description:
        "Two Year Full Time AICTE Approved PGDM Program.",
      icon: "graduation-cap",
    },
    {
      id: "delhi-ncr",
      title: "Top Ranked in Delhi NCR",
      description:
        "Consistently top ranked Business school in Delhi NCR.",
      icon: "building-2",
    },
    {
      id: "infrastructure",
      title: "State of Art Infrastructure",
      description:
        "World Class State of Art Infrastructure.",
      icon: "building-2",
    },
    {
      id: "curriculum",
      title: "Modern & Futuristic Curriculum",
      description:
        "Most modern and futuristic course curriculum.",
      icon: "book-open",
    },
    {
      id: "research-case-study",
      title: "Research & Case Study Driven",
      description:
        "Totally research driven and case study based delivery methodology.",
      icon: "brain",
    },
    {
      id: "placements",
      title: "Strong Placement Performance",
      description:
        "PGDM batch of 2023–25 averaging placements above 11.15 lakhs per annum.",
      icon: "line-chart",
    },
    {
      id: "iim-faculty",
      title: "IIM Graduate Core Faculty",
      description:
        "Entire core faculty are IIM Graduates.",
      icon: "graduation-cap",
    },
  ],
};