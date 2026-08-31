import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, OG_IMAGE } from "@/lib/seo";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Scaliify — Independent HR Technology Consultancy",
    template: "%s | Scaliify",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Scaliify — Independent HR Technology Consultancy",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Scaliify — Independent HR Technology Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scaliify — Independent HR Technology Consultancy",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} antialiased min-h-screen flex flex-col font-sans bg-brand-surface text-foreground`}
      >
        <OrganizationJsonLd />
        <WebSiteJsonLd />
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
