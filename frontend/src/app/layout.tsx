import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scaliify - All Things HR",
  description: "The consultancy for all things HR related: HR technology, Process optimisation, Interim management, Strategy & advisory.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} antialiased min-h-screen flex flex-col font-sans bg-[#F7F9F8] text-foreground`}
      >
        <LenisProvider>
          <Navbar />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}

