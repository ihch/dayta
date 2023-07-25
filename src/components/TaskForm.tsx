import { ComponentChildren } from "preact";
import { JSX } from "preact/jsx-runtime";

export function TaskForm({ children, ...props }: JSX.IntrinsicElements["form"] & { children?: ComponentChildren }) {
  return <form {...props}>{children}</form>;
}
