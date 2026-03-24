import type { GNode } from "./types";

/** Render the appropriate SVG shape for a node's kind. */
export function NodeShape({ n }: { n: GNode }) {
  const x = n.x - n.w / 2;
  const y = n.y - n.h / 2;

  switch (n.kind) {
    case "start":
    case "end":
      return (
        <rect
          x={x}
          y={y}
          width={n.w}
          height={n.h}
          rx={n.h / 2}
          fill={n.kind === "start" ? "var(--accent-muted)" : "var(--card-bg)"}
          stroke={n.kind === "start" ? "var(--accent)" : "var(--foreground)"}
          strokeWidth={1.2}
        />
      );

    case "loop": {
      const inset = 14;
      const pts = [
        `${x + inset},${y}`,
        `${x + n.w - inset},${y}`,
        `${x + n.w},${n.y}`,
        `${x + n.w - inset},${y + n.h}`,
        `${x + inset},${y + n.h}`,
        `${x},${n.y}`,
      ].join(" ");
      return (
        <polygon points={pts} fill="var(--accent-muted)" stroke="var(--accent)" strokeWidth={1.2} />
      );
    }

    case "decision": {
      const hw = n.w / 2 + 6;
      const hh = n.h / 2 + 4;
      const pts = [
        `${n.x},${n.y - hh}`,
        `${n.x + hw},${n.y}`,
        `${n.x},${n.y + hh}`,
        `${n.x - hw},${n.y}`,
      ].join(" ");
      return (
        <polygon points={pts} fill="var(--card-bg)" stroke="var(--accent)" strokeWidth={1.2} />
      );
    }

    default:
      return (
        <rect
          x={x}
          y={y}
          width={n.w}
          height={n.h}
          rx={6}
          fill="var(--card-bg)"
          stroke="var(--border)"
          strokeWidth={1}
        />
      );
  }
}
