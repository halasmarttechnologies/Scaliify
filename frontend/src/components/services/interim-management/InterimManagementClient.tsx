"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight,
  Check,
  X,
  Clock,
  UserCheck,
  Zap,
  GitMerge,
  Users,
  Target,
  Quote,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  Award,
  MessageSquare,
  Layers,
  Briefcase,
  BarChart3,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { companies } from "@/data/companies";
import { Testimonials } from "@/components/home/Testimonials";
import { BookingLeadSection } from "@/components/common/BookingLeadSection";
import { BlogSection } from "@/components/home/BlogSection";
import { AnimatedStatCounter } from "@/components/common/AnimatedStatCounter";

const triggerSituationsEn = [
  {
    icon: ShieldCheck,
    title: "Senior Leadership, Placed Fast",
    desc: "We place experienced senior HR leaders at short notice: someone who can step into the gap when your business needs a seat filled now, not in three months.",
  },
  {
    icon: Clock,
    title: "When Companies Usually Call Us",
    desc: "An HR lead resigns out of nowhere, someone needs parental leave covered, a company scales rapidly, or a merger leaves HR with no clear owner.",
  },
  {
    icon: Zap,
    title: "How Fast You Can Start",
    desc: "Immediately, in most cases. Once we understand what you need, we move quickly to get the right person in place.",
  },
  {
    icon: Award,
    title: "Not Just a Recruitment Agency",
    desc: "A recruitment agency's job usually ends the moment a placement is made. Ours doesn't. We stay accountable for the outcome, not just for filling the seat.",
  },
  {
    icon: Users,
    title: "Backed by 100+ Specialists",
    desc: "We work with a network of more than 100 HR specialists. That means we can match the right person to the right situation fast, instead of settling for whoever happens to be available.",
  },
  {
    icon: Target,
    title: "Invested in Your Success",
    desc: "We stay actively invested in how things go once someone's in the role, ensuring smooth leadership continuity and strategic alignment.",
  },
];

const triggerSituationsDe = [
  {
    icon: ShieldCheck,
    title: "Senior-Führung, schnell besetzt",
    desc: "Wir vermitteln erfahrene Senior-HR-Führungskräfte kurzfristig: Jemand, der sofort übernimmt, wenn eine Schlüsselposition jetzt und nicht erst in drei Monaten besetzt sein muss.",
  },
  {
    icon: Clock,
    title: "Wann Unternehmen uns typischerweise anrufen",
    desc: "Plötzliche Kündigung der HR-Leitung, Überbrückung von Elternzeiten, überdurchschnittlich schnelles Wachstum oder Fusionen ohne klaren HR-Lead.",
  },
  {
    icon: Zap,
    title: "Wie schnell gestartet werden kann",
    desc: "In den meisten Fällen sofort. Sobald wir Ihren Bedarf verstehen, handeln wir zügig, um die passende Person einzusetzen.",
  },
  {
    icon: Award,
    title: "Nicht einfach nur eine Personalvermittlung",
    desc: "Die Arbeit einer Personalagentur endet meist mit der Vermittlung. Unsere nicht. Wir bleiben für das tatsächliche Ergebnis verantwortlich und investieren uns nachhaltig in den Erfolg.",
  },
  {
    icon: Users,
    title: "Unterstützt durch 100+ Spezialist:innen",
    desc: "Wir greifen auf ein Netzwerk von mehr als 100 HR-Expert:innen zurück. So finden wir schnell die exakt passende Person, statt auf beliebige Verfügbarkeiten zurückzugreifen.",
  },
  {
    icon: Target,
    title: "In Ihren Erfolg investiert",
    desc: "Wir bleiben auch nach dem Start aktiv engagiert, um Führungskontinuität und strategische Ausrichtung langfristig zu sichern.",
  },
];

