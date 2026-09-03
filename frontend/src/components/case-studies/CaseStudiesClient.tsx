"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Check, CheckCircle2 } from "lucide-react";
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";

export function CaseStudiesClient() {
  const t = useTranslations("caseStudies");
  const locale = useLocale();
  const isDe = locale === "de";

  return (
    <main className="w-full bg-white text-gray-900 font-sans min-h-screen">
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="w-full pt-28 sm:pt-36 lg:pt-40 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#05434B] block mb-3">
            {t("kicker")}
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-950 leading-[1.12] mb-5">
            {isDe
              ? "Messbare Erfolge für wachsende europäische Unternehmen"
              : "Real outcomes for scaling European businesses"}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8">
            {isDe
              ? "Wie wachsende Unternehmen HR-Tech-Schulden abbauen, Lohnprozesse automatisieren und ihre People Operations mit Scaliify skalieren."
              : "How growing companies eliminate HR tech debt, automate payroll cutovers, and scale their People operations with Scaliify."}
          </p>
          <div className="flex justify-center">
            <Link
              href="/lets-talk"
              className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white text-xs sm:text-sm font-bold px-7 py-3 rounded-full transition-colors"
            >
              <span>{isDe ? "Ihre Herausforderung besprechen" : "Discuss your challenge"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. CASE STORIES                                              */}
      {/* ============================================================ */}
      <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28 bg-white">
        <div className="max-w-6xl mx-auto space-y-20 sm:space-y-28">

          {/* Story 1: Payroll Prep & Automation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#05434B]">
                {isDe ? "LOHN-VORBEREITUNG • DOKUMENTEN-AUTOMATISIERUNG" : "PRELIMINARY PAYROLL • DOCUMENT AUTOMATION"}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 leading-tight">
                {isDe
                  ? "Lohnvorbereitung mit minimalem Aufwand und maximaler Genauigkeit"
                  : "Payroll prep with minimum effort and maximum accuracy"}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {isDe
                  ? "HR- und Gehaltsdaten an einem zentralen Ort und immer auf dem neuesten Stand. Mit einem Klick aggregieren Sie alle Daten für Steuerberater (DATEV LODAS / Lohn und Gehalt) oder globale EOR-Partner."
                  : "HR and salary data in one place and always up to date. With one click, aggregate into one clean file for your payroll accountant (DATEV LODAS/Lohn und Gehalt) or global EOR partner."}
              </p>
              
              <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-gray-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    {isDe
                      ? "85 % Zeitersparnis bei der monatlichen Lohndaten-Konsolidierung"
                      : "85% reduction in monthly payroll data consolidation time"}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    {isDe
                      ? "Null Brutto-Netto-Abweichungen in 18 aufeinanderfolgenden Abrechnungszyklen"
                      : "Zero gross-to-net discrepancy across 18 consecutive payroll cycles"}
                  </span>
                </li>
              </ul>

              <div className="pt-4 flex items-center gap-3">
                <Link
                  href="/services/implementation-optimisation"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-black hover:text-[#05434B] underline"
                >
                  <span>{isDe ? "Implementierungsansatz ansehen" : "Read implementation approach"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md bg-[#fafafa] rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm relative">
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden relative border border-gray-200 bg-gray-100 shrink-0">
                        <Image src="/avatars/catherine.jpg" alt="Brenna Stevens" fill unoptimized className="object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 leading-tight">Brenna Stevens</p>
                        <p className="text-[11px] text-gray-500">Marketing Executive</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#05434B] bg-[#eaf7f5] px-2.5 py-1 rounded-md border border-[#76D8C8]/40">
                      Update
                    </span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-gray-600">
                      <span>{isDe ? "Gehalt" : "Salary"}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-gray-400 line-through">£45,000</span>
                        <span className="font-bold text-gray-900 bg-purple-50 text-purple-900 px-1.5 py-0.5 rounded">£48,500</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-gray-600">
                      <span>{isDe ? "Einmal-Bonus" : "One-time Bonus"}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-gray-900">£2,150</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Story 2: Accurate Headcount & Payroll Table */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
              <div className="w-full max-w-md bg-[#fafafa] rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm relative">
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                      {isDe ? "Lohn-Zusammenfassung" : "Preliminary payroll summary"}
                    </h3>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      DATEV Ready
                    </span>
                  </div>

                  <div className="space-y-2 text-[11px]">
                    <div className="grid grid-cols-12 text-gray-400 font-bold pb-1 text-[10px] uppercase">
                      <span className="col-span-5">{isDe ? "Mitarbeiter" : "Employee"}</span>
                      <span className="col-span-3 text-right">{isDe ? "Brutto" : "Gross"}</span>
                      <span className="col-span-2 text-right">{isDe ? "Abwesend" : "Absence"}</span>
                      <span className="col-span-2 text-right">{isDe ? "Urlaub" : "PTO"}</span>
                    </div>

                    <div className="grid grid-cols-12 items-center py-1.5 border-t border-gray-50 text-gray-800 font-medium">
                      <div className="col-span-5 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden relative border shrink-0">
                          <Image src="/avatars/felix.jpg" alt="Franzi Holz" fill unoptimized className="object-cover" />
                        </div>
                        <span className="truncate">Franzi Holz</span>
                      </div>
                      <span className="col-span-3 text-right font-bold">€82,000</span>
                      <span className="col-span-2 text-right text-gray-500">1</span>
                      <span className="col-span-2 text-right text-gray-500">6</span>
                    </div>

                    <div className="grid grid-cols-12 items-center py-1.5 border-t border-gray-50 text-gray-800 font-medium">
                      <div className="col-span-5 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden relative border shrink-0">
                          <Image src="/avatars/mo.jpg" alt="Sana Davoud" fill unoptimized className="object-cover" />
                        </div>
                        <span className="truncate">Sana Davoud</span>
                      </div>
                      <span className="col-span-3 text-right font-bold">€72,000</span>
                      <span className="col-span-2 text-right text-gray-500">0</span>
                      <span className="col-span-2 text-right text-gray-500">5</span>
                    </div>

                    <div className="grid grid-cols-12 items-center py-1.5 border-t border-gray-50 text-gray-800 font-medium">
                      <div className="col-span-5 flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden relative border shrink-0">
                          <Image src="/avatars/max.jpg" alt="Sven Jansen" fill unoptimized className="object-cover" />
                        </div>
                        <span className="truncate">Sven Jansen</span>
                      </div>
                      <span className="col-span-3 text-right font-bold">€68,000</span>
                      <span className="col-span-2 text-right text-gray-500">3</span>
                      <span className="col-span-2 text-right text-gray-500">11</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#05434B]">
                {isDe ? "SINGLE SOURCE OF TRUTH • DATENINTEGRITÄT" : "SINGLE SOURCE OF TRUTH • DATA INTEGRITY"}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 leading-tight">
                {isDe
                  ? "Verlässliche Lohndaten und transparente Berichte"
                  : "Enjoy accurate payroll data and transparent reporting"}
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                  <span>
                    {isDe
                      ? "Vernetzte Gehalts- und Abwesenheitsdaten bedeuten spürbare Entlastung für Geschäftsführung und Finance."
                      : "Interconnected salary and absence data means a dramatically lighter lift for founders and finance leads."}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                  <span>
                    {isDe
                      ? "Geprüfte Zusammenfassungen stellen sicher, dass Ihre Steuerberatung fehlerfreie Übergabedateien erhält – ohne Tabellen-Korrekturen."
                      : "Comprehensive summaries ensure your tax advisor receives clean, validated cutover files without manual spreadsheet adjustments."}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Story 3: Control of Changes & Compensation Leveling */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#05434B]">
                {isDe ? "ORGANISATIONSENTWICKLUNG • VERGÜTUNG" : "ORGANIZATIONAL DESIGN • COMPENSATION"}
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950 leading-tight">
                {isDe
                  ? "Volle Kontrolle über Änderungen und Gehaltsbänder"
                  : "Be in control of changes and team leveling"}
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium">
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                  <span>
                    {isDe
                      ? "Alle Personaländerungen übersichtlich im Blick – ohne Suche in endlosen E-Mail-Verläufen."
                      : "Be in the driver's seat with everything that changed right in front of you—no need to crawl through endless email threads."}
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-black mt-2 shrink-0" />
                  <span>
                    {isDe
                      ? "Lückenlose Nachvollziehbarkeit durch intelligente Audit-Trails für Vertragsanpassungen und Gehaltserhöhungen."
                      : "Have complete peace of mind using intelligent audit trails to verify contract amendments and salary adjustments."}
                  </span>
                </li>
              </ul>

              <div className="pt-4">
                <Link
                  href="/services/hr-advisory"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-black hover:text-[#05434B] underline"
                >
                  <span>{isDe ? "HR-Beratungsangebote ansehen" : "Explore HR Advisory services"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="w-full max-w-md bg-[#fafafa] rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm relative">
                <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
                  <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider pb-2 border-b border-gray-100">
                    {isDe ? "Änderungs-Protokoll" : "Changes Audit Log"}
                  </h3>

                  <div className="space-y-2 text-[11px]">
                    <div className="grid grid-cols-12 text-gray-400 font-bold pb-1 text-[10px] uppercase">
                      <span className="col-span-4">{isDe ? "Mitarbeiter" : "Employee"}</span>
                      <span className="col-span-3">{isDe ? "Änderung" : "Change"}</span>
                      <span className="col-span-3 text-right">{isDe ? "Neuer Wert" : "New Value"}</span>
                      <span className="col-span-2 text-right">{isDe ? "Gültig ab" : "Effective"}</span>
                    </div>

                    <div className="grid grid-cols-12 items-center py-1.5 border-t border-gray-50 text-gray-800 font-medium">
                      <span className="col-span-4 truncate font-bold">Pim Mertens</span>
                      <span className="col-span-3 text-gray-500">{isDe ? "Adresse" : "Address"}</span>
                      <span className="col-span-3 text-right text-gray-600 truncate">100 Startups Rd</span>
                      <span className="col-span-2 text-right text-gray-400">14 Mar</span>
                    </div>

                    <div className="grid grid-cols-12 items-center py-1.5 border-t border-gray-50 text-gray-800 font-medium">
                      <span className="col-span-4 truncate font-bold">Franzi Holz</span>
                      <span className="col-span-3 text-gray-500">{isDe ? "Wochenstunden" : "Weekly Hours"}</span>
                      <span className="col-span-3 text-right text-purple-900 font-bold">32 hrs</span>
                      <span className="col-span-2 text-right text-gray-400">19 Feb</span>
                    </div>

                    <div className="grid grid-cols-12 items-center py-1.5 border-t border-gray-50 text-gray-800 font-medium">
                      <span className="col-span-4 truncate font-bold">Sana Davoud</span>
                      <span className="col-span-3 text-gray-500">{isDe ? "Gehaltsband" : "Salary Band"}</span>
                      <span className="col-span-3 text-right text-emerald-700 font-bold">€7,800/mo</span>
                      <span className="col-span-2 text-right text-gray-400">21 Feb</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. DISCOVERY CONSULTATION LEAD SECTION                       */}
      {/* ============================================================ */}
      <BookingLeadSection
        title={isDe ? "Bereit, Ihre HR-Prozesse zu transformieren?" : "Ready to transform your HR operations?"}
        subtitle={
          isDe
            ? "Buchen Sie ein unverbindliches Erstgespräch, um Ihre Teamgröße, Tech-Stack und Beratungsbedarfe zu besprechen."
            : "Book an introductory discovery call to discuss your headcount, tech stack, and advisory needs."
        }
        badgeTitle={isDe ? "PROJEKT STARTEN" : "START YOUR PROJECT"}
      />

      {/* ============================================================ */}
      {/* 4. BLOG SECTION                                              */}
      {/* ============================================================ */}
      <BlogSection />
    </main>
  );
}
