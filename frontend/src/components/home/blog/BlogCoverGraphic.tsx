"use client";

import Image from "next/image";
import { BlogPost } from "@/data/blogPosts";

interface BlogCoverGraphicProps {
  post: BlogPost;
}

export function BlogCoverGraphic({ post }: BlogCoverGraphicProps) {
  // 1. Photo Type
  if (post.coverType === "photo" && post.imageUrl) {
    return (
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gray-100">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>
    );
  }

  // 2. Pulse Green
  if (post.coverType === "pulse_green") {
    return (
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#03282d] via-[#05434b] to-[#021b1f] flex items-center justify-center p-6 select-none group-hover:scale-[1.02] transition-transform duration-500">
        {/* Concentric ambient glow rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[85%] h-[75%] rounded-[40px] border border-emerald-400/20 bg-emerald-500/5 shadow-[0_0_40px_rgba(16,185,129,0.15)]" />
          <div className="absolute w-[68%] h-[58%] rounded-[30px] border border-emerald-300/25 bg-emerald-400/10" />
          <div className="absolute w-[50%] h-[42%] rounded-[24px] border border-emerald-200/30 bg-emerald-300/15" />
        </div>

        {/* Center Frosted Glass Pill */}
        <div className="relative z-10 bg-white/20 backdrop-blur-md border border-white/40 px-5 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex items-center gap-1.5">
          <span className="text-white text-xs sm:text-sm font-medium tracking-tight">Scaliify</span>
          <span className="text-white text-xs sm:text-sm font-bold tracking-tight">Pulse</span>
        </div>
      </div>
    );
  }

  // 3. Pulse Orange / Amber
  if (post.coverType === "pulse_orange") {
    return (
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#FDBA74] via-[#FB923C] to-[#EA580C] flex items-center justify-center p-6 select-none group-hover:scale-[1.02] transition-transform duration-500">
        {/* Ambient warm gradient diffusion */}
        <div className="absolute inset-0 bg-radial from-amber-200/50 via-transparent to-transparent pointer-events-none" />
        
        {/* Concentric oval rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[85%] h-[75%] rounded-[40px] border border-white/30 bg-white/10 shadow-[0_0_35px_rgba(251,146,60,0.3)]" />
          <div className="absolute w-[68%] h-[58%] rounded-[30px] border border-white/35 bg-white/15" />
        </div>

        {/* Center Frosted Glass Pill */}
        <div className="relative z-10 bg-white/30 backdrop-blur-md border border-white/60 px-5 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.12)] flex items-center gap-1.5">
          <span className="text-[#05434b] text-xs sm:text-sm font-medium tracking-tight">Scaliify</span>
          <span className="text-[#05434b] text-xs sm:text-sm font-extrabold tracking-tight">Pulse</span>
        </div>
      </div>
    );
  }

  // 4. Power Lavender / Intelligent HR
  if (post.coverType === "power_lavender") {
    return (
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#F3E8FF] via-[#E9D5FF] to-[#A855F7] p-6 flex flex-col justify-between select-none group-hover:scale-[1.02] transition-transform duration-500">
        {/* Top Right Mini Scaliify Badge */}
        <div className="flex justify-end w-full">
          <span className="bg-[#05434b] text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-xs">
            Scaliify
          </span>
        </div>

        {/* Center Typography */}
        <div className="my-auto text-center px-3">
          <p className="text-[#05434b] font-bold text-sm sm:text-base tracking-tight mb-1">
            The Power of Scaliify
          </p>
          <p className="text-purple-950 font-extrabold text-xs sm:text-[13px] leading-tight">
            What the data says <br />
            about <span className="text-purple-900 underline decoration-purple-400">intelligent HR</span>
          </p>
        </div>

        {/* Bottom subtle bar spacer */}
        <div className="h-2" />
      </div>
    );
  }

  // 5. Pulse Purple / Violet
  return (
    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br from-[#4C1D95] via-[#5B21B6] to-[#2E1065] flex items-center justify-center p-6 select-none group-hover:scale-[1.02] transition-transform duration-500">
      {/* Concentric violet rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85%] h-[75%] rounded-[40px] border border-purple-300/20 bg-purple-400/5 shadow-[0_0_40px_rgba(147,51,234,0.25)]" />
        <div className="absolute w-[68%] h-[58%] rounded-[30px] border border-purple-300/25 bg-purple-400/10" />
        <div className="absolute w-[50%] h-[42%] rounded-[24px] border border-purple-200/30 bg-purple-300/15" />
      </div>

      {/* Center Frosted Glass Pill */}
      <div className="relative z-10 bg-white/20 backdrop-blur-md border border-white/40 px-5 py-2 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.25)] flex items-center gap-1.5">
        <span className="text-white text-xs sm:text-sm font-medium tracking-tight">Scaliify</span>
        <span className="text-white text-xs sm:text-sm font-bold tracking-tight">Pulse</span>
      </div>
    </div>
  );
}
