import Script from "next/script";

export default function ChatbotScript() {
  return (
    <Script
      src="https://extraaedgeresources.blob.core.windows.net/documents/fbscrm/Chatbot/js/chat.js"
      strategy="beforeInteractive"
    />
  );
}