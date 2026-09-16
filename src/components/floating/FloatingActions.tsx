"use client";

import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
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

const FOSTIIMA_CHAT_SCRIPT =
  "https://extraaedgeresources.blob.core.windows.net/documents/fbscrm/Chatbot/js/chat.js";

const MARKAIBLE_CHAT_SCRIPT = "https://www.markaible.com/widget.js";

type ChatLauncher = HTMLElement;

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

function getShadowRoots(root: Document | ShadowRoot | Element): ShadowRoot[] {
  const roots: ShadowRoot[] = [];

  const elements =
    root instanceof Document
      ? root.querySelectorAll("*")
      : root.querySelectorAll("*");

  elements.forEach((element) => {
    if (element.shadowRoot) {
      roots.push(element.shadowRoot);
    }
  });

  return roots;
}

function isVisibleElement(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const rect = element.getBoundingClientRect();

  return (
    style.display !== "none" &&
    style.visibility !== "hidden" &&
    Number(style.opacity) !== 0 &&
    rect.width > 0 &&
    rect.height > 0
  );
}

function isLikelyLauncher(element: HTMLElement) {
  if (!isVisibleElement(element)) {
    return false;
  }

  if (element.closest("[data-fostiima-floating-actions]")) {
    return false;
  }

  const rect = element.getBoundingClientRect();
  const style = window.getComputedStyle(element);

  const isFloating =
    style.position === "fixed" ||
    style.position === "sticky";

  const isLauncherSize =
    rect.width >= 32 &&
    rect.width <= 120 &&
    rect.height >= 32 &&
    rect.height <= 120;

  const isNearRightSide =
    window.innerWidth - rect.right <= 180;

  const isNearBottom =
    window.innerHeight - rect.bottom <= 220;

  return isFloating && isLauncherSize && isNearRightSide && isNearBottom;
}

function findKnownLauncher(selectors: string[]) {
  for (const selector of selectors) {
    const element = document.querySelector<HTMLElement>(selector);

    if (element && isVisibleElement(element)) {
      return element;
    }
  }

  return null;
}

function findFloatingLaunchers(): ChatLauncher[] {
  const candidates = new Set<HTMLElement>();

  const addCandidates = (root: Document | ShadowRoot) => {
    root.querySelectorAll<HTMLElement>("*").forEach((element) => {
      if (isLikelyLauncher(element)) {
        candidates.add(element);
      }
    });

    getShadowRoots(root).forEach((shadowRoot) => {
      addCandidates(shadowRoot);
    });
  };

  addCandidates(document);

  const knownFostiimaLauncher = findKnownLauncher([
    "#eeChatIndicator",
    "#_eechatIcon",
    '[onclick*="eeChatBot.toggleChatWindow"]',
  ]);

  if (knownFostiimaLauncher) {
    candidates.add(knownFostiimaLauncher);
  }

  return Array.from(candidates).filter((element) => {
    const hasLauncherParent = Array.from(candidates).some(
      (other) =>
        other !== element &&
        other.contains(element) &&
        other.getBoundingClientRect().width >=
          element.getBoundingClientRect().width,
    );

    return !hasLauncherParent;
  });
}

function prepareOriginalLaunchers() {
  const launchers = findFloatingLaunchers();

  const uniqueLaunchers = launchers.slice(0, 2);

  uniqueLaunchers.forEach((launcher, index) => {
    const originalStyle = launcher.getAttribute(
      "data-fostiima-original-style",
    );

    if (originalStyle === null) {
      launcher.setAttribute(
        "data-fostiima-original-style",
        launcher.getAttribute("style") ?? "",
      );
    }

    launcher.style.setProperty(
      "position",
      "fixed",
      "important",
    );

    launcher.style.setProperty(
      "right",
      "18px",
      "important",
    );

    launcher.style.setProperty(
      "bottom",
      `${index === 0 ? 78 : 18}px`,
      "important",
    );

    launcher.style.setProperty(
      "z-index",
      "2147483000",
      "important",
    );

    launcher.style.setProperty(
      "margin",
      "0",
      "important",
    );

    launcher.setAttribute(
      "data-fostiima-original-chat-launcher",
      "true",
    );
  });

  return uniqueLaunchers;
}

