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
    <main className="w-full min-h-screen relative">
      <Hero />
      <ServicesOverview />
      <CoreFeatures />
      <TrustedCompanies />
      <SoftwareStack />
      <Testimonials />
      <FAQ />
      <BlogSection />
    </main>
  );
}
