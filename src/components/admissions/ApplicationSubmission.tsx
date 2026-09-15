import { ArrowUpRight, ClipboardCheck, PackageCheck } from "lucide-react";

type ApplicationSubmissionProps = {
  submission: {
    title: string;
    paragraphs: string[];
  };
  applicationKit: {
    title: string;
    paragraphs: string[];
  };
};

export default function ApplicationSubmission({
  submission,
  applicationKit,
}: ApplicationSubmissionProps) {
  return (
    <section className="bg-[#f8faff] py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#dbeafe] text-[#102a56]">
              <ClipboardCheck className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-[#102a56]">
              {submission.title}
            </h2>

            <div className="mt-4 space-y-3">
              {submission.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-slate-600"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-[#102a56] p-6 shadow-sm sm:p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#eab308]">
              <PackageCheck className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-2xl font-bold text-white">
              {applicationKit.title}
            </h2>

            <div className="mt-4 space-y-3">
              {applicationKit.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-7 text-white/70"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#eab308]">
              Payment Gateway
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}