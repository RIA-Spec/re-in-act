"use client";

import { motion } from "framer-motion";
import { fade } from "./shared";

/* ────────────────────────────────────────────
  Data — Bash RAS pipeline: 4-node horizontal chain
   api_docs.md → reason → jq → act
   ──────────────────────────────────────────── */

interface PipeNode {
  id: string;
  label: string;
  sub: string;
  cx: number;
  cy: number;
  role: "source" | "relay" | "sink";
}

interface PipeLink {
  from: string;
  to: string;
  label: string;
  color: string;
  delay: number;
  duration: number;
}

const NODES: PipeNode[] = [
  { id: "src", label: "docs.md", sub: "source", cx: 80, cy: 100, role: "source" },
  { id: "reason", label: "reason", sub: "struct JSON", cx: 240, cy: 100, role: "relay" },
  { id: "jq", label: "jq", sub: "extract cmd", cx: 400, cy: 100, role: "relay" },
  { id: "act", label: "act", sub: "execute", cx: 560, cy: 100, role: "sink" },
];

const LINKS: PipeLink[] = [
  { from: "src", to: "reason", label: "pipe |", color: "var(--accent)", delay: 0, duration: 1.4 },
  {
    from: "reason",
    to: "jq",
    label: "JSON",
    color: "var(--accent-alt)",
    delay: 1.5,
    duration: 1.2,
  },
  { from: "jq", to: "act", label: "pipe |", color: "var(--muted)", delay: 2.8, duration: 1.1 },
];

const TOTAL_LOOP = 6;

function nodeById(id: string): PipeNode {
  return NODES.find((n) => n.id === id)!;
}

const ROLE_RADIUS: Record<PipeNode["role"], number> = { source: 28, relay: 28, sink: 28 };
const ROLE_STROKE: Record<PipeNode["role"], string> = {
  source: "var(--foreground)",
  relay: "var(--accent)",
  sink: "var(--accent-alt)",
};

