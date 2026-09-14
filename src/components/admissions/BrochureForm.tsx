"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";

type BrochureFormProps = {
  onSuccess?: () => void;
};

type BrochureFormData = {
  fullName: string;
  email: string;
  phone: string;
};

const BROCHURE_URL = "/brochure.pdf";

export default function BrochureForm({
  onSuccess,
}: BrochureFormProps) {
  const [formData, setFormData] = useState<BrochureFormData>({
    fullName: "",
    email: "",
    phone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    setIsSubmitting(true);

    try {
      /*
       * Temporary frontend flow.
       *
       * Later this can be connected to:
       * /api/brochure-leads
       * Zod validation
       * Prisma
       * MySQL
       */

      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      const downloadLink = document.createElement("a");

      downloadLink.href = BROCHURE_URL;
      downloadLink.download =
        "FOSTIIMA-Business-School-Brochure.pdf";

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      onSuccess?.();
    } catch {
      setError(
        "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Full Name */}
      <div>
        <label
          htmlFor="brochure-fullName"
          className="mb-1.5 block text-xs font-semibold text-[#172f59]"
        >
          Full Name
        </label>

        <input
          id="brochure-fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          autoComplete="name"
          placeholder="Enter your full name"
          className="
            h-11
            w-full
            rounded-lg
            border
            border-slate-200
            bg-slate-50
            px-3.5
            text-sm
            text-slate-700
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-[#c31e3b]
            focus:bg-white
            focus:ring-2
            focus:ring-[#c31e3b]/10
          "
        />
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="brochure-email"
          className="mb-1.5 block text-xs font-semibold text-[#172f59]"
        >
          Email Address
        </label>

        <input
          id="brochure-email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          placeholder="Enter your email"
          className="
            h-11
            w-full
            rounded-lg
            border
            border-slate-200
            bg-slate-50
            px-3.5
            text-sm
            text-slate-700
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-[#c31e3b]
            focus:bg-white
            focus:ring-2
            focus:ring-[#c31e3b]/10
          "
        />
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="brochure-phone"
          className="mb-1.5 block text-xs font-semibold text-[#172f59]"
        >
          Phone Number
        </label>

        <input
          id="brochure-phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
          inputMode="tel"
          placeholder="Enter your phone number"
          className="
            h-11
            w-full
            rounded-lg
            border
            border-slate-200
            bg-slate-50
            px-3.5
            text-sm
            text-slate-700
            outline-none
            transition
            placeholder:text-slate-400
            focus:border-[#c31e3b]
            focus:bg-white
            focus:ring-2
            focus:ring-[#c31e3b]/10
          "
        />
      </div>

      {/* Error */}
      {error && (
        <p
          role="alert"
          className="
            rounded-lg
            bg-red-50
            px-3
            py-2
            text-xs
            font-medium
            text-red-600
          "
        >
          {error}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          flex
          h-11
          w-full
          items-center
          justify-center
          gap-2
          rounded-lg
          bg-[#c31e3b]
          text-sm
          font-semibold
          text-white
          transition-colors
          duration-200
          hover:bg-[#a81731]
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isSubmitting ? (
          <>
            <Loader2
              size={16}
              className="animate-spin"
            />
            Preparing Brochure...
          </>
        ) : (
          <>
            <Download size={16} />
            Submit & Download
          </>
        )}
      </button>

      <p className="text-center text-[10px] leading-4 text-slate-400">
        Please provide your details to access the brochure.
      </p>
    </form>
  );
}