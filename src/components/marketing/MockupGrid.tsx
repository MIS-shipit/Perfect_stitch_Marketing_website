"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { useMotionReady } from "@/lib/use-motion-ready";
import PhoneMockup from "@/components/marketing/PhoneMockup";

export interface MockupItem {
  title: string;
  body: string;
  mockup: { src: string; alt: string };
  tag?: string;
}

interface MockupCardProps {
  item: MockupItem;
  delay: number;
  accent?: string; // hex or css color for the ambient glow
}

function MockupCard({ item, delay, accent = "var(--color-primary-soft)" }: MockupCardProps) {
  const { animate } = useMotionReady();
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const phoneY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <motion.article
      ref={cardRef}
      initial={animate ? { opacity: 0, y: 80, filter: "blur(14px)" } : false}
      whileInView={animate ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      whileHover={animate ? { y: -6, transition: { duration: 0.35, ease: EASE } } : undefined}
      className="group relative overflow-hidden rounded-3xl border border-hairline bg-surface-elevated"
    >
      {/* Phone mockup area */}
      <div
        className="relative flex items-end justify-center overflow-hidden bg-surface"
        style={{ minHeight: 300 }}
      >
        {/* Ambient teal glow at base */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 50% 110%, ${accent}, transparent 60%)`,
          }}
        />

        {/* Dot texture */}
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 opacity-25"
        />

        {/* Phone — parallax drift */}
        <motion.div
          style={animate ? { y: phoneY } : undefined}
          className="relative z-10 px-10 pt-8"
        >
          <PhoneMockup
            src={item.mockup.src}
            alt={item.mockup.alt}
            className="w-[130px] sm:w-[150px]"
          />
        </motion.div>

        {/* Gradient overlay at the bottom so content reads cleanly */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-surface-elevated to-transparent"
        />
      </div>

      {/* Text content */}
      <div className="px-6 pb-7 pt-4">
        {item.tag && (
          <motion.span
            initial={animate ? { opacity: 0, x: -8 } : false}
            whileInView={animate ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE, delay: delay + 0.2 }}
            className="mb-3 inline-flex h-6 items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 text-[11px] font-medium text-primary"
          >
            {item.tag}
          </motion.span>
        )}
        <h3 className="text-base font-semibold leading-snug text-ink sm:text-lg">
          {item.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-body">{item.body}</p>
      </div>

      {/* Hover: teal ring glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px var(--color-primary-soft)" }}
      />

      {/* Hover: top edge shimmer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px translate-x-[-100%] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-[100%] group-hover:opacity-100"
      />
    </motion.article>
  );
}

interface MockupGridProps {
  items: readonly MockupItem[];
  accent?: string;
}

export default function MockupGrid({ items, accent }: MockupGridProps) {
  // Split into two columns: odd indices → col1, even → col2
  const col1 = items.filter((_, i) => i % 2 === 0);
  const col2 = items.filter((_, i) => i % 2 === 1);

  return (
    <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:gap-8">
      {/* Column 1 — starts at natural top */}
      <div className="flex flex-col gap-5 sm:gap-6 lg:gap-8">
        {col1.map((item, i) => (
          <MockupCard key={item.title} item={item} delay={i * 0.08} accent={accent} />
        ))}
      </div>

      {/* Column 2 — offset downward for asymmetric/stagger effect */}
      <div className="flex flex-col gap-5 sm:mt-20 sm:gap-6 lg:mt-28 lg:gap-8">
        {col2.map((item, i) => (
          <MockupCard key={item.title} item={item} delay={i * 0.08 + 0.1} accent={accent} />
        ))}
      </div>
    </div>
  );
}
