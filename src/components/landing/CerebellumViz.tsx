"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader, fade } from "./shared";
// SITE_METAPHOR is now inlined for custom highlighting

/* ────────────────────────────────────────────
   Cycling inner labels for Cerebellum
   ──────────────────────────────────────────── */

function AERCore() {
  return (
    <g transform="translate(472, 130)">
      <motion.rect
        x={-78}
        y={-26}
        width={156}
        height={52}
        rx={26}
        fill="var(--accent)"
        initial={{ opacity: 0.04 }}
        animate={{ opacity: [0.04, 0.08, 0.04] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <path
        d="M -18 -3 C -2 -10, 16 -10, 30 -3"
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.9}
      />

      <g opacity={0.95}>
        <path
          d="M -7 -4 L 0 0 L -7 4"
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.35}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animateMotion
            dur="3.4s"
            begin="0s"
            repeatCount="indefinite"
            rotate="auto"
            path="M -18 -3 C -2 -10, 16 -10, 30 -3"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.12;0.78;1"
            dur="3.4s"
            begin="0s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      <path
        d="M 30 5 C 14 11, -4 11, -18 5"
        fill="none"
        stroke="var(--muted)"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.82}
      />

      <g opacity={0.9}>
        <path
          d="M -7 -4 L 0 0 L -7 4"
          fill="none"
          stroke="var(--muted)"
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <animateMotion
            dur="3.4s"
            begin="1.7s"
            repeatCount="indefinite"
            rotate="auto"
            path="M 30 5 C 14 11, -4 11, -18 5"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.12;0.78;1"
            dur="3.4s"
            begin="1.7s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      <g>
        <text
          x={-44}
          y={4}
          textAnchor="middle"
          fill="var(--accent)"
          fontSize={8}
          fontFamily="var(--font-mono)"
          fontWeight={700}
        >
          reason()
        </text>
        <text
          x={44}
          y={4}
          textAnchor="middle"
          fill="var(--accent)"
          fontSize={8}
          fontFamily="var(--font-mono)"
          fontWeight={700}
        >
          act()
        </text>
      </g>
    </g>
  );
}

