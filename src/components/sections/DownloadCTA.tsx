"use client";

import { motion } from "framer-motion";
import QRCard from "@/components/marketing/QRCard";
import Eyebrow from "@/components/site/Eyebrow";
import Container from "@/components/site/Container";
import { useMotionReady } from "@/lib/use-motion-ready";
import { fadeUp, revealUp, stagger, VIEWPORT } from "@/lib/motion";

const PLAY_URL =
  process.env.NEXT_PUBLIC_PLAY_URL ?? "https://play.google.com/store/apps";
const APPLE_URL =
  process.env.NEXT_PUBLIC_APPLE_URL ?? "https://apps.apple.com";

export default function DownloadCTA() {
  const { motionEnabled } = useMotionReady();

  return (
    <section
      id="download-qr"
      className="py-12 md:py-16 lg:py-24"
      aria-labelledby="download-headline"
    >
      <Container className="flex flex-col items-center text-center">
        <motion.div
          variants={motionEnabled ? stagger(0.12) : undefined}
          initial={motionEnabled ? "initial" : false}
          whileInView={motionEnabled ? "animate" : undefined}
          viewport={VIEWPORT}
          className="flex flex-col items-center"
        >
          <motion.div variants={motionEnabled ? revealUp : undefined}>
            <Eyebrow className="text-primary">Download Perfect Stitch</Eyebrow>
          </motion.div>
          <motion.h2
            id="download-headline"
            variants={motionEnabled ? revealUp : undefined}
            className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.15] text-ink md:text-5xl"
          >
            Two stores. One app. Pick yours.
          </motion.h2>
        </motion.div>

        <motion.div
          className="mt-12 w-full max-w-md"
          variants={motionEnabled ? fadeUp : undefined}
          initial={motionEnabled ? "initial" : false}
          whileInView={motionEnabled ? "animate" : undefined}
          viewport={VIEWPORT}
          transition={{ delay: 0.2 }}
        >
          <QRCard
            playSrc="/qr/play.png"
            appleSrc="/qr/apple.png"
            playUrl={PLAY_URL}
            appleUrl={APPLE_URL}
          />
        </motion.div>
      </Container>
    </section>
  );
}
