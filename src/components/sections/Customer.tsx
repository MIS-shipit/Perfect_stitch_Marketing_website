"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMotionReady } from "@/lib/use-motion-ready";
import MockupGrid, { type MockupItem } from "@/components/marketing/MockupGrid";
import ImageShowcaseCard from "@/components/marketing/ImageShowcaseCard";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import HowItWorks from "@/components/sections/HowItWorks";

const SHOWCASE_IMAGES = [
  { src: "/mockups/_placeholder/customer-home.png",     alt: "Customer home screen",       caption: "Home — services at a glance" },
  { src: "/mockups/_placeholder/customer-tracking.png", alt: "Order tracking screen",      caption: "Live order tracking" },
  { src: "/mockups/_placeholder/customer-payment.png",  alt: "Payment confirmation",       caption: "Razorpay-secured payment" },
  { src: "/mockups/_placeholder/customer-profile.png",  alt: "Profile and history screen", caption: "Profile, addresses, history" },
];

const CUSTOMER_STEPS = [
  {
    num: "01",
    title: "Download the app",
    body: "Get the Customer app from Google Play or App Store — free, takes under a minute.",
  },
  {
    num: "02",
    title: "Book your pickup",
    body: "Choose laundry or tailoring, drop a pin, pick a time. A nearby provider confirms within minutes.",
  },
  {
    num: "03",
    title: "Track & pay",
    body: "Follow every step live. Pay securely with Razorpay only when your order is delivered.",
  },
] as const;

const CARDS: MockupItem[] = [
  {
    title: "Browse + book in seconds",
    body: "Pick your service, drop a pin for pickup, and confirm. A nearby provider accepts within minutes — no calls, no queues.",
    mockup: { src: "/mockups/_placeholder/customer-home.png", alt: "Customer home screen" },
    tag: "Booking",
  },
  {
    title: "Real-time order tracking",
    body: "Follow every step of your order — from pickup to delivery — with a live timeline and in-app chat with your provider.",
    mockup: { src: "/mockups/_placeholder/customer-tracking.png", alt: "Order tracking screen" },
    tag: "Tracking",
  },
  {
    title: "Secure Razorpay payments",
    body: "Pay only when your order is ready. Razorpay-backed checkout with invoice confirmation — your card details stay off our servers.",
    mockup: { src: "/mockups/_placeholder/customer-payment.png", alt: "Payment screen" },
    tag: "Payments",
  },
  {
    title: "Profile, addresses & history",
    body: "Save multiple addresses, reorder past items, and switch between English, Hindi, and Tamil — all from your profile.",
    mockup: { src: "/mockups/_placeholder/customer-profile.png", alt: "Profile and history screen" },
    tag: "Profile",
  },
];

export default function Customer() {
  const { animate } = useMotionReady();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.35"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} id="customer" className="py-12 md:py-16 lg:py-24">
      <Container>
        <motion.div style={animate ? { y: headerY, opacity: headerOpacity } : undefined}>
          <Eyebrow>For Customers</Eyebrow>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.15] text-ink md:text-5xl">
            Drop it off. Forget about it. We&apos;ve got it.
          </h2>
        </motion.div>

        {/* Auto-rotating image showcase */}
        <div className="mt-12">
          <ImageShowcaseCard
            eyebrow="The customer app"
            title="One app for every step of your laundry & tailoring journey."
            body="From booking pickup to tracking delivery and paying securely — Perfect Stitch keeps your wardrobe under your fingertips."
            images={SHOWCASE_IMAGES}
          />
        </div>

        {/* Staggered 2-col mockup grid */}
        <MockupGrid items={CARDS} accent="rgb(20 184 184 / 0.18)" />

        <HowItWorks eyebrow="How it works for customers" steps={CUSTOMER_STEPS} />
      </Container>
    </section>
  );
}
