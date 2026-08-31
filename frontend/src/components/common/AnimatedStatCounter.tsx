"use client";

import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";

interface AnimatedStatCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * AnimatedStatCounter: Smooth count-up animation that triggers when scrolled into view.
 */
export function AnimatedStatCounter({
  value,
  duration = 1.8,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: AnimatedStatCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // easeOutExpo for ultra-smooth realistic acceleration & deceleration
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = ease * value;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue)}
      {suffix}
    </span>
  );
}
