"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Motion gating for Next.js client components.
 *
 * - `motion`  → true unless OS prefers reduced motion. Use for whileInView,
 *               marquee, float loops, scroll parallax — anything that must run
 *               as soon as the client bundle executes.
 * - `entrance` → true after hydration AND motion allowed. Use for one-shot
 *               page-load reveals (hero stagger) to avoid SSR mismatch.
 * - `ready`   → hydration complete.
 *
 * Do NOT gate whileInView on `ready` — elements already in the viewport when
 * the observer attaches will never animate.
 */
export function useMotionReady() {
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setReady(true);
  }, []);

  const motionEnabled = !reduced;

  return {
    ready,
    reduced: !!reduced,
    /** @deprecated use `motionEnabled` — kept for minimal diff at call sites */
    animate: motionEnabled,
    motionEnabled,
    entrance: ready && motionEnabled,
  };
}
