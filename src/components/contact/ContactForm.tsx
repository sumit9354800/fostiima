"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Mail, MessageSquare, Phone, Send } from "lucide-react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !phone || !subject || !message) {
      return;
    }

    const mailSubject = encodeURIComponent(
      subject || "New Contact Enquiry - FOSTIIMA Business School",
    );

    const mailBody = encodeURIComponent(
      `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n\n` +
        `Message:\n${message}`,
    );

    window.location.href = `mailto:admissions@fostiima.org?subject=${mailSubject}&body=${mailBody}`;

    setSubmitted(true);
    form.reset();
  };

  return (
    <div className="border border-[#dbe3ee] bg-white p-6 shadow-[0_16px_50px_rgba(6,26,58,0.08)] sm:p-8">
      {/* Header */}
      <div className="mb-7">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#c31e3b]">
          Send An Enquiry
        </p>

        <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em] text-[#061a3a] sm:text-3xl">
          Get In Touch With Us
        </h2>

        <div className="mt-4 h-1 w-12 bg-[#e5b83f]" />

        <p className="mt-4 text-sm leading-7 text-slate-600">
          Have a question about admissions or our programmes? Send us your
          enquiry and our team will get back to you.
        </p>
      </div>

      {/* Success Message */}
      {submitted && (
        <div className="mb-6 flex items-start gap-3 border border-green-200 bg-green-50 p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

          <div>
            <p className="text-sm font-semibold text-green-800">
              Your enquiry has been prepared successfully.
            </p>

            <p className="mt-1 text-xs leading-5 text-green-700">
              Your email application should open through your mail application.
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name + Email */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-[#061a3a]"
            >
              Full Name <span className="text-[#c31e3b]">*</span>
            </label>

            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Enter your full name"
                className="w-full border border-[#dbe3ee] bg-white px-4 py-3 text-sm text-[#061a3a] outline-none transition placeholder:text-slate-400 focus:border-[#c31e3b] focus:ring-1 focus:ring-[#c31e3b]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-[#061a3a]"
            >
              Email Address <span className="text-[#c31e3b]">*</span>
            </label>

            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email"
                className="w-full border border-[#dbe3ee] bg-white py-3 pl-10 pr-4 text-sm text-[#061a3a] outline-none transition placeholder:text-slate-400 focus:border-[#c31e3b] focus:ring-1 focus:ring-[#c31e3b]"
              />
            </div>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-semibold text-[#061a3a]"
          >
            Phone Number <span className="text-[#c31e3b]">*</span>
          </label>

          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                id="phone"
                name="phone"
                type="tel"
                required
                inputMode="numeric"
                maxLength={10}
                placeholder="Enter 10-digit phone number"
                className="w-full border border-[#dbe3ee] bg-white py-3 pl-10 pr-4 text-sm text-[#061a3a] outline-none transition placeholder:text-slate-400 focus:border-[#c31e3b] focus:ring-1 focus:ring-[#c31e3b]"
              />
            </div>

            <button
              type="button"
              className="w-full shrink-0 border border-[#c31e3b] bg-[#c31e3b] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a91832] sm:w-auto"
            >
              Send OTP
            </button>
          </div>
        </div>

        {/* OTP */}
        <div>
          <label
            htmlFor="otp"
            className="mb-2 block text-sm font-semibold text-[#061a3a]"
          >
            Enter OTP
          </label>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              id="otp"
              name="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              className="w-full border border-[#dbe3ee] bg-white px-4 py-3 text-sm tracking-[0.25em] text-[#061a3a] outline-none transition placeholder:tracking-normal placeholder:text-slate-400 focus:border-[#c31e3b] focus:ring-1 focus:ring-[#c31e3b]"
            />

            <button
              type="button"
              className="w-full shrink-0 border border-[#061a3a] px-5 py-3 text-sm font-semibold text-[#061a3a] transition hover:bg-[#061a3a] hover:text-white sm:w-auto"
            >
              Verify OTP
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            OTP verification will be activated when the backend is connected.
          </p>
        </div>

        {/* Subject */}
        <div>
          <label
            htmlFor="subject"
            className="mb-2 block text-sm font-semibold text-[#061a3a]"
          >
            Subject <span className="text-[#c31e3b]">*</span>
          </label>

          <input
            id="subject"
            name="subject"
            type="text"
            required
            placeholder="What would you like to know?"
            className="w-full border border-[#dbe3ee] bg-white px-4 py-3 text-sm text-[#061a3a] outline-none transition placeholder:text-slate-400 focus:border-[#c31e3b] focus:ring-1 focus:ring-[#c31e3b]"
          />
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="mb-2 block text-sm font-semibold text-[#061a3a]"
          >
            Message <span className="text-[#c31e3b]">*</span>
          </label>

          <div className="relative">
            <MessageSquare className="pointer-events-none absolute left-3 top-4 h-4 w-4 text-slate-400" />

            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="Write your message here..."
              className="w-full resize-none border border-[#dbe3ee] bg-white py-3 pl-10 pr-4 text-sm leading-6 text-[#061a3a] outline-none transition placeholder:text-slate-400 focus:border-[#c31e3b] focus:ring-1 focus:ring-[#c31e3b]"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 bg-[#061a3a] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0b2855] sm:w-auto"
          >
            <Send className="h-4 w-4" />
            Send Enquiry
          </button>
        </div>
      </form>
    </div>
  );
}
