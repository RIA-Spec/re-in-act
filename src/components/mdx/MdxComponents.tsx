import { type ReactNode } from "react";
import { AlertTriangle, Info, Lightbulb } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import { ClientAccordion, ClientTabs } from "./MdxClientComponents";

/* ─── Note ─── */
type NoteType = "info" | "warning" | "tip";

interface NoteProps {
  children: ReactNode;
  type?: NoteType;
}

const NOTE_STYLES: Record<NoteType, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-500/25 dark:bg-blue-500/[0.06] dark:text-blue-300",
  warning:
    "border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/25 dark:bg-amber-500/[0.06] dark:text-amber-300",
  tip: "border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-500/25 dark:bg-emerald-500/[0.06] dark:text-emerald-300",
};

const NOTE_ICONS: Record<NoteType, ReactNode> = {
  info: <Info className="h-5 w-5 shrink-0" />,
  warning: <AlertTriangle className="h-5 w-5 shrink-0" />,
  tip: <Lightbulb className="h-5 w-5 shrink-0" />,
};

const CARD_CLASSNAME = "group my-2 block rounded-xl border p-5 transition-all duration-200";
const CARD_STYLE = {
  borderColor: "var(--border)",
  backgroundColor: "var(--card-bg)",
};

function Note({ children, type = "info" }: NoteProps) {
  return (
    <div className={`my-4 flex items-center gap-3 rounded-lg border p-4 ${NOTE_STYLES[type]}`}>
      {NOTE_ICONS[type]}
      <div className="min-w-0 text-sm leading-relaxed [&>p]:m-0">{children}</div>
    </div>
  );
}

/* ─── Card ─── */
interface CardProps {
  title: string;
  href?: string;
  children: ReactNode;
}

function Card({ title, href, children }: CardProps) {
  const content = (
    <>
      <h3
        className="mb-2 text-[15px] font-semibold transition-colors duration-200 group-hover:text-[var(--accent)]"
        style={{ color: "var(--foreground)" }}
      >
        {title}
      </h3>
      <div className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {children}
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className={`${CARD_CLASSNAME} cursor-pointer`} style={CARD_STYLE}>
        {content}
      </a>
    );
  }

  return (
    <div className={CARD_CLASSNAME} style={CARD_STYLE}>
      {content}
    </div>
  );
}

/* ─── Exports ─── */
export const mdxComponents: MDXComponents = {
  Note,
  Tabs: ClientTabs,
  Card,
  Accordion: ClientAccordion,
};
