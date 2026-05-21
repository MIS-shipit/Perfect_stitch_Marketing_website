"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
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
  const { animate, reduced } = useMotionReady();
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /* Scroll-linked image cycling
     As the card scrolls through the viewport (start end → end start),
     map progress 0→1 to image indices 0→(n-1).
   */
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const imageCount = images.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reduced) return;
    // latest goes 0→1 as card enters→exits viewport
    const idx = Math.min(imageCount - 1, Math.floor(latest * imageCount));
    setActive((prev) => (prev !== idx ? idx : prev));
  });

  return (
    <div ref={cardRef}>
      <article
        className={cn(
          "relative overflow-hidden rounded-3xl border border-hairline bg-surface-elevated",
          className,
        )}
      >
        {/* Top fade glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 20% 0%, var(--color-primary-soft), transparent 55%)",
          }}
        />

        <div className="relative z-10 grid grid-cols-1 gap-8 p-6 md:p-8 lg:grid-cols-[1fr_1.35fr] lg:items-center lg:gap-10 lg:p-10">
          {/* Left: copy */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium uppercase tracking-widest text-mute">
              {eyebrow}
            </span>
            <h3 className="text-2xl font-semibold leading-[1.2] text-ink md:text-3xl">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-body md:text-base">{body}</p>

            {/* Caption pills */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
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
                      "size-1.5 rounded-full transition-colors",
                      active === i ? "bg-primary" : "bg-hairline-strong",
                    )}
                  />
                  {img.caption}
                </button>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-hairline">
              <motion.div
                className="h-full rounded-full bg-primary"
                style={{
                  width: `${((active + 1) / imageCount) * 100}%`,
                }}
                transition={{ duration: 0.35, ease: EASE }}
              />
            </div>
          </div>

          {/* Right: phone image fanned out */}
          <div className="relative flex h-[320px] items-end justify-center gap-3 overflow-hidden sm:h-[380px] md:h-[440px]">
            {images.map((img, i) => {
              const offset = i - active;
              const isActive = i === active;
              const layout = {
                x: offset * 72,
                scale: isActive ? 1 : 0.78,
                opacity: Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.4,
                filter: isActive ? "blur(0px)" : "blur(1.5px)",
                zIndex: 10 - Math.abs(offset),
              };
              const phoneClass =
                "absolute bottom-0 w-[160px] origin-bottom overflow-hidden rounded-[26px] border border-white/10 bg-surface-card shadow-[0_24px_64px_-12px_rgb(0_0_0/0.7)] sm:w-[180px] md:w-[200px]";

              if (!animate) {
                return (
                  <div
                    key={img.src}
                    aria-hidden={!isActive}
                    className={phoneClass}
                    style={{
                      aspectRatio: "9 / 19",
                      transform: `translateX(${layout.x}px) scale(${layout.scale})`,
                      opacity: layout.opacity,
                      filter: layout.filter,
                      zIndex: layout.zIndex,
                    }}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={420}
                      height={886}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 768px) 50vw, 220px"
                      priority={i === 0}
                    />
                  </div>
                );
              }

              return (
                <motion.div
                  key={img.src}
                  aria-hidden={!isActive}
                  animate={layout}
                  transition={{ duration: 0.55, ease: EASE }}
                  className={phoneClass}
                  style={{ aspectRatio: "9 / 19" }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={420}
                    height={886}
                    className="h-full w-full object-cover"
                    sizes="(max-width: 768px) 50vw, 220px"
                    priority={i === 0}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </article>
    </div>
  );
}
