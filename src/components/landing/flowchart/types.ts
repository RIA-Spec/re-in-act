/** A node in the flowchart. */
export interface GNode {
  id: string;
  label: string;
  /** Centre x */
  x: number;
  /** Centre y */
  y: number;
  w: number;
  h: number;
  kind: "start" | "process" | "decision" | "end" | "loop" | "error";
}

/** A directed edge between two nodes. */
export interface GEdge {
  from: string;
  to: string;
  label?: string;
  /** "back" = loop-back dashed line */
  type?: "back" | "error";
  /** Optional routing hint: which side to exit / enter. */
  exitSide?: "bottom" | "right" | "left" | "top";
  enterSide?: "top" | "left" | "right" | "bottom";
  /** Optional waypoints for complex routes (absolute coords). */
  via?: { x: number; y: number }[];
}

/** A particle route — a sequence of edge indices the dot travels along. */
export interface ParticleRoute {
  edgeIndices: number[];
  delay: number;
  duration: number;
  color: string;
}
