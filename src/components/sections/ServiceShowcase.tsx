"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMotionReady } from "@/lib/use-motion-ready";
import {
  ChevronLeft,
  ChevronRight,
  Shirt,
  MapPin,
  Clock,
  CreditCard,
  MessageSquare,
  Bell,
  Languages,
  Repeat,
  WifiOff,
  Ruler,
  PackageOpen,
  Banknote,
  Scissors,
  Check,
  RefreshCw,
  Wifi,
} from "lucide-react";
import Eyebrow from "@/components/site/Eyebrow";
import { cn } from "@/lib/cn";
import { EASE } from "@/lib/motion";

type Category = "customer" | "provider" | "payment";
type Texture = "circles" | "dots" | "lines" | "crosses" | "diagonal" | "grid";

interface Tile {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  category: Category;
  texture: Texture;
  palette: {
    bg: string;
    iconBg: string;
    iconText: string;
    glow: string;
    arcColor: string;
  };
  visual: React.ReactNode;
}

function TextureLayer({
  texture,
  color,
  uid,
}: {
  texture: Texture;
  color: string;
  uid: string;
}) {
  const pid = `tp-${uid}`;
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.09]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {texture === "circles" && (
          <pattern id={pid} width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="18" cy="18" r="8" stroke={color} strokeWidth="0.9" fill="none" />
          </pattern>
        )}
        {texture === "dots" && (
          <pattern id={pid} width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="12" cy="12" r="1.4" fill={color} />
          </pattern>
        )}
        {texture === "lines" && (
          <pattern id={pid} width="32" height="32" patternUnits="userSpaceOnUse">
            <line x1="0" y1="16" x2="32" y2="16" stroke={color} strokeWidth="0.8" />
          </pattern>
        )}
        {texture === "crosses" && (
          <pattern id={pid} width="32" height="32" patternUnits="userSpaceOnUse">
            <line x1="16" y1="9" x2="16" y2="23" stroke={color} strokeWidth="0.9" />
            <line x1="9" y1="16" x2="23" y2="16" stroke={color} strokeWidth="0.9" />
          </pattern>
        )}
        {texture === "diagonal" && (
          <pattern id={pid} width="28" height="28" patternUnits="userSpaceOnUse">
            <line x1="0" y1="28" x2="28" y2="0" stroke={color} strokeWidth="0.8" />
            <line x1="-14" y1="28" x2="14" y2="0" stroke={color} strokeWidth="0.8" />
            <line x1="14" y1="28" x2="42" y2="0" stroke={color} strokeWidth="0.8" />
          </pattern>
        )}
        {texture === "grid" && (
          <pattern id={pid} width="32" height="32" patternUnits="userSpaceOnUse">
            <line x1="0" y1="16" x2="32" y2="16" stroke={color} strokeWidth="0.6" />
            <line x1="16" y1="0" x2="16" y2="32" stroke={color} strokeWidth="0.6" />
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}

// ── Feature-specific visual illustrations ───────────────────────────────────

const BrowseVisual = (
  <div className="space-y-2">
    {(
      [
        { Icon: Shirt, name: "Dry Clean", price: "₹120" },
        { Icon: Scissors, name: "Tailoring", price: "₹250" },
        { Icon: PackageOpen, name: "Laundry", price: "₹80" },
      ] as { Icon: React.ComponentType<{ className?: string }>; name: string; price: string }[]
    ).map(({ Icon, name, price }) => (
      <div
        key={name}
        className="flex items-center justify-between rounded-xl bg-white/[0.07] px-3.5 py-2.5"
      >
        <span className="flex items-center gap-2.5">
          <Icon className="size-4 text-blue-300/70" />
          <span className="text-sm text-white/75">{name}</span>
        </span>
        <span className="text-xs font-medium text-blue-300/80">{price}</span>
      </div>
    ))}
    <div className="mt-1 flex items-center gap-2 pl-1">
      <MapPin className="size-3.5 text-blue-300/60" />
      <span className="text-xs text-white/40">Andheri West, Mumbai</span>
    </div>
  </div>
);

const TrackingVisual = (
  <div className="space-y-3.5">
    {(
      [
        { step: "Pickup Scheduled", done: true, active: false },
        { step: "In Transit", done: true, active: true },
        { step: "At Workshop", done: false, active: false },
        { step: "Ready for Delivery", done: false, active: false },
      ] as { step: string; done: boolean; active: boolean }[]
    ).map(({ step, done, active }) => (
      <div key={step} className="flex items-center gap-3">
        <div className="relative flex size-5 shrink-0 items-center justify-center">
          {active && (
            <span className="absolute size-5 animate-[pulse-ring-expand_2s_ease-out_infinite] rounded-full bg-fuchsia-500/40" />
          )}
          <span
            className={cn(
              "size-2.5 rounded-full",
              done ? "bg-fuchsia-400" : "border border-white/20",
            )}
          />
        </div>
        <span className={cn("text-sm", done ? "text-white/80" : "text-white/30")}>
          {step}
        </span>
        {done && !active && (
          <Check className="ml-auto size-3.5 shrink-0 text-fuchsia-400/70" />
        )}
      </div>
    ))}
  </div>
);

const ChatVisual = (
  <div className="space-y-3">
    <div className="mr-8 rounded-2xl rounded-tl-sm bg-white/[0.08] px-4 py-3">
      <p className="text-sm text-white/75">When will my clothes be ready? 🧺</p>
      <p className="mt-1 text-[11px] text-white/30">You · 2:30 PM</p>
    </div>
    <div className="ml-8 rounded-2xl rounded-tr-sm bg-emerald-500/[0.18] px-4 py-3">
      <p className="text-sm text-white/80">Ready by 6 PM today! Will send a notification 🎉</p>
      <p className="mt-1 text-[11px] text-white/30">Provider · 2:32 PM</p>
    </div>
    <div className="flex items-center gap-1.5 pl-1">
      <span
        className="size-1.5 animate-[typing-dot_1.2s_ease-in-out_infinite] rounded-full bg-emerald-400/60"
        style={{ animationDelay: "0ms" }}
      />
      <span
        className="size-1.5 animate-[typing-dot_1.2s_ease-in-out_infinite] rounded-full bg-emerald-400/60"
        style={{ animationDelay: "200ms" }}
      />
      <span
        className="size-1.5 animate-[typing-dot_1.2s_ease-in-out_infinite] rounded-full bg-emerald-400/60"
        style={{ animationDelay: "400ms" }}
      />
      <span className="ml-2 text-xs text-white/25">Provider is typing…</span>
    </div>
  </div>
);

const LanguageVisual = (
  <div>
    <div className="space-y-1.5">
      <p className="text-3xl font-bold text-white/80">Laundry</p>
      <p className="text-2xl text-white/50">धुलाई</p>
      <p className="text-xl text-white/30">சலவை</p>
    </div>
    <div className="mt-4 flex flex-wrap gap-2">
      {["EN", "HI", "TA"].map((lang) => (
        <span
          key={lang}
          className="inline-flex h-6 items-center rounded-full border border-amber-400/25 bg-amber-500/10 px-2.5 text-[11px] font-medium text-amber-300/80"
        >
          {lang}
        </span>
      ))}
    </div>
  </div>
);

const RecurringVisual = (
  <div>
    <div className="grid grid-cols-7 gap-1 text-center">
      {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
        <div key={i} className="text-[11px] text-white/30">
          {d}
        </div>
      ))}
      {[false, false, true, false, true, false, true].map((active, i) => (
        <div
          key={i}
          className={cn(
            "mx-auto flex size-6 items-center justify-center rounded-full text-xs",
            active ? "bg-cyan-500/25 text-cyan-300" : "text-white/20",
          )}
        >
          {active ? <RefreshCw className="size-3" /> : "·"}
        </div>
      ))}
    </div>
    <p className="mt-3 text-xs text-white/40">Repeats every Wed, Fri, Sun</p>
    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 py-1.5">
      <Repeat className="size-3.5 text-cyan-400/70" />
      <span className="text-xs text-white/50">Active subscription</span>
    </div>
  </div>
);

