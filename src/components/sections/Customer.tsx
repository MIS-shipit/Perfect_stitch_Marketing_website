"use client";

import { motion } from "framer-motion";
import { useMotionReady } from "@/lib/use-motion-ready";
import MockupGrid, { type MockupItem } from "@/components/marketing/MockupGrid";
import ImageShowcaseCard from "@/components/marketing/ImageShowcaseCard";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import HowItWorks from "@/components/sections/HowItWorks";
import { revealUp, stagger, VIEWPORT } from "@/lib/motion";

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
  const { motionEnabled } = useMotionReady();

  return (
    <section id="customer" className="py-12 md:py-16 lg:py-24">
      <Container>
        <motion.div
          variants={motionEnabled ? stagger(0.12) : undefined}
          initial={motionEnabled ? "initial" : false}
          whileInView={motionEnabled ? "animate" : undefined}
          viewport={VIEWPORT}
        >
          <motion.div variants={motionEnabled ? revealUp : undefined}>
            <Eyebrow>For Customers</Eyebrow>
          </motion.div>
          <motion.h2
            variants={motionEnabled ? revealUp : undefined}
            className="mt-4 text-4xl font-semibold leading-[1.15] text-ink md:text-5xl"
          >
            Drop it off. Forget about it. We&apos;ve got it.
          </motion.h2>
        </motion.div>

        <div className="mt-12">
          <ImageShowcaseCard
            eyebrow="The customer app"
            title="One app for every step of your laundry & tailoring journey."
            body="From booking pickup to tracking delivery and paying securely — Perfect Stitch keeps your wardrobe under your fingertips."
            images={SHOWCASE_IMAGES}
          />
        </div>

        <MockupGrid items={CARDS} accent="rgb(20 184 184 / 0.18)" />

        <HowItWorks eyebrow="How it works for customers" steps={CUSTOMER_STEPS} />
      </Container>
    </section>
  );
}
