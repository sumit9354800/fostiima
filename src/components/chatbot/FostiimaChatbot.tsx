"use client";

import { FormEvent, useMemo, useState } from "react";
import { Bot, ChevronDown, Send, UserRound, X } from "lucide-react";

import {
  chatbotQuickQuestions,
  getChatbotAnswer,
} from "@/data/chatbot";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  content: string;
};

const initialMessage: ChatMessage = {
  id: "welcome",
  role: "bot",
  content:
    "Hi! I am the FOSTIIMA Admission Assistant. Ask me about admissions, eligibility, PGDM, academics, placements, internships or contact details.",
};

function createMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export default function FostiimaChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    initialMessage,
  ]);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const submitMessage = (question: string) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: trimmedQuestion,
    };

    const botMessage: ChatMessage = {
      id: createMessageId(),
      role: "bot",
      content: getChatbotAnswer(trimmedQuestion),
    };

    setMessages((current) => [...current, userMessage, botMessage]);
    setInput("");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitMessage(input);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[120]">
      {isOpen && (
        <section
          className="
            absolute
            bottom-[68px]
            right-0
            flex
            h-[min(680px,calc(100vh-110px))]
            w-[min(390px,calc(100vw-32px))]
            flex-col
            overflow-hidden
            border
            border-[#dbe3ee]
            bg-white
            shadow-[0_20px_60px_rgba(6,26,58,0.22)]
          "
          aria-label="FOSTIIMA Admission Assistant"
        >
          <header className="bg-[#061a3a] px-5 py-4 text-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#e5b83f]">
                  FOSTIIMA Business School
                </p>
                <h2 className="mt-1 text-lg font-bold">
                  Admission Assistant
                </h2>
                <p className="mt-1 text-xs leading-5 text-[#b8c5d8]">
                  Ask about admissions, PGDM, academics and placements.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="
                  flex
                  h-8
                  w-8
                  shrink-0
                  items-center
                  justify-center
                  border
                  border-white/15
                  bg-white/5
                  text-white
                  transition-colors
                  hover:bg-[#c31e3b]
                "
                aria-label="Close chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-[#f8fafc] p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {message.role === "bot" && (
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center bg-[#c31e3b] text-white">
                    <Bot className="h-4 w-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] px-3.5 py-3 text-sm leading-6 ${
                    message.role === "user"
                      ? "bg-[#061a3a] text-white"
                      : "border border-[#dbe3ee] bg-white text-slate-700"
                  }`}
                >
                  {message.content}
                </div>

                {message.role === "user" && (
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center bg-[#e5b83f] text-[#061a3a]">
                    <UserRound className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {messages.length === 1 && (
              <div className="grid gap-2 pt-1">
                {chatbotQuickQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    onClick={() => submitMessage(question)}
                    className="
                      border
                      border-[#dbe3ee]
                      bg-white
                      px-3
                      py-2.5
                      text-left
                      text-xs
                      font-medium
                      text-[#061a3a]
                      transition-colors
                      hover:border-[#c31e3b]
                      hover:text-[#c31e3b]
                    "
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-[#dbe3ee] bg-white p-3"
          >
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask your question..."
                className="
                  min-w-0
                  flex-1
                  border
                  border-[#dbe3ee]
                  bg-[#f8fafc]
                  px-3
                  py-3
                  text-sm
                  text-slate-800
                  outline-none
                  placeholder:text-slate-400
                  focus:border-[#c31e3b]
                "
                aria-label="Ask FOSTIIMA a question"
              />

              <button
                type="submit"
                disabled={!canSend}
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  bg-[#c31e3b]
                  text-white
                  transition
                  hover:bg-[#a91731]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
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
          active:scale-95
          focus:outline-none
          focus:ring-2
          focus:ring-[#c31e3b]
          focus:ring-offset-2
          sm:h-14
          sm:w-14
        "
        aria-label={
          isOpen
            ? "Close FOSTIIMA Admission Assistant"
            : "Open FOSTIIMA Admission Assistant"
        }
        title="Chat with FOSTIIMA"
      >
        {isOpen ? (
          <ChevronDown className="h-5 w-5" />
        ) : (
          <Bot className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
