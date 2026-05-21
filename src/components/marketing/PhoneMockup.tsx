import Image from "next/image";
import { cn } from "@/lib/cn";

interface PhoneMockupProps {
  src: string;
  alt: string;
  tilt?: number;
  priority?: boolean;
  className?: string;
}

function isPlaceholder(src: string) {
  return src.includes("_placeholder");
}

// SVG rx=44 in a 360-wide viewport = 44/360 = 12.22% of width
// SVG ry=44 in a 780-tall viewport = 44/780 = 5.64% of height
// Using CSS border-radius percentage syntax: X% uses X% of element's own dimension
// This ensures content clip matches the SVG border at all rendered sizes.
const SCREEN_RADIUS = "12.22% / 5.64%";

export default function PhoneMockup({
  src,
  alt,
  tilt = 0,
  priority = false,
  className,
}: PhoneMockupProps) {
  return (
    <div
      className={cn("relative inline-block", className)}
      style={{
        rotate: `${tilt}deg`,
        filter: "drop-shadow(0 24px 64px rgba(20,184,184,0.18))",
      }}
    >
      {/* SVG device frame — sits above the screen as a visual border */}
      <svg
        aria-hidden
        viewBox="0 0 360 780"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="1"
          y="1"
          width="358"
          height="778"
          rx="44"
          ry="44"
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1.5"
        />
        {/* Notch pill */}
        <rect x="140" y="14" width="80" height="10" rx="5" fill="rgba(255,255,255,0.08)" />
      </svg>

      {/* Screen — clip radius matches SVG proportionally */}
      <div
        className="relative overflow-hidden bg-surface-elevated"
        style={{ aspectRatio: "360/780", borderRadius: SCREEN_RADIUS }}
      >
        <Image
          src={src}
          alt={alt}
          width={1080}
          height={2340}
          priority={priority}
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 40vw, 280px"
        />
        {isPlaceholder(src) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-surface-elevated/60">
            <div className="h-1 w-12 rounded-full bg-hairline-strong" />
            <span className="mt-2 text-[11px] text-mute/60">
              Placeholder
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
