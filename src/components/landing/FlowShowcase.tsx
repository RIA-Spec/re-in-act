"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader, IndexLabel, stagger, staggerChild } from "./shared";

/* ────────────────────────────────────────────
   01 — reason() interface schema
   ──────────────────────────────────────────── */

const reasonFields: { key: string; type: string; value: string; note?: string }[] = [
  {
    key: "prompt",
    type: "string | list",
    value: '"Goal: assess build. Observation: ... Constraints: ..."',
    note: "goal + observation + context + constraints",
  },
  {
    key: "example_output",
    type: "Any",
    value: '{"success": false, "reason": ""}',
    note: "schema hint",
  },
  {
    key: "→ data",
    type: "T",
    value: '{"success": true, "reason": "..."}',
    note: "structured result",
  },
  {
    key: "→ error",
    type: "string",
    value: '"validation failed after 3 retries"',
    note: "on failure",
  },
];

function ReasonSchema() {
  return (
    <motion.div
      className="overflow-hidden rounded-xl border font-mono text-[13px] leading-relaxed"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--card-bg)" }}
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        className="px-5 pt-4 font-semibold text-[11px] tracking-widest uppercase"
        style={{ color: "var(--accent)" }}
        variants={staggerChild}
      >
        reason ( prompt, example_output )
      </motion.div>

      <motion.div
        className="px-5 pt-2 pb-1"
        style={{ color: "var(--muted)" }}
        variants={staggerChild}
      >
        {"{"}
      </motion.div>

      {reasonFields.map(({ key, type, value, note }, i) => (
        <motion.div
          key={key}
          className="group flex items-baseline gap-0 px-5 py-[5px] transition-colors duration-150 hover:bg-[var(--accent-muted)]"
          variants={staggerChild}
        >
          <span
            className="w-7 shrink-0 select-none text-right text-[11px] tabular-nums"
            style={{ color: "var(--muted)" }}
          >
            {i + 1}
          </span>
          <span
            className="ml-4"
            style={{ color: key.startsWith("→") ? "var(--accent)" : "var(--accent-alt)" }}
          >
            &quot;{key}&quot;
          </span>
          <span style={{ color: "var(--muted)" }}>:&nbsp;</span>
          <span style={{ color: "var(--foreground)" }}>{value}</span>
          {i < reasonFields.length - 1 && <span style={{ color: "var(--muted)" }}>,</span>}
          {note && (
            <span className="ml-4 text-[11px] italic" style={{ color: "var(--muted)" }}>
              // {note}
            </span>
          )}
          <span
            className="ml-auto hidden text-[10px] uppercase tracking-wider group-hover:inline"
            style={{ color: "var(--accent)" }}
          >
            {type}
          </span>
        </motion.div>
      ))}

      <motion.div className="px-5 pb-4" style={{ color: "var(--muted)" }} variants={staggerChild}>
        {"}"}
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   02 — act() interface (optional)
   ──────────────────────────────────────────── */

const actFields: { name: string; desc: string; level: "MUST" | "OPTIONAL" }[] = [
  {
    name: "name",
    desc: "Tool identifier — MCP tool, custom function, bash command, etc.",
    level: "MUST",
  },
  {
    name: "args",
    desc: "Complete tool arguments. Stateless — include all needed context.",
    level: "MUST",
  },
];

function ActInterface() {
  return (
    <motion.div
      className="font-mono text-[12px]"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <motion.div
        className="mb-3 rounded-lg border px-4 py-2.5 text-[11px] leading-relaxed"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--card-bg)",
          color: "var(--muted)",
        }}
        variants={staggerChild}
      >
        <span className="font-semibold" style={{ color: "var(--accent)" }}>
          act()
        </span>{" "}
        is <span style={{ color: "var(--foreground)" }}>optional</span> — the spec provides it as a
        standard convenience. You may use any user-defined action execution strategy instead.
      </motion.div>

      {actFields.map(({ name, desc, level }, i) => (
        <motion.div
          key={name}
          className="flex items-center gap-4 py-3.5"
          style={{ borderColor: "var(--border)", borderTopWidth: i > 0 ? 1 : 0 }}
          variants={staggerChild}
        >
          <span
            className="shrink-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: "var(--accent-muted)",
              color: "var(--accent)",
              border: "1px solid var(--accent)",
            }}
          >
            {level}
          </span>
          <span className="font-semibold" style={{ color: "var(--foreground)" }}>
            {name}
          </span>
          <span style={{ color: "var(--muted)" }}>{desc}</span>
        </motion.div>
      ))}

      <motion.div
        className="mt-4 rounded-lg border px-4 py-2 font-mono text-[11px]"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--card-bg)" }}
        variants={staggerChild}
      >
        <span style={{ color: "var(--muted)" }}>returns → </span>
        <span style={{ color: "var(--accent)" }}>&quot;content&quot;</span>
        <span style={{ color: "var(--muted)" }}>
          : [{"{"}type, text{"}"}],&nbsp;
        </span>
        <span style={{ color: "var(--accent-alt)" }}>&quot;isError&quot;</span>
        <span style={{ color: "var(--muted)" }}>: bool</span>
      </motion.div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Composed export
   ──────────────────────────────────────────── */

export function Interfaces() {
  return (
    <Section>
      <SectionHeader
        title="The Interfaces"
        sub="Two simple interfaces: one for local judgment, one for external action."
      />

      <div className="mb-16">
        <IndexLabel
          index="01"
          title="reason(prompt, example_output)"
          sub="Turns goal plus local reality into structured output that the RAS can use right away."
        />
        <ReasonSchema />
      </div>

      <div>
        <IndexLabel
          index="02"
          title="act(name, args) — Optional"
          sub="Calls tools or external systems with explicit arguments, returning structured output and errors."
        />
        <ActInterface />
      </div>
    </Section>
  );
}
