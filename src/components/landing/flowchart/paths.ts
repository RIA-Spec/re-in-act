import type { GEdge, GNode } from "./types";
import { NODES } from "./data";

/** Look up a node by id. */
export function nodeById(id: string): GNode {
  return NODES.find((n) => n.id === id)!;
}

/* ── Anchor helpers ── */

type Side = "top" | "bottom" | "left" | "right";

function anchor(n: GNode, side: Side): { x: number; y: number } {
  switch (side) {
    case "top":
      return { x: n.x, y: n.y - n.h / 2 };
    case "bottom":
      return { x: n.x, y: n.y + n.h / 2 };
    case "left":
      return { x: n.x - n.w / 2, y: n.y };
    case "right":
      return { x: n.x + n.w / 2, y: n.y };
  }
}

/** Infer exit side from relative positions. */
function inferExitSide(a: GNode, b: GNode): Side {
  const dx = Math.abs(b.x - a.x);
  const dy = Math.abs(b.y - a.y);
  if (dy < 5) return b.x > a.x ? "right" : "left";
  if (dx < 5) return b.y > a.y ? "bottom" : "top";
  return b.y > a.y ? "bottom" : "top";
}

/** Infer enter side from relative positions. */
function inferEnterSide(a: GNode, b: GNode): Side {
  const dx = Math.abs(b.x - a.x);
  const dy = Math.abs(b.y - a.y);
  if (dy < 5) return b.x > a.x ? "left" : "right";
  if (dx < 5) return b.y > a.y ? "top" : "bottom";
  return b.y > a.y ? "top" : "bottom";
}

/** Compute the SVG path `d` attribute for an edge — fully data-driven. */
export function computePath(e: GEdge): string {
  const a = nodeById(e.from);
  const b = nodeById(e.to);

  const exitSide = e.exitSide ?? inferExitSide(a, b);
  const enterSide = e.enterSide ?? inferEnterSide(a, b);

  const start = anchor(a, exitSide);
  const end = anchor(b, enterSide);

  // Explicit waypoints via `via`
  if (e.via && e.via.length > 0) {
    const segments = [start, ...e.via, end];
    return segments.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  }

  // Same line (horizontal or vertical)
  if (exitSide === "bottom" && enterSide === "top" && Math.abs(start.x - end.x) < 5) {
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }
  if (
    (exitSide === "right" || exitSide === "left") &&
    (enterSide === "left" || enterSide === "right") &&
    Math.abs(start.y - end.y) < 5
  ) {
    return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
  }

  // L-shaped route
  if (
    (exitSide === "bottom" || exitSide === "top") &&
    (enterSide === "left" || enterSide === "right")
  ) {
    return `M ${start.x} ${start.y} L ${start.x} ${end.y} L ${end.x} ${end.y}`;
  }
  if (
    (exitSide === "right" || exitSide === "left") &&
    (enterSide === "top" || enterSide === "bottom")
  ) {
    return `M ${start.x} ${start.y} L ${end.x} ${start.y} L ${end.x} ${end.y}`;
  }

  // Fallback: L-shaped via intermediate y
  return `M ${start.x} ${start.y} L ${start.x} ${end.y} L ${end.x} ${end.y}`;
}

/** Sample `totalSteps` evenly-spaced points along an M/L path string. */
export function samplePath(d: string, totalSteps: number): { x: number; y: number }[] {
  const cmds: { type: string; pts: number[] }[] = [];
  const re = /([ML])\s*([\d.\s,-]+)/gi;
  let m;
  while ((m = re.exec(d)) !== null) {
    cmds.push({
      type: m[1].toUpperCase(),
      pts: m[2]
        .trim()
        .split(/[\s,]+/)
        .map(Number),
    });
  }

  const segments: { from: { x: number; y: number }; to: { x: number; y: number } }[] = [];
  let cx = 0;
  let cy = 0;

  for (const cmd of cmds) {
    if (cmd.type === "M") {
      cx = cmd.pts[0];
      cy = cmd.pts[1];
    } else if (cmd.type === "L") {
      const nx = cmd.pts[0];
      const ny = cmd.pts[1];
      segments.push({ from: { x: cx, y: cy }, to: { x: nx, y: ny } });
      cx = nx;
      cy = ny;
    }
  }

  if (segments.length === 0) return [{ x: cx, y: cy }];

  const segLengths = segments.map((s) => {
    const dx = s.to.x - s.from.x;
    const dy = s.to.y - s.from.y;
    return Math.sqrt(dx * dx + dy * dy);
  });
  const totalLen = segLengths.reduce((a, b) => a + b, 0);

  const pts: { x: number; y: number }[] = [];
  for (const [si, seg] of segments.entries()) {
    const segSteps = Math.max(2, Math.round((segLengths[si] / totalLen) * totalSteps));
    const startI = pts.length === 0 ? 0 : 1;
    for (let i = startI; i <= segSteps; i++) {
      const t = i / segSteps;
      pts.push({
        x: seg.from.x + (seg.to.x - seg.from.x) * t,
        y: seg.from.y + (seg.to.y - seg.from.y) * t,
      });
    }
  }
  return pts;
}
