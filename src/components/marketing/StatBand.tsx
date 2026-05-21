import { cn } from "@/lib/cn";

interface Stat {
  value: string;
  label: string;
}

interface StatBandProps {
  stats: Stat[];
  className?: string;
}

export default function StatBand({ stats, className }: StatBandProps) {
  return (
    <div
      className={cn(
        "border-y border-hairline bg-surface py-12",
        className,
      )}
    >
      <dl className="mx-auto grid max-w-[1240px] grid-cols-2 gap-8 px-6 md:px-8 lg:grid-cols-4 lg:px-10">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <dt className="text-4xl font-semibold text-primary">{stat.value}</dt>
            <dd className="text-sm text-body">{stat.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
