"use client";

import { FormEvent, useState } from "react";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  graduationYear: string;
  programme: string;
  message: string;
};

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  graduationYear: "",
  programme: "",
  message: "",
};

export default function ApplyForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (name === "phone") {
      setOtpSent(false);
      setIsPhoneVerified(false);
      setOtp("");
    }
  }

  async function handleSendOtp() {
    if (!formData.phone.trim()) {
      return;
    }

    setIsSendingOtp(true);

    try {
      // OTP API integration yahan backend ke time add karenge.
      await new Promise((resolve) => setTimeout(resolve, 800));

      setOtpSent(true);
      setIsPhoneVerified(false);
    } catch (error) {
      console.error("OTP request failed:", error);
    } finally {
      setIsSendingOtp(false);
    }
  }

  async function handleVerifyOtp() {
    if (!otp.trim()) {
      return;
    }

    try {
      // OTP verification API yahan backend ke time add karenge.
      await new Promise((resolve) => setTimeout(resolve, 500));

      setIsPhoneVerified(true);
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isPhoneVerified) {
      return;
    }

    setIsSubmitting(true);
    setSubmitted(false);

    try {
      // API integration yahan baad mein add karenge.
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log("Application:", {
        ...formData,
        phoneVerified: isPhoneVerified,
      });

      setSubmitted(true);
      setFormData(initialFormData);
      setOtp("");
      setOtpSent(false);
      setIsPhoneVerified(false);
    } catch (error) {
      console.error("Application submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
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
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
          required
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

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          autoComplete="email"
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Phone Number
        </label>

        <div className="flex gap-2">
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
            autoComplete="tel"
            inputMode="tel"
            disabled={isPhoneVerified}
            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10 disabled:bg-slate-50 disabled:text-slate-500"
          />

          <button
            type="button"
            onClick={handleSendOtp}
            disabled={
              !formData.phone.trim() ||
              isSendingOtp ||
              isPhoneVerified
            }
            className="shrink-0 rounded-lg bg-[#123b79] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#0d2e60] disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:text-sm"
          >
            {isPhoneVerified
              ? "VERIFIED"
              : isSendingOtp
                ? "SENDING..."
                : otpSent
                  ? "RESEND OTP"
                  : "SEND OTP"}
          </button>
        </div>
      </div>

      {/* OTP */}
      {otpSent && !isPhoneVerified && (
        <div>
          <label
            htmlFor="otp"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Enter OTP
          </label>

          <div className="flex gap-2">
            <input
              id="otp"
              name="otp"
              type="text"
              value={otp}
              onChange={(event) =>
                setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="Enter 6-digit OTP"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm tracking-[0.25em] text-slate-900 outline-none transition placeholder:text-slate-400 placeholder:tracking-normal focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
            />

            <button
              type="button"
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6}
              className="shrink-0 rounded-lg border border-[#123b79] px-4 py-3 text-xs font-semibold text-[#123b79] transition hover:bg-[#123b79] hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:text-sm"
            >
              VERIFY
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            OTP verification is currently in development and will be
            connected to the backend later.
          </p>
        </div>
      )}

      {/* Verified Status */}
      {isPhoneVerified && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          Phone number verified successfully.
        </div>
      )}

      {/* Graduation Year */}
      <div>
        <label
          htmlFor="graduationYear"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Graduation Year
        </label>

        <select
          id="graduationYear"
          name="graduationYear"
          value={formData.graduationYear}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
        >
          <option value="">Select graduation year</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
          <option value="2028">2028</option>
        </select>
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
          value={formData.programme}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
        >
          <option value="">Select programme</option>
          <option value="PGDM">PGDM</option>
          <option value="MBA">MBA</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Message{" "}
          <span className="font-normal text-slate-400">(Optional)</span>
        </label>

        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us anything you would like to know..."
          rows={4}
          className="w-full resize-none rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
        />
      </div>

      {/* Success */}
      {submitted && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          Your application has been submitted successfully.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || !isPhoneVerified}
        className="w-full rounded-lg bg-[#c31e3b] px-5 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[#a91731] focus:outline-none focus:ring-2 focus:ring-[#c31e3b]/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
      </button>

      <p className="text-center text-xs leading-relaxed text-slate-400">
        By submitting this form, you agree to be contacted by FOSTIIMA
        Business School regarding admissions.
      </p>
    </form>
  );
}