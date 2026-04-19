"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "./shared";
import { CodePanel } from "./CodePanel";
import { Flowchart } from "./flowchart";
import { NetworkPulse } from "./NetworkPulse";

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

export function FlowDemo() {
  return (
    <Section>
      <SectionHeader
        title="Reason-able Action Spaces"
        sub="What the RAS looks like in practice: multiple act() and reason() steps cooperating inside one RAS."
      />

      {/* ── 1. Code Reason-able Action Space ── */}
      <div className="mt-12 mb-8 border-b pb-4" style={{ borderColor: "var(--border)" }}>
        <h3 className="text-xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
          Code Reason-able Action Space (Python / TS)
        </h3>
        <p className="text-[14px] mt-1.5 leading-relaxed" style={{ color: "var(--muted)" }}>
          Deterministic orchestration in scripts: branches, loops, retries, and validation happen in
          code, while `reason()` supplies bounded judgments. That gives the runtime Turing-complete
          deterministic control instead of probabilistic LLM-stepped control.
        </p>
      </div>

      {/* ── Action Flow + Source ── */}
      <motion.div
        className="mt-12 grid w-full grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)]"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left — Python source code */}
        <div className="flex h-full flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span
              className="font-mono text-[11px] font-medium uppercase tracking-wider"
              style={{ color: "var(--muted)" }}
            >
              Source
            </span>
          </div>
          <CodePanel />
        </div>

        {/* Right — Action flowchart */}
        <div className="flex h-full flex-col">
          <div className="mb-2 flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span
              className="font-mono text-[11px] font-medium uppercase tracking-wider"
              style={{ color: "var(--muted)" }}
            >
              Action Flow
            </span>
          </div>
          <div
            className="flex h-full flex-col overflow-hidden rounded-xl border"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface-elevated)",
            }}
          >
            <div
              className="flex items-center gap-2 border-b px-4 py-2.5"
              style={{ borderColor: "var(--border)" }}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              <span className="ml-3 font-mono text-[11px]" style={{ color: "var(--muted)" }}>
                flowchart
              </span>
            </div>
            <div className="flex min-h-[320px] flex-1 bg-[var(--pre-bg)] p-4 md:min-h-[360px]">
              <div className="flex h-full w-full items-center justify-center">
                <Flowchart />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 2. Bash Reason-able Action Space ── */}
      <div className="mt-28 mb-8 border-b pb-4" style={{ borderColor: "var(--border)" }}>
        <h3 className="text-xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
          Bash Reason-able Action Space
        </h3>
        <p className="text-[14px] mt-1.5 leading-relaxed" style={{ color: "var(--muted)" }}>
          Unix-style pipelines compose `reason` and `act` in a single action phase. Shell gives you
          deterministic, Turing-complete control flow, while the LLM stays confined to bounded local
          judgments.
        </p>
      </div>

      <NetworkPulse />
    </Section>
  );
}
