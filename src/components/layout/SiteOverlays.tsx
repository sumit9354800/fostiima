import Header from "@/components/layout/Header";
import FloatingActions from "@/components/floating/FloatingActions";

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
    </>
  );
}