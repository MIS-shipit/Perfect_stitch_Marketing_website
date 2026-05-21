import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import type { SiteContent } from "@/lib/content/types";

type HeroShellProps = {
  hero: SiteContent["hero"];
};

export default function HeroShell({ hero }: HeroShellProps) {
  const headline = hero.headline
    .map((w) => w.text)
    .join(" ")
    .replace(" ,", ",");

  return (
    <section
      className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden bg-canvas py-24"
      aria-labelledby="hero-headline"
      aria-busy="true"
    >
      <div
        aria-hidden
        className="dot-grid pointer-events-none absolute inset-0 z-[2] opacity-50"
      />
      <Container className="relative z-10">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex max-w-xl flex-col items-center gap-6 text-center lg:items-start lg:text-left">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1
              id="hero-headline"
              className="text-[40px] font-semibold leading-[1.1] tracking-tight text-ink lg:text-[64px]"
            >
              {headline}
            </h1>
            <p className="text-lg leading-relaxed text-body lg:text-xl">{hero.subcopy}</p>
          </div>
          <div
            className="relative flex shrink-0 items-end justify-center gap-4 lg:gap-6"
            aria-hidden
          >
            <div className="h-[280px] w-[140px] animate-pulse rounded-[12.22%/5.64%] bg-surface-elevated sm:w-[160px] lg:w-[200px]" />
            <div className="h-[280px] w-[140px] animate-pulse rounded-[12.22%/5.64%] bg-surface-elevated sm:w-[160px] lg:w-[200px]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
