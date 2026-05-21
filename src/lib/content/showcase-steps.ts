import "server-only";

import stepsJson from "@/content/showcase-steps.json";
import type { ShowcaseStep } from "@/components/marketing/ImageShowcaseCard";
import type { SiteContent } from "./types";

type StepDef = {
  key: string;
  caption: string;
  title: string;
  body: string;
  services: string[];
};

const defs = stepsJson as { customer: StepDef[]; provider: StepDef[] };

function resolveSteps(content: SiteContent, keys: StepDef[]): ShowcaseStep[] {
  return keys.map((def) => {
    const mockup = content.resolveMockup(def.key);
    return {
      src: mockup.src,
      alt: mockup.alt,
      caption: def.caption,
      title: def.title,
      body: def.body,
      services: def.services,
    };
  });
}

export function customerShowcaseSteps(content: SiteContent): ShowcaseStep[] {
  return resolveSteps(content, defs.customer);
}

export function providerShowcaseSteps(content: SiteContent): ShowcaseStep[] {
  return resolveSteps(content, defs.provider);
}