const specialistAvatars = [
  { src: "/avatars/bente.jpg", alt: "Specialist 1" },
  { src: "/avatars/catherine.jpg", alt: "Specialist 2" },
  { src: "/avatars/felix.jpg", alt: "Specialist 3" },
  { src: "/avatars/max.jpg", alt: "Specialist 4" },
  { src: "/avatars/mo.jpg", alt: "Specialist 5" },
  { src: "/avatars/pim.jpg", alt: "Specialist 6" },
  { src: "/avatars/silvia.jpg", alt: "Specialist 7" },
  { src: "/avatars/catherine.jpg", alt: "Specialist 8" },
  { src: "/avatars/bente.jpg", alt: "Specialist 9" },
  { src: "/avatars/mo.jpg", alt: "Specialist 10" },
  { src: "/avatars/silvia.jpg", alt: "Specialist 11" },
  { src: "/avatars/felix.jpg", alt: "Specialist 12" },
  { src: "/avatars/max.jpg", alt: "Specialist 13" },
  { src: "/avatars/pim.jpg", alt: "Specialist 14" },
  { src: "/avatars/felix.jpg", alt: "Specialist 15" },
  { src: "/avatars/silvia.jpg", alt: "Specialist 16" },
  { src: "/avatars/bente.jpg", alt: "Specialist 17" },
  { src: "/avatars/catherine.jpg", alt: "Specialist 18" },
  { src: "/avatars/mo.jpg", alt: "Specialist 19" },
  { src: "/avatars/pim.jpg", alt: "Specialist 20" },
  { src: "/avatars/max.jpg", alt: "Specialist 21" },
];

const marqueeCardsEn = [
  {
    type: "quote-card",
    bg: "bg-[#f0faf8]",
    brandName: "fintech group",
    quote:
      "When our Head of People stepped down during Series B, Scaliify placed an Interim VP of People within 48 hours. She led our hiring sprint and set up our leadership review framework seamlessly.",
    author: "Maximilian Koch | Co-Founder & CEO",
    border: "border-[#76D8C8]/40",
  },
  {
    type: "image-card",
    image: "/images/rowing-team.jpg",
    quote:
      "Scaliify covered a 9-month parental leave for our HR Director. No learning curve, full accountability for team OKRs, and impeccable executive presence.",
    author: "Hannah von Berg | Chief Operations Officer",
    border: "border-gray-200/50",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#2B4C55] via-[#05434B] to-[#4FB8AA]",
    stat: "<48h",
    sub: "average candidate match & start turnaround",
    brand: "Scaliify Interim Advisory",
    border: "border-[#76D8C8]/30",
  },
  {
    type: "image-card",
    image: "/images/office-team.jpg",
    quote:
      "Unlike recruitment agencies that disappear after signing, Scaliify's interim leaders remained accountable for weekly milestones and outcome delivery.",
    author: "David Althaus | Managing Director",
    border: "border-gray-200/50",
  },
  {
    type: "quote-card",
    bg: "bg-[#e8f7f4]",
    brandName: "mobility scaleup",
    quote:
      "We leveraged Scaliify's specialist network for our post-merger integration. They harmonized contracts across 3 European entities in record time.",
    author: "Laura Sommer | VP People & Organization",
    border: "border-[#4FB8AA]/40",
  },
  {
    type: "image-card",
    image: "/images/food-pantry.jpg",
    quote:
      "Immediate start, deep German labor law knowledge, and hands-on operational leadership when we needed it most.",
    author: "Julian Meier | Head of Talent & Culture",
    border: "border-gray-200/50",
  },
];

