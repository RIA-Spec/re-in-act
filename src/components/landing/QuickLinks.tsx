"use client";

import { motion } from "framer-motion";
import { BookOpen, FileText, Lightbulb, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { NAV_TABS } from "@/lib/constants";
import { Section, SectionHeader, stagger, staggerChild } from "./shared";

/* ────────────────────────────────────────────
   Data
   ──────────────────────────────────────────── */

interface QuickLink {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const links: QuickLink[] = [
  {
    title: "Documentation",
    description: "Understand the Cerebellum design: RAS, reason(), act(), and how to get started.",
    href: NAV_TABS[0].href,
    icon: BookOpen,
  },
  {
    title: "Specification",
    description: "Read the formal Re in Act draft specification in full.",
    href: NAV_TABS[1].href,
    icon: FileText,
  },
  {
    title: "Proposals",
    description: "Browse and submit spec change proposals.",
    href: NAV_TABS[2].href,
    icon: Lightbulb,
  },
  {
    title: "Community",
    description: "Contribute, discuss, and shape Re in Act.",
    href: NAV_TABS[3].href,
    icon: Users,
  },
];

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

export function QuickLinks() {
  return (
    <Section>
      <SectionHeader title="Explore" sub="Everything you need to get started with Re in Act." />

      <motion.div
        className="grid gap-3 sm:grid-cols-2"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {links.map(({ title, description, href, icon: Icon }) => (
          <motion.div key={title} variants={staggerChild}>
            <Link
              href={href}
              className="group flex items-start gap-4 rounded-xl border p-5 transition-colors duration-200 cursor-pointer hover:bg-[var(--card-hover-bg)]"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--card-bg)" }}
            >
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: "var(--accent-muted)", color: "var(--accent)" }}
              >
                <Icon className="h-[18px] w-[18px]" />
              </div>
              <div className="min-w-0 flex-1">
                <h3
                  className="mb-0.5 text-[14px] font-semibold transition-colors duration-200 group-hover:text-[var(--accent)]"
                  style={{ color: "var(--foreground)" }}
                >
                  {title}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
                  {description}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
