"use client";

import { useTheme } from "./ThemeProvider";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const next = () => {
    const order: Array<"system" | "light" | "dark"> = ["system", "light", "dark"];
    const i = order.indexOf(theme);
    setTheme(order[(i + 1) % order.length]);
  };

  const labels: Record<typeof theme, string> = { dark: "Dark", light: "Light", system: "System" };

  return (
    <button
      onClick={next}
      className="flex items-center justify-center rounded-md p-2 transition-colors duration-200 cursor-pointer"
      style={{ color: "var(--muted)" }}
      title={`Theme: ${labels[theme]}`}
      aria-label={`Switch theme (current: ${labels[theme]})`}
    >
      {theme === "dark" ? (
        <Moon className="h-4 w-4" />
      ) : theme === "light" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Monitor className="h-4 w-4" />
      )}
    </button>
  );
}
