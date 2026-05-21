"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { EASE, revealUp, stagger, VIEWPORT } from "@/lib/motion";
import { useMotionReady } from "@/lib/use-motion-ready";

export interface ShowcaseImage {
  src: string;
  alt: string;
  caption: string;
}

interface ImageShowcaseCardProps {
  eyebrow: string;
  title: string;
  body: string;
  images: ShowcaseImage[];
  className?: string;
}

export default function ImageShowcaseCard({
  eyebrow,
  title,
  body,
  images,
  className,
}: ImageShowcaseCardProps) {
  const { motionEnabled } = useMotionReady();
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const imageCount = images.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!motionEnabled) return;
    const idx = Math.min(imageCount - 1, Math.floor(latest * imageCount));
    setActive((prev) => (prev !== idx ? idx : prev));
  });

  const containerHeight = motionEnabled ? `${imageCount * 100}svh` : "auto";

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ height: containerHeight }}
    >
      <div
        className={cn(
          motionEnabled ? "sticky top-20" : "relative",
          "py-6 lg:py-8",
        )}
      >
        <motion.article
          className="relative overflow-hidden rounded-3xl border border-hairline bg-surface-elevated"
          initial={motionEnabled ? { opacity: 0, y: 40, scale: 0.97 } : false}
          whileInView={
            motionEnabled
              ? { opacity: 1, y: 0, scale: 1 }
              : undefined
          }
          viewport={VIEWPORT}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 20% 0%, var(--color-primary-soft), transparent 55%)",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 gap-6 p-6 md:p-8 lg:grid-cols-[1fr_1.35fr] lg:items-center lg:gap-10 lg:p-10">
            <motion.div
              className="flex flex-col gap-4"
              variants={motionEnabled ? stagger(0.08) : undefined}
              initial={motionEnabled ? "initial" : false}
              whileInView={motionEnabled ? "animate" : undefined}
              viewport={VIEWPORT}
            >
              <motion.span
                variants={motionEnabled ? revealUp : undefined}
                className="text-xs font-medium uppercase tracking-widest text-mute"
              >
                {eyebrow}
              </motion.span>
              <motion.h3
                variants={motionEnabled ? revealUp : undefined}
                className="text-2xl font-semibold leading-[1.2] text-ink md:text-3xl"
              >
                {title}
              </motion.h3>
              <motion.p
                variants={motionEnabled ? revealUp : undefined}
                className="text-sm leading-relaxed text-body md:text-base"
              >
                {body}
              </motion.p>

              <motion.div
                variants={motionEnabled ? revealUp : undefined}
                className="mt-2 flex flex-wrap items-center gap-2"
              >
                {images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActive(i)}
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
              </motion.div>

              <motion.div
                variants={motionEnabled ? revealUp : undefined}
                className="mt-4 flex gap-1.5"
              >
                {images.map((_, i) => (
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
              </motion.div>

              {motionEnabled && (
                <motion.p
                  variants={motionEnabled ? revealUp : undefined}
                  className="text-xs text-mute"
                >
                  <span className="tabular-nums text-ink">{active + 1}</span>
                  {" / "}
                  {imageCount}
                  {" — scroll to advance"}
                </motion.p>
              )}
            </motion.div>

            <motion.div
              className="relative flex h-[300px] items-end justify-center sm:h-[360px] md:h-[460px]"
              initial={motionEnabled ? { opacity: 0, x: 40 } : false}
              whileInView={motionEnabled ? { opacity: 1, x: 0 } : undefined}
              viewport={VIEWPORT}
              transition={{ duration: 0.85, ease: EASE, delay: 0.15 }}
            >
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
                  key={active}
                  initial={
                    motionEnabled
                      ? { opacity: 0, y: 24, scale: 0.95 }
                      : false
                  }
                  animate={
                    motionEnabled ? { opacity: 1, y: 0, scale: 1 } : undefined
                  }
                  exit={
                    motionEnabled
                      ? { opacity: 0, y: -16, scale: 0.97 }
                      : undefined
                  }
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute bottom-0 w-[165px] overflow-hidden rounded-[28px] border border-white/10 bg-surface-card shadow-[0_32px_80px_-16px_rgb(0_0_0/0.85)] sm:w-[185px] md:w-[210px]"
                  style={{ aspectRatio: "9 / 19" }}
                >
                  <Image
                    src={images[active].src}
                    alt={images[active].alt}
                    width={420}
                    height={886}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 50vw, 240px"
                    priority={active === 0}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-3 right-2 flex items-center gap-1.5 lg:hidden">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      active === i
                        ? "w-5 bg-primary"
                        : "w-1.5 bg-hairline-strong",
                    )}
                    aria-label={`Show image ${i + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
