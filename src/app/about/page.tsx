"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Section from "@/components/site/Section";
import Container from "@/components/site/Container";
import StatBand from "@/components/marketing/StatBand";
import TeamCarousel from "@/components/marketing/TeamCarousel";
import Eyebrow from "@/components/site/Eyebrow";
import { cn } from "@/lib/cn";

const PILLARS = [
  {
    title: "Local shops first",
    body: "We put neighbourhood laundry and tailoring businesses at the centre. Every feature is built to make their work easier — not to replace them.",
  },
  {
    title: "Transparent pricing",
    body: "No surge charges, no hidden fees. Customers see the full price before booking, and providers get clear settlements with every payout.",
  },
  {
    title: "Trust by tracking",
    body: "Every garment is tracked from pickup to delivery. Status updates, real-time chat, and payment confirmations — so no order ever gets lost.",
  },
] as const;

const TEAM = [
  { name: "Arjun Shah",    handle: "@arjunshah",    role: "Co-founder & CEO",   city: "Mumbai",    avatar: "/avatars/placeholder.png" },
  { name: "Priya Nair",    handle: "@priyanair",    role: "Head of Design",     city: "Bangalore", avatar: "/avatars/placeholder.png" },
  { name: "Rohit Verma",   handle: "@rohitverma",   role: "Lead Engineer",      city: "Delhi",     avatar: "/avatars/placeholder.png" },
  { name: "Ananya Rao",    handle: "@ananyarao",    role: "Operations",         city: "Chennai",   avatar: "/avatars/placeholder.png" },
  { name: "Vikram Singh",  handle: "@vikramsingh",  role: "Growth",             city: "Mumbai",    avatar: "/avatars/placeholder.png" },
  { name: "Kavita Joseph", handle: "@kavitajoseph", role: "Customer Success",   city: "Bangalore", avatar: "/avatars/placeholder.png" },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* Mission hero */}
      <section className="py-16 md:py-20 lg:py-28" aria-labelledby="about-headline">
        <Container className="flex flex-col items-center text-center">
          <Eyebrow>About Perfect Stitch</Eyebrow>
          <h1
            id="about-headline"
            className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.15] text-ink md:text-5xl"
          >
            We made local laundry shops feel like a back-office team.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-body md:text-lg">
            Perfect Stitch connects customers with trusted local shops through a
            seamless app — no calls, no queues, no lost orders. For shops, we
            provide offline-first tools that turn a counter into a control room.
          </p>
        </Container>
      </section>

      {/* Three pillars */}
      <Container>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PILLARS.map((p) => (
            <article
              key={p.title}
              className={cn(
                "flex flex-col gap-3 rounded-card border border-hairline bg-surface p-8",
              )}
            >
              <h3 className="text-xl font-semibold text-ink">{p.title}</h3>
              <p className="text-sm leading-relaxed text-body">{p.body}</p>
            </article>
          ))}
        </div>
      </Container>

      {/* StatBand */}
      <div className="mt-12 md:mt-16 lg:mt-24">
        <StatBand
          stats={[
            { value: "12+", label: "Cities" },
            { value: "200+", label: "Shops" },
            { value: "50,000+", label: "Orders" },
          ]}
        />
      </div>

      {/* Team carousel */}
      <section className="py-16 md:py-20 lg:py-24" aria-labelledby="team-title">
        <Container className="flex flex-col items-center text-center">
          <Eyebrow>Built by professionals for you.</Eyebrow>
          <h2
            id="team-title"
            className="mt-3 max-w-2xl text-3xl font-semibold leading-[1.15] text-ink md:text-4xl"
          >
            Founded by people who&apos;ve lived the work — for everyone who still
            does.
          </h2>
        </Container>
        <TeamCarousel members={TEAM} />
      </section>

      {/* CTA strip */}
      <section className="border-y border-hairline bg-surface py-16">
        <Container className="flex flex-col items-center text-center">
          <h2 className="max-w-2xl text-3xl font-semibold leading-[1.15] text-ink md:text-4xl">
            Ready to get started?
          </h2>
          <p className="mt-3 text-base text-body">
            Download the app and join thousands of customers and shops.
          </p>
          <Link
            href="/#download"
            className="mt-6 inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft"
          >
            Download the app
            <ArrowRight className="size-4" />
          </Link>
        </Container>
      </section>
    </>
  );
}