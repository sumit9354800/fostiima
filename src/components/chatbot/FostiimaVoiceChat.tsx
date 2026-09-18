"use client";

import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";

const MARKAIBLE_SCRIPT_ID = "markaible-fostiima-voice-widget";

const MARKAIBLE_SCRIPT =
  "https://www.markaible.com/widget.js";

declare global {
  interface Window {
    __markaibleWidget?: {
      agent?: string;
      style?: string;
      panel?: string;
      open?: () => void;
      close?: () => void;
    };
  }
}

type FostiimaVoiceChatProps = {
  isOpen: boolean;
};

export default function FostiimaVoiceChat({
  isOpen,
}: FostiimaVoiceChatProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const initializedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let pollTimer: number | null = null;

    if (!isOpen) {
      window.__markaibleWidget?.close?.();

      return;
    }

    const openWidget = () => {
      if (cancelled) {
        return true;
      }

      if (window.__markaibleWidget?.open) {
        window.__markaibleWidget.open();

        setIsLoading(false);
        setHasError(false);

        return true;
      }

      return false;
    };

    const startPolling = () => {
      let attempts = 0;

      const poll = () => {
        if (openWidget()) {
          return;
        }

        attempts += 1;

        if (attempts >= 100) {
          if (!cancelled) {
            setIsLoading(false);
            setHasError(true);
          }

          return;
        }

        pollTimer = window.setTimeout(poll, 100);
      };

      poll();
    };

    const existingScript = document.getElementById(
      MARKAIBLE_SCRIPT_ID,
    );

    if (window.__markaibleWidget?.open) {
      openWidget();

      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    setHasError(false);

    if (existingScript) {
      startPolling();

      return;
    }

    const script = document.createElement("script");

    script.id = MARKAIBLE_SCRIPT_ID;
    script.src = MARKAIBLE_SCRIPT;
    script.async = true;

    script.setAttribute(
      "data-agent",
      "6a9fa7d1dab71eb81cbeb108",
    );

    script.setAttribute("data-style", "peek");
    script.setAttribute("data-panel", "solid");

    script.onload = () => {
      if (cancelled) {
        return;
      }

      initializedRef.current = true;

      if (!openWidget()) {
        startPolling();
      }
    };

    script.onerror = () => {
      if (cancelled) {
        return;
      }

      setIsLoading(false);
      setHasError(true);
    };

    document.body.appendChild(script);

    return () => {
      cancelled = true;

      if (pollTimer !== null) {
        window.clearTimeout(pollTimer);
      }

      window.__markaibleWidget?.close?.();
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  if (hasError) {
    return (
      <div className="pointer-events-none fixed inset-0 z-[119]">
        <div className="pointer-events-auto fixed bottom-5 right-5 w-[min(340px,calc(100vw-24px))] border border-[#dbe3ee] bg-white p-4 shadow-[0_18px_50px_rgba(6,26,58,0.18)]">
          <p className="text-xs font-bold text-[#061a3a]">
            Voice AI could not be loaded
          </p>

          <p className="mt-1 text-[11px] leading-5 text-slate-500">
            Please try opening Voice Chat again.
          </p>
        </div>
      </div>
    );
  }

  if (!isLoading) {
    return null;
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-[119]">
      <div className="pointer-events-auto fixed bottom-5 right-5 flex w-[min(340px,calc(100vw-24px))] items-center gap-3 border border-[#dbe3ee] bg-white p-4 shadow-[0_18px_50px_rgba(6,26,58,0.18)]">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#061a3a] text-white">
          <LoaderCircle className="h-5 w-5 animate-spin" />
        </div>

        <div>
          <p className="text-xs font-bold text-[#061a3a]">
            Starting Voice AI
          </p>

          <p className="mt-1 text-[11px] text-slate-500">
            Connecting to the FOSTIIMA voice assistant...
          </p>
        </div>
      </div>
    </div>
  );
}