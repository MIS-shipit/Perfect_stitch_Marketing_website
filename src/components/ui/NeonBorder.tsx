"use client";

import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useMotionReady } from "@/lib/use-motion-ready";

type NeonBorderProps = {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  radius?: string;
  variant?: "fill" | "outline";
  /** Subtle drifting gradient inside the card (showcase panels). */
  ambient?: boolean;
  /** Mouse-follow highlight on the border ring. */
  spotlight?: boolean;
};

export default function NeonBorder({
  children,
  className,
  innerClassName,
  radius = "9999px",
  variant = "outline",
  ambient = false,
  spotlight = true,
}: NeonBorderProps) {
  const { motionEnabled } = useMotionReady();
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!motionEnabled || !spotlight || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setSpot({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const onLeave = () => setSpot({ x: 50, y: 50 });

  const spotStyle = {
    "--spot-x": `${spot.x}%`,
    "--spot-y": `${spot.y}%`,
    borderRadius: radius,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      className={cn("neon-border relative flex w-full overflow-hidden", className)}
      style={spotStyle}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {motionEnabled ? (
        <>
          <span
            aria-hidden
            className="neon-border-trace"
            style={{ borderRadius: radius }}
          />
          {spotlight ? (
            <span
              aria-hidden
              className="neon-border-spot"
              style={{ borderRadius: radius }}
            />
          ) : null}
        </>
      ) : null}
      <div
        className={cn(
          "neon-border-inner relative z-[1] w-full",
          variant === "fill"
            ? "bg-primary text-primary-foreground hover:bg-primary-hover"
            : ambient
              ? "border-0 bg-transparent text-ink"
              : "border border-hairline/60 bg-surface-elevated/90 text-ink hover:border-hairline-strong",
          innerClassName,
        )}
        style={{ borderRadius: radius }}
      >
        {ambient && motionEnabled ? (
          <>
            <span
              aria-hidden
              className="neon-border-ambient-base"
              style={{ borderRadius: radius }}
            />
            <span
              aria-hidden
              className="neon-border-ambient-glow"
              style={{ borderRadius: radius }}
            />
          </>
        ) : null}
        <div className={cn(ambient && "relative z-[1]")}>{children}</div>
      </div>
    </div>
  );
}
