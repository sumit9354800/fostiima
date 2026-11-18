
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import { HOMEPAGE_FAQS } from "@/data/homepage-faqs";

export type FaqItem = {
  id: string;
  question: string;
  /** Shown as written: "\n" line breaks and "\n\n" paragraph breaks are kept. */
  answer: string;
  /** Optional label shown above the answer. */
  category?: string;
};

const HOMEPAGE_DESCRIPTION =
  "Find quick answers to common questions about academics, admissions, campus life and placements at FOSTIIMA.";

// With no props this renders the approved homepage FAQs
// (src/data/homepage-faqs.ts). Other pages pass their own list. Each list is
// also the one that page's FAQPage JSON-LD is built from, so the FAQs are in
// the server-rendered HTML and always match the structured data. Admin FAQ
// edits do not change these lists.
export default function FAQSection({
  faqs = HOMEPAGE_FAQS,
  description = HOMEPAGE_DESCRIPTION,
  sectionId,
  numbered = false,
}: {
  faqs?: readonly FaqItem[];
  description?: string;
  sectionId?: string;
  /** Show 1, 2, 3… in the badge instead of "?". Display only: not in the data or JSON-LD. */
  numbered?: boolean;
} = {}) {
  const [openId, setOpenId] = useState<string | null>(null);

  function toggleFAQ(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section
      id={sectionId}
      className="relative scroll-mt-24 overflow-hidden bg-white py-14 sm:py-16"
    >
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#dbeafe]/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#fee2e2]/50 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-9 max-w-3xl text-center">
          <span className="mb-2 inline-block text-[11px] font-bold uppercase tracking-[0.22em] text-[#c31e3b]">
            FAQs
          </span>

          <h2 className="text-2xl font-bold tracking-tight text-[#102a56] sm:text-3xl lg:text-4xl">
            Frequently Asked{" "}
            <span className="text-[#c31e3b]">Questions</span>
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            {description}
          </p>
        </div>

        <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`overflow-hidden rounded-xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-[#c31e3b]/30 shadow-md"
                      : "border-slate-200 shadow-sm hover:border-[#102a56]/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <span
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                          isOpen
                            ? "bg-[#c31e3b] text-white"
                            : "bg-[#dbeafe] text-[#1555a5]"
                        }`}
                      >
                        {numbered ? index + 1 : "?"}
                      </span>

                      <span className="text-sm font-semibold leading-6 text-[#102a56] sm:text-base">
                        {faq.question}
                      </span>
                    </div>

                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#102a56] transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-[#c31e3b]" : ""
                      }`}
                    />
                  </button>

                  <div
                    id={`faq-answer-${faq.id}`}
                    // Collapsed answers stay in the HTML (for search engines)
                    // but are hidden from screen readers until opened.
                    aria-hidden={!isOpen}
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="border-t border-slate-100 px-5 pb-5 pt-4 pl-[76px] sm:px-6 sm:pl-[76px]">
                        {faq.category && (
                          <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#c31e3b]">
                            {faq.category}
                          </span>
                        )}

                        <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
