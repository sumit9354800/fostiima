"use client";

import { useEffect } from "react";

const EXTRAEDGE_LAUNCHER_IDS = [
  "__eechatIcon",
  "eeChatIndicator",
  "_eechatIcon",
];

function getOriginalChatbotLauncher(): HTMLElement | null {
  for (const id of EXTRAEDGE_LAUNCHER_IDS) {
    const element = document.getElementById(id);

    if (element instanceof HTMLElement) {
      return element;
    }
  }

  const fallback = document.querySelector<HTMLElement>(
    '[onclick*="eeChatBot.toggleChatWindow"]',
  );

  return fallback;
}

function hideOriginalLauncher() {
  const styleId = "__fostiimaExtraaEdgeLauncher";

  if (document.getElementById(styleId)) {
    return;
  }

  const style = document.createElement("style");

  style.id = styleId;

  style.textContent = `
    #__eechatIcon,
    #eeChatIndicator,
    #_eechatIcon {
      display: none !important;
    }
  `;

  document.head.appendChild(style);
}

export function openFostiimaChatbot(): boolean {
  const launcher = getOriginalChatbotLauncher();

  if (!launcher) {
    console.warn(
      "FOSTIIMA ExtraaEdge chatbot launcher was not found.",
    );

    return false;
  }

  launcher.click();

  return true;
}

export function closeFostiimaChatbot(): boolean {
  const launcher = getOriginalChatbotLauncher();

  if (!launcher) {
    return false;
  }

  launcher.click();

  return true;
}

export default function FostiimaChatbot({
  isOpen,
}: {
  isOpen: boolean;
}) {
  useEffect(() => {
    hideOriginalLauncher();
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    hideOriginalLauncher();

    const timer = window.setTimeout(() => {
      openFostiimaChatbot();
    }, 100);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isOpen]);

  return null;
}