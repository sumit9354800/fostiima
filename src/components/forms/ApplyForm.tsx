/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { FormEvent, useEffect, useState } from "react";

type FormData = {
  fullName: string;
  email: string;
  phone: string;
  state: string;
  district: string;
  programme: string;
  consent: boolean;
};

type District = {
  code: string;
  name: string;
};

type StateDistrictData = {
  state: string;
  districts: District[];
};

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  state: "",
  district: "",
  programme: "",
  consent: false,
};

const INDIA_STATES_DISTRICTS_API =
  "https://raw.githubusercontent.com/CodingMation/indian-states-districts/main/data/india_states_districts.json";

export default function ApplyForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [states, setStates] = useState<StateDistrictData[]>([]);

  const [districts, setDistricts] = useState<District[]>([]);

  const [isLoadingStates, setIsLoadingStates] = useState(true);

  const [locationError, setLocationError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submitted, setSubmitted] = useState(false);

  const [otpSent, setOtpSent] = useState(false);

  const [otp, setOtp] = useState("");

  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [isSendingOtp, setIsSendingOtp] = useState(false);

  /*
   * Temporary value.
   *
   * Later this will come from the admin panel
   * and database.
   */
  const isAdmissionOpen = true;

  /*
   * Load Indian states and districts.
   */
  useEffect(() => {
    let isMounted = true;

    async function loadStatesAndDistricts() {
      try {
        setIsLoadingStates(true);
        setLocationError("");

        const response = await fetch(INDIA_STATES_DISTRICTS_API);

        if (!response.ok) {
          throw new Error(`Location API failed with status ${response.status}`);
        }

        const data: unknown = await response.json();

        if (!isMounted) {
          return;
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid location API response.");
        }

        const normalizedData: StateDistrictData[] = data
          .map((item: unknown) => {
            if (!item || typeof item !== "object") {
              return null;
            }

            const stateItem = item as {
              state?: unknown;
              name?: unknown;
              districts?: unknown;
            };

            let stateName = "";

            if (typeof stateItem.state === "string") {
              stateName = stateItem.state;
            } else if (stateItem.state && typeof stateItem.state === "object") {
              const stateObject = stateItem.state as {
                name?: unknown;
              };

              if (typeof stateObject.name === "string") {
                stateName = stateObject.name;
              }
            }

            if (!stateName && typeof stateItem.name === "string") {
              stateName = stateItem.name;
            }

            const rawDistricts = Array.isArray(stateItem.districts)
              ? stateItem.districts
              : [];

            const normalizedDistricts: District[] = rawDistricts
              .map((district: unknown): District | null => {
                /*
                 * Some APIs may return:
                 *
                 * "Central Delhi"
                 *
                 * while others return:
                 *
                 * {
                 *   code: "...",
                 *   name: "Central Delhi"
                 * }
                 */

                if (typeof district === "string") {
                  const name = district.trim();

                  if (!name) {
                    return null;
                  }

                  return {
                    code: name,
                    name,
                  };
                }

                if (district && typeof district === "object") {
                  const districtObject = district as {
                    code?: unknown;
                    name?: unknown;
                  };

                  const code =
                    typeof districtObject.code === "string"
                      ? districtObject.code.trim()
                      : "";

                  const name =
                    typeof districtObject.name === "string"
                      ? districtObject.name.trim()
                      : "";

                  const finalName = name || code;

                  const finalCode = code || finalName;

                  if (!finalName || !finalCode) {
                    return null;
                  }

                  return {
                    code: finalCode,
                    name: finalName,
                  };
                }

                return null;
              })
              .filter((district): district is District => district !== null);

            if (!stateName || normalizedDistricts.length === 0) {
              return null;
            }

            return {
              state: stateName,
              districts: normalizedDistricts,
            };
          })
          .filter((item): item is StateDistrictData => item !== null);

        /*
         * Remove duplicate states and duplicate
         * districts so React never receives
         * duplicate keys.
         */
        const uniqueStates = normalizedData.reduce<StateDistrictData[]>(
          (result, current) => {
            const existingState = result.find(
              (item) => item.state === current.state,
            );

            if (!existingState) {
              result.push({
                state: current.state,
                districts: current.districts,
              });

              return result;
            }

            const existingDistrictCodes = new Set(
              existingState.districts.map((district) => district.code),
            );

            for (const district of current.districts) {
              if (!existingDistrictCodes.has(district.code)) {
                existingState.districts.push(district);

                existingDistrictCodes.add(district.code);
              }
            }

            return result;
          },
          [],
        );

        if (uniqueStates.length === 0) {
          throw new Error("No Indian state data was returned.");
        }

        setStates(uniqueStates);
      } catch (error) {
        console.error("Failed to load Indian states and districts:", error);

        if (isMounted) {
          setLocationError(
            "Unable to load states and districts right now. Please try again.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingStates(false);
        }
      }
    }

    loadStatesAndDistricts();

    return () => {
      isMounted = false;
    };
  }, []);

  /*
   * Update districts whenever state changes.
   */
  useEffect(() => {
    if (!formData.state) {
      setDistricts([]);
      return;
    }

    const selectedState = states.find((item) => item.state === formData.state);

    setDistricts(selectedState?.districts ?? []);
  }, [formData.state, states]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = event.target;

    if (type === "checkbox") {
      const checked = (event.target as HTMLInputElement).checked;

      setFormData((current) => ({
        ...current,
        [name]: checked,
      }));

      return;
    }

    if (name === "state") {
      setFormData((current) => ({
        ...current,
        state: value,
        district: "",
      }));

      return;
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    /*
     * If phone number changes, previous OTP
     * verification becomes invalid.
     */
    if (name === "email") {
      setOtpSent(false);
      setIsEmailVerified(false);
      setOtp("");
    }
  }

  /*
   * Send a real email verification code.
   */
  async function handleSendOtp() {
    const email = formData.email.trim().toLowerCase();

    if (!email) return;

    setIsSendingOtp(true);

    try {
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
            : "Unable to send verification code.";
        throw new Error(message);
      }

      setOtpSent(true);
      setIsEmailVerified(false);
      setOtp("");
    } catch (error) {
      console.error("OTP request failed:", error);
    } finally {
      setIsSendingOtp(false);
    }
  }

  /*
   * Verify the email verification code.
   */
  async function handleVerifyOtp() {
    const email = formData.email.trim().toLowerCase();

    if (!email || otp.length !== 6) return;

    try {
      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
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
            : "Unable to verify the code.";
        throw new Error(message);
      }

      setIsEmailVerified(true);
      setOtp("");
    } catch (error) {
      console.error("OTP verification failed:", error);
    }
  }

  /*
   * Application submission.
   *
   * Real API will be connected later.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isAdmissionOpen) {
      return;
    }

    if (!isEmailVerified) {
      return;
    }

    if (!formData.consent) {
      return;
    }

    setIsSubmitting(true);
    setSubmitted(false);

    try {
      const response = await fetch("/api/admissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          state: formData.state,
          district: formData.district,
          programme: formData.programme,
          consent: formData.consent,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to submit your application.");
      }

      console.log("Application submitted successfully:", data.applicationId);

      setSubmitted(true);

      setFormData(initialFormData);
      setOtp("");
      setOtpSent(false);
      setIsEmailVerified(false);
    } catch (error) {
      console.error("Application submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  /*
   * Admission closed state.
   *
   * Later isAdmissionOpen will come from
   * admin/database instead of this temporary value.
   */
  if (!isAdmissionOpen) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-5">
          <h2 className="text-lg font-bold text-[#c31e3b]">
            Admissions Closed
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            Admissions are currently closed. Please check back later.
          </p>
        </div>
      </div>
    );
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

        <div className="flex gap-2">
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            autoComplete="email"
            disabled={isEmailVerified}
            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10 disabled:bg-slate-50 disabled:text-slate-500"
          />

          <button
            type="button"
            onClick={handleSendOtp}
            disabled={!formData.email.trim() || isSendingOtp || isEmailVerified}
            className="shrink-0 rounded-lg bg-[#123b79] px-4 py-3 text-xs font-semibold text-white transition hover:bg-[#0d2e60] disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:text-sm"
          >
            {isEmailVerified
              ? "VERIFIED"
              : isSendingOtp
                ? "SENDING..."
                : otpSent
                  ? "RESEND OTP"
                  : "SEND OTP"}
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
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
          required
          autoComplete="tel"
          inputMode="numeric"
          maxLength={10}
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
        />
      </div>

      {/* OTP */}
      {otpSent && !isEmailVerified && (
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
              value={otp}
              onChange={(event) =>
                setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
              }
              placeholder="Enter 6-digit OTP"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm tracking-[0.25em] text-slate-900 outline-none transition placeholder:tracking-normal placeholder:text-slate-400 focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10"
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
        </div>
      )}

      {/* Verified Status */}
      {isEmailVerified && (
        <div
          role="status"
          className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          Email address verified successfully.
        </div>
      )}

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
            value={formData.state}
            onChange={handleChange}
            required
            disabled={isLoadingStates}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10 disabled:bg-slate-50 disabled:text-slate-500"
          >
            <option value="">
              {isLoadingStates ? "Loading..." : "Select State"}
            </option>

            {states.map((item) => (
              <option key={item.state} value={item.state}>
                {item.state}
              </option>
            ))}
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
            value={formData.district}
            onChange={handleChange}
            required
            disabled={!formData.state || districts.length === 0}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none transition focus:border-[#123b79] focus:ring-2 focus:ring-[#123b79]/10 disabled:bg-slate-50 disabled:text-slate-500"
          >
            <option value="">
              {!formData.state
                ? "Select District"
                : districts.length === 0
                  ? "Loading..."
                  : "Select District"}
            </option>

            {districts.map((district) => (
              <option
                key={`${formData.state}-${district.code}`}
                value={district.name}
              >
                {district.name}
              </option>
            ))}
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

      {/* Consent */}
      <label className="flex items-start gap-2">
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          required
          className="mt-1 h-4 w-4 shrink-0 accent-[#123b79]"
        />

        <span className="text-xs leading-5 text-slate-500">
          I agree to receive information regarding my submitted application via
          Call/SMS/WhatsApp by signing up on FOSTIIMA Business School.
        </span>
      </label>

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
        disabled={isSubmitting || !isEmailVerified || !formData.consent}
        className="w-full rounded-lg bg-[#c31e3b] px-5 py-3.5 text-sm font-semibold tracking-wide text-white transition hover:bg-[#a91731] focus:outline-none focus:ring-2 focus:ring-[#c31e3b]/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
      </button>

      <p className="text-center text-xs leading-relaxed text-slate-400">
        By submitting this form, you agree to be contacted by FOSTIIMA Business
        School regarding admissions.
      </p>
    </form>
  );
}
