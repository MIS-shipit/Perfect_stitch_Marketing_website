import { NextResponse } from "next/server";
import { getSiteContent } from "@/lib/content/get-site-content";

export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getSiteContent();
  const { resolveMockup, ...publicContent } = content;

  const mockups = Object.fromEntries(
    Object.keys(content.mockups).map((key) => {
      const m = content.resolveMockup(key);
      return [key, { src: m.src, alt: m.alt, caption: m.caption }];
    }),
  );

  return NextResponse.json({
    ...publicContent,
    mockups,
    hero: {
      ...publicContent.hero,
      mockups: {
        customer: content.resolveMockup(publicContent.hero.mockups.customer),
        provider: content.resolveMockup(publicContent.hero.mockups.provider),
      },
    },
    stores: content.stores,
  });
}
