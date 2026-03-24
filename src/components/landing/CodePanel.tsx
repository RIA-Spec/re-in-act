"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

/* ────────────────────────────────────────────
   Re in Act — discover_tools pseudo-code
   ──────────────────────────────────────────── */

const CODE_LINES = [
  { text: "# Build analyzer — Re in Act AER", cls: "cmt" },
  { text: "log = open('build.log').read()", cls: "" },
  { text: "", cls: "" },
  { text: "analysis = await reason(", cls: "kw" },
  { text: "    log + 'Success?',", cls: "" },
  { text: "    '{\"success\": false}'", cls: "" },
  { text: ")", cls: "kw" },
  { text: "", cls: "" },
  { text: "if analysis['success']:", cls: "kw" },
  { text: "    act('deploy', 'to prod')", cls: "act" },
  { text: "else:", cls: "kw" },
  { text: "    act('notify', 'on failure')", cls: "act" },
];

/* ────────────────────────────────────────────
   Typewriter hook
   ──────────────────────────────────────────── */

function useTypewriter(text: string, delay: number, enabled: boolean, speed = 40) {
  const count = useMotionValue(0);
  const display = useTransform(count, (v) => text.slice(0, Math.round(v)));

  useEffect(() => {
    if (!enabled || text.length === 0) return;
    let ctrl: ReturnType<typeof animate> | undefined;
    const t = setTimeout(() => {
      ctrl = animate(count, text.length, {
        type: "tween",
        duration: text.length / speed,
        ease: "linear",
      });
    }, delay);
    return () => {
      clearTimeout(t);
      ctrl?.stop();
    };
  }, [count, text.length, delay, speed, enabled]);

  return display;
}

function TypewriterCodeLine({
  text,
  delay,
  enabled,
  cls,
}: {
  text: string;
  delay: number;
  enabled: boolean;
  cls: string;
}) {
  const display = useTypewriter(text, delay, enabled);

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
      <motion.span className={colorClass}>{display}</motion.span>
    </span>
  );
}

/* ────────────────────────────────────────────
   Pre-compute cumulative delays
   ──────────────────────────────────────────── */

const lineDelays = CODE_LINES.reduce<number[]>((acc, line, i) => {
  if (i === 0) {
    acc.push(0);
  } else {
    const prevLen = CODE_LINES[i - 1].text.length || 1;
    acc.push(acc[i - 1] + (prevLen / 40) * 1000 + 180);
  }
  return acc;
}, []);

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
          <span key={i} className="flex min-w-0">
            <span
              className="inline-block w-6 shrink-0 select-none text-right mr-3 tabular-nums"
              style={{ color: "var(--muted)", opacity: 0.4 }}
            >
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <TypewriterCodeLine
                text={line.text}
                delay={lineDelays[i]}
                enabled={isInView}
                cls={line.cls}
              />
            </div>
          </span>
        ))}
      </pre>
    </div>
  );
}
