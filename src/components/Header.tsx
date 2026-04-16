"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import { LogoMark } from "./LogoMark";
import { ThemeToggle } from "./ThemeToggle";
import { SITE_NAME, GITHUB_URL, NAV_TABS, TAB_PREFIXES } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();

  function isTabActive(label: string): boolean {
    const prefix = TAB_PREFIXES[label];
    return prefix ? pathname.startsWith(prefix) : false;
  }

  return (
    <header
      className="sticky top-0 z-50 border-b overflow-x-hidden"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--header-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="mx-auto flex h-14 max-w-7xl min-w-0 items-center gap-4 px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-[15px] font-semibold tracking-tight transition-colors duration-200 cursor-pointer"
          style={{ color: "var(--foreground)" }}
        >
          <LogoMark className="h-5 w-5 shrink-0" style={{ color: "var(--foreground)" }} />
          {SITE_NAME}
        </Link>

        {/* Tab Navigation */}
        <nav className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap">
          <div className="flex w-max items-center gap-0.5 pr-4">
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

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-1">
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
