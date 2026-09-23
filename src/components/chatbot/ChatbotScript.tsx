"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Mic, X } from "lucide-react";

type BotType = "chatbot" | "voice" | null;

const EXTRAEDGE_SCRIPT =
  "https://extraaedgeresources.blob.core.windows.net/documents/fbscrm/Chatbot/js/chat.js";

const MARKAIBLE_SCRIPT =
  "https://www.markaible.com/widget.js";

const MARKAIBLE_AGENT_ID =
  "6a9fa7d1dab71eb81cbeb108";

declare global {
  interface Window {
    __markaibleWidget?: {
      open: () => void;
      close: () => void;
    };
  }
}

function loadScript(
  src: string,
  attributes: Record<string, string> = {},
) {
  return new Promise<HTMLScriptElement>(
    (resolve, reject) => {
      const existing =
        document.querySelector<HTMLScriptElement>(
          `script[src="${src}"]`,
        );

      if (existing) {
        resolve(existing);
        return;
      }

      const script =
        document.createElement("script");

      script.src = src;
      script.async = true;

      Object.entries(attributes).forEach(
        ([key, value]) => {
          script.setAttribute(key, value);
        },
      );

      script.onload = () => resolve(script);

      script.onerror = () =>
        reject(
          new Error(
            `Failed to load script: ${src}`,
          ),
        );

      document.body.appendChild(script);
    },
  );
}

/* =========================================================
   EXTRAEDGE
========================================================= */

function hideThirdPartyLaunchers() {
  const selectors = [
    "#__eechatIcon",
    "#eeChatIndicator",
    "#_eechatIcon",
  ];

  selectors.forEach((selector) => {
    document
      .querySelectorAll<HTMLElement>(selector)
      .forEach((element) => {
        element.style.display = "none";
        element.style.visibility = "hidden";
        element.style.pointerEvents = "none";
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
    const element =
      document.querySelector<HTMLElement>(
        selector,
      );

    if (element) {
      return element;
    }
  }

  return null;
}

/* =========================================================
   MARKAIBLE
========================================================= */

function openMarkaibleDirectly() {
  let attempts = 0;

  const tryOpen = () => {
    const widget =
      window.__markaibleWidget;

    if (widget?.open) {
      console.log(
        "[Markaible] Opening voice chatbot directly...",
      );

      widget.open();

      return;
    }

    attempts += 1;

    if (attempts >= 50) {
      console.warn(
        "[Markaible] Widget API was not ready.",
      );

      return;
    }

    window.setTimeout(
      tryOpen,
      100,
    );
  };

  tryOpen();
}

/**
 * Completely remove Markaible.
 *
 * This does more than just close the panel:
 * - closes the widget
 * - removes the widget host
 * - removes the script
 * - removes the widget global
 *
 * So after closing, only our FOSTIIMA toggle remains.
 */
function closeMarkaibleCompletely() {
  console.log(
    "[Markaible] Closing and removing widget...",
  );

  // Close the panel first.
  window.__markaibleWidget?.close?.();

  // Remove the actual Markaible widget host.
  document
    .querySelectorAll<HTMLElement>(
      "[data-markaible-widget]",
    )
    .forEach((host) => {
      host.remove();
    });

  // Remove any Markaible widget script.
  document
    .querySelectorAll<HTMLScriptElement>(
      'script[src="https://www.markaible.com/widget.js"]',
    )
    .forEach((script) => {
      script.remove();
    });

  // Remove our own script ID if present.
  document
    .getElementById(
      "__fostiima-markaible",
    )
    ?.remove();

  // Remove the global widget API.
  delete window.__markaibleWidget;
}

/* =========================================================
   COMPONENT
========================================================= */

export default function ChatbotScript() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [activeBot, setActiveBot] =
    useState<BotType>(null);

  const [extraEdgeReady, setExtraEdgeReady] =
    useState(false);

  const [markaibleReady, setMarkaibleReady] =
    useState(false);

  /* =======================================================
     LOAD EXTRAEDGE
  ======================================================= */

  useEffect(() => {
    let mounted = true;

    const initializeExtraEdge =
      async () => {
        try {
          await loadScript(
            EXTRAEDGE_SCRIPT,
          );

          if (!mounted) {
            return;
          }

          const waitForLauncher = () => {
            const launcher =
              findExtraEdgeLauncher();

            if (launcher) {
              hideThirdPartyLaunchers();

              setExtraEdgeReady(true);

              return;
            }

            window.setTimeout(
              waitForLauncher,
              300,
            );
          };

          waitForLauncher();
        } catch (error) {
          console.error(
            "ExtraaEdge chatbot failed to load:",
            error,
          );
        }
      };

    initializeExtraEdge();

    return () => {
      mounted = false;
    };
  }, []);

  /* =======================================================
     OPEN SELECTED CHATBOT
  ======================================================= */

  useEffect(() => {
    if (!activeBot) {
      hideThirdPartyLaunchers();
      return;
    }

    hideThirdPartyLaunchers();

    /* =====================================================
       EXTRAEDGE CHATBOT
    ===================================================== */

    if (activeBot === "chatbot") {
      const launcher =
        findExtraEdgeLauncher();

      if (launcher) {
        launcher.click();
      } else if (extraEdgeReady) {
        window.setTimeout(() => {
          const retryLauncher =
            findExtraEdgeLauncher();

          if (retryLauncher) {
            retryLauncher.click();
          }
        }, 500);
      }

      return;
    }

    /* =====================================================
       MARKAIBLE VOICE CHATBOT
    ===================================================== */

    if (activeBot === "voice") {
      if (!markaibleReady) {
        loadScript(
          MARKAIBLE_SCRIPT,
          {
            "data-agent":
              MARKAIBLE_AGENT_ID,

            "data-style":
              "peek",

            "data-panel":
              "solid",
          },
        )
          .then(() => {
            console.log(
              "[Markaible] Script loaded.",
            );

            setMarkaibleReady(true);

            hideThirdPartyLaunchers();

            // Open Markaible directly.
            openMarkaibleDirectly();
          })
          .catch((error) => {
            console.error(
              "Markaible voice chatbot failed to load:",
              error,
            );
          });
      } else {
        // Already loaded → open directly.
        openMarkaibleDirectly();
      }
    }
  }, [
    activeBot,
    extraEdgeReady,
    markaibleReady,
  ]);

  /* =======================================================
     HIDE ORIGINAL EXTRAEDGE LAUNCHER
  ======================================================= */

  useEffect(() => {
    hideThirdPartyLaunchers();

    const observer =
      new MutationObserver(() => {
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

  /* =======================================================
     CLOSE
  ======================================================= */

  const closeAll = () => {
    /*
     * If Voice Chatbot is active,
     * completely remove Markaible.
     */
    if (activeBot === "voice") {
      closeMarkaibleCompletely();

      /*
       * Allow the next Voice Chatbot click
       * to load Markaible again.
       */
      setMarkaibleReady(false);
    }

    setActiveBot(null);
    setMenuOpen(false);

    hideThirdPartyLaunchers();
  };

  /* =======================================================
     OPEN BOT
  ======================================================= */

  const openBot = (
    bot: Exclude<BotType, null>,
  ) => {
    setMenuOpen(false);
    setActiveBot(bot);

    hideThirdPartyLaunchers();
  };

  /* =======================================================
     UI
  ======================================================= */

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
              onClick={() =>
                setMenuOpen(false)
              }
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
              onClick={() =>
                openBot("chatbot")
              }
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
              onClick={() =>
                openBot("voice")
              }
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

          setMenuOpen(
            (previous) => !previous,
          );
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