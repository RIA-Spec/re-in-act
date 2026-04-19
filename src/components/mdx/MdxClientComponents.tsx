"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface ClientDocContentProps {
  html: string;
  className: string;
}

type CopyButtonState = "idle" | "success" | "error";

const COPY_FEEDBACK_DURATION_MS = 2400;

function setCopyButtonIcon(button: HTMLButtonElement, state: CopyButtonState) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", state === "idle" ? "2" : "2.25");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("doc-copy-icon");

  const paths: Array<[string, string]> =
    state === "success"
      ? [["path", "M20 6 9 17l-5-5"]]
      : state === "error"
        ? [
            ["path", "M18 6 6 18"],
            ["path", "M6 6l12 12"],
          ]
        : [
            ["rect", "9 9 13 13 2 2"],
            ["path", "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"],
          ];

  for (const [tagName, value] of paths) {
    const node = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    if (tagName === "rect") {
      const [x, y, width, height, rx, ry] = value.split(" ");
      node.setAttribute("x", x);
      node.setAttribute("y", y);
      node.setAttribute("width", width);
      node.setAttribute("height", height);
      node.setAttribute("rx", rx);
      node.setAttribute("ry", ry);
    } else {
      node.setAttribute("d", value);
    }
    svg.appendChild(node);
  }

  button.replaceChildren(svg);
}

export function ClientDocContent({ html, className }: ClientDocContentProps) {
  const articleRef = useRef<HTMLElement | null>(null);

  const copyText = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "true");
    textarea.style.position = "fixed";
    textarea.style.top = "0";
    textarea.style.left = "0";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    const succeeded = document.execCommand("copy");
    document.body.removeChild(textarea);

    if (!succeeded) {
      throw new Error("Copy failed");
    }
  };

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const resetTimers = new Map<HTMLButtonElement, number>();

    const setButtonState = (button: HTMLButtonElement, state: CopyButtonState, label: string) => {
      button.dataset.copyState = state;
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
      setCopyButtonIcon(button, state);

      const existingTimer = resetTimers.get(button);
      if (existingTimer) {
        window.clearTimeout(existingTimer);
      }

      if (state !== "idle") {
        const timer = window.setTimeout(() => {
          button.dataset.copyState = "idle";
          button.setAttribute("aria-label", "Copy code to clipboard");
          button.setAttribute("title", "Copy code");
          setCopyButtonIcon(button, "idle");
          resetTimers.delete(button);
        }, COPY_FEEDBACK_DURATION_MS);

        resetTimers.set(button, timer);
      }
    };

    for (const pre of article.querySelectorAll("pre")) {
      let wrapper = pre.parentElement;
      if (!wrapper || !wrapper.classList.contains("doc-code-block")) {
        wrapper = document.createElement("div");
        wrapper.className = "doc-code-block";
        pre.parentNode?.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);
      }

      const existingButton = wrapper.querySelector<HTMLButtonElement>(".doc-copy-button");
      if (existingButton) continue;

      const button = document.createElement("button");
      button.type = "button";
      button.className = "doc-copy-button";
      setButtonState(button, "idle", "Copy code to clipboard");
      wrapper.appendChild(button);
    }

    const handleClick = async (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const button = target.closest(".doc-copy-button");
      if (!(button instanceof HTMLButtonElement) || !article.contains(button)) {
        return;
      }

      const wrapper = button.closest(".doc-code-block");
      const pre = wrapper?.querySelector("pre");
      const code = pre?.querySelector("code")?.textContent ?? pre?.textContent ?? "";

      if (!code.trim()) {
        setButtonState(button, "error", "Copy failed");
        return;
      }

      try {
        await copyText(code);
        setButtonState(button, "success", "Copied");
      } catch {
        setButtonState(button, "error", "Copy failed");
      }
    };

    article.addEventListener("click", handleClick);

    return () => {
      article.removeEventListener("click", handleClick);

      for (const timer of resetTimers.values()) {
        window.clearTimeout(timer);
      }
    };
  }, [html]);

  return (
    <article ref={articleRef} className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

/* ─── Tabs ─── */
interface TabsProps {
  items: string[];
  children: ReactNode[];
}

export function ClientTabs({ items, children }: TabsProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="not-prose my-4">
      <div className="flex gap-0 border-b" style={{ borderColor: "var(--border)" }}>
        {items.map((label, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
              i === active
                ? "text-[var(--accent)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {label}
            {i === active && (
              <span
                className="absolute inset-x-0 -bottom-px h-[2px]"
                style={{ backgroundColor: "var(--accent)" }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="pt-4">{Array.isArray(children) ? children[active] : children}</div>
    </div>
  );
}

/* ─── Accordion ─── */
interface AccordionProps {
  title: string;
  children: ReactNode;
}

export function ClientAccordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="not-prose my-2 overflow-hidden rounded-lg border"
      style={{ borderColor: "var(--border)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium transition-colors duration-200 cursor-pointer"
        style={{ color: "var(--foreground)" }}
      >
        {title}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          style={{ color: "var(--muted)" }}
        />
      </button>
      {open && (
        <div
          className="border-t px-4 py-3 text-sm leading-relaxed"
          style={{ borderColor: "var(--border)", color: "var(--muted)" }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
