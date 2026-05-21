"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, type RefObject } from "react";
import { useMotionReady } from "@/lib/use-motion-ready";
import { ArrowRight } from "lucide-react";
import PhoneMockup from "@/components/marketing/PhoneMockup";
import Eyebrow from "@/components/site/Eyebrow";
import Container from "@/components/site/Container";
import { cn } from "@/lib/cn";
import { EASE, fadeUp, stagger, wordReveal } from "@/lib/motion";
import type { HeroContentProps } from "@/lib/content/hero-props";
import NeonBorder from "@/components/ui/NeonBorder";

const FLOAT_ANIMATION = {
  y: [0, -6, 0],
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
};

const SPRING = { stiffness: 120, damping: 22, mass: 0.4 };

interface HeroPhoneProps {
  src: string;
  alt: string;
  tilt: number;
  priority?: boolean;
  className?: string;
  entrance: boolean;
  motionEnabled: boolean;
  entranceDelay: number;
  floatDelay?: number;
  sectionRef: RefObject<HTMLElement | null>;
}

function HeroPhone({
  src,
  alt,
  tilt,
  priority,
  className,
  entrance,
  motionEnabled,
  entranceDelay,
  floatDelay = 0,
  sectionRef,
}: HeroPhoneProps) {
  const phoneRef = useRef<HTMLDivElement>(null);
  const proximity = useMotionValue(0);
  const popScale = useTransform(proximity, [0, 1], [1, 1.07]);
  const popY = useTransform(proximity, [0, 1], [0, -14]);

  useEffect(() => {
    if (!motionEnabled) return;

    const section = sectionRef.current;
    if (!section) return;

    const onMove = (e: MouseEvent) => {
      const el = phoneRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = Math.max(rect.width, rect.height) * 1.4;
      proximity.set(Math.max(0, 1 - dist / radius));
    };

    const onLeave = () => proximity.set(0);

    section.addEventListener("mousemove", onMove);
    section.addEventListener("mouseleave", onLeave);
    return () => {
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, [motionEnabled, proximity, sectionRef]);

  return (
    <motion.div
      ref={phoneRef}
      initial={entrance ? { opacity: 0, y: 32 } : false}
      animate={
        motionEnabled
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.8,
                delay: entrance ? entranceDelay : 0,
                ease: EASE,
              },
            }
          : undefined
      }
    >
      <motion.div
        style={motionEnabled ? { scale: popScale, y: popY } : undefined}
        whileHover={
          motionEnabled
            ? { scale: 1.05, y: -10, transition: { duration: 0.25 } }
            : undefined
        }
      >
        <motion.div
          animate={
            motionEnabled
              ? {
                  ...FLOAT_ANIMATION,
                  transition: {
                    ...FLOAT_ANIMATION.transition,
                    delay: floatDelay,
                  },
                }
              : undefined
          }
        >
          <PhoneMockup
            src={src}
            alt={alt}
            tilt={tilt}
            priority={priority}
            className={className}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero({
  eyebrow,
  headline,
  subcopy,
  cities,
  cityLabel,
  customerSrc,
  providerSrc,
  customerAlt,
  providerAlt,
}: HeroContentProps) {
  const { entrance, motionEnabled, ready } = useMotionReady();
  const enhancedMotion = ready && motionEnabled;
  const sectionRef = useRef<HTMLElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, SPRING);
  const smoothY = useSpring(mouseY, SPRING);

  useEffect(() => {
    if (!enhancedMotion) return;

    const el = sectionRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const onLeave = () => {
      mouseX.set(0.5);
      mouseY.set(0.5);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [enhancedMotion, mouseX, mouseY]);

  const glowX = useTransform(smoothX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(smoothY, [0, 1], ["0%", "100%"]);

  const cursorSpotlight = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(600px circle at ${x} ${y}, rgb(20 184 184 / 0.22), rgb(20 184 184 / 0.06) 35%, transparent 65%)`,
  );

  const cursorCore = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(280px circle at ${x} ${y}, rgb(20 184 184 / 0.14), transparent 70%)`,
  );

  const dotParallaxX = useTransform(smoothX, [0, 1], [-18, 18]);
  const dotParallaxY = useTransform(smoothY, [0, 1], [-18, 18]);

  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 600], [0, -70]);
  const contentOpacity = useTransform(scrollY, [0, 450], [1, 0]);
  const phonesY = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-canvas py-24"
      aria-labelledby="hero-headline"
    >
      {/* Ambient base glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, rgb(20 184 184 / 0.16), transparent 65%)",
        }}
      />

      {/* Cursor-follow spotlight — spring-smoothed (client-only after mount) */}
      {enhancedMotion ? (
        <>
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{ background: cursorSpotlight }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{ background: cursorCore }}
          />
        </>
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgb(20 184 184 / 0.12), transparent 65%)",
          }}
        />
      )}

      {/* Dot grid — organic wander + mouse parallax (client-only after mount) */}
      {enhancedMotion ? (
        <motion.div
          aria-hidden
          className="dot-grid-animated pointer-events-none absolute inset-[-40px] z-[2]"
          style={{ x: dotParallaxX, y: dotParallaxY }}
          animate={{
            backgroundPosition: [
              "0px 0px",
              "18px -12px",
              "-14px 20px",
              "22px 10px",
              "-8px -16px",
              "0px 0px",
            ],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ) : (
        <div
          aria-hidden
          className="dot-grid pointer-events-none absolute inset-0 z-[2] opacity-50"
        />
      )}

      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-12">
          <motion.div
            className="flex max-w-xl flex-col items-center gap-6 text-center lg:items-start lg:text-left"
            variants={entrance ? stagger(0.08) : undefined}
            initial={false}
            animate={entrance ? "animate" : undefined}
            style={
              enhancedMotion
                ? { y: contentY, opacity: contentOpacity }
                : undefined
            }
          >
            <motion.div variants={entrance ? fadeUp : undefined}>
              <Eyebrow>{eyebrow}</Eyebrow>
            </motion.div>

            {!entrance ? (
              <h1
                id="hero-headline"
                className="text-[40px] font-semibold leading-[1.1] tracking-tight text-ink lg:text-[64px]"
              >
                {headline.map((word, i) => (
                  <span
                    key={i}
                    className={cn(
                      word.teal && "text-primary",
                      i < headline.length - 1 && "mr-[0.28em]",
                    )}
                  >
                    {word.text}
                  </span>
                ))}
              </h1>
            ) : (
              <motion.h1
                id="hero-headline"
                className="text-[40px] font-semibold leading-[1.1] tracking-tight text-ink lg:text-[64px]"
                variants={entrance ? stagger(0.05) : undefined}
                initial={false}
                animate={entrance ? "animate" : undefined}
              >
                {headline.map((word, i) => (
                  <motion.span
                    key={i}
                    variants={entrance ? wordReveal : undefined}
                    className={cn(
                      "inline-block",
                      word.teal && "text-primary",
                      i < headline.length - 1 && "mr-[0.28em]",
                    )}
                  >
                    {word.text}
                  </motion.span>
                ))}
              </motion.h1>
            )}

            <motion.p
              className="text-lg leading-relaxed text-body lg:text-xl"
              variants={entrance ? fadeUp : undefined}
            >
              {subcopy}
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-3 lg:justify-start"
              variants={entrance ? fadeUp : undefined}
            >
              <NeonBorder
                variant="fill"
                className="w-auto"
                innerClassName="inline-flex h-11 items-center justify-center px-6 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft"
              >
                <Link href="#download" className="inline-flex h-full items-center">
                  Get the App
                </Link>
              </NeonBorder>
              <NeonBorder
                variant="outline"
                className="w-auto"
                innerClassName="inline-flex h-11 items-center justify-center gap-1.5 px-6 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft"
              >
                <Link href="#provider" className="inline-flex h-full items-center gap-1.5">
                  For Providers
                  <ArrowRight className="size-4" />
                </Link>
              </NeonBorder>
            </motion.div>

            <motion.div
              className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
              variants={entrance ? fadeUp : undefined}
            >
              <span className="text-sm text-mute">{cityLabel}</span>
              {cities.map((city) => (
                <span
                  key={city}
                  className="inline-flex h-7 items-center rounded-full border border-hairline bg-surface-card px-3 text-xs text-body"
                >
                  {city}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex shrink-0 items-end justify-center gap-4 lg:gap-6"
            style={enhancedMotion ? { y: phonesY } : undefined}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-4/5"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 100%, rgb(20 184 184 / 0.22), transparent 70%)",
              }}
            />

            <HeroPhone
              src={customerSrc}
              alt={customerAlt}
              tilt={-8}
              priority
              className="w-[140px] sm:w-[160px] lg:w-[200px]"
              entrance={entrance}
              motionEnabled={enhancedMotion}
              entranceDelay={0.3}
              sectionRef={sectionRef}
            />

            <HeroPhone
              src={providerSrc}
              alt={providerAlt}
              tilt={6}
              priority
              className="w-[140px] sm:w-[160px] lg:w-[200px]"
              entrance={entrance}
              motionEnabled={enhancedMotion}
              entranceDelay={0.45}
              floatDelay={1.5}
              sectionRef={sectionRef}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
