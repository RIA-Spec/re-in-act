"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen, ChevronDown, ScrollText } from "lucide-react";
import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";

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
      {/*
      <motion.div
        className="mb-10 flex w-full max-w-2xl flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <CerebellumGraphic />
      </motion.div>
      */}

      <div className="mx-auto flex w-full max-w-2xl flex-col items-center">
        {/* Tagline */}
        <motion.div
          className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
          style={{ borderColor: "var(--border)", color: "var(--accent)" }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
        >
          Open Spec For Reason In Action
        </motion.div>

        <motion.h1
          className="mb-6 w-full text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          style={{ color: "var(--foreground)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          {SITE_NAME}
        </motion.h1>

        <motion.div
          className="mb-14 w-full text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <p
            className="mx-auto max-w-xl text-lg leading-tight"
            style={{ color: "var(--foreground)" }}
          >
            Re in Act strengthens how an AI agent turns{" "}
            <span className="font-semibold" style={{ color: "var(--foreground)" }}>
              reason into action
            </span>
            .<br className="hidden sm:block" /> It keeps reason{" "}
            <span className="font-semibold" style={{ color: "var(--foreground)" }}>
              inside the action loop
            </span>
            , so local disturbances are handled before they turn into{" "}
            <span className="font-semibold" style={{ color: "var(--foreground)" }}>
              extra round trips, noisy context, and brittle control
            </span>{" "}
            in traditional{" "}
            <a
              href="https://arxiv.org/abs/2210.03629"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent underline decoration-[0.08em] underline-offset-4"
            >
              ReAct agents
            </a>
            .
          </p>
          <p
            className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed"
            style={{ color: "var(--muted)" }}
          >
            Set the goal and guardrails once. Let small decisions happen where the work happens.
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mb-16 flex w-full flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        >
          <Link
            href="/docs/getting-started/try"
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
          <Link
            href="/docs/learn/control-theoretic-view"
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors duration-200"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            Why It Works
          </Link>
          <Link
            href="/docs/learn/playbook"
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors duration-200"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            <ScrollText className="h-4 w-4" />
            Playbook
          </Link>
        </motion.div>

        <motion.a
          href="#start-here"
          className="group inline-flex flex-col items-center gap-1 rounded-full px-3 py-2 text-xs font-medium tracking-[0.08em] uppercase transition-colors duration-200 hover:text-[var(--foreground)]"
          style={{ color: "var(--muted)" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: [0.72, 1, 0.82, 1, 0.72], y: 0, scale: [1, 1.035, 1, 1.02, 1] }}
          transition={{
            opacity: {
              duration: 1.9,
              delay: 0.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            scale: {
              duration: 1.9,
              delay: 0.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            },
            y: { duration: 0.5, delay: 0.28, ease: "easeOut" },
          }}
          whileHover={{ scale: 1.02, opacity: 1 }}
        >
          <span className="inline-flex items-center gap-2">
            Read More
            <motion.span
              className="inline-flex"
              animate={{ scale: [1, 1.08, 1, 1.04, 1], opacity: [0.72, 1, 0.82, 1, 0.72] }}
              transition={{ duration: 1.9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.span>
          </span>
        </motion.a>
      </div>
    </section>
  );
}
