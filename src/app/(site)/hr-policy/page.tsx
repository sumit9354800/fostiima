import type { Metadata } from "next";

import HRPolicyHero from "@/components/hr-policy/HRPolicyHero";
import LeaveOverview from "@/components/hr-policy/LeaveOverview";
import LeaveTypes from "@/components/hr-policy/LeaveTypes";
import SpecialLeavePolicies from "@/components/hr-policy/SpecialLeavePolicies";
import AttendanceRules from "@/components/hr-policy/AttendanceRules";
import LunchPolicy from "@/components/hr-policy/LunchPolicy";
import OutOfOfficeDuty from "@/components/hr-policy/OutOfOfficeDuty";
import GeneralHRRules from "@/components/hr-policy/GeneralHRRules";

export const metadata: Metadata = {
  title: "HR Policy 2024-25 | FOSTIIMA Business School",
  description:
    "View FOSTIIMA Business School HR policy information covering leave, attendance, duty hours, lunch policy, out-of-office duty and general employee rules.",
};

export default function HRPolicyPage() {
  return (
    <>
      <HRPolicyHero />

      <LeaveOverview />

      <LeaveTypes />

      <SpecialLeavePolicies />

      <AttendanceRules />

      <LunchPolicy />

      <OutOfOfficeDuty />

      <GeneralHRRules />
    </>
  );
}