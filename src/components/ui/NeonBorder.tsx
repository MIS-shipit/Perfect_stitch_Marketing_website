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
};

export default function NeonBorder({
  children,
  className,
  innerClassName,
  radius = "9999px",
  variant = "outline",
}: NeonBorderProps) {
  const { motionEnabled } = useMotionReady();
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 50, y: 50 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!motionEnabled || !ref.current) return;
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
      className={cn("neon-border relative flex w-full", className)}
      style={spotStyle}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {motionEnabled ? (
        <>
          <span aria-hidden className="neon-border-orbit" style={{ borderRadius: radius }} />
          <span aria-hidden className="neon-border-spot" style={{ borderRadius: radius }} />
        </>
      ) : null}
      <div
        className={cn(
          "neon-border-inner relative z-[1] w-full",
          variant === "fill"
            ? "bg-primary text-primary-foreground hover:bg-primary-hover"
            : "border border-hairline/60 bg-surface-elevated/90 text-ink hover:border-hairline-strong",
          innerClassName,
        )}
        style={{ borderRadius: radius }}
      >
        {children}
      </div>
    </div>
  );
}
