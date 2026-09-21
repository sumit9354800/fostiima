import type { Metadata } from "next";
import "./globals.css";
import ChatbotScript from "@/components/chatbot/ChatbotScript";

export const metadata: Metadata = {
  title: "FOSTIIMA Business School",
  description:
    "FOSTIIMA Business School — Management education, PGDM and MBA programmes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatbotScript />
      </body>
    </html>
  );
}