import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/site/Footer";
import MotionProvider from "@/components/site/MotionProvider";
import Nav from "@/components/site/Nav";
import { Toaster } from "@/components/ui/sonner";
import { inter } from "@/lib/font";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Laundry & Tailoring, On-Demand`,
    template: `%s · ${SITE_NAME}`,
  },
  description:
    "Book laundry and tailoring pickup in seconds. Track every garment in real time. Pay when it's done.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-canvas font-sans text-ink">
        <MotionProvider>
          <Nav />
          <main className="flex flex-1 flex-col overflow-x-hidden">{children}</main>
          <Footer />
          <Toaster />
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
