import type { Metadata } from "next";
import TermsHero from "@/components/terms/TermsHero";
import TermsContent from "@/components/terms/TermsContent";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & Conditions | FOSTIIMA Business School",
  description:
    "Read the Terms & Conditions and Terms of Use applicable to the FOSTIIMA Business School website.",

  alternates: {
    canonical: getCanonicalUrl("/terms-and-conditions"),
  },

  openGraph: {
    type: "website",
    url: getCanonicalUrl("/terms-and-conditions"),
    title: "Terms & Conditions | FOSTIIMA Business School",
    description:
      "Read the Terms & Conditions and Terms of Use applicable to the FOSTIIMA Business School website.",
    siteName: "FOSTIIMA Business School",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <main>
      <TermsHero />
      <TermsContent />
    </main>
  );
}