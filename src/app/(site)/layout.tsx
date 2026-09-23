import Header from "@/components/layout/Header";
import FloatingActions from "@/components/floating/FloatingActions";
import Footer from "@/components/layout/Footer";
import ChatbotScript from "@/components/chatbot/ChatbotScript";

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
    </>
  );
}