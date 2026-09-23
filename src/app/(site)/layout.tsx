import Header from "@/components/layout/Header";
import FloatingActions from "@/components/floating/FloatingActions";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <FloatingActions />
      <Footer />

      {/* ExtraaEdge Chatbot */}
      <Script
        src="https://extraaedgeresources.blob.core.windows.net/documents/fbscrm/Chatbot/js/chat.js"
        strategy="afterInteractive"
      />
    </>
  );
}