const NotificationVisual = (
  <div className="space-y-2.5">
    {[
      {
        title: "Order Confirmed",
        msg: "Your pickup is scheduled for 4 PM",
        time: "Just now",
        delay: "0s",
      },
      {
        title: "Status Update",
        msg: "Your clothes are at the workshop",
        time: "5 min ago",
        delay: "1.8s",
      },
    ].map(({ title, msg, time, delay }) => (
      <div
        key={title}
        className="flex items-start gap-3 rounded-2xl bg-white/[0.07] px-3.5 py-3"
        style={{ animation: `float-y 4s ease-in-out ${delay} infinite` }}
      >
        <Bell className="mt-0.5 size-4 shrink-0 text-rose-400/80" />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-white/80">{title}</p>
          <p className="truncate text-[11px] text-white/40">{msg}</p>
        </div>
        <span className="shrink-0 text-[10px] text-white/25">{time}</span>
      </div>
    ))}
  </div>
);

const OfflineVisual = (
  <div className="space-y-3">
    <div className="flex items-center gap-3 rounded-xl bg-white/[0.06] px-3.5 py-3">
      <WifiOff className="size-5 text-indigo-300/70" />
      <div>
        <p className="text-sm text-white/70">Offline mode active</p>
        <p className="text-xs text-white/35">4 orders queued locally</p>
      </div>
    </div>
    <div className="space-y-1.5 pl-1">
      {["Photos cached (24 MB)", "Measurements saved", "Will sync on reconnect"].map((item) => (
        <div key={item} className="flex items-center gap-2 text-xs text-white/45">
          <span className="size-1.5 shrink-0 rounded-full bg-indigo-400/60" />
          {item}
        </div>
      ))}
    </div>
    <div className="flex items-center gap-2 rounded-xl bg-indigo-500/10 px-3 py-2.5">
      <Wifi className="size-4 text-indigo-300/60" />
      <span className="text-xs text-white/50">Back online · Syncing…</span>
      <div className="relative ml-auto h-1 w-14 overflow-hidden rounded-full bg-white/10">
        <div className="absolute inset-y-0 left-0 w-1/3 animate-[progress-scan_1.5s_linear_infinite] rounded-full bg-indigo-400/70" />
      </div>
    </div>
  </div>
);

