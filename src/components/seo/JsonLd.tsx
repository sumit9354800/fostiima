import type { JsonLdObject } from "@/config/structured-data";

/**
 * Renders JSON-LD blocks as native <script type="application/ld+json"> tags,
 * as the Next.js JSON-LD guide recommends. "<" is escaped so a value can
 * never close the script element.
 */
export default function JsonLd({
  data,
}: {
  data: readonly JsonLdObject[] | undefined;
}) {
  if (!data?.length) return null;

  return data.map((item, index) => (
    <script
      key={index}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(item).replace(/</g, "\\u003c"),
      }}
    />
  ));
}
