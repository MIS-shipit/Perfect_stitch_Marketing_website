import HeroDynamic from "@/components/sections/HeroDynamic";
import FeatureMarquee from "@/components/sections/FeatureMarquee";
import ServiceShowcase from "@/components/sections/ServiceShowcase";
import Customer from "@/components/sections/Customer";
import Provider from "@/components/sections/Provider";
import DownloadCTA from "@/components/sections/DownloadCTA";
import ContactStrip from "@/components/sections/ContactStrip";
import ClosingCTA from "@/components/sections/ClosingCTA";
import JsonLd from "@/components/seo/JsonLd";
import { customerAppJsonLd, providerAppJsonLd } from "@/lib/json-ld";
import { getSiteContent } from "@/lib/content/get-site-content";
import { toHeroProps } from "@/lib/content/hero-props";
import { customerCards, providerCards } from "@/lib/content/section-mockups";
import {
  customerShowcaseSteps,
  providerShowcaseSteps,
} from "@/lib/content/showcase-steps";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getSiteContent();
  const heroProps = toHeroProps(content);

  return (
    <>
      <JsonLd data={[customerAppJsonLd(), providerAppJsonLd()]} />
      <HeroDynamic shell={content.hero} {...heroProps} />
      <FeatureMarquee items={content.marquee} />
      <ServiceShowcase />
      <Customer
        showcaseSteps={customerShowcaseSteps(content)}
        cards={customerCards(content)}
      />
      <Provider
        showcaseSteps={providerShowcaseSteps(content)}
        cards={providerCards(content)}
      />
      <DownloadCTA
        playUrl={content.stores.playUrl}
        appleUrl={content.stores.appleUrl}
      />
      <ContactStrip />
      <ClosingCTA />
    </>
  );
}
