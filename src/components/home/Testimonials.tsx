"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonials = [
  {
    id: "luckycharm",
    quote: "Scaliify has transformed how we manage team dynamics. The platform streamlines our processes, making them quicker and more organized. We collaborate effectively and easily track projects, greatly boosting our productivity.",
    author: "Marvin McKinney",
    title: "HR Manager",
    company: "Luckycharm",
  },
  {
    id: "prometheus",
    quote: "With Scaliify, we streamlined our HR processes, achieving a 40% workload reduction in weeks. This shift lets our team prioritize strategic initiatives over administrative tasks.",
    author: "Leslie Alexander",
    title: "Prometheus Founder",
    company: "Prometheus",
  },
  {
    id: "nietzsche",
    quote: "Managing remote teams used to be chaotic. With Scaliify, we achieved full visibility and control over our projects, simplifying our workflow and enabling seamless collaboration, no matter where our team members are.",
    author: "Guy Hawkins",
    title: "Nietzsche, Inc.",
    company: "Nietzsche",
  }
];

function CompanyLogo({ company }: { company: string }) {
  if (company === "Luckycharm") {
    return (
      <div className="flex items-center gap-2.5 mb-5">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <rect x="2" y="2" width="9" height="9" rx="2.5" fill="#10B981"/>
          <rect x="13" y="2" width="9" height="9" rx="2.5" fill="#059669"/>
          <rect x="2" y="13" width="9" height="9" rx="2.5" fill="#059669"/>
          <rect x="13" y="13" width="9" height="9" rx="2.5" fill="#047857"/>
        </svg>
        <span className="font-bold text-gray-900 tracking-tight text-[17px]">{company}</span>
      </div>
    );
  } else if (company === "Prometheus") {
    return (
      <div className="flex items-center gap-2.5 mb-5">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <path d="M2 8l18-5v4l-18 5V8z" fill="#4B5563"/>
          <path d="M2 14l18-5v4l-18 5v-4z" fill="#374151"/>
          <path d="M2 20l18-5v4l-18 5v-4z" fill="#1F2937"/>
        </svg>
        <span className="font-bold text-gray-900 tracking-tight text-[17px]">{company}</span>
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-2.5 mb-5">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
          <circle cx="12" cy="12" r="9" stroke="#F97316" strokeWidth="2.5" strokeDasharray="4 3" fill="transparent" />
          <circle cx="12" cy="12" r="5" fill="#EA580C"/>
        </svg>
        <span className="font-bold text-gray-900 tracking-tight text-[17px]">{company}</span>
      </div>
    );
  }
}

function Avatar({ name, role }: { name: string, role: string }) {
  const initials = name.split(' ').map(n => n[0]).join('');
  return (
    <div className="flex items-center gap-3.5 mt-auto pt-6">
      <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-600 font-semibold text-[15px] border border-gray-200">
        {initials}
      </div>
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900 text-[15px] leading-tight">{name}</span>
        <span className="text-gray-500 text-[14px] leading-tight mt-0.5">{role}</span>
      </div>
    </div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Testimonial Cards Animation
      if (gridRef.current) {
        const cards = gridRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="w-full bg-[#fafafa] py-12 md:py-16 px-8 sm:px-16 md:px-24 lg:px-36 xl:px-44">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div ref={headerRef} className="flex flex-col items-center text-center">
          <h2 className="text-3xl sm:text-4xl md:text-[42px] font-bold tracking-tight text-gray-900 text-center mb-4">
            Loved by Teams Like Yours
          </h2>
          <p className="text-gray-500 max-w-2xl text-center text-[15px] sm:text-base mb-12 sm:mb-16">
            See how companies are transforming their HR with Scaliify.
          </p>
        </div>

        <div 
          ref={gridRef}
          className="w-full grid grid-cols-1 md:grid-cols-3 gap-0 max-w-[1100px] bg-white rounded-2xl border border-gray-100 overflow-hidden"
        >
          {testimonials.map((t, index) => (
            <div 
              key={t.id} 
              className={`flex flex-col p-8 sm:p-10 ${index !== testimonials.length - 1 ? 'border-b md:border-b-0 md:border-r border-gray-100' : ''}`}
            >
               <CompanyLogo company={t.company} />
               <p className="text-gray-600 text-[15px] leading-relaxed">
                 "{t.quote}"
               </p>
               <Avatar name={t.author} role={t.title} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
