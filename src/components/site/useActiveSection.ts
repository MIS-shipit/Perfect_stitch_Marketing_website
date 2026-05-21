"use client";

import { useEffect, useState } from "react";

const DEFAULT_SECTION_IDS = ["customer", "provider", "download"] as const;

export function useActiveSection(
  sectionIds: readonly string[] = DEFAULT_SECTION_IDS,
) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        const topmost = visible.reduce((prev, curr) =>
          curr.boundingClientRect.top < prev.boundingClientRect.top
            ? curr
            : prev,
        );
        setActiveSection(topmost.target.id);
      },
      {
        rootMargin: "-80px 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      },
    );

    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [sectionIds.join(",")]);

  return activeSection;
}
