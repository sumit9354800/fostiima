
import type { BlogPost } from "@/types/blog";

type BlogContentProps = {
  content: BlogPost["content"];
};

/**
 * Escape plain text before rendering it as HTML.
 */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Sanitize saved paragraph HTML.
 *
 * Supported:
 * - <a>
 * - <br>
 * - <strong>
 * - <b>
 * - <em>
 * - <i>
 * - <u>
 */
function sanitizeParagraphHtml(value: string) {
  if (!value) return "";

  const trimmed = value.trim();

  if (!trimmed) return "";

  const containsSupportedHtml =
    /<\/?(a|br|strong|b|em|i|u)\b/i.test(trimmed);

  if (!containsSupportedHtml) {
    return escapeHtml(value).replace(/\r?\n/g, "<br />");
  }

  let html = value;

  // Remove unsupported HTML tags.
  html = html.replace(
    /<(?!\/?(?:a|br|strong|b|em|i|u)\b)[^>]*>/gi,
    "",
  );

  // Remove attributes from formatting tags.
  html = html.replace(
    /<(strong|b|em|i|u)(?:\s[^>]*)?>/gi,
    "<$1>",
  );

  // Normalize line breaks.
  html = html.replace(/<br\s*\/?>/gi, "<br />");

  // Sanitize links.
  html = html.replace(
    /<a\b([^>]*)>([\s\S]*?)<\/a>/gi,
    (_match, attributes: string, innerText: string) => {
      const hrefMatch = attributes.match(
        /href\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i,
      );

      const href = (
        hrefMatch?.[1] ??
        hrefMatch?.[2] ??
        hrefMatch?.[3] ??
        ""
      ).trim();

      const isSafeHref =
        /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(href) &&
        !/^\/\//.test(href);

      if (!isSafeHref) {
        return innerText;
      }

      return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${innerText}</a>`;
    },
  );

  // Remove any remaining attributes from links.
  html = html.replace(
    /<a\b[^>]*href="([^"]*)"[^>]*>/gi,
    (_match, href: string) =>
      `<a href="${href}" target="_blank" rel="noopener noreferrer">`,
  );

  // Remove attributes from line breaks.
  html = html.replace(/<br\s+[^>]*>/gi, "<br />");

  // Normalize formatting tags.
  html = html.replace(
    /<(strong|b|em|i|u)\s+[^>]*>/gi,
    "<$1>",
  );

  return html;
}

export default function BlogContent({
  content,
}: BlogContentProps) {
  return (
    <div className="w-full min-w-0 space-y-0">
      {content.map((block, index) => {
        switch (block.type) {
          case "heading":
            if (block.level === 2) {
              return (
                <h2
                  key={index}
                  className="mb-4 mt-9 text-2xl font-bold leading-tight text-[#183f78] first:mt-0 sm:text-3xl"
                >
                  {block.content}
                </h2>
              );
            }

            if (block.level === 3) {
              return (
                <h3
                  key={index}
                  className="mb-3 mt-7 text-xl font-bold leading-snug text-[#183f78] sm:text-2xl"
                >
                  {block.content}
                </h3>
              );
            }

            return (
              <h4
                key={index}
                className="mb-3 mt-6 text-lg font-bold leading-snug text-[#183f78] sm:text-xl"
              >
                {block.content}
              </h4>
            );

          case "paragraph":
            return (
              <p
                key={index}
                className="blog-content-paragraph mb-5 text-justify text-base leading-7 text-[#30415f] [overflow-wrap:anywhere] sm:mb-6 sm:leading-8"
                dangerouslySetInnerHTML={{
                  __html: sanitizeParagraphHtml(block.content),
                }}
              />
            );

          case "image":
            return (
              <figure key={index} className="my-7 w-full sm:my-9">
                <img
                  src={block.src}
                  alt={block.alt}
                  loading="lazy"
                  className="block h-auto max-h-[560px] w-full rounded-lg object-contain"
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
                key={index}
                className="mb-6 mt-3 list-disc space-y-2 pl-6 text-base leading-7 text-[#30415f] sm:leading-8"
              >
                {block.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="pl-1 [overflow-wrap:anywhere]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            );

          case "table":
            return (
              <div
                key={index}
                className="my-7 w-full max-w-full overflow-x-auto sm:my-9"
              >
                <table className="w-full min-w-[600px] border-collapse border border-[#dbe3ee]">
                  <thead>
                    <tr className="bg-[#061a3a]">
                      {block.headers.map((header, headerIndex) => (
                        <th
                          key={headerIndex}
                          className="border border-[#183f78] px-4 py-3 text-left text-sm font-bold text-white sm:px-5 sm:py-4"
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
                        {block.headers.map((_, columnIndex) => (
                          <td
                            key={columnIndex}
                            className="border border-[#dbe3ee] px-4 py-3 text-sm leading-6 text-[#30415f] sm:px-5 sm:py-4"
                          >
                            {row[columnIndex] ?? ""}
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
