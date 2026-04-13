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

const NOTE_STYLES: Record<
  NoteType,
  { borderColor: string; backgroundColor: string; color: string }
> = {
  info: {
    borderColor: "color-mix(in srgb, #3b82f6 34%, var(--border))",
    backgroundColor: "color-mix(in srgb, #3b82f6 10%, var(--background))",
    color: "color-mix(in srgb, #60a5fa 58%, var(--foreground))",
  },
  warning: {
    borderColor: "color-mix(in srgb, #f59e0b 34%, var(--border))",
    backgroundColor: "color-mix(in srgb, #f59e0b 10%, var(--background))",
    color: "color-mix(in srgb, #fbbf24 55%, var(--foreground))",
  },
  tip: {
    borderColor: "color-mix(in srgb, #10b981 34%, var(--border))",
    backgroundColor: "color-mix(in srgb, #10b981 10%, var(--background))",
    color: "color-mix(in srgb, #34d399 55%, var(--foreground))",
  },
};

const NOTE_ICONS: Record<NoteType, ReactNode> = {
  info: <Info className="h-5 w-5 shrink-0" />,
  warning: <AlertTriangle className="h-5 w-5 shrink-0" />,
  tip: <Lightbulb className="h-5 w-5 shrink-0" />,
};

const CARD_CLASSNAME =
  "not-prose group my-2 block rounded-xl border p-5 transition-all duration-200";
const CARD_STYLE = {
  borderColor: "var(--border)",
  backgroundColor: "var(--card-bg)",
};

function Note({ children, type = "info" }: NoteProps) {
  return (
    <div
      className="not-prose my-4 flex items-center gap-3 rounded-lg border p-4"
      style={NOTE_STYLES[type]}
    >
      {NOTE_ICONS[type]}
      <div className="min-w-0 text-sm leading-relaxed [&_a]:underline [&_a]:underline-offset-4 [&_p]:m-0">
        {children}
      </div>
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
