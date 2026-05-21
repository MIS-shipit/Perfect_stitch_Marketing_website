import Image from "next/image";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  showWordmark?: boolean;
  size?: "sm" | "md";
  className?: string;
};

const SIZES = {
  sm: { mark: 28, word: "text-sm" },
  md: { mark: 32, word: "text-sm" },
} as const;

export default function BrandLogo({
  showWordmark = true,
  size = "md",
  className,
}: BrandLogoProps) {
  const s = SIZES[size];

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image
        src="/logo/mark.png"
        alt=""
        width={s.mark}
        height={s.mark}
        className="shrink-0 rounded-lg"
        priority
      />
      {showWordmark ? (
        <span className={cn("font-semibold tracking-tight text-ink", s.word)}>
          Perfect Stitch
        </span>
      ) : null}
    </span>
  );
}
