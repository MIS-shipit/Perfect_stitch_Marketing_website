import type { Variants } from "framer-motion";

export const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const stagger = (delay = 0.08): Variants => ({
  animate: { transition: { staggerChildren: delay } },
});

export const slideReveal: Variants = {
  initial: { opacity: 0, y: 40, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

export const wordReveal: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

// Xtract-style: slow blur-to-sharp reveal — for eyebrows, section titles, large text blocks
export const revealUp: Variants = {
  initial: { opacity: 0, y: 32, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

export const tiltIn = (deg: number): Variants => ({
  initial: { opacity: 0, y: 40, rotate: deg * 1.2 },
  animate: { opacity: 1, y: 0, rotate: deg, transition: { duration: 0.8, ease: EASE } },
});
