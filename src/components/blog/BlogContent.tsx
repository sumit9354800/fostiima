import type { BlogBlock } from "@/types/blog";

type BlogContentProps = {
  content: BlogBlock[];
};

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <div className="space-y-6">
      {content.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={`paragraph-${index}`}
                className="text-base leading-8 text-slate-700"
              >
                {block.content}
              </p>
            );

          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={`heading-${index}`}
                  className="pt-4 text-2xl font-bold leading-tight text-[#c31e3b] sm:text-3xl"
                >
                  {block.content}
                </h2>
              );
            }

            return (
              <h3
                key={`heading-${index}`}
                className="pt-2 text-xl font-bold leading-tight text-slate-900 sm:text-2xl"
              >
                {block.content}
              </h3>
            );

          case "list":
            return (
              <ul
                key={`list-${index}`}
                className="list-disc space-y-2 pl-6 text-base leading-7 text-slate-700"
              >
                {block.items.map((item, itemIndex) => (
                  <li key={`list-item-${index}-${itemIndex}`}>{item}</li>
                ))}
              </ul>
            );

          case "table":
            return (
              <div
                key={`table-${index}`}
                className="my-6 overflow-x-auto rounded-xl border border-slate-200"
              >
                <table className="min-w-full border-collapse bg-white text-left text-sm">
                  <thead className="bg-[#0b3b91] text-white">
                    <tr>
                      {block.headers.map((header, headerIndex) => (
                        <th
                          key={`header-${index}-${headerIndex}`}
                          className="border-b border-white/20 px-4 py-3 font-semibold"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr
                        key={`row-${index}-${rowIndex}`}
                        className="border-b border-slate-100 last:border-b-0"
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={`cell-${index}-${rowIndex}-${cellIndex}`}
                            className="px-4 py-3 align-top leading-6 text-slate-700"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "image":
            return (
              <figure key={`image-${index}`} className="my-8">
                <img
                  src={block.src}
                  alt={block.alt}
                  className="h-auto w-full rounded-2xl object-cover"
                />

                {block.caption && (
                  <figcaption className="mt-2 text-center text-sm text-slate-500">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}