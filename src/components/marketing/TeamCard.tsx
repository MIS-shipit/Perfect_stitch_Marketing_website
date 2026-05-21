import Image from "next/image";
import { cn } from "@/lib/cn";

interface TeamCardProps {
  name: string;
  role: string;
  city: string;
  avatar: string;
  className?: string;
}

export default function TeamCard({
  name,
  role,
  city,
  avatar,
  className,
}: TeamCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 rounded-card border border-hairline bg-surface p-6 text-center",
        className,
      )}
    >
      <div className="relative size-20 overflow-hidden rounded-full border border-hairline-strong">
        <Image
          src={avatar}
          alt={name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>
      <div>
        <p className="font-semibold text-ink">{name}</p>
        <p className="mt-0.5 text-sm text-body">{role}</p>
        <p className="mt-1 text-xs text-mute">{city}</p>
      </div>
    </div>
  );
}
