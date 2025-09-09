import "./globals.css";
import type { Metadata } from "next";
import BottomTabs from "@/components/BottomTabs";

export const metadata: Metadata = {
  title: "Pops",
  description: "Pops UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app-root">
        <main className="app-main">{children}</main>
        <BottomTabs />
      </body>
    </html>
  );
}
