"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/* ────────────────────────────────────────────
   Design tokens — single source of truth
   ──────────────────────────────────────────── */

const SECTION_MAX_W = "max-w-2xl";
const SECTION_PX = "px-6";
const SECTION_PY = "py-24";

/* ────────────────────────────────────────────
   Animation presets
   ──────────────────────────────────────────── */

export const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 as const },
  transition: { duration: 0.45, ease: "easeOut" as const },
};

export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const staggerChild = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

/* ────────────────────────────────────────────
   Section wrapper — consistent spacing & width
   ──────────────────────────────────────────── */

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`mx-auto ${SECTION_MAX_W} ${SECTION_PX} ${SECTION_PY} ${className}`}>
      {children}
    </section>
  );
}

/* ────────────────────────────────────────────
   Section header — title + subtitle, consistent style
   ──────────────────────────────────────────── */

export function SectionHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <motion.div className="mb-14" {...fade}>
      <h2
        className="mb-2 text-xl font-bold tracking-tight sm:text-2xl"
        style={{ color: "var(--foreground)" }}
      >
        {title}
      </h2>
      <p className="text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
        {sub}
      </p>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Indexed label — for numbered sub-sections
   ──────────────────────────────────────────── */

export function IndexLabel({ index, title, sub }: { index: string; title: string; sub: string }) {
  return (
    <motion.div className="mb-6" {...fade}>
      <div className="mb-1.5 flex items-baseline gap-2.5">
        <span
          className="font-mono text-[11px] font-bold tabular-nums"
          style={{ color: "var(--accent)" }}
        >
          {index}
        </span>
        <h3 className="text-lg font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
          {title}
        </h3>
      </div>
      <p className="text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
        {sub}
      </p>
    </motion.div>
  );
}
