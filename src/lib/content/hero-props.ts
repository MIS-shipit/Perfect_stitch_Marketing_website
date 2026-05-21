import type { SiteContent } from "./types";

export type HeroContentProps = {
  eyebrow: string;
  headline: SiteContent["hero"]["headline"];
  subcopy: string;
  cities: string[];
  cityLabel: string;
  customerSrc: string;
  providerSrc: string;
  customerAlt: string;
  providerAlt: string;
};

export function toHeroProps(content: SiteContent): HeroContentProps {
  const customer = content.resolveMockup(content.hero.mockups.customer);
  const provider = content.resolveMockup(content.hero.mockups.provider);
  return {
    eyebrow: content.hero.eyebrow,
    headline: content.hero.headline,
    subcopy: content.hero.subcopy,
    cities: content.hero.cities,
    cityLabel: content.hero.cityLabel,
    customerSrc: customer.src,
    providerSrc: provider.src,
    customerAlt: customer.alt,
    providerAlt: provider.alt,
  };
}
