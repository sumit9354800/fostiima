"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Mic, X } from "lucide-react";

type BotType = "chatbot" | "voice" | null;

const EXTRAEDGE_SCRIPT =
  "https://extraaedgeresources.blob.core.windows.net/documents/fbscrm/Chatbot/js/chat.js";

const MARKAIBLE_SCRIPT =
  "https://www.markaible.com/widget.js";

const MARKAIBLE_AGENT_ID = "6a9fa7d1dab71eb81cbeb108";

function loadScript(
  src: string,
  attributes: Record<string, string> = {},
) {
  return new Promise<HTMLScriptElement>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    );

    if (existing) {
      resolve(existing);
      return;
    }

    const script = document.createElement("script");

    script.src = src;
    script.async = true;

    Object.entries(attributes).forEach(([key, value]) => {
      script.setAttribute(key, value);
    });

    script.onload = () => resolve(script);
    script.onerror = () =>
      reject(new Error(`Failed to load script: ${src}`));

    document.body.appendChild(script);
  });
}

function hideThirdPartyLaunchers() {
  const selectors = [
    "#__eechatIcon",
    "#eeChatIndicator",
    "#_eechatIcon",
    '[id*="eechat"]',
    '[id*="eeChat"]',
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      element.style.display = "none";
      element.style.visibility = "hidden";
      element.style.pointerEvents = "none";
    });
  });
}

function showThirdPartyLaunchers() {
  const selectors = [
    "#__eechatIcon",
    "#eeChatIndicator",
    "#_eechatIcon",
    '[id*="eechat"]',
    '[id*="eeChat"]',
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      element.style.display = "";
      element.style.visibility = "";
      element.style.pointerEvents = "";
    });
  });
}

function findExtraEdgeLauncher() {
  const selectors = [
    "#__eechatIcon",
    "#eeChatIndicator",
    "#_eechatIcon",
  ];

  for (const selector of selectors) {
    const element = document.querySelector<HTMLElement>(selector);

    if (element) {
      return element;
    }
  }

  return null;
}

export default function ChatbotScript() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeBot, setActiveBot] = useState<BotType>(null);

  const [extraEdgeReady, setExtraEdgeReady] = useState(false);
  const [markaibleReady, setMarkaibleReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initializeExtraEdge = async () => {
      try {
        await loadScript(EXTRAEDGE_SCRIPT);

        if (!mounted) return;

        const waitForLauncher = () => {
          const launcher = findExtraEdgeLauncher();

          if (launcher) {
            hideThirdPartyLaunchers();
            setExtraEdgeReady(true);
            return;
          }

          window.setTimeout(waitForLauncher, 300);
        };

        waitForLauncher();
      } catch (error) {
        console.error("ExtraaEdge chatbot failed to load:", error);
      }
    };

    initializeExtraEdge();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!activeBot) {
      hideThirdPartyLaunchers();
      return;
    }

    hideThirdPartyLaunchers();

    if (activeBot === "chatbot") {
      const launcher = findExtraEdgeLauncher();

      if (launcher) {
        launcher.click();
      } else if (extraEdgeReady) {
        window.setTimeout(() => {
          const retryLauncher = findExtraEdgeLauncher();

          if (retryLauncher) {
            retryLauncher.click();
          }
        }, 500);
      }

      return;
    }

    if (activeBot === "voice") {
      if (!markaibleReady) {
        loadScript(MARKAIBLE_SCRIPT, {
          "data-agent": MARKAIBLE_AGENT_ID,
          "data-style": "peek",
          "data-panel": "solid",
        })
          .then(() => {
            setMarkaibleReady(true);
            hideThirdPartyLaunchers();
          })
          .catch((error) => {
            console.error("Markaible voice chatbot failed to load:", error);
          });
      }
    }
  }, [activeBot, extraEdgeReady, markaibleReady]);

  useEffect(() => {
    hideThirdPartyLaunchers();

    const observer = new MutationObserver(() => {
      hideThirdPartyLaunchers();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const closeAll = () => {
    setActiveBot(null);
    setMenuOpen(false);

    hideThirdPartyLaunchers();
  };

  const openBot = (bot: Exclude<BotType, null>) => {
    setMenuOpen(false);
    setActiveBot(bot);

    hideThirdPartyLaunchers();
  };

  return (
    <>
      {/* OPTIONS MENU */}
      {menuOpen && !activeBot && (
        <div className="fixed bottom-24 right-5 z-[99999] w-[260px] overflow-hidden rounded-2xl bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-[#061a3a] px-4 py-3 text-white">
            <span className="text-sm font-semibold">
              FOSTIIMA Assistant
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close assistant menu"
              className="rounded-md p-1 transition hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-2 p-3">
            {/* CHATBOT */}
            <button
              type="button"
              onClick={() => openBot("chatbot")}
              className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:bg-slate-50"
            >
              <MessageCircle
                size={22}
                className="text-[#061a3a]"
              />

              <div>
                <p className="text-sm font-medium text-slate-900">
                  Chatbot
                </p>

                <p className="text-xs text-slate-500">
                  Chat with FOSTIIMA
                </p>
              </div>
            </button>

            {/* VOICE CHATBOT */}
            <button
              type="button"
              onClick={() => openBot("voice")}
              className="flex w-full items-center gap-3 rounded-xl border border-slate-200 p-3 text-left transition hover:bg-slate-50"
            >
              <Mic
                size={22}
                className="text-[#061a3a]"
              />

              <div>
                <p className="text-sm font-medium text-slate-900">
                  Voice Chatbot
                </p>

                <p className="text-xs text-slate-500">
                  Talk with FOSTIIMA
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* MAIN FLOATING BUTTON */}
      <button
        type="button"
        onClick={() => {
          if (activeBot) {
            closeAll();
            return;
          }

          setMenuOpen((previous) => !previous);
        }}
        aria-label="Toggle FOSTIIMA assistant"
        className="fixed bottom-5 right-5 z-[99999] flex h-14 w-14 items-center justify-center rounded-full bg-[#e5b83f] text-[#061a3a] shadow-xl transition hover:scale-105"
      >
        {menuOpen || activeBot ? (
          <X size={26} />
        ) : (
          <MessageCircle size={26} />
        )}
      </button>
    </>
  );
}