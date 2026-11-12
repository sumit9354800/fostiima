"use client";

// Cloudflare Turnstile widget for the admission enquiry form. Renders nothing
// unless NEXT_PUBLIC_TURNSTILE_SITE_KEY is set at build time. Server-side
// verification lives in src/lib/turnstile.ts.

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

let scriptPromise: Promise<void> | null = null;
function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("Turnstile failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

export type TurnstileHandle = { reset: () => void };

type Props = {
  action: string;
  onToken: (token: string) => void;
  onError?: () => void;
};

const TurnstileWidget = forwardRef<TurnstileHandle, Props>(
  function TurnstileWidget({ action, onToken, onError }, ref) {
    const containerRef = useRef<HTMLDivElement>(null);
    const widgetIdRef = useRef<string | null>(null);
    const callbacks = useRef({ onToken, onError });
    callbacks.current = { onToken, onError };

    useImperativeHandle(ref, () => ({
      reset() {
        callbacks.current.onToken("");
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      },
    }));

    useEffect(() => {
      if (!TURNSTILE_SITE_KEY) return;
      let cancelled = false;

      loadScript()
        .then(() => {
          if (cancelled || !containerRef.current || !window.turnstile) return;
          widgetIdRef.current = window.turnstile.render(containerRef.current, {
            sitekey: TURNSTILE_SITE_KEY,
            action,
            callback: (token: string) => callbacks.current.onToken(token),
            "expired-callback": () => callbacks.current.onToken(""),
            "error-callback": () => {
              callbacks.current.onToken("");
              callbacks.current.onError?.();
            },
          });
        })
        .catch(() => callbacks.current.onError?.());

      return () => {
        cancelled = true;
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
        }
        widgetIdRef.current = null;
      };
    }, [action]);

    if (!TURNSTILE_SITE_KEY) return null;
    return <div ref={containerRef} className="min-h-[65px]" />;
  },
);

export default TurnstileWidget;
