import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-10 text-center" style={{ borderColor: "var(--border)" }}>
      <nav className="mb-4 flex flex-wrap items-center justify-center gap-4 text-xs">
        <Link href="/docs/getting-started/try" style={{ color: "var(--muted)" }}>
          Docs
        </Link>
        <Link href="/specification/draft/index" style={{ color: "var(--muted)" }}>
          Spec
        </Link>
        <Link href="/docs/learn/control-theoretic-view" style={{ color: "var(--muted)" }}>
          Why It Works
        </Link>
        <Link href="/docs/learn/playbook" style={{ color: "var(--muted)" }}>
          Playbook
        </Link>
        <Link href="/community/contributing" style={{ color: "var(--muted)" }}>
          Community
        </Link>
      </nav>
      <p className="text-xs" style={{ color: "var(--muted)" }}>
        © {new Date().getFullYear()} RIA Spec · Spec licensed under{" "}
        <a
          href="/LICENSE-DOCS"
          className="underline underline-offset-2 transition-colors duration-200 hover:text-[var(--accent)]"
        >
          CC BY 4.0
        </a>
      </p>
    </footer>
  );
}
