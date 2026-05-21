/** Subtle per-card accents — stays within brand palette */

export const CUSTOMER_MOCKUP_TONES = [
  {
    glow: "rgb(20 184 184 / 0.24)",
    border: "border-primary/20",
    tag: "border-primary/30 bg-primary/12 text-primary",
    screen: "from-primary/15 via-surface-elevated to-surface",
  },
  {
    glow: "rgb(20 184 184 / 0.16)",
    border: "border-primary/15",
    tag: "border-primary/25 bg-primary/8 text-primary",
    screen: "from-teal-950/40 via-surface-elevated to-surface",
  },
  {
    glow: "rgb(89 212 196 / 0.18)",
    border: "border-[rgb(89_212_196/0.2)]",
    tag: "border-[rgb(89_212_196/0.35)] bg-[rgb(89_212_196/0.1)] text-[#5eead4]",
    screen: "from-[#0d3d3d]/50 via-surface-elevated to-surface",
  },
  {
    glow: "rgb(20 184 184 / 0.12)",
    border: "border-hairline-strong/40",
    tag: "border-hairline-strong/50 bg-surface-card text-body",
    screen: "from-surface-elevated via-surface to-canvas",
  },
] as const;

export const PROVIDER_MOCKUP_TONES = [
  {
    glow: "rgb(99 102 241 / 0.22)",
    border: "border-[rgb(99_102_241/0.22)]",
    tag: "border-[rgb(99_102_241/0.35)] bg-[rgb(99_102_241/0.12)] text-[#a5b4fc]",
    screen: "from-[#1e1b4b]/40 via-surface-elevated to-surface",
  },
  {
    glow: "rgb(20 184 184 / 0.14)",
    border: "border-primary/15",
    tag: "border-primary/25 bg-primary/8 text-primary",
    screen: "from-primary/12 via-surface-elevated to-surface",
  },
  {
    glow: "rgb(99 102 241 / 0.16)",
    border: "border-[rgb(99_102_241/0.18)]",
    tag: "border-[rgb(99_102_241/0.3)] bg-[rgb(99_102_241/0.08)] text-[#c7d2fe]",
    screen: "from-[#312e81]/30 via-surface-elevated to-surface",
  },
  {
    glow: "rgb(89 212 196 / 0.14)",
    border: "border-primary/12",
    tag: "border-primary/20 bg-primary/6 text-primary",
    screen: "from-teal-950/35 via-surface-elevated to-surface",
  },
] as const;

export const CUSTOMER_STEP_TONES = [
  { num: "text-primary", wash: "from-primary/10", border: "border-primary/20" },
  { num: "text-[#5eead4]", wash: "from-[#14b8b8]/8", border: "border-primary/15" },
  { num: "text-[#99f6e4]", wash: "from-primary/6", border: "border-hairline-strong/30" },
] as const;

export const PROVIDER_STEP_TONES = [
  { num: "text-[#a5b4fc]", wash: "from-[#6366f1]/10", border: "border-[rgb(99_102_241/0.22)]" },
  { num: "text-primary", wash: "from-primary/8", border: "border-primary/18" },
  { num: "text-[#c7d2fe]", wash: "from-[#4f46e5]/8", border: "border-[rgb(99_102_241/0.15)]" },
] as const;
