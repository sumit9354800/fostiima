"use client";

import React, { useState } from "react";
import { Bot, MessageCircle, Mic, X } from "lucide-react";

import FostiimaChatbot from "@/components/chatbot/FostiimaChatbot";
import FostiimaVoiceChat from "@/components/chatbot/FostiimaVoiceChat";

type ChatMode = "selector" | "chat" | "voice";

export default function ChatAssistant() {
  const [mode, setMode] = useState<ChatMode>("selector");

  const close = () => setMode("selector");

  if (mode === "chat") {
    return (
      <FostiimaChatbot
        onBack={() => setMode("selector")}
        onClose={close}
      />
    );
  }

  if (mode === "voice") {
    return (
      <FostiimaVoiceChat
        onBack={() => setMode("selector")}
        onClose={close}
      />
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-120">
      <div className="mb-3 grid w-[min(360px,calc(100vw-24px))] gap-2">
        <button
          type="button"
          onClick={() => setMode("chat")}
          className="
            group
            flex
            items-center
            gap-3
            border
            border-[#dbe3ee]
            bg-white
            p-3
            text-left
            shadow-[0_16px_45px_rgba(6,26,58,0.16)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-[#c31e3b]
          "
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#c31e3b] text-white">
            <MessageCircle className="h-5 w-5" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-[#061a3a]">
              Chat AI
            </span>
            <span className="mt-0.5 block text-[11px] leading-4 text-slate-500">
              Ask questions about FOSTIIMA, admissions and PGDM.
            </span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setMode("voice")}
          className="
            group
            flex
            items-center
            gap-3
            border
            border-[#dbe3ee]
            bg-white
            p-3
            text-left
            shadow-[0_16px_45px_rgba(6,26,58,0.16)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-[#061a3a]
          "
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#061a3a] text-white">
            <Mic className="h-5 w-5" />
          </span>

          <span className="min-w-0 flex-1">
            <span className="block text-sm font-bold text-[#061a3a]">
              Voice Chat
            </span>
            <span className="mt-0.5 block text-[11px] leading-4 text-slate-500">
              Speak naturally and hear the answer.
            </span>
          </span>
        </button>
      </div>

      <button
        type="button"
        onClick={close}
        className="
          ml-auto
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
          active:scale-95
          focus:outline-none
          focus:ring-2
          focus:ring-[#c31e3b]
          focus:ring-offset-2
          sm:h-14
          sm:w-14
        "
        aria-label="Close chat options"
        title="Close chat options"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