function PipePacket({ link }: { link: PipeLink }) {
  const a = nodeById(link.from);
  const b = nodeById(link.to);

  return (
    <circle r="3.5" fill={link.color} opacity="0">
      <animate
        attributeName="cx"
        from={a.cx}
        to={b.cx}
        begin={`${link.delay}s`}
        dur={`${link.duration}s`}
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.2 1"
        keyTimes="0;1"
      />
      <animate
        attributeName="cy"
        from={a.cy}
        to={b.cy}
        begin={`${link.delay}s`}
        dur={`${link.duration}s`}
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.2 1"
        keyTimes="0;1"
      />
      <animate
        attributeName="opacity"
        values="0;0.9;0.9;0"
        keyTimes="0;0.1;0.85;1"
        begin={`${link.delay}s`}
        dur={`${link.duration}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="r"
        values="2;4;3;2"
        keyTimes="0;0.2;0.7;1"
        begin={`${link.delay}s`}
        dur={`${link.duration}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

function PipeTrail({ link }: { link: PipeLink }) {
  const a = nodeById(link.from);
  const b = nodeById(link.to);
  return (
    <circle r="8" fill={link.color} opacity="0" style={{ filter: "blur(4px)" }}>
      <animate
        attributeName="cx"
        from={a.cx}
        to={b.cx}
        begin={`${link.delay}s`}
        dur={`${link.duration}s`}
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.2 1"
        keyTimes="0;1"
      />
      <animate
        attributeName="cy"
        from={a.cy}
        to={b.cy}
        begin={`${link.delay}s`}
        dur={`${link.duration}s`}
        repeatCount="indefinite"
        calcMode="spline"
        keySplines="0.4 0 0.2 1"
        keyTimes="0;1"
      />
      <animate
        attributeName="opacity"
        values="0;0.2;0.2;0"
        keyTimes="0;0.1;0.8;1"
        begin={`${link.delay}s`}
        dur={`${link.duration}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

function PipeNode({ node }: { node: PipeNode }) {
  const r = ROLE_RADIUS[node.role];
  const stroke = ROLE_STROKE[node.role];

  return (
    <g>
      {/* Ring pulse */}
      <circle
        cx={node.cx}
        cy={node.cy}
        r={r}
        fill="none"
        stroke={stroke}
        strokeWidth={1}
        opacity="0"
      >
        <animate
          attributeName="r"
          from={r}
          to={r + 10}
          dur={`${TOTAL_LOOP}s`}
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.35;0"
          dur={`${TOTAL_LOOP}s`}
          repeatCount="indefinite"
        />
      </circle>

      {/* Main circle */}
      <circle
        cx={node.cx}
        cy={node.cy}
        r={r}
        fill="var(--card-bg)"
        stroke={stroke}
        strokeWidth={1.5}
      />

      {/* Label */}
      <text
        x={node.cx}
        y={node.cy}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--foreground)"
        fontSize={11}
        fontFamily="var(--font-mono)"
        fontWeight={600}
      >
        {node.label}
      </text>
      {/* Subtext goes below the circle */}
      <text
        x={node.cx}
        y={node.cy + r + 16}
        textAnchor="middle"
        dominantBaseline="middle"
        fill="var(--muted)"
        fontSize={9}
        fontFamily="var(--font-sans)"
      >
        {node.sub}
      </text>
    </g>
  );
}

/* ────────────────────────────────────────────
   Main component
   ──────────────────────────────────────────── */

export function NetworkPulse() {
  return (
    <div className="w-full">
      <motion.div {...fade}>
        <div
          className="overflow-hidden rounded-xl border"
          style={{ borderColor: "var(--border)", backgroundColor: "var(--card-bg)" }}
        >
          {/* Pipeline command strip */}
          <div
            className="border-b px-5 py-2.5 font-mono text-[11px]"
            style={{ borderColor: "var(--border)", color: "var(--muted)" }}
          >
            <span style={{ color: "var(--accent)" }}>$</span> cat api_docs.md{" "}
            <span style={{ color: "var(--accent)" }}>|</span> reason --context - --prompt
            &quot;Build test cmd&quot; --structure &apos;{"{"}&quot;cmd&quot;: &quot;&quot;{"}"}
            &apos; <span style={{ color: "var(--accent)" }}>|</span> jq -r &apos;.data.cmd&apos;{" "}
            <span style={{ color: "var(--accent)" }}>|</span> act bash -
          </div>

          <svg
            viewBox="0 64 640 72"
            className="w-full"
            style={{ display: "block" }}
            role="img"
            aria-label="Bash RAS pipeline animation"
          >
            {/* Static pipe lines */}
            {LINKS.map((l) => {
              const a = nodeById(l.from);
              const b = nodeById(l.to);
              return (
                <g key={`line-${l.from}-${l.to}`}>
                  <line
                    x1={a.cx}
                    y1={a.cy}
                    x2={b.cx}
                    y2={b.cy}
                    stroke="var(--border)"
                    strokeWidth={1}
                    strokeOpacity={0.5}
                  />
                  <text
                    x={(a.cx + b.cx) / 2}
                    y={a.cy - 28}
                    textAnchor="middle"
                    fill="var(--muted)"
                    fontSize={8}
                    fontFamily="var(--font-mono)"
                  >
                    {l.label}
                  </text>
                </g>
              );
            })}

            {/* Trails */}
            {LINKS.map((l) => (
              <PipeTrail key={`trail-${l.from}-${l.to}`} link={l} />
            ))}

            {/* Packets */}
            {LINKS.map((l) => (
              <PipePacket key={`pkt-${l.from}-${l.to}`} link={l} />
            ))}

            {/* Nodes */}
            {NODES.map((n) => (
              <PipeNode key={n.id} node={n} />
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div
          className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[11px]"
          style={{ color: "var(--muted)" }}
        >
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            Data flow
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: "var(--accent-alt)" }}
            />
            Structured JSON
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: "var(--muted)" }}
            />
            Shell execution
          </span>
        </div>
      </motion.div>
    </div>
  );
}
