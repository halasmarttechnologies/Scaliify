"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, ArrowUpRight, Cpu, Layers, UserCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface BlogPost {
  slug: string;
  category: string;
  categoryIcon: typeof Cpu;
  readTime: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
}

const blogs: BlogPost[] = [
  {
    slug: "selecting-right-hris-guide",
    category: "HR Technology",
    categoryIcon: Cpu,
    readTime: "5 min read",
    date: "May 14, 2026",
    title: "The Ultimate Guide to Selecting the Right HRIS for Scaling Teams",
    excerpt:
      "How to audit your business requirements, evaluate vendor pricing models, and avoid costly implementation mistakes.",
    image: "/blog-1.jpg",
    author: {
      name: "Sarah Jenkins",
      role: "Head of HR Tech Advisory",
      initials: "SJ",
    },
  },
  {
    slug: "automate-people-ops-workflows",
    category: "Process Optimisation",
    categoryIcon: Layers,
    readTime: "4 min read",
    date: "Apr 28, 2026",
    title: "How to Automate 70% of Your Repetitive People Operations Workflows",
    excerpt:
      "Step-by-step strategies to link applicant tracking, onboarding documents, and payroll sync without manual data entry.",
    image: "/blog-2.jpg",
    author: {
      name: "Marcus Vance",
      role: "Lead Systems Architect",
      initials: "MV",
    },
  },
  {
    slug: "when-to-hire-interim-cpo",
    category: "Strategy & Advisory",
    categoryIcon: UserCheck,
    readTime: "6 min read",
    date: "Apr 10, 2026",
    title: "When and Why Scaling Companies Need an Interim Chief People Officer",
    excerpt:
      "Navigating hypergrowth, executive vacancies, and organizational restructuring with on-demand strategic HR leadership.",
    image: "/blog-3.jpg",
    author: {
      name: "Kathryn Murphy",
      role: "Senior HR Advisor",
      initials: "KM",
    },
  },
];

export function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards Stagger Animation
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.fromTo(
          cards,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
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
    <section
      ref={sectionRef}
      id="blog"
      className="w-full bg-[#fafafa] py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 border-t border-gray-100"
    >
      <div className="max-w-6xl mx-auto flex flex-col">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-14">
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0C241D] tracking-wide mb-3">
              <span className="w-2 h-2 rounded-full bg-[#0C241D]" />
              <span>Insights & Articles</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 leading-[1.15]">
              Latest Insights to <br className="hidden sm:inline" />
              Scale Your People Operations
            </h2>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0C241D] hover:text-black border-b border-[#0C241D] pb-1 self-start sm:self-end transition-colors group cursor-pointer"
          >
            <span>Explore all insights</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 3 Blog Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
        >
          {blogs.map((blog, idx) => {
            const Icon = blog.categoryIcon;
            return (
              <article
                key={idx}
                className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-gray-300 hover:-translate-y-1 group shadow-sm"
              >
                {/* Top Image Container */}
                <div className="p-4 pb-0">
                  <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 380px"
                    />
                    
                    {/* Category Tag Overlay */}
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/60 shadow-xs">
                      <Icon className="w-3.5 h-3.5 text-[#0C241D]" />
                      <span className="text-[11px] font-bold text-gray-900 tracking-wide">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{blog.date}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{blog.readTime}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight leading-snug mb-3 group-hover:text-[#0C241D] transition-colors">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Author & Read Link */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#0C241D] text-white flex items-center justify-center font-bold text-xs">
                        {blog.author.initials}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 leading-tight">
                          {blog.author.name}
                        </p>
                        <p className="text-[11px] text-gray-500">
                          {blog.author.role}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-700 group-hover:bg-[#0C241D] group-hover:text-white group-hover:border-[#0C241D] transition-all">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
