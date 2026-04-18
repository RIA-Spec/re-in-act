"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { NavTab, NavPage } from "@/lib/navigation";

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

function GroupSection({ group, pages }: { group: string; pages: NavPage[] }) {
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

function TocList({ headings }: { headings: Heading[] }) {
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
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className="fixed bottom-4 left-4 z-30 flex items-center gap-2 rounded-full border bg-[var(--background)] px-4 py-3 text-sm font-medium shadow-lg md:hidden"
        style={{ borderColor: "var(--border)" }}
        aria-label="Open docs sidebar"
      >
        <Menu className="h-4 w-4" />
        Sidebar
      </button>

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
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div
                  className="text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--muted)" }}
                >
                  Docs sidebar
                </div>
                <div className="mt-1 text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  {title}
                </div>
              </div>
              <button
                type="button"
                className="rounded-md border p-2"
                style={{ borderColor: "var(--border)" }}
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <div
                  className="px-3 text-[11px] font-semibold uppercase tracking-widest"
                  style={{ color: "var(--muted)" }}
                >
                  Docs navigation
                </div>
                <div className="mt-2">
                  {currentTab.pages?.map((group) => (
                    <GroupSection key={group.group} group={group.group} pages={group.pages} />
                  ))}
                  {currentTab.versions?.map((ver) => (
                    <GroupSection key={ver.version} group={ver.version} pages={ver.pages} />
                  ))}
                </div>
              </div>

              <div className="border-t pt-4" style={{ borderColor: "var(--border)" }}>
                <TocList headings={headings} />
              </div>
            </div>
          </aside>
        </div>
      )}

      <aside
        className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r py-6 pr-2 lg:col-start-1 lg:block"
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
