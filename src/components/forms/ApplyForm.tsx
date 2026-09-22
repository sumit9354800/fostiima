"use client";

import { FormEvent } from "react";

export default function ApplyForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Full Name
        </label>

        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          autoComplete="name"
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email Address
        </label>

        <div className="flex gap-2">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
          />

          <button
            type="button"
            className="shrink-0 rounded-lg bg-[#123b79] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#0d2e60] sm:px-5 sm:text-sm"
          >
            SEND OTP
          </button>
        </div>
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Phone Number
        </label>

        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Enter your phone number"
          autoComplete="tel"
          inputMode="numeric"
          maxLength={10}
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
        />
      </div>

      {/* OTP */}
      <div>
        <label
          htmlFor="otp"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Enter Email OTP
        </label>

        <div className="flex gap-2">
          <input
            id="otp"
            name="otp"
            type="text"
            placeholder="Enter 6-digit OTP"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm tracking-[0.25em] text-slate-900 outline-none transition placeholder:tracking-normal placeholder:text-slate-400 focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
          />

          <button
            type="button"
            className="shrink-0 rounded-lg border border-[#123b79] px-4 py-3 text-xs font-semibold text-[#123b79] transition hover:bg-[#123b79] hover:text-white sm:px-5 sm:text-sm"
          >
            VERIFY
          </button>
        </div>
      </div>

      {/* State + District */}
      <div className="grid grid-cols-2 gap-2">
        {/* State */}
        <div>
          <label
            htmlFor="state"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            State
          </label>

          <select
            id="state"
            name="state"
            defaultValue=""
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
          >
            <option value="">Select State</option>
          </select>
        </div>

        {/* District */}
        <div>
          <label
            htmlFor="district"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            District
          </label>

          <select
            id="district"
            name="district"
            defaultValue=""
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
          >
            <option value="">Select District</option>
          </select>
        </div>
      </div>

      {/* Programme */}
      <div>
        <label
          htmlFor="programme"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Programme
        </label>

        <select
          id="programme"
          name="programme"
          defaultValue=""
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
        >
          <option value="">Select programme</option>
          <option value="PGDM">PGDM</option>
          <option value="MBA">MBA</option>
        </select>
      </div>

      {/* Consent */}
      <label className="flex items-start gap-2">
        <input
          type="checkbox"
          name="consent"
          className="mt-1 h-4 w-4 shrink-0 accent-[#123b79]"
        />

        <span className="text-xs leading-5 text-slate-500">
          I agree to receive information regarding my submitted application via
          Call/SMS/WhatsApp by signing up on FOSTIIMA Business School.
        </span>
      </label>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-lg bg-[#c31e3b] px-5 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[#a91731] focus:outline-none focus:ring-2 focus:ring-[#c31e3b]/30 focus:ring-offset-2"
      >
        SUBMIT APPLICATION
      </button>

      <p className="text-center text-xs leading-relaxed text-slate-400">
        By submitting this form, you agree to be contacted by FOSTIIMA
        Business School regarding admissions.
      </p>
    </form>
  );
}