function PathParticles() {
  return (
    <g>
      <circle r={1.8} fill="var(--accent)">
        <animateMotion dur="2.8s" begin="0s" repeatCount="indefinite" path={FORWARD_PATH} />
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="2.8s"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>

      <circle r={1.5} fill="var(--muted)">
        <animateMotion dur="3.2s" begin="0.8s" repeatCount="indefinite" path={RETURN_PATH} />
        <animate
          attributeName="opacity"
          values="0;0.9;0"
          dur="3.2s"
          begin="0.8s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

/* ────────────────────────────────────────────
   Animated arrow path (draws itself on mount)
   ──────────────────────────────────────────── */

function AnimatedArrow({
  d,
  color,
  delay = 0,
  dashed = false,
}: {
  d: string;
  color: string;
  delay?: number;
  dashed?: boolean;
}) {
  return (
    <motion.path
      d={d}
      stroke={color}
      strokeWidth={1.5}
      fill="none"
      strokeDasharray={dashed ? "5 4" : undefined}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    />
  );
}

/* ────────────────────────────────────────────
   Main component
   ──────────────────────────────────────────── */

const W = 600;
const H = 210;

// Arrow paths (centers now both at y=105)
const FORWARD_PATH = "M 215 97 C 290 82, 340 82, 368 97";
const RETURN_PATH = "M 368 113 C 340 128, 290 128, 215 113";

export function CerebellumGraphic() {
  return (
    <div
      className="overflow-hidden rounded-xl border w-full mx-auto"
      style={{ borderColor: "var(--border)", backgroundColor: "var(--card-bg)" }}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        style={{ display: "block" }}
        aria-label="Cerebrum vs Cerebellum diagram"
      >
        <defs>
          <marker
            id="cb-arrow-fwd"
            markerWidth="7"
            markerHeight="5"
            refX="6"
            refY="2.5"
            orient="auto"
          >
            <path d="M0,0 L7,2.5 L0,5" fill="none" stroke="var(--accent)" strokeWidth="1" />
          </marker>
          <marker
            id="cb-arrow-back"
            markerWidth="7"
            markerHeight="5"
            refX="6"
            refY="2.5"
            orient="auto"
          >
            <path d="M0,0 L7,2.5 L0,5" fill="none" stroke="var(--muted)" strokeWidth="1" />
          </marker>
        </defs>

        {/* ── Cerebrum (left) ── */}
        <rect
          x={22}
          y={35}
          width={192}
          height={140}
          rx={58}
          ry={58}
          fill="var(--card-bg)"
          stroke="var(--muted)"
          strokeWidth={1.5}
        />
        <text
          x={118}
          y={68}
          textAnchor="middle"
          fill="var(--muted)"
          fontSize={9}
          fontFamily="var(--font-mono)"
          fontWeight={600}
          letterSpacing={1}
        >
          CEREBRUM
        </text>
        <text
          x={118}
          y={86}
          textAnchor="middle"
          fill="var(--foreground)"
          fontSize={12}
          fontFamily="var(--font-sans)"
          fontWeight={500}
        >
          Main Agent
        </text>
        {/* Thin separator + trait words — cleaner than a nested box */}
        <line
          x1={80}
          y1={97}
          x2={156}
          y2={97}
          stroke="var(--border)"
          strokeWidth={0.8}
          strokeOpacity={0.6}
        />
        <text
          x={118}
          y={110}
          textAnchor="middle"
          fill="var(--muted)"
          fontSize={8.5}
          fontFamily="var(--font-sans)"
          opacity={0.8}
        >
          deliberate
        </text>
        <text
          x={118}
          y={122}
          textAnchor="middle"
          fill="var(--muted)"
          fontSize={8.5}
          fontFamily="var(--font-sans)"
          opacity={0.8}
        >
          strategic
        </text>
        <text
          x={118}
          y={134}
          textAnchor="middle"
          fill="var(--muted)"
          fontSize={8.5}
          fontFamily="var(--font-sans)"
          opacity={0.8}
        >
          high-level
        </text>

        {/* ── Cerebellum (right) ── */}
        <rect
          x={368}
          y={35}
          width={208}
          height={140}
          rx={66}
          ry={66}
          fill="var(--accent-muted)"
          stroke="var(--accent)"
          strokeWidth={1.5}
        />
        <text
          x={472}
          y={62}
          textAnchor="middle"
          fill="var(--accent)"
          fontSize={8.5}
          fontFamily="var(--font-mono)"
          fontWeight={800}
          letterSpacing={1.2}
          opacity={0.82}
        >
          CEREBELLUM
        </text>
        <text
          x={472}
          y={78}
          textAnchor="middle"
          fill="var(--foreground)"
          fontSize={10.5}
          fontFamily="var(--font-sans)"
          fontWeight={600}
        >
          Action Execution Runtime
        </text>

        {/* Parallel capabilities: reason() and act() */}
        <AERCore />

        {/* ── Animated arrows ── */}
        <AnimatedArrow d={FORWARD_PATH} color="var(--accent)" delay={0.3} />
        <AnimatedArrow d={RETURN_PATH} color="var(--muted)" delay={0.8} dashed />
        <PathParticles />

        {/* Arrow markers at ends */}
        <path
          d={FORWARD_PATH}
          stroke="var(--accent)"
          strokeWidth={1.5}
          fill="none"
          markerEnd="url(#cb-arrow-fwd)"
        />
        <path
          d={RETURN_PATH}
          stroke="var(--muted)"
          strokeWidth={1}
          fill="none"
          strokeDasharray="5 4"
          markerEnd="url(#cb-arrow-back)"
        />

        {/* Arrow labels */}
        <text
          x={292}
          y={78}
          textAnchor="middle"
          fill="var(--accent)"
          fontSize={8.5}
          fontFamily="var(--font-mono)"
          fontWeight={600}
        >
          high-level reasoning
        </text>
        <text
          x={292}
          y={143}
          textAnchor="middle"
          fill="var(--muted)"
          fontSize={9}
          fontFamily="var(--font-mono)"
        >
          result
        </text>
      </svg>

      {/* Caption */}
      <p
        className="px-8 py-4 text-center text-[13px] leading-relaxed"
        style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}
      >
        What if an AI agent's reasoning wasn’t interrupted by actions? Like the{" "}
        <span className="font-semibold" style={{ color: "var(--foreground)" }}>
          cerebellum
        </span>{" "}
        supporting the{" "}
        <span className="font-semibold" style={{ color: "var(--foreground)" }}>
          cerebrum
        </span>
        , we put reason inside action — freeing the main agent to stay deliberate.
      </p>
    </div>
  );
}

export function CerebellumViz() {
  return (
    <Section>
      <SectionHeader
        title="The Cerebellum Insight"
        sub="Goals stay with the agent; reflexive execution stays in the action phase."
      />
      <motion.div {...fade}>
        <CerebellumGraphic />
      </motion.div>
    </Section>
  );
}
