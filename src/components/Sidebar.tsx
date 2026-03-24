"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { NavTab, NavPage, NavGroup, NavVersion } from "@/lib/navigation";

interface SidebarProps {
  tabs: NavTab[];
  activeTab: string;
}

function GroupSection({ group, pages }: { group: string; pages: NavPage[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  return (
    <div className="mb-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-3 py-1 text-[11px] font-semibold uppercase tracking-widest transition-colors duration-200 cursor-pointer"
        style={{ color: "var(--muted)" }}
      >
        {group}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? "" : "-rotate-90"}`}
        />
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

export function Sidebar({ tabs, activeTab }: SidebarProps) {
  const currentTab = tabs.find((t) => t.tab === activeTab);
  if (!currentTab) return null;

  return (
    <aside
      className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-60 shrink-0 overflow-y-auto border-r py-6 pr-2 lg:block"
      style={{ borderColor: "var(--border)" }}
    >
      {currentTab.pages?.map((group) => (
        <GroupSection key={group.group} group={group.group} pages={group.pages} />
      ))}
      {currentTab.versions?.map((ver) => (
        <GroupSection key={ver.version} group={ver.version} pages={ver.pages} />
      ))}
    </aside>
  );
}
