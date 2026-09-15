import type { Metadata } from "next";
import PolicyHero from "@/components/privacy-policy/PolicyHero";
import LeavePolicy from "@/components/privacy-policy/LeavePolicy";

export const metadata: Metadata = {
  title: "Policy | FOSTIIMA Business School",
  description:
    "Read the leave policy and employee guidelines of FOSTIIMA Business School.",
};

export default function PolicyPage() {
  return (
    <main>
      <PolicyHero />
      <LeavePolicy />
    </main>
  );
}