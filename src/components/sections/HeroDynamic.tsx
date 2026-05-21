"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import HeroShell from "@/components/sections/HeroShell";
import type { HeroContentProps } from "@/lib/content/hero-props";
import type { SiteContent } from "@/lib/content/types";

type HeroDynamicProps = HeroContentProps & {
  shell: SiteContent["hero"];
};

export default function HeroDynamic({ shell, ...heroProps }: HeroDynamicProps) {
  const Hero = useMemo(
    () =>
      dynamic(() => import("@/components/sections/Hero"), {
        ssr: false,
        loading: () => <HeroShell hero={shell} />,
      }),
    [shell],
  );

  return <Hero {...heroProps} />;
}
