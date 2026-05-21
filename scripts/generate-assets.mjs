/**
 * Phase 9 asset generator — mockup placeholders, QR codes, favicons.
 * Run: node scripts/generate-assets.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import QRCode from "qrcode";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

const MOCKUP_NAMES = [
  "placeholder.png",
  "customer-home.png",
  "customer-tracking.png",
  "customer-payment.png",
  "customer-profile.png",
  "hero-customer.png",
  "provider-dashboard.png",
  "provider-measurements.png",
  "provider-pipeline.png",
  "provider-payouts.png",
  "hero-provider.png",
];

const PLAY_URL =
  process.env.NEXT_PUBLIC_PLAY_URL ||
  "https://play.google.com/store/apps/details?id=app.perfectstitch.customer";
const APPLE_URL =
  process.env.NEXT_PUBLIC_APPLE_URL ||
  "https://apps.apple.com/app/perfect-stitch";

/** Minimal valid 1×1 PNG (white) — copied for all named mockups until real screenshots land. */
const MINI_PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
  "base64",
);

async function main() {
  const placeholderDir = path.join(publicDir, "mockups", "_placeholder");
  const qrDir = path.join(publicDir, "qr");
  const logoDir = path.join(publicDir, "logo");
  fs.mkdirSync(placeholderDir, { recursive: true });
  fs.mkdirSync(qrDir, { recursive: true });
  fs.mkdirSync(logoDir, { recursive: true });

  for (const name of MOCKUP_NAMES) {
    fs.writeFileSync(path.join(placeholderDir, name), MINI_PNG);
  }

  await QRCode.toFile(path.join(qrDir, "play.png"), PLAY_URL, {
    width: 240,
    margin: 1,
    color: { dark: "#07080A", light: "#FFFFFF" },
  });
  await QRCode.toFile(path.join(qrDir, "apple.png"), APPLE_URL, {
    width: 240,
    margin: 1,
    color: { dark: "#07080A", light: "#FFFFFF" },
  });

  const repoLogo = path.join(root, "..", "Logo");
  const markSrc = path.join(repoLogo, "1x", "Forground1x.png");
  if (fs.existsSync(markSrc)) {
    fs.copyFileSync(markSrc, path.join(logoDir, "mark.png"));
    fs.copyFileSync(markSrc, path.join(root, "src", "app", "icon.png"));
    fs.copyFileSync(markSrc, path.join(root, "src", "app", "apple-icon.png"));
    const bgSvg = path.join(repoLogo, "SVG", "Background.svg");
    if (fs.existsSync(bgSvg)) {
      fs.copyFileSync(bgSvg, path.join(logoDir, "logo-bg.svg"));
    }
  }

  console.log("Generated mockup placeholders, QR codes, and logos.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