const MeasurementsVisual = (
  <div className="space-y-2">
    {[
      { Icon: Ruler, label: "Shoulder", value: "42 cm" },
      { Icon: Scissors, label: "Chest", value: "38 cm" },
      { Icon: Ruler, label: "Length", value: "28 in" },
      { Icon: Scissors, label: "Sleeve", value: "24 cm" },
    ].map(({ Icon, label, value }) => (
      <div
        key={label}
        className="flex items-center justify-between rounded-lg bg-white/[0.06] px-3 py-2.5"
      >
        <span className="flex items-center gap-2">
          <Icon className="size-3.5 text-green-300/60" />
          <span className="text-xs text-white/60">{label}</span>
        </span>
        <span className="font-mono text-xs font-semibold text-green-300/80">{value}</span>
      </div>
    ))}
  </div>
);

const PipelineVisual = (
  <div className="space-y-2">
    {[
      { status: "Received", count: 2, color: "bg-amber-400" },
      { status: "In Progress", count: 5, color: "bg-yellow-300" },
      { status: "Ready", count: 1, color: "bg-green-400" },
      { status: "Delivered", count: 12, color: "bg-white/30" },
    ].map(({ status, count, color }) => (
      <div
        key={status}
        className="flex items-center gap-3 rounded-lg bg-white/[0.05] px-3.5 py-2.5"
      >
        <span className={cn("size-2 shrink-0 rounded-full", color)} />
        <span className="flex-1 text-xs text-white/65">{status}</span>
        <span className="text-xs font-semibold text-white/45">{count}</span>
      </div>
    ))}
  </div>
);

const PickupVisual = (
  <div className="space-y-3">
    <div className="flex items-center gap-3 rounded-xl bg-white/[0.07] px-3.5 py-3">
      <PackageOpen className="size-5 text-purple-300/70" />
      <div>
        <p className="text-sm font-medium text-white/80">3 pickups today</p>
        <p className="text-xs text-white/35">Next at 4:30 PM</p>
      </div>
      <span className="ml-auto rounded-full bg-purple-500/20 px-2.5 py-0.5 text-xs text-purple-300">
        Active
      </span>
    </div>
    <div className="space-y-1.5">
      {[
        { from: "Andheri West", distance: "1.2 km" },
        { from: "Bandra", distance: "2.8 km" },
      ].map(({ from, distance }) => (
        <div key={from} className="flex items-center gap-2 pl-1 text-xs text-white/40">
          <MapPin className="size-3.5 shrink-0 text-purple-300/50" />
          <span>{from}</span>
          <span className="ml-auto text-white/25">{distance}</span>
        </div>
      ))}
    </div>
  </div>
);

