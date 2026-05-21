"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";
import { useMotionReady } from "@/lib/use-motion-ready";

type Store = "play" | "apple";

interface QRCardProps {
  playSrc: string;
  appleSrc: string;
  playUrl: string;
  appleUrl: string;
}

// Official-style Play Store icon — colorful gradient triangle
function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      className={cn("shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ps-grad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00CFE8" />
          <stop offset="45%" stopColor="#01CA7C" />
          <stop offset="100%" stopColor="#FFD740" />
        </linearGradient>
      </defs>
      <path d="M4.5 2.8 19.2 12 4.5 21.2V2.8Z" fill="url(#ps-grad)" />
    </svg>
  );
}

// Official-style Apple logo
function AppleIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.31.07 2.22.74 2.98.8 1.14-.23 2.23-.93 3.44-.84 1.47.12 2.57.7 3.29 1.82-3.02 1.8-2.53 5.75.48 6.9-.58 1.56-1.35 3.1-2.19 4.18ZM13 3.5C13.73 2.67 14.94 2.04 16 2c.16 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.96 1.42-.18-1.14.33-2.3 1-3.11Z" />
    </svg>
  );
}

const STORE_META: Record<Store, { eyebrow: string; label: string; ariaLabel: string }> = {
  play: {
    eyebrow: "GET IT ON",
    label: "Google Play",
    ariaLabel: "Get it on Google Play",
  },
  apple: {
    eyebrow: "DOWNLOAD ON THE",
    label: "App Store",
    ariaLabel: "Download on the App Store",
  },
};

export default function QRCard({ playSrc, appleSrc, playUrl, appleUrl }: QRCardProps) {
  const [active, setActive] = useState<Store>("play");
  const { animate } = useMotionReady();

  const qrSrc = active === "play" ? playSrc : appleSrc;
  const storeUrl = active === "play" ? playUrl : appleUrl;

  return (
    <motion.div
      initial={animate ? { opacity: 0, y: 24 } : false}
      whileInView={animate ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: EASE }}
      viewport={{ once: true, margin: "-80px" }}
      className="qr-card-neon flex flex-col items-center gap-7 rounded-[28px] border border-primary/20 bg-surface-elevated p-8"
    >
      {/* Store toggle */}
      <div
        className="flex rounded-full border border-hairline bg-surface-card p-1"
        role="tablist"
        aria-label="Select store"
      >
        {(["play", "apple"] as Store[]).map((store) => {
          const isActive = active === store;
          return (
            <button
              key={store}
              role="tab"
              aria-selected={isActive}
              aria-label={store === "play" ? "Google Play" : "Apple App Store"}
              onClick={() => setActive(store)}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft",
                isActive ? "text-primary" : "text-mute hover:text-ink",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="qr-tab-pill"
                  className="absolute inset-0 rounded-full bg-primary-soft"
                  transition={{ duration: 0.25, ease: EASE }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {store === "play" ? (
                  <PlayStoreIcon className="size-4" />
                ) : (
                  <AppleIcon className="size-4" />
                )}
                {store === "play" ? "Google Play" : "App Store"}
              </span>
              {isActive && (
                <span className="absolute inset-x-4 -bottom-1 h-0.5 rounded-full bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      {/* QR tile */}
      <div className="rounded-[20px] bg-surface-card p-4">
        <div className="relative size-56 overflow-hidden rounded-2xl bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={animate ? { opacity: 0, scale: 0.95 } : false}
              animate={{ opacity: 1, scale: 1, transition: { duration: 0.22, ease: "easeOut" } }}
              exit={animate ? { opacity: 0, scale: 0.95, transition: { duration: 0.15, ease: "easeIn" } } : undefined}
              className="absolute inset-0"
            >
              <Image
                src={qrSrc}
                alt={`QR code — ${STORE_META[active].ariaLabel}`}
                fill
                className="object-contain p-2.5"
                sizes="224px"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Store badge buttons — official-style */}
      <div className="flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center">
        {(["play", "apple"] as Store[]).map((store) => {
          const isActive = active === store;
          const meta = STORE_META[store];
          const href = store === "play" ? playUrl : appleUrl;
          return (
            <Link
              key={store}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group flex min-w-[160px] items-center gap-3 rounded-2xl border px-5 py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft",
                isActive
                  ? "border-primary/35 bg-primary/10 hover:bg-primary/15"
                  : "border-hairline bg-surface-card hover:border-hairline-strong",
              )}
              style={
                isActive
                  ? { boxShadow: "0 0 16px rgba(20,184,184,0.14)" }
                  : undefined
              }
              aria-label={meta.ariaLabel}
            >
              {store === "play" ? (
                <PlayStoreIcon className="size-7" />
              ) : (
                <AppleIcon
                  className={cn(
                    "size-7",
                    isActive ? "text-primary" : "text-mute group-hover:text-ink",
                  )}
                />
              )}
              <div className="text-left">
                <p
                  className={cn(
                    "text-[10px] font-medium uppercase leading-none tracking-widest",
                    isActive ? "text-primary/70" : "text-mute",
                  )}
                >
                  {meta.eyebrow}
                </p>
                <p
                  className={cn(
                    "mt-0.5 text-sm font-semibold leading-tight",
                    isActive ? "text-primary" : "text-ink",
                  )}
                >
                  {meta.label}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="text-sm text-mute">Scan with your phone camera</p>
    </motion.div>
  );
}
