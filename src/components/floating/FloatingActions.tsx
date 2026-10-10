/* eslint-disable react-hooks/set-state-in-effect */

"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Download, FileText, PhoneCall, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "917678389436";
const WHATSAPP_MESSAGE = "Hello FOSTIIMA Business School, I would like to know more about the PGDM/MBA programmes.";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

type PopupType = "apply" | "callback" | "brochure";

type FormConfig = {
  title: string;
  containerId: string;
  scriptUrl: string;
};

const FORMS: Record<PopupType, FormConfig> = {
  apply: {
    title: "Apply Online",
    containerId: "ee-form-2",
    scriptUrl: "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/fbscrm/ee-form-widget/form-2/widget.js",
  },
  callback: {
    title: "Request a Call Back",
    containerId: "ee-form-5",
    scriptUrl: "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/fbscrm/ee-form-widget/form-5/widget.js",
  },
  brochure: {
    title: "Download Brochure",
    containerId: "ee-form-6",
    scriptUrl: "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/fbscrm/ee-form-widget/form-6/widget.js",
  },
};

declare global {
  interface Window {
    jQuery?: unknown;
    $?: unknown;
  }
}

let jqueryLoading: Promise<void> | null = null;
const loadedWidgetScripts = new Set<string>();
const widgetLoading = new Map<string, Promise<void>>();

function ensureJQuery(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Browser environment required."));
  }

  if (window.jQuery && window.$) {
    return Promise.resolve();
  }

  if (jqueryLoading) return jqueryLoading;

  jqueryLoading = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("[data-fostiima-jquery]");

    const checkLoaded = () => {
      if (window.jQuery && window.$) resolve();
      else reject(new Error("jQuery loaded, but the $ global is unavailable."));
    };

    if (existing) {
      if (existing.dataset.loaded === "true") {
        checkLoaded();
      } else {
        existing.addEventListener("load", checkLoaded, { once: true });
        existing.addEventListener("error", () => reject(new Error("jQuery failed to load.")), { once: true });
      }
      return;
    }

    const script = document.createElement("script");
    script.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    script.async = true;
    script.dataset.fostiimaJquery = "true";
    script.onload = () => {
      script.dataset.loaded = "true";
      checkLoaded();
    };
    script.onerror = () => reject(new Error("Could not load jQuery."));
    document.head.appendChild(script);
  }).catch((error) => {
    jqueryLoading = null;
    throw error;
  });

  return jqueryLoading;
}

