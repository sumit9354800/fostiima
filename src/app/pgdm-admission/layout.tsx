import JsonLd from "@/components/seo/JsonLd";
import { PAGE_STRUCTURED_DATA } from "@/config/structured-data";

// The page is a Client Component. Its JSON-LD is rendered here, in a Server
// Component, so src/config/structured-data.ts (every page's schema, plus the
// faculty and careers data it imports) stays out of the browser bundle.
export default function PGDMAdmissionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* FAQPage, built from src/data/pgdm-admission-faqs.ts. */}
      <JsonLd data={PAGE_STRUCTURED_DATA["/pgdm-admission"]} />

      {children}
    </>
  );
}
