import Image from "next/image";

import type { EditionData } from "@/data/margdarshak";

type MargdarshakEditionProps = {
  edition: EditionData;
};

export default function MargdarshakEdition({
  edition,
}: MargdarshakEditionProps) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
      <div className="border-b border-slate-200 pb-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
          Margdarshak Awards
        </p>

        <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-[#102a56] sm:text-3xl">
          {edition.title}
        </h3>
      </div>

      {edition.paragraphs.length > 0 && (
        <div className="mt-8 space-y-5">
          {edition.paragraphs.map(
            (paragraph, index) => (
              <p
                key={`${index}-${paragraph.slice(0, 24)}`}
                className="text-sm leading-7 text-slate-600 sm:text-base"
              >
                {paragraph}
              </p>
            ),
          )}
        </div>
      )}

      <div className="mt-10 space-y-12">
        {edition.sections.map((section) => (
          <section key={section.title}>
            <h4 className="mb-5 text-xl font-bold text-[#102a56] sm:text-2xl">
              {section.title}
            </h4>

            {section.paragraphs && (
              <div className="space-y-5">
                {section.paragraphs.map(
                  (paragraph, index) => (
                    <p
                      key={`${index}-${paragraph.slice(0, 24)}`}
                      className="text-sm leading-7 text-slate-600 sm:text-base"
                    >
                      {paragraph}
                    </p>
                  ),
                )}
              </div>
            )}

            {section.list && (
              <div className="grid gap-3 sm:grid-cols-2">
                {section.list.map(
                  (item, index) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#102a56] text-xs font-bold text-white">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="text-sm font-medium leading-6 text-slate-700">
                        {item}
                      </span>
                    </div>
                  ),
                )}
              </div>
            )}

            {section.table && (
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[700px] border-collapse text-left">
                    <thead>
                      <tr className="bg-[#102a56] text-white">
                        {section.table.headers.map(
                          (header, index) => (
                            <th
                              key={`${header}-${index}`}
                              className="px-4 py-3 text-xs font-bold uppercase tracking-wide"
                            >
                              {header}
                            </th>
                          ),
                        )}
                      </tr>
                    </thead>

                    <tbody>
                      {section.table.rows.map(
                        (row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className="border-t border-slate-200 even:bg-slate-50"
                          >
                            {row.map(
                              (cell, cellIndex) => (
                                <td
                                  key={`${rowIndex}-${cellIndex}`}
                                  className="px-4 py-3 text-sm leading-6 text-slate-600"
                                >
                                  {cell || "—"}
                                </td>
                              ),
                            )}
                          </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {section.images && (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {section.images.map(
                  (image) => (
                    <div
                      key={image.src}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    </div>
                  ),
                )}
              </div>
            )}
          </section>
        ))}
      </div>
    </article>
  );
}