"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  MessageCircle,
  Mic,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import ApplyFormModal from "@/components/admissions/ApplyFormModal";
import BrochureFormModal from "@/components/admissions/BrochureFormModal";

const WHATSAPP_NUMBER = "917678389436";

const WHATSAPP_MESSAGE =
  "Hello FOSTIIMA Business School, I would like to know more about the PGDM/MBA programmes.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

const FOSTIIMA_CHAT_SCRIPT_ID = "fostiima-admission-chatbot";
const MARKAIBLE_SCRIPT_ID = "markaible-voice-ai";

declare global {
  interface Window {
    eeChatBot?: {
      toggleChatWindow?: () => void;
    };
  }
}

function loadScript(
  id: string,
  src: string,
  attributes?: Record<string, string>,
) {
  return new Promise<void>((resolve, reject) => {
    const existingScript = document.getElementById(id);

    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement("script");

    script.id = id;
    script.src = src;
    script.async = true;

    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        script.setAttribute(key, value);
      });
    }

    script.onload = () => resolve();

    script.onerror = () => {
      reject(new Error(`Failed to load chatbot script: ${src}`));
    };

    document.body.appendChild(script);
  });
}

async function openFostiimaChat() {
  try {
    await loadScript(
      FOSTIIMA_CHAT_SCRIPT_ID,
      "https://extraaedgeresources.blob.core.windows.net/documents/fbscrm/Chatbot/js/chat.js",
    );

    console.log("FOSTIIMA chatbot script loaded.");

    const checkChatbot = () => {
      console.log("FOSTIIMA chatbot elements:", {
        main: document.querySelector("#__eedivChatMain"),
        container: document.querySelector("#eeChatContainer"),
        indicator: document.querySelector("#eeChatIndicator"),
        icon: document.querySelector("#_eechatIcon"),
        window: document.querySelector("#_eechatWindow"),
        botWindow: document.querySelector("#eeChatBotChatWindow"),
      });
    };

    checkChatbot();

    setTimeout(checkChatbot, 500);
    setTimeout(checkChatbot, 1500);
    setTimeout(checkChatbot, 3000);
    setTimeout(checkChatbot, 5000);
  } catch (error) {
    console.error("FOSTIIMA Admission Chatbot error:", error);
  }
}
async function openMarkAIble() {
  try {
    await loadScript(
      MARKAIBLE_SCRIPT_ID,
      "https://www.markaible.com/widget.js",
      {
        "data-agent": "6a9fa7d1dab71eb81cbeb108",
        "data-style": "peek",
        "data-panel": "solid",
      },
    );

    /*
     * MarkAIble creates its own launcher after loading.
     * We wait for it and look for its visible admission assistant launcher.
     */
    let attempts = 0;

    while (attempts < 50) {
      await new Promise((resolve) => setTimeout(resolve, 100));

      const elements = Array.from(
        document.querySelectorAll<HTMLElement>(
          'button, a, [role="button"], [aria-label], [title]',
        ),
      );

      const launcher = elements.find((element) => {
        if (!element.offsetParent) {
          return false;
        }

        if (element.closest("#__eedivChatMain")) {
          return false;
        }

        const content = [
          element.textContent ?? "",
          element.getAttribute("aria-label") ?? "",
          element.getAttribute("title") ?? "",
        ]
          .join(" ")
          .toLowerCase();

        return (
          content.includes("questions about pgdm") ||
          content.includes("admission expert") ||
          content.includes("speak to our admission")
        );
      });

      if (launcher) {
        launcher.click();
        return;
      }

      attempts += 1;
    }

    console.warn("MarkAIble launcher was not found.");
  } catch (error) {
    console.error("MarkAIble Voice AI error:", error);
  }
}

export default function FloatingActions() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isChatOptionsOpen, setIsChatOptionsOpen] = useState(false);

  const handleChatToggle = () => {
    setIsChatOptionsOpen((current) => !current);
  };

  return (
    <>
      {/* =====================================================
          EXISTING FLOATING ACTIONS
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
        {/* BROCHURE */}
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
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          />

          <span className="text-[7px] font-bold uppercase tracking-tight sm:text-[8px]">
            Brochure
          </span>
        </button>

        {/* APPLY */}
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
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          />

          <span className="text-[7px] font-bold uppercase tracking-tight sm:text-[8px]">
            Apply
          </span>
        </button>

        {/* WHATSAPP */}
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
            className="transition-transform duration-200 group-hover:scale-110"
          />

          <span className="text-[7px] font-bold uppercase tracking-tight sm:text-[8px]">
            WhatsApp
          </span>
        </a>
      </div>

      {/* =====================================================
          CHATBOT SELECTOR
      ====================================================== */}
      <div className="fixed bottom-5 right-5 z-[90]">
        {/* CHATBOT OPTIONS */}
        <div
          className={`
            absolute
            bottom-[calc(100%+10px)]
            right-0
            flex
            w-[230px]
            flex-col
            gap-2
            transition-all
            duration-300
            ${
              isChatOptionsOpen
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none translate-y-3 opacity-0"
            }
          `}
        >
          {/* VOICE AI */}
          <button
            type="button"
            onClick={openMarkAIble}
            className="
              group
              flex
              w-full
              items-center
              gap-3
              border
              border-[#dbe3ee]
              bg-white
              px-4
              py-3
              text-left
              shadow-[0_8px_25px_rgba(6,26,58,0.14)]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-[#061a3a]
            "
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#061a3a] text-white">
              <Mic className="h-5 w-5" />
            </span>

            <span>
              <span className="block text-sm font-bold text-[#061a3a]">
                Voice AI
              </span>

              <span className="mt-0.5 block text-[11px] text-slate-500">
                Talk with AI
              </span>
            </span>
          </button>

          {/* ADMISSION AI */}
          <button
            type="button"
            onClick={openFostiimaChat}
            className="
              group
              flex
              w-full
              items-center
              gap-3
              border
              border-[#dbe3ee]
              bg-white
              px-4
              py-3
              text-left
              shadow-[0_8px_25px_rgba(6,26,58,0.14)]
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:border-[#c31e3b]
            "
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#c31e3b] text-white">
              <MessageCircle className="h-5 w-5" />
            </span>

            <span>
              <span className="block text-sm font-bold text-[#061a3a]">
                Admission AI
              </span>

              <span className="mt-0.5 block text-[11px] text-slate-500">
                Chat with AI
              </span>
            </span>
          </button>
        </div>

        {/* ARROW BUTTON */}
        <button
          type="button"
          onClick={handleChatToggle}
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-white
            bg-[#061a3a]
            text-white
            shadow-[0_8px_30px_rgba(6,26,58,0.25)]
            transition-all
            duration-300
            hover:bg-[#c31e3b]
            focus:outline-none
            focus:ring-2
            focus:ring-[#c31e3b]
            focus:ring-offset-2
          "
          aria-label="Show AI chat options"
          aria-expanded={isChatOptionsOpen}
          title="Chat with AI"
        >
          {isChatOptionsOpen ? (
            <ChevronDown className="h-5 w-5" />
          ) : (
            <ChevronUp className="h-5 w-5" />
          )}
        </button>
      </div>

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
