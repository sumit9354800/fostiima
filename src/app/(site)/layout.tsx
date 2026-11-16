import Header from "@/components/layout/Header";
import FloatingActions from "@/components/floating/FloatingActions";
import Footer from "@/components/layout/Footer";
import ChatbotScript from "@/components/chatbot/ChatbotScript";
import JsonLd from "@/components/seo/JsonLd";
import { SITEWIDE_STRUCTURED_DATA } from "@/config/structured-data";

// Lead attribution is captured by AttributionCapture in the root layout.
export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* EducationalOrganization and WebSite: once per public page. */}
      <JsonLd data={SITEWIDE_STRUCTURED_DATA} />

      <Header />

      <main>{children}</main>

      <FloatingActions />

      <Footer />

      <ChatbotScript />
    </>
  );
}