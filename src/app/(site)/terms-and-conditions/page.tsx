import type { Metadata } from "next";
import TermsHero from "@/components/terms/TermsHero";
import TermsContent from "@/components/terms/TermsContent";

export const metadata: Metadata = {
  title: "Terms & Conditions | FOSTIIMA Business School",
  description:
    "Read the Terms & Conditions and Terms of Use applicable to the FOSTIIMA Business School website.",
};

export default function TermsAndConditionsPage() {
  return (
    <main>
      <TermsHero />
      <TermsContent />
    </main>
  );
}