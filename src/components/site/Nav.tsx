"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronRightIcon,
  Info,
  LayoutGrid,
  Mail,
  MenuIcon,
  Sparkles,
  Store,
  Users,
} from "lucide-react";
import Container from "@/components/site/Container";
import BrandLogo from "@/components/site/BrandLogo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/cn";
import {
  useNavScrollState,
  type ScrollSectionId,
} from "./useNavScrollState";

type NavItem = {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  sectionId?: ScrollSectionId;
  href?: string;
  home?: boolean;
};

const NAV_LINKS: NavItem[] = [
  { label: "Home", href: "/", icon: Sparkles, home: true },
  { label: "Services", sectionId: "services", icon: LayoutGrid },
  { label: "Customer", sectionId: "customer", icon: Users },
  { label: "Provider", sectionId: "provider", icon: Store },
  { label: "About", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Mail },
];

const focusRing =
  "outline-none focus-visible:ring-3 focus-visible:ring-primary-soft";

function sectionHref(sectionId: string, pathname: string) {
  return pathname === "/" ? `#${sectionId}` : `/#${sectionId}`;
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

function CompactNavItem({
  item,
  href,
  isActive,
  pathname,
}: {
  item: NavItem;
  href: string;
  isActive: boolean;
  pathname: string;
}) {
  const Icon = item.icon;

  if (item.home) {
    return (
      <Link
        href="/"
        aria-label="Perfect Stitch home"
        aria-current={pathname === "/" ? "page" : undefined}
        className={cn(
          focusRing,
          "flex shrink-0 items-center justify-center rounded-xl px-2 py-2 transition-colors hover:bg-white/5",
          isActive && "bg-white/8",
        )}
      >
        <Image
          src="/logo/mark.png"
          alt=""
          width={32}
          height={32}
          className="size-8 rounded-lg"
        />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={isActive ? "location" : undefined}
      className={cn(
        focusRing,
        "flex min-w-[3.25rem] flex-col items-center gap-1 rounded-xl px-2 py-2 transition-colors hover:bg-white/5",
        isActive && "bg-primary/10 text-primary",
      )}
    >
      <Icon
        className={cn(
          "size-5 shrink-0",
          isActive ? "text-primary" : "text-ink",
        )}
      />
      <span
        className={cn(
          "text-[10px] font-medium leading-none",
          isActive ? "text-primary" : "text-body",
        )}
      >
        {item.label}
      </span>
    </Link>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const { compact, activeSection } = useNavScrollState(pathname);
  const [menuOpen, setMenuOpen] = useState(false);

  const downloadHref = sectionHref("download", pathname);

  const resolveActive = (item: NavItem) => {
    if (item.home) return pathname === "/" && !compact;
    if (item.href) return pathname === item.href;
    return (
      pathname === "/" && compact && activeSection === item.sectionId
    );
  };

  return (
    <header
      className={cn(
        "z-50 flex items-center transition-all duration-500 ease-out",
        compact
          ? "pointer-events-none fixed top-3 right-3 left-auto h-auto w-auto"
          : "sticky top-0 h-16 w-full",
      )}
    >
      <div
        className={cn(
          "pointer-events-auto transition-all duration-500 ease-out",
          compact ? "ml-auto" : "w-full",
        )}
      >
        <Container
          className={cn(
            "flex items-center transition-all duration-500 ease-out",
            compact ? "w-auto max-w-none px-0" : "w-full gap-4",
          )}
        >
          <div
            className={cn(
              "nav-glass flex items-center transition-all duration-500 ease-out",
              compact
                ? "gap-0.5 rounded-full px-2 py-2"
                : "w-full gap-4 rounded-full px-4 py-2",
            )}
          >
            {compact ? (
              <>
                <nav
                  className="hidden items-center gap-0.5 md:flex"
                  aria-label="Primary compact"
                >
                  {NAV_LINKS.map((item) => {
                    const href = item.href ?? sectionHref(item.sectionId!, pathname);
                    return (
                      <CompactNavItem
                        key={item.label}
                        item={item}
                        href={href}
                        isActive={resolveActive(item)}
                        pathname={pathname}
                      />
                    );
                  })}
                </nav>
                <Link
                  href={downloadHref}
                  className={cn(
                    focusRing,
                    "ml-1 hidden h-9 shrink-0 items-center justify-center rounded-full bg-primary px-3 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-hover md:inline-flex",
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
                        <BrandLogo size="sm" />
                      </SheetTitle>
                    </SheetHeader>
                    <nav className="flex flex-col gap-1 px-4 pb-6" aria-label="Mobile">
                      {NAV_LINKS.filter((i) => !i.home).map((item) => {
                        const href =
                          item.href ?? sectionHref(item.sectionId!, pathname);
                        return (
                          <NavLink
                            key={item.label}
                            href={href}
                            isActive={resolveActive(item)}
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
              </>
            ) : (
              <>
                <Link href="/" className={cn(focusRing, "flex shrink-0 items-center")}>
                  <BrandLogo />
                </Link>

                <nav
                  className="hidden flex-1 items-center justify-center gap-1 md:flex"
                  aria-label="Primary"
                >
                  {NAV_LINKS.filter((i) => !i.home).map((item) => {
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
                    const isActive = resolveActive(item);

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
                          <BrandLogo size="sm" />
                        </SheetTitle>
                      </SheetHeader>
                      <nav
                        className="flex flex-col gap-1 px-4 pb-6"
                        aria-label="Mobile"
                      >
                        {NAV_LINKS.filter((i) => !i.home).map((item) => {
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
                          const isActive = resolveActive(item);

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
              </>
            )}
          </div>
        </Container>
      </div>
    </header>
  );
}
