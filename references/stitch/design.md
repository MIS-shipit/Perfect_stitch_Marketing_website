---
version: "1.0"
name: Perfect Stitch Marketing
website: https://perfectstitch.app
product: On-demand laundry + tailoring marketplace (Customer + Provider apps)
description: >
  Cinematic dark marketing site. Single scrolling home (Hero → Customer →
  Provider → How it works → Download QR → Contact → Footer), plus About and
  Contact pages. Single accent teal #14B8B8. No drop shadows — surface ladder
  and 1px hairlines only.
references:
  - https://www.raycast.com
  - https://www.diabrowser.com
  - https://xtract.framer.ai
  - https://midu.design
  - https://huly.io
repo_mirror: design.md
---

# Perfect Stitch — Marketing website design specification

**Google Stitch:** this file is the upload target. Same content lives in **`design.md`** without the YAML header — keep both in sync. Detailed prompts: **`stitch-prompts.md`**.

---

## 1. Product context

**Perfect Stitch** is an on-demand **laundry and tailoring marketplace** with two apps:

| App | Who | What they do |
|-----|-----|----------------|
| **Customer** (`app/`) | End users | Browse services, book pickup, track orders in real time, pay with Razorpay, chat with provider; profile, addresses, history; EN / HI / TA |
| **Provider** (`perfect_stick_sp/sp/`) | Shop owners | Offline-first dashboard (Room + WorkManager sync), measurements, laundry intake, order status pipeline, shop profile, payouts |

Messaging on the site should stay **benefit-led** (“track every step”, “works offline”), not SDK names.

---

## 2. Site map & information architecture

| Page | Route | Content |
|------|--------|---------|
| **Home** | `/` | One long scrolling page — see §5 |
| **About** | `/about` | Mission, why us, team, stats, CTA to download |
| **Contact** | `/contact` | Contact details, form, map, FAQ |

**No other top-level routes** in v1 unless you add legal stubs (`/privacy`, `/terms`) as footer links only.

---

## 3. Global navigation behavior

### Top bar (sticky, ~56px height)

**Left:** wordmark “Perfect Stitch” (link → `/` top)

**Center (desktop):** text links

- **Customer** → smooth scroll to `#customer` on home
- **Provider** → smooth scroll to `#provider` on home
- **About** → `/about`
- **Contact** → `/contact`

**Right:** primary CTA **Download** (teal pill) → smooth scroll to `#download` on home

### When not on home

- **Customer** / **Provider** / **Download** → `/#customer`, `/#provider`, `/#download` (deeplink + scroll after load)
- **About** / **Contact** behave as normal routes

### Scroll UX

- `scroll-behavior: smooth` on `<html>`
- Sections use `scroll-margin-top: ~80px` so titles clear the sticky bar
- Optional: scroll-spy to highlight Customer vs Provider vs Download in nav

### Mobile

- Collapse center links into menu; **Download** stays visible or inside menu as primary action

---

## 4. Visual direction & references

- **Tone:** cinematic, dark, **premium product marketing** — the page should feel like an extended app screenshot, not a generic SaaS template.
- **Depth:** surface “ladder” + 1px hairlines — **no drop shadows**.
- **Accent:** single teal `#14B8B8` — CTAs, active states, hero glow. Avoid purple gradients and generic AI illustration packs.

### Reference library (combine in Stitch)

Use **all** of these together when generating — each site contributes a different premium cue:

