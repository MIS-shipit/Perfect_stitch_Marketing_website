import type { MockupItem } from "@/components/marketing/MockupGrid";
import type { SiteContent } from "./types";

export function customerCards(content: SiteContent): MockupItem[] {
  return [
    {
      title: "Book in seconds",
      body: "Laundry or tailoring, one tap. Drop a pin, pick a time — a nearby shop confirms fast.",
      mockup: content.resolveMockup("customer-home"),
      tag: "Booking",
    },
    {
      title: "Never wonder where it is",
      body: "Live timeline from pickup to delivery. Chat your shop in-app when you need an update.",
      mockup: content.resolveMockup("customer-tracking"),
      tag: "Tracking",
    },
    {
      title: "Pay when it's ready",
      body: "Razorpay checkout when your order is done. No paying upfront, no card data on our servers.",
      mockup: content.resolveMockup("customer-payment"),
      tag: "Payments",
    },
    {
      title: "Your wardrobe, remembered",
      body: "Saved addresses, past orders, and quick reorders — in English, Hindi, or Tamil.",
      mockup: content.resolveMockup("customer-profile"),
      tag: "Profile",
    },
  ].map((card) => ({
    ...card,
    mockup: { src: card.mockup.src, alt: card.mockup.alt },
  }));
}

export function providerCards(content: SiteContent): MockupItem[] {
  return [
    {
      title: "Works when Wi‑Fi doesn't",
      body: "Take orders offline. Everything queues locally and syncs the second you're back online.",
      mockup: content.resolveMockup("provider-dashboard"),
      tag: "Dashboard",
    },
    {
      title: "Intake without the mess",
      body: "Measurements and laundry items logged in seconds — fewer mistakes at the counter.",
      mockup: content.resolveMockup("provider-measurements"),
      tag: "Intake",
    },
    {
      title: "One-tap pipeline",
      body: "Move orders forward with a tap. Customers see updates instantly — fewer phone calls.",
      mockup: content.resolveMockup("provider-pipeline"),
      tag: "Pipeline",
    },
    {
      title: "Money in, clearly",
      body: "Daily earnings and Razorpay settlements — straight to your bank, nothing hidden.",
      mockup: content.resolveMockup("provider-payouts"),
      tag: "Payouts",
    },
  ].map((card) => ({
    ...card,
    mockup: { src: card.mockup.src, alt: card.mockup.alt },
  }));
}
