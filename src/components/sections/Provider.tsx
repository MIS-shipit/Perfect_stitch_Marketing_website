"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMotionReady } from "@/lib/use-motion-ready";
import MockupGrid, { type MockupItem } from "@/components/marketing/MockupGrid";
import ImageShowcaseCard from "@/components/marketing/ImageShowcaseCard";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import HowItWorks from "@/components/sections/HowItWorks";

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
  const { animate } = useMotionReady();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 0.35"],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  return (
    <section ref={sectionRef} id="provider" className="py-12 md:py-16 lg:py-24">
      <Container>
        <motion.div style={animate ? { y: headerY, opacity: headerOpacity } : undefined}>
          <Eyebrow>For Shops</Eyebrow>
          <h2 className="mt-4 text-4xl font-semibold leading-[1.15] text-ink md:text-5xl">
            Run your shop like the back-office it should be.
          </h2>
        </motion.div>

        {/* Staggered 2-col mockup grid */}
        <MockupGrid items={CARDS} accent="rgb(99 102 241 / 0.18)" />

        <HowItWorks eyebrow="How it works for shops" steps={PROVIDER_STEPS} />
      </Container>
    </section>
  );
}
