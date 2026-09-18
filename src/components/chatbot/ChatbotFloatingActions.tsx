"use client";

import { useState } from "react";
import {
  Bot,
  MessageCircle,
  Mic,
  X,
} from "lucide-react";

import FostiimaChatbot from "./FostiimaChatbot";
import FostiimaVoiceChat from "./FostiimaVoiceChat";

type AssistantMode = "none" | "chat" | "voice";

export default function ChatbotFloatingActions() {
  const [isOptionsOpen, setIsOptionsOpen] =
    useState(false);

  const [assistantMode, setAssistantMode] =
    useState<AssistantMode>("none");

  const isAssistantActive =
    assistantMode !== "none";

  const openOptions = () => {
    if (isAssistantActive) {
      return;
    }

    setIsOptionsOpen((current) => !current);
  };

  const openChat = () => {
    setIsOptionsOpen(false);
    setAssistantMode("chat");
  };

  const openVoice = () => {
    setIsOptionsOpen(false);
    setAssistantMode("voice");
  };

  const closeAssistant = () => {
    setAssistantMode("none");
    setIsOptionsOpen(false);
  };

  return (
    <>
      {/* =====================================================
          CHATBOT CONTROLLER
      ====================================================== */}

      <div className="fixed bottom-5 right-5 z-[2147482000] h-14 w-14">

        {/* =================================================
            VOICE CHAT OPTION
        ================================================== */}

        <button
          type="button"
          onClick={openVoice}
          aria-label="Open Voice Chat"
          title="Voice Chat"
          className={`
            absolute
            bottom-0
            right-0
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-white
            bg-[#061a3a]
            text-white
            shadow-[0_10px_30px_rgba(6,26,58,0.28)]
            transition-all
            duration-300
            ease-in-out
            ${
              isOptionsOpen && !isAssistantActive
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-0 opacity-0"
            }
          `}
        >
          <Mic className="h-6 w-6" />
        </button>


        {/* =================================================
            CHAT AI OPTION
        ================================================== */}

        <button
          type="button"
          onClick={openChat}
          aria-label="Open Chat AI"
          title="Chat AI"
          className={`
            absolute
            bottom-0
            right-0
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-white
            bg-[#c31e3b]
            text-white
            shadow-[0_10px_30px_rgba(6,26,58,0.28)]
            transition-all
            duration-300
            ease-in-out
            ${
              isOptionsOpen && !isAssistantActive
                ? "-translate-y-[68px] opacity-100"
                : "pointer-events-none translate-y-0 opacity-0"
            }
          `}
        >
          <MessageCircle className="h-6 w-6" />
        </button>


        {/* =================================================
            MAIN TOGGLE
        ================================================== */}

        <button
          type="button"
          onClick={() => {
            if (isAssistantActive) {
              closeAssistant();
              return;
            }

            openOptions();
          }}
          aria-label={
            isAssistantActive || isOptionsOpen
              ? "Close AI assistant"
              : "Open AI assistant options"
          }
          aria-expanded={
            isAssistantActive || isOptionsOpen
          }
          title="AI Assistant"
          className={`
            absolute
            bottom-0
            right-0
            z-30
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            border
            border-white
            bg-[#e5b83f]
            text-[#061a3a]
            shadow-[0_10px_30px_rgba(6,26,58,0.32)]
            transition-transform
            duration-300
            ease-in-out
            ${
              isOptionsOpen || isAssistantActive
                ? "-translate-y-[136px]"
                : "translate-y-0"
            }
          `}
        >
          {isOptionsOpen || isAssistantActive ? (
            <X className="h-6 w-6" />
          ) : (
            <Bot className="h-6 w-6" />
          )}
        </button>
      </div>


      {/* =====================================================
          EXTRAEDGE CHATBOT
      ====================================================== */}

      <FostiimaChatbot
        isOpen={assistantMode === "chat"}
      />


      {/* =====================================================
          MARKAIBLE VOICE CHAT
      ====================================================== */}

      <FostiimaVoiceChat
        isOpen={assistantMode === "voice"}
      />
    </>
  );
}