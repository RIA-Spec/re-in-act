"use client";

import { type ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

/* ─── Tabs ─── */
interface TabsProps {
  items: string[];
  children: ReactNode[];
}

export function ClientTabs({ items, children }: TabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="my-4">
      <div className="flex gap-0 border-b" style={{ borderColor: "var(--border)" }}>
        {items.map((label, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
              i === active
                ? "text-[var(--accent)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {label}
            {i === active && (
              <span
                className="absolute inset-x-0 -bottom-px h-[2px]"
                style={{ backgroundColor: "var(--accent)" }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="pt-4">{Array.isArray(children) ? children[active] : children}</div>
    </div>
  );
}

/* ─── Accordion ─── */
interface AccordionProps {
  title: string;
  children: ReactNode;
}

export function ClientAccordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="my-2 overflow-hidden rounded-lg border"
      style={{ borderColor: "var(--border)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors duration-200 cursor-pointer"
        style={{ color: "var(--foreground)" }}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--muted)" }}
        />
      </button>
      {open && (
        <div
          className="border-t px-4 py-3 text-sm leading-relaxed"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
