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

export default function FostiimaVoiceChat({
  onBack,
  onClose,
}: {
  onBack: () => void;
  onClose: () => void;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let cancelled = false;
    let pollTimer: number | null = null;

    const openOriginalWidget = () => {
      if (cancelled) {
        return true;
      }

      const widget = window.__markaibleWidget;

      if (widget?.open) {
        widget.open();
        setIsLoading(false);
        setHasError(false);
        return true;
      }

      return false;
    };

    const existingScript = document.getElementById(
      MARKAIBLE_SCRIPT_ID,
    );

    const handleScriptReady = () => {
      if (openOriginalWidget()) {
        return;
      }

      let attempts = 0;

      const poll = () => {
        if (openOriginalWidget()) {
          return;
        }

        attempts += 1;

        if (attempts >= 80) {
          setIsLoading(false);
          setHasError(true);
          return;
        }

        pollTimer = window.setTimeout(poll, 100);
      };

      poll();
    };

    if (window.__markaibleWidget?.open) {
      openOriginalWidget();
    } else if (existingScript) {
      handleScriptReady();
    } else {
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

      script.onload = handleScriptReady;
      script.onerror = () => {
        if (!cancelled) {
          setIsLoading(false);
          setHasError(true);
        }
      };

      document.body.appendChild(script);
    }

    cleanupRef.current = () => {
      if (pollTimer !== null) {
        window.clearTimeout(pollTimer);
      }

      window.__markaibleWidget?.close?.();

      document
        .querySelectorAll<HTMLElement>("[data-markaible-widget]")
        .forEach((host) => host.remove());

      document.getElementById(MARKAIBLE_SCRIPT_ID)?.remove();

      delete window.__markaibleWidget;
    };

    return () => {
      cancelled = true;
      cleanupRef.current?.();
      cleanupRef.current = null;
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[119]"
      aria-hidden="true"
    >
      {(isLoading || hasError) && (
        <div className="pointer-events-auto fixed bottom-5 right-5 w-[min(340px,calc(100vw-24px))] border border-[#dbe3ee] bg-white p-4 shadow-[0_18px_50px_rgba(6,26,58,0.18)]">
          {isLoading ? (
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-[#061a3a] text-white">
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
          ) : (
            <div>
              <p className="text-xs font-bold text-[#061a3a]">
                Voice AI could not be loaded
              </p>
              <p className="mt-1 text-[11px] leading-5 text-slate-500">
                Please try opening Voice Chat again.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
