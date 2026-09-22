import { FileText, ExternalLink } from "lucide-react";

const balanceSheets = [
  {
    year: "2022–23",
    title: "Balance Sheet 2022–23",
    file: "/documents/balance-sheet/fostiima_2022-23.pdf",
  },
  {
    year: "2021–22",
    title: "Balance Sheet 2021–22",
    file: "/documents/balance-sheet/fostiima_2021-22.pdf",
  },
  {
    year: "2020–21",
    title: "Balance Sheet 2020–21",
    file: "/documents/balance-sheet/fostiima_2020-21.pdf",
  },
];

export default function BalanceSheetPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <section className="bg-[#061a3a] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#e5b83f]">
            Financial Information
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Balance Sheets
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#b8c5d8] sm:text-base">
            View the audited balance sheets of FOSTIIMA Business School for
            the available financial years.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          {balanceSheets.map((sheet) => (
            <article
              key={sheet.year}
              className="overflow-hidden rounded-2xl border border-[#dbe3ee] bg-white shadow-sm"
            >
              <div className="flex flex-col gap-4 border-b border-[#dbe3ee] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#061a3a]">
                    <FileText
                      size={21}
                      className="text-[#e5b83f]"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#64748b]">
                      Financial Year
                    </p>

                    <h2 className="mt-1 text-lg font-bold text-[#061a3a] sm:text-xl">
                      {sheet.title}
                    </h2>
                  </div>
                </div>

                <a
                  href={sheet.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c31e3b] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#a91832]"
                >
                  Open PDF
                  <ExternalLink size={16} />
                </a>
              </div>

              <div className="bg-[#eef2f7] p-2 sm:p-4">
                <iframe
                  src={`${sheet.file}#toolbar=1&navpanes=0&scrollbar=1`}
                  title={sheet.title}
                  className="h-[650px] w-full rounded-lg border border-[#dbe3ee] bg-white sm:h-[850px]"
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}