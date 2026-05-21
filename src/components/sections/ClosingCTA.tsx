"use client";

import { motion } from "framer-motion";
import { useMotionReady } from "@/lib/use-motion-ready";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Container from "@/components/site/Container";
import { fadeUp, stagger, EASE, VIEWPORT } from "@/lib/motion";

const STATS = [
  { value: "1K+", label: "Orders monthly" },
  { value: "4.8", label: "App rating" },
  { value: "12+", label: "Cities live" },
  { value: "<30m", label: "Avg. pickup" },
] as const;

const TRUST_TEXT = "Razorpay-secured · Real-time tracking · Offline-ready";

export default function ClosingCTA() {
  const { motionEnabled, reduced } = useMotionReady();

  return (
    <section
      id="download"
      className="relative overflow-hidden bg-canvas py-24 lg:py-32"
    >
      {/* Radial glow — same pattern as Hero Phase 2 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgb(20 184 184 / 0.20), transparent 65%)",
        }}
      />

      <Container className="relative z-10">
        <motion.div
          className="flex max-w-2xl flex-col items-center gap-8 text-center mx-auto"
          variants={motionEnabled ? stagger(0.1) : undefined}
          initial={motionEnabled ? "initial" : false}
          whileInView={motionEnabled ? "animate" : undefined}
          viewport={VIEWPORT}
        >
          <motion.h2
            className="text-4xl font-semibold leading-[1.15] text-ink md:text-5xl"
            variants={motionEnabled ? fadeUp : undefined}
          >
            Ready to stitch your routine?
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-lg leading-relaxed text-body lg:text-xl"
            variants={motionEnabled ? fadeUp : undefined}
          >
            Download Perfect Stitch and get your first pickup scheduled in under
            a minute.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            variants={motionEnabled ? fadeUp : undefined}
          >
            <Link
              href="#"
              className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-soft"
            >
              Download for Android
            </Link>
            <Link
              href="#"
              className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-hairline px-6 text-sm font-medium text-ink transition-colors hover:border-hairline-strong focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-soft"
            >
              iOS coming soon
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>

          {/* Stat chips */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3"
            variants={motionEnabled ? fadeUp : undefined}
          >
            {STATS.map((stat) => (
              <span
                key={stat.label}
                className="inline-flex h-9 items-center gap-2 rounded-full border border-hairline bg-surface-card px-4 text-sm"
              >
                <span className="font-semibold text-ink">{stat.value}</span>
                <span className="text-mute">{stat.label}</span>
              </span>
            ))}
          </motion.div>

          {/* Trust line — delayed entrance */}
          <motion.p
            className="text-sm text-mute"
            variants={motionEnabled ? fadeUp : undefined}
            transition={
              reduced
                ? undefined
                : { duration: 0.6, ease: EASE, delay: 0.8 }
            }
          >
            {TRUST_TEXT}
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}
