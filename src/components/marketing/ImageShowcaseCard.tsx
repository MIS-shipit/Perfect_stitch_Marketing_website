"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { EASE, VIEWPORT } from "@/lib/motion";
import { useMotionReady } from "@/lib/use-motion-ready";
import NeonBorder from "@/components/ui/NeonBorder";

export interface ShowcaseStep {
  src: string;
  alt: string;
  caption: string;
  title: string;
  body: string;
  services: string[];
}

/** @deprecated use ShowcaseStep */
export type ShowcaseImage = Pick<ShowcaseStep, "src" | "alt" | "caption">;

interface ImageShowcaseCardProps {
  eyebrow: string;
  marketingTitle: string;
  marketingBody: string;
  steps: ShowcaseStep[];
  className?: string;
}

const STEP_SCROLL_VH = 72;

export default function ImageShowcaseCard({
  eyebrow,
  marketingTitle,
  marketingBody,
  steps,
  className,
}: ImageShowcaseCardProps) {
  const { motionEnabled } = useMotionReady();
  const [active, setActive] = useState(0);
  const stepCount = steps.length;
  const sentinelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const setSentinelRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      sentinelRefs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    if (!motionEnabled || stepCount === 0) return;

    const observers: IntersectionObserver[] = [];

    sentinelRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(index);
          }
        },
        {
          root: null,
          threshold: 0.35,
          rootMargin: "-28% 0px -28% 0px",
        },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [motionEnabled, stepCount]);

  const step = steps[active] ?? steps[0];

  if (!motionEnabled) {
    return (
      <div className={cn("flex flex-col gap-8", className)}>
        {steps.map((s, i) => (
          <ShowcasePanel
            key={s.src}
            eyebrow={i === 0 ? eyebrow : undefined}
            marketingTitle={i === 0 ? marketingTitle : undefined}
            marketingBody={i === 0 ? marketingBody : undefined}
            step={s}
            showNav={false}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div className="sticky top-24 z-10 pb-6">
        <ShowcasePanel
          eyebrow={eyebrow}
          marketingTitle={marketingTitle}
          marketingBody={marketingBody}
          step={step}
          steps={steps}
          active={active}
          onSelect={setActive}
          showNav
        />
      </div>

      {steps.map((s, i) => (
        <div
          key={s.src}
          ref={setSentinelRef(i)}
          aria-hidden
          className="w-full"
          style={{ minHeight: `${STEP_SCROLL_VH}svh` }}
        />
      ))}
    </div>
  );
}

function ShowcasePanel({
  eyebrow,
  marketingTitle,
  marketingBody,
  step,
  steps,
  active = 0,
  onSelect,
  showNav,
}: {
  eyebrow?: string;
  marketingTitle?: string;
  marketingBody?: string;
  step: ShowcaseStep;
  steps?: ShowcaseStep[];
  active?: number;
  onSelect?: (i: number) => void;
  showNav: boolean;
}) {
  const { motionEnabled } = useMotionReady();

  return (
    <NeonBorder
      className="w-full"
      radius="1.5rem"
      innerClassName="overflow-hidden border-0 bg-surface-elevated p-0 shadow-none"
    >
      <motion.article
        className="relative overflow-hidden bg-transparent"
        initial={motionEnabled ? { opacity: 0, y: 24 } : false}
        whileInView={motionEnabled ? { opacity: 1, y: 0 } : undefined}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, ease: EASE }}
      >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, var(--color-primary-soft), transparent 55%)",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 gap-6 p-6 md:p-8 lg:grid-cols-[1fr_1.35fr] lg:items-stretch lg:gap-10 lg:p-10">
        <div className="flex flex-col gap-4">
          {eyebrow ? (
            <span className="text-xs font-medium uppercase tracking-widest text-mute">
              {eyebrow}
            </span>
          ) : null}
          {marketingTitle ? (
            <h3 className="text-2xl font-semibold leading-[1.2] text-ink md:text-3xl">
              {marketingTitle}
            </h3>
          ) : null}
          {marketingBody ? (
            <p className="text-sm leading-relaxed text-body md:text-base">
              {marketingBody}
            </p>
          ) : null}

          {showNav && steps && onSelect ? (
            <>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {steps.map((img, i) => (
                  <button
                    key={img.caption}
                    type="button"
                    onClick={() => onSelect(i)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300",
                      active === i
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-hairline bg-surface-card text-body hover:text-ink",
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full transition-colors duration-300",
                        active === i ? "bg-primary" : "bg-hairline-strong",
                      )}
                    />
                    {img.caption}
                  </button>
                ))}
              </div>

              <div className="flex gap-1.5">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className="h-0.5 flex-1 overflow-hidden rounded-full bg-hairline"
                  >
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      animate={{ width: active >= i ? "100%" : "0%" }}
                      transition={{ duration: 0.35, ease: EASE }}
                    />
                  </div>
                ))}
              </div>

              <p className="text-xs text-mute">
                <span className="tabular-nums text-ink">{active + 1}</span>
                {" / "}
                {steps.length}
                {" — scroll to explore services"}
              </p>
            </>
          ) : null}

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step.title}
              initial={motionEnabled ? { opacity: 0, y: 10 } : false}
              animate={motionEnabled ? { opacity: 1, y: 0 } : undefined}
              exit={motionEnabled ? { opacity: 0, y: -8 } : undefined}
              transition={{ duration: 0.35, ease: EASE }}
              className="mt-2 rounded-2xl border border-hairline bg-surface/60 p-4"
            >
              <p className="text-[10px] font-medium uppercase tracking-widest text-primary">
                Feature detail
              </p>
              <h4 className="mt-1 text-lg font-semibold text-ink">{step.title}</h4>
              <p className="mt-1 text-sm leading-relaxed text-body">{step.body}</p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {step.services.map((service) => (
                  <li
                    key={service}
                    className="flex items-start gap-2 text-xs text-mute"
                  >
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                    {service}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative flex min-h-[300px] items-end justify-center sm:min-h-[360px] md:min-h-[460px]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgb(20 184 184 / 0.2), transparent 60%)",
            }}
          />

          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={step.src}
              initial={motionEnabled ? { opacity: 0, y: 24, scale: 0.95 } : false}
              animate={motionEnabled ? { opacity: 1, y: 0, scale: 1 } : undefined}
              exit={motionEnabled ? { opacity: 0, y: -16, scale: 0.97 } : undefined}
              transition={{ duration: 0.45, ease: EASE }}
              className="absolute bottom-0 w-[165px] overflow-hidden rounded-[28px] border border-white/10 bg-surface-card shadow-[0_32px_80px_-16px_rgb(0_0_0/0.85)] sm:w-[185px] md:w-[210px]"
              style={{ aspectRatio: "9 / 19" }}
            >
              <Image
                src={step.src}
                alt={step.alt}
                width={420}
                height={886}
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 50vw, 240px"
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      </motion.article>
    </NeonBorder>
  );
}