const PaymentsVisual = (
  <div className="space-y-3">
    <div className="rounded-2xl bg-white/[0.07] p-4">
      <div className="flex items-center justify-between">
        <CreditCard className="size-6 text-teal-300/60" />
        <span className="text-xs text-white/35">•••• 4242</span>
      </div>
      <div className="mt-3 text-2xl font-bold text-white/85">₹ 850.00</div>
      <div className="mt-2 flex items-center gap-1.5">
        <Check className="size-4 text-teal-400" />
        <span className="text-sm text-teal-300/80">Payment Confirmed</span>
      </div>
    </div>
    <p className="text-center text-xs text-white/25">Secured by Razorpay</p>
  </div>
);

const PayoutsVisual = (
  <div>
    <div className="flex items-end gap-1.5 px-1 pb-1">
      {[
        { day: "M", h: 50 },
        { day: "T", h: 38 },
        { day: "W", h: 72 },
        { day: "T", h: 60 },
        { day: "F", h: 82 },
      ].map(({ day, h }) => (
        <div key={day} className="flex flex-1 flex-col items-center gap-1">
          <div
            className="w-full rounded-t-sm bg-emerald-500/35"
            style={{ height: `${h}px` }}
          />
          <span className="text-[10px] text-white/30">{day}</span>
        </div>
      ))}
    </div>
    <div className="mt-3 rounded-xl bg-emerald-500/10 px-3 py-2 text-center">
      <span className="text-sm font-semibold text-emerald-300/80">₹ 10,200</span>
      <span className="ml-2 text-xs text-white/35">this week</span>
    </div>
  </div>
);

// ── Tile data ────────────────────────────────────────────────────────────────

