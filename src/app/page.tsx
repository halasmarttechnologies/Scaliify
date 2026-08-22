"use client";

import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { CoreFeatures } from "@/components/home/CoreFeatures";
import { TrustedCompanies } from "@/components/home/TrustedCompanies";
import { SoftwareStack } from "@/components/home/SoftwareStack";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { BlogSection } from "@/components/home/BlogSection";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen items-center relative">
      {/* Sticky Hero Layer */}
      <div className="w-full sticky top-0 z-10">
        <Hero />
      </div>

      {/* Stacked Content Layer that smoothly glides up over the Hero */}
      <div className="w-full relative z-20">
        <ServicesOverview />
        <CoreFeatures />
        <TrustedCompanies />
        <SoftwareStack />
        <Testimonials />
        <FAQ />
        <BlogSection />
      </div>
    </main>
  );
}
