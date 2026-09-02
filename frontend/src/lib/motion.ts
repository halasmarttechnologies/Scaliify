/**
 * Shared Framer Motion animation variants — single source of truth.
 * Import these instead of repeating inline initial/animate/transition props.
 */

// ── Page / Section fade-ups ───────────────────────────────────────────────────

export const FADE_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-10%" as const },
  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
} as const;

export const FADE_UP_SLOW = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-15%" as const },
  transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] as const },
} as const;

export const FADE_UP_FAST = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-8%" as const },
  transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
} as const;

// ── Card / item entrance ──────────────────────────────────────────────────────

/** Subtle scale + fade — great for cards appearing in a grid */
export const SCALE_UP = {
  initial: { opacity: 0, scale: 0.97, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true, margin: "-8%" as const },
  transition: { duration: 0.4, ease: [0.34, 1.2, 0.64, 1] as const },
} as const;

// ── Accordion panels ──────────────────────────────────────────────────────────

export const ACCORDION_TRANSITION = {
  type: "spring" as const,
  stiffness: 340,
  damping: 28,
  mass: 0.7,
};

export const ACCORDION_PANEL = {
  initial: { height: 0, opacity: 0 },
  animate: { height: "auto" as const, opacity: 1 },
  exit: { height: 0, opacity: 0 },
};

// ── Dropdown panels ───────────────────────────────────────────────────────────

/** High-stiffness spring — dropdown feels instant but still has polish */
export const DROPDOWN_TRANSITION = {
  type: "spring" as const,
  stiffness: 380,
  damping: 28,
  mass: 0.6,
};

export const DROPDOWN_PANEL = {
  initial: { opacity: 0, y: 10, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 6, scale: 0.97 },
};

// ── Stagger helpers ───────────────────────────────────────────────────────────

/** Use with motion.div wrapping a list — children stagger in with delay */
export const STAGGER_CONTAINER = {
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

export const STAGGER_ITEM = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
};
