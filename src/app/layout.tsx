import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { AuthProvider } from "@/lib/auth-context";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WorkspaceLayout } from "@/components/layout/WorkspaceLayout";

export const metadata: Metadata = {
  title: "LexEvidence - Litigation Management Platform",
  description: "AI-powered litigation management platform for lawyers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <TooltipProvider>
            <WorkspaceLayout>{children}</WorkspaceLayout>
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
