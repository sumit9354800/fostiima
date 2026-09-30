"use client";

import { useEffect } from "react";

const WIDGET_SCRIPT =
  "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/fbscrm/ee-form-widget/form-2/widget.js";

export default function ApplyFormWidget() {
  useEffect(() => {
    const initializeWidget = () => {
      window.dispatchEvent(new Event("DOMContentLoaded"));
    };

    const existingScript = document.querySelector(
      `script[src="${WIDGET_SCRIPT}"]`,
    );

    if (existingScript) {
      initializeWidget();
      return;
    }

    const script = document.createElement("script");

    script.src = WIDGET_SCRIPT;
    script.type = "text/javascript";
    script.async = true;

    script.onload = initializeWidget;

    script.onerror = () => {
      console.error(
        "Failed to load FOSTIIMA application form widget.",
      );
    };

    document.body.appendChild(script);

    return () => {
      // Keep the widget script loaded.
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        #ee-form-2 {
          width: 100% !important;
          min-height: 0 !important;
          height: auto !important;
          margin: 0 !important;
          padding: 0 !important;
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
      `}</style>

      <div
        id="ee-form-2"
        className="w-full"
      />
    </>
  );
}