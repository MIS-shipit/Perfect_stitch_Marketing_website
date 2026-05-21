"use client";

import { motion } from "framer-motion";
import { useMotionReady } from "@/lib/use-motion-ready";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import Eyebrow from "@/components/site/Eyebrow";
import { slideReveal, tiltIn, EASE } from "@/lib/motion";
import { cn } from "@/lib/cn";

interface FeatureRowProps {
  eyebrow?: string;
  title: string;
  body: string;
  mockup: { src: string; alt: string };
  imageSide: "left" | "right";
  accentLink?: { label: string; href: string };
  delay?: number;
}

export default function FeatureRow({
  eyebrow,
  title,
  body,
  mockup,
  imageSide,
  accentLink,
  delay = 0,
}: FeatureRowProps) {
  const { motionEnabled, ready } = useMotionReady();
  const tiltDeg = imageSide === "left" ? -4 : 4;
  const mockupVariants = tiltIn(tiltDeg);

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-12 lg:flex-row lg:gap-16",
        imageSide === "left" ? "lg:flex-row" : "lg:flex-row-reverse",
      )}
    >
      {/* Mockup — tiltIn enter + micro hover scale */}
      <motion.div
        className="w-full max-w-[260px] shrink-0 lg:max-w-[300px]"
        variants={motionEnabled ? mockupVariants : undefined}
        initial={ready && motionEnabled ? "initial" : false}
        whileInView={motionEnabled ? "animate" : undefined}
        whileHover={motionEnabled ? { scale: 1.005 } : undefined}
        viewport={{ once: true, margin: "-60px", amount: 0.2 }}
        transition={{ duration: 0.8, ease: EASE, delay }}
      >
        <PhoneMockup src={mockup.src} alt={mockup.alt} />
      </motion.div>

      {/* Copy — slideReveal with per-row stagger delay */}
      <motion.div
        className="flex flex-col gap-4"
        variants={motionEnabled ? slideReveal : undefined}
        initial={ready && motionEnabled ? "initial" : false}
        whileInView={motionEnabled ? "animate" : undefined}
        viewport={{ once: true, margin: "-60px", amount: 0.2 }}
        transition={{ duration: 0.7, ease: EASE, delay }}
      >
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h3 className="text-2xl font-semibold leading-[1.3] text-ink">{title}</h3>
        <p className="text-base leading-relaxed text-body">{body}</p>
        {accentLink && (
          <Link
            href={accentLink.href}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft"
          >
            {accentLink.label}
            <ArrowRight className="size-4" />
          </Link>
        )}
      </motion.div>
    </div>
  );
}
