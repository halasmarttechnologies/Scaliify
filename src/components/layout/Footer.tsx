"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // CTA Animation
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Links Columns Stagger
      if (linksRef.current) {
        const cols = linksRef.current.children;
        gsap.fromTo(
          cols,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: linksRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Connect Bar
      if (barRef.current) {
        gsap.fromTo(
          barRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: barRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const footerLinks = {
    product: [
      { name: "Features Overview", href: "#services" },
      { name: "Pricing Plans", href: "/contact" },
      { name: "Integrations", href: "/#software" },
      { name: "Product Updates", href: "/#services" },
      { name: "Roadmap", href: "/#services" },
    ],
    company: [
      { name: "About Us", href: "/#services" },
      { name: "Careers", href: "/contact" },
      { name: "Blog & Insights", href: "/#services" },
      { name: "Press Kit", href: "/contact" },
      { name: "Partners", href: "/#companies" },
    ],
    resources: [
      { name: "Help Center", href: "/contact" },
      { name: "Getting Started Guide", href: "/contact" },
      { name: "API Documentation", href: "/contact" },
      { name: "Community", href: "/contact" },
      { name: "Webinars", href: "/contact" },
    ],
  };

  return (
    <footer ref={footerRef} className="w-full bg-black text-white pt-20 pb-12 px-6 sm:px-10 lg:px-16 border-t border-white/10 relative overflow-hidden">
      {/* Background Graphic Image */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <Image
          src="/3.png"
          alt="Footer glowing graphic backdrop"
          fill
          className="object-cover object-top opacity-80 mix-blend-screen"
          priority={false}
        />
        {/* Subtle dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/85 pointer-events-none" />
      </div>

      <div className="max-w-[1360px] mx-auto flex flex-col relative z-10">
        
        {/* Main Call-To-Action (CTA) */}
        <div ref={ctaRef} className="flex flex-col items-center text-center mb-24 md:mb-28">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-5 whitespace-nowrap leading-tight">
            Ready to simplify your HR?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            Join thousands of teams already using Scaliify to manage their workforce smarter.
          </p>

          {/* CTA Pill Button */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-3.5 bg-[#81D8D0] text-black font-bold text-sm sm:text-base pl-8 pr-3.5 py-3 rounded-full hover:bg-white hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-[#81D8D0]/10 group"
          >
            <span>Start Free Trial</span>
            <div className="w-8 h-8 rounded-full bg-black text-[#81D8D0] flex items-center justify-center group-hover:bg-black group-hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </div>
          </Link>
        </div>

        {/* 3. Divider Line */}
        <div className="w-full h-px bg-white/10 mb-16 md:mb-20" />

        {/* 4. Footer Links Grid */}
        <div ref={linksRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column (Spans 2 columns on lg) */}
          <div className="lg:col-span-2 flex flex-col items-start pr-0 lg:pr-12">
            <Link href="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-8 h-8 rounded-lg bg-[#81D8D0] flex items-center justify-center text-black">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="7" cy="7" r="4" />
                  <circle cx="17" cy="7" r="4" fillOpacity="0.75" />
                  <circle cx="7" cy="17" r="4" fillOpacity="0.75" />
                  <circle cx="17" cy="17" r="4" />
                </svg>
              </div>
              <span className="font-bold text-2xl tracking-tight text-white group-hover:text-[#81D8D0] transition-colors">
                Scaliify
              </span>
            </Link>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-sm">
              Smarter HR starts here. Scaliify helps modern teams simplify operations, automate workflows, and build better workplaces without the complexity.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-white text-sm sm:text-base mb-5">Product</h4>
            <ul className="flex flex-col gap-3.5">
              {footerLinks.product.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#81D8D0] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white text-sm sm:text-base mb-5">Company</h4>
            <ul className="flex flex-col gap-3.5">
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#81D8D0] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-white text-sm sm:text-base mb-5">Resources</h4>
            <ul className="flex flex-col gap-3.5">
              {footerLinks.resources.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-[#81D8D0] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 5. Connect with Us Bar */}
        <div ref={barRef} className="w-full flex flex-col sm:flex-row items-center justify-between gap-5 mb-10 py-2">
          <span className="text-white font-medium text-sm sm:text-base text-center sm:text-left">
            Connect with Us:
          </span>
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-black hover:bg-[#81D8D0] hover:border-[#81D8D0] transition-all"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* X (formerly Twitter) */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-black hover:bg-[#81D8D0] hover:border-[#81D8D0] transition-all"
              aria-label="Twitter"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-black hover:bg-[#81D8D0] hover:border-[#81D8D0] transition-all"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-black hover:bg-[#81D8D0] hover:border-[#81D8D0] transition-all"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-none stroke-current stroke-[2]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>

        {/* 6. Copyright & Legal Policies */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Scaliify. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
