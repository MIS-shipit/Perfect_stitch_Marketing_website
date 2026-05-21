"use client";

import { Mail, Handshake, MapPin, Clock } from "lucide-react";
import Container from "@/components/site/Container";
import ContactForm from "@/components/marketing/ContactForm";
import FAQ from "@/components/marketing/FAQ";
import Section from "@/components/site/Section";
import Eyebrow from "@/components/site/Eyebrow";

const FAQ_ITEMS = [
  {
    question: "How do I book a pickup?",
    answer:
      "Open the Perfect Stitch app, choose your service, drop a pin for pickup, and confirm. A provider nearby will accept within minutes.",
  },
  {
    question: "Is my payment secure?",
    answer:
      "All payments are processed by Razorpay. Your card details are never stored on our servers.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We're live in 12+ cities across India including Mumbai, Bangalore, Chennai, and Delhi.",
  },
  {
    question: "How does a shop sign up as a provider?",
    answer:
      "Download the Provider app, register your shop, and our team will verify and onboard you within 24 hours.",
  },
  {
    question: "What happens if my order is delayed?",
    answer:
      "You'll receive real-time notifications. Contact the shop directly via in-app chat or reach us at support@perfectstitch.online.",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="py-16 md:py-20 lg:py-28" aria-labelledby="contact-headline">
        <Container className="flex flex-col items-center text-center">
          <Eyebrow>Get in touch</Eyebrow>
          <h1
            id="contact-headline"
            className="mt-4 max-w-2xl text-4xl font-semibold leading-[1.15] text-ink md:text-5xl"
          >
            We'd love to hear from you.
          </h1>
          <p className="mt-4 max-w-xl text-base text-body md:text-lg">
            Have a question, feedback, or want to partner with us? Reach out.
          </p>
        </Container>
      </section>

      {/* 2-col: info + form */}
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Contact info */}
          <div className="flex flex-col gap-8 rounded-card border border-hairline/40 bg-surface/40 p-8 md:p-10">
            <ContactInfoRow
              icon={Mail}
              label="Support"
              detail="support@perfectstitch.online"
              href="mailto:support@perfectstitch.online"
            />
            <ContactInfoRow
              icon={Handshake}
              label="Partnerships"
              detail="partner@perfectstitch.online"
              href="mailto:partner@perfectstitch.online"
            />
            <ContactInfoRow
              icon={MapPin}
              label="Office"
              detail="Pondicherry (Puducherry), India"
            />
            <ContactInfoRow
              icon={Clock}
              label="Hours"
              detail="Mon–Sat, 9:00 AM – 6:00 PM IST"
            />
          </div>

          {/* Right — ContactForm */}
          <div className="rounded-card border border-hairline/40 bg-primary/[0.04] p-8 md:p-10">
            <h2 className="mb-6 text-xl font-semibold text-ink">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </Container>

      {/* Map embed */}
      <Container className="mt-12 md:mt-16 lg:mt-24">
        <div className="h-80 w-full overflow-hidden rounded-frame border border-hairline bg-surface-elevated">
          <iframe
            title="Perfect Stitch location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124053.5!2d79.8083!3d11.9339!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a536cdaba20ca3b%3A0x5133f6d58e5c487b!2sPondicherry%2C%20India!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "invert(0.9) hue-rotate(180deg) saturate(0.4)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Container>

      {/* FAQ */}
      <Section>
        <div className="mx-auto max-w-2xl">
          <FAQ items={FAQ_ITEMS} />
        </div>
      </Section>
    </>
  );
}

function ContactInfoRow({
  icon: Icon,
  label,
  detail,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  detail: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-5 shrink-0 text-body" aria-hidden />
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        {href ? (
          <a
            href={href}
            className="text-sm text-body transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-soft"
          >
            {detail}
          </a>
        ) : (
          <p className="text-sm text-body">{detail}</p>
        )}
      </div>
    </div>
  );
}