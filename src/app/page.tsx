import Hero from "@/components/sections/Hero";
import FeatureMarquee from "@/components/sections/FeatureMarquee";
import ServiceShowcase from "@/components/sections/ServiceShowcase";
import Customer from "@/components/sections/Customer";
import Provider from "@/components/sections/Provider";
import DownloadCTA from "@/components/sections/DownloadCTA";
import ContactStrip from "@/components/sections/ContactStrip";
import ClosingCTA from "@/components/sections/ClosingCTA";
import JsonLd from "@/components/seo/JsonLd";
import { customerAppJsonLd, providerAppJsonLd } from "@/lib/json-ld";

export default function Home() {
  return (
    <>
      <JsonLd data={[customerAppJsonLd(), providerAppJsonLd()]} />
      <Hero />
      <FeatureMarquee />
      <ServiceShowcase />
      <Customer />
      <Provider />
      <DownloadCTA />
      <ContactStrip />
      <ClosingCTA />
    </>
  );
}
