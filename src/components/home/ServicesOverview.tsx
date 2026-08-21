import { services } from "@/data/services";

export function ServicesOverview() {
  return (
    <section id="services" className="w-full py-32 px-4 md:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-6 text-center items-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Our Services</h2>
          <p className="text-gray-400 max-w-2xl text-xl leading-relaxed">
            Comprehensive HR solutions tailored to modernize and scale your business operations.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-[#81D8D0]/50 hover:bg-white/10 transition-all cursor-pointer group">
              <h3 className="text-2xl font-bold mb-4 group-hover:text-[#81D8D0] transition-colors">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
