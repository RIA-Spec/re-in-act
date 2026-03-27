"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader, IndexLabel, fade } from "./shared";

const MONO = "var(--font-mono)";
const SANS = "var(--font-sans)";

const PARADIGM_SHIFT_COMPARISONS: Array<{
  from: string;
  to: string;
  bold?: boolean;
}> = [
  {
    from: "Low-Variety Action Interface",
    to: "RAS Expands Local Action Variety",
    bold: true,
  },
  {
    from: "Round-Trip Tax (Reason-Act-Observe)",
    to: "One Delegated Action Phase",
  },
  {
    from: "Context Bloat from Intermediate Observations",
    to: "Intermediate State Stays in RAS",
  },
  {
    from: "Probabilistic Micro-Control Flow",
    to: "Deterministic Runtime Control Flow",
  },
  {
    from: "No Local Internal Model at Action Layer",
    to: "Feedback-Capable Local Regulator",
  },
] as const;

/* ────────────────────────────────────────────
   01 — Paradigm Shift: ReAct vs Re in Act
   Side-by-side sequence comparison
   ──────────────────────────────────────────── */

function ParadigmShift() {
  const W = 560;
  const H = 220;

  // ReAct side
  const reactSteps = [
    { label: "Reason + Act", type: "agent" },
    { label: "Observe", type: "env" },
    { label: "Reason + Act", type: "agent" },
    { label: "Observe", type: "env" },
  ];

  return (
    <motion.div
      className="overflow-hidden rounded-xl border relative group"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--card-bg)",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
      {...fade}
    >
      <div className="absolute top-3 left-6 flex items-center gap-1.5 opacity-50">
        <div className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
        <span
          className="font-mono text-[9px] uppercase tracking-widest"
          style={{ color: "#ef4444" }}
        >
          Legacy
        </span>
      </div>
      <div className="absolute top-3 right-6 flex items-center gap-1.5">
        <div
          className="h-1.5 w-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: "var(--accent)" }}
        />
        <span
          className="font-mono text-[9px] uppercase tracking-widest"
          style={{ color: "var(--accent)" }}
        >
          Modern
        </span>
      </div>

      <svg
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        fill="none"
        aria-hidden="true"
        className="p-4 sm:p-0"
      >
        <defs>
          <filter id="ria-glow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <linearGradient id="react-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
          <marker id="arr-react" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <path d="M0,0 L5,2 L0,4" fill="none" stroke="#ef4444" strokeWidth="1" />
          </marker>
          <marker id="arr-ria" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <path d="M0,0 L5,2 L0,4" fill="none" stroke="var(--accent)" strokeWidth="1" />
          </marker>
        </defs>

        {/* ── Vertical divider ── */}
        <line
          x1={280}
          y1={20}
          x2={280}
          y2={H - 20}
          stroke="var(--border)"
          strokeWidth={1}
          strokeDasharray="4 4"
        />

        {/* ══════ LEFT: ReAct ══════ */}
        <g transform="translate(30, 0)">
          <text
            x={110}
            y={28}
            textAnchor="middle"
            fill="#ef4444"
            fontSize={12}
            fontFamily={MONO}
            fontWeight={700}
          >
            ReAct
          </text>

          {/* Lifelines */}
          <line
            x1={40}
            y1={50}
            x2={40}
            y2={H - 30}
            stroke="var(--border)"
            strokeWidth={1}
            strokeDasharray="2 2"
          />
          <line
            x1={180}
            y1={50}
            x2={180}
            y2={H - 30}
            stroke="var(--border)"
            strokeWidth={1}
            strokeDasharray="2 2"
          />

          {/* Headers */}
          <rect
            x={15}
            y={50}
            width={50}
            height={20}
            rx={4}
            fill="#ef4444"
            fillOpacity={0.1}
            stroke="#ef4444"
            strokeWidth={1}
          />
          <text x={40} y={63} textAnchor="middle" fill="#ef4444" fontSize={9} fontWeight={600}>
            Agent
          </text>
          <rect
            x={155}
            y={50}
            width={50}
            height={20}
            rx={4}
            fill="var(--surface)"
            stroke="var(--border)"
            strokeWidth={1}
          />
          <text
            x={180}
            y={63}
            textAnchor="middle"
            fill="var(--muted)"
            fontSize={9}
            fontWeight={600}
          >
            Env
          </text>

          {/* Sequential Arrows */}
          {reactSteps.map((step, i) => (
            <motion.g
              key={i}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.4 + 0.5, duration: 0.3 }}
            >
              <line
                x1={step.type === "agent" ? 45 : 175}
                y1={85 + i * 28}
                x2={step.type === "agent" ? 175 : 45}
                y2={85 + i * 28}
                stroke="#ef4444"
                strokeWidth={1}
                markerEnd="url(#arr-react)"
              />
              <text
                x={110}
                y={82 + i * 28}
                textAnchor="middle"
                fill="#ef4444"
                fillOpacity={0.6}
                fontSize={8}
                fontFamily={MONO}
              >
                {step.label}
              </text>
            </motion.g>
          ))}

          <motion.text
            x={110}
            y={H - 12}
            textAnchor="middle"
            fill="#ef4444"
            fontSize={10}
            fontFamily={MONO}
            fontWeight={600}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 2.2 }}
          >
            Model-stepped loop
          </motion.text>
        </g>

        {/* ══════ RIGHT: Re in Act ══════ */}
        <g transform="translate(310, 0)">
          <text
            x={110}
            y={28}
            textAnchor="middle"
            fill="var(--accent)"
            fontSize={12}
            fontFamily={MONO}
            fontWeight={700}
          >
            Re in Act
          </text>

          {/* Lifelines */}
          <line
            x1={40}
            y1={50}
            x2={40}
            y2={H - 35}
            stroke="var(--border)"
            strokeWidth={1}
            strokeDasharray="2 2"
          />
          <line
            x1={180}
            y1={50}
            x2={180}
            y2={H - 35}
            stroke="var(--border)"
            strokeWidth={1}
            strokeDasharray="2 2"
          />

          {/* Headers */}
          <rect
            x={15}
            y={50}
            width={50}
            height={20}
            rx={4}
            fill="var(--accent)"
            fillOpacity={0.1}
            stroke="var(--accent)"
            strokeWidth={1}
          />
          <text
            x={40}
            y={63}
            textAnchor="middle"
            fill="var(--accent)"
            fontSize={9}
            fontWeight={600}
          >
            Agent
          </text>
          <rect x={155} y={50} width={50} height={20} rx={4} fill="var(--accent)" fillOpacity={1} />
          <text x={180} y={63} textAnchor="middle" fill="#fff" fontSize={9} fontWeight={700}>
            RAS
          </text>

          {/* Delegate Arrow */}
          <motion.g
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <line
              x1={45}
              y1={85}
              x2={175}
              y2={85}
              stroke="var(--accent)"
              strokeWidth={1.5}
              markerEnd="url(#arr-ria)"
            />
            <text
              x={110}
              y={81}
              textAnchor="middle"
              fill="var(--accent)"
              fontSize={9}
              fontFamily={MONO}
              fontWeight={600}
            >
              delegate
            </text>
          </motion.g>

          {/* RAS Core visualization */}
          <motion.g
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.4 }}
          >
            <rect
              x={155}
              y={95}
              width={50}
              height={60}
              rx={8}
              fill="var(--background)"
              stroke="var(--accent)"
              strokeWidth={1.5}
              filter="url(#ria-glow)"
            />

            {/* Pulsing internal loop */}
            <motion.circle
              cx={180}
              cy={125}
              r={18}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={1}
              strokeDasharray="4 4"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            <g className="font-mono text-[7px] font-bold" fill="var(--accent)">
              <motion.text
                x={180}
                y={120}
                textAnchor="middle"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                reason
              </motion.text>
              <motion.text
                x={180}
                y={135}
                textAnchor="middle"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                act
              </motion.text>
            </g>
          </motion.g>

          {/* Return Arrow */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.3 }}
          >
            <line
              x1={175}
              y1={165}
              x2={45}
              y2={165}
              stroke="var(--muted)"
              strokeWidth={1}
              strokeDasharray="3 3"
              markerEnd="url(#arr-ria)"
            />
            <text
              x={110}
              y={178}
              textAnchor="middle"
              fill="var(--muted)"
              fontSize={9}
              fontFamily={MONO}
            >
              result
            </text>
          </motion.g>

          <motion.text
            x={110}
            y={H - 12}
            textAnchor="middle"
            fill="var(--accent)"
            fontSize={10}
            fontFamily={MONO}
            fontWeight={700}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.8, type: "spring", damping: 10 }}
          >
            Delegated action phase
          </motion.text>
        </g>
      </svg>
    </motion.div>
  );
}

