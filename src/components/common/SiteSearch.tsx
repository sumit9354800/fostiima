/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Search,
  ArrowRight,
  X,
  CornerDownLeft,
  GraduationCap,
  BookOpen,
  BriefcaseBusiness,
  IndianRupee,
  Users,
  Newspaper,
  ChevronDown,
} from "lucide-react";

type SearchPage = {
  title: string;
  href: string;
  description: string;
  keywords: string[];
  category: string;
};

const searchablePages: SearchPage[] = [
  {
    title: "Home",
    href: "/",
    description: "Explore FOSTIIMA Business School.",
    keywords: ["home", "main", "homepage", "fostiima", "business school"],
    category: "General",
  },
  {
    title: "About Us",
    href: "/about-us",
    description: "Learn about FOSTIIMA and its journey.",
    keywords: [
      "about",
      "history",
      "institute",
      "college",
      "school",
      "who we are",
    ],
    category: "About",
  },
  {
    title: "Academics",
    href: "/academics",
    description: "Explore academic information and learning.",
    keywords: ["academics", "education", "study", "learning", "padhai"],
    category: "Academics",
  },
  {
    title: "Programs",
    href: "/programs",
    description: "Explore available management programs.",
    keywords: ["programs", "courses", "course", "degree", "pgdm", "management"],
    category: "Academics",
  },
  {
    title: "PGDM Program",
    href: "/programs/pgdm",
    description: "Discover the PGDM program.",
    keywords: [
      "pgdm",
      "post graduate diploma",
      "management course",
      "mba alternative",
    ],
    category: "Academics",
  },
  {
    title: "Business Analytics",
    href: "/programs/business-analytics",
    description: "Explore business analytics studies.",
    keywords: ["analytics", "data", "business analytics", "data analysis"],
    category: "Academics",
  },
  {
    title: "International Business",
    href: "/programs/international-business",
    description: "Explore international business studies.",
    keywords: ["international", "global business", "ib", "trade"],
    category: "Academics",
  },
  {
    title: "Faculty",
    href: "/faculties",
    description: "Meet faculty members and educators.",
    keywords: [
      "faculty",
      "professor",
      "teacher",
      "teachers",
      "faculty members",
    ],
    category: "People",
  },
  {
    title: "Placements",
    href: "/placement",
    description: "Explore placement information and opportunities.",
    keywords: [
      "placement",
      "placements",
      "jobs",
      "career",
      "recruitment",
      "naukri",
    ],
    category: "Careers",
  },
  {
    title: "Final Placements",
    href: "/placement/final-placements",
    description: "Explore final placement information.",
    keywords: [
      "final placement",
      "salary",
      "package",
      "ctc",
      "highest package",
      "average package",
    ],
    category: "Careers",
  },
  {
    title: "Summer Internship",
    href: "/placement/summer-internship",
    description: "Learn about summer internship opportunities.",
    keywords: ["internship", "summer internship", "sip", "training"],
    category: "Careers",
  },
  {
    title: "Fee Structure",
    href: "/fee-structure",
    description: "Find program fees and cost information.",
    keywords: [
      "fees",
      "fee",
      "cost",
      "tuition",
      "payment",
      "scholarship",
      "rupees",
      "price",
    ],
    category: "Admissions",
  },
  {
    title: "How to Apply",
    href: "/how-to-apply",
    description: "Learn how to apply for admission.",
    keywords: [
      "admission",
      "apply",
      "application",
      "eligibility",
      "entrance",
      "form",
      "registration",
    ],
    category: "Admissions",
  },
  {
    title: "Life at FOSTIIMA",
    href: "/life-at-fostiima",
    description: "Explore campus life and student experiences.",
    keywords: [
      "campus",
      "student life",
      "college life",
      "events",
      "activities",
      "hostel",
    ],
    category: "Campus",
  },
  {
    title: "Awards & Accreditation",
    href: "/awards-accreditation",
    description: "View recognitions, awards and accreditations.",
    keywords: ["awards", "accreditation", "recognition", "approval", "ranking"],
    category: "About",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Read news, articles and updates.",
    keywords: ["blog", "blogs", "news", "articles", "updates"],
    category: "Resources",
  },
  {
    title: "Contact Us",
    href: "/contact-us",
    description: "Get in touch with FOSTIIMA.",
    keywords: ["contact", "address", "phone", "email", "location", "reach us"],
    category: "General",
  },
];