| Reference | URL | Borrow for Perfect Stitch |
|-----------|-----|---------------------------|
| **Raycast** | [raycast.com](https://www.raycast.com) | Dark canvas, hairline cards, keyboard-first polish, product UI as hero, restrained single-accent CTAs |
| **Dia** | [diabrowser.com](https://www.diabrowser.com) | Cinematic hero, floating tilted devices, calm “works with you” pacing, generous whitespace |
| **Xtract** | [xtract.framer.ai](https://xtract.framer.ai) | Alternating feature rows (mockup ↔ copy), eyebrow + headline rhythm, structured feature grids |
| **Midu** | [midu.design](https://midu.design) | About page team cards, stat band, trust / portfolio presentation |
| **Huly** | [huly.io](https://huly.io) | **Premium SaaS polish:** bold hero hierarchy, “everything you need” **feature marquee** under hero, large in-app UI panels with depth, icon + title feature tiles, “See in action” secondary CTA pattern, scroll-story sections with live product chrome, strong closing **Join the movement** CTA band |

**Huly-specific patterns to apply on home:**

1. **Hero:** oversized headline + short subhead + primary CTA; optional subtle **scrolling feature strip** below (e.g. *Book · Track · Pay · Chat · Offline sync · Payouts*).
2. **Customer / Provider sections:** treat each like Huly’s “Unmatched productivity” blocks — icon or mini-UI tile + tight headline + 2-line benefit (not long paragraphs).
3. **Product panels:** full-width or large framed app screenshots with soft edge glow (Huly’s in-product windows); use for order tracking and provider dashboard.
4. **Closing band:** before footer, a full-bleed CTA section — headline + Download + social proof (Huly-style “Join the movement”).

**Stitch setup:** upload this file (or `DESIGN.md`) **and** add reference URLs in Stitch — include `https://huly.io` alongside Raycast, Xtract, and Dia.

**Note:** This is a **dark marketing theme**. In-app / admin may use a light teal system; the site can stay dark for drama while still using the same logo and teal accent.

---

## 5. Home page — section structure (top → bottom)

Wireframe order; each block is a full-width **section** with max-width ~1240px inner content.

### Section A — Hero

- **Background:** `canvas` + soft radial teal glow behind headline; optional one-time diagonal teal band (see tokens).
- **Eyebrow (caption):** `Laundry + Tailoring · On-Demand`
- **Headline (display-xl):** e.g. *Your wardrobe, looked after.*
- **Subhead (body-lg):** Order laundry or tailoring in seconds. Track every garment in real time. Pay when it’s done.
- **Actions:** [Get the App] primary · [For Providers →] secondary (secondary scrolls to `#provider` or `#download` — pick one and keep consistent).
- **Visual:** two **tilted phone mockups** (Customer Home + Provider Dashboard) with real UI, slight overlap, subtle teal glow under devices.
- **Trust row:** e.g. “Trusted in 12+ cities” + small city chips.
- **Feature marquee (Huly-style, optional):** horizontal scrolling strip under hero — *Book · Track · Pay · Chat · Offline sync · Payouts* — mute text on `surface`, subtle infinite scroll.
- **Feature marquee (Huly-style, optional):** horizontal scrolling strip under hero — *Book · Track · Pay · Chat · Offline sync · Payouts* — mute text on `surface`, subtle infinite scroll.

### Section B — Customer features — anchor `id="customer"`

- **Eyebrow:** For Customers  
- **Headline (display-lg):** e.g. *Drop it off. Forget about it. We’ve got it.*  
- **Layout:** 2×2 **alternating** rows (image left / copy right, then swap) — Xtract-style.

| # | Title | Copy focus | Mockup |
|---|--------|------------|--------|
| 1 | Browse + book in seconds | Services, address / Places | Customer Home |
| 2 | Real-time order tracking | Timeline, status, chat | Order tracking |
| 3 | Secure payments | Razorpay, invoice | Payment success sheet |
| 4 | Profile & history | Addresses, reorder, EN/HI/TA | Profile / history |

Each cell: title (heading-lg), 2–3 lines body, optional “See how →” link (teal text only).

### Section C — Provider features — anchor `id="provider"`

- **Eyebrow:** For Shops  
- **Headline (display-lg):** e.g. *Run your shop like the back-office it should be.*  
- **Same 2×2 alternating grid** but **invert** alternating pattern vs Customer so the page doesn’t feel copy-pasted.

| # | Title | Copy focus | Mockup |
|---|--------|------------|--------|
| 1 | Offline-first dashboard | No signal → sync when online | Dashboard + offline chip |
| 2 | Measurements & intake | Tailoring + laundry intake | Measurement / intake UI |
| 3 | Order pipeline | Status badges, one-tap updates | Order list |
| 4 | Payouts & earnings | Settlement, Razorpay | Payouts / earnings |

### Section D — How it works

- **Eyebrow:** How it works  
- **Three cards** in a row (stack on mobile): **01 Download** · **02 Book or list** · **03 Track + pay**  
- Large teal numerals, short body under each.

### Section E — Download / CTA — anchor `id="download"`

- **Eyebrow:** Download Perfect Stitch  
- **Headline:** Two stores. One app. Pick yours.  
- **Center card (`qr-card`):**
  - **Toggle row:** Google Play icon | Apple App Store icon (segmented / pill). **Default = Play active** (teal underline + soft fill).
  - **QR area:** large white QR on dark card; **swaps** when user taps Apple (second design state / frame in Stitch).
  - **Badges row:** “Get it on Google Play” + “Download on the App Store” — **active store** uses filled teal treatment; inactive = outline.
  - **Caption (mute):** Scan with your phone camera.

### Section F — Contact strip (still on home)

Three columns (stack on mobile):

| Column | Content |
|--------|---------|
| Support | `support@perfectstitch.app` |
| Partner with us | `partners@perfectstitch.app` |
| Follow | Instagram, LinkedIn, X (icon row) |

Optional: phone line `+91 ••• ••• ••••` if you want it public.

### Section G — Footer

- Col1: logo + one-line blurb  
- Col2 **Product:** Customer (anchor), Provider (anchor), Download (anchor)  
- Col3 **Company:** About, Contact, Careers (placeholder OK)  
- Col4 **Legal:** Privacy, Terms (link to real URLs when ready)  
- **Languages:** EN · HI · TA as small pills (visual only for v1 if no translated site)  
- Bottom: `© 2026 Perfect Stitch · Made in India`

### Section H — Closing CTA band (Huly-style, before footer)

- Full-bleed `surface` band with hairline top/bottom  
- Headline: e.g. *Join local shops and customers who trust Perfect Stitch.*  
- Subhead (body-md, mute): one line on real-time tracking + offline provider tools  
- Actions: [Download the app] primary · [Partner with us →] secondary → `/contact`  
- Optional: small avatar stack or “12+ cities” stat for social proof

---

## 6. About page (`/about`)

1. **Hero:** mission headline + 2-line subhead (optional team photo, dark-treated).  
2. **Three pillars:** Local shops first · Transparent pricing · Trust by tracking (cards, hairline borders).  
3. **Team grid:** 3–6 people — avatar, name, role, city (Midu-style cards).  
4. **Stats band:** e.g. 12+ cities · 200+ shops · 50k+ orders (replace with real numbers when you have them).  
5. **CTA strip:** button back to home `#download`.

---

## 7. Contact page (`/contact`)

1. **Two columns (desktop):**  
   - Left: support email, partners email, phone, address, hours, social icons.  
   - Right: **form** — Name, Email, Role (Customer | Provider), Message, Submit (teal pill).  
2. **Map:** full-width, ~320px tall, dark map style, rounded corners.  
3. **FAQ:** 5–6 accordion rows; hairline dividers; + / − affordance.

---

## 8. Design tokens (marketing — dark)

### Color roles

| Token | Hex | Usage |
|-------|-----|--------|
| canvas | `#07080A` | Page background |
| surface | `#0D0F12` | Section bands, major cards |
| surface-elevated | `#13161C` | QR card, inputs, nested panels |
| surface-card | `#181C24` | Chips, QR inner pad, icon tiles |
| hairline | `#242832` | Default 1px borders |
| hairline-strong | `rgba(255,255,255,0.16)` | Strong separators |
| primary | `#14B8B8` | Primary buttons, accent, hero glow core |
| primary-hover | `#0FA0A0` | Pressed / hover |
| primary-soft | `rgba(20,184,184,0.15)` | Soft fills (toggle active, glow) |
| ink | `#F4F4F6` | Headlines |
| body | `#CDCDCD` | Body copy |
| mute | `#9C9CA1` | Secondary, footer, captions |
| success | `#59D499` | Status pills in mocks only |
| warning | `#FFC533` | Status pills in mocks only |

**Hero decorative gradient (once per page):** radial teal from `#14B8B8` (low opacity) + optional diagonal band `#14B8B8` → `#0A4F4F`.

### Typography

- **Family:** Inter (Google Fonts).  
- **Feature settings:** `"calt", "kern", "liga", "ss03"` on body/root.  
- **Mono (optional):** Geist Mono / JetBrains Mono for shortcuts or IDs.

| Token | Size | Weight | Line-height | Usage |
|-------|------|--------|--------------|-------|
| display-xl | 64px | 600 | 1.1 | Hero headline |
| display-lg | 48px | 600 | 1.15 | Section titles |
| heading-lg | 24px | 600 | 1.3 | Feature titles |
| heading-md | 20px | 500 | 1.4 | Subheads |
| body-lg | 18px | 400 | 1.6 | Hero subhead |
| body-md | 16px | 400 | 1.6 | Default body |
| body-sm | 14px | 400 | 1.6 | Card copy |
| caption | 12px | 500 | 1.5 | Eyebrows, labels |
| button | 14px | 500 | 1.4 | Buttons |

Responsive: scale display-xl down on small screens (~36–44px).

### Spacing & shape

- **Base unit:** 8px.  
- **Scale:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 96.  
- **Section vertical rhythm:** ~96px between major sections (64px tablet, 48px mobile).  
- **Radius:** 8px buttons/inputs; 12px feature cards; 16px QR card / phone frames; 9999px pills.  
- **Elevation:** **no shadows** — use darker/lighter surfaces + hairlines only.

---

## 9. Component inventory

| Component | Spec summary |
|-----------|----------------|
| `button-primary` | `primary` fill, white text, h~36px, radius 8px |
| `button-secondary` | transparent, `hairline` border, `ink` text |
| `chip` | `surface-card` + caption text; optional `primary-soft` when selected |
| `feature-row` | 2-column: mockup \| copy, alternating flip per row |
| `phone-mockup` | Real screenshot in thin bezel; subtle glow `primary-soft`; ~16px outer radius |
| `qr-card` | `surface-elevated`, 16px radius, toggle + QR + badges; two states Play / Apple |
| `navbar` | Sticky 56px; solid `surface` + bottom hairline after scroll optional |
| `footer` | 4-column + legal row |

---

## 10. Content & placeholders

- Domain / links from app strings: see `privacy_policy_url`, `terms_of_service_url` in Android `strings.xml` (currently `perfectstitch.app`).  
- Emails above are placeholders until final ops addresses are fixed.  
- QR images: generate from final Play Console / App Store URLs in production; Stitch can use gray placeholder QR.

---

## 11. Implementation notes (post-Stitch)

- Stack: Next.js + Tailwind + shadcn aligned with repo `admin-web` patterns.  
- QR toggle: small client component; two static QR assets in `/public/qr/`.  
- Forms: backend or third-party endpoint; **no API keys** in frontend.  
- Mockups: export real Compose screenshots (e.g. 1080×2400) inside frames.

---

## 12. Related files

| File | Role |
|------|------|
| [`design.md`](./design.md) | Markdown mirror of this specification (without YAML); edit either file and keep parity |
| [`stitch-prompts.md`](./stitch-prompts.md) | Master + per-section prompts → Stitch **Additional instructions** |

---

**Last updated:** 2026-05-23
