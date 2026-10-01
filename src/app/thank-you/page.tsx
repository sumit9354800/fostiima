"use client";

import Link from "next/link";
import {
  CheckCircle2,
  ArrowLeft,
  GraduationCap,
} from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#071d3b] px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="rounded-3xl bg-white p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.3)] sm:p-12">

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="flex items-center">
              <div className="text-2xl font-black tracking-tight text-[#123b79]">
                FOSTIIMA
              </div>

              <div className="ml-3 border-l border-slate-300 pl-3 text-left text-[10px] font-bold leading-tight text-slate-500">
                BUSINESS
                <br />
                SCHOOL
              </div>
            </div>
          </div>

          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2
              size={48}
              className="text-green-600"
            />
          </div>

          {/* Heading */}
          <h1 className="mt-7 text-3xl font-black text-[#123b79] sm:text-4xl">
            Thank You!
          </h1>

          <p className="mt-4 text-lg font-semibold text-slate-700">
            Your application has been submitted successfully.
          </p>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
            Thank you for your interest in FOSTIIMA Business School.
            Our admissions team will review your details and get in
            touch with you shortly.
          </p>

          {/* Info */}
          <div className="mx-auto mt-8 flex max-w-md items-center gap-3 rounded-xl bg-slate-50 p-4 text-left">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fff7d6]">
              <GraduationCap
                size={21}
                className="text-[#c99d00]"
              />
            </div>

            <div>
              <p className="text-sm font-bold text-[#123b79]">
                FOSTIIMA Business School
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Admissions Team will contact you soon.
              </p>
            </div>
          </div>

          {/* Return Button */}
          <Link
            href="/pgdm-admission"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#c31e3b] px-7 py-3.5 text-sm font-bold text-white transition hover:bg-[#a91731]"
          >
            <ArrowLeft size={17} />
            Return to Application
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} FOSTIIMA Business School
        </p>
      </div>
    </main>
  );
}