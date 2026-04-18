"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github, Menu, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { NavTab, NavPage } from "@/lib/navigation";
import { GITHUB_URL, NAV_TABS, SITE_NAME } from "@/lib/constants";
import { ThemeToggle } from "./ThemeToggle";
import { LogoMark } from "./LogoMark";

interface Heading {
  level: number;
  id: string;
  text: string;
}

interface DocsNavigationProps {
  tabs: NavTab[];
  activeTab: string;
  headings: Heading[];
  title: string;
}

function GroupSection({
  group,
  pages,
  onNavigate,
}: {
  group: string;
  pages: NavPage[];
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-5">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-3 py-1 text-[11px] font-semibold uppercase tracking-widest transition-colors duration-200 cursor-pointer"
        style={{ color: "var(--muted)" }}
      >
        {group}
        <span className={`transition-transform duration-200 ${open ? "" : "-rotate-90"}`}>▾</span>
      </button>
      {open && (
        <ul className="mt-1.5 space-y-0.5">
          {pages.map((page) => {
            const href = `/${page.slug}`;
            const isActive = pathname === href;
            return (
              <li key={page.slug}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className="block rounded-md px-3 py-1.5 text-[13px] transition-colors duration-200 cursor-pointer"
                  style={{
                    backgroundColor: isActive ? "var(--sidebar-active-bg)" : "transparent",
                    color: isActive ? "var(--sidebar-active-text)" : "var(--muted)",
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {page.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function TocList({ headings, onNavigate }: { headings: Heading[]; onNavigate?: () => void }) {
  const items = useMemo(() => {
    const list: Array<Heading & { children: Heading[] }> = [];
    let current: (typeof list)[number] | null = null;

    for (const heading of headings) {
      if (heading.level === 2) {
        current = { ...heading, children: [] };
        list.push(current);
      } else if (heading.level === 3) {
        if (!current) {
          current = { level: 2, id: heading.id, text: heading.text, children: [] };
          list.push(current);
        } else {
          current.children.push(heading);
        }
      }
    }

    return list;
  }, [headings]);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="On this page" className="space-y-3">
      <div
        className="px-3 text-[11px] font-semibold uppercase tracking-widest"
        style={{ color: "var(--muted)" }}
      >
        On this page
      </div>
      <ul className="space-y-1">
        {items.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              onClick={onNavigate}
              className="block rounded-md px-3 py-1.5 text-[13px] leading-snug transition-colors duration-200 hover:bg-[var(--sidebar-active-bg)]"
              style={{ color: "var(--muted)" }}
            >
              {heading.text}
            </a>
            {heading.children.length > 0 && (
              <ul className="mt-1 space-y-1 pl-4">
                {heading.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`#${child.id}`}
                      onClick={onNavigate}
                      className="block rounded-md px-3 py-1.5 text-[12px] leading-snug transition-colors duration-200 hover:bg-[var(--sidebar-active-bg)]"
                      style={{ color: "var(--muted)" }}
                    >
                      {child.text}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function DocsNavigation({ tabs, activeTab, headings, title }: DocsNavigationProps) {
  const currentTab = tabs.find((t) => t.tab === activeTab);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!currentTab) return null;

  return (
    <>
      <div
        className="fixed inset-x-0 top-0 z-40 flex items-center justify-between gap-3 border-b px-4 py-3 md:hidden"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--header-bg)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer hover:bg-[var(--card-hover-bg)]"
            style={{ color: "var(--foreground)" }}
            aria-label="Open docs sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 text-[15px] font-semibold tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            <LogoMark className="h-5 w-5 shrink-0" style={{ color: "var(--foreground)" }} />
            <span className="truncate">{SITE_NAME}</span>
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-1">
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

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <button
            type="button"
            aria-label="Close sidebar"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="absolute left-0 top-0 h-full w-[86vw] max-w-sm overflow-y-auto border-r bg-[var(--background)] px-4 py-4 shadow-2xl"
            style={{ borderColor: "var(--border)" }}
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <Link href="/" className="flex items-center gap-2 text-sm font-semibold">
                <LogoMark className="h-5 w-5 shrink-0" style={{ color: "var(--foreground)" }} />
                <span style={{ color: "var(--foreground)" }}>{SITE_NAME}</span>
              </Link>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer hover:bg-[var(--card-hover-bg)]"
                style={{ color: "var(--foreground)" }}
                onClick={() => setMobileOpen(false)}
                aria-label="Close docs sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <div
                className="text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--muted)" }}
              >
                Sections
              </div>
              <nav className="mt-3 grid grid-cols-2 gap-2" aria-label="Site sections">
                {NAV_TABS.map((tab) => {
                  const isActive = tab.label === activeTab;

                  return (
                    <Link
                      key={tab.label}
                      href={tab.href}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-xl border px-3 py-2 text-[13px] font-medium transition-colors duration-200"
                      style={{
                        borderColor: isActive ? "var(--accent)" : "var(--border)",
                        backgroundColor: isActive ? "var(--sidebar-active-bg)" : "transparent",
                        color: isActive ? "var(--sidebar-active-text)" : "var(--foreground)",
                      }}
                    >
                      {tab.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="mb-4 border-t pt-4" style={{ borderColor: "var(--border)" }}>
              <div
                className="text-[11px] font-semibold uppercase tracking-widest"
                style={{ color: "var(--muted)" }}
              >
                Current page
              </div>
              <div className="mt-1 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                {title}
              </div>
            </div>

            <div className="mb-4 flex items-center gap-1">
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

            <div className="space-y-4">
              <div>
                <div
                  className="px-3 text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--muted)" }}
                >
                  {activeTab} navigation
                </div>
                <div className="mt-2">
                  {currentTab.pages?.map((group) => (
                    <GroupSection
                      key={group.group}
                      group={group.group}
                      pages={group.pages}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  ))}
                  {currentTab.versions?.map((ver) => (
                    <GroupSection
                      key={ver.version}
                      group={ver.version}
                      pages={ver.pages}
                      onNavigate={() => setMobileOpen(false)}
                    />
                  ))}
                </div>
              </div>

              <div className="border-t pt-4" style={{ borderColor: "var(--border)" }}>
                <TocList headings={headings} onNavigate={() => setMobileOpen(false)} />
              </div>
            </div>
          </aside>
        </div>
      )}

      <aside
        className="hidden h-full w-60 shrink-0 overflow-y-auto border-r py-6 pr-2 lg:col-start-1 lg:block"
        style={{ borderColor: "var(--border)" }}
      >
        {currentTab.pages?.map((group) => (
          <GroupSection key={group.group} group={group.group} pages={group.pages} />
        ))}
        {currentTab.versions?.map((ver) => (
          <GroupSection key={ver.version} group={ver.version} pages={ver.pages} />
        ))}
      </aside>

      <aside
        className="fixed right-6 top-24 hidden h-[calc(100vh-7rem)] w-64 overflow-y-auto rounded-2xl border bg-[var(--background)] px-4 py-4 shadow-lg 2xl:block"
        style={{ borderColor: "var(--border)" }}
      >
        <TocList headings={headings} />
      </aside>
    </>
  );
}
