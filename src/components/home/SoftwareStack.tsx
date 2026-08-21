import { software } from "@/data/software";

export function SoftwareStack() {
  return (
    <section id="software" className="w-full py-32 px-4 md:px-8 bg-[#81D8D0]/10">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-6">
          <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight">The Software We Work With</h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
            We have expertise across a wide range of modern HR and recruiting platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {Object.entries(software).map(([category, tools]) => (
            <div key={category} className="flex flex-col gap-8 bg-white p-8 rounded-3xl shadow-sm border border-black/5">
              <h3 className="text-xl font-bold uppercase tracking-widest text-black border-b-2 border-[#81D8D0] pb-4 inline-block self-start">
                {category}
              </h3>
              <ul className="flex flex-col gap-4">
                {tools.map((tool) => (
                  <li key={tool} className="text-muted-foreground text-lg font-medium flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#81D8D0]" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
