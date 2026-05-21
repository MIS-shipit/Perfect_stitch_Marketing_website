"use client";

import { motion } from "framer-motion";
import { useMotionReady } from "@/lib/use-motion-ready";
import { cn } from "@/lib/cn";
import Eyebrow from "@/components/site/Eyebrow";
import { fadeUp, stagger } from "@/lib/motion";

interface Step {
  num: string;
  title: string;
  body: string;
}

interface HowItWorksProps {
  eyebrow: string;
  steps: readonly Step[];
}

export default function HowItWorks({ eyebrow, steps }: HowItWorksProps) {
  const { animate } = useMotionReady();

  return (
    <div className="border-t border-hairline pt-16 mt-16">
      <Eyebrow>{eyebrow}</Eyebrow>
      <motion.div
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        variants={animate ? stagger(0.1) : undefined}
        initial={animate ? "initial" : false}
        whileInView={animate ? "animate" : undefined}
        viewport={{ once: true, margin: "-80px" }}
      >
        {steps.map((step) => (
          <motion.article
            key={step.num}
            variants={animate ? fadeUp : undefined}
            className={cn(
              "flex w-full max-w-[280px] flex-col gap-4 rounded-card border border-hairline bg-surface-elevated p-8",
              "mx-auto sm:max-w-none lg:mx-0",
            )}
          >
            <span className="text-5xl font-semibold leading-none text-primary md:text-6xl">
              {step.num}
            </span>
            <h3 className="text-xl font-semibold text-ink">{step.title}</h3>
            <p className="text-sm leading-relaxed text-body">{step.body}</p>
          </motion.article>
        ))}
      </motion.div>
    </div>
  );
}
