"use client";

import { useState } from "react";
import Script from "next/script";
import { FaWhatsapp } from "react-icons/fa";
import ApplyFormModal from "@/components/admissions/ApplyFormModal";

const WHATSAPP_NUMBER = "917678389436";

const WHATSAPP_MESSAGE =
  "Hello FOSTIIMA Business School, I would like to know more about the PGDM/MBA programmes.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export default function FloatingActions() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  return (
    <>
      {/* Right Center Actions */}
      <div className="fixed right-4 top-1/2 z-[80] flex -translate-y-1/2 flex-col gap-3 sm:right-5">
        {/* Apply */}
        <button
          type="button"
          onClick={() => setIsApplyModalOpen(true)}
          className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[#c31e3b] text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-[#a91731] focus:outline-none focus:ring-2 focus:ring-[#c31e3b] focus:ring-offset-2 sm:h-12 sm:w-12"
          aria-label="Apply Online"
          title="Apply Online"
        >
          <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-[#123b79] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
            Apply Online
          </span>

          <span className="text-center text-[10px] font-bold leading-tight tracking-wide">
            APPLY
            <br />
            NOW
          </span>
        </button>

        {/* WhatsApp */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 sm:h-12 sm:w-12"
          aria-label="Contact FOSTIIMA on WhatsApp"
          title="WhatsApp"
        >
          <span className="absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-[#123b79] px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
            WhatsApp
          </span>

          <FaWhatsapp size={25} strokeWidth={2} aria-hidden="true" />
        </a>
      </div>

      {/* markAIble Voice AI */}
      <Script
        src="https://www.markaible.com/widget.js"
        data-agent="6a9fa7d1dab71eb81cbeb108"
        data-style="peek"
        data-panel="solid"
        strategy="afterInteractive"
      />

      {/* Apply Modal */}
      <ApplyFormModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </>
  );
}
