"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { Section, SectionHeader, IndexLabel, fade } from "./shared";

const MONO = "var(--font-mono)";
const SANS = "var(--font-sans)";

const PARADIGM_SHIFT_COMPARISONS: Array<{
  from: string;
  to: string;
  bold?: boolean;
}> = [
  {
    from: "Thin Action Layer",
    to: "Reason-able Action Space Strengthens Local Action",
    bold: true,
  },
  {
    from: "Round-Trip Tax (Reason-Act-Observe)",
    to: "One Orchestrated Action Phase",
  },
  {
    from: "Raw Intermediate Data in Main Context",
    to: "Intermediate Data Stays in Reason-able Action Space",
  },
  {
    from: "Probabilistic Micro-Control Flow",
    to: "Deterministic Runtime Control Flow",
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

          {/* Reason-able Action Space definition arrow */}
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
              define RAS
            </text>
          </motion.g>

          {/* Reason-able Action Space Core visualization */}
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

            <g>
              <motion.text
                x={180}
                y={120}
                textAnchor="middle"
                fill="var(--accent)"
                fontSize={7.2}
                fontFamily={MONO}
                fontWeight={700}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                reason
              </motion.text>
              <motion.text
                x={180}
                y={135}
                textAnchor="middle"
                fill="var(--accent-alt)"
                fontSize={7.2}
                fontFamily={MONO}
                fontWeight={700}
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
              denoised result
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
            Orchestrated action phase
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
                style={{
                  color: item.bold ? "var(--foreground)" : "var(--muted)",
                }}
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
  01 — Reason-able Action Space Flow (directed graph)
   ──────────────────────────────────────────── */

function RASFlow() {
  const W = 700;
  const H = 240;
  const markerId = useId().replace(/:/g, "");
  const mutedMarkerId = `ras-flow-muted-${markerId}`;
  const accentMarkerId = `ras-flow-accent-${markerId}`;

  return (
    <motion.div
      className="overflow-hidden rounded-xl border"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--card-bg)",
      }}
      {...fade}
    >
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} fill="none" aria-hidden="true">
        <defs>
          <marker
            id={mutedMarkerId}
            markerWidth="7"
            markerHeight="5"
            refX="6"
            refY="2.5"
            orient="auto"
          >
            <path d="M0,0 L7,2.5 L0,5" fill="none" stroke="var(--muted)" strokeWidth="1" />
          </marker>
          <marker
            id={accentMarkerId}
            markerWidth="7"
            markerHeight="5"
            refX="6"
            refY="2.5"
            orient="auto"
          >
            <path d="M0,0 L7,2.5 L0,5" fill="none" stroke="var(--accent)" strokeWidth="1" />
          </marker>
        </defs>

        <path
          d="M 585 106 C 590 18, 88 18, 88 96"
          stroke="var(--muted)"
          strokeWidth={1.2}
          strokeDasharray="5 5"
          markerEnd={`url(#${mutedMarkerId})`}
        />
        <text x={350} y={18} textAnchor="middle" fill="var(--muted)" fontSize={8} fontFamily={MONO}>
          return denoised result
        </text>

        <rect
          x={28}
          y={108}
          width={126}
          height={34}
          rx={8}
          fill="var(--card-bg)"
          stroke="var(--muted)"
          strokeWidth={1.2}
        />
        <text
          x={91}
          y={125}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--foreground)"
          fontSize={10.8}
          fontFamily={MONO}
          fontWeight={600}
        >
          Top-Level Reasoning
        </text>

        <line
          x1={154}
          y1={125}
          x2={220}
          y2={125}
          stroke="var(--accent)"
          strokeWidth={1.5}
          markerEnd={`url(#${accentMarkerId})`}
        />
        <text
          x={186}
          y={116}
          textAnchor="middle"
          fill="var(--accent)"
          fontSize={8}
          fontFamily={MONO}
        >
          RAS + constraints
        </text>

        <rect
          x={220}
          y={46}
          width={270}
          height={140}
          rx={18}
          fill="var(--accent-muted)"
          stroke="var(--accent)"
          strokeWidth={1.6}
        />
        <text
          x={355}
          y={70}
          textAnchor="middle"
          fill="var(--accent)"
          fontSize={10.8}
          fontFamily={MONO}
          fontWeight={700}
        >
          RAS
        </text>

        <rect
          x={240}
          y={94}
          width={224}
          height={62}
          rx={23}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={1}
          strokeDasharray="5 5"
          opacity={0.72}
        />

        <ellipse
          cx={292}
          cy={125}
          rx={32}
          ry={16}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.3}
          strokeDasharray="5 5"
          opacity={0.78}
        />
        <rect
          x={366}
          y={107}
          width={78}
          height={36}
          rx={16}
          fill="var(--card-bg)"
          stroke="var(--accent-alt)"
          strokeWidth={1.3}
        />

        <path
          d="M 325 110 C 337 96, 351 96, 365 110"
          stroke="var(--muted)"
          strokeWidth={1.1}
          strokeDasharray="5 5"
          markerEnd={`url(#${mutedMarkerId})`}
        />
        <path
          d="M 365 140 C 351 154, 337 154, 321 140"
          stroke="var(--muted)"
          strokeWidth={1.1}
          strokeDasharray="5 5"
          markerEnd={`url(#${mutedMarkerId})`}
        />

        <text
          x={292}
          y={125}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--accent)"
          fontSize={10.2}
          fontFamily={MONO}
          fontWeight={700}
        >
          reason()
        </text>
        <text
          x={405}
          y={125}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--accent-alt)"
          fontSize={10.4}
          fontFamily={MONO}
          fontWeight={700}
        >
          act()
        </text>

        <line
          x1={456}
          y1={125}
          x2={520}
          y2={125}
          stroke="var(--muted)"
          strokeWidth={1.2}
          markerEnd={`url(#${mutedMarkerId})`}
        />

        <rect
          x={520}
          y={108}
          width={130}
          height={34}
          rx={8}
          fill="var(--card-bg)"
          stroke="var(--muted)"
          strokeWidth={1.2}
        />
        <text
          x={585}
          y={125}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="var(--foreground)"
          fontSize={10.8}
          fontFamily={MONO}
          fontWeight={600}
        >
          denoised result
        </text>
      </svg>
    </motion.div>
  );
}

