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
        title="Action Execution Runtimes"
        sub="AER defines the action-phase execution context: script-driven control flow or shell pipelines, both using the same interface contract."
      />

      {/* ── 1. Code AER ── */}
      <div className="mt-12 mb-8 border-b pb-4" style={{ borderColor: "var(--border)" }}>
        <h3 className="text-xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
          Code AER (Python / TS)
        </h3>
        <p className="text-[14px] mt-1.5 leading-relaxed" style={{ color: "var(--muted)" }}>
          Deterministic orchestration in scripts: branches, loops, and validation happen in code,
          while `reason()` provides local adaptive decisions inside execution.
        </p>
      </div>

      {/* ── Source + Execution Flow ── */}
      <motion.div
        className="mt-12 flex w-full flex-col lg:flex-row items-stretch gap-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Left — Python source code */}
        <div className="flex flex-col lg:w-7/12">
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

        {/* Right — Execution flowchart */}
        <div className="flex flex-col lg:w-5/12">
          <div className="mb-2 flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span
              className="font-mono text-[11px] font-medium uppercase tracking-wider"
              style={{ color: "var(--muted)" }}
            >
              Execution Flow
            </span>
          </div>
          <div
            className="flex-1 overflow-hidden rounded-xl border"
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
            <div className="p-4 h-full min-h-[320px] lg:min-h-0 flex items-center justify-center bg-[var(--pre-bg)]">
              <div className="w-full h-full flex items-center justify-center">
                <Flowchart />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 2. Bash AER ── */}
      <div className="mt-28 mb-8 border-b pb-4" style={{ borderColor: "var(--border)" }}>
        <h3 className="text-xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
          Bash AER Pipeline
        </h3>
        <p className="text-[14px] mt-1.5 leading-relaxed" style={{ color: "var(--muted)" }}>
          Unix-style pipelines compose `reason` and `act` in a single action phase, with explicit
          data flow between steps.
        </p>
      </div>

      <NetworkPulse />
    </Section>
  );
}
