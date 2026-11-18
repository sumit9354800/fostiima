"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { INDIAN_STATES } from "@/data/indian-states";
import { normalizeIndianMobile } from "@/lib/phone";
import { isConfirmedLeadResponse, pushLeadEvent } from "@/lib/lead-events";
import { createSubmissionGuard } from "@/lib/submission-guard";
import TurnstileWidget, {
  TURNSTILE_SITE_KEY,
  type TurnstileHandle,
} from "@/components/forms/TurnstileWidget";
import { captureAttribution, thankYouPath } from "@/lib/lead-attribution";
import {
  GRADUATION_STATUS_OPTIONS,
  QUALIFYING_EXAM_LABEL,
  QUALIFYING_EXAM_OPTIONS,
} from "@/lib/admission-form-options";

// Simple visual CAPTCHA. For strong bot protection, also validate a server-side
// CAPTCHA token (for example, Cloudflare Turnstile) inside the API route.
function generateCaptcha(length = 5) {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)],
  ).join("");
}

// normalizeIndianMobile now lives in src/lib/phone.ts (shared with the API).

/*
// SHA-256 hash in lowercase hex for Google Enhanced Conversions.
// Temporarily on hold pending client/legal privacy policy approval.
async function sha256Hex(value: string): Promise<string> {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return "";
  try {
    if (typeof window !== "undefined" && window.crypto?.subtle) {
      const msgBuffer = new TextEncoder().encode(normalized);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    }
  } catch {
    // Fallback if subtle crypto is unavailable
  }
  return "";
}
*/

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#123B79] focus:ring-2 focus:ring-[#123B79]/10 disabled:cursor-not-allowed disabled:bg-slate-100";

const labelClass = "mb-1.5 block text-xs font-semibold text-slate-700";

type FormValues = {
  fullName: string;
  mobile: string;
  email: string;
  state: string;
  course: string;
  graduationStatus: string;
  qualifyingExam: string;
  remarks: string;
  consent: boolean;
};

const initialValues: FormValues = {
  fullName: "",
  mobile: "",
  email: "",
  state: "",
  course: "PGDM",
  graduationStatus: "",
  qualifyingExam: "",
  remarks: "",
  consent: false,
};

