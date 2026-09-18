import { nirfSponsoredResearch } from "@/data/nirf";

export default function NIRFResearch() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Sponsored Research"
          title="Research Details"
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {nirfSponsoredResearch.map((item) => (
            <article
              key={item.year}
              className="border border-[#dbe3ee] bg-[#f8fafc] p-6"
            >
              <p className="text-sm font-bold text-[#c31e3b]">
                {item.year}
              </p>

              <div className="mt-6 space-y-4">
                <Metric
                  label="Sponsored Projects"
                  value={item.projects}
                />

                <Metric
                  label="Funding Agencies"
                  value={item.agencies}
                />

                <Metric
                  label="Amount Received"
                  value={item.amount}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="border-t border-[#dbe3ee] pt-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold text-[#061a3a]">
        {value}
      </p>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#c31e3b]">
        {eyebrow}
      </span>

      <h2 className="mt-3 text-3xl font-bold text-[#061a3a] sm:text-4xl">
        {title}
      </h2>

      <div className="mt-5 h-1 w-14 bg-[#e5b83f]" />
    </div>
  );
}