function restoreOriginalLaunchers() {
  document
    .querySelectorAll<HTMLElement>(
      '[data-fostiima-original-chat-launcher="true"]',
    )
    .forEach((launcher) => {
      const originalStyle = launcher.getAttribute(
        "data-fostiima-original-style",
      );

      if (originalStyle !== null) {
        if (originalStyle) {
          launcher.setAttribute("style", originalStyle);
        } else {
          launcher.removeAttribute("style");
        }
      }

      launcher.removeAttribute("data-fostiima-original-chat-launcher");
      launcher.removeAttribute("data-fostiima-original-style");
    });
}

function hideOriginalLaunchers() {
  const launchers = findFloatingLaunchers();

  launchers.slice(0, 2).forEach((launcher) => {
    if (launcher.getAttribute("data-fostiima-original-style") === null) {
      launcher.setAttribute(
        "data-fostiima-original-style",
        launcher.getAttribute("style") ?? "",
      );
    }

    launcher.setAttribute(
      "data-fostiima-original-chat-launcher",
      "true",
    );

    launcher.style.setProperty("display", "none", "important");
  });

  document
    .querySelectorAll<HTMLElement>(
      '[data-fostiima-original-chat-launcher="true"]',
    )
    .forEach((launcher) => {
      launcher.style.setProperty("display", "none", "important");
    });
}

async function loadOriginalChatbots() {
  await Promise.all([
    loadScript(FOSTIIMA_CHAT_SCRIPT_ID, FOSTIIMA_CHAT_SCRIPT),
    loadScript(MARKAIBLE_SCRIPT_ID, MARKAIBLE_CHAT_SCRIPT, {
      "data-agent": "6a9fa7d1dab71eb81cbeb108",
      "data-style": "peek",
      "data-panel": "solid",
    }),
  ]);

  return new Promise<void>((resolve) => {
    let attempts = 0;

    const tryPrepare = () => {
      const launchers = prepareOriginalLaunchers();

      if (launchers.length >= 2 || attempts >= 80) {
        resolve();
        return;
      }

      attempts += 1;
      window.setTimeout(tryPrepare, 150);
    };

    tryPrepare();
  });
}

export default function FloatingActions() {
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);
  const [isChatOptionsOpen, setIsChatOptionsOpen] = useState(false);
  const [areChatbotsLoaded, setAreChatbotsLoaded] = useState(false);

  const chatLoadingRef = useRef(false);

  useEffect(() => {
    if (!isChatOptionsOpen || areChatbotsLoaded || chatLoadingRef.current) {
      return;
    }

    chatLoadingRef.current = true;

    loadOriginalChatbots()
      .then(() => {
        setAreChatbotsLoaded(true);
      })
      .catch((error) => {
        console.error("FOSTIIMA chatbot loading error:", error);
      })
      .finally(() => {
        chatLoadingRef.current = false;
      });
  }, [isChatOptionsOpen, areChatbotsLoaded]);

  useEffect(() => {
    if (!areChatbotsLoaded) {
      return;
    }

    const syncLaunchers = () => {
      if (isChatOptionsOpen) {
        prepareOriginalLaunchers();
      } else {
        hideOriginalLaunchers();
      }
    };

    syncLaunchers();

    const interval = window.setInterval(syncLaunchers, 700);

    const observer = new MutationObserver(() => {
      syncLaunchers();
    });

    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      window.clearInterval(interval);
      observer.disconnect();

      if (!isChatOptionsOpen) {
        hideOriginalLaunchers();
      }
    };
  }, [isChatOptionsOpen, areChatbotsLoaded]);

  const handleChatToggle = () => {
    setIsChatOptionsOpen((current) => !current);
  };

  return (
    <>
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
            active:scale-95
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

      <div
        data-fostiima-floating-actions
        className={`
          fixed
          bottom-5
          right-5
          z-[2147482000]
          transition-transform
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${isChatOptionsOpen ? "-translate-y-[116px]" : "translate-y-0"}
        `}
      >
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
          aria-label={
            isChatOptionsOpen
              ? "Hide AI chat options"
              : "Show AI chat options"
          }
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

      <ApplyFormModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
      />

      <BrochureFormModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
      />
    </>
  );
}
