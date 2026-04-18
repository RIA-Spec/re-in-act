"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import { LogoMark } from "./LogoMark";
import { ThemeToggle } from "./ThemeToggle";
import { SITE_NAME, GITHUB_URL, NAV_TABS, TAB_PREFIXES } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();
  const isDocsRoute =
    pathname.startsWith("/docs") ||
    pathname.startsWith("/specification") ||
    pathname.startsWith("/extensions") ||
    pathname.startsWith("/proposals") ||
    pathname.startsWith("/community");

  function isTabActive(label: string): boolean {
    const prefix = TAB_PREFIXES[label];
    return prefix ? pathname.startsWith(prefix) : false;
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b overflow-x-hidden ${isDocsRoute ? "hidden md:block" : ""}`}
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--header-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-6 py-2 md:h-14 md:flex-nowrap md:py-0">
        {/* Logo */}
        <Link
          href="/"
          className="order-1 flex shrink-0 items-center gap-2 text-[15px] font-semibold tracking-tight transition-colors duration-200 cursor-pointer"
          style={{ color: "var(--foreground)" }}
        >
          <LogoMark className="h-5 w-5 shrink-0" style={{ color: "var(--foreground)" }} />
          {SITE_NAME}
        </Link>

        {/* Tab Navigation */}
        <nav className="order-3 hidden basis-full min-w-0 whitespace-nowrap px-6 md:order-2 md:mx-0 md:flex md:flex-1 md:basis-auto md:overflow-visible md:px-0 md:whitespace-nowrap">
          <div className="flex w-max items-center gap-0.5 pb-1 md:pb-0">
            {NAV_TABS.map((tab) => {
              const active = isTabActive(tab.label);
              return (
                <Link
                  key={tab.label}
                  href={tab.href}
                  className={`relative shrink-0 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors duration-200 cursor-pointer ${
                    active
                      ? "text-[var(--accent)]"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {tab.label}
                  {active && (
                    <span
                      className="absolute inset-x-1 -bottom-[9px] h-[2px] rounded-full"
                      style={{ backgroundColor: "var(--accent)" }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Actions */}
        <div className="order-2 ml-auto flex shrink-0 items-center gap-1 md:order-3 md:ml-0">
          <ThemeToggle />
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-md p-2 transition-colors duration-200 cursor-pointer"
            style={{ color: "var(--muted)" }}
            aria-label="GitHub"
          >
            <Github className="h-[18px] w-[18px]" />
          </a>
        </div>
      </div>
    </header>
  );
}
