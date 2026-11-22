import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ONEATLAS – AI Model Discovery & Intelligence Platform",
  description: "Discover, compare, and benchmark frontier AI models across providers, capabilities, and pricing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#0b0f19] text-slate-100 font-sans">
        {children}
      </body>
    </html>
  );
}
