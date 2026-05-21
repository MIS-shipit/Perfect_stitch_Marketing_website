"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["services", "customer", "provider", "download"] as const;

export type ScrollSectionId = (typeof SECTION_IDS)[number];

const NAV_OFFSET = 88;

/** Full bar while hero dominates; compact pill once services (or below) enters the nav zone. */
function isHeroMode(): boolean {
  const hero = document.getElementById("hero");
  if (!hero) return window.scrollY < window.innerHeight * 0.5;

  const heroRect = hero.getBoundingClientRect();
  const services = document.getElementById("services");
  const servicesTop = services?.getBoundingClientRect().top ?? Infinity;

  return heroRect.bottom > window.innerHeight * 0.38 && servicesTop > window.innerHeight * 0.22;
}

function pickActiveSection(): ScrollSectionId | null {
  let winner: ScrollSectionId | null = null;
  let winnerTop = Infinity;

  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (!el) continue;

    const rect = el.getBoundingClientRect();
    const inBand =
      rect.top < window.innerHeight * 0.55 && rect.bottom > NAV_OFFSET + 48;

    if (inBand && rect.top < winnerTop) {
      winnerTop = rect.top;
      winner = id;
    }
  }

  return winner;
}

export function useNavScrollState(pathname: string) {
  const [compact, setCompact] = useState(pathname !== "/");
  const [activeSection, setActiveSection] = useState<ScrollSectionId | null>(
    null,
  );

  useEffect(() => {
    if (pathname !== "/") {
      setCompact(true);
      setActiveSection(null);
      return;
    }

    const update = () => {
      const heroMode = isHeroMode();
      setCompact(!heroMode);

      if (heroMode) {
        setActiveSection(null);
        return;
      }

      setActiveSection(pickActiveSection());
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
    };
  }, [pathname]);

  return { compact, activeSection };
}
