"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Gate entrance animations until after hydration.
 * Framer Motion initial styles on the server often mismatch the client.
 */
export function useMotionReady() {
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const animate = mounted && !reduced;

  return { mounted, reduced, animate };
}
