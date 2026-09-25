"use client";

import { FormEvent, useState } from "react";
import {
  CheckCircle2,
  Mail,
  MessageSquare,
  Phone,
  RefreshCw,
  Send,
} from "lucide-react";

const generateCode = () => {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";

  let code = "";

  for (let index = 0; index < 4; index += 1) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return code;
};

type SubmissionState = "idle" | "submitting" | "success" | "error";

type FormError = {
  field: string;
  message: string;
} | null;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [captchaCode, setCaptchaCode] = useState("F7Km");
  const [enteredCode, setEnteredCode] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");

  const [errorMessage, setErrorMessage] = useState("");
  const [formError, setFormError] = useState<FormError>(null);

  const refreshCaptcha = () => {
    setCaptchaCode(generateCode());
    setEnteredCode("");
    setCaptchaError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const subject = String(formData.get("subject") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const code = enteredCode.trim().toUpperCase();

    setFormError(null);
    setCaptchaError("");
    setErrorMessage("");
    setSubmitted(false);

    // Full Name validation
    if (!name) {
      setFormError({
        field: "name",
        message: "Please enter your full name.",
      });
      return;
    }

    if (name.length < 2) {
      setFormError({
        field: "name",
        message: "Please enter a valid full name.",
      });
      return;
    }

    // Email validation
    if (!email) {
      setFormError({
        field: "email",
        message: "Please enter your email address.",
      });
      return;
    }

    if (!isValidEmail(email)) {
      setFormError({
        field: "email",
        message: "Please enter a valid email address.",
      });
      return;
    }

    // Phone validation
    if (!phone) {
      setFormError({
        field: "phone",
        message: "Please enter your phone number.",
      });
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setFormError({
        field: "phone",
        message: "Please enter a valid 10-digit phone number.",
      });
      return;
    }

    // CAPTCHA validation
    if (!code) {
      setFormError({
        field: "captcha",
        message: "Please enter the verification code.",
      });

      setCaptchaError("Please enter the code shown above.");
      return;
    }

    if (code !== captchaCode.toUpperCase()) {
      setFormError({
        field: "captcha",
        message: "The verification code is incorrect. Please try again.",
      });

      setCaptchaError("Incorrect code. Please enter the code shown above.");

      refreshCaptcha();
      return;
    }

    // Subject validation
    if (!subject) {
      setFormError({
        field: "subject",
        message: "Please enter a subject for your enquiry.",
      });
      return;
    }

    if (subject.length < 3) {
      setFormError({
        field: "subject",
        message: "Please enter a meaningful subject.",
      });
      return;
    }

    // Message validation
    if (!message) {
      setFormError({
        field: "message",
        message: "Please enter your message.",
      });
      return;
    }

    if (message.length < 10) {
      setFormError({
        field: "message",
        message: "Please enter a message of at least 10 characters.",
      });
      return;
    }

    setSubmissionState("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject,
          message,
        }),
      });

      const responseText = await response.text();

      let data: unknown = null;

      if (responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            "The server returned an invalid response. Please try again.",
          );
        }
      }

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
            : `Unable to send your enquiry. Server returned status ${response.status}.`;

        throw new Error(message);
      }

      setSubmissionState("success");
      setSubmitted(true);

      form.reset();
      setEnteredCode("");
      refreshCaptcha();
    } catch (error) {
      console.error("Contact enquiry submission failed:", error);

      setSubmissionState("error");

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your enquiry right now.",
      );
    }
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

      {/* Validation Error */}
      {formError && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 flex items-start gap-3 border border-red-200 bg-red-50 p-4"
        >
          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c31e3b] text-md font-bold text-white">
            !
          </div>

          <div>
            <p className="text-sm font-semibold text-red-800">
              Please check your information
            </p>

            <p className="mt-1 text-md leading-5 text-red-700">
              {formError.message}
            </p>
          </div>
        </div>
      )}

      {/* Success Message */}
      {submitted && (
        <div
          role="status"
          aria-live="polite"
          className="mb-6 flex items-start gap-3 border border-green-200 bg-green-50 p-4"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />

          <div>
            <p className="text-sm font-semibold text-green-800">
              Your enquiry has been sent successfully.
            </p>

            <p className="mt-1 text-md leading-5 text-green-700">
              Thank you for contacting FOSTIIMA Business School. Our team will
              get back to you shortly.
            </p>
          </div>
        </div>
      )}

      {/* Server Error */}
      {submissionState === "error" && (
        <div
          role="alert"
          aria-live="assertive"
          className="mb-6 border border-red-200 bg-red-50 p-4"
        >
          <p className="text-sm font-semibold text-red-800">
            We could not send your enquiry.
          </p>

          <p className="mt-1 text-md leading-5 text-red-700">{errorMessage}</p>
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

            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter your full name"
              className="w-full border border-[#dbe3ee] bg-white px-4 py-3 text-sm text-[#061a3a] outline-none transition placeholder:text-slate-400 focus:border-[#c31e3b] focus:ring-1 focus:ring-[#c31e3b]"
            />
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

          <div className="relative">
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
        </div>

        {/* CAPTCHA */}
        <div>
          <label
            htmlFor="verificationCode"
            className="mb-2 block text-sm font-semibold text-[#061a3a]"
          >
            Enter Code <span className="text-[#c31e3b]">*</span>
          </label>

          <div className="flex flex-wrap items-center gap-2">
            <input
              id="verificationCode"
              name="verificationCode"
              type="text"
              required
              autoComplete="off"
              maxLength={4}
              value={enteredCode}
              onChange={(event) => {
                setEnteredCode(
                  event.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 4),
                );

                setCaptchaError("");
                setFormError(null);
              }}
              placeholder="Enter Code"
              className="min-w-0 flex-1 border border-[#dbe3ee] bg-white px-4 py-3 text-sm tracking-[0.18em] text-[#061a3a] outline-none transition placeholder:tracking-normal placeholder:text-slate-400 focus:border-[#c31e3b] focus:ring-1 focus:ring-[#c31e3b] sm:max-w-[180px]"
            />

            <div
              aria-label="Verification code"
              className="flex h-[46px] min-w-[92px] select-none items-center justify-center border border-[#dbe3ee] bg-[#f8fafc] px-4"
            >
              <span className="font-mono text-lg font-bold italic tracking-[0.2em] text-[#061a3a]">
                {captchaCode}
              </span>
            </div>

            <button
              type="button"
              onClick={refreshCaptcha}
              aria-label="Refresh verification code"
              title="Refresh code"
              className="flex h-[46px] w-[46px] shrink-0 items-center justify-center border border-[#dbe3ee] bg-white text-[#061a3a] transition hover:border-[#c31e3b] hover:text-[#c31e3b]"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>

          {captchaError && (
            <p className="mt-2 text-md font-medium text-[#c31e3b]">
              {captchaError}
            </p>
          )}
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
            disabled={submissionState === "submitting"}
            className="inline-flex w-full items-center justify-center gap-2 bg-[#061a3a] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0b2855] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {submissionState === "submitting" ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Sending Enquiry...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Enquiry
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
