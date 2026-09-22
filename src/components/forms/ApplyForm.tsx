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
      // The script may already have loaded after DOMContentLoaded.
      // Trigger the event so the widget can initialize.
      window.dispatchEvent(new Event("DOMContentLoaded"));
      return;
    }

    const script = document.createElement("script");

    script.src = WIDGET_SCRIPT;
    script.type = "text/javascript";

    script.onload = () => {
      // widget.js listens for DOMContentLoaded.
      // In Next.js this event may already have fired,
      // so trigger it after widget.js has registered its listener.
      window.dispatchEvent(new Event("DOMContentLoaded"));
    };

    script.onerror = () => {
      console.error("Failed to load FBS CRM application form widget.");
    };

    document.body.appendChild(script);

    return () => {
      // Keep the external widget script loaded.
      // It may be needed again if the modal is opened later.
    };
  }, []);

  return (
    <div
      id="ee-form-2"
      className="w-full"
    />
  );
}