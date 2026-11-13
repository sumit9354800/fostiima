import Header from "@/components/layout/Header";
import FloatingActions from "@/components/floating/FloatingActions";
import Footer from "@/components/layout/Footer";
import ChatbotScript from "@/components/chatbot/ChatbotScript";
import AttributionCapture from "@/components/common/AttributionCapture";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AttributionCapture />

      <Header />

      <main>{children}</main>

      <FloatingActions />

      <Footer />

      <ChatbotScript />
    </>
  );
}