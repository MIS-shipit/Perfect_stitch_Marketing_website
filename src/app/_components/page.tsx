/**
 * Dev-only component preview route — //_components
 * Not linked from nav; remove or gate behind env check before production.
 */
import PhoneMockup from "@/components/marketing/PhoneMockup";
import FeatureRow from "@/components/marketing/FeatureRow";
import QRCard from "@/components/marketing/QRCard";
import StatBand from "@/components/marketing/StatBand";
import TeamCard from "@/components/marketing/TeamCard";
import FAQ from "@/components/marketing/FAQ";
import Section from "@/components/site/Section";

const PLACEHOLDER = "/mockups/_placeholder/placeholder.png";
const AVATAR = "/avatars/placeholder.png";

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

export default function ComponentsPreview() {
  return (
    <div className="flex flex-col gap-0 bg-canvas text-ink">
      {/* PhoneMockup — real path */}
      <Section eyebrow="Component" title="PhoneMockup (tilt variants)">
        <div className="flex flex-wrap items-end justify-center gap-12">
          <PhoneMockup
            src={PLACEHOLDER}
            alt="Customer home placeholder"
            tilt={-8}
            priority
          />
          <PhoneMockup
            src={PLACEHOLDER}
            alt="Provider dashboard placeholder"
            tilt={6}
          />
          <PhoneMockup
            src="/mockups/_placeholder/placeholder.png"
            alt="Placeholder caption demo"
            tilt={0}
          />
        </div>
      </Section>

      {/* FeatureRow — imageSide right */}
      <Section eyebrow="Component" title="FeatureRow (right)">
        <FeatureRow
          eyebrow="For Customers"
          title="Browse + book in seconds"
          body="Pick your service, drop a pin, and confirm. A nearby provider accepts within minutes — no calls, no queues."
          mockup={{ src: PLACEHOLDER, alt: "Customer home" }}
          imageSide="right"
          accentLink={{ label: "See how it works", href: "#" }}
        />
      </Section>

      {/* FeatureRow — imageSide left */}
      <Section eyebrow="Component" title="FeatureRow (left)">
        <FeatureRow
          title="Offline-first dashboard"
          body="The provider app works without internet. All actions queue up and sync the moment you're back online."
          mockup={{ src: PLACEHOLDER, alt: "Provider dashboard" }}
          imageSide="left"
        />
      </Section>

      {/* QRCard */}
      <Section eyebrow="Component" title="QRCard">
        <div className="flex justify-center">
          <QRCard
            playSrc="/qr/play.png"
            appleSrc="/qr/apple.png"
            playUrl="https://play.google.com"
            appleUrl="https://apps.apple.com"
          />
        </div>
      </Section>

      {/* StatBand */}
      <Section eyebrow="Component" title="StatBand">
        <StatBand
          stats={[
            { value: "12+", label: "Cities" },
            { value: "200+", label: "Shops" },
            { value: "50k+", label: "Orders" },
            { value: "3", label: "Languages" },
          ]}
        />
      </Section>

      {/* TeamCard */}
      <Section eyebrow="Component" title="TeamCard">
        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: "Arjun Shah", role: "Co-founder & CEO", city: "Mumbai" },
            { name: "Priya Nair", role: "Head of Design", city: "Bangalore" },
            { name: "Rohit Verma", role: "Lead Engineer", city: "Delhi" },
          ].map((p) => (
            <TeamCard key={p.name} {...p} avatar={AVATAR} />
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="Component" title="FAQ">
        <div className="mx-auto max-w-2xl">
          <FAQ items={FAQ_ITEMS} />
        </div>
      </Section>
    </div>
  );
}
