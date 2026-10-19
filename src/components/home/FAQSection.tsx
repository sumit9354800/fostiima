
"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: string;
};

const HOMEPAGE_FAQ_LIMIT = 6;

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadFAQs() {
      try {
        setLoading(true);
        setHasError(false);

        const response = await fetch("/api/faqs", {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`FAQ API failed: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid FAQ API response");
        }

        setFaqs(result.data.slice(0, HOMEPAGE_FAQ_LIMIT));
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        console.error("Failed to load FAQs from database:", error);
        setHasError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadFAQs();

    return () => controller.abort();
  }, []);

  function toggleFAQ(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16">
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
            Find quick answers to common questions about academics, admissions,
            campus life and placements at FOSTIIMA.
          </p>
        </div>

        {loading ? (
          <p className="py-10 text-center text-sm text-slate-500">
            Loading frequently asked questions...
          </p>
        ) : hasError ? (
          <p className="py-10 text-center text-sm text-red-600">
            FAQs could not be loaded right now. Please try again later.
          </p>
        ) : faqs.length === 0 ? (
          <p className="py-10 text-center text-sm text-slate-500">
            No FAQs are currently available.
          </p>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq) => {
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
                        ?
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
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="border-t border-slate-100 px-5 pb-5 pt-4 pl-[76px] sm:px-6 sm:pl-[76px]">
                        <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#c31e3b]">
                          {faq.category}
                        </span>

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
        )}
      </div>
    </section>
  );
}
