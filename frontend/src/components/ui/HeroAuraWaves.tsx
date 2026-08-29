"use client";

export function HeroAuraWaves() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0 bg-black">
      {/* 1. Seamless Full-Width Atmospheric Aura Radial Glow */}
      <div
        className="absolute inset-x-0 bottom-0 h-[650px] w-full"
        style={{
          background:
            "radial-gradient(ellipse 100% 75% at 50% 100%, rgba(129, 216, 208, 0.22) 0%, rgba(91, 199, 188, 0.12) 40%, rgba(5, 67, 75, 0.04) 70%, transparent 100%)",
        }}
      />

      {/* 2. Soft Organic Space Aurora Fluid Curves (Bleeding past viewport edges to eliminate any clipping lines) */}
      <div
        className="absolute inset-x-[-20%] bottom-[-5%] h-[480px] opacity-75 mix-blend-screen blur-[60px]"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 28% 90%, rgba(168, 245, 238, 0.26) 0%, transparent 70%), radial-gradient(ellipse 75% 60% at 72% 95%, rgba(129, 216, 208, 0.24) 0%, transparent 70%), radial-gradient(ellipse 85% 50% at 50% 100%, rgba(91, 199, 188, 0.20) 0%, transparent 75%)",
        }}
      />

      {/* 3. Deep Top Fade ensuring pure pitch black with smooth feathering */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-transparent" />
    </div>
  );
}
