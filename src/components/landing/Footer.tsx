export function Footer() {
  return (
    <footer className="border-t py-10 text-center" style={{ borderColor: "var(--border)" }}>
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
