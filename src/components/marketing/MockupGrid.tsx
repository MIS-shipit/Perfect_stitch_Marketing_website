"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE, scaleUp, stagger, fadeUp, VIEWPORT } from "@/lib/motion";
import { useMotionReady } from "@/lib/use-motion-ready";
import PhoneMockup from "@/components/marketing/PhoneMockup";

export interface MockupItem {
  title: string;
  body: string;
  mockup: { src: string; alt: string };
  tag?: string;
}

type MockupTone = {
  glow: string;
  border: string;
  tag: string;
  screen: string;
};

interface MockupCardProps {
  item: MockupItem;
  tone: MockupTone;
}

function MockupCard({ item, tone }: MockupCardProps) {
  const { motionEnabled } = useMotionReady();
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], [40, -20]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.98]);

  return (
    <motion.article
      ref={cardRef}
      variants={motionEnabled ? scaleUp : undefined}
      whileHover={
        motionEnabled ? { y: -6, transition: { duration: 0.3, ease: EASE } } : undefined
      }
      className={cn(
        "group relative overflow-hidden rounded-3xl border bg-surface-elevated",
        tone.border,
      )}
    >
      <div
        className={cn(
          "relative flex items-end justify-center overflow-hidden bg-gradient-to-b",
          tone.screen,
        )}
        style={{ minHeight: 300 }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(ellipse at 50% 110%, ${tone.glow}, transparent 60%)`,
            opacity: 0.9,
          }}
        />

        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 opacity-25"
        />

        <motion.div
          style={
            motionEnabled
              ? { y: phoneY, scale: phoneScale }
              : undefined
          }
          className="relative z-10 px-10 pt-8"
        >
          <PhoneMockup
            src={item.mockup.src}
            alt={item.mockup.alt}
            className="w-[130px] sm:w-[150px]"
            screenLabel={item.tag ?? item.title}
            screenGradient={tone.screen}
          />
        </motion.div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-surface-elevated to-transparent"
        />
      </div>

      <motion.div
        className="px-6 pb-7 pt-4"
        variants={motionEnabled ? stagger(0.06) : undefined}
        initial={motionEnabled ? "initial" : false}
        whileInView={motionEnabled ? "animate" : undefined}
        viewport={{ once: true, amount: 0.5 }}
      >
        {item.tag && (
          <motion.span
            variants={motionEnabled ? fadeUp : undefined}
            className="mb-3 inline-flex h-6 items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 text-[11px] font-medium text-primary"
          >
            {item.tag}
          </motion.span>
        )}
        <motion.h3
          variants={motionEnabled ? fadeUp : undefined}
          className="text-base font-semibold leading-snug text-ink sm:text-lg"
        >
          {item.title}
        </motion.h3>
        <motion.p
          variants={motionEnabled ? fadeUp : undefined}
          className="mt-2 text-sm leading-relaxed text-body"
        >
          {item.body}
        </motion.p>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px var(--color-primary-soft)" }}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px translate-x-[-100%] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-[100%] group-hover:opacity-100"
      />
    </motion.article>
  );
}

interface MockupGridProps {
  items: readonly MockupItem[];
  tones: readonly MockupTone[];
}

export default function MockupGrid({ items, tones }: MockupGridProps) {
  const { motionEnabled } = useMotionReady();
  const col1 = items.filter((_, i) => i % 2 === 0);
  const col2 = items.filter((_, i) => i % 2 === 1);

  return (
    <motion.div
      className="mt-24 grid grid-cols-1 gap-5 sm:mt-28 sm:grid-cols-2 sm:gap-6 lg:mt-32 lg:gap-8"
      variants={motionEnabled ? stagger(0.1) : undefined}
      initial={motionEnabled ? "initial" : false}
      whileInView={motionEnabled ? "animate" : undefined}
      viewport={VIEWPORT}
    >
      <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
        {col1.map((item, i) => {
          const idx = i * 2;
          return (
            <MockupCard
              key={item.title}
              item={item}
              tone={tones[idx] ?? tones[0]}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-5 sm:mt-20 sm:gap-6 lg:mt-28 lg:gap-8">
        {col2.map((item, i) => {
          const idx = i * 2 + 1;
          return (
            <MockupCard
              key={item.title}
              item={item}
              tone={tones[idx] ?? tones[0]}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
