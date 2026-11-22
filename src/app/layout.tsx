import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

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
      <body className="h-full bg-[#0B0F19] text-slate-100 font-sans overflow-hidden">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
