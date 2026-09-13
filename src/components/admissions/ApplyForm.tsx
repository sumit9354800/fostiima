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
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitted(false);

    try {
      // API integration yahan baad mein add karenge.
      // Abhi sirf UI/form flow test kar rahe hain.
      await new Promise((resolve) => setTimeout(resolve, 800));

      console.log("Application:", formData);

      setSubmitted(true);
      setFormData(initialFormData);
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
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
        />
      </div>

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
        disabled={isSubmitting}
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