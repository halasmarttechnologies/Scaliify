import { companies } from "@/data/companies";

export function TrustedCompanies() {
  return (
    <section id="companies" className="w-full py-32 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Trusted by Industry Leaders</h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {/* TODO: Add proper marquees and logos later */}
          {companies.map((company) => (
            <div key={company} className="px-6 py-3 rounded-full bg-black/5 border border-black/10 text-muted-foreground font-medium text-sm md:text-base hover:bg-black hover:text-white transition-colors cursor-default">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
