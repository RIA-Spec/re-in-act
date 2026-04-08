"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/* ────────────────────────────────────────────
  Re in Act — action stays local
   ──────────────────────────────────────────── */

const CODE_LINES = [
  { text: "test_run = await act('bash', 'npm test -- --reporter json')", cls: "act" },
  { text: "", cls: "" },
  { text: "focus = await reason(", cls: "kw" },
  { text: "    [goal, observation, context, constraints],", cls: "" },
  { text: '    {"retry_cmd": "", "reason": ""},', cls: "" },
  { text: ")", cls: "kw" },
  { text: "", cls: "" },
  { text: "retry_run = await act('bash', focus['data']['retry_cmd'])", cls: "act" },
  { text: "decision = await reason(", cls: "kw" },
  { text: "    [goal, observation, context, constraints],", cls: "" },
  { text: '    {"action": "continue", "reason": ""},', cls: "" },
  { text: ")", cls: "kw" },
  { text: "if decision['data']['action'] == 'escalate':", cls: "kw" },
  { text: "    await act('notify', {'message': decision['data']['reason']})", cls: "act" },
  { text: "else:", cls: "kw" },
  { text: "    await act('deploy', {'target': 'production'})", cls: "act" },
];

function CodeLine({ text, cls }: { text: string; cls: string }) {
  if (text === "") {
    return <span className="block h-[1.6em]">{"\u00A0"}</span>;
  }

  const colorClass =
    cls === "kw"
      ? "text-[var(--accent)]"
      : cls === "cmt"
        ? "opacity-40"
        : cls === "act"
          ? "text-[var(--accent-alt)]"
          : "";

  return (
    <span className="block break-words whitespace-pre-wrap">
      <span className={colorClass}>{text}</span>
    </span>
  );
}

/* ────────────────────────────────────────────
   Component
   ──────────────────────────────────────────── */

export function CodePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-xl border h-full flex flex-col"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--surface-elevated)" }}
    >
      {/* Editor header */}
      <div
        className="flex items-center gap-2 border-b px-4 py-2.5"
        style={{ borderColor: "var(--border)" }}
      >
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 font-mono text-[11px]" style={{ color: "var(--muted)" }}>
          build_analyzer.py
        </span>
      </div>

      {/* Code body */}
      <pre
        className="flex-1 p-4 font-mono text-[12.5px] leading-[1.7] overflow-auto whitespace-pre-wrap break-words"
        style={{ backgroundColor: "var(--pre-bg)", color: "var(--foreground)" }}
      >
        {CODE_LINES.map((line, i) => (
          <motion.span
            key={i}
            className="flex min-w-0"
            initial={{ opacity: 0, y: 4 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.18, delay: i * 0.035, ease: "easeOut" }}
          >
            <span
              className="inline-block w-6 shrink-0 select-none text-right mr-3 tabular-nums"
              style={{ color: "var(--muted)", opacity: 0.4 }}
            >
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <CodeLine text={line.text} cls={line.cls} />
            </div>
          </motion.span>
        ))}
      </pre>
    </div>
  );
}
