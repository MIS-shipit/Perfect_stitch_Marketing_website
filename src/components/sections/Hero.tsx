"use client";

import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useMotionReady } from "@/lib/use-motion-ready";
import { ArrowRight } from "lucide-react";
import PhoneMockup from "@/components/marketing/PhoneMockup";
import Eyebrow from "@/components/site/Eyebrow";
import Container from "@/components/site/Container";
import { cn } from "@/lib/cn";
import { fadeUp, stagger, wordReveal } from "@/lib/motion";

// TODO: replace with real Compose screenshots
const HERO_CUSTOMER = "/mockups/_placeholder/hero-customer.png";
const HERO_PROVIDER = "/mockups/_placeholder/hero-provider.png";

const CITY_CHIPS = ["Mumbai", "Bangalore", "Chennai", "Delhi"];

const FLOAT_ANIMATION = {
  y: [0, -6, 0],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
};

// Word segments: text + whether it's teal-colored
const HEADLINE_WORDS: { text: string; teal: boolean }[] = [
  { text: "Your", teal: false },
  { text: "wardrobe,", teal: false },
  { text: "looked", teal: true },
  { text: "after.", teal: true },
];

export default function Hero() {
  const { animate } = useMotionReady();
  const reduceMotion = !animate;
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  useEffect(() => {
    if (reduceMotion) return;

    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [reduceMotion, mouseX, mouseY]);

  const glowX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [0, 1], ["0%", "100%"]);
  const cursorGlow = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(ellipse at ${x} ${y}, rgb(20 184 184 / 0.13), transparent 60%)`,
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-canvas py-24"
      aria-labelledby="hero-headline"
    >
      {/* Layer 1 — animated dot-grid texture */}
      <div
        aria-hidden
        className="dot-grid-animated pointer-events-none absolute inset-0 z-0"
      />

      {/* Layer 2 — static ambient teal glow (always-on, centered) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, var(--color-primary-soft), transparent 65%)",
        }}
      />

      {/* Layer 3 — cursor-follow glow (disabled in reduced-motion) */}
      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: cursorGlow }}
        />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgb(20 184 184 / 0.12), transparent 65%)",
          }}
        />
      )}

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-12">
          {/* ── Copy ── */}
          <motion.div
            className="flex max-w-xl flex-col items-center gap-6 text-center lg:items-start lg:text-left"
            variants={animate ? stagger(0.08) : undefined}
            initial={animate ? "initial" : false}
            animate={animate ? "animate" : undefined}
          >
            <motion.div variants={animate ? fadeUp : undefined}>
              <Eyebrow>LAUNDRY + TAILORING · ON-DEMAND</Eyebrow>
            </motion.div>

            {/* Headline — per-word stagger in full-motion; static fallback in reduced-motion */}
            {reduceMotion ? (
              <h1
                id="hero-headline"
                className="text-[40px] font-semibold leading-[1.1] tracking-tight text-ink lg:text-[64px]"
              >
                Your wardrobe,{" "}
                <span className="text-primary">looked after.</span>
              </h1>
            ) : (
              <motion.h1
                id="hero-headline"
                className="text-[40px] font-semibold leading-[1.1] tracking-tight text-ink lg:text-[64px]"
                variants={animate ? stagger(0.05) : undefined}
              >
                {HEADLINE_WORDS.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={animate ? wordReveal : undefined}
                    className={cn(
                      "inline-block",
                      word.teal && "text-primary",
                      i < HEADLINE_WORDS.length - 1 && "mr-[0.28em]",
                    )}
                  >
                    {word.text}
                  </motion.span>
                ))}
              </motion.h1>
            )}

            <motion.p
              className="text-lg leading-relaxed text-body lg:text-xl"
              variants={animate ? fadeUp : undefined}
            >
              Order laundry or tailoring in seconds. Track every garment in real
              time. Pay when it&apos;s done.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              variants={animate ? fadeUp : undefined}
            >
              <Link
                href="#download"
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft"
              >
                Get the App
              </Link>
              <Link
                href="#provider"
                className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-hairline px-6 text-sm font-medium text-ink transition-colors hover:border-hairline-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft"
              >
                For Providers
                <ArrowRight className="size-4" />
              </Link>
            </motion.div>

            {/* Trust row */}
            <motion.div
              className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
              variants={animate ? fadeUp : undefined}
            >
              <span className="text-sm text-mute">Trusted in 12+ cities</span>
              {CITY_CHIPS.map((city) => (
                <span
                  key={city}
                  className="inline-flex h-7 items-center rounded-full border border-hairline bg-surface-card px-3 text-xs text-body"
                >
                  {city}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Mockups ── */}
          <div className="relative flex shrink-0 items-end justify-center gap-4 lg:gap-6">
            {/* Ring glow behind phones — radial from bottom center */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-4/5"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 100%, var(--color-primary-soft), transparent 70%)",
              }}
            />

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 32 }}
              animate={
                reduceMotion
                  ? {}
                  : {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        delay: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }
              }
            >
              <motion.div animate={reduceMotion ? {} : FLOAT_ANIMATION}>
                <PhoneMockup
                  src={HERO_CUSTOMER}
                  alt="Perfect Stitch customer app"
                  tilt={-8}
                  priority
                  className="w-[140px] sm:w-[160px] lg:w-[200px]"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 48 }}
              animate={
                reduceMotion
                  ? {}
                  : {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.8,
                        delay: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }
              }
            >
              <motion.div
                animate={
                  reduceMotion
                    ? {}
                    : {
                        ...FLOAT_ANIMATION,
                        transition: {
                          ...FLOAT_ANIMATION.transition,
                          delay: 1.5,
                        },
                      }
                }
              >
                <PhoneMockup
                  src={HERO_PROVIDER}
                  alt="Perfect Stitch provider app"
                  tilt={6}
                  priority
                  className="w-[140px] sm:w-[160px] lg:w-[200px]"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
