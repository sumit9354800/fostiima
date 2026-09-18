import Header from "@/components/layout/Header";
import FloatingActions from "@/components/floating/FloatingActions";
import ChatbotFloatingActions from "@/components/chatbot/ChatbotFloatingActions";
import ChatbotScript from "@/components/chatbot/ChatbotScript";
import Footer from "@/components/layout/Footer";
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
      <ChatbotScript />
      <ChatbotFloatingActions />
    </>
  );
}