function ensureWidgetScript(url: string): Promise<void> {
  if (loadedWidgetScripts.has(url)) return Promise.resolve();

  const pending = widgetLoading.get(url);
  if (pending) return pending;

  const promise = new Promise<void>((resolve, reject) => {
    const existing = Array.from(document.querySelectorAll<HTMLScriptElement>("script[src]")).find((script) => script.src === url);

    if (existing) {
      existing.addEventListener("load", () => {
        loadedWidgetScripts.add(url);
        resolve();
      }, { once: true });

      existing.addEventListener("error", () => reject(new Error(`Widget failed to load: ${url}`)), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = url;
    script.async = true;
    script.onload = () => {
      loadedWidgetScripts.add(url);
      resolve();
    };
    script.onerror = () => reject(new Error(`Widget failed to load: ${url}`));
    document.head.appendChild(script);
  });

  widgetLoading.set(url, promise);
  promise.catch(() => widgetLoading.delete(url));

  return promise;
}

async function initializeForm(config: FormConfig, isCancelled: () => boolean): Promise<void> {
  await ensureJQuery();
  if (isCancelled()) return;

  const container = document.getElementById(config.containerId);
  if (!container) throw new Error(`Missing form container: ${config.containerId}`);

  await ensureWidgetScript(config.scriptUrl);
  if (isCancelled() || !container.isConnected) return;

  // Retains the initialization pattern used by the existing Form 4 integration.
  window.dispatchEvent(new Event("DOMContentLoaded"));

  await new Promise<void>((resolve, reject) => {
    const hasContent = () => container.childElementCount > 0 || Boolean(container.querySelector("iframe, form"));

    if (hasContent()) {
      resolve();
      return;
    }

    const observer = new MutationObserver(() => {
      if (isCancelled()) {
        observer.disconnect();
        window.clearTimeout(timeout);
        resolve();
        return;
      }

      if (hasContent()) {
        observer.disconnect();
        window.clearTimeout(timeout);
        resolve();
      }
    });

    const timeout = window.setTimeout(() => {
      observer.disconnect();
      if (isCancelled()) resolve();
      else reject(new Error(`Form did not appear inside #${config.containerId}.`));
    }, 15000);

    observer.observe(container, { childList: true, subtree: true });
  });
}

export default function FloatingActions() {
  const [activePopup, setActivePopup] = useState<PopupType | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!activePopup) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActivePopup(null);
    };

    document.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = oldOverflow;
      document.removeEventListener("keydown", handleKey);
    };
  }, [activePopup]);

  const config = activePopup ? FORMS[activePopup] : null;

  const actionClass = "flex h-14 w-14 flex-col items-center justify-center gap-1 border-b border-slate-200 text-[8px] font-bold uppercase transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#c31e3b]";

  return (
    <>
      <div className="fixed right-3 top-1/2 z-[80] flex -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg sm:right-5">
        <button type="button" onClick={() => setActivePopup("brochure")} className={`${actionClass} bg-white text-[#152d58] hover:bg-[#c31e3b] hover:text-white`} aria-label="Download Brochure">
          <Download size={18} />
          Brochure
        </button>
        <button type="button" onClick={() => setActivePopup("apply")} className={`${actionClass} bg-[#c31e3b] text-white hover:bg-[#a91731]`} aria-label="Apply Online">
          <FileText size={18} />
          Apply
        </button>
        <button type="button" onClick={() => setActivePopup("callback")} className={`${actionClass} bg-white text-[#152d58] hover:bg-[#c31e3b] hover:text-white`} aria-label="Request a Call Back">
          <PhoneCall size={18} />
          Callback
        </button>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${actionClass} border-0 bg-white text-[#25D366] hover:bg-[#25D366] hover:text-white`} aria-label="Contact us on WhatsApp">
          <FaWhatsapp size={20} />
          WhatsApp
        </a>
      </div>

      {mounted && config && createPortal(
        <ExtraaEdgePopup key={config.containerId} config={config} onClose={() => setActivePopup(null)} />,
        document.body,
      )}
    </>
  );
}

function ExtraaEdgePopup({ config, onClose }: { config: FormConfig; onClose: () => void }) {
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;

    initializeForm(config, () => cancelled)
      .then(() => {
        if (!cancelled) setStatus("ready");
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        console.error("ExtraaEdge form initialization failed:", error);
        setStatus("error");
      });

    return () => {
      cancelled = true;
      const container = document.getElementById(config.containerId);
      container?.replaceChildren();
    };
  }, [config]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/65 p-3 backdrop-blur-sm sm:p-5" role="dialog" aria-modal="true" aria-label={config.title} onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <div className="my-auto flex max-h-[92dvh] w-full max-w-[520px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex shrink-0 items-center justify-between bg-[#123b79] px-5 py-4">
          <h2 className="text-lg font-bold text-white">{config.title}</h2>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close popup">
            <X size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white p-3 sm:p-5">
          {status === "loading" && <p className="py-8 text-center text-sm text-slate-500">Loading form...</p>}

          {status === "error" && (
            <div className="py-8 text-center">
              <p className="font-semibold text-slate-800">Form load nahi ho paya.</p>
              <p className="mt-2 text-sm text-slate-500">ExtraaEdge widget ya network connection check karein.</p>
              <button type="button" onClick={onClose} className="mt-4 rounded-lg bg-[#123b79] px-4 py-2 font-semibold text-white">Close</button>
            </div>
          )}

          <div id={config.containerId} className="w-full min-w-0" style={{ display: status === "error" ? "none" : "block" }} />
        </div>
      </div>
    </div>
  );
}