const marqueeCardsDe = [
  {
    type: "quote-card",
    bg: "bg-[#f0faf8]",
    brandName: "fintech group",
    quote:
      "Als unsere Head of People während der Series-B ging, hat Scaliify innerhalb von 48 Stunden eine Interim VP of People gestellt. Sie hat unseren Recruiting-Sprint und die Führungsentwicklung nahtlos übernommen.",
    author: "Maximilian Koch | Co-Founder & CEO",
    border: "border-[#76D8C8]/40",
  },
  {
    type: "image-card",
    image: "/images/rowing-team.jpg",
    quote:
      "Scaliify hat die 9-monatige Elternzeit unserer HR-Direktorin überbrückt. Keine Einarbeitungszeit, volle Verantwortung für Team-OKRs und souveränes C-Level-Auftreten.",
    author: "Hannah von Berg | Chief Operations Officer",
    border: "border-gray-200/50",
  },
  {
    type: "stat-card",
    bg: "bg-gradient-to-br from-[#2B4C55] via-[#05434B] to-[#4FB8AA]",
    stat: "<48h",
    sub: "durchschnittliche Zeit bis zum Match und Start",
    brand: "Scaliify Interim Advisory",
    border: "border-[#76D8C8]/30",
  },
  {
    type: "image-card",
    image: "/images/office-team.jpg",
    quote:
      "Anders als Personalvermittler, die nach Vertragsunterzeichnung verschwinden, blieben die Interim-Manager von Scaliify für Meilensteine und Ergebnisse voll verantwortlich.",
    author: "David Althaus | Managing Director",
    border: "border-gray-200/50",
  },
  {
    type: "quote-card",
    bg: "bg-[#e8f7f4]",
    brandName: "mobility scaleup",
    quote:
      "Wir haben das Spezialistennetzwerk von Scaliify für unsere Post-Merger-Integration genutzt. Sie haben Arbeitsverträge über 3 europäische Länder in Rekordzeit harmonisiert.",
    author: "Laura Sommer | VP People & Organization",
    border: "border-[#4FB8AA]/40",
  },
  {
    type: "image-card",
    image: "/images/food-pantry.jpg",
    quote:
      "Sofortiger Start, fundiertes deutsches Arbeitsrecht-Know-how und anpackende operative Führung genau im richtigen Moment.",
    author: "Julian Meier | Head of Talent & Culture",
    border: "border-gray-200/50",
  },
];

const beforeAgencyItemsEn = [
  "2–3 months of slow search latency & CV screening",
  "High placement fees with zero delivery accountability",
  "Recruiters without operational HR leadership experience",
  "Advisors disappear immediately after contract signature",
  "Risk of bad hire with costly replacement delays",
];

const beforeAgencyItemsDe = [
  "2–3 Monate langwierige Suche & unzählige Lebenslauf-Prüfungen",
  "Hohe Vermittlungsgebühren ohne Verantwortung für Ergebnisse",
  "Personalberater ohne eigene operative HR-Führungserfahrung",
  "Dienstleister sind nach Vertragsunterzeichnung nicht mehr greifbar",
  "Risiko von Fehlbesetzungen mit teuren Verzögerungen",
];

const afterScaliifyItemsEn = [
  { text: "Immediate deployment — matched & operational in <48h", badge: "Immediate Start" },
  { text: "100% accountable for outcomes & tangible milestones", badge: "Outcome-Driven" },
  { text: "Backed by a curated network of >100 vetted HR specialists", badge: ">100 Experts" },
  { text: "Battle-tested across scaleups, M&A, and parental leaves", badge: null },
  { text: "Flexible engagements from part-time advisory to full-time CPO", badge: "Total Flexibility" },
];

const afterScaliifyItemsDe = [
  { text: "Sofortiger Start — passend gematcht & einsatzbereit in unter 48h", badge: "Sofortiger Start" },
  { text: "100 % Verantwortung für greifbare Meilensteine und Ergebnisse", badge: "Ergebnisorientiert" },
  { text: "Unterstützt durch ein Netzwerk von über 100 geprüften HR-Spezialist:innen", badge: ">100 Expert:innen" },
  { text: "Praxiserprobt in Scale-ups, M&A-Phasen und Elternzeitvertretungen", badge: null },
  { text: "Flexible Modelle von Teilzeit-Sparring bis zur Vollzeit-CPO-Rolle", badge: "Maximale Flexibilität" },
];

const interimFaqsEn = [
  {
    question: "How quickly can an interim manager actually start?",
    answer:
      "Usually within days. Once we understand the situation, we move fast to get the right person in place.",
  },
  {
    question: "What kind of situations call for an interim HR manager rather than a permanent hire?",
    answer:
      "Anything urgent or transitional. An unexpected resignation, parental leave cover, a merger, or rapid scaling situations where you need experienced leadership right away, while you take time to find the right permanent hire.",
  },
  {
    question: "How is this different from hiring through a recruitment agency?",
    answer:
      "A recruitment agency's job ends the moment a candidate is placed. We stay accountable for how things go afterward, not just for filling the role.",
  },
  {
    question: "Do interim managers work on-site or remotely?",
    answer:
      "Depends on what the role and company need. We can work either way.",
  },
  {
    question: "What happens once we're ready to hire someone permanent?",
    answer:
      "We help make that transition smooth. We also stay available for strategic conversations well after the handover.",
  },
];

