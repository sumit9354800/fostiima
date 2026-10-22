
/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { INDIAN_STATES } from "@/data/indian-states";

const API_BASE = "https://countriesnow.space/api/v0.1";

// Cache city lists so revisiting a state does not require another request.
const cityCache = new Map<string, string[]>();

// Simple visual CAPTCHA. For strong bot protection, also validate a server-side
// CAPTCHA token (for example, Cloudflare Turnstile) inside the API route.
function generateCaptcha(length = 5) {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)],
  ).join("");
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#123B79] focus:ring-2 focus:ring-[#123B79]/10 disabled:cursor-not-allowed disabled:bg-slate-100";

const labelClass = "mb-1.5 block text-xs font-semibold text-slate-700";

type FormValues = {
  fullName: string;
  mobile: string;
  email: string;
  state: string;
  city: string;
  course: string;
  remarks: string;
  consent: boolean;
};

type ApiResponse<T> = {
  error: boolean;
  msg: string;
  data: T;
};

const initialValues: FormValues = {
  fullName: "",
  mobile: "",
  email: "",
  state: "",
  city: "",
  course: "PGDM",
  remarks: "",
  consent: false,
};

export default function AdmissionEnquiryForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [cities, setCities] = useState<string[]>([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [cityRetryKey, setCityRetryKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [captchaCode, setCaptchaCode] = useState(() => generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");

  // States are local, so they are available immediately.
  const states: readonly string[] = INDIAN_STATES;

  useEffect(() => {
    const selectedState = values.state;

    if (!selectedState) {
      setCities([]);
      setCitiesLoading(false);
      return;
    }

    const cachedCities = cityCache.get(selectedState);

    if (cachedCities) {
      setCities(cachedCities);
      setCitiesLoading(false);
      setLocationError("");
      return;
    }

    const controller = new AbortController();

    async function loadCities() {
      setCities([]);
      setCitiesLoading(true);
      setLocationError("");

      try {
        const response = await fetch(
          `${API_BASE}/countries/state/cities`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              country: "India",
              state: selectedState,
            }),
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error("Unable to load cities.");
        }

        const result: ApiResponse<string[]> = await response.json();

        if (result.error || !Array.isArray(result.data)) {
          throw new Error("City data is currently unavailable.");
        }

        const uniqueCities = [
          ...new Set(
            result.data.filter(
              (city): city is string =>
                typeof city === "string" && city.trim().length > 0,
            ),
          ),
        ].sort((a, b) => a.localeCompare(b));

        cityCache.set(selectedState, uniqueCities);
        setCities(uniqueCities);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        setLocationError(
          "Cities could not be loaded. Please retry or choose Other.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setCitiesLoading(false);
        }
      }
    }

    loadCities();

    return () => controller.abort();
  }, [values.state, cityRetryKey]);

  function updateField<K extends keyof FormValues>(
    key: K,
    value: FormValues[K],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function retryCities() {
    if (!values.state) return;

    cityCache.delete(values.state);
    setLocationError("");
    setCityRetryKey((current) => current + 1);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setSuccess(false);

    const cleanedMobile = values.mobile.replace(/\D/g, "");

    if (cleanedMobile.length !== 10) {
      setMessage("Please enter a valid 10-digit mobile number.");
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

    if (!values.state || !values.city) {
      setMessage("Please select your state and city.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/admission-enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          mobile: cleanedMobile,
          source: "FOSTIIMA Website",
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error ||
            "Unable to submit your enquiry. Please try again.",
        );
      }

      setSuccess(true);
      setMessage(
        result.message ||
          "Thank you! Your enquiry has been submitted successfully.",
      );
      setValues(initialValues);
      setCities([]);
      setLocationError("");
      setCaptchaInput("");
      setCaptchaCode(generateCaptcha());

      const gtag = (
        window as Window & {
          gtag?: (
            command: string,
            eventName: string,
            parameters?: Record<string, string | number>,
          ) => void;
        }
      ).gtag;

      if (typeof gtag === "function") {
        gtag("event", "conversion", {
          send_to: "AW-18383056369/QQL4CJKM644dEPHb3L1E",
          value: 1,
          currency: "INR",
        });
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
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
            onChange={(event) =>
              updateField("fullName", event.target.value)
            }
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
                onChange={(event) =>
                  updateField(
                    "mobile",
                    event.target.value.replace(/\D/g, "").slice(0, 10),
                  )
                }
                maxLength={10}
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
              onChange={(event) => {
                setValues((current) => ({
                  ...current,
                  state: event.target.value,
                  city: "",
                }));
                setLocationError("");
              }}
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
            <label className={labelClass} htmlFor="admission-city">
              City <span className="text-[#C31E3B]">*</span>
            </label>
            <select
              id="admission-city"
              name="city"
              className={inputClass}
              value={values.city}
              onChange={(event) => updateField("city", event.target.value)}
              required
              disabled={loading || !values.state || citiesLoading}
            >
              <option value="">
                {!values.state
                  ? "Select State First"
                  : citiesLoading
                    ? "Loading cities..."
                    : "Select City"}
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {citiesLoading && (
          <p className="flex items-center gap-2 text-xs text-slate-500">
            <LoaderCircle size={14} className="animate-spin" />
            Loading cities for {values.state}...
          </p>
        )}

        {locationError && (
          <div
            role="status"
            className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-800"
          >
            <p>{locationError}</p>
            <button
              type="button"
              className="mt-2 inline-flex items-center gap-1.5 font-bold underline"
              onClick={retryCities}
              disabled={!values.state || citiesLoading || loading}
            >
              <RefreshCw size={13} />
              Retry city loading
            </button>
          </div>
        )}

        {values.city === "Other" && (
          <p className="text-xs leading-5 text-slate-500">
            Please mention your city in the remarks field.
          </p>
        )}

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
              aria-label={`Verification code: ${captchaCode}`}
              className="flex min-h-11 select-none items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-3 font-mono text-lg font-extrabold tracking-[0.3em] text-[#123B79]"
            >
              {captchaCode}
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
          <p id="admission-captcha-help" className="mt-1.5 text-xs text-slate-500">
            Type the 5-character code shown. Use refresh if it is difficult to read.
          </p>
        </div>

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
          Your details will only be used to respond to your admission enquiry.
        </p>
      </form>
    </div>
  );
}
