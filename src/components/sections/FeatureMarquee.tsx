"use client";

import { motion } from "framer-motion";
import { useMotionReady } from "@/lib/use-motion-ready";

const ITEMS = [
  "Book pickup",
  "Real-time tracking",
  "Razorpay payments",
  "Multi-language",
  "Offline-first",
  "Measurements",
  "Order pipeline",
  "Payouts",
];

function MarqueeTrack({ items }: { items: string[] }) {
  const { animate } = useMotionReady();

  return (
    <motion.ul
      className="flex shrink-0 items-center gap-0"
      aria-hidden
      initial={false}
      animate={animate ? { x: ["0%", "-50%"] } : undefined}
      transition={
        animate ? { duration: 30, ease: "linear", repeat: Infinity } : undefined
      }
    >
      {/* Duplicate twice so -50% always has content */}
      {[...items, ...items].map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="whitespace-nowrap px-6 text-sm font-medium text-mute">
            {item}
          </span>
          <span aria-hidden className="size-1.5 rounded-full bg-hairline" />
        </li>
      ))}
    </motion.ul>
  );
}

export default function FeatureMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-hairline bg-surface py-5">
      {/* Edge-fade mask */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{
          background: "linear-gradient(to right, var(--color-surface), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{
          background: "linear-gradient(to left, var(--color-surface), transparent)",
        }}
      />

      <div className="flex overflow-hidden">
        {/* Two tracks for seamless loop */}
        <MarqueeTrack items={ITEMS} />
        <MarqueeTrack items={ITEMS} />
      </div>

      {/* Accessible static list for screen readers */}
      <ul className="sr-only">
        {ITEMS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
