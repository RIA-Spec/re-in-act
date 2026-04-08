"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { Section, SectionHeader, fade } from "./shared";
// SITE_METAPHOR is now inlined for custom highlighting

/* ────────────────────────────────────────────
  Parallel interfaces inside the RAS space
  ──────────────────────────────────────────── */

function RASCore({ loopMarkerId }: { loopMarkerId: string }) {
  return (
    <g transform="translate(602, 136)">
      <motion.rect
        x={-102}
        y={-28}
        width={204}
        height={80}
        rx={26}
        fill="var(--card-bg)"
        fillOpacity={0.44}
        initial={{ opacity: 0.44 }}
        animate={{ opacity: [0.44, 0.58, 0.44] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <text
        x={0}
        y={-16}
        textAnchor="middle"
        fill="var(--muted)"
        fontSize={7.2}
        fontFamily="var(--font-mono)"
        opacity={0.9}
      >
        local action
      </text>

      <motion.rect
        x={-86}
        y={-9}
        width={176}
        height={42}
        rx={21}
        fill="none"
        stroke="var(--muted)"
        strokeWidth={1.1}
        strokeDasharray="5 5"
        opacity={0.74}
        animate={{ strokeDashoffset: [0, -18] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
      />

      <ellipse
        cx={-46}
        cy={12}
        rx={28}
        ry={12}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={1.5}
        strokeDasharray="6 6"
        opacity={0.78}
      />

      <rect
        x={34}
        y={-2}
        width={54}
        height={28}
        rx={14}
        fill="var(--card-bg)"
        stroke="var(--accent-alt)"
        strokeWidth={1.5}
        opacity={0.96}
      />

      <path
        d="M -12 3 C 2 -10, 16 -10, 30 3"
        fill="none"
        stroke="var(--muted)"
        strokeWidth={1.2}
        strokeDasharray="5 5"
        opacity={0.84}
        markerEnd={`url(#${loopMarkerId})`}
      />
      <path
        d="M 32 21 C 17 34, 1 34, -16 21"
        fill="none"
        stroke="var(--muted)"
        strokeWidth={1.2}
        strokeDasharray="5 5"
        opacity={0.84}
        markerEnd={`url(#${loopMarkerId})`}
      />

      <text
        x={-46}
        y={12}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--accent)"
        fontSize={8.7}
        fontFamily="var(--font-mono)"
        fontWeight={700}
      >
        reason()
      </text>
      <text
        x={61}
        y={12}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--accent-alt)"
        fontSize={8.7}
        fontFamily="var(--font-mono)"
        fontWeight={700}
      >
        act()
      </text>
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
  markerEnd,
  delay = 0,
  dashed = false,
}: {
  d: string;
  color: string;
  markerEnd: string;
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
      markerEnd={markerEnd}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    />
  );
}

function PathLabel({
  x,
  y,
  text,
  color,
  width,
}: {
  x: number;
  y: number;
  text: string;
  color: string;
  width: number;
}) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <rect
        x={-width / 2}
        y={-12}
        width={width}
        height={20}
        rx={10}
        fill="var(--card-bg)"
        fillOpacity={0.92}
      />
      <text
        y={2}
        textAnchor="middle"
        fill={color}
        fontSize={8.8}
        fontFamily="var(--font-mono)"
        fontWeight={650}
      >
        {text}
      </text>
    </g>
  );
}

/* ────────────────────────────────────────────
   Main component
   ──────────────────────────────────────────── */

const W = 760;
const H = 260;

const FORWARD_PATH = "M 246 102 C 350 72, 448 72, 484 101";
const RETURN_PATH = "M 486 122 C 450 149, 353 155, 248 144";

