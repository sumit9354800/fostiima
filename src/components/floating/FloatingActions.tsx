"use client";

import { useEffect, useState } from "react";

import { Download, FileText, PhoneCall, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "917678389436";

const WHATSAPP_MESSAGE =
  "Hello FOSTIIMA Business School, I would like to know more about the PGDM/MBA programmes.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

const APPLY_SCRIPT =
  "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/fbscrm/ee-form-widget/form-2/widget.js";

const CALLBACK_SCRIPT =
  "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/fbscrm/ee-form-widget/form-5/widget.js";

const BROCHURE_SCRIPT =
  "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/fbscrm/ee-form-widget/form-6/widget.js";

type PopupType = "apply" | "callback" | "brochure" | null;

export default function FloatingActions() {
  const [activePopup, setActivePopup] = useState<PopupType>(null);

  useEffect(() => {
    if (!activePopup) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activePopup]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setActivePopup("apply");
    }, 5000);

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* =========================================
          FLOATING ACTIONS
      ========================================== */}

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
        {/* =========================================
            DOWNLOAD BROCHURE
        ========================================== */}

        <button
          type="button"
          onClick={() => setActivePopup("brochure")}
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

          <span
            className="
              text-[7px]
              font-bold
              uppercase
              tracking-tight
              sm:text-[8px]
            "
          >
            Brochure
          </span>
        </button>

        {/* =========================================
            APPLY
        ========================================== */}

        <button
          type="button"
          onClick={() => setActivePopup("apply")}
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

          <span
            className="
              text-[7px]
              font-bold
              uppercase
              tracking-tight
              sm:text-[8px]
            "
          >
            Apply
          </span>
        </button>

        {/* =========================================
            REQUEST A CALLBACK
        ========================================== */}

        <button
          type="button"
          onClick={() => setActivePopup("callback")}
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
          aria-label="Request a Call Back"
          title="Request a Call Back"
        >
          <PhoneCall
            size={17}
            strokeWidth={2}
            className="
              transition-transform
              duration-200
              group-hover:-translate-y-0.5
            "
          />

          <span
            className="
              text-center
              text-[7px]
              font-bold
              uppercase
              leading-tight
              tracking-tight
              sm:text-[8px]
            "
          >
            Callback
          </span>
        </button>

        {/* =========================================
            WHATSAPP
        ========================================== */}

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

          <span
            className="
              text-[7px]
              font-bold
              uppercase
              tracking-tight
              sm:text-[8px]
            "
          >
            WhatsApp
          </span>
        </a>
      </div>

      {/* =========================================
          POPUPS
      ========================================== */}

      {activePopup === "apply" && (
        <ExtraaEdgePopup
          title="Apply Online"
          scriptUrl={APPLY_SCRIPT}
          containerId="ee-form-2"
          onClose={() => setActivePopup(null)}
        />
      )}

      {activePopup === "callback" && (
        <ExtraaEdgePopup
          title="Request a Call Back"
          scriptUrl={CALLBACK_SCRIPT}
          containerId="ee-form-5"
          onClose={() => setActivePopup(null)}
        />
      )}

      {activePopup === "brochure" && (
        <ExtraaEdgePopup
          title="Download Brochure"
          scriptUrl={BROCHURE_SCRIPT}
          containerId="ee-form-6"
          onClose={() => setActivePopup(null)}
        />
      )}
    </>
  );
}

/* =========================================
   EXTRAAEDGE POPUP
========================================== */

type ExtraaEdgePopupProps = {
  title: string;
  scriptUrl: string;
  containerId: "ee-form-2" | "ee-form-5" | "ee-form-6";
  onClose: () => void;
};

function ExtraaEdgePopup({
  title,
  scriptUrl,
  containerId,
  onClose,
}: ExtraaEdgePopupProps) {
  useEffect(() => {
    const initializeWidget = () => {
      window.dispatchEvent(new Event("DOMContentLoaded"));
    };

    const existingScript = document.querySelector(`script[src="${scriptUrl}"]`);

    if (existingScript) {
      initializeWidget();
      return;
    }

    const script = document.createElement("script");

    script.src = scriptUrl;
    script.type = "text/javascript";
    script.async = true;

    script.onload = initializeWidget;

    script.onerror = () => {
      console.error(`Failed to load ExtraaEdge widget: ${scriptUrl}`);
    };

    document.body.appendChild(script);

    return () => {
      // Keep external ExtraaEdge script loaded.
    };
  }, [scriptUrl]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <>
      {/* Form 2 popup sizing */}
      {containerId === "ee-form-2" && (
        <style jsx global>{`
          #ee-form-2 {
            width: 100% !important;
            min-height: 0 !important;
            height: auto !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
          }

          #ee-form-2 iframe {
            display: block !important;
            width: 100% !important;
            height: 430px !important;
            min-height: 430px !important;
            max-height: 430px !important;
            border: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
          }

          #ee-form-2 > div {
            width: 100% !important;
            max-height: 430px !important;
            overflow: hidden !important;
          }
        `}</style>
      )}

      <div
        className="
          fixed
          inset-0
          z-[100]
          flex
          items-center
          justify-center
          bg-black/60
          p-4
          backdrop-blur-sm
        "
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <div
          className="
            relative
            max-h-[90vh]
            w-full
            max-w-[520px]
            overflow-hidden
            rounded-2xl
            bg-white
            shadow-[0_25px_80px_rgba(0,0,0,0.25)]
          "
        >
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-slate-200
              bg-[#123b79]
              px-5
              py-4
            "
          >
            <h2 className="text-base font-bold text-white sm:text-lg">
              {title}
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-white/10
                text-white
                transition
                hover:bg-white/20
                focus:outline-none
                focus:ring-2
                focus:ring-white/60
              "
              aria-label={`Close ${title}`}
              title="Close"
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* ExtraaEdge Form */}

          <div
            className="
              max-h-[calc(90vh-73px)]
              overflow-y-auto
              bg-white
              p-3
              sm:p-5
            "
          >
            <div id={containerId} className="w-full" />
          </div>
        </div>
      </div>
    </>
  );
}
