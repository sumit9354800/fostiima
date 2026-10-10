
"use client";

import { useEffect } from "react";

const WIDGET_SCRIPT =
  "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/fbscrm/ee-form-widget/form-4/widget.js";

export default function ApplyForm4Widget() {
  useEffect(() => {
    const container = document.getElementById("ee-form-4");

    if (!container) return;

    const initializeWidget = () => {
      window.dispatchEvent(new Event("DOMContentLoaded"));
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${WIDGET_SCRIPT}"]`,
    );

    if (existingScript) {
      initializeWidget();
    } else {
      const script = document.createElement("script");

      script.src = WIDGET_SCRIPT;
      script.type = "text/javascript";
      script.async = true;
      script.onload = initializeWidget;

      script.onerror = () => {
        console.error(
          "Failed to load FOSTIIMA Form 4 application widget.",
        );
      };

      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <style jsx global>{`
        #ee-form-4 {
          width: 100% !important;
          min-height: 0 !important;
          height: auto !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
        }

        #ee-form-4 iframe {
          display: block !important;
          width: 100% !important;
          border: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
        }

        #ee-form-4 > div {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          overflow: hidden !important;
        }
      `}</style>

      <div id="ee-form-4" className="w-full" />
    </>
  );
}