export function CerebellumGraphic() {
  const markerId = useId().replace(/:/g, "");
  const forwardMarkerId = `cb-arrow-fwd-${markerId}`;
  const backMarkerId = `cb-arrow-back-${markerId}`;
  const loopMarkerId = `cb-loop-arrow-${markerId}`;

  return (
    <div
      className="mx-auto w-full overflow-hidden rounded-xl border"
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
            id={forwardMarkerId}
            markerWidth="7"
            markerHeight="5"
            refX="6"
            refY="2.5"
            orient="auto"
          >
            <path d="M0,0 L7,2.5 L0,5" fill="none" stroke="var(--accent)" strokeWidth="1" />
          </marker>
          <marker
            id={backMarkerId}
            markerWidth="7"
            markerHeight="5"
            refX="6"
            refY="2.5"
            orient="auto"
          >
            <path d="M0,0 L7,2.5 L0,5" fill="none" stroke="var(--muted)" strokeWidth="1" />
          </marker>
          <marker
            id={loopMarkerId}
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
          x={34}
          y={40}
          width={212}
          height={154}
          rx={54}
          ry={54}
          fill="var(--card-bg)"
          stroke="var(--muted)"
          strokeWidth={2}
        />
        <text
          x={140}
          y={82}
          textAnchor="middle"
          fill="var(--muted)"
          fontSize={10}
          fontFamily="var(--font-mono)"
          fontWeight={700}
          letterSpacing={1.4}
        >
          CEREBRUM
        </text>
        <text
          x={140}
          y={112}
          textAnchor="middle"
          fill="var(--foreground)"
          fontSize={16}
          fontFamily="var(--font-sans)"
          fontWeight={600}
        >
          Top-Level Reasoning
        </text>
        <line
          x1={94}
          y1={126}
          x2={186}
          y2={126}
          stroke="var(--border)"
          strokeWidth={1}
          strokeOpacity={0.6}
        />
        <text
          x={140}
          y={147}
          textAnchor="middle"
          fill="var(--muted)"
          fontSize={8.8}
          fontFamily="var(--font-sans)"
          opacity={0.8}
        >
          deliberate
        </text>
        <text
          x={140}
          y={166}
          textAnchor="middle"
          fill="var(--muted)"
          fontSize={8.8}
          fontFamily="var(--font-sans)"
          opacity={0.8}
        >
          strategic
        </text>
        <text
          x={140}
          y={185}
          textAnchor="middle"
          fill="var(--muted)"
          fontSize={8.8}
          fontFamily="var(--font-sans)"
          opacity={0.8}
        >
          high-level
        </text>

        {/* ── Cerebellum (right) ── */}
        <rect
          x={484}
          y={40}
          width={236}
          height={154}
          rx={58}
          ry={58}
          fill="var(--accent-muted)"
          stroke="var(--accent)"
          strokeWidth={2}
        />
        <text
          x={602}
          y={68}
          textAnchor="middle"
          fill="var(--accent)"
          fontSize={10}
          fontFamily="var(--font-mono)"
          fontWeight={800}
          letterSpacing={1.8}
          opacity={0.82}
        >
          CEREBELLUM
        </text>
        <text
          x={602}
          y={98}
          textAnchor="middle"
          fill="var(--foreground)"
          fontSize={14}
          fontFamily="var(--font-sans)"
          fontWeight={600}
        >
          Reason-able Action Space
        </text>

        {/* reason() and act() live side by side inside the RAS space */}
        <RASCore loopMarkerId={loopMarkerId} />

        {/* ── Animated arrows ── */}
        <AnimatedArrow
          d={FORWARD_PATH}
          color="var(--accent)"
          markerEnd={`url(#${forwardMarkerId})`}
          delay={0.3}
        />
        <AnimatedArrow
          d={RETURN_PATH}
          color="var(--muted)"
          markerEnd={`url(#${backMarkerId})`}
          delay={0.8}
          dashed
        />
        <PathParticles />

        {/* Arrow labels */}
        <PathLabel x={382} y={62} text="high-level reasoning" color="var(--accent)" width={168} />
        <PathLabel x={378} y={178} text="denoised result" color="var(--muted)" width={138} />
      </svg>

      {/* Caption */}
      <p
        className="px-8 py-4 text-center text-[13px] leading-relaxed"
        style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}
      >
        Like the{" "}
        <span className="font-semibold" style={{ color: "var(--foreground)" }}>
          cerebellum
        </span>{" "}
        supporting the{" "}
        <span className="font-semibold" style={{ color: "var(--foreground)" }}>
          cerebrum
        </span>
        . The outer loop sets the goal and limits. The action phase handles small decisions on the
        spot.
      </p>
    </div>
  );
}

export function CerebellumViz() {
  return (
    <Section>
      <SectionHeader
        title="Action Stays Local"
        sub="Set the goal once. Handle local issues where the work happens."
      />
      <motion.div {...fade}>
        <CerebellumGraphic />
      </motion.div>
    </Section>
  );
}