const keywordSynonyms: Record<string, string[]> = {
  mba: ["pgdm", "management"],
  course: ["program", "programs", "academics"],
  courses: ["program", "programs", "academics"],
  fees: ["fee", "cost", "tuition"],
  fee: ["fees", "cost", "tuition"],
  job: ["jobs", "placement", "placements", "career"],
  jobs: ["job", "placement", "placements", "career"],
  career: ["careers", "placement", "placements", "jobs"],
  careers: ["career", "placement", "placements", "jobs"],
  admission: ["apply", "application", "eligibility"],
  admissions: ["admission", "apply", "application"],
  apply: ["admission", "application", "registration"],
  teacher: ["faculty", "professor"],
  teachers: ["faculty", "professor"],
  professor: ["faculty", "teacher"],
  salary: ["package", "ctc", "placements"],
  internship: ["summer", "sip"],
  college: ["school", "institute", "campus"],
  campus: ["college", "student", "life"],
  news: ["blog", "articles", "updates"],
  form: ["application", "registration", "apply"],
  paisa: ["fees", "fee", "cost"],
  paise: ["fees", "fee", "cost"],
  naukri: ["jobs", "placement", "career"],
  padhai: ["academics", "education", "courses"],
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function expandQuery(query: string) {
  const words = normalize(query).split(" ").filter(Boolean);
  const expanded = new Set(words);

  for (const word of words) {
    for (const synonym of keywordSynonyms[word] ?? []) {
      expanded.add(synonym);
    }
  }

  return [...expanded];
}

function scorePage(page: SearchPage, query: string) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) return 0;

  const title = normalize(page.title);
  const description = normalize(page.description);
  const keywords = normalize(page.keywords.join(" "));
  const href = normalize(page.href);
  const searchableText = `${title} ${description} ${keywords} ${href}`;
  const words = expandQuery(normalizedQuery);

  let score = 0;

  if (title === normalizedQuery) score += 100;
  if (title.startsWith(normalizedQuery)) score += 50;
  if (title.includes(normalizedQuery)) score += 35;
  if (keywords.includes(normalizedQuery)) score += 25;
  if (href.includes(normalizedQuery)) score += 20;
  if (description.includes(normalizedQuery)) score += 10;

  for (const word of words) {
    if (title.split(" ").includes(word)) score += 12;
    else if (title.includes(word)) score += 8;

    if (keywords.includes(word)) score += 6;
    if (description.includes(word)) score += 3;
    if (href.includes(word)) score += 4;
  }

  // Give a small preference to pages matching most query words.
  const originalWords = normalizedQuery.split(" ");
  const matchedWords = originalWords.filter((word) =>
    searchableText.includes(word),
  ).length;

  if (originalWords.length > 1 && matchedWords === originalWords.length) {
    score += 15;
  }

  return score;
}

const categoryIcons: Record<string, typeof Search> = {
  Academics: GraduationCap,
  Admissions: IndianRupee,
  Careers: BriefcaseBusiness,
  People: Users,
  Campus: BookOpen,
  Resources: Newspaper,
  About: BookOpen,
  General: Search,
};

