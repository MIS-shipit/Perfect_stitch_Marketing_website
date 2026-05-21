import { existsSync } from "fs";
import path from "path";
import type { MockupMeta, ResolvedMockup } from "./types";

const PUBLIC_MOCKUPS = path.join(process.cwd(), "public", "mockups");

export function resolveMockupSrc(key: string): string {
  const real = path.join(PUBLIC_MOCKUPS, `${key}.png`);
  if (existsSync(real)) return `/mockups/${key}.png`;
  return `/mockups/_placeholder/${key}.png`;
}

export function resolveAvatarSrc(key: string): string {
  const real = path.join(process.cwd(), "public", "avatars", `${key}.png`);
  if (existsSync(real)) return `/avatars/${key}.png`;
  return "/avatars/placeholder.png";
}

export function buildMockupResolver(
  catalog: Record<string, MockupMeta>,
): (key: string) => ResolvedMockup {
  return (key: string) => {
    const meta = catalog[key];
    if (!meta) {
      return {
        key,
        src: resolveMockupSrc(key),
        alt: key,
      };
    }
    return { key, ...meta, src: resolveMockupSrc(key) };
  };
}
