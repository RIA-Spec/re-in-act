import type { GNode, GEdge, ParticleRoute } from "./types";

/*
  build_analyzer.py flow
  ──────────────────────────────────────
         ┌────────────────────┐
         │ read build.log     │
         └────────┬───────────┘
         ┌────────▼───────────┐
         │ reason(log)        │
         └────────┬───────────┘
                ╱   success?   ╲
              yes               no
      ┌────────▼───────┐   ┌────▼──────────┐
      │ act('deploy')  │   │ act('notify') │
      └────────┬───────┘   └────┬──────────┘
               └───────┬────────┘
                       ▼
                     done
*/

export const NODES: GNode[] = [
  { id: "read_log", label: "read(build.log)", x: 250, y: 36, w: 156, h: 36, kind: "start" },
  { id: "reason", label: "reason(log)", x: 250, y: 108, w: 148, h: 36, kind: "process" },
  { id: "success", label: "success?", x: 250, y: 182, w: 88, h: 42, kind: "decision" },
  { id: "deploy", label: "act('deploy')", x: 178, y: 274, w: 128, h: 36, kind: "process" },
  { id: "notify", label: "act('notify')", x: 322, y: 274, w: 128, h: 36, kind: "process" },
  { id: "done", label: "done", x: 250, y: 352, w: 96, h: 34, kind: "end" },
];

export const EDGES: GEdge[] = [
  { from: "read_log", to: "reason" },
  { from: "reason", to: "success" },
  { from: "success", to: "deploy", label: "yes", exitSide: "left", enterSide: "top" },
  { from: "success", to: "notify", label: "no", exitSide: "right", enterSide: "top" },
  { from: "deploy", to: "done", exitSide: "bottom", enterSide: "left" },
  { from: "notify", to: "done", exitSide: "bottom", enterSide: "right" },
];

export const ROUTES: ParticleRoute[] = [
  { edgeIndices: [0, 1, 2, 4], delay: 0, duration: 5.2, color: "var(--accent)" },
  { edgeIndices: [0, 1, 3, 5], delay: 2.6, duration: 5.2, color: "var(--accent-alt)" },
];
