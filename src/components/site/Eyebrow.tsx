import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export default function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p className={cn("text-xs font-medium uppercase tracking-widest text-mute", className)}>
      {children}
    </p>
  );
}
