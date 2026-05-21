"use client";

import { motion } from "framer-motion";
import { useMotionReady } from "@/lib/use-motion-ready";
import MockupGrid, { type MockupItem } from "@/components/marketing/MockupGrid";
import ImageShowcaseCard, { type ShowcaseImage } from "@/components/marketing/ImageShowcaseCard";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import HowItWorks from "@/components/sections/HowItWorks";
import { revealUp, stagger, VIEWPORT } from "@/lib/motion";

const PROVIDER_STEPS = [
  {
    num: "01",
    title: "List your shop",
    body: "Register your laundry or tailoring shop, set your services, prices, and pickup radius.",
  },
  {
    num: "02",
    title: "Accept & manage orders",
    body: "Orders arrive in your dashboard. Confirm, update status, and manage your pipeline — even offline.",
  },
  {
    num: "03",
    title: "Complete & get paid",
    body: "Mark orders complete and receive Razorpay settlements directly to your bank account.",
  },
] as const;

const SHOWCASE_IMAGES: ShowcaseImage[] = [
  { src: "/mockups/_placeholder/provider-dashboard.png",    alt: "Provider dashboard",       caption: "Offline-first dashboard" },
  { src: "/mockups/_placeholder/provider-pipeline.png",     alt: "Order pipeline screen",    caption: "Order pipeline" },
  { src: "/mockups/_placeholder/provider-measurements.png", alt: "Measurements screen",      caption: "Measurements & intake" },
  { src: "/mockups/_placeholder/provider-payouts.png",      alt: "Payouts screen",           caption: "Payouts & earnings" },
];

const CARDS: MockupItem[] = [
  {
    title: "Offline-first dashboard",
    body: "The provider app works without an internet connection. Every action queues locally and syncs automatically the moment you're back online.",
    mockup: { src: "/mockups/_placeholder/provider-dashboard.png", alt: "Provider dashboard" },
    tag: "Dashboard",
  },
  {
    title: "Measurements & laundry intake",
    body: "Record precise tailoring measurements and log laundry items in seconds. Structured intake keeps every order accurate from the start.",
    mockup: { src: "/mockups/_placeholder/provider-measurements.png", alt: "Measurements screen" },
    tag: "Intake",
  },
  {
    title: "Order pipeline & status updates",
    body: "Move orders through your pipeline with one tap. Status badges update customers in real time — no calls needed.",
    mockup: { src: "/mockups/_placeholder/provider-pipeline.png", alt: "Order pipeline screen" },
    tag: "Pipeline",
  },
  {
    title: "Payouts & earnings",
    body: "Track your daily earnings, view settlement history, and receive Razorpay payouts directly to your bank account.",
    mockup: { src: "/mockups/_placeholder/provider-payouts.png", alt: "Payouts screen" },
    tag: "Payouts",
  },
];

export default function Provider() {
  const { motionEnabled } = useMotionReady();

  return (
    <section id="provider" className="py-12 md:py-16 lg:py-24">
      <Container>
        <motion.div
          variants={motionEnabled ? stagger(0.12) : undefined}
          initial={motionEnabled ? "initial" : false}
          whileInView={motionEnabled ? "animate" : undefined}
          viewport={VIEWPORT}
        >
          <motion.div variants={motionEnabled ? revealUp : undefined}>
            <Eyebrow>For Shops</Eyebrow>
          </motion.div>
          <motion.h2
            variants={motionEnabled ? revealUp : undefined}
            className="mt-4 text-4xl font-semibold leading-[1.15] text-ink md:text-5xl"
          >
            Run your shop like the back-office it should be.
          </motion.h2>
        </motion.div>

        <div className="mt-12">
          <ImageShowcaseCard
            eyebrow="The provider app"
            title="Everything your shop needs, even offline."
            body="Manage orders, measurements, and payouts from one dashboard — syncs automatically the moment you're back online."
            images={SHOWCASE_IMAGES}
          />
        </div>

        <MockupGrid items={CARDS} accent="rgb(99 102 241 / 0.18)" />

        <HowItWorks eyebrow="How it works for shops" steps={PROVIDER_STEPS} />
      </Container>
    </section>
  );
}
