import type { CSSProperties } from "react";

interface LogoMarkProps {
  className?: string;
  style?: CSSProperties;
}

export function LogoMark({ className, style }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className} style={style}>
      <path
        d="
          M12,108
          Q20,78 28,112
          Q36,138 44,96
          Q52,70 60,104
          Q66,120 72,96
          Q78,82 84,98
          Q90,106 96,101
          Q100,100 100,92
          L100,28
        "
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="100"
        y1="28"
        x2="100"
        y2="172"
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
      />
      <path
        d="
          M100,100
          Q100,100 104,98
          Q110,94 116,104
          Q124,118 132,92
          Q140,70 148,104
          Q156,130 164,86
          Q172,56 180,100
          Q186,126 192,100
        "
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.28"
      />
    </svg>
  );
}
