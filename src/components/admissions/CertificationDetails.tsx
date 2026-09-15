import { Award, CheckCircle2 } from "lucide-react";

type CertificationDetailsProps = {
  details: string[];
};

export default function CertificationDetails({
  details,
}: CertificationDetailsProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#102a56] text-[#eab308]">
              <Award className="h-6 w-6" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
                Certification
              </span>

              <h2 className="mt-1 text-2xl font-bold text-[#102a56]">
                Certification Details
              </h2>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            {details.map((detail) => (
              <div
                key={detail}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#c31e3b]" />

                <p className="text-sm leading-7 text-slate-600">
                  {detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}