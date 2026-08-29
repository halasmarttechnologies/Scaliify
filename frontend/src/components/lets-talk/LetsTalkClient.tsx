"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    n: "1",
    title: "Tell us about your HR needs",
    desc: "We'll learn your HR needs and explore if Scaliify is the right fit.",
  },
  {
    n: "2",
    title: "We'll build a tailored demo",
    desc: "Explore a customised walkthrough, aligned to your exact goals.",
  },
  {
    n: "3",
    title: "Experience Scaliify in action",
    desc: "Ask personalised questions and learn how Scaliify could support your business.",
  },
];

const marqueeCards = [
  // 1. Polaroid pastel blue card
  {
    type: "quote-card",
    bg: "bg-[#edf4fb]",
    brandName: "polaroid",
    quote:
      "Scaliify's Customer Service was brilliant! Our Advisory Manager understood HR, was really responsive and I really had the feeling we would get good customer service.",
    author: "Melinda Brooks Bray | Polaroid",
  },
  // 2. Rowing Team Full Image Card
  {
    type: "image-card",
    image: "/images/rowing-team.jpg",
    quote:
      "If we want to be a future robust organisation, we cannot keep doing things manually. Automations help, so you can put your effort somewhere more useful.",
    author: "Nina Johansson | British Rowing",
  },
  // 3. Deliciously Ella Purple Stat Card
  {
    type: "stat-card",
    bg: "bg-[#63207e]",
    stat: "50%",
    sub: "faster recruitment",
    brand: "deliciously ella®",
  },
  // 4. Food Pantry Full Image Card
  {
    type: "image-card",
    image: "/images/food-pantry.jpg",
    quote:
      "It's really intuitive and easy to use for everyone in the business. We don't need loads of different systems anymore which can be expensive and confusing.",
    author: "Fran Newman | Deliciously Ella",
  },
  // 5. Mint green quote card
  {
    type: "quote-card",
    bg: "bg-[#edfbf7]",
    brandName: "aryza",
    quote:
      "Scaliify benchmarked 20+ vendors for our European operations in days. We saved months of manual demos and evaluation meetings.",
    author: "Jack Wilson | Aryza Group",
  },
  // 6. Modern Office Team Full Image Card
  {
    type: "image-card",
    image: "/images/office-team.jpg",
    quote:
      "Having an unbiased HR tech partner guiding our system selection saved us from costly contractual misalignments.",
    author: "Sophie Dubois | ScaleUp Ops",
  },
];

export function LetsTalkClient() {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setStep(2);
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (company) setStep(3);
  };

  const handleStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
            BOOK A DEMO
          </p>

          {/* H1 (Black color text) */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-black leading-[1.08] mb-6 sm:mb-8 max-w-3xl">
            See Scaliify in action
          </h1>

          {/* ── FORM CARD ── */}
          <div className="w-full max-w-[420px] bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-7 text-left shadow-[0_10px_35px_rgba(0,0,0,0.06)]">
            {submitted ? (
              <div className="py-6 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-brand-teal/20 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-black stroke-[2.5]" />
                </div>
                <h3 className="text-base font-bold text-black">You&apos;re booked in!</h3>
                <p className="text-xs text-gray-800 leading-relaxed max-w-[280px]">
                  A Scaliify advisor will reach out within 1 business day to confirm your demo.
                </p>
              </div>
            ) : (
              <>
                {/* Form title + step indicator */}
                <div className="mb-4">
                  <p className="text-sm font-bold text-black mb-1">Book your demo</p>
                  <div className="flex items-center justify-between text-[11px] font-semibold text-gray-700 mb-1">
                    <span>Step {step} of 3</span>
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
                  <form onSubmit={handleStep1} className="flex flex-col gap-3.5">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Business Email Address"
                      aria-label="Business email address"
                      className="w-full border-b border-gray-300 focus:border-black py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none bg-transparent transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full bg-black text-white text-sm font-bold py-3 rounded-xl hover:bg-gray-900 transition-colors mt-0.5 cursor-pointer active:scale-[0.99]"
                    >
                      Continue
                    </button>
                    <p className="text-[10px] text-gray-600 text-center leading-relaxed">
                      This site is protected by reCAPTCHA and the Google{" "}
                      <a href="/privacy" className="underline font-medium text-black">Privacy Policy</a> and{" "}
                      <a href="/terms" className="underline font-medium text-black">Terms of Service</a> apply.
                    </p>
                  </form>
                )}

                {/* Step 2: Company */}
                {step === 2 && (
                  <form onSubmit={handleStep2} className="flex flex-col gap-3.5">
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Company Name"
                      aria-label="Company name"
                      className="w-full border-b border-gray-300 focus:border-black py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none bg-transparent transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full bg-black text-white text-sm font-bold py-3 rounded-xl hover:bg-gray-900 transition-colors mt-0.5 cursor-pointer active:scale-[0.99]"
                    >
                      Continue
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-xs text-black font-semibold hover:underline text-center transition-colors cursor-pointer"
                    >
                      ← Back
                    </button>
                  </form>
                )}

                {/* Step 3: Name */}
                {step === 3 && (
                  <form onSubmit={handleStep3} className="flex flex-col gap-3.5">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Full Name"
                      aria-label="Full name"
                      className="w-full border-b border-gray-300 focus:border-black py-2 text-sm text-black placeholder:text-gray-400 focus:outline-none bg-transparent transition-colors"
                    />
                    <button
                      type="submit"
                      className="w-full bg-black text-white text-sm font-bold py-3 rounded-xl hover:bg-gray-900 transition-colors mt-0.5 cursor-pointer active:scale-[0.99]"
                    >
                      Book my demo
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="text-xs text-black font-semibold hover:underline text-center transition-colors cursor-pointer"
                    >
                      ← Back
                    </button>
                  </form>
                )}
              </>
            )}
          </div>

          {/* Trusted by 16,000 companies line */}
          <p className="mt-5 text-xs sm:text-sm text-black font-semibold flex items-center justify-center gap-2">
            <span>Trusted by over 16,000 companies including</span>
            <span className="font-extrabold tracking-tight text-base font-serif italic">aryza</span>
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
              YOUR TAILORED SOLUTION
            </p>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black">
              Here&apos;s what to expect
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
            USED DAILY BY TEAMS FROM 50-5000 EMPLOYEES
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-black leading-tight">
            Join the organisations unlocking impact
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
                      <span className="text-2xl sm:text-3xl font-extrabold text-black tracking-tighter lowercase block">
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
