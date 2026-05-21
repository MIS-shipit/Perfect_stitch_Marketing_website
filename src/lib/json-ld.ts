import { SITE_NAME, SITE_URL } from "@/lib/site";

export function customerAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${SITE_NAME} — Customer`,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "Android, iOS",
    description:
      "Book laundry and tailoring pickup, track orders in real time, and pay securely.",
    url: SITE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };
}

export function providerAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${SITE_NAME} — Provider`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Android, iOS",
    description:
      "Offline-first shop dashboard for measurements, order pipeline, and payouts.",
    url: SITE_URL,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/perfect-stitch-light.svg`,
    email: "support@perfectstitch.online",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@perfectstitch.online",
      },
      {
        "@type": "ContactPoint",
        contactType: "partnerships",
        email: "partner@perfectstitch.online",
      },
    ],
  };
}
