"use client";

import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

const STAGGER = 0.025;

export const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = false }) => {
  const letters = children.split("");

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn(
        "relative inline-flex flex-wrap items-center overflow-hidden cursor-pointer select-none",
        center && "justify-center",
        className
      )}
      style={{ lineHeight: 1.15 }}
    >
      {letters.map((l, i) => {
        const delay = center
          ? STAGGER * Math.abs(i - (letters.length - 1) / 2)
          : STAGGER * i;

        return (
          <span
            key={i}
            className="relative inline-block overflow-hidden"
            style={{ verticalAlign: "baseline" }}
          >
            {/* Main Letter */}
            <motion.span
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                duration: 0.35,
                ease: [0.33, 1, 0.68, 1],
                delay,
              }}
              className="inline-block"
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>

            {/* Rolling Letter Below */}
            <motion.span
              aria-hidden="true"
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{
                duration: 0.35,
                ease: [0.33, 1, 0.68, 1],
                delay,
              }}
              className="absolute left-0 top-0 inline-block"
            >
              {l === " " ? "\u00A0" : l}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
};
