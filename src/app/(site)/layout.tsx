import Header from "@/components/layout/Header";
import FloatingActions from "@/components/floating/FloatingActions";
import ChatbotFloatingActions from "@/components/chatbot/ChatbotFloatingActions";
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

      <ChatbotScript />
      <ChatbotFloatingActions />
    </>
  );
}