function LocalActionSequence() {
  const steps = [
    {
      index: "1",
      title: "act() gathers local evidence",
      body: "Run tests, read logs, or fetch a document without pushing raw output back to top-level reasoning.",
      code: "act('bash', 'npm test -- --reporter json')",
    },
    {
      index: "2",
      title: "reason() compresses the local signal",
      body: "Turn noisy evidence into one bounded decision using an explicit goal, observation, relevant context, and constraints.",
      code: "reason([\n  'Goal: identify the best retry step.',\n  observation,\n  'Relevant context: CI run after latest change.',\n  'Constraints and rules: return retry_cmd + reason only.',\n], { retry_cmd: '', reason: '' })",
    },
    {
      index: "3",
      title: "act() + reason() keep the space moving",
      body: "Execute the next step, inspect the result again, and only return a denoised outcome once the local job is actually settled.",
      code: "act('bash', retry_cmd) -> reason(...) -> act('deploy' | 'notify')",
    },
  ];

  return (
    <motion.div className="mt-4 flex flex-col gap-3" {...fade}>
      {steps.map((step) => (
        <div
          key={step.index}
          className="rounded-xl border p-4"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--card-bg)",
          }}
        >
          <div className="mb-3 flex items-center gap-3">
            <div
              className="flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold"
              style={{
                backgroundColor: "var(--accent-muted)",
                color: "var(--accent)",
              }}
            >
              {step.index}
            </div>
            <div className="text-[14px] font-semibold" style={{ color: "var(--foreground)" }}>
              {step.title}
            </div>
          </div>
          <p className="mb-3 text-[13px] leading-relaxed" style={{ color: "var(--muted)" }}>
            {step.body}
          </p>
          <div
            className="rounded-lg border px-3 py-2 font-mono text-[11px] whitespace-pre-wrap break-words"
            style={{
              borderColor: "var(--border)",
              backgroundColor: "var(--surface-elevated)",
            }}
          >
            {step.code}
          </div>
        </div>
      ))}
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
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--card-bg)",
      }}
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
          Top-Level Loop
        </text>
        <text x={26} y={48} fill="var(--muted)" fontSize={10} fontFamily={SANS}>
          Defines the RAS, its constraints, and when to run it
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
          reason(prompt, example_output) · act(name, args)
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
      <div id="from-react-to-re-in-act" className="block h-0 scroll-mt-24" aria-hidden="true" />
      <SectionHeader
        title="From ReAct to Re in Act"
        sub="From brittle agentic loops to a Reason-able Action Space with fewer round trips, less context noise, and stronger local control."
      />

      {/* ── 01: Reason-able Action Space (introduces abbreviation) ── */}
      <div className="mb-16">
        <IndexLabel
          index="01"
          title="Reason-able Action Space (RAS)"
          sub="One Reason-able Action Space can coordinate multiple act() and reason() steps before returning a denoised result."
        />
        <RASFlow />
        <LocalActionSequence />
      </div>

      {/* ── 02: Paradigm Shift (uses RAS abbreviation) ── */}
      <div className="mb-16">
        <IndexLabel
          index="02"
          title="Paradigm Shift"
          sub="ReAct returns to the outer loop at every step. Re in Act keeps the work moving inside one RAS."
        />
        <div className="space-y-4">
          <ParadigmShift />
          <ParadigmShiftComparisons />
        </div>
      </div>

      <div>
        <IndexLabel
          index="03"
          title="Two Action Forms"
          sub="The same idea can run as code or shell pipelines. In both forms, deterministic Turing-complete control is stronger than probabilistic LLM-stepped flow."
        />
        <RuntimeLayers />
      </div>
    </Section>
  );
}
