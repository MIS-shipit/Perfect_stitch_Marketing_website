"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

export interface TeamMember {
  name: string;
  handle: string;
  role: string;
  city: string;
  avatar: string;
}

interface TeamCarouselProps {
  members: readonly TeamMember[];
}

const CARD_W = 320;
const GAP = 48;
const SLOT = CARD_W + GAP;

function slotClass(distance: number) {
  if (distance === 0) {
    return "z-10 scale-100 opacity-100 blur-0 pointer-events-auto";
  }
  if (distance === 1) {
    return "z-[5] scale-[0.96] opacity-95 blur-0 pointer-events-auto";
  }
  return "z-[1] scale-[0.9] opacity-55 blur-0 pointer-events-none";
}

export default function TeamCarousel({ members }: TeamCarouselProps) {
  const [mounted, setMounted] = useState(false);
  const [center, setCenter] = useState(Math.floor(members.length / 2));
  const reduced = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const update = () => {
      if (containerRef.current) {
        setContainerW(containerRef.current.offsetWidth);
      }
    };

    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [mounted]);

  const rowX = containerW / 2 - (center * SLOT + CARD_W / 2);

  return (
    <div
      ref={containerRef}
      className="relative w-full py-10"
      style={{ overflow: "clip" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-canvas to-transparent sm:w-24"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-canvas to-transparent sm:w-24"
      />

      {mounted && containerW > 0 ? (
        <motion.div
          className="flex items-center"
          style={{ gap: GAP }}
          initial={false}
          animate={{ x: rowX }}
          transition={reduced ? { duration: 0 } : { duration: 0.5, ease: EASE }}
        >
          {members.map((m, i) => (
            <TeamCard
              key={m.handle}
              member={m}
              distance={Math.abs(i - center)}
              isCenter={i === center}
              onFocus={() => setCenter(i)}
            />
          ))}
        </motion.div>
      ) : (
        <div
          className="flex items-center justify-center gap-12"
          aria-hidden
        >
          <TeamCard
            member={members[center]}
            distance={0}
            isCenter
            onFocus={() => {}}
          />
        </div>
      )}
    </div>
  );
}

function TeamCard({
  member: m,
  distance,
  isCenter,
  onFocus,
}: {
  member: TeamMember;
  distance: number;
  isCenter: boolean;
  onFocus: () => void;
}) {
  return (
    <div
      onClick={() => !isCenter && onFocus()}
      role={!isCenter ? "button" : undefined}
      aria-label={!isCenter ? `Focus ${m.name}` : undefined}
      tabIndex={distance <= 1 ? 0 : -1}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !isCenter) {
          e.preventDefault();
          onFocus();
        }
      }}
      className={cn(
        "flex w-80 shrink-0 items-center gap-4 rounded-2xl border px-6 py-5 select-none transition-[transform,opacity,filter,border-color,box-shadow] duration-500 ease-out",
        slotClass(distance),
        isCenter
          ? "cursor-default border-hairline-strong bg-surface-card shadow-[0_24px_60px_-20px_rgb(20_184_184/0.3)] ring-1 ring-primary/20"
          : distance === 1
            ? "cursor-pointer border-hairline-strong/70 bg-surface-card/90 shadow-[0_12px_40px_-20px_rgb(20_184_184/0.35)] hover:border-primary/25"
            : "cursor-pointer border-hairline/50 bg-surface/70 hover:border-hairline",
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full border transition-all duration-500",
          isCenter
            ? "size-12 border-primary/30"
            : distance === 1
              ? "size-11 border-hairline-strong"
              : "size-10 border-hairline",
        )}
      >
        <Image
          src={m.avatar}
          alt={m.name}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      <div className="flex min-w-0 flex-col gap-0.5">
        {distance <= 1 ? (
          <>
            <div className="flex items-center gap-1.5">
              <span
                className={cn(
                  "text-sm font-semibold",
                  isCenter ? "text-ink" : "text-body",
                )}
              >
                {m.name}
              </span>
              {isCenter ? (
                <span className="text-xs text-mute">{m.handle}</span>
              ) : null}
            </div>
            <span className={cn("text-xs", isCenter ? "text-body" : "text-mute")}>
              {m.role}
            </span>
          </>
        ) : (
          <span className="text-xs text-mute">{m.name}</span>
        )}
      </div>
    </div>
  );
}
