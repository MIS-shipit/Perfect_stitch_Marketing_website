"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronRightIcon, MenuIcon } from "lucide-react";
import Container from "@/components/site/Container";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/cn";
import { useActiveSection } from "./useActiveSection";

const SCROLL_SECTION_IDS = ["services", "customer", "provider", "download"] as const;

type ScrollSectionId = (typeof SCROLL_SECTION_IDS)[number];

const NAV_LINKS: {
  label: string;
  sectionId?: ScrollSectionId;
  href?: string;
}[] = [
  { label: "Services", sectionId: "services" },
  { label: "Customer", sectionId: "customer" },
  { label: "Provider", sectionId: "provider" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const focusRing =
  "outline-none focus-visible:ring-3 focus-visible:ring-primary-soft";

function sectionHref(sectionId: string, pathname: string) {
  return pathname === "/" ? `#${sectionId}` : `/#${sectionId}`;
}

function SVGLogo() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      {/* Needle body */}
      <path
        d="M10 2L10 14"
        stroke="#14B8B8"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Needle eye */}
      <ellipse
        cx="10"
        cy="2.5"
        rx="1.2"
        ry="0.8"
        stroke="#14B8B8"
        strokeWidth="0.8"
      />
      {/* Thread */}
      <path
        d="M9.5 2C7 3 6 6 8 8C10 10 9 13 7 14"
        stroke="#14B8B8"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Thread end dot */}
      <circle cx="7" cy="14" r="0.8" fill="#14B8B8" />
    </svg>
  );
}

function NavLink({
  href,
  children,
  isActive,
  className,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
  onNavigate?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={isActive ? "location" : undefined}
      className={cn(
        focusRing,
        "group relative px-3 py-2 text-sm font-medium text-body transition-colors hover:text-ink",
        "after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-0 after:bg-primary after:transition-all group-hover:after:left-0 group-hover:after:w-full",
        isActive && "text-ink after:left-0 after:w-full",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const activeSection = useActiveSection([...SCROLL_SECTION_IDS]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const downloadHref = sectionHref("download", pathname);

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center">
      <Container className="flex w-full items-center gap-4">
        <div
          className={cn(
            "flex w-full items-center gap-4 rounded-full px-4 transition-all duration-300",
            scrolled
              ? "border border-hairline bg-surface/85 py-2 shadow-[0_2px_24px_rgb(0_0_0/0.4)] backdrop-blur-md"
              : "border border-transparent bg-transparent py-0",
          )}
        >
        <Link
          href="/"
          className={cn(
            focusRing,
            "flex shrink-0 items-center gap-2 text-sm font-semibold tracking-tight text-ink",
          )}
        >
          <SVGLogo />
          Perfect Stitch
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-1 md:flex"
          aria-label="Primary"
        >
          {NAV_LINKS.map((item) => {
            if (item.href) {
              return (
                <NavLink
                  key={item.label}
                  href={item.href}
                  isActive={pathname === item.href}
                >
                  {item.label}
                </NavLink>
              );
            }

            const href = sectionHref(item.sectionId!, pathname);
            const isActive =
              pathname === "/" && activeSection === item.sectionId;

            return (
              <NavLink key={item.label} href={href} isActive={isActive}>
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href={downloadHref}
            className={cn(
              focusRing,
              "relative inline-flex h-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover",
              "before:pointer-events-none before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-transform before:duration-500 hover:before:translate-x-full",
            )}
          >
            Download
          </Link>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("md:hidden", focusRing)}
                  aria-label="Open menu"
                />
              }
            >
              <MenuIcon className="size-5 text-ink" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-hairline bg-surface-elevated"
            >
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-ink">
                  <SVGLogo />
                  Perfect Stitch
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4 pb-6" aria-label="Mobile">
                {NAV_LINKS.map((item) => {
                  if (item.href) {
                    return (
                      <NavLink
                        key={item.label}
                        href={item.href}
                        isActive={pathname === item.href}
                        className="flex w-full items-center justify-between px-0"
                        onNavigate={() => setMenuOpen(false)}
                      >
                        {item.label}
                        <ChevronRightIcon className="size-4 shrink-0 text-mute" />
                      </NavLink>
                    );
                  }

                  const href = sectionHref(item.sectionId!, pathname);
                  const isActive =
                    pathname === "/" && activeSection === item.sectionId;

                  return (
                    <NavLink
                      key={item.label}
                      href={href}
                      isActive={isActive}
                      className="flex w-full items-center justify-between px-0"
                      onNavigate={() => setMenuOpen(false)}
                    >
                      {item.label}
                      <ChevronRightIcon className="size-4 shrink-0 text-mute" />
                    </NavLink>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        </div>
      </Container>
    </header>
  );
}