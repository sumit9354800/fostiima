// Client-supplied Schema.org JSON-LD from "Fostiima- Schema Codes .docx".
// Values are used as supplied. Each page renders its entry with <JsonLd>
// (src/components/seo/JsonLd.tsx); the sitewide entities are rendered once by
// the public site layout, src/app/(site)/layout.tsx. Items marked HELD conflict
// with the site's content and are left out until the client confirms them.

export type JsonLdObject = Readonly<Record<string, unknown>>;

/** EducationalOrganization and WebSite: rendered once, on every public page. */
export const SITEWIDE_STRUCTURED_DATA: readonly JsonLdObject[] = [
  {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": "https://www.fostiima.org/#organization",
    "name": "FOSTIIMA Business School",
    "url": "https://www.fostiima.org/",
    "description": "FOSTIIMA Business School offers AICTE-approved, two-year PGDM programmes with specializations in Marketing, Finance, Human Resource Management and Business Analytics.",
    "foundingDate": "2007",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.fostiima.org/logo.webp"
    },
    "email": "admissions@fostiima.org",
    "telephone": "+91-76783 91245",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No. HAF-1, Dwarka Sector 9",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110077",
      "addressCountry": "IN"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.fostiima.org/#website",
    "url": "https://www.fostiima.org/",
    "name": "FOSTIIMA Business School",
    "inLanguage": "en-IN"
  }
];

