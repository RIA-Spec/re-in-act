import type { ComponentType, JSX } from "react";

export type MDXComponent = keyof JSX.IntrinsicElements | ComponentType<any>;

export type MDXComponents = Record<string, MDXComponent>;
