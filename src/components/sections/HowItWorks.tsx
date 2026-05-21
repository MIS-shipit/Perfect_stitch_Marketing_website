"use client";

import { motion } from "framer-motion";
import { useMotionReady } from "@/lib/use-motion-ready";
import { cn } from "@/lib/cn";
import Eyebrow from "@/components/site/Eyebrow";
import { fadeUp, revealUp, stagger, VIEWPORT } from "@/lib/motion";
import {
  CUSTOMER_STEP_TONES,
  PROVIDER_STEP_TONES,
} from "@/lib/card-tones";

interface Step {
  num: string;
  title: string;
  body: string;
}

interface HowItWorksProps {
  eyebrow: string;
  steps: readonly Step[];
  variant?: "customer" | "provider";
}

export default function HowItWorks({
  eyebrow,
  steps,
  variant = "customer",
}: HowItWorksProps) {
  const tones =
    variant === "provider" ? PROVIDER_STEP_TONES : CUSTOMER_STEP_TONES;
  const { motionEnabled } = useMotionReady();

  return (
    <div className="mt-16 border-t border-hairline pt-16">
      <motion.div
        variants={motionEnabled ? revealUp : undefined}
        initial={motionEnabled ? "initial" : false}
        whileInView={motionEnabled ? "animate" : undefined}
        viewport={VIEWPORT}
      >
        <Eyebrow>{eyebrow}</Eyebrow>
      </motion.div>

      <motion.div
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        variants={motionEnabled ? stagger(0.12) : undefined}
        initial={motionEnabled ? "initial" : false}
        whileInView={motionEnabled ? "animate" : undefined}
        viewport={VIEWPORT}
      >
        {steps.map((step, i) => {
          const tone = tones[i % tones.length];
          return (
            <motion.article
              key={step.num}
              variants={motionEnabled ? fadeUp : undefined}
              whileHover={
                motionEnabled
                  ? { y: -4, transition: { duration: 0.25 } }
                  : undefined
              }
              className={cn(
                "relative flex w-full max-w-[280px] flex-col gap-4 overflow-hidden rounded-card border bg-gradient-to-br to-surface-elevated p-8",
                tone.wash,
                tone.border,
                "mx-auto sm:max-w-none lg:mx-0",
              )}
            >
              <span
                className={cn(
                  "text-5xl font-semibold leading-none md:text-6xl",
                  tone.num,
                )}
              >
                {step.num}
              </span>
              <h3 className="text-xl font-semibold text-ink">{step.title}</h3>
              <p className="text-sm leading-relaxed text-body">{step.body}</p>
            </motion.article>
          );
        })}
      </motion.div>
    </div>
  );
}
