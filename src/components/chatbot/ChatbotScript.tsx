import Script from "next/script";

export default function ChatbotScript() {
  return (
    <>
      {/* ExtraaEdge Chatbot */}
      <Script
        src="https://extraaedgeresources.blob.core.windows.net/documents/fbscrm/Chatbot/js/chat.js"
        strategy="afterInteractive"
      />

      {/* Markaible Voice Chat */}
      {/* <Script
        src="https://www.markaible.com/widget.js"
        data-agent="6a9fa7d1dab71eb81cbeb108"
        data-style="peek"
        data-panel="solid"
        strategy="afterInteractive"
      /> */}
    </>
  );
}