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
  const words = children.split(" ");

  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn(
        "relative inline-flex flex-wrap items-center justify-center gap-x-[0.25em] cursor-pointer select-none max-w-full",
        center && "justify-center text-center",
        className
      )}
      style={{ lineHeight: 1.2 }}
    >
      {words.map((word, wordIdx) => {
        const letters = word.split("");
        return (
          <span key={wordIdx} className="inline-flex whitespace-nowrap">
            {letters.map((l, i) => {
              const globalIdx = wordIdx * 8 + i;
              const delay = STAGGER * globalIdx;

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
                    {l}
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
                    {l}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </motion.span>
  );
};
