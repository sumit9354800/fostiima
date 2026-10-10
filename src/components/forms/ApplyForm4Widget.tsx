"use client";

import { useEffect } from "react";

const WIDGET_SCRIPT =
  "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/fbscrm/ee-form-widget/form-4/widget.js";

export default function ApplyForm4Widget() {
  useEffect(() => {
    const container = document.getElementById("ee-form-4");

    if (!container) return;

    let submitAttempted = false;
    let conversionSent = false;

    const handleSubmit = () => {
      submitAttempted = true;
    };

    container.addEventListener("submit", handleSubmit, true);

    container.addEventListener(
      "click",
      (event) => {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const button = target.closest(
          'button[type="submit"], input[type="submit"]',
        );

        if (button) submitAttempted = true;
      },
      true,
    );

    const successObserver = new MutationObserver(() => {
      if (!submitAttempted || conversionSent) return;

      const text = container.innerText.toLowerCase();

      const successMessages = [
        "submitted successfully",
        "successfully submitted",
        "thank you for your enquiry",
        "thank you for contacting us",
        "application submitted",
        "form submitted successfully",
      ];

      const successDetected = successMessages.some((message) =>
        text.includes(message),
      );

      if (!successDetected) return;

      if (typeof window.gtag !== "function") {
        console.warn("Google Ads gtag is not available.");
        return;
      }

      conversionSent = true;

      window.gtag("event", "conversion", {
        send_to: "AW-18383056369/QQL4CJKM644dEPHb3L1E",
        value: 1.0,
        currency: "INR",
      });

      console.log("Google Ads Form 4 conversion sent.");
    });

    successObserver.observe(container, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    const WIDGET_SCRIPT =
      "https://eeconfigstaticfiles.blob.core.windows.net/staticfiles/fbscrm/ee-form-widget/form-4/widget.js";

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
        console.error("Failed to load FOSTIIMA Form 4 application widget.");
      };

      document.body.appendChild(script);
    }

    return () => {
      successObserver.disconnect();
      container.removeEventListener("submit", handleSubmit, true);
    };
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
