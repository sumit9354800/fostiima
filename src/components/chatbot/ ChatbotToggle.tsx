"use client";

import { useEffect, useState } from "react";

const EXTRAEDGE_LAUNCHER_IDS = [
  "__eechatIcon",
  "eeChatIndicator",
  "_eechatIcon",
];

const MARKAIBLE_SELECTOR = "[data-mai-widget]";

function findExtraaEdgeLauncher(): HTMLElement | null {
  for (const id of EXTRAEDGE_LAUNCHER_IDS) {
    const element = document.getElementById(id);

    if (element instanceof HTMLElement) {
      return element;
    }
  }

  return document.querySelector<HTMLElement>(
    '[onclick*="eeChatBot.toggleChatWindow"]',
  );
}

function findMarkaibleLauncher(): HTMLElement | null {
  const widgets = document.querySelectorAll<HTMLElement>(MARKAIBLE_SELECTOR);

  for (const widget of widgets) {
    const launcher =
      widget.shadowRoot?.querySelector<HTMLElement>(".mai-launcher");

    if (launcher) {
      return launcher;
    }
  }

  return null;
}

function hideExtraaEdge(element: HTMLElement) {
  element.style.setProperty("display", "none", "important");
}

function showExtraaEdge(element: HTMLElement) {
  element.style.setProperty("display", "flex", "important");

  element.style.setProperty("position", "fixed", "important");

  element.style.setProperty("right", "20px", "important");

  element.style.setProperty("left", "auto", "important");

  element.style.setProperty("bottom", "156px", "important");

  element.style.setProperty("z-index", "2147482999", "important");
}

function hideMarkaible(element: HTMLElement) {
  element.style.setProperty("opacity", "0", "important");

  element.style.setProperty("visibility", "hidden", "important");

  element.style.setProperty("pointer-events", "none", "important");
}

function showMarkaible(element: HTMLElement) {
  /*
   * Markaible original launcher.
   *
   * IMPORTANT:
   * This element lives inside an OPEN Shadow DOM.
   * Therefore we modify the actual launcher element
   * directly instead of using global CSS.
   */

  element.style.setProperty("position", "fixed", "important");

  element.style.setProperty("left", "20px", "important");

  element.style.setProperty("right", "auto", "important");

  element.style.setProperty("bottom", "20px", "important");

  element.style.setProperty("top", "auto", "important");

  element.style.setProperty("margin", "0", "important");

  element.style.setProperty("transform", "none", "important");

  element.style.setProperty("z-index", "2147482999", "important");

  element.style.setProperty("opacity", "1", "important");

  element.style.setProperty("visibility", "visible", "important");

  element.style.setProperty("pointer-events", "auto", "important");
}

export default function ChatbotToggle() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let interval: number | null = null;

    const updateChatbots = () => {
      const extraaEdge = findExtraaEdgeLauncher();

      const markaible = findMarkaibleLauncher();

      if (extraaEdge) {
        if (isOpen) {
          showExtraaEdge(extraaEdge);
        } else {
          hideExtraaEdge(extraaEdge);
        }
      }

      if (markaible) {
        if (isOpen) {
          showMarkaible(markaible);
        } else {
          hideMarkaible(markaible);
        }
      }
    };

    /*
     * Markaible creates/recreates its launcher
     * dynamically, so keep checking for it.
     */
    updateChatbots();

    interval = window.setInterval(updateChatbots, 100);

    return () => {
      if (interval !== null) {
        window.clearInterval(interval);
      }
    };
  }, [isOpen]);

  return (
    <button
      type="button"
      onClick={() => {
        setIsOpen((current) => !current);
      }}
      aria-label={isOpen ? "Close chatbot options" : "Open chatbot options"}
      aria-expanded={isOpen}
      className="
        fixed
        bottom-5
        right-5
        z-[2147483000]
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-full
        bg-[#e5b83f]
        text-[#061a3a]
        shadow-[0_10px_30px_rgba(6,26,58,0.32)]
        transition-transform
        duration-200
        hover:scale-105
      "
    >
      <span aria-hidden="true" className="text-2xl font-medium leading-none">
        {isOpen ? "×" : "+"}
      </span>
    </button>
  );
}
