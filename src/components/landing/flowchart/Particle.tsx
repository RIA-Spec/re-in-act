"use client";

import { motion, type Transition } from "framer-motion";
import type { ParticleRoute } from "./types";
import { EDGES } from "./data";
import { computePath, samplePath } from "./paths";

const SAMPLES_PER_EDGE = 16;

/** An animated dot that travels along a sequence of edges. */
export function AnimatedParticle({ route }: { route: ParticleRoute }) {
  const allX: number[] = [];
  const allY: number[] = [];

  for (const ei of route.edgeIndices) {
    const d = computePath(EDGES[ei]);
    const pts = samplePath(d, SAMPLES_PER_EDGE);
    const start = allX.length === 0 ? 0 : 1;
    for (let i = start; i < pts.length; i++) {
      allX.push(pts[i].x);
      allY.push(pts[i].y);
    }
  }

  const transition: Transition = {
    duration: route.duration,
    delay: route.delay,
    repeat: Infinity,
    repeatDelay: 2,
    ease: "linear",
  };

  return (
    <motion.circle
      r="4"
      fill={route.color}
      opacity={0.85}
      animate={{ cx: allX, cy: allY }}
      transition={transition}
    />
  );
}