/** Page-level JSON-LD keyed by page path (as used for canonicals). */
export const PAGE_STRUCTURED_DATA: Readonly<Record<string, readonly JsonLdObject[]>> = {
  // HELD: FAQPage. Its six questions and answers are reworded versions of
  // the FAQs the homepage shows (loaded from the database by /api/faqs), and
  // FAQ markup must match the visible text. Awaiting client choice of wording.
  "/": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.fostiima.org/#webpage",
      "url": "https://www.fostiima.org/",
      "name": "FOSTIIMA Business School",
      "isPartOf": {
        "@id": "https://www.fostiima.org/#website"
      },
      "about": {
        "@id": "https://www.fostiima.org/#organization"
      },
      "inLanguage": "en-IN"
    }
  ],
  "/about-us": [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": "https://www.fostiima.org/about-us#webpage",
      "url": "https://www.fostiima.org/about-us",
      "name": "About FOSTIIMA Business School",
      "description": "Learn about FOSTIIMA Business School, its history, IIM Ahmedabad alumni founders, vision, mission, educational philosophy, leadership and campus.",
      "isPartOf": {
        "@id": "https://www.fostiima.org/#website"
      },
      "about": {
        "@id": "https://www.fostiima.org/#organization"
      },
      "inLanguage": "en-IN"
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://www.fostiima.org/about-us#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.fostiima.org/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "About Us",
          "item": "https://www.fostiima.org/about-us"
        }
      ]
    }
  ],
  "/programs": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": "https://www.fostiima.org/programs#webpage",
      "url": "https://www.fostiima.org/programs",
      "name": "PGDM Programmes & Specialisations | FOSTIIMA Business School",
      "description": "Explore FOSTIIMA Business School's two-year PGDM programmes and specialisations in Marketing, Finance, Human Resources, Business Analytics, International Business, and AI, Analytics & Operations.",
      "isPartOf": {
        "@id": "https://www.fostiima.org/#website"
      },
      "about": {
        "@id": "https://www.fostiima.org/#organization"
      },
      "inLanguage": "en-IN"
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": "https://www.fostiima.org/programs#program-list",
      "name": "PGDM Programmes and Specialisations at FOSTIIMA Business School",
      "description": "List of PGDM programmes and specialisations offered by FOSTIIMA Business School.",
      "numberOfItems": 7,
      "itemListOrder": "https://schema.org/ItemListOrderAscending",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "PGDM - Two Year Full-Time Programme",
          "url": "https://www.fostiima.org/programs/pgdm"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "PGDM in Marketing",
          "url": "https://www.fostiima.org/programs/pgdm-marketing"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "PGDM in Finance",
          "url": "https://www.fostiima.org/programs/pgdm-finance"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "PGDM in Human Resource Management",
          "url": "https://www.fostiima.org/programs/pgdm-human-resource-management"
        },
        {
          "@type": "ListItem",
          "position": 5,
          "name": "PGDM in Business Analytics",
          "url": "https://www.fostiima.org/programs/business-analytics"
        },
        {
          "@type": "ListItem",
          "position": 6,
          "name": "International Business Specialisation",
          "url": "https://www.fostiima.org/programs/international-business"
        },
        {
          "@type": "ListItem",
          "position": 7,
          "name": "AI, Analytics and Operations Specialisation",
          "url": "https://www.fostiima.org/programs/ai-analytics-operations"
        }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://www.fostiima.org/programs#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.fostiima.org/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Programs",
          "item": "https://www.fostiima.org/programs"
        }
      ]
    }
  ],
  "/programs/pgdm": [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://www.fostiima.org/programs/pgdm#webpage",
      "url": "https://www.fostiima.org/programs/pgdm",
      "name": "PGDM: 2-Year Full-Time Programme in Delhi | FOSTIIMA Business School",
      "description": "Explore FOSTIIMA's AICTE-approved two-year full-time PGDM programme, its four-semester curriculum, management subjects and learning opportunities.",
      "isPartOf": {
        "@id": "https://www.fostiima.org/#website"
      },
      "inLanguage": "en-IN"
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "@id": "https://www.fostiima.org/programs/pgdm#course",
      "name": "Post Graduate Diploma in Management (PGDM)",
      "description": "FOSTIIMA Business School offers an AICTE-approved, two-year full-time Post Graduate Diploma in Management (PGDM) programme designed to develop business knowledge, analytical capabilities, leadership skills and industry readiness through a comprehensive four-semester curriculum.",
      "url": "https://www.fostiima.org/programs/pgdm",
      "courseCode": "PGDM",
      "timeRequired": "P2Y",
      "educationalLevel": "Postgraduate",
      "educationalCredentialAwarded": "Post Graduate Diploma in Management",
      "provider": {
        "@id": "https://www.fostiima.org/#organization"
      },
      "inLanguage": "en-IN"
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "@id": "https://www.fostiima.org/programs/pgdm#breadcrumb",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.fostiima.org/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Programs",
          "item": "https://www.fostiima.org/programs"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "PGDM",
          "item": "https://www.fostiima.org/programs/pgdm"
        }
      ]
    }
  ],
  "/programs/pgdm-marketing": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          "@id": "https://www.fostiima.org/programs/pgdm-marketing#course",
          "name": "Post Graduate Diploma in Management (PGDM) - Marketing",
          "description": "FOSTIIMA Business School offers an AICTE-approved, two-year full-time PGDM Marketing programme focused on developing expertise in marketing, customer understanding, brand management, digital marketing and strategic decision-making.",
          "url": "https://www.fostiima.org/programs/pgdm-marketing",
          "courseCode": "PGDM-MARKETING",
          "timeRequired": "P2Y",
          "educationalLevel": "Postgraduate",
          "educationalCredentialAwarded": "Post Graduate Diploma in Management",
          "provider": {
            "@id": "https://www.fostiima.org/#organization"
          },
          "inLanguage": "en-IN",
          "teaches": [
            "Integrated Marketing Communication",
            "Product and Brand Management",
            "Business Marketing and Sales",
            "Rural Marketing",
            "Customer Relationship Management",
            "Neuroscience and Consumer Behavior",
            "Retail Marketing",
            "Services Marketing",
            "Marketing Analytics",
            "International Marketing"
          ]
        },
        {
          "@type": "WebPage",
          "@id": "https://www.fostiima.org/programs/pgdm-marketing#webpage",
          "url": "https://www.fostiima.org/programs/pgdm-marketing",
          "name": "PGDM (Marketing): 2-Year Full-Time Programme in Delhi | FOSTIIMA Business School",
          "description": "Explore FOSTIIMA's AICTE-approved two-year full-time PGDM Marketing programme, its marketing specialisation subjects and career-focused management education.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/programs/pgdm-marketing#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Programs",
              "item": "https://www.fostiima.org/programs"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "PGDM (Marketing)",
              "item": "https://www.fostiima.org/programs/pgdm-marketing"
            }
          ]
        }
      ]
    }
  ],
  "/programs/pgdm-finance": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          "@id": "https://www.fostiima.org/programs/pgdm-finance#course",
          "name": "Post Graduate Diploma in Management (PGDM) - Finance",
          "description": "The PGDM Finance program at FOSTIIMA Business School is a two-year full-time management program designed to develop financial management, analytical and strategic decision-making capabilities. The program covers financial management, investment, financial analysis and business decision-making.",
          "url": "https://www.fostiima.org/programs/pgdm-finance",
          "courseCode": "PGDM-FINANCE",
          "timeRequired": "P2Y",
          "educationalLevel": "Postgraduate",
          "educationalCredentialAwarded": "Post Graduate Diploma in Management",
          "provider": {
            "@type": "EducationalOrganization",
            "@id": "https://www.fostiima.org/#organization"
          },
          "inLanguage": "en-IN",
          "teaches": [
            "International Financial Management",
            "Project Financing and Management",
            "Security Analysis and Portfolio Management",
            "Futures, Options and Derivatives",
            "Mergers, Acquisitions and Corporate Restructuring",
            "Financial Modelling and Analytics"
          ]
        },
        {
          "@type": "WebPage",
          "@id": "https://www.fostiima.org/programs/pgdm-finance#webpage",
          "url": "https://www.fostiima.org/programs/pgdm-finance",
          "name": "PGDM (Finance): 2-Year Full-Time Programme in Delhi | FOSTIIMA Business School",
          "description": "Explore the two-year full-time PGDM Finance program at FOSTIIMA Business School, designed to develop financial management, analytical and strategic decision-making skills.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/programs/pgdm-finance#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Programs",
              "item": "https://www.fostiima.org/programs"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "PGDM (Finance)",
              "item": "https://www.fostiima.org/programs/pgdm-finance"
            }
          ]
        }
      ]
    }
  ],
  "/programs/pgdm-human-resource-management": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          "@id": "https://www.fostiima.org/programs/pgdm-human-resource-management#course",
          "name": "Post Graduate Diploma in Management (PGDM) - Human Resource Management",
          "description": "The PGDM HR program at FOSTIIMA Business School is a two-year full-time management program focused on people management, organisational behaviour, talent development, leadership, employee relations and strategic human resource practices.",
          "url": "https://www.fostiima.org/programs/pgdm-human-resource-management",
          "courseCode": "PGDM-HR",
          "timeRequired": "P2Y",
          "educationalLevel": "Postgraduate",
          "educationalCredentialAwarded": "Post Graduate Diploma in Management",
          "provider": {
            "@type": "EducationalOrganization",
            "@id": "https://www.fostiima.org/#organization"
          },
          "inLanguage": "en-IN",
          "teaches": [
            "Talent Acquisition",
            "Learning and Development",
            "Performance Management",
            "Compensation Management",
            "Managerial Interpersonal Skill and Group Dynamics",
            "Leadership Power and Control",
            "HR Analytics",
            "Manpower Development in Technological Change",
            "Diversity and Inclusion",
            "Employee Relations and Organisational Relations"
          ]
        },
        {
          "@type": "WebPage",
          "@id": "https://www.fostiima.org/programs/pgdm-human-resource-management#webpage",
          "url": "https://www.fostiima.org/programs/pgdm-human-resource-management",
          "name": "PGDM (HR): 2-Year Full-Time Programme in Delhi | FOSTIIMA Business School",
          "description": "Explore the two-year full-time PGDM HR program at FOSTIIMA Business School, focused on human capital, leadership, employee relations, organizational development and modern HR practices.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/programs/pgdm-human-resource-management#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Programs",
              "item": "https://www.fostiima.org/programs"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "PGDM (HR)",
              "item": "https://www.fostiima.org/programs/pgdm-human-resource-management"
            }
          ]
        }
      ]
    }
  ],
  "/programs/business-analytics": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          "@id": "https://www.fostiima.org/programs/business-analytics#course",
          "name": "Post Graduate Diploma in Management (PGDM) - Business Analytics",
          "description": "The PGDM Business Analytics program at FOSTIIMA Business School is a two-year full-time management program that combines management education with analytical thinking, business analytics and data-driven decision-making.",
          "url": "https://www.fostiima.org/programs/business-analytics",
          "courseCode": "PGDM-BUSINESS-ANALYTICS",
          "timeRequired": "P2Y",
          "educationalLevel": "Postgraduate",
          "educationalCredentialAwarded": "Post Graduate Diploma in Management",
          "provider": {
            "@type": "EducationalOrganization",
            "@id": "https://www.fostiima.org/#organization"
          },
          "inLanguage": "en-IN",
          "teaches": [
            "Business Analytics",
            "Data-Driven Decision Making",
            "Predictive Analytics",
            "Data Visualization",
            "Statistical Analysis for Business"
          ]
        },
        {
          "@type": "WebPage",
          "@id": "https://www.fostiima.org/programs/business-analytics#webpage",
          "url": "https://www.fostiima.org/programs/business-analytics",
          "name": "PGDM (Business Analytics): 2-Year Full-Time Programme in Delhi | FOSTIIMA Business School",
          "description": "Explore the two-year full-time PGDM Business Analytics program at FOSTIIMA Business School, combining management education with analytical thinking and data-driven business decision-making.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/programs/business-analytics#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Programs",
              "item": "https://www.fostiima.org/programs"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "PGDM (Business Analytics)",
              "item": "https://www.fostiima.org/programs/business-analytics"
            }
          ]
        }
      ]
    }
  ],
  "/programs/international-business": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          "@id": "https://www.fostiima.org/programs/international-business#course",
          "name": "PGDM Specialization in International Business",
          "description": "The International Business specialization at FOSTIIMA Business School focuses on international trade, global business operations, foreign exchange, international logistics and international marketing.",
          "url": "https://www.fostiima.org/programs/international-business",
          "courseCode": "PGDM-INTERNATIONAL-BUSINESS",
          "educationalLevel": "Postgraduate",
          "provider": {
            "@type": "EducationalOrganization",
            "@id": "https://www.fostiima.org/#organization"
          },
          "inLanguage": "en-IN",
          "teaches": [
            "Exim Financing, Documentation and Forex Management",
            "Foreign Trade and Policy",
            "Global Services and Supply Management",
            "International Logistics Management",
            "International Marketing",
            "Perspectives in International Business"
          ]
        },
        {
          "@type": "WebPage",
          "@id": "https://www.fostiima.org/programs/international-business#webpage",
          "url": "https://www.fostiima.org/programs/international-business",
          "name": "International Business: PGDM Specialisation in Delhi | FOSTIIMA Business School",
          "description": "Explore the International Business PGDM specialization at FOSTIIMA Business School, covering global trade, international logistics, foreign exchange and international marketing.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/programs/international-business#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Programs",
              "item": "https://www.fostiima.org/programs"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "International Business - Specialization",
              "item": "https://www.fostiima.org/programs/international-business"
            }
          ]
        }
      ]
    }
  ],
  "/programs/ai-analytics-operations": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Course",
          "@id": "https://www.fostiima.org/programs/ai-analytics-operations#course",
          "name": "PGDM Specialization in AI, Analytics and Operations",
          "description": "The AI, Analytics and Operations specialization at FOSTIIMA Business School focuses on analytics, artificial intelligence, operations management, predictive insights and data-driven business decision-making.",
          "url": "https://www.fostiima.org/programs/ai-analytics-operations",
          "courseCode": "PGDM-AI-ANALYTICS-OPERATIONS",
          "educationalLevel": "Postgraduate",
          "provider": {
            "@type": "EducationalOrganization",
            "@id": "https://www.fostiima.org/#organization"
          },
          "inLanguage": "en-IN",
          "teaches": [
            "Total Quality Management, Six Sigma and Business Process Reengineering",
            "Predictive Analytics",
            "Big Data Analytics",
            "Enterprise Resource Planning",
            "Logistics Management",
            "Service Operations Management",
            "Introduction to Artificial Intelligence",
            "AI in Business and Decision Making",
            "Ethics and Governance in AI",
            "Lean Manufacturing, Strategic Sourcing and E-Business Operations"
          ]
        },
        {
          "@type": "WebPage",
          "@id": "https://www.fostiima.org/programs/ai-analytics-operations#webpage",
          "url": "https://www.fostiima.org/programs/ai-analytics-operations",
          "name": "AI, Analytics & Operations: PGDM Specialisation in Delhi | FOSTIIMA Business School",
          "description": "Explore the AI, Analytics and Operations PGDM specialization at FOSTIIMA Business School, covering artificial intelligence, analytics, predictive insights, operations management and data-driven business decision-making.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/programs/ai-analytics-operations#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Programs",
              "item": "https://www.fostiima.org/programs"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "AI, Analytics & Operations - Specialization",
              "item": "https://www.fostiima.org/programs/ai-analytics-operations"
            }
          ]
        }
      ]
    }
  ],
  "/fostiima-strength": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.fostiima.org/fostiima-strength#webpage",
          "url": "https://www.fostiima.org/fostiima-strength",
          "name": "FOSTIIMA Strength | The FOSTIIMA Difference",
          "description": "Discover the key strengths of FOSTIIMA Business School, including its experienced faculty, industry connections, contemporary curriculum, learning environment, infrastructure and placement support.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/fostiima-strength#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "About Us",
              "item": "https://www.fostiima.org/about-us"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "FOSTIIMA Strength",
              "item": "https://www.fostiima.org/fostiima-strength"
            }
          ]
        }
      ]
    }
  ],
  "/academics": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.fostiima.org/academics#webpage",
          "url": "https://www.fostiima.org/academics",
          "name": "Academics | FOSTIIMA Business School",
          "description": "Explore the academic approach at FOSTIIMA Business School, featuring contemporary management education, industry-relevant curriculum, analytical skill development, research-driven learning, case studies and student achievements.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/academics#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Academics",
              "item": "https://www.fostiima.org/academics"
            }
          ]
        }
      ]
    }
  ],
  // HELD: ItemList "numberOfItems": 39. The list supplied has 37 names and
  // the page shows 37 faculty (src/data/faculty.ts).
  "/faculties": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://www.fostiima.org/faculties#webpage",
          "url": "https://www.fostiima.org/faculties",
          "name": "Core Faculty | FOSTIIMA Business School",
          "description": "Meet the experienced academicians and industry professionals at FOSTIIMA Business School who contribute their academic knowledge and industry experience to the learning environment.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "ItemList",
          "@id": "https://www.fostiima.org/faculties#faculty-list",
          "name": "Core Faculty at FOSTIIMA Business School",
          "description": "A list of experienced academicians and industry professionals associated with FOSTIIMA Business School.",
          "itemListOrder": "https://schema.org/ItemListUnordered",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Mr. Anil Somani"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Mr. Sunil Kala"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Mr. Rajeeva Kansal"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Dr. Aditya Vij"
            },
            {
              "@type": "ListItem",
              "position": 5,
              "name": "Mr. Gautam Kaul"
            },
            {
              "@type": "ListItem",
              "position": 6,
              "name": "Mr. Vinod Kaul"
            },
            {
              "@type": "ListItem",
              "position": 7,
              "name": "Mr. Hitesh Manocha"
            },
            {
              "@type": "ListItem",
              "position": 8,
              "name": "Mr. Rakesh Kumar"
            },
            {
              "@type": "ListItem",
              "position": 9,
              "name": "Ms. Shailaja Manocha"
            },
            {
              "@type": "ListItem",
              "position": 10,
              "name": "Dr. Vikram Tyagi"
            },
            {
              "@type": "ListItem",
              "position": 11,
              "name": "Ms. Gita Agarwal"
            },
            {
              "@type": "ListItem",
              "position": 12,
              "name": "Ms. Nadira Chaturvedi"
            },
            {
              "@type": "ListItem",
              "position": 13,
              "name": "Mr. Arun Sahay"
            },
            {
              "@type": "ListItem",
              "position": 14,
              "name": "SC Bansal"
            },
            {
              "@type": "ListItem",
              "position": 15,
              "name": "Mr. Jayant Bose"
            },
            {
              "@type": "ListItem",
              "position": 16,
              "name": "Mr. Vivek Kumar"
            },
            {
              "@type": "ListItem",
              "position": 17,
              "name": "Dr. Ritika Arora"
            },
            {
              "@type": "ListItem",
              "position": 18,
              "name": "Mr. Ferzand"
            },
            {
              "@type": "ListItem",
              "position": 19,
              "name": "Brig. Ajay Mehta"
            },
            {
              "@type": "ListItem",
              "position": 20,
              "name": "Dr. Ajit Gupta"
            },
            {
              "@type": "ListItem",
              "position": 21,
              "name": "Dr. Ruchika Yadav"
            },
            {
              "@type": "ListItem",
              "position": 22,
              "name": "Dr. Sharad Kumar"
            },
            {
              "@type": "ListItem",
              "position": 23,
              "name": "Mr. Pulak Palit"
            },
            {
              "@type": "ListItem",
              "position": 24,
              "name": "Mr. Sanjay Chandwani"
            },
            {
              "@type": "ListItem",
              "position": 25,
              "name": "Mr. Atul Mehta"
            },
            {
              "@type": "ListItem",
              "position": 26,
              "name": "Mr. Amit Grover"
            },
            {
              "@type": "ListItem",
              "position": 27,
              "name": "Ms. Harman Mangat"
            },
            {
              "@type": "ListItem",
              "position": 28,
              "name": "Mr. Sameer Kathuria"
            },
            {
              "@type": "ListItem",
              "position": 29,
              "name": "Dr. Preeti Taneja"
            },
            {
              "@type": "ListItem",
              "position": 30,
              "name": "Ms. Nimisha Srivastava"
            },
            {
              "@type": "ListItem",
              "position": 31,
              "name": "Ms. Ridhi Sehgal"
            },
            {
              "@type": "ListItem",
              "position": 32,
              "name": "Ms. Dishi S"
            },
            {
              "@type": "ListItem",
              "position": 33,
              "name": "Dr. Tanuj Jain"
            },
            {
              "@type": "ListItem",
              "position": 34,
              "name": "Mr. Shagun S"
            },
            {
              "@type": "ListItem",
              "position": 35,
              "name": "Mr. Dhananjay Kumar"
            },
            {
              "@type": "ListItem",
              "position": 36,
              "name": "Ms. Mohini Deshwal"
            },
            {
              "@type": "ListItem",
              "position": 37,
              "name": "Mohammad Maroof"
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/faculties#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Academics",
              "item": "https://www.fostiima.org/academics"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Core Faculty",
              "item": "https://www.fostiima.org/faculties"
            }
          ]
        }
      ]
    }
  ],
  // HELD: BreadcrumbList. Position 2 "Admissions Process" and position 3
  // "How to Apply" both point to /how-to-apply; Admissions Process is a menu
  // group with no page of its own.
  "/how-to-apply": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.fostiima.org/how-to-apply#webpage",
          "url": "https://www.fostiima.org/how-to-apply",
          "name": "How to Apply | FOSTIIMA Business School",
          "description": "Learn how to apply for the PGDM program at FOSTIIMA Business School. Find details about application requirements, academic transcripts, entrance exam score sheets, application submission, application fees and the admission process.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        }
      ]
    }
  ],
  "/fee-structure": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.fostiima.org/fee-structure#webpage",
          "url": "https://www.fostiima.org/fee-structure",
          "name": "Fee Structure | FOSTIIMA Business School",
          "description": "Explore the FOSTIIMA Business School PGDM fee structure for the 2027-29 batch, including the standard two-year program fee, Select Group fee, installment schedule, fee inclusions and additional learning opportunities.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "OfferCatalog",
          "@id": "https://www.fostiima.org/fee-structure#fee-catalog",
          "name": "FOSTIIMA PGDM Fee Structure 2027-29",
          "itemListElement": [
            {
              "@type": "Offer",
              "name": "PGDM Program Fee 2027-29",
              "description": "Total fee for the two-year PGDM program, including registration fee.",
              "price": "1195000",
              "priceCurrency": "INR",
              "category": "PGDM Program Fee",
              "itemOffered": {
                "@type": "EducationalOccupationalProgram",
                "name": "Post Graduate Diploma in Management (PGDM)"
              }
            },
            {
              "@type": "Offer",
              "name": "PGDM Select Group Fee 2027-29",
              "description": "Total fee for the two-year PGDM Select Group, including registration fee.",
              "price": "1275000",
              "priceCurrency": "INR",
              "category": "Select Group Fee",
              "itemOffered": {
                "@type": "EducationalOccupationalProgram",
                "name": "PGDM Select Group"
              }
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/fee-structure#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Fee Structure",
              "item": "https://www.fostiima.org/fee-structure"
            }
          ]
        }
      ]
    }
  ],
  "/placement": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.fostiima.org/placement#webpage",
          "url": "https://www.fostiima.org/placement",
          "name": "Placement Opportunities | FOSTIIMA Business School",
          "description": "Explore placement opportunities at FOSTIIMA Business School, including corporate linkages, industry interaction, placement support, experiential learning and career opportunities across multiple business domains.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/placement#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Placement",
              "item": "https://www.fostiima.org/placement"
            }
          ]
        }
      ]
    }
  ],
  "/placement/summer-internship": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.fostiima.org/placement/summer-internship#webpage",
          "url": "https://www.fostiima.org/placement/summer-internship",
          "name": "Summer Internship (SIP) | FOSTIIMA Business School",
          "description": "Explore the specialization-wise profile distribution of FOSTIIMA Business School students across summer internship batches, including opportunities in finance, human resources, marketing, sales, operations, logistics, research and consulting.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "Dataset",
          "@id": "https://www.fostiima.org/placement/summer-internship#dataset",
          "name": "FOSTIIMA Summer Internship Profile Distribution 2024-2026",
          "description": "Specialization-wise percentage distribution of students participating in the FOSTIIMA Summer Internship Programme for the 2024-2026 batch.",
          "url": "https://www.fostiima.org/placement/summer-internship",
          "temporalCoverage": "2024/2026",
          "variableMeasured": [
            {
              "@type": "PropertyValue",
              "name": "Finance",
              "value": 35,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Human Resources",
              "value": 5,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Marketing and Sales, including Digital Marketing",
              "value": 45,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Operations and Logistics",
              "value": 5,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Research and Consulting",
              "value": 10,
              "unitText": "%"
            }
          ],
          "inLanguage": "en-IN"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/placement/summer-internship#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Placement",
              "item": "https://www.fostiima.org/placement"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Summer Internship",
              "item": "https://www.fostiima.org/placement/summer-internship"
            }
          ]
        }
      ]
    }
  ],
  "/placement/final-placements": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.fostiima.org/placement/final-placements#webpage",
          "url": "https://www.fostiima.org/placement/final-placements",
          "name": "Final Placements | FOSTIIMA Business School",
          "description": "Explore final placement statistics at FOSTIIMA Business School, including batch-wise placement information, industry-wise and domain-wise distribution, recruiting companies and student career outcomes.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "Dataset",
          "@id": "https://www.fostiima.org/placement/final-placements#dataset",
          "name": "FOSTIIMA Final Placement Statistics 2023-2025",
          "description": "Industry-wise and domain-wise distribution of final placements for the FOSTIIMA Business School 2023-2025 batch.",
          "url": "https://www.fostiima.org/placement/final-placements",
          "temporalCoverage": "2023/2025",
          "variableMeasured": [
            {
              "@type": "PropertyValue",
              "name": "BFSI",
              "value": 5,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Consulting",
              "value": 8,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "FMCG",
              "value": 12,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Retail Marketing",
              "value": 12,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Real Estate",
              "value": 11,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Logistics",
              "value": 33,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "E-Commerce",
              "value": 3,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Advertising",
              "value": 15,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "EdTech",
              "value": 1,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Finance",
              "value": 34,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Human Resources",
              "value": 6,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Marketing",
              "value": 23,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Operations",
              "value": 11,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Sales",
              "value": 7,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Digital Marketing",
              "value": 9,
              "unitText": "%"
            },
            {
              "@type": "PropertyValue",
              "name": "Analytics",
              "value": 10,
              "unitText": "%"
            }
          ],
          "inLanguage": "en-IN"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/placement/final-placements#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Placement",
              "item": "https://www.fostiima.org/placement"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Final Placements",
              "item": "https://www.fostiima.org/placement/final-placements"
            }
          ]
        }
      ]
    }
  ],
  "/life-at-fostiima": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://www.fostiima.org/life-at-fostiima#webpage",
          "url": "https://www.fostiima.org/life-at-fostiima",
          "name": "Life at FOSTIIMA | Campus Life and Student Activities",
          "description": "Discover life at FOSTIIMA Business School, including academic experiences, brainstorming sessions, global immersion trips, corporate talks, sports and fitness, leadership camps and cultural events.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "ItemList",
          "@id": "https://www.fostiima.org/life-at-fostiima#activities",
          "name": "Campus Life and Student Activities at FOSTIIMA",
          "description": "A collection of academic, cultural, sports, leadership and industry-related experiences at FOSTIIMA Business School.",
          "itemListOrder": "https://schema.org/ItemListUnordered",
          "numberOfItems": 7,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Academic Excellence",
              "description": "A contemporary learning environment focused on industry-aligned curriculum, experienced faculty, practical exposure, global perspectives and professional skills."
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Brain Storming",
              "description": "Collaborative brainstorming and idea-driven learning experiences."
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Global Immersion Trips",
              "description": "International business exposure through educational and industry experiences in Dubai and Malaysia."
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Corporate Talk",
              "description": "Industry leaders and professionals sharing insights and experiences with students."
            },
            {
              "@type": "ListItem",
              "position": 5,
              "name": "Sports and Fitness",
              "description": "Sports, fitness and recreational activities that promote an active campus experience."
            },
            {
              "@type": "ListItem",
              "position": 6,
              "name": "Team Building and Leadership Camp",
              "description": "Collaborative activities designed to strengthen teamwork, leadership and student engagement."
            },
            {
              "@type": "ListItem",
              "position": 7,
              "name": "Cultural Events",
              "description": "Celebrations of festivals, traditions, sports and student experiences at FOSTIIMA Business School."
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/life-at-fostiima#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Life at FOSTIIMA",
              "item": "https://www.fostiima.org/life-at-fostiima"
            }
          ]
        }
      ]
    }
  ],
  "/conclave-conference": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://www.fostiima.org/conclave-conference#webpage",
          "url": "https://www.fostiima.org/conclave-conference",
          "name": "Conclave & Conference | FOSTIIMA Business School",
          "description": "Explore conferences, summits, conclaves and industry-led initiatives organized by FOSTIIMA Business School, bringing together business leaders, academicians, industry experts and thought leaders.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "ItemList",
          "@id": "https://www.fostiima.org/conclave-conference#events",
          "name": "Conferences and Events at FOSTIIMA Business School",
          "itemListOrder": "https://schema.org/ItemListUnordered",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Margdarshak 4.0"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "FOSTIIMA Convocation 2026"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Responsible AI Summit 2026"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Mission AI Sashakt Bharat"
            },
            {
              "@type": "ListItem",
              "position": 5,
              "name": "Margdarshak Awards Ceremony 3.0"
            },
            {
              "@type": "ListItem",
              "position": 6,
              "name": "Margdarshak 2.0 Award Ceremony"
            },
            {
              "@type": "ListItem",
              "position": 7,
              "name": "AIMA's 51st National Management Convention 2024"
            },
            {
              "@type": "ListItem",
              "position": 8,
              "name": "Olympian Manu Bhaker at FOSTIIMA"
            },
            {
              "@type": "ListItem",
              "position": 9,
              "name": "HR Round Table 2024"
            },
            {
              "@type": "ListItem",
              "position": 10,
              "name": "Anil Somani with Ashwini Vaishnaw at Indian Express Adda"
            },
            {
              "@type": "ListItem",
              "position": 11,
              "name": "Exit Poll Discussion"
            },
            {
              "@type": "ListItem",
              "position": 12,
              "name": "Dr. S. Jaishankar at Indian Express Adda"
            },
            {
              "@type": "ListItem",
              "position": 13,
              "name": "Budget 2024 Discussion on ABP News"
            },
            {
              "@type": "ListItem",
              "position": 14,
              "name": "Anil Somani's Conversation with Sadhguru"
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/conclave-conference#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Conclave & Conference",
              "item": "https://www.fostiima.org/conclave-conference"
            }
          ]
        }
      ]
    }
  ],
  "/margdarshak": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://www.fostiima.org/margdarshak#webpage",
          "url": "https://www.fostiima.org/margdarshak",
          "name": "Margdarshak Awards | FOSTIIMA Business School",
          "description": "Discover the Margdarshak Awards instituted by FOSTIIMA Business School to recognize outstanding HR professionals and honour the contributions of the founding faculty of IIM Ahmedabad to management education.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "ItemList",
          "@id": "https://www.fostiima.org/margdarshak#award-editions",
          "name": "Margdarshak Award Editions",
          "itemListOrder": "https://schema.org/ItemListUnordered",
          "numberOfItems": 4,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Margdarshak 1"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Margdarshak 2"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Margdarshak 3"
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "Margdarshak 4"
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/margdarshak#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Margdarshak",
              "item": "https://www.fostiima.org/margdarshak"
            }
          ]
        }
      ]
    }
  ],
  "/contact-us": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ContactPage",
          "@id": "https://www.fostiima.org/contact-us#contactpage",
          "url": "https://www.fostiima.org/contact-us",
          "name": "Contact Us | FOSTIIMA Business School",
          "description": "Contact FOSTIIMA Business School for admissions enquiries, program information, general assistance and campus visits.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/contact-us#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Contact Us",
              "item": "https://www.fostiima.org/contact-us"
            }
          ]
        }
      ]
    }
  ],
  "/grievance-helpline": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.fostiima.org/grievance-helpline#webpage",
          "url": "https://www.fostiima.org/grievance-helpline",
          "name": "Grievance & Helpline | FOSTIIMA Business School",
          "description": "Find grievance redressal information, feedback and suggestions channels, student support contacts, women's helpline numbers and psychological counselling guidance at FOSTIIMA Business School.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "ItemList",
          "@id": "https://www.fostiima.org/grievance-helpline#support-services",
          "name": "Grievance and Student Support Services",
          "itemListOrder": "https://schema.org/ItemListUnordered",
          "numberOfItems": 5,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Online Grievance Redressal Committee",
              "description": "Official grievance redressal channel for submitting student grievances."
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Student and Alumni Feedback",
              "description": "Feedback and suggestions channel for students and alumni."
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "Faculty and Staff Feedback",
              "description": "Feedback and suggestions channel for faculty and staff members."
            },
            {
              "@type": "ListItem",
              "position": 4,
              "name": "24X7 Women Helpline",
              "description": "Round-the-clock support contact for women students."
            },
            {
              "@type": "ListItem",
              "position": 5,
              "name": "Psychological Counselling Guidance",
              "description": "Contact information for psychological counselling and student guidance."
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/grievance-helpline#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Grievance & Helpline",
              "item": "https://www.fostiima.org/grievance-helpline"
            }
          ]
        }
      ]
    }
  ],
  // HELD: ItemList of openings and the CollectionPage "description". Both
  // name Assistant Professor, Associate Professor, Professor and Placement
  // Officer; the page lists Student Relationship Executive and Admission
  // Counsellor (src/data/careers.ts).
  "/careers": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://www.fostiima.org/careers#webpage",
          "url": "https://www.fostiima.org/careers",
          "name": "Careers | Join FOSTIIMA Business School",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/careers#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Careers",
              "item": "https://www.fostiima.org/careers"
            }
          ]
        }
      ]
    }
  ],
  "/awards-accreditation": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": "https://www.fostiima.org/awards-accreditation#webpage",
          "url": "https://www.fostiima.org/awards-accreditation",
          "name": "Awards & Accreditations | FOSTIIMA Business School",
          "description": "View the AICTE approval records, NBA-related documentation and institutional recognition information published by FOSTIIMA Business School.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "inLanguage": "en-IN"
        },
        {
          "@type": "ItemList",
          "@id": "https://www.fostiima.org/awards-accreditation#approval-records",
          "name": "FOSTIIMA Business School Approval and Accreditation Records",
          "itemListOrder": "https://schema.org/ItemListUnordered",
          "numberOfItems": 3,
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "NBA 2025-26 Online Application",
              "description": "Institutional online application submitted for extension of approval."
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "AICTE Approval 2026-27",
              "description": "Online application of the institution submitted for extension of approval for the academic year 2026-27."
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": "AICTE Approval 2025-26",
              "description": "Online application of the institution submitted for extension of approval for the academic year 2025-26."
            }
          ]
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/awards-accreditation#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Awards & Accreditations",
              "item": "https://www.fostiima.org/awards-accreditation"
            }
          ]
        }
      ]
    }
  ],
  // HELD: Dataset "temporalCoverage": "2020-2025". It is not an ISO 8601
  // interval ("YYYY/YYYY"), and the page's intake table covers 2019-20 to
  // 2024-25, so the intended range needs confirming.
  "/nirf": [
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": "https://www.fostiima.org/nirf#webpage",
          "url": "https://www.fostiima.org/nirf",
          "name": "NIRF 2026 | FOSTIIMA Business School",
          "description": "Explore FOSTIIMA Business School's submitted NIRF 2026 institutional data, including academic intake, student strength, placements, financial resources, research, consultancy, accessibility and faculty details.",
          "isPartOf": {
            "@id": "https://www.fostiima.org/#website"
          },
          "publisher": {
            "@id": "https://www.fostiima.org/#organization"
          }
        },
        {
          "@type": "Dataset",
          "@id": "https://www.fostiima.org/nirf#dataset",
          "name": "FOSTIIMA Business School NIRF 2026 Institutional Data",
          "description": "Institutional data submitted by FOSTIIMA Business School for the National Institutional Ranking Framework (NIRF) 2026. The data includes sanctioned academic intake, actual student strength, tuition fee reimbursement, placement and higher studies information, financial expenditure, sponsored research, consultancy projects, management development programs, accessibility facilities and faculty details.",
          "url": "https://www.fostiima.org/nirf",
          "identifier": "IR-M-S-766",
          "keywords": [
            "NIRF 2026",
            "National Institutional Ranking Framework",
            "FOSTIIMA Business School",
            "Academic Intake",
            "Student Strength",
            "Placement Data",
            "Financial Resources",
            "Sponsored Research",
            "Consultancy Projects",
            "Faculty Details"
          ],
          "spatialCoverage": {
            "@type": "Place",
            "name": "New Delhi, India"
          },
          "creator": {
            "@type": "Organization",
            "name": "FOSTIIMA Business School"
          }
        },
        {
          "@type": "BreadcrumbList",
          "@id": "https://www.fostiima.org/nirf#breadcrumb",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://www.fostiima.org/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "NIRF",
              "item": "https://www.fostiima.org/nirf"
            }
          ]
        }
      ]
    }
  ],
};
