import type { BlogPost } from "@/types/blog";

type BlogContentProps = {
  content: BlogPost["content"];
};

/**
 * Escapes plain text before it is rendered as HTML.
 * This keeps old blog paragraphs containing "<" or ">" working correctly.
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
 * Converts a saved paragraph into safe HTML.
 *
 * The admin paragraph editor can save:
 *
 * <a href="https://example.com">some text</a>
 * <br />
 * <strong>bold</strong>
 *
 * Only the tags and attributes that the blog editor supports are allowed.
 */
function sanitizeParagraphHtml(value: string) {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  /*
   * Old blog content is plain text.
   *
   * If there is no supported HTML tag, treat the entire value as plain text.
   * This prevents normal text such as:
   *
   * 10 < 20
   *
   * from accidentally being interpreted as HTML.
   */
  const containsSupportedHtml =
    /<\/?(a|br|strong|b|em|i|u)\b/i.test(trimmed);

  if (!containsSupportedHtml) {
    return escapeHtml(value).replace(/\r?\n/g, "<br />");
  }

  let html = value;

  /*
   * Remove dangerous / unsupported tags.
   *
   * We only need these tags because those are the tags supported
   * by the paragraph editor.
   */
  html = html.replace(
    /<(?!\/?(?:a|br|strong|b|em|i|u)\b)[^>]*>/gi,
    "",
  );

  /*
   * Remove every attribute from formatting tags.
   */
  html = html.replace(
    /<(strong|b|em|i|u)(?:\s[^>]*)?>/gi,
    "<$1>",
  );

  /*
   * Normalize <br> variations.
   */
  html = html.replace(/<br\s*\/?>/gi, "<br />");

  /*
   * Sanitize <a> tags.
   *
   * Allowed:
   * - https://
   * - http://
   * - mailto:
   * - tel:
   * - /internal/path
   * - #anchor
   */
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
        /^(https?:|mailto:|tel:|\/|#)/i.test(href);

      if (!isSafeHref) {
        return innerText;
      }

      const escapedHref = escapeHtml(href);

      return `<a href="${escapedHref}" target="_blank" rel="noopener noreferrer">${innerText}</a>`;
    },
  );

  /*
   * Remove any remaining attributes from <a> tags.
   *
   * This makes sure things such as onclick, style, onmouseover etc.
   * cannot survive into the final HTML.
   */
  html = html.replace(
    /<a\b[^>]*href="([^"]*)"[^>]*>/gi,
    (_match, href: string) => {
      return `<a href="${href}" target="_blank" rel="noopener noreferrer">`;
    },
  );

  /*
   * Remove attributes from <br>.
   */
  html = html.replace(/<br\s+[^>]*>/gi, "<br />");

  /*
   * Normalize supported formatting tags one final time.
   */
  html = html.replace(/<(strong|b|em|i|u)\s+[^>]*>/gi, "<$1>");

  return html;
}

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
                dangerouslySetInnerHTML={{
                  __html: sanitizeParagraphHtml(block.content),
                }}
              />
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