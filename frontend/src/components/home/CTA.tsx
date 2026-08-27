import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="w-full py-40 px-4 md:px-8 bg-black text-white text-center flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#81D8D0]/10 rounded-full blur-3xl -z-10" />
      
      <div className="max-w-4xl flex flex-col items-center gap-10">
        <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
          Ready to Transform <br/> Your <span className="text-[#81D8D0]">HR Strategy?</span>
        </h2>
        <p className="text-2xl text-gray-400 max-w-2xl leading-relaxed">
          Get in touch with us today to see how Scaliify can streamline your business operations and tech stack.
        </p>
        <Button size="lg" variant="glossy" className="mt-8 px-12 h-16 rounded-full text-xl hover:scale-105">
          Contact Us Now
        </Button>
      </div>
    </section>
  );
}
