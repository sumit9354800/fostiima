
"use client";

import { useEffect } from "react";

const WIDGET_SCRIPT =
  "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/fbscrm/ee-form-widget/form-2/widget.js";

export default function ApplyForm() {
  useEffect(() => {
    const existingScript = document.querySelector(
      `script[src="${WIDGET_SCRIPT}"]`,
    );

    if (existingScript) {
      window.dispatchEvent(new Event("DOMContentLoaded"));
      return;
    }

    const script = document.createElement("script");

    script.src = WIDGET_SCRIPT;
    script.type = "text/javascript";

    script.onload = () => {
      window.dispatchEvent(new Event("DOMContentLoaded"));
    };

    script.onerror = () => {
      console.error(
        "Failed to load FOSTIIMA application form widget.",
      );
    };

    document.body.appendChild(script);

    return () => {
      // Keep the external widget script loaded.
    };
  }, []);

  return (
    <div
      id="ee-form-2"
      className="w-full"
    />
  );
}
