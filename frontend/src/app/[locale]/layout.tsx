import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Plus_Jakarta_Sans } from "next/font/google";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { SecurityProvider } from "@/components/providers/SecurityProvider";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { GHLRouteTracker } from "@/components/analytics/GHLRouteTracker";
import "../globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${plusJakartaSans.variable} antialiased min-h-screen flex flex-col font-sans bg-white text-foreground`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SecurityProvider>
            <OrganizationJsonLd />
            <WebSiteJsonLd />
            <LenisProvider>
              <Navbar />
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </LenisProvider>
          </SecurityProvider>
        </NextIntlClientProvider>
        {/* HighLevel / msgsndr External Tracking */}
        <GHLRouteTracker />
        <script
          src="https://link.msgsndr.com/js/external-tracking.js"
          data-tracking-id="tk_d18c012d488e4216a8a01609b30fbc40"
        />
      </body>
    </html>
  );
}
