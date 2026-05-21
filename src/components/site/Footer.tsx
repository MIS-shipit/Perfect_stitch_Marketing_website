import Link from "next/link";
import { Briefcase, Camera, GlobeX } from "lucide-react";
import Container from "@/components/site/Container";
import { cn } from "@/lib/cn";

const focusRing =
  "outline-none focus-visible:ring-3 focus-visible:ring-primary-soft rounded-sm";

function SVGLogo() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 text-primary"
      aria-hidden="true"
    >
      <path
        d="M10 2L10 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <ellipse
        cx="10"
        cy="2.5"
        rx="1.2"
        ry="0.8"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <path
        d="M9.5 2C7 3 6 6 8 8C10 10 9 13 7 14"
        stroke="currentColor"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="7" cy="14" r="0.8" fill="currentColor" />
    </svg>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-4 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          focusRing,
          "text-sm text-body transition-colors hover:text-ink",
        )}
      >
        {children}
      </Link>
    </li>
  );
}

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", icon: Camera },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Briefcase },
  { label: "X", href: "https://x.com", icon: GlobeX },
] as const;

const LANGUAGES = ["EN", "HI", "TA"] as const;

export default function Footer() {
  return (
    <footer
      className="border-t border-hairline bg-surface [mask-image:linear-gradient(to_bottom,transparent,black_20%)]"
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, transparent, black 20%)",
      }}
    >
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className={cn(
                focusRing,
                "inline-flex w-fit items-center gap-2 text-sm font-semibold tracking-tight text-ink",
              )}
            >
              <SVGLogo />
              Perfect Stitch
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-mute">
              Laundry &amp; tailoring, on-demand
            </p>
            <div className="flex items-center gap-2">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    focusRing,
                    "inline-flex size-8 items-center justify-center rounded-lg border border-hairline bg-surface-card text-body transition-colors hover:border-hairline-strong hover:text-ink",
                  )}
                >
                  <Icon className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Product">
            <FooterLink href="/#customer">Customer</FooterLink>
            <FooterLink href="/#provider">Provider</FooterLink>
            <FooterLink href="/#download">Download</FooterLink>
          </FooterColumn>

          <FooterColumn title="Company">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/careers">Careers</FooterLink>
          </FooterColumn>

          <FooterColumn title="Legal">
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
          </FooterColumn>

          <FooterColumn title="Languages">
            <li className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <span
                  key={lang}
                  className="inline-flex h-8 items-center rounded-full border border-hairline bg-surface-card px-3 text-xs font-medium text-mute"
                >
                  {lang}
                </span>
              ))}
            </li>
          </FooterColumn>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-mute">© 2026 Perfect Stitch</p>
          <p className="text-sm text-mute">Made with care in India</p>
        </div>
      </Container>
    </footer>
  );
}
