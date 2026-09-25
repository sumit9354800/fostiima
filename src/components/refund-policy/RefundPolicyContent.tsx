import { Mail } from "lucide-react";
import { refundPolicy } from "@/data/refund-policy";

export function RefundPolicyContent() {
  return (
    <section className="bg-[#f8fafc] px-5 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-[#dbe3ee] bg-white shadow-sm">
          <div className="border-b border-[#dbe3ee] bg-[#061a3a] px-6 py-7 sm:px-8">
            <p className="text-md font-bold uppercase tracking-[0.2em] text-[#e5b83f]">
              FOSTIIMA Business School
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              {refundPolicy.title}
            </h2>
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-10">
            {refundPolicy.sections.map((section) => (
              <article key={section.title}>
                <h3 className="text-xl font-bold text-[#061a3a]">
                  {section.title}
                </h3>

                <p className="mt-4 text-base leading-8 text-[#475569]">
                  {section.content}
                </p>
              </article>
            ))}

            <div className="mt-8 flex items-start gap-3 rounded-xl border border-[#dbe3ee] bg-[#f8fafc] p-4">
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#061a3a]">
                <Mail
                  size={17}
                  className="text-[#e5b83f]"
                  aria-hidden="true"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#061a3a]">
                  Refund &amp; withdrawal requests
                </p>

                <a
                  href="mailto:student.relations@fostiima.org"
                  className="mt-1 inline-block text-sm font-medium text-[#c31e3b] hover:underline"
                >
                  student.relations@fostiima.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}