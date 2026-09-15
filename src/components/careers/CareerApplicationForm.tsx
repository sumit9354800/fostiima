"use client";

import { useState } from "react";
import { FileText, LockKeyhole, Send, ShieldCheck } from "lucide-react";
import { careerPositions } from "@/data/careers";

export default function CareerApplicationForm() {
  const [otpRequested, setOtpRequested] = useState(false);

  function handleOtpRequest() {
    setOtpRequested(true);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
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
          Phone verification will be enabled when the application backend is
          implemented.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-5 sm:grid-cols-2"
      >
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

        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-medium text-slate-800"
          >
            Phone Number *
          </label>

          <div className="flex gap-2">
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              inputMode="numeric"
              autoComplete="tel"
              placeholder="Enter phone number"
              className="h-12 min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
            />

            <button
              type="button"
              onClick={handleOtpRequest}
              className="h-12 shrink-0 rounded-xl border border-blue-200 bg-blue-50 px-4 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              Send OTP
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            OTP verification will be enabled with the backend.
          </p>
        </div>

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

        {otpRequested && (
          <div className="sm:col-span-2">
            <label
              htmlFor="otp"
              className="mb-2 block text-sm font-medium text-slate-800"
            >
              OTP *
            </label>

            <div className="flex items-center gap-3">
              <input
                id="otp"
                name="otp"
                type="text"
                inputMode="numeric"
                maxLength={6}
                placeholder="Enter OTP"
                className="h-12 w-full max-w-xs rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />

              <span className="text-xs text-amber-600">
                Verification pending
              </span>
            </div>
          </div>
        )}

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
        </div>

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

        <div className="sm:col-span-2 flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Secure application
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Phone OTP verification will be connected during backend
                implementation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            Backend pending
          </div>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#c31e3b] px-6 text-sm font-semibold text-white transition hover:bg-[#a91832] sm:w-auto"
          >
            <Send className="h-4 w-4" />
            Submit Application
          </button>
        </div>
      </form>
    </section>
  );
}