function ParadigmShiftComparisons() {
  return (
    <motion.div
      className="overflow-hidden rounded-xl border text-[11px]"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "rgba(0,0,0,0.02)",
      }}
      {...fade}
    >
      <div className="flex flex-col divide-y divide-[var(--border)]">
        {PARADIGM_SHIFT_COMPARISONS.map((item, index) => (
          <div key={item.from} className="flex flex-col px-6 py-3">
            <div className="flex items-center justify-between">
              <span
                style={{ color: item.bold ? "var(--foreground)" : "var(--muted)" }}
                className={item.bold ? "font-medium" : ""}
              >
                {item.from}
              </span>
              <span className="mx-4 opacity-20">→</span>
              <span
                style={{
                  color: index === 0 ? "var(--foreground)" : "var(--accent)",
                }}
                className="font-bold shrink-0"
              >
                {item.to}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
  02 — RAS Execution Flow (directed graph)
   ──────────────────────────────────────────── */

function RASFlow() {
  const W = 560;
  const H = 200;

  const nodes = [
    { id: "agent", x: 60, y: 100, label: "Agent", w: 76, role: "outer" as const },
    { id: "aer", x: 270, y: 100, label: "RAS Context", w: 110, role: "hub" as const },
    { id: "reason", x: 410, y: 68, label: "reason()", w: 84, role: "fn" as const },
    { id: "act", x: 410, y: 138, label: "act()", w: 84, role: "fn" as const },
    { id: "result", x: 510, y: 100, label: "{ data }", w: 72, role: "data" as const },
  ];

  return (
    <motion.div
      className="overflow-hidden rounded-xl border"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--card-bg)" }}
      {...fade}
    >
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true">
        <defs>
          <marker id="af-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="none" stroke="var(--muted)" strokeWidth="1" />
          </marker>
          <marker id="af-arr-a" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="none" stroke="var(--accent)" strokeWidth="1" />
          </marker>
          <marker
            id="af-arr-alt"
            markerWidth="7"
            markerHeight="5"
            refX="6"
            refY="2.5"
            orient="auto"
          >
            <path d="M0,0 L7,2.5 L0,5" fill="none" stroke="var(--accent-alt)" strokeWidth="1" />
          </marker>
        </defs>

        {/* Agent → RAS */}
        <line
          x1={100}
          y1={100}
          x2={213}
          y2={100}
          stroke="var(--accent)"
          strokeWidth={1.5}
          markerEnd="url(#af-arr-a)"
        />
        <text
          x={157}
          y={92}
          textAnchor="middle"
          fill="var(--accent)"
          fontSize={8}
          fontFamily={MONO}
        >
          task
        </text>

        {/* RAS → reason */}
        <line
          x1={326}
          y1={88}
          x2={366}
          y2={74}
          stroke="var(--accent)"
          strokeWidth={1}
          markerEnd="url(#af-arr-a)"
        />
        {/* RAS → act */}
        <line
          x1={326}
          y1={112}
          x2={366}
          y2={132}
          stroke="var(--accent-alt)"
          strokeWidth={1}
          markerEnd="url(#af-arr-alt)"
        />

        {/* reason → result */}
        <line
          x1={454}
          y1={74}
          x2={472}
          y2={92}
          stroke="var(--muted)"
          strokeWidth={1}
          markerEnd="url(#af-arr)"
        />
        {/* act → result */}
        <line
          x1={454}
          y1={132}
          x2={472}
          y2={110}
          stroke="var(--muted)"
          strokeWidth={1}
          markerEnd="url(#af-arr)"
        />

        {/* Result → Agent (return arc) */}
        <path
          d={`M 510 92 C 510 30, 60 30, 60 88`}
          stroke="var(--muted)"
          strokeWidth={1}
          strokeDasharray="4 3"
          markerEnd="url(#af-arr)"
        />
        <text x={285} y={22} textAnchor="middle" fill="var(--muted)" fontSize={8} fontFamily={MONO}>
          result
        </text>

        {/* Nodes */}
        {nodes.map(({ id, x, y, label, w, role }) => {
          const h = 28;
          const fill =
            role === "hub"
              ? "var(--accent-muted)"
              : role === "fn" && id === "reason"
                ? "var(--accent-muted)"
                : role === "fn"
                  ? "rgba(167,139,250,0.12)"
                  : "var(--card-bg)";
          const stroke =
            role === "hub"
              ? "var(--accent)"
              : role === "fn" && id === "reason"
                ? "var(--accent)"
                : role === "fn"
                  ? "var(--accent-alt)"
                  : "var(--muted)";
          const textFill =
            role === "hub"
              ? "var(--accent)"
              : role === "fn" && id === "reason"
                ? "var(--accent)"
                : role === "fn"
                  ? "var(--accent-alt)"
                  : "var(--foreground)";
          return (
            <g key={id}>
              <rect
                x={x - w / 2}
                y={y - h / 2}
                width={w}
                height={h}
                rx={6}
                fill={fill}
                stroke={stroke}
                strokeWidth={role === "hub" ? 1.5 : 1}
              />
              <text
                x={x}
                y={y + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={textFill}
                fontSize={10}
                fontFamily={MONO}
                fontWeight={600}
              >
                {label}
              </text>
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   03 — Runtime Environments (concentric rects)
   ──────────────────────────────────────────── */

function RuntimeLayers() {
  const W = 600;
  const H = 260;

  return (
    <motion.div
      className="overflow-hidden rounded-xl border p-6 sm:p-8"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--card-bg)" }}
      {...fade}
    >
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true">
        {/* Agent Loop - Outer */}
        <rect
          x={10}
          y={10}
          width={580}
          height={240}
          rx={14}
          fill="none"
          stroke="var(--foreground)"
          strokeWidth={1.5}
        />
        <text
          x={26}
          y={32}
          fill="var(--foreground)"
          fontSize={11}
          fontFamily={MONO}
          fontWeight={600}
        >
          Agent Loop (LLM)
        </text>
        <text x={26} y={48} fill="var(--muted)" fontSize={10} fontFamily={SANS}>
          Orchestrates multiple continuous actions over time
        </text>

        {/* Code RAS - Left */}
        <rect
          x={30}
          y={70}
          width={260}
          height={160}
          rx={12}
          fill="var(--card-bg)"
          stroke="var(--accent)"
          strokeWidth={1}
        />
        <text x={46} y={92} fill="var(--accent)" fontSize={11} fontFamily={MONO} fontWeight={600}>
          Code RAS
        </text>
        <text x={46} y={108} fill="var(--muted)" fontSize={10} fontFamily={SANS}>
          async reason() / act()
        </text>

        {/* Bash RAS - Right */}
        <rect
          x={310}
          y={70}
          width={260}
          height={160}
          rx={12}
          fill="var(--card-bg)"
          stroke="var(--accent)"
          strokeWidth={1}
        />
        <text x={326} y={92} fill="var(--accent)" fontSize={11} fontFamily={MONO} fontWeight={600}>
          Bash RAS
        </text>
        <text x={326} y={108} fill="var(--muted)" fontSize={10} fontFamily={SANS}>
          reason | act | jq | unix pipes
        </text>

        {/* Shared Interfaces - Center spanning both */}
        <rect
          x={50}
          y={145}
          width={500}
          height={70}
          rx={10}
          fill="var(--background)"
          stroke="var(--accent-alt)"
          strokeWidth={1}
          strokeDasharray="4 3"
        />
        <text
          x={66}
          y={165}
          fill="var(--accent-alt)"
          fontSize={11}
          fontFamily={MONO}
          fontWeight={600}
        >
          Shared Interfaces
        </text>
        <text x={66} y={181} fill="var(--muted)" fontSize={10} fontFamily={MONO}>
          reason(prompt, example) · act(name, args)
        </text>
        <text x={66} y={198} fill="var(--muted)" fontSize={10} fontFamily={SANS}>
          Guaranteed compatibility across both runtime flavors
        </text>
      </svg>
    </motion.div>
  );
}

/* ────────────────────────────────────────────
   Composed export
   ──────────────────────────────────────────── */

export function DataGraphs() {
  return (
    <Section>
      <SectionHeader
        title="From ReAct to Re in Act"
        sub="How the paradigm shift works — from protocol to execution model."
      />

      <div className="mb-16">
        <IndexLabel
          index="01"
          title="Paradigm Shift"
          sub="ReAct keeps reasoning and acting in the outer loop. Re in Act delegates one action phase and lets local reasoning happen inside execution."
        />
        <div className="space-y-4">
          <ParadigmShift />
          <ParadigmShiftComparisons />
        </div>
      </div>

      <div className="mb-16">
        <IndexLabel
          index="02"
          title="RAS Architecture"
          sub="The main agent delegates once; the action context composes reason() and act() under a stable runtime contract."
        />
        <RASFlow />
      </div>

      <div>
        <IndexLabel
          index="03"
          title="Runtime Environments"
          sub="Script and shell flavors share the same interface semantics, so behavior stays portable across environments."
        />
        <RuntimeLayers />
      </div>
    </Section>
  );
}
