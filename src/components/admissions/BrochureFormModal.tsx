"use client";

import { X, FileText } from "lucide-react";
import BrochureForm from "./BrochureForm";



type BrochureFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function BrochureFormModal({
  isOpen,
  onClose,
}: BrochureFormModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-[#071a38]/70
        p-4
        backdrop-blur-sm
      "
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="bg-[#071a38] px-6 py-5 text-white">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close brochure form"
            className="
              absolute
              right-4
              top-4
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              text-white/70
              transition-colors
              hover:bg-white/10
              hover:text-white
            "
          >
            <X size={18} />
          </button>

          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
            <FileText
              size={18}
              className="text-[#f4c542]"
            />
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/55">
            FOSTIIMA Business School
          </p>

          <h2
            id="brochure-modal-title"
            className="mt-1 text-xl font-bold"
          >
            Download Brochure
          </h2>

          <p className="mt-1 text-sm text-white/65">
            Fill in your details to download the brochure.
          </p>
        </div>

        {/* Form */}
        <div className="p-6">
          <BrochureForm onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}