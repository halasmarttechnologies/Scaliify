"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { submitLead } from "@/lib/api";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";


export function LetsTalkClient() {
  const locale = useLocale();
  const isDe = locale === "de";
  const t = useTranslations("letsTalk");
  const searchParams = useSearchParams();
  const paramEmail = searchParams.get("email");

  const steps = [
    {
      n: "1",
      title: t("steps.0.title"),
      desc: t("steps.0.desc"),
    },
    {
      n: "2",
      title: t("steps.1.title"),
      desc: t("steps.1.desc"),
    },
    {
      n: "3",
      title: t("steps.2.title"),
      desc: t("steps.2.desc"),
    },
  ];

  const marqueeCards = [
    {
      type: "quote-card" as const,
      bg: "bg-[#edf4fb]",
      brandName: t("marqueeCards.0.brandName"),
      quote: t("marqueeCards.0.quote"),
      author: t("marqueeCards.0.author"),
    },
    {
      type: "image-card" as const,
      image: "/images/rowing-team.jpg",
      quote: t("marqueeCards.1.quote"),
      author: t("marqueeCards.1.author"),
    },
    {
      type: "stat-card" as const,
      bg: "bg-[#05434B]",
      stat: t("marqueeCards.2.stat"),
      sub: t("marqueeCards.2.sub"),
      brand: t("marqueeCards.2.brand"),
    },
    {
      type: "image-card" as const,
      image: "/images/food-pantry.jpg",
      quote: t("marqueeCards.3.quote"),
      author: t("marqueeCards.3.author"),
    },
    {
      type: "quote-card" as const,
      bg: "bg-[#edfbf7]",
      brandName: t("marqueeCards.4.brandName"),
      quote: t("marqueeCards.4.quote"),
      author: t("marqueeCards.4.author"),
    },
    {
      type: "image-card" as const,
      image: "/images/office-team.jpg",
      quote: t("marqueeCards.5.quote"),
      author: t("marqueeCards.5.author"),
    },
  ];
  const [email, setEmail] = useState(() => paramEmail?.trim() || "");
  const [step, setStep] = useState(() => (paramEmail && paramEmail.includes("@") ? 2 : 1));
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (paramEmail && paramEmail.trim()) {
      const trimmed = paramEmail.trim();
      setEmail(trimmed);
      if (trimmed.includes("@")) {
        setStep(2);
      }
    }
  }, [paramEmail]);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (company) setStep(3);
  };

  const handleStep3 = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consentChecked) {
      setSubmitError(
        isDe
          ? "Bitte bestätigen Sie die Einwilligung, um fortzufahren."
          : "Please check the consent box to continue."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const parts = name.trim().split(/\s+/);
    const firstName = parts[0] || "";
    const lastName = parts.length > 1 ? parts.slice(1).join(" ") : firstName;

    const result = await submitLead({
      firstName,
      lastName,
      email,
      companyName: company,
      source: "lets_talk",
      comments: "[Consultation Request via Let's Talk]",
    });

    setIsSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <main className="w-full bg-white overflow-hidden text-black">

      {/* ============================================================ */}
      {/* SECTION 1 — HERO: Full Viewport Height (100% Browser Zone)   */}
      {/* ============================================================ */}
      <section className="w-full min-h-[100dvh] relative overflow-hidden bg-gradient-to-b from-white via-[#81D8D0]/35 to-[#f2faf9] flex flex-col justify-center items-center">
        {/* Soft Tiffany Blue Radial Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[radial-gradient(circle,rgba(129,216,208,0.45)_0%,transparent_70%)] pointer-events-none blur-3xl -z-0" />

        <div className="relative z-10 w-full pt-28 sm:pt-32 pb-8 sm:pb-12 px-4 sm:px-6 flex-1 flex flex-col items-center justify-center text-center">

          {/* Kicker (Black color text) */}
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-black mb-3">
            {t("kicker")}
          </p>

          {/* H1 (Black color text) */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black leading-[1.08] mb-6 sm:mb-8 max-w-3xl">
            {t("heading")}
          </h1>



          {/* ── FORM CARD ── */}
          <div className="w-full max-w-[420px] bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-7 text-left shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
            {submitted ? (
              <div className="py-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-teal/20 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-black stroke-[2.5]" />
                </div>
                <h2 className="text-base font-bold text-black">{t("successHeading")}</h2>
                <p className="text-xs text-gray-800 leading-relaxed max-w-[280px]">
                  {t("successMessage")}
                </p>
              </div>
            ) : (
              <>
                {/* Form title + step indicator */}
                <div className="mb-4">
                  <p className="text-sm font-bold text-black mb-1">{t("formTitle")}</p>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-700 mb-1">
                    <span>{t("stepOf", { step })}</span>
                  </div>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className="h-[3px] flex-1 rounded-full transition-all duration-300"
                        style={{
                          background: s <= step ? "#000000" : "#e5e7eb",
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Step 1: Email */}
                {step === 1 && (
                  <form id="lets-talk-step-1" data-formid="Lets Talk - Step 1" onSubmit={handleStep1} className="flex flex-col gap-3.5">
                    <input
                      id="lets_talk_email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t("emailPlaceholder")}
                      aria-label={isDe ? "Geschäftliche E-Mail-Adresse" : "Business email address"}
                      className="w-full border-b border-gray-300 focus:border-black py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none bg-transparent transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full bg-black text-white text-sm font-bold py-3 rounded-xl hover:bg-gray-900 transition-colors mt-0.5 cursor-pointer active:scale-[0.99]"
                    >
                      {t("continue")}
                    </button>
                    <p className="text-[10px] text-gray-600 text-center leading-relaxed">
                      {isDe ? (
                        <>Diese Website wird durch reCAPTCHA geschützt. Es gelten die Google-{" "}
                          <a href="/privacy" className="underline font-medium text-black">Datenschutzerklärung</a> und{" "}
                          <a href="/terms" className="underline font-medium text-black">Nutzungsbedingungen</a>.
                        </>
                      ) : (
                        <>This site is protected by reCAPTCHA and the Google{" "}
                          <a href="/privacy" className="underline font-medium text-black">Privacy Policy</a> and{" "}
                          <a href="/terms" className="underline font-medium text-black">Terms of Service</a> apply.
                        </>
                      )}
                    </p>
                  </form>
                )}

                {/* Step 2: Company */}
                {step === 2 && (
                  <form id="lets-talk-step-2" data-formid="Lets Talk - Step 2" onSubmit={handleStep2} className="flex flex-col gap-3.5">
                    {/* Carried-over email for GHL contact mapping */}
                    <label htmlFor="lets_talk_email_s2" className="sr-only">Email</label>
                    <input
                      id="lets_talk_email_s2"
                      name="email"
                      type="email"
                      value={email}
                      readOnly
                      tabIndex={-1}
                      aria-hidden="true"
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                    />
                    <label htmlFor="lets_talk_company" className="sr-only">Company Name</label>
                    <input
                      id="lets_talk_company"
                      name="company"
                      type="text"
                      required
                      autoComplete="organization"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder={t("companyPlaceholder")}
                      aria-label={isDe ? "Unternehmen" : "Company name"}
                      className="w-full border-b border-gray-300 focus:border-black py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none bg-transparent transition-colors"
                    />
                    {/* Offscreen aliases for GHL built-in 'Business Name' and custom 'Company name' */}
                    <label htmlFor="lets_talk_company_name" className="sr-only">Company name</label>
                    <input
                      id="lets_talk_company_name"
                      name="company_name"
                      type="text"
                      tabIndex={-1}
                      aria-hidden="true"
                      readOnly
                      value={company}
                      style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                    />
                    <label htmlFor="lets_talk_business_name" className="sr-only">Business Name</label>
                    <input
                      id="lets_talk_business_name"
                      name="business_name"
                      type="text"
                      tabIndex={-1}
                      aria-hidden="true"
                      readOnly
                      value={company}
                      style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                    />
                    <label htmlFor="lets_talk_companyName" className="sr-only">Company Name</label>
                    <input
                      id="lets_talk_companyName"
                      name="companyName"
                      type="text"
                      tabIndex={-1}
                      aria-hidden="true"
                      readOnly
                      value={company}
                      style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                    />
                    <button
                      type="submit"
                      className="w-full bg-black text-white text-sm font-bold py-3 rounded-xl hover:bg-gray-900 transition-colors mt-0.5 cursor-pointer active:scale-[0.99]"
                    >
                      {t("continue")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-black font-semibold hover:underline text-center transition-colors cursor-pointer"
                    >
                      {t("back")}
                    </button>
                  </form>
                )}

                {/* Step 3: Name */}
                {step === 3 && (
                  <form id="lets-talk-step-3" data-formid="Lets Talk - Step 3" onSubmit={handleStep3} className="flex flex-col gap-3.5">
                    {/* Carried-over email and company for complete GHL contact creation */}
                    <label htmlFor="lets_talk_email_s3" className="sr-only">Email</label>
                    <input
                      id="lets_talk_email_s3"
                      name="email"
                      type="email"
                      value={email}
                      readOnly
                      tabIndex={-1}
                      aria-hidden="true"
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                    />
                    <label htmlFor="lets_talk_company_s3" className="sr-only">Company Name</label>
                    <input
                      id="lets_talk_company_s3"
                      name="company"
                      type="text"
                      value={company}
                      readOnly
                      tabIndex={-1}
                      aria-hidden="true"
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                    />
                    <label htmlFor="lets_talk_company_name_s3" className="sr-only">Company name</label>
                    <input
                      id="lets_talk_company_name_s3"
                      name="company_name"
                      type="text"
                      value={company}
                      readOnly
                      tabIndex={-1}
                      aria-hidden="true"
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                    />
                    <label htmlFor="lets_talk_business_name_s3" className="sr-only">Business Name</label>
                    <input
                      id="lets_talk_business_name_s3"
                      name="business_name"
                      type="text"
                      value={company}
                      readOnly
                      tabIndex={-1}
                      aria-hidden="true"
                      className="sr-only"
                      style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", border: 0 }}
                    />
                    <label htmlFor="lets_talk_name" className="sr-only">Full Name</label>
                    <input
                      id="lets_talk_name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t("namePlaceholder")}
                      aria-label={isDe ? "Vollständiger Name" : "Full name"}
                      disabled={isSubmitting}
                      className="w-full border-b border-gray-300 focus:border-black py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none bg-transparent transition-colors disabled:opacity-50"
                    />
                    {/* Consent Tick Checkbox */}
                    <div className="flex items-start gap-2.5 pt-1 text-left">
                      <input
                        type="checkbox"
                        id="lets_talk_consent"
                        name="consent"
                        required
                        checked={consentChecked}
                        onChange={(e) => setConsentChecked(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-gray-300 accent-black cursor-pointer"
                      />
                      <label htmlFor="lets_talk_consent" className="text-xs text-gray-700 leading-relaxed cursor-pointer select-none">
                        {isDe ? (
                          <>
                            Ich stimme der Kontaktaufnahme und Verarbeitung meiner Angaben gemäß der{" "}
                            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-black hover:text-gray-700">
                              Datenschutzerklärung
                            </a>{" "}
                            zu. *
                          </>
                        ) : (
                          <>
                            I agree to the processing of my details and contact in accordance with the{" "}
                            <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline font-semibold text-black hover:text-gray-700">
                              privacy policy
                            </a>
                            . *
                          </>
                        )}
                      </label>
                    </div>

                    {submitError && (
                      <p className="text-sm text-red-600 text-center" role="alert">
                        {submitError}
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-black text-white text-sm font-bold py-3 rounded-xl hover:bg-gray-900 transition-colors mt-0.5 cursor-pointer active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? t("submitting") : t("bookMyDemo")}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={isSubmitting}
                      className="text-xs text-black font-semibold hover:underline text-center transition-colors cursor-pointer disabled:opacity-50"
                    >
                      {t("back")}
                    </button>
                  </form>
                )}
              </>
            )}
          </div>

          <p className="mt-5 text-xs sm:text-sm text-black font-semibold flex items-center justify-center gap-2">
            <span>{isDe ? "Führende Organisationen vertrauen uns, darunter" : "Trusted by leading organisations including"}</span>
            <span className="font-extrabold tracking-tight text-sm sm:text-base font-sans">Westbridge, SoftwareOne & TAKKT Group</span>
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — "YOUR TAILORED SOLUTION / HERE'S WHAT TO EXPECT" */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-10 sm:py-14 px-4 sm:px-6 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-8 sm:mb-10">
            <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-black mb-2">
            {t("tailoredSolution")}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black">
            {t("whatToExpect")}
          </h2>
          </div>

          {/* 3-Step Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {steps.map(({ n, title, desc }) => (
              <div key={n} className="flex flex-col items-center sm:items-start text-center sm:text-left gap-2.5">
                {/* Number Badge */}
                <div className="w-9 h-9 rounded-xl bg-[#074f59] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <span className="text-xs font-extrabold">{n}</span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-black leading-snug">{title}</h3>
                <p className="text-xs text-gray-800 leading-relaxed font-medium">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SECTION 3 — MARQUEE CAROUSEL (Infinite loop of cards)        */}
      {/* ============================================================ */}
      <section className="w-full bg-white py-10 sm:py-14 overflow-hidden border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 text-center">
          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-black mb-2">
            {t("usedDaily")}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black leading-tight">
            {t("joinOrgs")}
          </h2>
        </div>

        {/* ── Marquee Container with smooth infinite glide (No side fades) ── */}
        <div className="relative w-full overflow-hidden select-none py-1">
          {/* Marquee Track — duplicate items for seamless continuous loop */}
          <div className="animate-marquee-left flex items-center gap-3.5 sm:gap-6 w-max">
            {[...marqueeCards, ...marqueeCards].map((card, index) => (
              <div key={index} className="shrink-0">
                {/* Type 1: Quote Card (Solid light background with large logo) */}
                {card.type === "quote-card" && (
                  <div
                    className={`${card.bg} rounded-[26px] p-6 sm:p-7 w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] flex flex-col justify-between border border-gray-200/50 shadow-xs hover:shadow-md transition-all duration-300`}
                  >
                    <div className="pt-1">
                      <span className="text-2xl sm:text-3xl font-extrabold text-black tracking-tighter block">
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

                {/* Type 2: Full Image Card with Frosted Dark Overlay at Bottom */}
                {card.type === "image-card" && (
                  <div
                    className="relative rounded-[26px] w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300"
                  >
                    {/* Background photo */}
                    <Image
                      src={card.image!}
                      alt={card.author!}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="310px"
                    />

                    {/* Dark gradient fade over bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Floating Frosted Glass Quote Card at bottom */}
                    <div className="absolute inset-x-3 bottom-3 bg-black/65 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 text-white">
                      <p className="text-xs leading-relaxed font-medium mb-1.5 line-clamp-4">
                        &ldquo;{card.quote}&rdquo;
                      </p>
                      <p className="text-[10px] text-gray-300 font-bold">
                        {card.author}
                      </p>
                    </div>
                  </div>
                )}

                {/* Type 3: Bold Purple Stat Card */}
                {card.type === "stat-card" && (
                  <div
                    className={`${card.bg} rounded-[26px] p-6 sm:p-7 w-[280px] sm:w-[310px] h-[370px] sm:h-[400px] text-white flex flex-col items-center justify-between text-center relative shadow-xs hover:shadow-md transition-all duration-300`}
                  >
                    <div className="w-full flex justify-center pt-1 opacity-0 select-none">
                      spacer
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="text-5xl sm:text-6xl font-black leading-none tracking-tight">
                        {card.stat}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-white/90 mt-2">
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
    </main>
  );
}
