import type { BlogPost } from "@/types/blog";

type BlogContentProps = {
  content: BlogPost["content"];
};

export default function BlogContent({
  content,
}: BlogContentProps) {
  return (
    <div className="space-y-8">
      {content.map((block, index) => {
        switch (block.type) {
          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={index}
                  className="mt-10 text-3xl font-bold leading-tight text-[#183f78]"
                >
                  {block.content}
                </h2>
              );
            }

            if (block.level === 3) {
              return (
                <h3
                  key={index}
                  className="mt-8 text-2xl font-bold leading-tight text-[#183f78]"
                >
                  {block.content}
                </h3>
              );
            }

            return (
              <h4
                key={index}
                className="mt-6 text-xl font-bold text-[#183f78]"
              >
                {block.content}
              </h4>
            );

          case "paragraph":
            return (
              <p
                key={index}
                className="text-base leading-8 text-[#30415f]"
              >
                {block.content}
              </p>
            );

          case "image":
            return (
              <figure key={index} className="my-10">
                <img
                  src={block.src}
                  alt={block.alt}
                  className="h-auto w-full"
                />

                {block.caption && (
                  <figcaption className="mt-3 text-center text-sm text-slate-500">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "list":
            return (
              <ul
                key={index}
                className="list-disc space-y-2 pl-6 text-base leading-8 text-[#30415f]"
              >
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            );

          case "table":
            return (
              <div
                key={index}
                className="my-10 w-full overflow-x-auto"
              >
                <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-xl border border-[#dbe3ee]">
                  <thead>
                    <tr className="bg-[#061a3a]">
                      {block.headers.map((header, headerIndex) => (
                        <th
                          key={headerIndex}
                          className="border border-[#183f78] px-5 py-4 text-left text-sm font-bold text-white"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {block.rows.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={
                          rowIndex % 2 === 0
                            ? "bg-white"
                            : "bg-[#f8fafc]"
                        }
                      >
                        {block.headers.map(
                          (_, columnIndex) => (
                            <td
                              key={columnIndex}
                              className="border border-[#dbe3ee] px-5 py-4 text-sm leading-6 text-[#30415f]"
                            >
                              {row[columnIndex] ?? ""}
                            </td>
                          ),
                        )}
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