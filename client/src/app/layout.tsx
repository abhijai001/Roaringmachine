// client/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Roaring Machine | Superbike Marketplace",
  description: "The ultimate marketplace for elite superbikes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-zinc-950 text-zinc-100 min-h-screen`}>
        <Navbar />
        <Toaster position="bottom-right" />
        <main className="pt-16 sm:pt-20">
  {children}
</main>
      </body>
    </html>
  );
}