"use client";

import { motion, type Transition } from "framer-motion";
import { NODES, EDGES, ROUTES } from "./data";
import { nodeById, computePath } from "./paths";
import { NodeShape } from "./NodeShape";
import { AnimatedParticle } from "./Particle";

/* ── Style tokens ── */

const MONO = "var(--font-mono)";

const glowKeyframes = {
  filter: [
    "drop-shadow(0 0 0px transparent)",
    "drop-shadow(0 0 6px var(--accent))",
    "drop-shadow(0 0 0px transparent)",
  ],
};

function glowTransition(delay: number): Transition {
  return { duration: 2.4, delay, repeat: Infinity, times: [0, 0.3, 1] };
}

/* ── ViewBox — crops tightly around the content ── */

const VX = 110;
const VW = 280;
const VH = 400;

/** The animated Python-style flowchart SVG. */
export function Flowchart() {
  return (
    <svg
      width="100%"
      viewBox={`${VX} 0 ${VW} ${VH}`}
      fill="none"
      className="mx-auto"
      aria-hidden="true"
    >
      <defs>
        <marker id="ha" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <path d="M0,0 L6,2.5 L0,5" fill="none" stroke="var(--border)" strokeWidth="0.8" />
        </marker>
        <marker id="hb" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
          <path d="M0,0 L6,2.5 L0,5" fill="none" stroke="var(--accent)" strokeWidth="0.8" />
        </marker>
      </defs>

      {/* Edges */}
      {EDGES.map((e, i) => {
        const isBack = e.type === "back";
        return (
          <g key={`e-${i}`}>
            <path
              d={computePath(e)}
              stroke={isBack ? "var(--accent)" : "var(--border)"}
              strokeWidth={isBack ? 1.2 : 1}
              strokeOpacity={isBack ? 0.4 : 0.5}
              strokeDasharray={isBack ? "5 3" : undefined}
              fill="none"
              markerEnd={isBack ? "url(#hb)" : "url(#ha)"}
            />
            {e.label &&
              (() => {
                const a = nodeById(e.from);
                const b = nodeById(e.to);
                const isHoriz =
                  e.exitSide === "right" ||
                  e.exitSide === "left" ||
                  (!e.exitSide && Math.abs(a.y - b.y) < 10);

                // Adjust label position based on exit side to avoid overlapping the node shapes
                let lx = isHoriz ? (a.x + b.x) / 2 : a.x;
                let ly = isHoriz ? a.y - 8 : (a.y + b.y) / 2 - 2;

                if (e.exitSide === "left") {
                  lx = a.x - a.w / 2 - 10;
                  ly = a.y - 8;
                } else if (e.exitSide === "right") {
                  lx = a.x + a.w / 2 + 10;
                  ly = a.y - 8;
                } else if (!isHoriz) {
                  lx = a.x + (a.w / 2) * 0.25;
                }

                return (
                  <text
                    x={lx}
                    y={ly}
                    textAnchor={
                      e.exitSide === "left" ? "end" : e.exitSide === "right" ? "start" : "middle"
                    }
                    fill="var(--accent)"
                    fontSize={10}
                    fontFamily={MONO}
                    fontWeight={500}
                    opacity={0.6}
                  >
                    {e.label}
                  </text>
                );
              })()}
          </g>
        );
      })}

      {/* Particles */}
      {ROUTES.map((route, i) => (
        <AnimatedParticle key={`p-${i}`} route={route} />
      ))}

      {/* Nodes */}
      {NODES.map((n, i) => {
        const glow = n.kind === "start" || n.kind === "decision";
        return (
          <motion.g
            key={n.id}
            animate={glow ? glowKeyframes : undefined}
            transition={glow ? glowTransition(i * 0.3) : undefined}
          >
            <NodeShape n={n} />
            <text
              x={n.x}
              y={n.y + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={
                n.kind === "start" || n.kind === "decision" ? "var(--accent)" : "var(--foreground)"
              }
              fontSize={12}
              fontFamily={MONO}
              fontWeight={n.kind === "start" || n.kind === "decision" ? 600 : 500}
            >
              {n.label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}
