"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  Bot,
  Check,
  ChevronDown,
  Copy,
  Mail,
  Phone,
  RotateCcw,
  Send,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  UserRound,
  X,
} from "lucide-react";

import {
  chatbotFaqs,
  chatbotQuickQuestions,
  getChatbotAnswer,
} from "@/data/chatbot";

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  content: string;
  time: string;
};

type EnquiryForm = {
  name: string;
  phone: string;
  email: string;
  programme: string;
  message: string;
};

const initialForm: EnquiryForm = {
  name: "",
  phone: "",
  email: "",
  programme: "PGDM",
  message: "",
};

const initialMessage: ChatMessage = {
  id: "welcome",
  role: "bot",
  content:
    "Hi! I am the FOSTIIMA Admission Assistant. I can help you understand admissions, eligibility, entrance exams, PGDM, academics, placements, internships and contact details.",
  time: "Just now",
};

const topicSuggestions = [
  "Admissions",
  "PGDM Eligibility",
  "Entrance Exams",
  "Placements",
  "Internships",
  "Faculty",
];

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function currentTime() {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

function messageForTopic(topic: string) {
  const map: Record<string, string> = {
    Admissions: "How do I apply?",
    "PGDM Eligibility": "What is the PGDM eligibility?",
    "Entrance Exams": "Which entrance exams are accepted?",
    Placements: "Tell me about placements",
    Internships: "Tell me about summer internships",
    Faculty: "Tell me about the faculty",
  };

  return map[topic] ?? topic;
}

function getRelatedQuestions(answer: string) {
  const source = chatbotFaqs.find((faq) =>
    answer.toLowerCase().includes(faq.answer.toLowerCase().slice(0, 28)),
  );

  if (!source) {
    return chatbotQuickQuestions.slice(0, 3);
  }

  return chatbotFaqs
    .filter((faq) => faq.id !== source.id)
    .filter((faq) =>
      faq.keywords.some((keyword) =>
        source.keywords.some(
          (sourceKeyword) =>
            keyword.toLowerCase() === sourceKeyword.toLowerCase(),
        ),
      ),
    )
    .slice(0, 3)
    .map((faq) => faq.question);
}

export default function FostiimaChatbot({
  onBack,
  onClose,
}: {
  onBack: () => void;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    initialMessage,
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(
    null,
  );
  const [feedback, setFeedback] = useState<
    Record<string, "up" | "down">
  >({});
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState<EnquiryForm>(initialForm);
  const [enquiryError, setEnquiryError] = useState("");
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  const canSend = useMemo(() => input.trim().length > 0, [input]);

  const sendMessage = (value: string) => {
    const question = value.trim();

    if (!question || isTyping) {
      return;
    }

    const userMessage: ChatMessage = {
      id: createId(),
      role: "user",
      content: question,
      time: currentTime(),
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    const answer = getChatbotAnswer(question);
    const botMessage: ChatMessage = {
      id: createId(),
      role: "bot",
      content: answer,
      time: currentTime(),
    };

    window.setTimeout(() => {
      setMessages((current) => [...current, botMessage]);
      setIsTyping(false);
    }, 450);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  const startNewChat = () => {
    setMessages([initialMessage]);
    setInput("");
    setIsTyping(false);
    setFeedback({});
    setCopiedMessageId(null);
    setIsEnquiryOpen(false);
    setEnquiryForm(initialForm);
    setEnquiryError("");
    setEnquirySubmitted(false);
  };

  const handleEnquirySubmit = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const name = enquiryForm.name.trim();
    const phone = enquiryForm.phone.replace(/\D/g, "");
    const email = enquiryForm.email.trim();
    const programme = enquiryForm.programme.trim();
    const message = enquiryForm.message.trim();

    if (!name) {
      setEnquiryError("Please enter your full name.");
      return;
    }

    if (phone.length !== 10) {
      setEnquiryError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEnquiryError("Please enter a valid email address.");
      return;
    }

    setEnquiryError("");

    const enquiryText = [
      "Hello FOSTIIMA Business School, I would like to make an admission enquiry.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Programme: ${programme}`,
      message ? `Message: ${message}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/917678389436?text=${encodeURIComponent(
        enquiryText,
      )}`,
      "_blank",
      "noopener,noreferrer",
    );

    setEnquirySubmitted(true);
  };

  const resetEnquiry = () => {
    setEnquiryForm(initialForm);
    setEnquiryError("");
    setEnquirySubmitted(false);
  };

  const copyMessage = async (message: ChatMessage) => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedMessageId(message.id);

      window.setTimeout(() => {
        setCopiedMessageId((current) =>
          current === message.id ? null : current,
        );
      }, 1400);
    } catch {
      setCopiedMessageId(null);
    }
  };

  const relatedQuestions = getRelatedQuestions(
    messages[messages.length - 1]?.content ?? "",
  );

  return (
    <section
      className="
        fixed
        bottom-5
        right-5
        z-[120]
        flex
        h-[min(720px,calc(100vh-40px))]
        w-[min(430px,calc(100vw-24px))]
        flex-col
        overflow-hidden
        border
        border-[#dbe3ee]
        bg-white
        shadow-[0_24px_70px_rgba(6,26,58,0.24)]
      "
      aria-label="FOSTIIMA AI Chat"
    >
      <header className="bg-[#061a3a] px-5 py-4 text-white">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#c31e3b]">
              <Bot className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-sm font-bold">
                  FOSTIIMA AI Assistant
                </h2>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Online
                </span>
              </div>

              <p className="mt-1 text-[11px] leading-4 text-[#b8c5d8]">
                Admissions, PGDM, academics, placements and more.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              onClick={onBack}
              className="flex h-8 w-8 items-center justify-center text-[#b8c5d8] transition hover:bg-white/10 hover:text-white"
              aria-label="Back to chat options"
              title="Back"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={startNewChat}
              className="flex h-8 items-center gap-1.5 border border-white/10 bg-white/5 px-2.5 text-[10px] font-bold uppercase tracking-wide text-white transition hover:bg-white/10"
              title="Start a new chat"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              New Chat
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center text-[#b8c5d8] transition hover:bg-[#c31e3b] hover:text-white"
              aria-label="Close chatbot"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto border-b border-[#dbe3ee] bg-white px-4 py-2.5">
        {topicSuggestions.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => sendMessage(messageForTopic(topic))}
            disabled={isTyping}
            className="
              shrink-0
              border
              border-[#dbe3ee]
              bg-[#f8fafc]
              px-3
              py-1.5
              text-[10px]
              font-bold
              text-[#061a3a]
              transition
              hover:border-[#c31e3b]
              hover:text-[#c31e3b]
              disabled:opacity-50
            "
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto bg-[#f8fafc] p-4">
        {isEnquiryOpen && (
          <div className="border border-[#dbe3ee] bg-white p-4 shadow-sm">
            <div className="mb-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#c31e3b]">
                Admission Enquiry
              </p>
              <h3 className="mt-1 text-sm font-bold text-[#061a3a]">
                Request a Callback
              </h3>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Share your details and connect with FOSTIIMA Admissions on
                WhatsApp.
              </p>
            </div>

            {enquirySubmitted ? (
              <div className="border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-800">
                  Enquiry prepared successfully.
                </p>
                <p className="mt-1 text-xs leading-5 text-emerald-700">
                  WhatsApp has been opened with your enquiry details.
                </p>
                <button
                  type="button"
                  onClick={resetEnquiry}
                  className="mt-3 text-xs font-bold text-[#c31e3b] underline underline-offset-2"
                >
                  Submit another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="grid gap-3">
                <label className="grid gap-1">
                  <span className="text-[11px] font-semibold text-slate-600">
                    Full Name *
                  </span>
                  <input
                    required
                    value={enquiryForm.name}
                    onChange={(event) =>
                      setEnquiryForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    className="w-full border border-[#dbe3ee] bg-[#f8fafc] px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#c31e3b]"
                    placeholder="Enter your full name"
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-[11px] font-semibold text-slate-600">
                    Phone Number *
                  </span>
                  <input
                    required
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={enquiryForm.phone}
                    onChange={(event) =>
                      setEnquiryForm((current) => ({
                        ...current,
                        phone: event.target.value.replace(/\\D/g, "").slice(0, 10),
                      }))
                    }
                    className="w-full border border-[#dbe3ee] bg-[#f8fafc] px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#c31e3b]"
                    placeholder="10-digit mobile number"
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-[11px] font-semibold text-slate-600">
                    Email *
                  </span>
                  <input
                    required
                    type="email"
                    value={enquiryForm.email}
                    onChange={(event) =>
                      setEnquiryForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className="w-full border border-[#dbe3ee] bg-[#f8fafc] px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#c31e3b]"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="grid gap-1">
                  <span className="text-[11px] font-semibold text-slate-600">
                    Programme
                  </span>
                  <select
                    value={enquiryForm.programme}
                    onChange={(event) =>
                      setEnquiryForm((current) => ({
                        ...current,
                        programme: event.target.value,
                      }))
                    }
                    className="w-full border border-[#dbe3ee] bg-[#f8fafc] px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#c31e3b]"
                  >
                    <option value="PGDM">PGDM</option>
                    <option value="General Admission Enquiry">
                      General Admission Enquiry
                    </option>
                  </select>
                </label>

                <label className="grid gap-1">
                  <span className="text-[11px] font-semibold text-slate-600">
                    Message
                  </span>
                  <textarea
                    rows={3}
                    value={enquiryForm.message}
                    onChange={(event) =>
                      setEnquiryForm((current) => ({
                        ...current,
                        message: event.target.value,
                      }))
                    }
                    className="w-full resize-none border border-[#dbe3ee] bg-[#f8fafc] px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#c31e3b]"
                    placeholder="What would you like to know?"
                  />
                </label>

                {enquiryError && (
                  <p className="text-xs font-medium text-[#c31e3b]">
                    {enquiryError}
                  </p>
                )}

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-[#c31e3b] px-4 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#a91731]"
                >
                  <Mail className="h-4 w-4" />
                  Continue to WhatsApp
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsEnquiryOpen(false);
                    setEnquiryError("");
                  }}
                  className="text-xs font-semibold text-slate-500 underline underline-offset-2 hover:text-[#061a3a]"
                >
                  Back to chat
                </button>
              </form>
            )}
          </div>
        )}

        {!isEnquiryOpen && messages.map((message, index) => {
          const isBot = message.role === "bot";
          const isLastBot = isBot && index === messages.length - 1;

          return (
            <div
              key={message.id}
              className={`flex gap-2.5 ${
                isBot ? "justify-start" : "justify-end"
              }`}
            >
              {isBot && (
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center bg-[#c31e3b] text-white">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              <div className="max-w-[84%]">
                <div
                  className={`px-3.5 py-3 text-sm leading-6 ${
                    isBot
                      ? "border border-[#dbe3ee] bg-white text-slate-700"
                      : "bg-[#061a3a] text-white"
                  }`}
                >
                  {message.content}
                </div>

                <div
                  className={`mt-1 flex items-center gap-2 text-[9px] text-slate-400 ${
                    isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <span>{message.time}</span>

                  {isBot && (
                    <>
                      <button
                        type="button"
                        onClick={() => copyMessage(message)}
                        className="transition hover:text-[#061a3a]"
                        title="Copy answer"
                        aria-label="Copy answer"
                      >
                        {copiedMessageId === message.id ? (
                          <Check className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setFeedback((current) => ({
                            ...current,
                            [message.id]: "up",
                          }))
                        }
                        className={`transition ${
                          feedback[message.id] === "up"
                            ? "text-emerald-600"
                            : "hover:text-[#061a3a]"
                        }`}
                        title="Helpful"
                        aria-label="Helpful"
                      >
                        <ThumbsUp className="h-3 w-3" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setFeedback((current) => ({
                            ...current,
                            [message.id]: "down",
                          }))
                        }
                        className={`transition ${
                          feedback[message.id] === "down"
                            ? "text-[#c31e3b]"
                            : "hover:text-[#061a3a]"
                        }`}
                        title="Not helpful"
                        aria-label="Not helpful"
                      >
                        <ThumbsDown className="h-3 w-3" />
                      </button>
                    </>
                  )}
                </div>

                {isLastBot && !isTyping && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {relatedQuestions.map((question) => (
                      <button
                        key={question}
                        type="button"
                        onClick={() => sendMessage(question)}
                        className="border border-[#dbe3ee] bg-white px-2.5 py-1.5 text-[10px] font-medium text-slate-600 transition hover:border-[#c31e3b] hover:text-[#c31e3b]"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {!isBot && (
                <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center bg-[#e5b83f] text-[#061a3a]">
                  <UserRound className="h-4 w-4" />
                </div>
              )}
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-start gap-2.5">
            <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center bg-[#c31e3b] text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="border border-[#dbe3ee] bg-white px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
              </div>
            </div>
          </div>
        )}
      </div>

      {!isEnquiryOpen && (
        <div className="border-t border-[#dbe3ee] bg-white px-3 pt-3">
          <button
            type="button"
            onClick={() => {
              setIsEnquiryOpen(true);
              setEnquirySubmitted(false);
              setEnquiryError("");
            }}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              border
              border-[#c31e3b]
              bg-white
              px-3
              py-2.5
              text-[11px]
              font-bold
              uppercase
              tracking-wide
              text-[#c31e3b]
              transition
              hover:bg-[#c31e3b]
              hover:text-white
            "
          >
            <Phone className="h-3.5 w-3.5" />
            Admission Enquiry
          </button>
        </div>
      )}

      {!isEnquiryOpen && (
        <form
          onSubmit={handleSubmit}
          className="border-t border-[#dbe3ee] bg-white p-3"
        >
        <div className="flex items-end gap-2">
          <textarea
            rows={1}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ask anything about FOSTIIMA..."
            className="
              max-h-28
              min-h-11
              min-w-0
              flex-1
              resize-none
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
            disabled={!canSend || isTyping}
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

        <p className="mt-2 text-[9px] leading-4 text-slate-400">
          Use Shift + Enter for a new line. For official admission confirmation,
          contact FOSTIIMA Admissions.
        </p>
      </form>
      )}
    </section>
  );
}
