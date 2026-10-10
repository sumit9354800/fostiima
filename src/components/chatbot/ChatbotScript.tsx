
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { MessageCircle, Mic, X } from "lucide-react";

type BotType = "chatbot" | "voice" | null;

const EXTRAEDGE_SCRIPT =
  "https://extraaedgeresources.blob.core.windows.net/documents/fbscrm/Chatbot/js/chat.js";

const CHATBOT_ICON = "/chat-icon.jpeg";

function loadScript(src: string): Promise<HTMLScriptElement> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    );

    if (existing) {
      if (existing.dataset.loaded === "true") {
        resolve(existing);
        return;
      }

      existing.addEventListener("load", () => resolve(existing), {
        once: true,
      });

      existing.addEventListener(
        "error",
        () => reject(new Error(`Failed to load script: ${src}`)),
        { once: true },
      );

      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;

    script.onload = () => {
      script.dataset.loaded = "true";
      resolve(script);
    };

    script.onerror = () => {
      reject(new Error(`Failed to load script: ${src}`));
    };

    document.body.appendChild(script);
  });
}

function hideThirdPartyLaunchers() {
  const selectors = [
    "#__eechatIcon",
    "#eeChatIndicator",
    "#_eechatIcon",
  ];

  selectors.forEach((selector) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
      element.style.display = "none";
      element.style.visibility = "hidden";
      element.style.pointerEvents = "none";
    });
  });
}

function findExtraEdgeLauncher(): HTMLElement | null {
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

  // Load ExtraaEdge chatbot script.
  useEffect(() => {
    let mounted = true;
    let attempts = 0;
    let retryTimer: number | undefined;

    const initializeExtraEdge = async () => {
      try {
        await loadScript(EXTRAEDGE_SCRIPT);

        if (!mounted) return;

        const waitForLauncher = () => {
          if (!mounted) return;

          const launcher = findExtraEdgeLauncher();

          if (launcher) {
            hideThirdPartyLaunchers();
            setExtraEdgeReady(true);
            return;
          }

          attempts += 1;

          if (attempts < 40) {
            retryTimer = window.setTimeout(waitForLauncher, 300);
          } else {
            console.warn(
              "ExtraaEdge chatbot launcher was not found. Check the widget configuration.",
            );
          }
        };

        waitForLauncher();
      } catch (error) {
        console.error("ExtraaEdge chatbot failed to load:", error);
      }
    };

    void initializeExtraEdge();

    return () => {
      mounted = false;

      if (retryTimer !== undefined) {
        window.clearTimeout(retryTimer);
      }
    };
  }, []);

  // Keep the original ExtraaEdge launcher hidden.
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

  // Open the selected chatbot.
  useEffect(() => {
    if (activeBot !== "chatbot") return;

    let cancelled = false;
    let attempts = 0;
    let retryTimer: number | undefined;

    const openExtraEdgeChatbot = () => {
      if (cancelled) return;

      const launcher = findExtraEdgeLauncher();

      if (launcher) {
        // Temporarily make the original launcher clickable.
        launcher.style.display = "block";
        launcher.style.visibility = "visible";
        launcher.style.pointerEvents = "auto";
        launcher.click();

        // Hide the original launcher again after opening.
        window.setTimeout(() => {
          hideThirdPartyLaunchers();
        }, 100);

        return;
      }

      attempts += 1;

      if (attempts < 15) {
        retryTimer = window.setTimeout(openExtraEdgeChatbot, 300);
      } else {
        console.error(
          "Unable to open ExtraaEdge chatbot. Check its launcher selector or vendor API.",
        );
      }
    };

    if (extraEdgeReady) {
      openExtraEdgeChatbot();
    }

    return () => {
      cancelled = true;

      if (retryTimer !== undefined) {
        window.clearTimeout(retryTimer);
      }
    };
  }, [activeBot, extraEdgeReady]);

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
      {/* Voice chatbot */}
      {activeBot === "voice" && (
        <div
          className="fixed inset-0 z-[99998] bg-black/20"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeAll();
            }
          }}
        >
          <div
            className="
              absolute bottom-24 right-3
              h-[calc(100vh-140px)]
              w-[calc(100vw-24px)]
              overflow-hidden rounded-2xl
              bg-white shadow-2xl
              sm:right-5 sm:h-[600px] sm:w-[400px]
            "
          >
            <iframe
              src="https://www.markaible.com/kiosk?agent=6a9fa7d1dab71eb81cbeb108&orb=orb&bg=%23f4f1fb&bg_opacity=1"
              allow="microphone"
              className="h-full w-full border-0"
              title="Talk to us"
            />
          </div>
        </div>
      )}

      {/* Chatbot selection menu */}
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
            {/* Text chatbot */}
            <button
              type="button"
              onClick={() => openBot("chatbot")}
              className="
                flex w-full items-center gap-3 rounded-xl
                border border-slate-200 p-3 text-left
                transition hover:bg-slate-50
              "
            >
              <MessageCircle
                size={22}
                className="shrink-0 text-[#061a3a]"
              />

              <div>
                <p className="text-sm font-medium text-slate-900">
                  Chatbot
                </p>
                <p className="text-sm text-slate-500">
                  Chat with FOSTIIMA
                </p>
              </div>
            </button>

            {/* Voice chatbot */}
            <button
              type="button"
              onClick={() => openBot("voice")}
              className="
                flex w-full items-center gap-3 rounded-xl
                border border-slate-200 p-3 text-left
                transition hover:bg-slate-50
              "
            >
              <Mic size={22} className="shrink-0 text-[#061a3a]" />

              <div>
                <p className="text-sm font-medium text-slate-900">
                  Voice Chatbot
                </p>
                <p className="text-sm text-slate-500">
                  Talk with FOSTIIMA
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Main floating image button */}
      <button
        type="button"
        onClick={() => {
          if (activeBot) {
            closeAll();
            return;
          }

          setMenuOpen((previous) => !previous);
        }}
        aria-label={
          activeBot
            ? "Close FOSTIIMA assistant"
            : "Open FOSTIIMA assistant"
        }
        aria-expanded={menuOpen || Boolean(activeBot)}
        className="
          fixed bottom-5 right-5 z-[99999]
          flex h-14 w-14 items-center justify-center
          overflow-hidden rounded-full border border-slate-200
          bg-white shadow-xl transition
          hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-[#123b79]
        "
      >
        {menuOpen || activeBot ? (
          <X size={26} className="text-[#061a3a]" />
        ) : (
          <Image
            src={CHATBOT_ICON}
            alt="FOSTIIMA Chatbot"
            width={56}
            height={56}
            priority
            className="h-full w-full rounded-full object-cover"
          />
        )}
      </button>
    </>
  );
}