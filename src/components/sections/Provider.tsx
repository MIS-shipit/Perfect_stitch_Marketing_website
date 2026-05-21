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
import { PROVIDER_MOCKUP_TONES } from "@/lib/card-tones";

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

type ProviderProps = {
  showcaseSteps: ShowcaseStep[];
  cards: MockupItem[];
};

export default function Provider({ showcaseSteps, cards }: ProviderProps) {
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

        <div className="mt-12 mb-4 md:mb-6">
          <ImageShowcaseCard
            eyebrow="The provider app"
            marketingTitle="Everything your shop needs, even offline."
            marketingBody="Manage orders, measurements, and payouts from one dashboard — syncs automatically the moment you're back online."
            steps={showcaseSteps}
          />
        </div>

        <MockupGrid items={cards} tones={PROVIDER_MOCKUP_TONES} />

        <HowItWorks
          eyebrow="How it works for shops"
          steps={PROVIDER_STEPS}
          variant="provider"
        />
      </Container>
    </section>
  );
}
