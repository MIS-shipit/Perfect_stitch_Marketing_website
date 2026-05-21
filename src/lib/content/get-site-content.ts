import "server-only";

import siteJson from "@/content/site.json";
import type { SiteContent, SiteContentRaw, TeamMember } from "./types";
import { buildMockupResolver, resolveAvatarSrc } from "./resolve-mockup";

const raw = siteJson as SiteContentRaw;

const PLAY_FALLBACK =
  "https://play.google.com/store/apps/details?id=app.perfectstitch.customer";
const APPLE_FALLBACK = "https://apps.apple.com/app/perfect-stitch";

export async function getSiteContent(): Promise<SiteContent> {
  const resolveMockup = buildMockupResolver(raw.mockups);

  const team: TeamMember[] = raw.about.team.map((member) => ({
    ...member,
    avatar: resolveAvatarSrc(member.avatar),
  }));

  return {
    ...raw,
    about: { team },
    stores: {
      playUrl: process.env.NEXT_PUBLIC_PLAY_URL?.trim() || PLAY_FALLBACK,
      appleUrl: process.env.NEXT_PUBLIC_APPLE_URL?.trim() || APPLE_FALLBACK,
    },
    resolveMockup,
  };
}
