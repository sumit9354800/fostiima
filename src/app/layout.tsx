import type { Metadata } from "next";
import "./globals.css";

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
      <body>{children}</body>
    </html>
  );
}