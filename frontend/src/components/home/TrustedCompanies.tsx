"use client";

import Image from "next/image";
import { companies } from "@/data/companies";
import { motion } from "framer-motion";
import { CompanyLogo } from "@/components/ui/CompanyLogo";

export { CompanyLogo };

export function TrustedCompanies() {
  return (
    <section
      id="companies"
      className="w-full bg-[#fafafa] py-14 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-8 sm:mb-14 px-2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight text-gray-900 leading-tight">
            Trusted by growing teams worldwide
          </h2>
        </motion.div>

        {/* Clean Logo Grid with 13 official partner logos */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4.5 max-w-[1200px]"
        >
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 hover:border-gray-300 hover:shadow-xs transition-all duration-300 py-4 px-4 sm:py-5 sm:px-6 flex items-center justify-center cursor-default select-none group min-h-[70px] sm:min-h-[82px]"
            >
              <div className="relative w-full h-8 sm:h-10 flex items-center justify-center">
                <Image
                  src={company.logoUrl}
                  alt={`Partner logo ${company.id}`}
                  fill
                  unoptimized
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 18vw"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