export default function SiteSearch() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const results = useMemo(() => {
    const normalizedQuery = normalize(query);

    if (!normalizedQuery) return [];

    return searchablePages
      .map((page) => ({
        ...page,
        score: scorePage(page, normalizedQuery),
      }))
      .filter((page) => page.score > 0)
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
  }, [query]);

  const visibleResults = showAll ? results : results.slice(0, 7);
  const showResults = isFocused && query.trim().length > 0;

  const clearSearch = useCallback(() => {
    setQuery("");
    setActiveIndex(0);
    setShowAll(false);
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setActiveIndex(0);
    setShowAll(false);
  }, [query]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (showResults && activeIndex >= 0) {
      resultRefs.current[activeIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [activeIndex, showResults]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setIsFocused(false);
      setQuery("");
      setActiveIndex(0);
      return;
    }

    if (event.key === "ArrowDown" && results.length > 0) {
      event.preventDefault();
      setIsFocused(true);
      setActiveIndex((current) => (current + 1) % results.length);
      return;
    }

    if (event.key === "ArrowUp" && results.length > 0) {
      event.preventDefault();
      setIsFocused(true);
      setActiveIndex(
        (current) => (current - 1 + results.length) % results.length,
      );
      return;
    }

    if (event.key === "Enter" && results.length > 0) {
      event.preventDefault();

      const selected = results[activeIndex] ?? results[0];

      if (selected) {
        window.location.assign(selected.href);
      }
    }
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-8 sm:py-10">
      <div className="mb-5 text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b] sm:text-sm">
          Find your way
        </p>

        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          What are you looking for?
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Search courses, admissions, fees, placements, faculty and more.
        </p>
      </div>

      <div ref={containerRef} className="relative">
        <div
          className={`flex items-center gap-3 rounded-2xl border bg-white px-4 shadow-sm transition-all duration-200 ${
            isFocused
              ? "border-[#c31e3b] shadow-md ring-4 ring-[#c31e3b]/10"
              : "border-gray-200 hover:border-gray-300"
          }`}
        >
          <Search
            className={`h-5 w-5 shrink-0 ${
              isFocused ? "text-[#c31e3b]" : "text-gray-400"
            }`}
          />

          <input
            ref={inputRef}
            type="search"
            role="combobox"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onFocus={() => setIsFocused(true)}
            onKeyDown={handleKeyDown}
            placeholder="Try “PGDM”, “fees” or “placements”..."
            aria-label="Search FOSTIIMA website"
            aria-autocomplete="list"
            aria-expanded={showResults}
            aria-controls="fostiima-search-results"
            aria-activedescendant={
              showResults && results[activeIndex]
                ? `search-result-${activeIndex}`
                : undefined
            }
            className="h-14 min-w-0 flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400 sm:text-base"
          />

          {query && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-900"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {showResults && (
          <div
            id="fostiima-search-results"
            role="listbox"
            aria-label="Search results"
            className="absolute left-0 right-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                {results.length > 0
                  ? `${results.length} matching page${results.length === 1 ? "" : "s"}`
                  : "Search results"}
              </span>

              <span className="hidden items-center gap-1 text-xs text-gray-400 sm:flex">
                <CornerDownLeft className="h-3.5 w-3.5" />
                Enter to open
              </span>
            </div>

            {visibleResults.length > 0 ? (
              <ul className="max-h-[min(60vh,420px)] overflow-y-auto py-1">
                {visibleResults.map((page, index) => {
                  const CategoryIcon = categoryIcons[page.category] ?? Search;

                  return (
                    <li key={page.href}>
                      <Link
                        ref={(element) => {
                          resultRefs.current[index] = element;
                        }}
                        id={`search-result-${index}`}
                        role="option"
                        aria-selected={activeIndex === index}
                        href={page.href}
                        onClick={() => {
                          setIsFocused(false);
                          setQuery("");
                        }}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`flex items-center gap-3 px-4 py-3 transition ${
                          activeIndex === index
                            ? "bg-red-50"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                          <CategoryIcon className="h-5 w-5" />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span
                            className={`block text-sm font-semibold ${
                              activeIndex === index
                                ? "text-[#c31e3b]"
                                : "text-gray-900"
                            }`}
                          >
                            {page.title}
                          </span>

                          <span className="mt-0.5 block truncate text-xs text-gray-500">
                            {page.description}
                          </span>
                        </span>

                        <span className="hidden shrink-0 rounded-full bg-gray-100 px-2 py-1 text-[10px] font-medium text-gray-500 sm:inline-flex">
                          {page.category}
                        </span>

                        <ArrowRight className="h-4 w-4 shrink-0 text-gray-400" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="px-5 py-8 text-center">
                <Search className="mx-auto mb-3 h-8 w-8 text-gray-300" />

                <p className="font-semibold text-gray-800">
                  No matching pages found
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Try another keyword, such as PGDM, admission or placement.
                </p>
              </div>
            )}

            {results.length > 7 && !showAll && (
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="flex w-full items-center justify-center gap-2 border-t border-gray-100 px-4 py-3 text-sm font-semibold text-[#c31e3b] transition hover:bg-red-50"
              >
                Show all {results.length} results
                <ChevronDown className="h-4 w-4" />
              </button>
            )}

            <div className="border-t border-gray-100 bg-gray-50 px-4 py-2.5">
              <p className="text-center text-[11px] text-gray-500">
                FOSTIIMA Business School · Website Search
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