const interimFaqsDe = [
  {
    question: "Wie schnell kann eine Interim-Manager:in tatsächlich starten?",
    answer:
      "In der Regel innerhalb weniger Tage. Sobald wir die Situation erfasst haben, handeln wir zügig, um die richtige Person einzusetzen.",
  },
  {
    question: "In welchen Situationen ist eine Interim-HR-Führungskraft sinnvoller als eine Festanstellung?",
    answer:
      "In allen dringenden oder transformativen Phasen: Unerwartete Kündigungen, Elternzeitvertretungen, Fusionen oder schnelles Skalieren – Situationen, in denen Sie sofort erfahrene Führung brauchen, während Sie in Ruhe nach einer Festanstellung suchen.",
  },
  {
    question: "Wie unterscheidet sich das von der Beauftragung einer Personalvermittlung?",
    answer:
      "Eine Personalvermittlung beendet ihren Auftrag mit der Kandidatenplatzierung. Wir bleiben für die Ergebnisse und den weiteren Verlauf verantwortlich, nicht nur für das Besetzen der Stelle.",
  },
  {
    question: "Arbeiten Interim-Manager:innen vor Ort oder remote?",
    answer:
      "Das richtet sich ganz nach den Anforderungen der Rolle und Ihres Unternehmens – beides ist flexibel möglich.",
  },
  {
    question: "Was passiert, wenn wir bereit sind, eine Festanstellung einzustellen?",
    answer:
      "Wir unterstützen einen reibungslosen Übergang und stehen auch nach der Übergabe weiterhin für strategische Sparrings zur Verfügung.",
  },
];

