import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center"
      style={{ backgroundColor: "var(--background)" }}
    >
      <p className="mb-2 text-sm font-medium" style={{ color: "var(--accent)" }}>
        404
      </p>
      <h1 className="mb-2 text-3xl font-bold tracking-tight" style={{ color: "var(--foreground)" }}>
        Page not found
      </h1>
      <p className="mb-8 text-sm" style={{ color: "var(--muted)" }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 cursor-pointer"
        style={{ backgroundColor: "var(--accent)" }}
      >
        <ArrowLeft className="h-4 w-4" />
        Go Home
      </Link>
    </div>
  );
}
