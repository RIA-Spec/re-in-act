"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Section, SectionHeader, fade, stagger, staggerChild } from "./shared";

const STEPS = [
  {
    label: "Agent Extension",
    title: "Delegated agent work",
    body: "When the optional agent() extension is present, the RAS can host delegated agent work inside one bounded action space instead of turning that delegation into a separate top-level architecture.",
  },
  {
    label: "Local Check",
    title: "Post-agent verification",
    body: "In this pattern, reason() is not acting as an agent. It checks both text and trajectory returned by agent(), extracts the signal that matters, and turns it into structured control data.",
  },
  {
    label: "Runtime Control",
    title: "Deterministic boundaries",
    body: "Loops, max iterations, timeout, escalation, and stop conditions live in the runtime. That is what makes the RAS the harness for agent() rather than just another prompt wrapper.",
  },
] as const;

export function RASHarness() {
  return (
    <Section>
      <SectionHeader
        title="RAS as Harness"
        sub="When the optional agent() extension is used, the RAS is the harness: agent() does delegated work inside it, and the RAS keeps that work explicit, bounded, and auditable."
      />

      <motion.div
        className="overflow-hidden rounded-2xl border"
        style={{
          borderColor: "var(--border)",
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--surface-elevated) 88%, transparent), color-mix(in oklab, var(--card-bg) 94%, transparent))",
        }}
        {...fade}
      >
        <div className="border-b px-5 py-4 sm:px-6" style={{ borderColor: "var(--border)" }}>
          <div className="mb-2 flex items-center gap-2">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: "var(--accent)" }}
            />
            <span
              className="font-mono text-[11px] font-medium uppercase tracking-wider"
              style={{ color: "var(--muted)" }}
            >
              Agent Harness Model
            </span>
          </div>
          <p
            className="max-w-[44rem] text-[14px] leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            This is specifically the agent extension pattern: agent() runs delegated work inside the
            RAS, returns text and trajectory, reason() verifies those signals inside the RAS, and
            deterministic limits are enforced inside the RAS.
          </p>
        </div>

        <motion.div
          className="grid gap-px sm:grid-cols-3"
          style={{ backgroundColor: "var(--border)" }}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {STEPS.map((step, index) => (
            <motion.div
              key={step.label}
              className="h-full px-5 py-5 sm:px-6"
              style={{ backgroundColor: "var(--card-bg)" }}
              variants={staggerChild}
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] font-semibold"
                  style={{
                    color: "var(--accent)",
                    backgroundColor: "var(--accent-muted)",
                  }}
                >
                  0{index + 1}
                </span>
                <span
                  className="font-mono text-[11px] font-medium uppercase tracking-wider"
                  style={{ color: "var(--muted)" }}
                >
                  {step.label}
                </span>
              </div>
              <h3
                className="mb-2 text-[16px] font-semibold tracking-tight"
                style={{ color: "var(--foreground)" }}
              >
                {step.title}
              </h3>
              <p className="text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.p
        className="mt-6 text-[13px] leading-relaxed"
        style={{ color: "var(--muted)" }}
        {...fade}
      >
        This harness framing belongs to the optional <code>agent()</code> extension. The point is
        not that <code>reason()</code> is agent-related by itself, but that once{" "}
        <code>agent()</code>
        is introduced, the RAS becomes the harness that contains delegated work, verification, and
        escalation. See{" "}
        <Link href="/extensions/agent-interface" className="underline underline-offset-4">
          Agent Interface Extension
        </Link>
        . For related harness terminology in long-running agent systems, see{" "}
        <a
          href="https://www.anthropic.com/engineering/harness-design-long-running-apps"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-4"
        >
          Harness design for long-running apps
        </a>
        .
      </motion.p>
    </Section>
  );
}