const TILES: Tile[] = [
  {
    title: "Browse & Book",
    description:
      "Pick laundry or tailoring, drop a pin, and schedule pickup in under a minute. A nearby provider confirms — no calls, no queues.",
    icon: Shirt,
    category: "customer",
    texture: "circles",
    palette: {
      bg: "from-[#061828] via-[#0a2038] to-[#06090f]",
      iconBg: "bg-blue-500/15",
      iconText: "text-blue-300",
      glow: "59 130 246",
      arcColor: "#3b82f6",
    },
    visual: BrowseVisual,
  },
  {
    title: "Live Order Tracking",
    description:
      "Follow every garment from pickup to delivery on a live timeline with status badges, map updates, and real-time provider chat.",
    icon: Clock,
    category: "customer",
    texture: "diagonal",
    palette: {
      bg: "from-[#18062a] via-[#2a0d40] to-[#06090f]",
      iconBg: "bg-fuchsia-500/15",
      iconText: "text-fuchsia-300",
      glow: "217 70 239",
      arcColor: "#d946ef",
    },
    visual: TrackingVisual,
  },
  {
    title: "In-App Chat",
    description:
      "Message your provider directly for updates, special tailoring instructions, or pickup rescheduling — without leaving the app.",
    icon: MessageSquare,
    category: "customer",
    texture: "grid",
    palette: {
      bg: "from-[#041a14] via-[#062d22] to-[#06090f]",
      iconBg: "bg-emerald-500/15",
      iconText: "text-emerald-300",
      glow: "16 185 129",
      arcColor: "#10b981",
    },
    visual: ChatVisual,
  },
  {
    title: "Multi-Language",
    description:
      "Full support for English, Hindi, and Tamil. Switch languages at any time directly from your profile screen.",
    icon: Languages,
    category: "customer",
    texture: "crosses",
    palette: {
      bg: "from-[#1a1206] via-[#2d200a] to-[#06090f]",
      iconBg: "bg-amber-500/15",
      iconText: "text-amber-300",
      glow: "245 158 11",
      arcColor: "#f59e0b",
    },
    visual: LanguageVisual,
  },
  {
    title: "Recurring Orders",
    description:
      "Set up weekly subscriptions so your regulars never have to re-book. Manage all schedules from a single screen.",
    icon: Repeat,
    category: "customer",
    texture: "lines",
    palette: {
      bg: "from-[#041520] via-[#062030] to-[#06090f]",
      iconBg: "bg-cyan-500/15",
      iconText: "text-cyan-300",
      glow: "6 182 212",
      arcColor: "#06b6d4",
    },
    visual: RecurringVisual,
  },
  {
    title: "Push Notifications",
    description:
      "Instant alerts for order confirmations, status changes, payment receipts, and direct messages from your provider.",
    icon: Bell,
    category: "customer",
    texture: "dots",
    palette: {
      bg: "from-[#1a0612] via-[#2d0a1e] to-[#06090f]",
      iconBg: "bg-rose-500/15",
      iconText: "text-rose-300",
      glow: "244 63 94",
      arcColor: "#f43f5e",
    },
    visual: NotificationVisual,
  },
  {
    title: "Offline Dashboard",
    description:
      "The provider app works fully without an internet connection. Every action queues locally and syncs the moment you're back online.",
    icon: WifiOff,
    category: "provider",
    texture: "grid",
    palette: {
      bg: "from-[#08082a] via-[#0c0f3c] to-[#06090f]",
      iconBg: "bg-indigo-500/15",
      iconText: "text-indigo-300",
      glow: "99 102 241",
      arcColor: "#6366f1",
    },
    visual: OfflineVisual,
  },
  {
    title: "Measurements & Intake",
    description:
      "Capture precise tailoring measurements and log laundry items at intake. Structured data keeps every order accurate from the start.",
    icon: Ruler,
    category: "provider",
    texture: "circles",
    palette: {
      bg: "from-[#041a0a] via-[#062d12] to-[#06090f]",
      iconBg: "bg-green-500/15",
      iconText: "text-green-300",
      glow: "34 197 94",
      arcColor: "#22c55e",
    },
    visual: MeasurementsVisual,
  },
  {
    title: "Order Pipeline",
    description:
      "Move orders through your pipeline with one tap. Status badges update customers in real time — no phone calls needed.",
    icon: PackageOpen,
    category: "provider",
    texture: "diagonal",
    palette: {
      bg: "from-[#1a1008] via-[#2d1c0a] to-[#06090f]",
      iconBg: "bg-yellow-500/15",
      iconText: "text-yellow-300",
      glow: "234 179 8",
      arcColor: "#eab308",
    },
    visual: PipelineVisual,
  },
  {
    title: "Pickup Management",
    description:
      "Optimise your pickup routes and schedule shop capacity throughout the day. Handle surges with a clear visual queue.",
    icon: MapPin,
    category: "provider",
    texture: "crosses",
    palette: {
      bg: "from-[#14082a] via-[#1e0d40] to-[#06090f]",
      iconBg: "bg-purple-500/15",
      iconText: "text-purple-300",
      glow: "168 85 247",
      arcColor: "#a855f7",
    },
    visual: PickupVisual,
  },
  {
    title: "Secure Payments",
    description:
      "Razorpay-backed checkout. Customers pay only when their order is ready — full invoice transparency and no card data on our servers.",
    icon: CreditCard,
    category: "payment",
    texture: "lines",
    palette: {
      bg: "from-[#041818] via-[#062424] to-[#06090f]",
      iconBg: "bg-teal-500/15",
      iconText: "text-teal-300",
      glow: "20 184 166",
      arcColor: "#14b8a6",
    },
    visual: PaymentsVisual,
  },
  {
    title: "Payouts & Earnings",
    description:
      "Track daily settlements, view payout history, and receive Razorpay transfers directly to your registered bank account.",
    icon: Banknote,
    category: "payment",
    texture: "dots",
    palette: {
      bg: "from-[#041a0c] via-[#062d16] to-[#06090f]",
      iconBg: "bg-emerald-500/15",
      iconText: "text-emerald-300",
      glow: "16 185 129",
      arcColor: "#10b981",
    },
    visual: PayoutsVisual,
  },
];

