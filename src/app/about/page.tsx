import AboutPageClient from "@/app/about/AboutPageClient";
import { getSiteContent } from "@/lib/content/get-site-content";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const content = await getSiteContent();
  return <AboutPageClient team={content.about.team} />;
}
