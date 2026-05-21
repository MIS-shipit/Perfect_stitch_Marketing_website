export type HeadlineWord = { text: string; teal: boolean };

export type MockupMeta = {
  alt: string;
  caption?: string;
};

export type TeamMember = {
  name: string;
  handle: string;
  role: string;
  city: string;
  avatar: string;
};

export type SiteContentRaw = {
  hero: {
    eyebrow: string;
    headline: HeadlineWord[];
    subcopy: string;
    cities: string[];
    cityLabel: string;
    mockups: { customer: string; provider: string };
  };
  marquee: string[];
  mockups: Record<string, MockupMeta>;
  about: { team: TeamMember[] };
};

export type ResolvedMockup = MockupMeta & { src: string; key: string };

export type SiteContent = SiteContentRaw & {
  stores: { playUrl: string; appleUrl: string };
  resolveMockup: (key: string) => ResolvedMockup;
};