const TABS: { label: string; value: Category }[] = [
  { label: "Customer", value: "customer" },
  { label: "Provider", value: "provider" },
  { label: "Payment", value: "payment" },
];

const CARD_VARIANTS = {
  enter: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? 80 : -80,
    scale: 0.96,
    filter: "blur(6px)",
  }),
  center: { opacity: 1, x: 0, scale: 1, filter: "blur(0px)" },
  exit: (dir: number) => ({
    opacity: 0,
    x: dir > 0 ? -80 : 80,
    scale: 0.96,
    filter: "blur(6px)",
  }),
};

export default function ServiceShowcase() {
  const [activeTab, setActiveTab] = useState<Category>("customer");
  const [cardIdx, setCardIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const { animate } = useMotionReady();

  const tiles = TILES.filter((t) => t.category === activeTab);
  const total = tiles.length;
  const current = tiles[cardIdx] ?? tiles[0];
  const prevCard = cardIdx > 0 ? tiles[cardIdx - 1] : null;
  const nextCard = cardIdx < total - 1 ? tiles[cardIdx + 1] : null;

  const switchTab = (tab: Category) => {
    setActiveTab(tab);
    setCardIdx(0);
    setDirection(1);
  };

  const go = (delta: number) => {
    setDirection(delta);
    setCardIdx((prev) => Math.max(0, Math.min(total - 1, prev + delta)));
  };

  const Icon = current.icon;
  const { bg, iconBg, iconText, glow, arcColor } = current.palette;

  return (
    <section id="services" className="overflow-hidden py-16 md:py-20 lg:py-28">
      {/* Header */}
      <div className="mx-auto max-w-[1240px] px-6 md:px-8 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-md">
            <Eyebrow>What we offer</Eyebrow>
            <h2 className="mt-3 text-3xl font-semibold leading-[1.15] text-ink md:text-4xl">
              There&rsquo;s a feature for that.
            </h2>
            <p className="mt-3 text-sm text-mute md:text-base">
              Use the right tools for the right job — for customers, shops, and every
              transaction in between.
            </p>
          </div>

          {/* Tab nav */}
          <div
            role="tablist"
            aria-label="Service categories"
            className="relative inline-flex shrink-0 items-center gap-1 rounded-full border border-hairline bg-surface-elevated/60 p-1 backdrop-blur-md"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => switchTab(tab.value)}
                  className={cn(
                    "relative inline-flex h-8 items-center justify-center rounded-full px-4 text-sm font-medium transition-colors",
                    isActive ? "text-ink" : "text-mute hover:text-body",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="service-tab-pill"
                      className="absolute inset-0 rounded-full bg-surface-card ring-1 ring-hairline-strong"
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Carousel — full-bleed with wide screen-edge fades */}
      <div className="relative mt-10">
        <div className="flex items-stretch justify-center gap-4 md:gap-5">

          {/* Left peek — no per-card mask; screen-edge overlay handles the fade */}
          <div
            className={cn(
              "hidden shrink-0 cursor-pointer overflow-hidden rounded-2xl transition-opacity duration-300 md:block md:w-[180px] lg:w-[240px]",
              prevCard ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            onClick={() => prevCard && go(-1)}
            role="button"
            aria-label="Previous feature"
            style={{ minHeight: 650 }}
          >
            {prevCard && (
              <div className={cn("relative h-full w-full bg-gradient-to-b", prevCard.palette.bg)}>
                <TextureLayer
                  texture={prevCard.texture}
                  color={prevCard.palette.arcColor}
                  uid={`prev-${cardIdx}`}
                />
                {/* Subtle glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 50% 30%, rgba(${prevCard.palette.glow}/0.18), transparent 60%)`,
                  }}
                />
              </div>
            )}
          </div>

          {/* Main card */}
          <div className="relative w-full max-w-[460px] shrink-0 overflow-hidden rounded-2xl">
            <AnimatePresence custom={direction} mode="wait">
              <motion.article
                key={`${activeTab}-${cardIdx}`}
                custom={direction}
                variants={animate ? CARD_VARIANTS : undefined}
                initial={animate ? "enter" : false}
                animate="center"
                exit={animate ? "exit" : undefined}
                transition={{ duration: 0.42, ease: EASE }}
                className={cn(
                  "relative flex min-h-[650px] flex-col overflow-hidden bg-gradient-to-b p-7 md:p-9",
                  bg,
                )}
                style={{
                  border: `1px solid rgba(${glow}, 0.30)`,
                  boxShadow: `0 0 30px rgba(${glow}, 0.10), inset 0 0 20px rgba(${glow}, 0.04)`,
                }}
              >
                {/* Texture */}
                <TextureLayer
                  texture={current.texture}
                  color={arcColor}
                  uid={`main-${activeTab}-${cardIdx}`}
                />

                {/* Radial glows */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 30% 0%, rgba(${glow}/0.22), transparent 55%)`,
                  }}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
                  style={{
                    background: `radial-gradient(ellipse at 50% 110%, rgba(${glow}/0.28), transparent 60%)`,
                  }}
                />

                {/* Icon + title */}
                <div className="relative z-10 flex items-start gap-4">
                  <div
                    className={cn(
                      "flex size-12 shrink-0 items-center justify-center rounded-xl",
                      iconBg,
                    )}
                  >
                    <Icon className={cn("size-6", iconText)} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{current.title}</h3>
                    <p className="mt-1 text-sm text-white/50">
                      {current.category.charAt(0).toUpperCase() + current.category.slice(1)}{" "}
                      · Feature
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="relative z-10 mt-6 max-w-sm text-base leading-relaxed text-white/75">
                  {current.description}
                </p>

                {/* Feature visual illustration */}
                <div className="relative z-10 mt-auto pt-8">{current.visual}</div>

                {/* Decorative concentric arcs */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center"
                >
                  <svg
                    width="460"
                    height="180"
                    viewBox="0 0 460 180"
                    fill="none"
                    className="w-full opacity-25"
                  >
                    <path
                      d="M0 165 A230 150 0 0 1 460 165"
                      stroke={arcColor}
                      strokeWidth="0.8"
                    />
                    <path
                      d="M50 170 A180 115 0 0 1 410 170"
                      stroke={arcColor}
                      strokeWidth="0.8"
                    />
                    <path
                      d="M110 175 A120 80 0 0 1 350 175"
                      stroke={arcColor}
                      strokeWidth="0.8"
                    />
                  </svg>
                </div>

                {/* Bottom: counter + nav */}
                <div className="relative z-10 mt-8 flex items-center justify-between">
                  <span className="text-sm text-white/30">
                    {cardIdx + 1} / {total}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      disabled={cardIdx === 0}
                      aria-label="Previous"
                      className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 transition-colors hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      disabled={cardIdx === total - 1}
                      aria-label="Next"
                      className="inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/70 transition-colors hover:border-white/30 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Right peek — no per-card mask */}
          <div
            className={cn(
              "hidden shrink-0 cursor-pointer overflow-hidden rounded-2xl transition-opacity duration-300 md:block md:w-[180px] lg:w-[240px]",
              nextCard ? "opacity-100" : "pointer-events-none opacity-0",
            )}
            onClick={() => nextCard && go(1)}
            role="button"
            aria-label="Next feature"
            style={{ minHeight: 650 }}
          >
            {nextCard && (
              <div className={cn("relative h-full w-full bg-gradient-to-b", nextCard.palette.bg)}>
                <TextureLayer
                  texture={nextCard.texture}
                  color={nextCard.palette.arcColor}
                  uid={`next-${cardIdx}`}
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 50% 30%, rgba(${nextCard.palette.glow}/0.18), transparent 60%)`,
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Screen-edge blur — single right-side fade for carousel continuation */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-[120px] bg-gradient-to-l from-canvas to-transparent"
        />
      </div>

      {/* Dot indicators */}
      <div className="mt-6 flex items-center justify-center gap-1.5">
        {tiles.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              setDirection(i > cardIdx ? 1 : -1);
              setCardIdx(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            className={cn(
              "h-1 rounded-full transition-all",
              i === cardIdx ? "w-5 bg-primary" : "w-1.5 bg-hairline-strong hover:bg-mute",
            )}
          />
        ))}
      </div>
    </section>
  );
}
