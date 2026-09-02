/**
 * Shared Framer Motion animation variants — single source of truth.
 * Import these instead of repeating inline initial/animate/transition props.
 */

export const FADE_UP = {
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15%" as const },
  transition: { duration: 0.7, ease: "easeOut" as const },
} as const;

export const FADE_UP_SLOW = {
  initial: { opacity: 0, y: 35 },
  animate: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-20%" as const },
  transition: { duration: 0.9, ease: "easeOut" as const },
} as const;

export const FADE_UP_FAST = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" as const },
  transition: { duration: 0.6, ease: "easeOut" as const },
} as const;

export const ACCORDION_TRANSITION = {
  type: "spring" as const,
  bounce: 0,
  duration: 0.5,
};

export const ACCORDION_PANEL = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto" as const, opacity: 1 },
  exit: { height: 0, opacity: 0 },
};
