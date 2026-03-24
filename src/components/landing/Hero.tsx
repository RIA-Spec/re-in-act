"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { CerebellumGraphic } from "./CerebellumViz";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-14">
      {/* Subtle background grid */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--muted) 1px, transparent 1px), linear-gradient(90deg, var(--muted) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* ── Cerebellum metaphor acting as Hero visual ── */}
      <motion.div
        className="mb-10 flex w-full max-w-2xl flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <CerebellumGraphic />
      </motion.div>

      {/* Tagline */}
      <motion.h1
        className="mb-6 text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        style={{ color: "var(--foreground)" }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      >
        {SITE_NAME}
      </motion.h1>

      <motion.div
        className="mb-14 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <p className="max-w-2xl text-lg leading-tight" style={{ color: "var(--foreground)" }}>
          A new paradigm for AI agents. By moving adaptive reasoning into the action phase, Re in
          Act reduces the latency and context bloat of traditional{" "}
          <a
            href="https://arxiv.org/abs/2210.03629"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent underline decoration-[0.08em] underline-offset-4"
          >
            ReAct
          </a>
          .
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        className="mb-16 flex items-center gap-3"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        <Link
          href="/docs/getting-started/intro"
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200"
          style={{ backgroundColor: "var(--accent)" }}
        >
          Get Started
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/specification/draft/index"
          className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors duration-200"
          style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
        >
          <BookOpen className="h-4 w-4" />
          Read the Spec
        </Link>
      </motion.div>
    </section>
  );
}
