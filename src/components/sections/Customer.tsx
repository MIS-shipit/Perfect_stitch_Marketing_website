"use client";

import { motion } from "framer-motion";
import { useMotionReady } from "@/lib/use-motion-ready";
import MockupGrid, { type MockupItem } from "@/components/marketing/MockupGrid";
import ImageShowcaseCard, {
  type ShowcaseStep,
} from "@/components/marketing/ImageShowcaseCard";
import Container from "@/components/site/Container";
import Eyebrow from "@/components/site/Eyebrow";
import HowItWorks from "@/components/sections/HowItWorks";
import { revealUp, stagger, VIEWPORT } from "@/lib/motion";
import { CUSTOMER_MOCKUP_TONES } from "@/lib/card-tones";

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

type CustomerProps = {
  showcaseSteps: ShowcaseStep[];
  cards: MockupItem[];
};

export default function Customer({ showcaseSteps, cards }: CustomerProps) {
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

        <div className="mt-12 mb-4 md:mb-6">
          <ImageShowcaseCard
            eyebrow="The customer app"
            marketingTitle="One app for every step of your laundry & tailoring journey."
            marketingBody="From booking pickup to tracking delivery and paying securely — Perfect Stitch keeps your wardrobe under your fingertips."
            steps={showcaseSteps}
          />
        </div>

        <MockupGrid items={cards} tones={CUSTOMER_MOCKUP_TONES} />

        <HowItWorks
          eyebrow="How it works for customers"
          steps={CUSTOMER_STEPS}
          variant="customer"
        />
      </Container>
    </section>
  );
}
