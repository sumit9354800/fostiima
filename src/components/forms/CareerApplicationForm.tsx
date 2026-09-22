"use client";

import { useState } from "react";
import {
  CheckCircle2,
  FileText,
  Loader2,
  Send,
  ShieldCheck,
} from "lucide-react";
import { careerPositions } from "@/data/careers";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export default function CareerApplicationForm() {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmissionState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const data: unknown = await response.json();

      if (
        !response.ok ||
        !data ||
        typeof data !== "object" ||
        !("success" in data) ||
        data.success !== true
      ) {
        const message =
          data &&
          typeof data === "object" &&
          "message" in data &&
          typeof data.message === "string"
            ? data.message
            : "Unable to submit your application right now.";

        throw new Error(message);
      }

      setSubmissionState("success");
      form.reset();
    } catch (error) {
      console.error("Career application submission failed:", error);

      setSubmissionState("error");

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your application right now.",
      );
    }
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
      <div className="max-w-2xl">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#c31e3b]">
          <FileText className="h-5 w-5" />
        </div>

        <h2 className="mt-5 text-2xl font-bold text-[#c31e3b] sm:text-3xl">
          Apply for a Position
        </h2>

        <p className="mt-3 text-sm leading-7 text-slate-600">
          Submit your details and CV for the position you are interested in.
          Our team will review your application and get back to you if your
          profile matches the opportunity.
        </p>
      </div>

      {/* Success Message */}
      {submissionState === "success" && (
        <div
          role="status"
          aria-live="polite"
          className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

          <div>
            <p className="text-sm font-semibold text-green-800">
              Application submitted successfully.
            </p>

            <p className="mt-1 text-xs leading-5 text-green-700">
              Thank you for applying. Your application details and CV have been
              sent to our team.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submissionState === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4"
        >
          <p className="text-sm font-semibold text-red-800">
            We could not submit your application.
          </p>

          <p className="mt-1 text-xs leading-5 text-red-700">
            {errorMessage}
          </p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-5 sm:grid-cols-2"
      >
        {/* Full Name */}
        <div>
          <label
            htmlFor="full-name"
            className="mb-2 block text-sm font-medium text-slate-800"
          >
            Full Name *
          </label>

          <input
            id="full-name"
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Enter your full name"
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-800"
          >
            Email Address *
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-slate-800"
          >
            Phone Number *
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="numeric"
            autoComplete="tel"
            placeholder="Enter phone number"
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        {/* Position */}
        <div>
          <label
            htmlFor="position"
            className="mb-2 block text-sm font-medium text-slate-800"
          >
            Position Applying For *
          </label>

          <select
            id="position"
            name="position"
            required
            defaultValue=""
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          >
            <option value="" disabled>
              Select a position
            </option>

            {careerPositions.map((position) => (
              <option key={position} value={position}>
                {position}
              </option>
            ))}
          </select>
        </div>

        {/* Qualification */}
        <div className="sm:col-span-2">
          <label
            htmlFor="qualification"
            className="mb-2 block text-sm font-medium text-slate-800"
          >
            Qualification *
          </label>

          <input
            id="qualification"
            name="qualification"
            type="text"
            required
            placeholder="Enter your highest qualification"
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        {/* Experience */}
        <div className="sm:col-span-2">
          <label
            htmlFor="experience"
            className="mb-2 block text-sm font-medium text-slate-800"
          >
            Experience
          </label>

          <input
            id="experience"
            name="experience"
            type="text"
            placeholder="e.g. 5 years"
            className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        {/* Resume */}
        <div className="sm:col-span-2">
          <label
            htmlFor="resume"
            className="mb-2 block text-sm font-medium text-slate-800"
          >
            Resume / CV *
          </label>

          <input
            id="resume"
            name="resume"
            type="file"
            required
            accept=".pdf,.doc,.docx"
            className="block w-full rounded-xl border border-slate-200 bg-white text-sm file:mr-4 file:border-0 file:bg-slate-100 file:px-4 file:py-3 file:text-sm file:font-medium"
          />

          <p className="mt-2 text-xs text-slate-500">
            Upload your latest resume in PDF, DOC, or DOCX format.
          </p>
        </div>

        {/* Message */}
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-medium text-slate-800"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Write a short message..."
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        {/* Security Information */}
        <div className="sm:col-span-2 flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Secure application
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Your application details are securely sent to the FOSTIIMA
                recruitment team.
              </p>
            </div>
          </div>

          <div className="text-xs font-medium text-slate-500">
            Application Form
          </div>
        </div>

        {/* Submit */}
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={submissionState === "submitting"}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#c31e3b] px-6 text-sm font-semibold text-white transition hover:bg-[#a91832] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {submissionState === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending Application...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}