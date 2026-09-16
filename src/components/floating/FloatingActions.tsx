"use client";

import { useState } from "react";
import Script from "next/script";
import { Download, FileText } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import ApplyFormModal from "@/components/admissions/ApplyFormModal";
import BrochureFormModal from "@/components/admissions/BrochureFormModal";

const WHATSAPP_NUMBER = "917678389436";

const WHATSAPP_MESSAGE =
  "Hello FOSTIIMA Business School, I would like to know more about the PGDM/MBA programmes.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

export default function FloatingActions() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  return (
    <>
      {/* =====================================================
          FLOATING ACTIONS
      ====================================================== */}
      <div
        className="
          fixed
          right-4
          top-1/2
          z-[80]
          flex
          -translate-y-1/2
          flex-col
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white
          shadow-[0_8px_30px_rgba(21,45,88,0.16)]
          sm:right-5
        "
      >
        {/* =================================================
            DOWNLOAD BROCHURE
        ================================================== */}
        <button
          type="button"
          onClick={() => setIsBrochureModalOpen(true)}
          className="
            group
            flex
            h-12
            w-12
            flex-col
            items-center
            justify-center
            gap-0.5
            border-b
            border-slate-200
            bg-white
            text-[#152d58]
            transition-all
            duration-300
            hover:bg-[#c31e3b]
            hover:text-white
            focus:outline-none
            focus:ring-2
            focus:ring-[#c31e3b]
            focus:ring-inset
            sm:h-14
            sm:w-14
          "
          aria-label="Download Brochure"
          title="Download Brochure"
        >
          <Download
            size={17}
            strokeWidth={2}
            className="
              transition-transform
              duration-200
              group-hover:-translate-y-0.5
            "
          />

          <span className="text-[7px] font-bold uppercase tracking-tight sm:text-[8px]">
            Brochure
          </span>
        </button>

        {/* =================================================
            APPLY NOW
        ================================================== */}
        <button
          type="button"
          onClick={() => setIsApplyModalOpen(true)}
          className="
            group
            flex
            h-12
            w-12
            flex-col
            items-center
            justify-center
            gap-0.5
            border-b
            border-slate-200
            bg-[#c31e3b]
            text-white
            transition-all
            duration-300
            hover:bg-[#a91731]
            focus:outline-none
            focus:ring-2
            focus:ring-[#c31e3b]
            focus:ring-inset
            sm:h-14
            sm:w-14
          "
          aria-label="Apply Online"
          title="Apply Online"
        >
          <FileText
            size={17}
            strokeWidth={2}
            className="
              transition-transform
              duration-200
              group-hover:-translate-y-0.5
            "
          />

          <span className="text-[7px] font-bold uppercase tracking-tight sm:text-[8px]">
            Apply
          </span>
        </button>

        {/* =================================================
            WHATSAPP
        ================================================== */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            flex
            h-12
            w-12
            flex-col
            items-center
            justify-center
            gap-0.5
            bg-white
            text-[#25D366]
            transition-all
            duration-300
            hover:bg-[#25D366]
            hover:text-white
            focus:outline-none
            focus:ring-2
            focus:ring-[#25D366]
            focus:ring-inset
            sm:h-14
            sm:w-14
          "
          aria-label="Contact FOSTIIMA on WhatsApp"
          title="WhatsApp"
        >
          <FaWhatsapp
            size={21}
            aria-hidden="true"
            className="
              transition-transform
              duration-200
              group-hover:scale-110
            "
          />

          <span className="text-[7px] font-bold uppercase tracking-tight sm:text-[8px]">
            WhatsApp
          </span>
        </a>
      </div>

      {/* =====================================================
          markAIble Voice AI
      ====================================================== */}
      <Script
        src="https://www.markaible.com/widget.js"
        data-agent="6a9fa7d1dab71eb81cbeb108"
        data-style="peek"
        data-panel="solid"
        strategy="afterInteractive"
      />

      {/* <Script
        src="https://extraaedgeresources.blob.core.windows.net/documents/fbscrm/Chatbot/js/chat.js"
        strategy="afterInteractive"
      /> */}

      {/* =====================================================
          APPLY MODAL
      ====================================================== */}
      <ApplyFormModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

      {/* =====================================================
          BROCHURE MODAL
      ====================================================== */}
      <BrochureFormModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
      />
    </>
  );
}
