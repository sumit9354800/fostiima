import type { BlogContentBlock } from "@/types/blog";

type BlogContentProps = {
  content: BlogContentBlock[];
};

export default function BlogContent({
  content,
}: BlogContentProps) {
  return (
    <div className="space-y-8 text-[17px] leading-8 text-slate-700">
      {content.map((block, index) => {
        switch (block.type) {
          case "heading": {
            const HeadingTag =
              block.level === 4
                ? "h4"
                : block.level === 3
                  ? "h3"
                  : "h2";

            return (
              <HeadingTag
                key={`${block.type}-${index}`}
                className={
                  block.level === 2
                    ? "mt-12 text-2xl font-bold leading-tight text-[#123b79] sm:text-3xl"
                    : block.level === 3
                      ? "mt-8 text-xl font-bold leading-tight text-[#123b79] sm:text-2xl"
                      : "mt-6 text-lg font-bold leading-tight text-[#123b79] sm:text-xl"
                }
              >
                {block.content}
              </HeadingTag>
            );
          }

          case "paragraph":
            return (
              <p
                key={`${block.type}-${index}`}
                className="whitespace-pre-line"
              >
                {block.content}
              </p>
            );

          case "image":
            return (
              <figure
                key={`${block.type}-${index}`}
                className="my-10 overflow-hidden"
              >
                <img
                  src={block.src}
                  alt={block.alt}
                  loading="lazy"
                  className="h-auto w-full rounded-xl object-cover"
                />

                {block.caption && (
                  <figcaption className="mt-3 text-center text-sm leading-6 text-slate-500">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "list":
            return (
              <ul
                key={`${block.type}-${index}`}
                className="list-disc space-y-3 pl-6"
              >
                {block.items.map((item, itemIndex) => (
                  <li key={`${index}-${itemIndex}`}>
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "table":
            return (
              <div
                key={`${block.type}-${index}`}
                className="my-10 overflow-x-auto rounded-xl border border-slate-200"
              >
                <table className="w-full min-w-[600px] border-collapse text-left">
                  <thead>
                    <tr className="bg-[#061a3a] text-white">
                      {block.headers.map(
                        (header, headerIndex) => (
                          <th
                            key={headerIndex}
                            className="border border-[#1d3559] px-4 py-3 text-sm font-bold"
                          >
                            {header}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className="even:bg-slate-50"
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className="border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-700"
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

          default:
            return null;
        }
      })}
    </div>
  );
}