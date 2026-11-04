import type { Metadata } from "next";
import PolicyHero from "@/components/privacy-policy/PolicyHero";
import PrivacyPolicyContent from "@/components/privacy-policy/PrivacyPolicyContent";
import { getCanonicalUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy | FOSTIIMA Business School",
  description:
    "Read the Privacy Policy of FOSTIIMA Business School explaining how personal data is collected, used, shared, and protected.",

  alternates: {
    canonical: getCanonicalUrl("/privacy-policy"),
  },

  openGraph: {
    type: "website",
    url: getCanonicalUrl("/privacy-policy"),
    title: "Privacy Policy | FOSTIIMA Business School",
    description:
      "Read the Privacy Policy of FOSTIIMA Business School explaining how personal data is collected, used, shared, and protected.",
    siteName: "FOSTIIMA Business School",
  },
};

export default function PolicyPage() {
  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <PolicyHero />
      <PrivacyPolicyContent />
    </main>
  );
}
