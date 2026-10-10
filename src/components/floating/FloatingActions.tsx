"use client";

import { useEffect, useRef, useState } from "react";
import { Download, FileText, PhoneCall, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "917678389436";

const WHATSAPP_MESSAGE =
  "Hello FOSTIIMA Business School, I would like to know more about the PGDM/MBA programmes.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE,
)}`;

type FormKey = "apply" | "callback" | "brochure";
type PopupType = FormKey | null;

const FORMS: Record<
  FormKey,
  { title: string; scriptUrl: string; containerId: string }
> = {
  apply: {
    title: "Apply Online",
    scriptUrl:
      "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/fbscrm/ee-form-widget/form-2/widget.js",
    containerId: "ee-form-2",
  },
  callback: {
    title: "Request a Call Back",
    scriptUrl:
      "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/fbscrm/ee-form-widget/form-5/widget.js",
    containerId: "ee-form-5",
  },
  brochure: {
    title: "Download Brochure",
    scriptUrl:
      "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/fbscrm/ee-form-widget/form-6/widget.js",
    containerId: "ee-form-6",
  },
};

const FORM_KEYS = Object.keys(FORMS) as FormKey[];
const AUTO_OPEN_KEY = "fostiima_apply_popup_shown";

function loadScript(src: string): Promise<void> {
  return new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${src}"]`,
    );
    if (existing) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      console.error(`Failed to load ExtraaEdge widget: ${src}`);
      resolve();
    };
    document.body.appendChild(script);
  });
}

function ensureJquery(): Promise<void> {
  const w = window as unknown as { jQuery?: unknown; $?: unknown };
  if (w.jQuery && w.$) return Promise.resolve();
  return loadScript("https://code.jquery.com/jquery-3.7.1.min.js");
}

