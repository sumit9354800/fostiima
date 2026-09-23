"use client";

import { useState } from "react";
import { MessageCircle, Mic, X } from "lucide-react";

type BotType = "chatbot" | "voice" | null;

const EXTRAEDGE_SCRIPT =
  "https://extraaedgeresources.blob.core.windows.net/documents/fbscrm/Chatbot/js/chat.js";

const MARKAIBLE_SCRIPT =
  "https://www.markaible.com/widget.js";

export default function ChatbotScript() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [activeBot, setActiveBot] = useState<BotType>(null);

  const closeAll = () => {
    setActiveBot(null);
    setMenuOpen(false);
  };

  const openBot = (bot: BotType) => {
    setActiveBot(bot);
    setMenuOpen(false);
  };

  return (
    <>
      {/* CHATBOT WINDOW */}

      {activeBot && (
        <div className="fixed bottom-24 right-5 z-[99998] h-[500px] w-[360px] max-w-[calc(100vw-40px)] overflow-hidden rounded-2xl bg-white shadow-2xl">

          {/* HEADER */}

          <div className="flex h-12 items-center justify-between bg-[#061a3a] px-4 text-white">

            <span className="text-sm font-semibold">
              {activeBot === "chatbot"
                ? "Chat with FOSTIIMA"
                : "FOSTIIMA Voice Assistant"}
            </span>

            <button
              type="button"
              onClick={closeAll}
              aria-label="Close chatbot"
            >
              <X size={20} />
            </button>

          </div>

          {/* ISOLATED CHATBOT */}

          <iframe
            key={activeBot}
            title={
              activeBot === "chatbot"
                ? "FOSTIIMA Chatbot"
                : "FOSTIIMA Voice Chatbot"
            }
            allow="microphone"
            className="h-[calc(100%-48px)] w-full border-0"
            srcDoc={
              activeBot === "chatbot"
                ? `
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                    </head>

                    <body style="margin:0;padding:0;">

                      <script src="${EXTRAEDGE_SCRIPT}"><\/script>

                    </body>
                  </html>
                `
                : `
                  <!DOCTYPE html>
                  <html>
                    <head>
                      <meta name="viewport" content="width=device-width, initial-scale=1">
                    </head>

                    <body style="margin:0;padding:0;">

                      <script
                        src="${MARKAIBLE_SCRIPT}"
                        data-agent="6a9fa7d1dab71eb81cbeb108"
                        data-style="peek"
                        data-panel="solid"
                      ><\/script>

                    </body>
                  </html>
                `
            }
          />

        </div>
      )}

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
              aria-label="Close menu"
            >
              <X size={18} />
            </button>

          </div>

          <div className="space-y-2 p-3">

            {/* CHATBOT */}

            <button
              type="button"
              onClick={() => openBot("chatbot")}
              className="flex w-full items-center gap-3 rounded-xl border p-3 text-left hover:bg-slate-50"
            >

              <MessageCircle
                size={22}
                className="text-[#061a3a]"
              />

              <span className="text-sm font-medium">
                Chatbot
              </span>

            </button>

            {/* VOICE */}

            <button
              type="button"
              onClick={() => openBot("voice")}
              className="flex w-full items-center gap-3 rounded-xl border p-3 text-left hover:bg-slate-50"
            >

              <Mic
                size={22}
                className="text-[#061a3a]"
              />

              <span className="text-sm font-medium">
                Voice Chatbot
              </span>

            </button>

          </div>

        </div>
      )}

      {/* MAIN TOGGLE */}

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