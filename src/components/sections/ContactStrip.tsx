"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Handshake, Mail } from "lucide-react";
import Container from "@/components/site/Container";
import { cn } from "@/lib/cn";
import { useMotionReady } from "@/lib/use-motion-ready";
import { fadeUp, stagger, VIEWPORT } from "@/lib/motion";

function SocialIcon({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-4", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <SocialIcon className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </SocialIcon>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <SocialIcon className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v2" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </SocialIcon>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("size-4", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "LinkedIn", href: "https://linkedin.com", icon: LinkedInIcon },
  { label: "X", href: "https://x.com", icon: XIcon },
] as const;

export default function ContactStrip() {
  const { motionEnabled } = useMotionReady();

  return (
    <section
      className="border-t border-hairline bg-surface py-12"
      aria-label="Contact and social"
    >
      <Container>
        <motion.div
          className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8"
          variants={motionEnabled ? stagger(0.1) : undefined}
          initial={motionEnabled ? "initial" : false}
          whileInView={motionEnabled ? "animate" : undefined}
          viewport={VIEWPORT}
        >
          <motion.div variants={motionEnabled ? fadeUp : undefined} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Mail className="size-5 shrink-0 text-body" aria-hidden />
              <h3 className="text-sm font-medium text-ink">Support</h3>
            </div>
            <a
              href="mailto:support@perfectstitch.online"
              className="text-sm text-body transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft"
            >
              support@perfectstitch.online
            </a>
          </motion.div>

          <motion.div variants={motionEnabled ? fadeUp : undefined} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Handshake className="size-5 shrink-0 text-body" aria-hidden />
              <h3 className="text-sm font-medium text-ink">Partner with us</h3>
            </div>
            <a
              href="mailto:partner@perfectstitch.online"
              className="text-sm text-body transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft"
            >
              partner@perfectstitch.online
            </a>
          </motion.div>

          <motion.div variants={motionEnabled ? fadeUp : undefined} className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-ink">Follow</h3>
            <div className="flex flex-wrap gap-2">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-button border border-hairline bg-surface-card text-body transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