export default function FloatingActions() {
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = () => setActivePopup(null);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = activePopup ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activePopup]);

  /* Escape to close */
  useEffect(() => {
    if (!activePopup) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [activePopup]);

  /* Initialise each widget ONCE, the first time its popup is opened.
     Containers are always mounted and visible at that moment, and widgets
     are initialised one after another (no jQuery / script race). */
  const initializedRef = useRef<Set<FormKey>>(new Set());
  const queueRef = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    if (!activePopup) return;
    const key = activePopup;
    if (initializedRef.current.has(key)) return;
    initializedRef.current.add(key);

    queueRef.current = queueRef.current.then(async () => {
      try {
        await ensureJquery();
        await loadScript(FORMS[key].scriptUrl);
        // wait for the modal to be painted before the widget looks for it
        await new Promise<void>((r) => requestAnimationFrame(() => r()));
        window.dispatchEvent(new Event("DOMContentLoaded"));
      } catch (err) {
        console.error("ExtraaEdge widget init failed", err);
        initializedRef.current.delete(key); // allow retry on next open
      }
    });
  }, [activePopup]);

  /* Safety net: if the widget ever appends a form directly to <body>
     (below the footer), remove it. Real forms live only inside our modal. */
  useEffect(() => {
    const isStray = (node: Node) =>
      node instanceof HTMLElement &&
      /^ee-form-/.test(node.id) &&
      !rootRef.current?.contains(node);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (isStray(node)) (node as HTMLElement).remove();
        });
      }
    });

    observer.observe(document.body, { childList: true });
    return () => observer.disconnect();
  }, []);

  /* Auto-open apply popup once per session */
  useEffect(() => {
    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(AUTO_OPEN_KEY) === "1";
    } catch {
      /* ignore */
    }
    if (alreadyShown) return;

    const timer = window.setTimeout(() => {
      setActivePopup((current) => current ?? "apply");
      try {
        sessionStorage.setItem(AUTO_OPEN_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        #ee-form-2,
        #ee-form-5,
        #ee-form-6 {
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        #ee-form-2 {
          min-height: 0 !important;
          height: auto !important;
          overflow: hidden !important;
        }

        #ee-form-2 iframe {
          display: block !important;
          width: 100% !important;
          height: 430px !important;
          min-height: 430px !important;
          max-height: 430px !important;
          border: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        #ee-form-2 > div {
          width: 100% !important;
          max-height: 430px !important;
          overflow: hidden !important;
        }
      `,
        }}
      />

      {/* FLOATING ACTIONS */}
      <div
        className="
          fixed right-4 top-1/2 z-[80]
          flex -translate-y-1/2 flex-col
          overflow-hidden rounded-xl border border-slate-200
          bg-white shadow-[0_8px_30px_rgba(21,45,88,0.16)]
          sm:right-5
        "
      >
        {/* DOWNLOAD BROCHURE */}
        <button
          type="button"
          onClick={() => setActivePopup("brochure")}
          className="
            group flex h-12 w-12 flex-col items-center justify-center
            gap-0.5 border-b border-slate-200 bg-white
            text-[#152d58] transition-all duration-300
            hover:bg-[#c31e3b] hover:text-white
            focus:outline-none focus:ring-2 focus:ring-inset
            focus:ring-[#c31e3b] sm:h-14 sm:w-14
          "
          aria-label="Download Brochure"
          title="Download Brochure"
        >
          <Download
            size={17}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          />
          <span className="text-[7px] font-bold uppercase tracking-tight sm:text-[8px]">
            Brochure
          </span>
        </button>

        {/* APPLY ONLINE */}
        <button
          type="button"
          onClick={() => setActivePopup("apply")}
          className="
            group flex h-12 w-12 flex-col items-center justify-center
            gap-0.5 border-b border-slate-200 bg-[#c31e3b]
            text-white transition-all duration-300 hover:bg-[#a91731]
            focus:outline-none focus:ring-2 focus:ring-inset
            focus:ring-[#c31e3b] sm:h-14 sm:w-14
          "
          aria-label="Apply Online"
          title="Apply Online"
        >
          <FileText
            size={17}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          />
          <span className="text-[7px] font-bold uppercase tracking-tight sm:text-[8px]">
            Apply
          </span>
        </button>

        {/* REQUEST CALLBACK */}
        <button
          type="button"
          onClick={() => setActivePopup("callback")}
          className="
            group flex h-12 w-12 flex-col items-center justify-center
            gap-0.5 border-b border-slate-200 bg-white
            text-[#152d58] transition-all duration-300
            hover:bg-[#c31e3b] hover:text-white
            focus:outline-none focus:ring-2 focus:ring-inset
            focus:ring-[#c31e3b] sm:h-14 sm:w-14
          "
          aria-label="Request a Call Back"
          title="Request a Call Back"
        >
          <PhoneCall
            size={17}
            strokeWidth={2}
            className="transition-transform duration-200 group-hover:-translate-y-0.5"
          />
          <span className="text-center text-[7px] font-bold uppercase leading-tight tracking-tight sm:text-[8px]">
            Callback
          </span>
        </button>

        {/* WHATSAPP */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="
            group flex h-12 w-12 flex-col items-center justify-center
            gap-0.5 bg-white text-[#25D366]
            transition-all duration-300 hover:bg-[#25D366] hover:text-white
            focus:outline-none focus:ring-2 focus:ring-inset
            focus:ring-[#25D366] sm:h-14 sm:w-14
          "
          aria-label="Contact FOSTIIMA on WhatsApp"
          title="WhatsApp"
        >
          <FaWhatsapp
            size={21}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:scale-110"
          />
          <span className="text-[7px] font-bold uppercase tracking-tight sm:text-[8px]">
            WhatsApp
          </span>
        </a>
      </div>

      {/* POPUPS — always mounted, only shown/hidden with CSS */}
      <div ref={rootRef}>
        {FORM_KEYS.map((key) => (
          <PopupShell
            key={key}
            title={FORMS[key].title}
            containerId={FORMS[key].containerId}
            open={activePopup === key}
            onClose={close}
          />
        ))}
      </div>
    </>
  );
}

/* POPUP SHELL */

type PopupShellProps = {
  title: string;
  containerId: string;
  open: boolean;
  onClose: () => void;
};

function PopupShell({ title, containerId, open, onClose }: PopupShellProps) {
  return (
    <div
      className={`
        fixed inset-0 z-[100] flex items-center justify-center
        bg-black/60 p-4 backdrop-blur-sm transition-opacity duration-200
        ${open ? "opacity-100" : "pointer-events-none invisible opacity-0"}
      `}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      aria-hidden={!open}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="
          relative max-h-[90vh] w-full max-w-[520px]
          overflow-hidden rounded-2xl bg-white
          shadow-[0_25px_80px_rgba(0,0,0,0.25)]
        "
      >
        <div
          className="
            flex items-center justify-between border-b
            border-slate-200 bg-[#123b79] px-5 py-4
          "
        >
          <h2 className="text-base font-bold text-white sm:text-lg">{title}</h2>

          <button
            type="button"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className="
              flex h-9 w-9 items-center justify-center rounded-full
              bg-white/10 text-white transition hover:bg-white/20
              focus:outline-none focus:ring-2 focus:ring-white/60
            "
            aria-label={`Close ${title}`}
            title="Close"
          >
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <div
          className="
            max-h-[calc(90vh-73px)] overflow-y-auto bg-white
            p-3 sm:p-5
          "
        >
          <div id={containerId} className="w-full" />
        </div>
      </div>
    </div>
  );
}