export default function AdmissionEnquiryForm() {
  const router = useRouter();
  const [values, setValues] = useState<FormValues>(initialValues);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  // Empty on the server and in the first client render, so the hydrated HTML
  // matches; the code is generated in the browser after mount (below).
  // Generating it during render gave the server and the browser different
  // random codes (React hydration error #418).
  const [captchaCode, setCaptchaCode] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  // Synchronous in-flight guard: `loading` state only blocks a second submit
  // after a re-render, so two fast clicks could both get through.
  const [submissionGuard] = useState(createSubmissionGuard);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

  // Browser-only random value: set once after hydration.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCaptchaCode(generateCaptcha());
  }, []);

  // States are local, so they are available immediately.
  const states: readonly string[] = INDIAN_STATES;

  function updateField<K extends keyof FormValues>(
    key: K,
    value: FormValues[K],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionGuard.isLocked()) return;
    setMessage("");
    setSuccess(false);

    const cleanedMobile = normalizeIndianMobile(values.mobile);

    if (!cleanedMobile) {
      setMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Not generated yet (before hydration finishes): never compare against an
    // empty code, which an empty input would otherwise match.
    if (!captchaCode) {
      setMessage("The verification code is still loading. Please try again.");
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setMessage("The verification code is incorrect. Please try again.");
      setCaptchaInput("");
      setCaptchaCode(generateCaptcha());
      return;
    }

    if (!values.consent) {
      setMessage("Please accept the communication consent to continue.");
      return;
    }

    if (!values.state) {
      setMessage("Please select your state.");
      return;
    }

    if (!values.graduationStatus) {
      setMessage("Please select your graduation status.");
      return;
    }

    if (!values.qualifyingExam) {
      setMessage("Please select whether you have qualified CAT, MAT or XAT.");
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setMessage("Please complete the verification check.");
      return;
    }

    if (!submissionGuard.tryAcquire()) return;
    let submitted = false;
    setLoading(true);

    // Read at submit time (not on mount), so a campaign captured on any
    // earlier page or after client-side navigation is always included. Raw
    // values only: the API validates them and derives the lead source.
    const attribution = captureAttribution();

    try {
      const response = await fetch("/api/admission-enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          mobile: cleanedMobile,
          ...(attribution ? { attribution } : {}),
          ...(TURNSTILE_SITE_KEY ? { turnstileToken } : {}),
        }),
      });

      const result = await response.json().catch(() => ({}));

      // Only a confirmed lead counts: anything else stays on the form with
      // an error and never reaches the Thank You page or GTM.
      if (!isConfirmedLeadResponse(response.ok, result)) {
        throw new Error(
          result.error || "Unable to submit your enquiry. Please try again.",
        );
      }

      // Stay locked after success: the form is navigating to /thank-you.
      submitted = true;
      setValues(initialValues);
      setCaptchaInput("");
      setCaptchaCode(generateCaptcha());

      // One GTM lead event, only after the API confirmed the lead was saved.
      // No personal data: no email, phone, name or attribution (see
      // src/lib/lead-events.ts). Never throws, so navigation is not blocked.
      pushLeadEvent(window, "admission");

      if (typeof (
        window as Window & {
          gtag?: (
            command: string,
            eventName: string,
            parameters?: Record<string, string | number>
          ) => void;
        }
      ).gtag === "function") {
        (
          window as Window & {
            gtag?: (
              command: string,
              eventName: string,
              parameters?: Record<string, string | number>
            ) => void;
          }
        ).gtag("event", "conversion", {
          send_to: "AW-18383056369/QQL4CJKM644dEPHb3L1E",
          value: 1,
          currency: "INR",
        });
      }

      // Client requirement (Thank You DataLayer): the submitted email and
      // phone, pushed once after the API confirmed the enquiry, immediately
      // before navigating to /thank-you. Values are the ones sent to the API.
      const submittedEmail = values.email;
      const submittedPhone = cleanedMobile;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        email: submittedEmail,
        phone: submittedPhone,
      });

      // Common Thank You page; carries the UTM parameters only.
      router.push(thankYouPath(attribution));
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
      if (!submitted) {
        submissionGuard.release();
        // A Turnstile token is single-use: get a fresh one for the retry.
        turnstileRef.current?.reset();
      }
    }
  }

  return (
    <div className="w-full rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_20px_60px_rgba(3,25,60,0.14)] sm:p-7">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF0F3] text-[#C31E3B]">
          <ShieldCheck size={22} />
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#C31E3B]">
            Admissions Open
          </p>
          <h2 className="mt-1 text-xl font-extrabold tracking-tight text-[#123B79] sm:text-2xl">
            Apply for PGDM
          </h2>
          <p className="mt-1.5 text-sm leading-5 text-slate-500">
            Share your details and our admissions team will contact you.
          </p>
        </div>
      </div>

      <div className="mb-5 h-1 w-full overflow-hidden rounded-full bg-slate-100">
        <div className="h-full w-1/3 rounded-full bg-[#E9C94B]" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className={labelClass} htmlFor="admission-full-name">
            Full Name <span className="text-[#C31E3B]">*</span>
          </label>
          <input
            id="admission-full-name"
            name="fullName"
            autoComplete="name"
            className={inputClass}
            placeholder="Enter your full name"
            value={values.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            maxLength={100}
            required
            disabled={loading}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="admission-mobile">
              Mobile Number <span className="text-[#C31E3B]">*</span>
            </label>
            <div className="flex overflow-hidden rounded-lg border border-slate-200 focus-within:border-[#123B79] focus-within:ring-2 focus-within:ring-[#123B79]/10">
              <span className="flex items-center border-r border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-600">
                🇮🇳 +91
              </span>
              <input
                id="admission-mobile"
                name="mobile"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                className="min-w-0 w-full bg-white px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                placeholder="10-digit mobile"
                value={values.mobile}
                onChange={(event) => {
                  const raw = event.target.value;
                  const digits = raw.replace(/\D/g, "");
                  // If user pasted 12 digits starting with 91, extract the 10-digit subscriber number
                  if (digits.length === 12 && digits.startsWith("91")) {
                    updateField("mobile", digits.slice(2));
                    return;
                  }
                  // Otherwise retain entered digits up to 15 (preventing silent truncation of invalid lengths)
                  updateField("mobile", digits.slice(0, 15));
                }}
                maxLength={20}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="admission-email">
              Email Address <span className="text-[#C31E3B]">*</span>
            </label>
            <input
              id="admission-email"
              name="email"
              type="email"
              autoComplete="email"
              className={inputClass}
              placeholder="you@example.com"
              value={values.email}
              onChange={(event) => updateField("email", event.target.value)}
              maxLength={254}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="admission-state">
              State <span className="text-[#C31E3B]">*</span>
            </label>
            <select
              id="admission-state"
              name="state"
              className={inputClass}
              value={values.state}
              onChange={(event) => updateField("state", event.target.value)}
              required
              disabled={loading}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="admission-course">
              Interested Course <span className="text-[#C31E3B]">*</span>
            </label>
            <select
              id="admission-course"
              name="course"
              className={inputClass}
              value={values.course}
              onChange={(event) => updateField("course", event.target.value)}
              required
              disabled={loading}
            >
              <option value="PGDM">PGDM</option>
            </select>
          </div>
        </div>

        {/* items-end keeps both selects aligned if a label wraps. */}
        <div className="grid gap-3 sm:grid-cols-2 sm:items-end">
          <div>
            <label
              className={labelClass}
              htmlFor="admission-graduation-status"
            >
              Graduation Status <span className="text-[#C31E3B]">*</span>
            </label>
            <select
              id="admission-graduation-status"
              name="graduationStatus"
              className={inputClass}
              value={values.graduationStatus}
              onChange={(event) =>
                updateField("graduationStatus", event.target.value)
              }
              required
              disabled={loading}
            >
              <option value="">Select Graduation Status</option>
              {GRADUATION_STATUS_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              className={labelClass}
              htmlFor="admission-qualifying-exam"
            >
              {QUALIFYING_EXAM_LABEL} <span className="text-[#C31E3B]">*</span>
            </label>
            <select
              id="admission-qualifying-exam"
              name="qualifyingExam"
              className={inputClass}
              value={values.qualifyingExam}
              onChange={(event) =>
                updateField("qualifyingExam", event.target.value)
              }
              required
              disabled={loading}
            >
              <option value="">Select an option</option>
              {QUALIFYING_EXAM_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="admission-remarks">
            Remarks{" "}
            <span className="font-normal text-slate-400">(Optional)</span>
          </label>
          <textarea
            id="admission-remarks"
            name="remarks"
            className={`${inputClass} min-h-20 resize-y`}
            placeholder="Any questions for our admissions team?"
            value={values.remarks}
            onChange={(event) => updateField("remarks", event.target.value)}
            maxLength={1000}
            rows={3}
            disabled={loading}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="admission-captcha">
            Enter Code <span className="text-[#C31E3B]">*</span>
          </label>

          <div className="grid grid-cols-[1fr_1fr_auto] items-stretch gap-2">
            <div
              aria-label={
                captchaCode
                  ? `Verification code: ${captchaCode}`
                  : "Verification code loading"
              }
              className="flex min-h-11 select-none items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 font-mono text-lg font-extrabold tracking-[0.3em] text-[#123B79]"
            >
              {captchaCode || "·····"}
            </div>

            <input
              id="admission-captcha"
              name="captcha"
              type="text"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              className={inputClass}
              placeholder="Enter code"
              value={captchaInput}
              onChange={(event) =>
                setCaptchaInput(
                  event.target.value.replace(/[^a-zA-Z0-9]/g, "").slice(0, 5),
                )
              }
              maxLength={5}
              required
              disabled={loading}
              aria-describedby="admission-captcha-help"
            />

            <button
              type="button"
              onClick={() => {
                setCaptchaCode(generateCaptcha());
                setCaptchaInput("");
                setMessage("");
                setSuccess(false);
              }}
              disabled={loading}
              className="flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 transition hover:border-[#C31E3B] hover:text-[#C31E3B] disabled:opacity-60"
              aria-label="Generate a new verification code"
              title="Refresh verification code"
            >
              <RefreshCw size={15} />
            </button>
          </div>
          <p
            id="admission-captcha-help"
            className="mt-1.5 text-xs text-slate-500"
          >
            Type the 5-character code shown. Use refresh if it is difficult to
            read.
          </p>
        </div>

        <TurnstileWidget
          ref={turnstileRef}
          action="admission_enquiry"
          onToken={setTurnstileToken}
        />

        <label className="flex cursor-pointer items-start gap-2.5 pt-1">
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(event) => updateField("consent", event.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#C31E3B]"
            required
            disabled={loading}
          />
          <span className="text-xs leading-5 text-slate-500">
            I agree to be contacted by FOSTIIMA Business School via phone, SMS,
            WhatsApp or email regarding my enquiry.
          </span>
        </label>

        {message && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-lg border px-3.5 py-3 text-sm leading-5 ${
              success
                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#C31E3B] px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-[#C31E3B]/15 transition hover:bg-[#A91731] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C31E3B] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              Submitting Enquiry...
            </>
          ) : success ? (
            <>
              <CheckCircle2 size={18} />
              Submitted Successfully
            </>
          ) : (
            <>
              Submit Enquiry
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </>
          )}
        </button>

        <p className="text-center text-[11px] leading-5 text-slate-400">
          Your details will only be used to respond to your admission enquiry.{" "}
          <Link
            href="/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-600"
          >
            Privacy Policy
          </Link>
        </p>
      </form>
    </div>
  );
}
