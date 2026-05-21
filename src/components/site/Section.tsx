"use client";

import { motion } from "framer-motion";
import { useMotionReady } from "@/lib/use-motion-ready";
import { cn } from "@/lib/cn";
import Container from "./Container";
import Eyebrow from "./Eyebrow";
import { revealUp, stagger, VIEWPORT } from "@/lib/motion";

interface SectionProps {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

export default function Section({
  id,
  eyebrow,
  title,
  children,
  className,
  containerClassName,
}: SectionProps) {
  const { motionEnabled } = useMotionReady();
  const hasHeader = Boolean(eyebrow || title);

  return (
    <section id={id} className={cn("py-12 md:py-16 lg:py-24", className)}>
      <Container className={containerClassName}>
        {hasHeader && (
          <motion.div
            variants={motionEnabled ? stagger(0.1) : undefined}
            initial={motionEnabled ? "initial" : false}
            whileInView={motionEnabled ? "animate" : undefined}
            viewport={VIEWPORT}
          >
            {eyebrow && (
              <motion.div variants={motionEnabled ? revealUp : undefined}>
                <Eyebrow>{eyebrow}</Eyebrow>
              </motion.div>
            )}
            {title && (
              <motion.h2
                variants={motionEnabled ? revealUp : undefined}
                className={cn(
                  "text-4xl font-semibold leading-[1.15] text-ink md:text-5xl",
                  eyebrow && "mt-4",
                )}
              >
                {title}
              </motion.h2>
            )}
          </motion.div>
        )}
        <div className={cn(hasHeader && "mt-12")}>{children}</div>
      </Container>
    </section>
  );
}
