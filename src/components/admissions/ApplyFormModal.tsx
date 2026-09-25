"use client";

import { X } from "lucide-react";
import ApplyForm from "../forms/ApplyForm";

type ApplyFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ApplyFormModal({
  isOpen,
  onClose,
}: ApplyFormModalProps) {
  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/70 p-4 backdrop-blur-sm transition-opacity ${
        isOpen
          ? "visible opacity-100"
          : "pointer-events-none invisible opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="apply-form-title"
      aria-hidden={!isOpen}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative my-8 w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-slate-100 bg-[#123b79] px-6 py-5 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-1 text-md font-semibold uppercase tracking-[0.18em] text-blue-200">
                Admissions
              </p>

              <h2
                id="apply-form-title"
                className="text-2xl font-bold text-white sm:text-3xl"
              >
                Apply Online
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-blue-100">
                Take the first step towards your management career.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close application form"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <X size={22} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="max-h-[75vh] overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          <ApplyForm />
        </div>
      </div>
    </div>
  );
}