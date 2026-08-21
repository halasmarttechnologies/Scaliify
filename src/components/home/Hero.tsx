import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="w-full min-h-[85vh] flex flex-col items-center justify-center text-center px-4 md:px-8 py-20 bg-background text-black">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[1.1]">
          The Consultancy for <br />
          <span className="text-[#81D8D0]">All Things HR</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
          We position Scaliify as the one-stop shop for HR technology, process optimization, interim management, and strategic advisory.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 mt-6">
          {/* TODO: Implement full UI and polish */}
          <Button size="lg" className="bg-[#81D8D0] text-black hover:bg-[#81D8D0]/90 font-bold px-10 h-16 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
            Book a Consultation
          </Button>
          <Button size="lg" variant="outline" className="px-10 h-16 text-lg rounded-full border-2 border-black/10 hover:border-black transition-colors font-semibold">
            View Our Services
          </Button>
        </div>
      </div>
    </section>
  );
}
