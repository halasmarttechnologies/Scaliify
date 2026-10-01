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
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TBT9QQDM');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${plusJakartaSans.variable} antialiased min-h-screen flex flex-col font-sans bg-white text-foreground`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TBT9QQDM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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