export function InterimManagementClient() {
  const locale = useLocale();
  const isDe = locale === "de";
  const t = useTranslations("services.interimManagement");

  const triggerSituations = isDe ? triggerSituationsDe : triggerSituationsEn;
  const marqueeCards = isDe ? marqueeCardsDe : marqueeCardsEn;
  const beforeAgencyItems = isDe ? beforeAgencyItemsDe : beforeAgencyItemsEn;
  const afterScaliifyItems = isDe ? afterScaliifyItemsDe : afterScaliifyItemsEn;
  const interimFaqs = isDe ? interimFaqsDe : interimFaqsEn;

  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSubmitted(true);
    }
  };

  return (
    <main className="w-full bg-white overflow-hidden text-black font-sans">
      {/* ============================================================ */}
      {/* 1. HERO SECTION                                              */}
      {/* ============================================================ */}
      <section className="w-full relative overflow-hidden bg-gradient-to-bl from-[#81D8D0]/35 via-white/80 to-white pt-28 sm:pt-36 lg:pt-40 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute -top-20 -right-20 sm:-top-28 sm:-right-28 w-[600px] sm:w-[800px] h-[500px] sm:h-[650px] bg-[radial-gradient(ellipse_at_top_right,rgba(129,216,208,0.85)_0%,rgba(129,216,208,0.55)_35%,rgba(91,199,188,0.25)_60%,transparent_80%)] pointer-events-none blur-3xl -z-0" />
        <div className="absolute top-0 right-1/4 w-[450px] h-[300px] bg-[radial-gradient(circle,rgba(129,216,208,0.45)_0%,transparent_70%)] pointer-events-none blur-2xl -z-0" />

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10">
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#2B4C55] mb-3.5">
              {t("kicker")}
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-black leading-[1.12] mb-5">
              {t("heading")}
            </h1>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-8 max-w-xl">
              {t("subtitle")}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/lets-talk"
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-extrabold text-brand-dark bg-gradient-to-b from-brand-teal-light via-brand-teal to-brand-teal-deep shadow-[0_4px_22px_rgba(129,216,208,0.65)] border border-white/80 hover:shadow-[0_6px_28px_rgba(129,216,208,0.95)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <span className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-white/75 to-transparent rounded-t-full pointer-events-none" />
                <span className="relative z-10 tracking-tight font-extrabold">
                  {t("ctaButton")}
                </span>
                <ArrowRight className="relative z-10 w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="#triggers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-black border border-gray-300 hover:border-[#2B4C55] px-6 py-3.5 rounded-full transition-all hover:bg-gray-50 cursor-pointer"
              >
                <span>{isDe ? "Einsatzszenarien" : "Trigger situations"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#2B4C55]" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex items-center justify-center">
            <div className="relative w-full aspect-[4/3] rounded-[28px] overflow-hidden shadow-[0_15px_45px_rgba(0,0,0,0.08)] border border-gray-200/80">
              <Image
                src="/images/interim-management-hero.jpg"
                alt="Scaliify Interim HR Management Senior Leadership Advisory"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PARTNER / CLIENT LOGO STRIP                               */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-8 sm:py-12 border-y border-gray-100 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <div className="w-full flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 opacity-80 grayscale hover:grayscale-0 transition-all duration-300">
            {companies.slice(0, 6).map((c) => (
              <div key={c.id} className="relative h-7 w-20 sm:w-24 shrink-0 flex items-center justify-center">
                <Image
                  src={c.logoUrl}
                  alt={`Partner ${c.id}`}
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="96px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. TRIGGER SITUATIONS                                        */}
      {/* ============================================================ */}
      <section id="triggers" className="w-full bg-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-black">
              {isDe ? "Wenn Sie sofort erfahrene HR-Führung brauchen" : "When you need experienced HR leadership, fast"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8">
            {triggerSituations.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3 group p-6 rounded-2xl bg-white border border-gray-100 hover:border-[#81D8D0]/60 shadow-2xs hover:shadow-md transition-all duration-300">
                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5BC7BC] via-[#81D8D0] to-[#A8F5EE] text-[#05434B] flex items-center justify-center shrink-0 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.85),0_8px_20px_rgba(129,216,208,0.38)] border border-white/70 mb-1 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.95),0_12px_25px_rgba(129,216,208,0.55)] overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/45 to-transparent pointer-events-none rounded-t-2xl" />
                  <Icon className="w-5 h-5 stroke-[2.4] relative z-10" />
                </div>
                <h3 className="text-base sm:text-[17px] font-bold text-black leading-snug">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. MARQUEE CAROUSEL                                          */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-12 sm:py-16 overflow-hidden border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2">
            {isDe ? "ERFOLGREICH BEI ÜBER 100 ORGANISATIONEN" : "PROVEN LEADERSHIP ACROSS 100+ ORGANISATIONS"}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black leading-tight">
            {isDe ? "Verlässliche Führung in Übergangsphasen" : "Proven leadership in high-stakes transitions"}
          </h2>
        </div>

        <div className="relative w-full overflow-hidden select-none py-1">
          <div className="animate-marquee-left flex items-center gap-3.5 sm:gap-6 w-max">
            {[...marqueeCards, ...marqueeCards].map((card, index) => (
              <div key={index} className="shrink-0">
                {card.type === "quote-card" && (
                  <div
                    className={`${card.bg} ${card.border} rounded-[26px] p-6 sm:p-7 w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] flex flex-col justify-between border shadow-xs hover:shadow-md transition-all duration-300`}
                  >
                    <div className="pt-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-[#2B4C55] tracking-tighter lowercase block">
                        {card.brandName}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <p className="text-xs sm:text-sm text-black font-semibold leading-relaxed">
                        &ldquo;{card.quote}&rdquo;
                      </p>
                      <p className="text-[11px] text-gray-700 font-bold">
                        {card.author}
                      </p>
                    </div>
                  </div>
                )}

                {card.type === "image-card" && (
                  <div className="relative rounded-[26px] w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300">
                    <Image
                      src={card.image!}
                      alt={card.author!}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="310px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B4C55]/90 via-black/30 to-transparent" />
                    <div className="absolute inset-x-3 bottom-3 bg-[#05434B]/80 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 text-white">
                      <p className="text-xs leading-relaxed font-medium mb-1.5 line-clamp-4">
                        &ldquo;{card.quote}&rdquo;
                      </p>
                      <p className="text-[10px] text-[#76D8C8] font-bold">
                        {card.author}
                      </p>
                    </div>
                  </div>
                )}

                {card.type === "stat-card" && (
                  <div
                    className={`${card.bg} rounded-[26px] p-6 sm:p-7 w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] text-white flex flex-col items-center justify-between text-center relative shadow-xs hover:shadow-md transition-all duration-300 border ${card.border}`}
                  >
                    <div className="w-full flex justify-center pt-1 opacity-0 select-none">
                      spacer
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-5xl sm:text-6xl font-black leading-none tracking-tight text-white">
                        {card.stat}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-[#76D8C8] mt-2">
                        {card.sub}
                      </p>
                    </div>
                    <div className="pb-1">
                      <span className="text-base sm:text-lg font-bold font-serif italic text-white/95 tracking-wide">
                        {card.brand}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. BEFORE VS AFTER COMPARISON CARD                           */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4FB8AA] mb-2.5">
              {isDe ? "DER SCALIIFY-UNTERSCHIED" : "THE SCALIIFY DIFFERENCE"}
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black">
              {isDe ? "Warum Unternehmen Scaliify für Interimsführung wählen" : "Why companies choose Scaliify for interim leadership"}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#05434B] via-[#2B4C55] to-[#1b3a42] rounded-3xl p-6 sm:p-10 border border-[#76D8C8]/20 shadow-[0_15px_45px_rgba(5,67,75,0.22)] grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(118,216,200,0.25)_0%,transparent_70%)] pointer-events-none blur-2xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle,rgba(79,184,170,0.18)_0%,transparent_70%)] pointer-events-none blur-2xl" />

            {/* Left: Traditional Agencies */}
            <div className="flex flex-col justify-between py-2 sm:py-4 pr-0 md:pr-6 relative z-10 text-white">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
                  {isDe ? "Klassische Personalvermittler" : "Traditional Agencies"}
                </h3>
                <ul className="flex flex-col gap-4">
                  {beforeAgencyItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                      <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5 text-gray-300">
                        <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Scaliify Interim Management */}
            <div className="bg-white text-gray-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-[#76D8C8]/50 flex flex-col justify-between relative z-10">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#2B4C55] mb-6">
                  {isDe ? "Scaliify Interimsmanagement" : "Scaliify Interim Management"}
                </h3>
                <ul className="flex flex-col gap-4">
                  {afterScaliifyItems.map(({ text, badge }) => (
                    <li key={text} className="flex items-start gap-3 text-xs sm:text-sm text-black font-semibold">
                      <div className="w-5 h-5 rounded-full bg-[#4FB8AA] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2.5">
                        <span className="text-gray-950 font-bold leading-snug">{text}</span>
                        {badge && (
                          <span className="self-start sm:self-center shrink-0 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wide bg-[#76D8C8]/30 text-[#05434B] px-2.5 py-0.5 rounded-full whitespace-nowrap">
                            {badge}
                          </span>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. TESTIMONIALS SECTION                                      */}
      {/* ============================================================ */}
      <Testimonials />

      {/* ============================================================ */}
      {/* 7. FREQUENTLY ASKED QUESTIONS ACCORDION                      */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#2B4C55] mb-2.5">
              {isDe ? "KLARE ANTWORTEN" : "CLEAR ANSWERS"}
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              {isDe ? "Häufig gestellte Fragen" : "Frequently asked questions"}
            </h2>
          </div>

          <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
            {interimFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div key={index} className="transition-colors">
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full py-5 sm:py-6 flex items-center justify-between text-left group cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-gray-900 text-base sm:text-lg md:text-[19px] pr-6 group-hover:text-black leading-snug transition-colors">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-700 shrink-0 transition-transform duration-300 ease-in-out group-hover:text-black ${
                        isOpen ? "rotate-180 text-black" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 sm:pb-7 pr-8 text-gray-600 text-sm sm:text-base leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. DISCOVERY & CONSULTATION BOOKING LEAD SECTION             */}
      {/* ============================================================ */}
      <BookingLeadSection />

      {/* ============================================================ */}
      {/* 9. BLOG SECTION                                              */}
      {/* ============================================================ */}
      <BlogSection />
    </main>
  );
}
