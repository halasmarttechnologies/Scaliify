import { Hero } from "@/components/home/Hero";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { TrustedCompanies } from "@/components/home/TrustedCompanies";
import { SoftwareStack } from "@/components/home/SoftwareStack";
import { CTA } from "@/components/home/CTA";

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen items-center">
      <Hero />
      <ServicesOverview />
      <TrustedCompanies />
      <SoftwareStack />
      <CTA />
    </main>
  );
}
